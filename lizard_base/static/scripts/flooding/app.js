/*************************************************************/
/**** description: 	Load the Flooding application            */
/****                                                        */
/*************************************************************/

function loadFloodingApp(urlScriptRoot) {
    console.log('loading Flooding Application')
    flooding = new NApp("flooding",{
        id: "flooding",
        description: "overstromingsinformatie",
        defaultSubAppId: "floodingResults",        

        onInit:function() {},
        onShow:function() {},
        onHide:function() {}
    });

	// Create Flooding
    flooding_result = new NApp(ST_RESULTS ,{
        id: "floodingResults",
        description: "resultaten overstromings informatie bekijken",
        screenType: MAP,
        combMapData:true,

        navigation: new NNavigation({ initFunction: "frNavigation"}),        
        infoWindowContainer: new NInfoWindowContainer({ initFunction: "frInfoWindowSettings"}),
        overlayContainer: new NOverlayContainer({ initFunction: "frOverlaySettings"}),
        toolbar: new NToolbar({ initFunction: "frToolbarSettings"}),
        overlayManager: new NOverlayManager(map, {prefixPngLocation: lizardKbFloodPngDirectory}),
        
        onInit:function() {},
        onShow:function() {
        		try {
        			region_layers_results.addOverlays();
        		} 
        		catch (e) {}
        },
        onUnselect:function() {        		
        		cancelLayerControls();
				try {
					region_layers_results.removeOverlays();
				} 
				catch (e) {} 
        }
    });


    flooding_new = new NApp(ST_NEW_SCENARIO,{
    	id: "floodingNew",
        description: "nieuwe overstromingsinformatie samenstellen",
        screenType: MAP,
        combMapData:true,

        navigation: new NNavigation({ initFunction: "fnNavigation"}),        
        infoWindowContainer: new NInfoWindowContainer({ initFunction: "fnInfoWindowSettings"}),
        overlayContainer: new NOverlayContainer({ initFunction: "fnOverlaySettings"}),
        //toolbar: new NToolbar({initFunction: "fnToolbarSettings"}),
        overlayManager: new NOverlayManager(map, {prefixPngLocation: lizardKbFloodPngDirectory}),

        onInit:function() {},
        onShow:function() {
        		try {
        			region_layers.addOverlays();
        		} 
        		catch (e) {}
        },
        onUnselect:function() {        		
        		cancelLayerControls();
				try {
					region_layers.removeOverlays();
				} 
				catch (e) {} 
        }
    });

    flooding_table = new NApp(ST_TABLE,{
        id: "floodingTable",
        description: "overstromings informatie",        

        screenType: IFRAME,
		url:'flooding/scenario/',

        onInit:function() {},
        onShow:function() {},
        onHide:function() {}
    });
    
    flooding_import = new NApp(ST_IMPORT,{
        id: "floodingImport",
        description: "importeren scenario gegevens",        

        screenType: IFRAME,
		url:'flooding/tools/import/',

        onInit:function() {},
        onShow:function() {},
        onHide:function() {}
    });
    
    
     flooding_export = new NApp(ST_EXPORT,{
        id: "floodingExport",
        description: "exporteren voor genereren waterkaart",        

        screenType: IFRAME,
		url:'flooding/tools/export/',

        onInit:function() {},
        onShow:function() {},
        onHide:function() {}
    });  
}