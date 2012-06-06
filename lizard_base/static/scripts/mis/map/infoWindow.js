console.log('start laden mis/map//infowindow ...');

function mis_mapInfoWindowSettings() {

    console.log('entering method: "mis_mapInfoWindowSettings"');    
    
    mis_mapLegend = new NLegendInfoWindow("Legend",{
        tabName: 'Legend',
		defaultSize : {width: 300, height:400 },
		canClose: false,
		canMax: false,
		canMin: false,
		showTitle: true,
		preLoad:false,
		enabled:false,
		rootURL:rootUrl,
		isForm:false,		
        
        onInit: function(isSelected){

        },
        onRefreshContent:function(isSelected,reason){
        
        },
        onSelect: function() {
        
        },
        onUnSelect: function() {
        
        },
        onDestroy: function() {
        
        }
    });	
	
    return [mis_mapLegend];
}

console.log('klaar laden mis/map/infowindow ...');

