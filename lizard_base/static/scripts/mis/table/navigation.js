console.log('laden mis/report/navigation ...');
/***************** functions **********************/

/*
function getSelectedScenario() {
    return selectedScenario;
}

function getSelectedRegion() {
    return selectedRegion;
}*/


function mis_table_clear_below_zone() {
	mis_tableBlockDistrict.clear();
	mis_table_clear_below_district();
}

function mis_table_clear_below_district() {
	mis_tableBlockLaWard.clear();
	mis_table_clear_below_ward()
}
function mis_table_clear_below_ward() {
	mis_tableBlockScheme.clear();
}

function mis_table_gettable(level, id) {
	mainScreenManager.screen[FRAME].setContentsURL(rootUrl+"mis/kpi_report/"+level+"/"+id)
}


isc.DataSource.create({
 	ID: "dsGetFields",
   	dataFormat: "json",
 	dataURL:locationMisData,
 	transformRequest : function (dsRequest) {
 		if (dsRequest.operationType == "fetch") {
 			var params = {action : 'get_fields'};
 			// combine paging parameters with criteria
   			return isc.addProperties({}, dsRequest.data, params);
   		}
  	},
  	autoFetchData:false
});
/******************** first tab - select table - sort col - etc **********************/
	mis_tableBlockTable = new NBlock("table","tables",
	{
	    dataURL: locationMisData,
	    fields:[
	        {name:"id", primaryKey:true, hidden:true, type:"integer"},
	        {name:"name", type:"text" }
	    ],
	    transformRequest : function (dsRequest) {
	        if (dsRequest.operationType == "fetch") {
	            var params = {action : 'get_tables'};
	            // combine paging parameters with criteria
	            return isc.addProperties({}, dsRequest.data, params);
	        }
	    }
	}, {
	    emptyMessage:"<a href='javascript: mis_tableBlockTable.tree.fetchData()'>login<br>or get more permissions</a>",
	    autoFetchData:true,
	    recordClick: function(viewer,record,recordNum){
			mis_tableBlockTable.setLabel(record.name);
			dsGetFields.fetchData({table_id:record.id}, function(response, data, request){
				   	var valuemap = {};    
   					for(var i=0; i<data.length; i++){
    					valuemap[data[i].id]=data[i].name;
   					 }
				selectSortCol.setValue()
				selectSortCol.setValueMap(valuemap);
				mis_tableListFilterst.setData([])
				mis_tableListFilterst.fields[0].valueMap = valuemap
			});
	    }
	});
	
	isc.DynamicForm.create({
		ID: "formSelectSort",
		width: "100%",
		numCols: 2,
		overflow: "auto",
        minColWidth: 80,
		colWidths: [100, 300],
		autodraw:false,
		fields: [{
			ID: 'selectSortCol',
			name: "selectSortCol",
			title: "sort on col",
			type: "select",
			changed: function(form, item, value){
	            console.log(item);
	            //check_step_two();
	        }
		},{
			ID: 'selectDesc',
			name: "selectAsc",
			title: "order",
			type: "select",
			valueMap:{
			'asc':'ascending',
			'desc':'descending'},
            defaultValue: 'asc',	
			changed: function(form, item, value){
	            //check_step_two();
	        }
		}]
	});
	
	
	

	isc.VLayout.create({
	    ID:"mis_tableTableNavigation",
	    membersMargin: 5,
	    width: "100%", height: "100%", overflow:"hidden",
	    members: [
	        isc.VLayout.create({ height:"25%", members: mis_tableBlockTable.getMembers(),    autoDraw:false}),
	        formSelectSort/*,
	        isc.VLayout.create({ height:"25%", members: mis_tableBlockLaWard.getMembers(),  autoDraw:false}),
	        isc.VLayout.create({ height:"25%", members: mis_tableBlockScheme.getMembers(),  autoDraw:false})*/
	    ],
	    autoDraw:false
	});


/******************** region filters - blocks **********************/

function mis_tableNavigation() {

	mis_tableBlockDevRegionZone = new NBlock("region - zone","regions - zones",
	{
	    dataURL: locationMisData,
	    fields:[
	        {name:"id", primaryKey:true, hidden:true, type:"integer"},
	        {name:"name", type:"text" },
	        {name:"parentid", type:"integer" ,foreignKey: "id", rootValue:None },
	        {name:"isregion"}
	    ],
	    transformRequest : function (dsRequest) {
	        if (dsRequest.operationType == "fetch") {
	            var params = {action : 'get_regionzone_tree'};
	            // combine paging parameters with criteria
	            return isc.addProperties({}, dsRequest.data, params);
	        }
	    }
	}, {
	    emptyMessage:"<a href='javascript: mis_tableBlockDevRegionZone.tree.fetchData()'>login<br>or get more permissions</a>",
	    autoFetchData:true,
	    recordClick: function(viewer,record,recordNum){
			mis_tableBlockDevRegionZone.setLabel(record.name);
			if (record.isregion == true) {
	        	var level = 3;
	        	console.log('dev_region ' + record.id)
	        	mis_table_clear_below_zone();
	        } else {
	        	var level = 4;
	        	console.log('zone ' + record.id)
	        }
	        //select_report(level, Math.abs(record.id));
	        if (record.isregion != true) {
	        	mis_tableBlockDistrict.tree.fetchData({zone_id:record.id})
	        	mis_table_clear_below_district();
	        }
	    },
	    folderClick: function(viewer,folder,recordNum){
	        this.openFolder(folder);
	    }
	});
	
	
	mis_tableBlockDistrict = new NBlock("district","districts",
	{
	    dataURL: locationMisData,
	    fields:[
	        {name:"id", primaryKey:true, hidden:true, type:"integer"},
	        {name:"name", type:"text" }
	    ],
	    transformRequest : function (dsRequest) {
	        if (dsRequest.operationType == "fetch") {
	            var params = {action : 'get_districts'};
	            // combine paging parameters with criteria
	            return isc.addProperties({}, dsRequest.data, params);
	        }
	    }
	}, {
	    emptyMessage:"select zone",
	    recordClick: function(viewer,record,recordNum){
			mis_tableBlockDistrict.setLabel(record.name);
        	var level = 5;
	        console.log('district ' + record.id)

	        //select_report(level, Math.abs(record.id));
	        mis_table_clear_below_district();
	        mis_tableBlockLaWard.tree.fetchData({district_id:record.id})
	    },
	    folderClick: function(viewer,folder,recordNum){
	        this.openFolder(folder);
	    }
	});
	
	
	
	mis_tableBlockLaWard = new NBlock("localauthority - ward","localauthority - ward",
	{
	    dataURL: locationMisData,
	    fields:[
	        {name:"id", primaryKey:true, hidden:true, type:"integer"},
	        {name:"name", type:"text" },
	        {name:"parentid", type:"integer" ,foreignKey: "id", rootValue:None },
	        {name:"isla"}
	    ],
	    transformRequest : function (dsRequest) {
	        if (dsRequest.operationType == "fetch") {
	            var params = {action : 'get_la_ward_tree'};
	            // combine paging parameters with criteria
	            return isc.addProperties({}, dsRequest.data, params);
	        }
	    }
	}, {
	    emptyMessage:"select district",
	    autoFetchData:true,
	    recordClick: function(viewer,record,recordNum){
			mis_tableBlockLaWard.setLabel(record.name);
			if (record.isla == true) {
	        	var level = 6;
	        	console.log('local authority ' + record.id)
	        } else {
	        	var level = 7;
	        	console.log('ward ' + record.id)
	        }
	        //select_report(level, Math.abs(record.id));
	        
	        if (record.isla == true) {
	        	mis_tableBlockScheme.tree.fetchData({la_id:Math.abs(record.id)})
	        } else {
	        	mis_tableBlockScheme.tree.fetchData({ward_id:Math.abs(record.id)})
	        }
	    },
	    folderClick: function(viewer,folder,recordNum){
	        this.openFolder(folder);
	    }
	});	
	
	
	mis_tableBlockScheme = new NBlock("scheme","schemes",
	{
	    dataURL: locationMisData,
	    fields:[
	        {name:"id", primaryKey:true, hidden:true, type:"integer"},
	        {name:"name", type:"text" }
	    ],
	    transformRequest : function (dsRequest) {
	        if (dsRequest.operationType == "fetch") {
	            var params = {action : 'get_schemes'};
	            // combine paging parameters with criteria
	            return isc.addProperties({}, dsRequest.data, params);
	        }
	    }
	}, {
	    emptyMessage:"no schemes or<br>select localauthority or ward",
	    recordClick: function(viewer,record,recordNum){
			mis_tableBlockScheme.setLabel(record.name);
        	var level = 8;
	        console.log('scheme ' + record.id)
	        select_report(level, Math.abs(record.id));
	    }
	});	
	


	isc.VLayout.create({
	    ID:"mis_tableRegionFilterNavigation",
	    membersMargin: 5,
	    width: "100%", height: "100%", overflow:"hidden",
	    members: [
	        isc.VLayout.create({ height:"25%", members: mis_tableBlockDevRegionZone.getMembers(),    autoDraw:false}),
	        isc.VLayout.create({ height:"25%", members: mis_tableBlockDistrict.getMembers(),   autoDraw:false}),
	        isc.VLayout.create({ height:"25%", members: mis_tableBlockLaWard.getMembers(),  autoDraw:false}),
	        isc.VLayout.create({ height:"25%", members: mis_tableBlockScheme.getMembers(),  autoDraw:false})
	    ],
	    autoDraw:false
	});


/**********************other ******************************/
 	 isc.ListGrid.create({
    	ID:"mis_tableListFilterst",
		width:'100%',
		height:'50%',
		margin:5,
		//selectionType: "simple",
		canEdit:true, 
		editEvent:"doubleClick", 
		//editByCell: true,
		modalEditing:true,
    	alternateRecordStyles:true,
    	wrapCells: true,
    	fixedRecordHeights: false,
   		//dataSource: dsListLoccutoffsSet,
		fields:[//project
       		{name: "col",title: "col",type: "text",canEdit: true,primaryKey:true,
       		valueMap:['-']}, 
       		{name: "match",title: "match",type: "text",canEdit: true, width:60,
       		valueMap:["equals", "contain", "greater than", "lower than"]}, //"start with",
       		{name: "value",title: "value",type: "text",canEdit: true,width:100}
        ],
    	autoDraw:false,
    	selectionChanged: function(record, select) {

			/*if (select) {
				for (var i = 0 ; i < record.cuttofflocation.length ; i++ ) {
					fnLoccutoffsLayer.select(record.cuttofflocation[i],true);		
				}
			} else {
				for (var i = 0 ; i < record.cuttofflocation.length ; i++ ) {
					fnLoccutoffsLayer.deselect(record.cuttofflocation[i]);		
				}		
			}	*/	
    	}

 	});
 	isc.IButton.create({
    	ID:"mis_table_add_filter",
    	width:100,
    	showRollOver: false,
        actionType: "button",
        showFocused:false,
    	title:"Add filter",
    	click:"mis_tableListFilterst.startEditingNew()"
	});
	 isc.IButton.create({
    	ID:"mis_table_remove_filters",
    	width:150,
    	title:"Remove selected filters",
    	showRollOver: false,
        actionType: "button",
        showFocused:false,
    	click: function () {
			mis_tableListFilterst.removeSelectedData()
		}
	});

 	
 
 
	isc.VLayout.create({
	    ID:"mis_tableOtherFilterNavigation",
	    membersMargin: 5,
	    width: "100%", height: "100%", overflow:"hidden",
	    members: [
	        mis_tableListFilterst,
	        isc.HLayout.create({membersMargin: 5,members:[mis_table_add_filter,mis_table_remove_filters]})
	    ],
	    autoDraw:false
	});









	/******************** screen **********************/
    isc.TabSet.create({
        ID:"tabSetMisTable",
        tabBarPosition: "bottom",
        destroyPanes:"false",
        symmetricEdges:false,
        tabs:[
        	{title:'tables', ID:"tab_mis_tableNavigationStep1", pane: 'mis_tableTableNavigation'},
        	/*{title:'region filter', ID:"tab_mis_tableNavigationStep2", pane: 'mis_tableRegionFilterNavigation'},*/
        	{title:'filters', ID:"tab_mis_tableNavigationStep3", pane: 'mis_tableOtherFilterNavigation'}
        ],
        tabSelected: function(tabNum, tabPane, ID, tab) {
        	
        	
        },
        tabDeselected: function(tabNum, tabPane, ID, tab) {
       	
        	
        },
        width:'100%', height:'100%',
        backgroundColor:"white", //opacity:100,
        paneContainerOverflow:"hidden",
        autoDraw:false
    });
    
    isc.IButton.create({
    	ID:"mis_table_refresh",
    	width:"100%",
    	showRollOver: false,
        actionType: "button",
        showFocused:true,
        state:"focused",
    	title:"Refesh Table",
    	click: function () {
    		
    		var filters = mis_tableListFilterst.data;
    		
    		var table_string = 'table=' + mis_tableBlockTable.tree.getSelectedRecord().id
    		
    		
    		var filter_string = "filter=";
    		var data = mis_tableListFilterst.data
    		for (i = 0; i < data.length;i++) {
    			filter_string += data[i]['col'] + '|' + data[i]['match'] + '|' + data[i]['value']  + '|';
    		}
    		var sort_string = "sort="
 			if (selectSortCol.getValue() != null) {
 				sort_string+= selectSortCol.getValue() + '|' + selectDesc.getValue()
 			}
			
			//mis_tableBlockTable.tree.getSelectedRecord()  --> selected table
			var url = rootUrl+'mis/table/?' + table_string + '&' + filter_string + '&' + sort_string;
			mainScreenManager.screen[IFRAME].setContentsURL(url)

		}
	});
    
    
    
    
    
    
    isc.VLayout.create({
	    ID:"mis_tableNavigation",
	    membersMargin: 5,
	    width: "100%", height: "100%", overflow:"hidden",
	    members: [
	        mis_table_refresh,
	        tabSetMisTable
	        
	    ],
	    autoDraw:false
	});
    
    //this.tabSet.addTab({title:infoWindows[i].tabName, ID:("tab_"+infoWindows[i].id), pane: infoWindows[i].pane, disabled:!infoWindows[i].enabled});
	
	return mis_tableNavigation;











}


console.log('klaar laden mis/report/navigation ...');
