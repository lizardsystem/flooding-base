/*************************************************************/
/**** description: 	Load the Flow application            */
/****                                                        */
/*************************************************************/

function loadFlowApp(urlScriptRoot) {
    console.log('loading Flow Application')
    flow = new NApp("flow",{
        id: "flow",
        description: "model resultaten",
        defaultSubAppId: "flowResults",        

        onInit:function() {},
        onShow:function() {},
        onHide:function() {}
    });

	// Create Flooding
    flow_result = new NApp("resultaten",{
        id: "flowResults",
        description: "modelr esultaten bekijken",
        screenType: MAP,
        combMapData:true,

        navigation: new NNavigation({ initFunction: "flNavigation"}),
        //overlayContainer: new NOverlayContainer({ initFunction: "frOverlaySettings"}),
        infoWindowContainer: new NInfoWindowContainer({ initFunction: "flInfoWindowSettings"}),
        toolbar: new NToolbar({ initFunction: "flToolbarSettings"}),
        overlayManager: new NOverlayManager(map, {prefixPngLocation: lizardKbFloodPngDirectory}),
        
        onInit:function() {},
        onShow:function() {},
        onHide:function() {}
    });


    flow_table = new NApp("tabel",{
        id: "flowTable",
        description: "overzicht scenario's",        

        screenType: IFRAME,
		url:'flow/scenario/',

        onInit:function() {},
        onShow:function() {},
        onHide:function() {}
    });

	//flow.addSubApps([flow_result, flow_table]);
}