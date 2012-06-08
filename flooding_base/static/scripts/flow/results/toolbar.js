console.log('start laden flow/result/toolbar ...');


function flToolbarSettings() {



    isc.Slider.create({
        ID: "flowSliderOpacity",
        vertical: false,
        width: "190px",
        minValue: 0,
        maxValue: 100,
        numValues: 21,
        value:100,
        showRange: false,
        showTitle: true,
        //showValue: true,
        labelHeight:8,
        labelSpacing:1,
        height:20,
        title: "Doorzicht",
        valueChanged : function (value) {
			if ((value<100) && !doneWarningIE) {
				alert("Waarschuwing:\nHet doorzichtig maken van de kaartlagen, in combinatie met het ver ingezoomd zijn, neemt bij gebruik van Internet Explorer (erg) veel geheugen in. Aangeraden wordt om niet te ver in te zoomen of een andere browser te gebruiken" );
				doneWarningIE = true;
				sliderOpacity.setValue(100);
				
			} else {
				if (typeof(appManager.selectedApp.overlayManager) != 'undefined') {
					appManager.selectedApp.overlayManager.setOpacity(value / 100);
				}
			}
        }
    });
    

 	return {
 				name: "flow resulttools",
 				tools: [flowSliderOpacity]
			 };
}

console.log('klaar laden flow/result/toolbar ...');

