console.log('start laden nhi/map//infowindow ...');

function nhi_mapInfoWindowSettings() {

    console.log('entering method: "nhi_mapInfoWindowSettings"');    
    
    nhi_mapLegend = new NLegendInfoWindow("Legend",{
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
	
    return [nhi_mapLegend];
}

console.log('klaar laden nhi/map/infowindow ...');