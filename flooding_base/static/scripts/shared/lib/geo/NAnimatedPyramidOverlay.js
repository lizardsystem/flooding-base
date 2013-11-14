function NAnimatedPyramidOverlay(id, name, options) {
    NPyramidOverlay.call(this, id, name, options);

    this.type = ANIMATEDPYRAMIDOVERLAY;
    this.settingsRequestUrl = flooding_config.animated_pyramid_parameters_url;
    this.framesRequestParams = {
        'timestep': 1
    };
    this.animation = {
        'display_firstnr' : 1,
        'delta': 3600,
        'showValue': 1
    };

    this.preloaded_wms_layers = {};
}

NAnimatedPyramidOverlay.prototype = new NPyramidOverlay();

NAnimatedPyramidOverlay.prototype.getLayerSettingsByRequestData = function(callback){
    console.log("getLayerSettingsByRequestData");
    console.log("url "+this.settingsRequestUrl);
    console.log("params"+this.settingsRequestParams);

    var layer_ref = this;
    var postParams = this.settingsRequestParams;

    RPCManager.sendRequest({
        actionURL: this.settingsRequestUrl,
        showPrompt:true,
        useSimpleHttp: true,
        httpMethod: "GET",
        params: postParams,
        callback: function(response, data, request){
            if (response.httpResponseCode == 200) {
                console.log("Data ophalen gelukt.");

                data = JSON.parse(data);
                console.log(data);

                layer_ref.layer_id = data.layer;
                layer_ref.frames = data.frames;
                layer_ref.animation.display_lastnr = data.frames;
                layer_ref.styles = data.styles;

                //if a callback function is specified, execute this function
                if (callback) {
                    console.log('callback after getting request data');
                    callback();
                }
            } else {
                console.log("Fout bij het ophalen van gegevens.");
            }
        }
    });
};

NAnimatedPyramidOverlay.prototype.setupPreloads = function(timestep) {
    // Remove old preloads
    for (var t in this.preloaded_wms_layers) {
        if (t < timestep) {
            delete this.preloaded_wms_layers[t];
        }
    }

    var map_options = {
        singleTile: true,
        isBaseLayer: false,
        displayInLayerSwitcher: this.displayInLayerSwitcher,
        units: 'm'
    };

    if (!this.displayOutsideMaxExtent) {
        map_options.maxExtent = this.maxExtent;
        map_options.displayOutsideMaxExtent = this.displayOutsideMaxExtent;
    }

    for (t = timestep; t < timestep+5; t++) {
        if (typeof this.preloaded_wms_layers[t] === "undefined") {
            console.log("Preloading for timestep "+t);
            var layer = this.layer_id.replace('FRAME', t);

            this.preloaded_wms_layers[t] = new OpenLayers.Layer.WMS(
                "pyramidtest", "http://127.0.0.1:5000/wms" , {
                    'layers': layer,
                    'styles': this.styles
                } , map_options);
        }
    }
};

NAnimatedPyramidOverlay.prototype._init = function() {
    var timestep = this.framesRequestParams.timestep;
    this.setupPreloads(timestep);

    this.layer = this.preloaded_wms_layers[timestep];

    this.show();

    this.isInit = true;
};
