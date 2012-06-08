console.log('laden flow/result/navigation ...');
/***************** functions **********************/
var flowSelectedScenario = null;
var flowSselectedRegion = null;

function getSelectedFlowScenario() {
    return selectedScenario;
}

function getSelectedFlowRegion() {
    return flowSelectedRegion;
}


function flow_clear_scenarios() {
    flBlockScenarios.clear(); // fetch empty array
    flowSelectedScenario = null;
    flow_clear_results();
}

function flow_clear_results() {
    flBlockResults.clear(); // fetch empty array
    flow_clear_results_without_tree();
}

function flow_clear_results_without_tree() {
    //set tree leeg
    flBlockResults.setLabel();
    appManager.selectedApp.overlayManager.clearAllOverlays();
    appManager.selectedApp.overlayManager.hide();
    flowSliderOpacity.setDisabled(true);
}

/******************** blocks **********************/
function flNavigation() {

	flBlockRegions = new NBlock("regios","regio",
	{
	    dataURL: locationFlowData,
	    recordXPath:"items",
	    fields:[
	        {name:"rsid", primaryKey:true, hidden:true, type:"integer"},
	        {name:"rid", primaryKey:true, hidden:true, type:"integer"},
	        {name:"name", type:"text" },
	        {name:"parentid", type:"integer" ,foreignKey: "rsid", rootValue:None },
	        {name:"isregion"},
	        {name:"north" , type:"integer"},
	        {name:"south" , type:"integer"},
	        {name:"west" , type:"integer"},
	        {name:"east" , type:"integer"}
	    ],
	    transformRequest : function (dsRequest) {
	        if (dsRequest.operationType == "fetch") {
	            var params = {action : 'get_region_tree'};
	            // combine paging parameters with criteria
	            return isc.addProperties({}, dsRequest.data, params);
	        }
	    }
	}, {
	    emptyMessage:"<a href='javascript: flBlockRegions.tree.fetchData()'>herladen</a>",
	    autoFetchData:true,
	    leafClick: function(viewer,leaf,recordNum){
			if (leaf.isregion == true) {
	        	flBlockRegions.setLabel(leaf.name);
	        	flowSelectedRegion = leaf;//to do, dit moet anders
		        flow_clear_results();
		        flBlockScenarios.tree.fetchData({region_id:leaf.rid, filter:floodingFilterResults}, function(request, data) {
		            for (idx=0; idx<data.length; idx++) {
		                if (data[idx].isFolder) {
		                	flBlockScenarios.tree.openFolder(data[idx]);
		                }
		            }
		        });
	        	Ozoom(map ,leaf );
	        }
	    },

	    folderClick: function(viewer,folder,recordNum){
	        Ozoom(map ,folder );
	        this.openFolder(folder);
	    }
	});
	
	flBlockScenarios = new NBlock("scenario's","scenario",
	{
	    dataURL: locationFlowData,
	    recordXPath:"items",
	    fields:[
	        {name:"pid", primaryKey:true, hidden:true, type:"integer"},
	        {name:"sid", primaryKey:true, hidden:true, type:"integer"},
	        {name:"name", type:"text" },
	        {name:"parentid", type:"integer" ,foreignKey: "pid", rootValue:None },
	        {name:"status",type:"integer"}
	    ],
	    transformRequest : function (dsRequest) {
	        if (dsRequest.operationType == "fetch") {
	            var params = {action : 'get_scenario_tree', onlyprojectswithscenario:1};
	            
	            // combine paging parameters with criteria
	            return isc.addProperties({}, dsRequest.data, params);
	        }
	    }
	},{
	    emptyMessage:"Kies een regio",
	    leafClick: function(viewer,leaf,recordNum){
	        flow_clear_results_without_tree();
	        flBlockScenarios.setLabel(leaf.name);
	        flowSelectedScenario = leaf;//to do: dit moet anders
	        flBlockResults.tree.fetchData({scenario_id:leaf.sid}, function(request,data,response){
	        });
	        
	        // Send id to the information windows (information, remarks ) 
	        flowIwScenarioInformation.addOrUpdateParams({scenarioid:leaf.sid});
	        flowIwScenarioRemarks.addOrUpdateParams({scenarioid:leaf.sid});
		
	    },
	    folderClick: function(viewer,folder,recordNum){
	        this.openFolder(folder);
	    }
	});
	
	flBlockResults = new NBlock( "Resultaten", "Resultaat",
	{ //datasource
	    dataURL: locationFlowData,
	    recordXPath:"items",
	    fields:[
	        {name:"id", primaryKey:true, hidden:true, type:"integer"},
	        {name:"name", type:"text" },
	        {name:"type",type:"text"},
	        {name:"resulttypeid",type:"integer"}
	    ],
	    transformRequest : function (dsRequest) {
	        if (dsRequest.operationType == "fetch") {
	            var params = {action : 'get_presentation_of_scenario'};
	            // combine paging parameters with criteria
	            return isc.addProperties({}, dsRequest.data, params);
	        }
	    }
	},{ //tree
	    emptyMessage:"Kies een scenario",
	    leafClick: function(viewer,leaf,recordNum){
	        flBlockResults.setLabel(leaf.name);
	        
	        //to do, dit anders!
	        appManager.selectedApp.overlayManager.clearAllOverlays();
	        
	        var get_popup_content = function(id,name, service_url, params, cloud_width, cloud_height ){
	            var width = cloud_width;
	            var height = cloud_height-25;
	            
	            var html = '<b>' + name + '</b><br> <br/><img src="'+service_url+'?action=get_graph_of_shape&format=graph&graphwidth='+ width +'&graphheight='+ height; 
       			for (elem in params) {
       				html += '&' + elem + '=' + params[elem];
       			}
       
       			html += '" width="'+width +'px" height="'+ height +'px"/>';
       			return html;
       		}

	        if (!appManager.selectedApp.overlayManager.setActiveOverlay(leaf.id)) {
	            //add overlay

	        	var layer = null;	        	
		        if (leaf.geoType == 1 && leaf.valueType == 2  ) { //MapOverlay
		        
			    	layer = new NMapOverlay(leaf.id, leaf.name, {
			    	    //legendWindow: iwLegend,
					    geoType:leaf.geoType,
					    valueType:leaf.valueType,			    	    
						getSettingsFromRequest: true,
						settingsRequestUrl: locationPresentationData,
						settingsRequestParams: {
							action:'get_presentationlayer_settings',
							result_id:leaf.id							
						},
						getFramesFromRequest:true,
						frameUrl :locationPresentationData, 
						framesRequestParams: {
							action:'get_gridframe',
							result_id:leaf.id
						},
						rawResultUrl:locationFloodingData + '?TODO' 
					});
				} else if (leaf.geoType == 1 && [3,4].contains(leaf.valueType)  ){ //ANIMATEDMAPOVERLAY
					layer = new NAnimatedMapOverlay(leaf.id, leaf.name, {
					    //legendWindow: iwLegend,
					    geoType:leaf.geoType,
					    valueType:leaf.valueType,					    
						getSettingsFromRequest: true,
						settingsRequestUrl: locationPresentationData,
						settingsRequestParams: {
							action:'get_presentationlayer_settings',
							result_id:leaf.id					
						},
						getFramesFromRequest:true,
						frameUrl :locationPresentationData, 
						framesRequestParams: {
							action:'get_gridframe',
							result_id:leaf.id
						},
						rawResultUrl:locationFloodingData + '?TODO' 
						
					});
					
				} 	else if ( [2,3,4].contains(leaf.geoType) && [1,2].contains(leaf.valueType)  ){ //WMSOVERLAY
					layer = new NWMSOverlay(leaf.id, leaf.name, {
					    //legendWindow: iwLegend,
					    rootURL:rootUrl,
					    singleTile:true,
					    geoType:leaf.geoType,
					    valueType:leaf.valueType,					    
						getSettingsFromRequest: true,
						settingsRequestUrl: locationPresentationData,
						settingsRequestParams: {
							action:'get_presentationlayer_settings',
							result_id:leaf.id					
						},
						getFramesFromRequest:true,
						frameUrl :locationPresentationData, 
						framesRequestParams: {
							action:'get_wms_of_shape',
							result_id:leaf.id
						},
						cloud: {
							content_function:get_popup_content
						},
						rawResultUrl:locationFloodingData + '?TODO',
						app: 'flow',
						visibile: true
						
					});
				} else if ( [2,3,4].contains(leaf.geoType) && [3].contains(leaf.valueType)  ){ //WMSOVERLAY
					layer = new NAnimatedWMSOverlay(leaf.id, leaf.name, {
					    //legendWindow: iwLegend,
					    rootURL:rootUrl,
					    singleTile:true,
					    geoType:leaf.geoType,
					    valueType:leaf.valueType,
						getSettingsFromRequest: true,
						settingsRequestUrl: locationPresentationData,
						settingsRequestParams: {
							action:'get_presentationlayer_settings',
							result_id:leaf.id					
						},
						getFramesFromRequest:true,
						frameUrl :locationPresentationData, 
						framesRequestParams: {
							action:'get_wms_of_shape',
							result_id:leaf.id
						},
						cloud: {
							content_function:get_popup_content
						},
						rawResultUrl:locationFloodingData + '?TODO',
						app: 'flow',
						visibile: true
						
					});	
				} else {
					console.log('asked overlay format not supported yet geoType: ' + leaf.geoType + ' valueType: ' + leaf.valueType)
				}

				appManager.selectedApp.overlayManager.addAndSetActiveOverlay(layer);
			}
   
	        
	        flowSliderOpacity.setDisabled(false);
	    },
	    folderClick: function(viewer,folder,recordNum){
	        this.openFolder(folder);
	    }
	});
	
	/******************** screen **********************/
	
	isc.VLayout.create({
	    ID:"flowResultNavigation",
	    membersMargin: 5,
	    width: "100%", height: "100%", overflow:"hidden",
	    members: [
	        isc.VLayout.create({ height:"25%", members: flBlockRegions.getMembers(),    autoDraw:false}),
	        isc.VLayout.create({ height:"30%", members: flBlockScenarios.getMembers(),  autoDraw:false}),
	        isc.VLayout.create({ height:"25%", members: flBlockResults.getMembers(),    autoDraw:false})
	    ],
	    autoDraw:false
	});
	return flowResultNavigation;

}


console.log('klaar laden flow/result/navigation ...');
