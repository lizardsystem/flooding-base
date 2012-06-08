
function loadFewsApp(urlScriptRoot) {

	mmNavigation = new NNavigation({initFunction: "ifmmNavigation"});
	mmToolbar = new NToolbar({initFunction: "ifmmToolbarSettings"});

    fews = new NApp("fews",{
        id: "fews",    
        description: "actuele en historische metingen",
        defaultSubAppId: "fewsMap",
 
        onInit:function() {},
        onShow:function() {},
        onHide:function() {}
    });

    fews_map = new NApp("map",{
        id: "fewsMap",
        description: "met kaart",

        screenType: MAP,
        combMapData:true,

        navigation: mmNavigation,
        overlayContainer: new NOverlayContainer({initFunction: "ifmmOverlaySettings"}),
        toolbar: mmToolbar,
        
        onInit:function() {},
        onShow:function() {
            try {
                fcm.refreshContent();
            }
            catch (e) {
                console.log("error: "+ e)
            }
        },
        onHide:function() {}
    });

    fews_graphs = new NApp("grafiek",{
        id: "fewsGraph",
        description: "zonder kaart",
        
        screenType: FRAME,
                
		navigation: mmNavigation,
        toolbar: mmToolbar,
		
        onInit:function() {},
        onShow:function() {
            try {
                fcm.refreshContent();
            }
            catch (e) {
                console.log("error: "+ e)
            }
        },
        onHide:function() {}
    });

    fews_report = new NApp("report",{
    	id: "fewsReport",
        description: "rapportage module",

        screenType: IFRAME,
        url: 'report/?is_standalone=0',

        onInit:function() {},
        onShow:function() {},
        onHide:function() {}
    });

    fews_lcm = new NApp("configuratie",{
    	id: "fewsConfig",
        description: "configuratie manager",
        combMapData:true,

        screenType: IFRAME,
        url: 'admin/',

        onInit:function() {},
        onShow:function() {},
        onHide:function() {}
    });


     

}