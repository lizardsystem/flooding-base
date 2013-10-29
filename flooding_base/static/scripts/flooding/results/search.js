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

isc.Label.create({
    ID: "searchLabel",
    align: "center",
    contents: "Zoeken, filtreren scenario's."
});

isc.IButton.create({
    ID: "btSubmit",
    title: "Toepassen",
    autoFit: true,
    click : function () {
	var val = uploadForm.validate();
	if (val) {
	    lbUpload.setContents('Uploaden ...');
	    lbUpload.icon = loading_img;
	    if (!this.isDisabled()) {
		this.disable();
	    }
	    this.getForm().submit();   
	} else {
	    console.log("Fout bij uploaden.");
    	}
    }
});

isc.IButton.create({
    ID: "btClose",
    title: "Afsluiten",
    autoFit: true,
    click : function () { 
	uploadWindow.hide();
	dsRORKeringen.fetchData({}, function(response, data, request){
	    listGridKering.setData(data);
	});
    }
});

var clearSearchFields = function(){
    forms = searchForms.getMembers();
	for (var i = 0; i < forms.length; i++){
	    var selectionField = forms[i].getField('selection');
	    var serchByField = forms[i].getField('searchBy');
	    if (selectionField.pickList != null) {
		selectionField.pickList.deselectAllRecords();
		selectionField.clearValue();
	    }
	    serchByField.clearValue();
	    selectionField.setProperties({
		"optionDataSource": null
	    });
	}
}

isc.IButton.create({
    ID: "btReset",
    title: "Reset",
    autoFit: true,
    click : function () { 
	clearSearchFields();
    }
});

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
		    //clearSerchFields();
		    var relField = f.getField('selection');
		    if (relField.pickList != null) {
			relField.pickList.deselectAllRecords();
			relField.clearValue();
		    }
		    if (v == 'Project') {
			helpText = "Select " + v;
			relField.setProperties({
			    "emptyDisplayValue": "Select Project",
			    "optionDataSource": dSProjectSelection
			});
			//dSProjectSelection.fetchData();
		    } else if (v == "Regio") {
			relField.setProperties({
			    "emptyDisplayValue": "Select Regio",
			    "optionDataSource": dSRegionSelection
			});
			//dSRegionSelection.fetchData();
			//relField.fetchData();
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
	    }
	]
    });
    return form;
}

createSelectionDS("dSProjectSelection", "get_projects_only");
createSelectionDS("dSRegionSelection", "get_all_regions");
createSelectionDS("dSEWSelection", "get_externalwaters");

isc.HLayout.create({
    ID: "searchForms",
    membersMargin: 5,
    padding: 5,
    height: 20,
    members: [
	createSearchForm(),
	createSearchForm(),
	createSearchForm()
    ]
});

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
	searchLabel,
	searchForms,
	btClose,
	btSubmit,
	btReset
    ]
});