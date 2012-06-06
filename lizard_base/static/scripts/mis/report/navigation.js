console.log('laden mis/report/navigation ...');
/***************** functions **********************/

/*
function getSelectedScenario() {
    return selectedScenario;
}

function getSelectedRegion() {
    return selectedRegion;
}*/


function clear_below_zone() {
	mis_reportBlockDistrict.clear();
	clear_below_district();
}

function clear_below_district() {
	mis_reportBlockLaWard.clear();
	clear_below_ward()
}
function clear_below_ward() {
	mis_reportBlockScheme.clear();
}

function select_report(level, id) {
	mainScreenManager.screen[FRAME].setContentsURL(rootUrl+"mis/kpi_report/"+level+"/"+id)
}

/******************** blocks **********************/

function mis_reportNavigation() {

	mis_reportBlockDevRegionZone = new NBlock("region - zone","regions - zones",
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
	    emptyMessage:"<a href='javascript: mis_reportBlockDevRegionZone.tree.fetchData()'>login<br>or get more permissions</a>",
	    autoFetchData:true,
	    recordClick: function(viewer,record,recordNum){
			mis_reportBlockDevRegionZone.setLabel(record.name);
			if (record.isregion == true) {
	        	var level = 3;
	        	console.log('dev_region ' + record.id)
	        	clear_below_zone();
	        } else {
	        	var level = 4;
	        	console.log('zone ' + record.id)
	        }
	        select_report(level, Math.abs(record.id));
	        if (record.isregion != true) {
	        	mis_reportBlockDistrict.tree.fetchData({zone_id:record.id})
	        	clear_below_district();
	        }
	    },
	    folderClick: function(viewer,folder,recordNum){
	        this.openFolder(folder);
	    }
	});
	
	
	mis_reportBlockDistrict = new NBlock("district","districts",
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
			mis_reportBlockDistrict.setLabel(record.name);
        	var level = 5;
	        console.log('district ' + record.id)

	        select_report(level, Math.abs(record.id));
	        clear_below_district();
	        mis_reportBlockLaWard.tree.fetchData({district_id:record.id})
	    },
	    folderClick: function(viewer,folder,recordNum){
	        this.openFolder(folder);
	    }
	});
	
	
	
	mis_reportBlockLaWard = new NBlock("localauthority - ward","localauthority - ward",
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
			mis_reportBlockLaWard.setLabel(record.name);
			if (record.isla == true) {
	        	var level = 6;
	        	console.log('local authority ' + record.id)
	        } else {
	        	var level = 7;
	        	console.log('ward ' + record.id)
	        }
	        select_report(level, Math.abs(record.id));
	        
	        if (record.isla == true) {
	        	mis_reportBlockScheme.tree.fetchData({la_id:Math.abs(record.id)})
	        } else {
	        	mis_reportBlockScheme.tree.fetchData({ward_id:Math.abs(record.id)})
	        }
	    },
	    folderClick: function(viewer,folder,recordNum){
	        this.openFolder(folder);
	    }
	});	
	
	
	mis_reportBlockScheme = new NBlock("scheme","schemes",
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
			mis_reportBlockScheme.setLabel(record.name);
        	var level = 8;
	        console.log('scheme ' + record.id)
	        select_report(level, Math.abs(record.id));
	    }
	});	
	
	/******************** screen **********************/

	isc.VLayout.create({
	    ID:"mis_reportResultNavigation",
	    membersMargin: 5,
	    width: "100%", height: "100%", overflow:"hidden",
	    members: [
	        isc.VLayout.create({ height:"25%", members: mis_reportBlockDevRegionZone.getMembers(),    autoDraw:false}),
	        isc.VLayout.create({ height:"25%", members: mis_reportBlockDistrict.getMembers(),   autoDraw:false}),
	        isc.VLayout.create({ height:"25%", members: mis_reportBlockLaWard.getMembers(),  autoDraw:false}),
	        isc.VLayout.create({ height:"25%", members: mis_reportBlockScheme.getMembers(),  autoDraw:false})
	    ],
	    autoDraw:false
	});
	return mis_reportResultNavigation;

}


console.log('klaar laden mis/report/navigation ...');
