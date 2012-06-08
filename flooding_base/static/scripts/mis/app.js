/*************************************************************/
/**** description: 	Load the Flooding application            */
/****                                                        */
/*************************************************************/

function loadMisApp(urlScriptRoot) {
    console.log('loading MIS Application')
    mis = new NApp("Nepal RWSS Sector MIS/DSS 1.0",{
        id: "mis",
        description: "management information system",
        defaultSubAppId: "mis_map",        

        onInit:function() {},
        onShow:function() {},
        onHide:function() {}
    });

	// Create App
    mis_map = new NApp("map",{
        id: "mis_map",
        description: "management information on maps",
        screenType: MAP,
        combMapData:false,

        navigation: new NNavigation({ initFunction: "mis_mapNavigation"}),        
        infoWindowContainer: new NInfoWindowContainer({ initFunction: "mis_mapInfoWindowSettings"}),
        toolbar: new NToolbar({ initFunction: "mis_mapToolbarSettings"}),
        overlayManager: new NOverlayManager(map),
        
        onInit:function() {},
        onShow:function() {},
        onHide:function() {}
    });


    mis_table = new NApp("dss",{
    	id: "mis_table",
        description: "management information in tables",
        screenType: IFRAME,
		url:'mis/table/',
	
		navigation: new NNavigation({ initFunction: "mis_tableNavigation"}), 
		
        onInit:function() {},
        onShow:function() {},
        onHide:function() {}
    });

    mis_report = new NApp("report",{
    	id: "mis_report",
        description: "management information reports",
        screenType: FRAME,
        combMapData:true,

        navigation: new NNavigation({ initFunction: "mis_reportNavigation"}),        

        onInit:function() {},
        onShow:function() {},
        onHide:function() {}
    });

    mis_admin = new NApp("data",{
        id: "mis_admin",
        description: "admin",        

        screenType: IFRAME,
		url:'admin/mis_nepal/',

        onInit:function() {},
        onShow:function() {},
        onHide:function() {}
    });
    
    mis_import = new NApp("import",{
        id: "mis_import",
        description: "import new data with excelsheets",        

        screenType: IFRAME,
		url:'mis/import_overview/',
        onInit:function() {},
        onShow:function() {},
        onHide:function() {}
    });
      
}