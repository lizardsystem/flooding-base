console.log('loading search window ..');

/********************************************************************/
/**** script: 		search
/**** description: 	This script provides the functionaly to 
                        search, filter scenarios
/********************************************************************/

var createSelectionDS = function(dS, actionParam){
    ds = isc.DataSource.create({
	ID: dS,
	showPrompt: false,
	dataFormat: "json",
	dataURL: locationFloodingData,
	autoFetchData: false,
	actionParam: actionParam,
	transformRequest: function (dsRequest) {
    	    if (dsRequest.operationType == "fetch") {
    		var params = {action : this.actionParam};
	    }
    	    return isc.addProperties({}, dsRequest.data, params);
	},
	fields:[
    	    {name:"id", primaryKey: true, type:"int" },
	    {name:"name", hidden: false, type:"text" }
	]
    });
}

// isc.Label.create({
//     ID: "searchLabel",
//     autoFit: true,
//     contents: "Zoeken, filtreren scenario's."
// });

var retrieveIDs = function(values){

    ids = new Array();
    for (var i = 0; i < values.length; i++) {
	ids[i] = values[i].id;
    }
    return ids;
}

var retrieveSearchParams = function(){
    var searchParams = {}
    var forms = searchForms.getMembers()
    for (var i = 0; i < forms.length; i++){
	var selectionField = forms[i].getField("selection");
	var searchByValue = forms[i].getField("searchBy").getValue();
	if (searchByValue == null) {
	    continue;
	}
	if (selectionField.pickList == null) {
	    continue;
	}
	var values = selectionField.pickList.selection.getSelection();
	if (values.length <= 0) {
	    continue;
	}	    
	searchParams[searchByValue] = retrieveIDs(values);	
    }
    return searchParams;
}

var applySearch = function() {
    var searchParams = retrieveSearchParams()
    var regionsTransformRequest = frBlockRegions.ds.transformRequest;
    var breachesTransformRequest = frBlockBreaches.ds.transformRequest;
    var scenariosTransformRequest = frBlockScenarios.ds.transformRequest;
    frBlockRegions.ds.transformRequest = function(dsRequest) {
	if (dsRequest.operationType == "fetch"){
	    var params = {
		action: "get_region_tree_search",
		searchBy: searchParams
	    };
	    return isc.addProperties({}, dsRequest.data, params);
	}
    }
    frBlockBreaches.ds.transformRequest = function(dsRequest) {
	if (dsRequest.operationType == "fetch"){
	    var params = {
		action: "get_breach_tree_search",
		filter: selectResultType.getValue(),
		searchBy: searchParams
	    };
	    return isc.addProperties({}, dsRequest.data, params);
	}
    }
    frBlockScenarios.ds.transformRequest = function(dsRequest) {
	if (dsRequest.operationType == "fetch"){
	    var params = {
		action: "get_scenario_tree_search",
		filter: selectResultType.getValue(),
		searchBy: searchParams
	    };
	    return isc.addProperties({}, dsRequest.data, params);
	}
    }
    if (frBlockRegions.tree.getData().isEmpty()) {
	frBlockRegions.tree.fetchData();
    } else {
	var rootRegions = frBlockRegions.tree.getData().root;
	frBlockRegions.tree.getData().reloadChildren(rootRegions);
    }
    frBlockRegions.ds.transformRequest = regionsTransformRequest;
    if (frBlockBreaches.tree.getData().isEmpty()) {
	frBlockBreaches.tree.fetchData();
    } else {
	var rootBreaches = frBlockBreaches.tree.getData().root;
	frBlockBreaches.tree.getData().reloadChildren(rootBreaches);
    }
    frBlockBreaches.ds.transformRequest = breachesTransformRequest;
    if (frBlockScenarios.tree.getData().isEmpty()) {
	frBlockScenarios.tree.fetchData();
    } else {
	var rootScenarios = frBlockScenarios.tree.getData().root;
	frBlockScenarios.tree.getData().reloadChildren(rootScenarios);
    }
    frBlockScenarios.ds.transformRequest = scenariosTransformRequest;
    frBlockResults.tree.data = [];
    frBlockResults.tree.redraw();
}

// var getSearchResult = function(){
//     isc.RPCManager.sendRequest(
// 	{
// 	    actionURL: locationFloodingData,
// 	    showPrompt: false,
// 	    httpMethod: "POST",
// 	    params: {"params": retrieveSearchParams(),
// 		     "action": "search_navigation_objects"},
// 	    callback: reqCallback,
// 	    dataFormat: "json",
// 	    useSimpleHttp: true
// 	});
// }

var updateNavigationWindows = function(){
    var params = retrieveSearchParams();

}

isc.IButton.create({
    ID: "btSubmit",
    title: "Toepassen",
    autoFit: true,
    click : function () {
	applySearch();
    }
});

isc.IButton.create({
    ID: "btClose",
    title: "Afsluiten",
    autoFit: true,
    click : function () { 
	searchWindow.hide();
    }
});

isc.IButton.create({
    ID: "btReset",
    title: "Reset",
    autoFit: true,
    click : function () { 
	clearSearchFields();
	if (frBlockRegions.tree.getData().isEmpty()) {
	    frBlockRegions.tree.fetchData();
	} else {
	    regionsRoot = frBlockRegions.tree.getData().root;
	    frBlockRegions.tree.getData().reloadChildren(regionsRoot);
	}
	frBlockRegions.tree.redraw();
	frBlockBreaches.tree.data = [];
	frBlockBreaches.tree.redraw();
	frBlockScenarios.tree.data = [];
	frBlockScenarios.tree.redraw();
	frBlockResults.tree.data = [];
	frBlockResults.tree.redraw();
    }
});

var clearSearchFields = function(){
    forms = searchForms.getMembers();
    for (var i = 0; i < forms.length; i++){
	var selectionField = forms[i].getField('selection');
	var serchByField = forms[i].getField('searchBy');
	if (selectionField.pickList != null) {
	    selectionField.pickList.deselectAllRecords();
	}
	selectionField.clearValue();
	serchByField.clearValue();
	selectionField.setProperties({
	    "optionDataSource": null
	});
    }
}

var createSearchForm = function() {
    var form = isc.DynamicForm.create({
	autoDraw: false,
	fields: [
	    {
		name: "searchBy",
		valueMap: ['Project', 'Regio', 'Buitenwater'],
		type: "select",
		emptyDisplayValue: "Selecteer project",
		change: function (f, i, v) {
		    var relField = f.getField('selection');
		    if (relField.pickList != null) {
			relField.pickList.deselectAllRecords();
			relField.clearValue();
		    }
		    if (v == 'Project') {
			helpText = "Select " + v;
			relField.setProperties({
			    "optionDataSource": dSProjectSelection
			});
		    } else if (v == "Regio") {
			relField.setProperties({
			    "optionDataSource": dSRegionSelection
			});
		    } else if (v == "Buitenwater") {
			relField.setProperties({
			    "optionDataSource": dSEWSelection
			});
		    }
		}
	    },
	    {
		name: "selection",	    
		autoFetchData:false,
		cachePickListResults: false,
		valueField:"id",
		multiple:true,
		multipleAppearance:"picklist",
		type: "select",
		displayField:"name",
		emptyDisplayValue: "Selecteer ..."
	    }
	]
    });
    return form;
}

createSelectionDS("dSProjectSelection", "get_projects_only");
createSelectionDS("dSRegionSelection", "get_all_regions");
createSelectionDS("dSEWSelection", "get_external_waters");

isc.HLayout.create({
    ID: "searchForms",
    //membersMargin: 5,
    //padding: 5,
    members: [
	createSearchForm(),
	createSearchForm(),
	createSearchForm()
    ]
});

isc.HLayout.create({
    ID: "buttons",
    valign: "bottom",
    //membersMargin: 5,
    members: [btReset, btClose, btSubmit]
})

isc.Window.create({
    ID: "searchWindow",
    title: "Search",
    autoSize:true,
    autoCenter: true,
    isModal: true,
    showModalMask: true,
    autoDraw: false,
    closeClick : function () {
	this.Super("closeClick", arguments)
    },
    items: [
	searchForms,
	buttons
    ]
});
