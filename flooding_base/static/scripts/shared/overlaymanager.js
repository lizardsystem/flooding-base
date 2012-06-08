console.log('loading overlaymanager ...')

//TO DO: Overlay info wordt nu opgestapeld en onthouden, om de xx records alle data weggooien vanwege geheugen???

MAPOVERLAY= 1;
ANIMATEDMAPOVERLAY = 2;
MARKEROVERLAY = 3;
ANIMATEDMARKEROVERLAY = 4;
VECTOROVERLAY = 5;
WMSOVERLAY = 6;
ANIMATEDWMSOVERLAY = 7;

/*********************some superclasses**************************/
/*isc.DataSource.create({
    ID:"pgwFile",
    showPrompt:false,
    dataFormat:"json",
    recordXPath:"items",
    dataURL: lizardDataDirectory + "pgwfile.jsp",
    dataTransport : settingDataTransport,
    callbackParam : "callback",
    //dataURL:"regiontree.jsp",
    autoDraw:false,
    fields:[
        {name:"status", type:"boolean"},
        {name:"data", type:"text" }

    ]
});

isc.DataSource.create({
    ID:"resultSettings",
    showPrompt:false,
    dataFormat:"json",
    recordXPath:"items",
    dataURL: locationFloodingData ,
   	transformRequest : function (dsRequest) {
        if (dsRequest.operationType == "fetch") {
            var params = {action : 'get_result_settings'};
            // combine paging parameters with criteria
            return isc.addProperties({}, dsRequest.data, params);
        }
    },
    autoDraw:false,
    fields:[
        {name:"id", type:"integer"},
        {name:"firstnr", type:"integer"},
        {name:"lastnr", type:"integer"},
        {name:"startnr", type:"integer"},
        {name:"north", type:"integer"},
        {name:"south", type:"integer"},
        {name:"west", type:"integer"},
        {name:"east", type:"integer"},
        {name:"gridsize", type:"float"},
        {name:"width", type:"integer"},
        {name:"height", type:"integer"}
    ]
});*/

/******************Overlay Manager***********************/
//options: use overlay select, png prefix, maxFramesPreLoad
NOverlayManager = function(_map,options) {
    options = options || {};
    this._map = _map;

    this.animationControl = new NAnimationControl(_map,this, null);

    this.overlay = {};
    this.activeOverlay = null;

    this.prefixPngLocation = options.prefixPngLocation || "";
    this.maxFramesPreLoad = options.maxFramesPreLoad || 60;
    this.opacity = 1;
}

NOverlayManager.prototype.setMap = function(_map) {
	this._map = _map;
}

/*** Sets the opacity of the layer. The parameter 'opacity' is an integer between ?? and ?? ***/
NOverlayManager.prototype.setOpacity = function(opacity) {
    this.opacity = opacity;
    if (this.activeOverlay) {
        this.activeOverlay.setOpacity(opacity);
    }
}

//ok, if statements are ok
NOverlayManager.prototype.destroy = function() {
    this.clearAllOverlays();
    if (this.useOverlaySelect) {this.overlaySelect.remove();}
    this.animationControl.remove();
    for (el in this) {
        delete this[el];
    }
}

/*** Returns the RawResultUrl of the activer layer  ***/
NOverlayManager.prototype.getRawResultUrl = function() {
    if (this.activeOverlay!= null) {
        return this.activeOverlay.getRawResultUrl();
    } else {
    	return null;
    }    
}

NOverlayManager.prototype.hide = function() {
    //hide controls
    this.animationControl.hide();
    //hide overlay
    if (this.activeOverlay) {
    	this.activeOverlay.hide(true);
    }
}

//TO DO, deze functie herschrijven
NOverlayManager.prototype.show = function() {
    //if animation, show animation control
    if (this.activeOverlay) {
        if (this.activeOverlay.type == ANIMATEDMAPOVERLAY || this.activeOverlay.type == ANIMATEDWMSOVERLAY ) {
            this.animationControl.show();
            this.showOverlay( this.animationControl.frameNr);
        } else {
        	this.showOverlay();
        }
    }
}


/*** Adds an overlay and then initializes the overlay. The paramater 'callbackl' is a method the will be passed
     to the init method. ***/
NOverlayManager.prototype.addOverlay = function(overlay,callback){
	var callback = callback || function() {};
	
	if (this.overlay[overlay.id]) {
        console.log("overlay "+ overlay.id+ "already exist" );
    } else {
        this.overlay[overlay.id] = overlay;
        overlay.addOverlayToOverlaymanager(this);
    }
		
	overlay.init(callback);
}


NOverlayManager.prototype.addAndSetActiveOverlay = function(overlay) {
    this.hideOverlay();
    this.animationControl.stop();
    	
  	if (overlay !=null) {
        //add overlay
        var this_ref = this;
        //a-synchrone
        this.addOverlay(overlay,function(){
            this_ref.setActiveOverlay(overlay.id);
        });
        return true;
    } else {
        console.log("error overlay is null" );
        return false;
    }
}


NOverlayManager.prototype.setActiveOverlay = function(id) {
    //kijk of overlay bestaat
    //to do: 0 verder en logisch invullen
    this.hideOverlay();
    this.animationControl.stop();

   if (this.overlay[id]) {
        this.activeOverlay = this.overlay[id];
        console.log("set overlay to "+ id );
    } else if (id==0) {
        this.animationControl.hide();
        return true;
    } else {
        console.log("cannot set overlay to "+ id );
        return false;
    }


    //kijk of AnimationControl moet worden toegevoegd
    if (this.activeOverlay.type == ANIMATEDMAPOVERLAY || this.activeOverlay.type == ANIMATEDWMSOVERLAY)  {
        this.animationControl.show();
        this.animationControl.initOverlay(this.activeOverlay);
        this.animationControl.startFrame();
        if (this.activeOverlay.animation.autoplay) {
        	this.animationControl.play();
        }
    } else {
        this.animationControl.hide();
        this.showOverlay();        
    }
    //laat legenda zien
    // OUDE CODE???
    if (this.activeOverlay.legenda) {
        var tmp = ( this.activeOverlay.filename).replace('\\','/');
        var reg = /\S*\//;
        var legendaUrl = tmp.match(reg) + 'colormapping.csv';        
        this.activeOverlay.legenda.fetchData( legendaUrl, function(legenda,data,responce){
            tabLegenda.setContents(legenda.getHTML());//
            //scLegenda.contents
        });

    }
    return true;
}

NOverlayManager.prototype.addOverlay = function( overlay, callback ) {
    if (this.overlay[overlay.id]) {
        console.log("overlay "+ overlay.id+ "already exist" );
    } else {
        this.overlay[overlay.id] = overlay;
        overlay.addToOverlayManager(this, callback);
    }
}

NOverlayManager.prototype.removeOverlay = function(overlay ) {
    if (this.useoverlaySelect) { this.overlaySelect.removeOption(overlay.id,overlay.name);}
    //this.overlay[overlay.id] = null;
    this.overlay[overlay.id].destroy();
    delete this.overlay[overlay.id] ;
}

NOverlayManager.prototype.clearAllOverlays = function( ) {
    //remember last state
    if (this.activeOverlay) {
        this._lastActive = this.activeOverlay.name;
    }

    for (elem in this.overlay) {
        this.overlay[elem].destroy();
        delete  this.overlay[elem] ;
    }

    this.activeOverlay = null;
}

NOverlayManager.prototype.hideOverlay = function(realhide) {
    
    this.animationControl.stop();
    if (this.activeOverlay == null) {
    	return false;
    }

    this.activeOverlay.hide(realhide);
    return true;
}

NOverlayManager.prototype.showOverlay = function (frameNr) {
    if(this.activeOverlay == null) {return false;}

    this.activeOverlay.show(frameNr);    
    return true;
}