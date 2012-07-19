var OpenLayers = {};
var map = null;

/**** The method to be called after loading ****/
var afterLoad = function () {
    console.log('entering method "afterLoad()"');

    console.log('Loading Flooding application script');
    var flooding = loadFloodingApp();
    toolbarManager = new NToolbarManager();
    infoWindowManager = new NInfoWindowManager('main', scPage, {} );
    appManager = new NAppManager("appManager", "appHeaderPane", "subAppHeaderPane", {
        toolbarManager:  toolbarManager,
        mainScreenManager:  mainScreenManager,
        infoWindowManager:  infoWindowManager,
        rootUrl: flooding_config.root_url
    });

    appManager.addApps([flooding]);
    appManager.init();
    appManager.selectApp("flooding");
    appManager.selectApp("floodingResults", "flooding");
};

var onUnload = function () {
    appManager.registerApp(flooding_config.sitename, flooding_config.uberservice_url);
    overlayManager = null;

    try {
        if (map) {map.destroy();};
    } catch (e) {
        console.log('during unload: ' + e);
    }
    try {
        scPage.destroy();
    } catch (e) {
        console.log('during unload: ' + e);
    }
};

var onResize = function () {
    if (typeof(infoWindowManager)!= 'undefined') {
        infoWindowManager.repositionWindow();
    }
};
