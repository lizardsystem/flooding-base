function nhi_toolbarSettings(){

		
	isc.Slider.create({
        ID: "sliderOpacity",
        vertical: false,
        width: "190px",
        minValue: 0,
        maxValue: 100,
        numValues: 21,
        value:100,
        showRange: false,
        showTitle: true,
        disabled:false,
        //showValue: true,
        labelHeight:11,
        labelSpacing:0,
        height:20,
        title: "Doorzicht",
        valueChanged : function (value) {
			
				if (appManager.selectedApp.overlayManager) {
					appManager.selectedApp.overlayManager.setOpacity(value / 100);
				}
        }
    });

		    
    return {
 				name: "nhi resulttools",
 				tools: [sliderOpacity]
			 };
}