/*************************************************************/
/**** description: 	Load NHI viewer application          */
/****                                                        */
/*************************************************************/

function loadNHIApp(urlScriptRoot) {
    console.log('loading NHI viewer Application')
    nhi = new NApp("NHI",{
        id: "nhi",
        description: "NHI viewer",
        defaultSubAppId: "nhi_map"        
    });

	// Create NHI viewer
    nhi_map = new NApp("map",{
        id: "nhi_map",
        description: "NHI gegevens bekijken op de kaart",
        screenType: MAP,
        combMapData:true,

        navigation: new NNavigation({ initFunction: "nhi_mapNavigation"}),
        overlayManager: new NOverlayManager(map),
        infoWindowContainer: new NInfoWindowContainer({ initFunction: "nhi_mapInfoWindowSettings"}),        
        toolbar: new NToolbar({ initFunction: "nhi_toolbarSettings"}),
        
        onInit:function() {},
        onShow:function() {},
        onHide:function() {}
    }
    );	
}