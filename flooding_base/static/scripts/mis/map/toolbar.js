console.log('start laden mis/map/toolbar ...');




function mis_mapToolbarSettings() {

    isc.Slider.create({
        ID: "sliderOpacityMis",
        vertical: false,
        width: "190px",
        minValue: 0,
        maxValue: 100,
        numValues: 21,
        value:70,
        showRange: false,
        showTitle: true,
        //disabled:true,
        //showValue: true,
        labelHeight:11,
        labelSpacing:0,
        height:20,
        title: "Opacity",
        valueChanged : function (value) {

				if (appManager.selectedApp.overlayManager) {
					appManager.selectedApp.overlayManager.setOpacity(value/100);
				}

        }
    });
    
    isc.IButton.create({
	    ID: "buttonReport",
	    title: "Report",
	    showRollOver: false,
	    showDown: true,
	    showFocused: false,
	    actionType: "radio",
	    radioGroup: "typeInfo",
	    width: 120,
	    click: function(form, item){
	        //fcm.refreshContent();
	    },
	
	    autoDraw: false
	});
	
	isc.IButton.create({
	    ID: "buttonName",
	    title: "Region name",
	    showRollOver: false,
	    showDown: true,
	    showFocused: false,
	    actionType: "radio",
	    radioGroup: "typeInfo",
	    width: 120,
	    click: function(form, item){
	        //fcm.refreshContent();
	    },
	
	    autoDraw: false
	});
	
	buttonReport.select();
    
    isc.IButton.create({
	    ID: "buttonPrint",
	    title: "Print",
	    showRollOver: false,
	    showDown: true,
	    showFocused: false,
	    width: 120,
	    click: function(form, item){
	        printContent(document.getElementById('map'))
	    },
	
	    autoDraw: false
	});
	
	
	
	
	
	isc.IButton.create({
	    ID: "buttonZoomToDistrict",
	    title: "Zoom to District",
	    showRollOver: false,
	    showDown: true,
	    showFocused: false,
	    width: 120,
	    click: function(form, item){
	        if (typeof(user_zoom) != 'undefined') {
	        	map.zoomToExtent(user_zoom);
	        }
	    },
	
	    autoDraw: false
	});
	
 
 	return {
 				name: "mis_map tools",
 				tools: [sliderOpacityMis, "seperator", buttonReport, buttonName, "separator" ,buttonZoomToDistrict, buttonPrint]
			 };
}


function printContent(ctrl) {
	var DocumentContainer = ctrl;
	a = document.getElementById('map')
	a.style.width = a.scrollWidth
	a.style.size = "landscape"
	
	var WindowObject = window.open('', "Print",
		"width="+ ctrl.scrollWidth +",height="+ctrl.scrollHeigth+",top=250,left=345,toolbars=no,scrollbars=no,status=no,resizable=no");

	WindowObject.document.write(DocumentContainer.innerHTML);
	WindowObject.document.close();
	WindowObject.focus();
	WindowObject.print();
	//WindowObject.close();
}




console.log('klaar laden mis/map/toolbar ...');

