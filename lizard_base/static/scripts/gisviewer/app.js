/*************************************************************/
/**** description: 	Load the Gis viewer application            */
/****                                                        */
/*************************************************************/

function loadGisviewerApp(urlScriptRoot) {
    console.log('loading Gis viewer Application')
    gisviewer = new NApp("info",{
        id: "gisviewer",
        description: "gis kaartlagen",
        defaultSubAppId: "gisviewerMap"        
    });

	// Create Flooding
    gisviewer_map = new NApp("map",{
        id: "gisviewerMap",
        description: "gis gegevens kijken op kaart",
        screenType: MAP,
        combMapData:true,

        navigation: new NNavigation({ initFunction: "gvNavigation"}),
        //overlayContainer: new NOverlayContainer({ initFunction: "gvOverlaySettings"}),
        toolbar: new NToolbar({ initFunction: "gvToolbarSettings"}),
        
        onInit:function() {
			
			get_popup_content = function(id,name, service_url, params, cloud_width, cloud_height, cloud_ref, divname ){
	            var width = cloud_width;
	            var height = cloud_height-25;
	            RPCManager.sendRequest({
					actionURL: locationMapviewerData + 'get_popup_content',
					useSimpleHttp: true,
					httpMethod: "GET",		 
					params: {obj_id:id}, 
					callback: function(response, data, request){
							  	 
							  	 if (response.httpResponseCode == 200) {
							     	
							     	cloud_ref.setHtmlSpan(data, divname);

							     } else {
							     	console.log("Fout bij het ophalen van gegevens.");  
							     	return '<b>' + name + '</b><br>' + ST_NO_DATA               
							     }
					}
				});
				return 'laden....'

       		}
        	
        	
        	
        	
        	layera = new NWMSOverlay('layera', 'layera', {
			    //legendWindow: iwLegend,
			    geoType:3,
			    valueType:1,	
			    singleTile:true,				    
				getSettingsFromRequest: false,
				getFramesFromRequest:true,
				frameUrl:locationMapviewerData + 'wms', 
				framesRequestParams: {
					action:'get_wms_of_shape_a'
				},
				cloud: {
					content_function:get_popup_content,
					min_width:400,
    				max_width:600,
    				min_height:150,
    				max_heigh:150
				},
				rawResultUrl:locationFloodingData + '?TODO' 			
			});  
			
			layera.addToMap(map);   
			
			layerb = new NWMSOverlay('layerb', 'layerb', {
			    //legendWindow: iwLegend,
			    geoType:3,
			    valueType:1,
			    singleTile:true,					    
				getSettingsFromRequest: false,
				getFramesFromRequest:true,
				frameUrl:locationMapviewerData + 'wms', 
				framesRequestParams: {
					action:'get_wms_of_shape_b'
				},
				cloud: {
					content_function:get_popup_content,
					min_width:400,
    				max_width:600,
    				min_height:150,
    				max_heigh:150
				},
				rawResultUrl:locationFloodingData + '?TODO' 			
			});  
			layerb.addToMap(map);  
        },
        onShow:function() {
        	layera.show(); 
        	layerb.show();   
        },
        onHide:function() {
        	layera.hide();
        	layerb.hide();
        }
    });

}