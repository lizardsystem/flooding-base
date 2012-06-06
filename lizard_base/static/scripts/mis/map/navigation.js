console.log('laden mis/map/navigation ...');
/***************** functions **********************/


/******************** blocks **********************/
function mis_mapNavigation() {
	
	mis_mapBlockAbstractionlevel = new NBlock("levels", "level",
	{
	    dataURL: locationMisData,
	    fields:[
	        {name:"id", primaryKey:true, hidden:true, type:"integer"},
	        {name:"name", type:"text" }
	    ],
	    transformRequest : function (dsRequest) {
	        if (dsRequest.operationType == "fetch") {
	            var params = {action:'get_abstraction_levels', filter:'gis'};
	            // combine paging parameters with criteria
	            return isc.addProperties({}, dsRequest.data, params);
	        }
	    }
	}, {
	    emptyMessage:"<a href='javascript: mis_mapBlockAbstractionlevel.tree.fetchData()'>login<br>or get more permissions</a>",
	    autoFetchData:true,
	    leafClick: function(viewer,leaf,recordNum){
			mis_mapBlockAbstractionlevel.setLabel(leaf.name);
			appManager.selectedApp.overlayManager.clearAllOverlays();
			mis_mapBlockIndicator.tree.fetchData({abstractionlevel_id:leaf.id}, function(request,data,response) {
			      if (last_selected_indicator_id!=null) {
            			var nr = mis_mapBlockIndicator.tree.data.findIndex('id',last_selected_indicator_id);
            			if (nr >= 0) {
            				mis_mapBlockIndicator.tree.selectRecord(nr);
            				mis_mapBlockIndicator.tree.leafClick(null,mis_mapBlockIndicator.tree.getSelectedRecord(),null);
            			} else {
            				mis_mapLegend.disable(true);
            			}
            		}
			})
	    },
    	folderClick: function(viewer,folder,recordNum){

	    }
	});
	var last_selected_indicator_id = null;
	mis_mapBlockIndicator = new NBlock("indicators", "indicator",
	{
	    dataURL: locationMisData,
	    fields:[
	        {name:"id", primaryKey:true, hidden:true, type:"integer"},
	        {name:"name", type:"text" },
	        {name:"alis_id",  hidden:true, type:"integer"},
	        {name:"parentid", type:"integer" ,foreignKey:"id", rootValue:None },
	        {name:"isHeader"}
	    ],
	    transformRequest : function (dsRequest) {
	        if (dsRequest.operationType == "fetch") {
	            var params = {action :'get_indicator_tree', filter:'gis'};
	            // combine paging parameters with criteria
	            return isc.addProperties({}, dsRequest.data, params);
	        }
	    }
	},{
	    emptyMessage:"select item above",
	    leafClick: function(viewer,leaf,recordNum){
	        
	        if (leaf.isHeader == true) {
	        	alert('header ' + leaf.name);
	        } else {
	        	last_selected_indicator_id = leaf.id;
	        	mis_mapBlockIndicator.setLabel(leaf.name);
		        appManager.selectedApp.overlayManager.clearAllOverlays();
		        
		        if (!appManager.selectedApp.overlayManager.setActiveOverlay(leaf.alis_id)) {
		            //add overlay;	        	
					get_popup_content = function(id,name, service_url, params, cloud_width, cloud_height, cloud_ref, divname  ){
			            var width = cloud_width;
			            var height = cloud_height-25;
			            
			            if (buttonReport.isSelected()) {
				            RPCManager.sendRequest({
								actionURL: service_url,
								useSimpleHttp: true,
								httpMethod: "GET",		 
								params: {object_id:id,alis:params.result_id, action: 'get_kpi_report_alis' }, 
								callback: function(response, data, request){
										  	 
										  	 if (response.httpResponseCode == 200) {
										     	
										     	cloud_ref.setHtmlSpan(data, divname);
	
										     } else {
										     	console.log("Fout bij het ophalen van gegevens.");  
										     	return '<b>' + name + '</b><br>' + ST_NO_DATA               
										     }
								}
							});
							return ST_LOADING_DATA+'....'
						} else {
							cloud_ref.setHtmlSpan('<h1>' + name + '</h1>', divname);
							cloud_ref.popup.updateSize();
							return '<h1>' + name + '</h1>'
						}
		       		}
		       		mis_mapLegend.enable(true);
					
					layer = new NWMSOverlay(leaf.alis_id, leaf.name, {
					    legendWindow: mis_mapLegend,
					    legendBaseURL: 'mis/service/?action=get_legend&alis_id=',
					    rootURL:rootUrl,
					    singleTile:false,
					    //maxExtent: wms_bounds,
					    geoType:3,
					    valueType:2, 					    
						showLoadingMessage:true,
						getSettingsFromRequest: false,
						getFramesFromRequest:true,
						frameUrl :locationMisData, 
						framesRequestParams: {
							action:'get_wms_of_shape',
							result_id:leaf.alis_id
						},
						cloud: {
							content_function:get_popup_content,
							min_width:400,
    						max_width:600,
    						min_height:150,
    						max_heigh:150
						},
						app: 'mis',
						visibile: true						
					});
					
					layer.setAvailableLegends([{id:leaf.id, name:leaf.name}]);
               		layer.setDefaultLegend({id:leaf.alis_id, name:leaf.name});

					appManager.selectedApp.overlayManager.addAndSetActiveOverlay(layer);
 
				}       	        
	        	//alert('indicator ' + leaf.name);
	        }

	    },
	    folderClick: function(viewer,folder,recordNum){
	        this.openFolder(folder);
	
	    }
	});

	/******************** screen **********************/
	
	
	isc.VLayout.create({
	    ID:"mis_mapResultNavigation",
	    membersMargin: 5,
	    width: "100%", height: "100%", overflow:"hidden",
	    members: [
	        isc.VLayout.create({height:"25%", members:mis_mapBlockAbstractionlevel.getMembers(), autoDraw:false}),
	        isc.VLayout.create({height:"75%", members:mis_mapBlockIndicator.getMembers(), autoDraw:false})
	    ],
	    autoDraw:false
	});
	return mis_mapResultNavigation;

}

 


console.log('klaar laden mis/map/navigation ...');
