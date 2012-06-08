console.log('start laden flow/result/infowindow ...');

function flInfoWindowSettings() {
    console.log('entering method: "flInfoWindowSettings"');    
    flowIwScenarioInformation = new NInfoWindow("Scenario Informatie",{
        
        tabName: 'Info' ,
		defaultSize : {width: 350, height:400 },
		canClose: false,
		canMax: false,
		canMin: false,
		showTitle: true,
		preLoad:false,
		
		isForm:false,
		baseUrl:rootUrl+"flow/infowindow/",
		params:{scenarioid:1,action:'information'},
		type: HTMLPANE,
		
        
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
    
    flowIwScenarioRemarks = new NInfoWindow("Scenario Opmerkingen",{
        
        tabName: 'Opmerkingen' ,
		defaultSize : {width: 440, height:320 },
		canClose: false,
		canMax: false,
		canMin: false,
		showTitle: true,
		preLoad:false,
		
		isForm:true,
		baseUrl:rootUrl+"flow/infowindow/",
		params:{scenarioid:1,action:'remarks'},
		type: HTMLPANE,
		
        
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
	
    
    /*flowIwLegend = new NInfoWindow("Legenda",{
        tabName: 'Legenda' ,
		defaultSize : {width: 440, height:400 },
		canClose: false,
		canMax: false,
		canMin: false,
		showTitle: true,
		preLoad:false,
		
		isForm:false,
		baseUrl: "/visualization/legend/",
		params:{object_id:1},
		type: HTMLPANE,
        
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
    */
    
	
    return [ flowIwScenarioInformation, flowIwScenarioRemarks ];
}

console.log('klaar laden flow/result/infowindow ...');

