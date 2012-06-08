console.log('start laden gisviewer/map/toolbar ...');


function gvToolbarSettings() {

    isc.Slider.create({
        ID: "gvSliderOpacityAB",
        vertical: false,
        width: "300px",
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
        title: "layer a- layer b",
        valueChanged : function (value) {
        	if (typeof(layera)!= 'undefined') {
				layera.setOpacity(1-(value/100));
			}
			if (typeof(layerb)!= 'undefined') {
				layerb.setOpacity(value/100);
			}
        }
    });

 	return {name: "gisviewer tools",
 			tools: [gvSliderOpacityAB]
		   };
}

console.log('klaar laden gisviewer/map/toolbar ...');

