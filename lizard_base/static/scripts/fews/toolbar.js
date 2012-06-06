console.log('start laden fews/toolbar.js');

function ifmmToolbarSettings() {

	isc.IButton.create({
	    ID: "buttonGraph",
	    title: "Grafiek",
	    showRollOver: false,
	    showDown: true,
	    showFocused: false,
	    actionType: "radio",
	    radioGroup: "typeInfo",
	    width: 120,
	    click: function(form, item){
	        fcm.refreshContent();
	    },
	
	    autoDraw: false
	});
	
	isc.IButton.create({
	    ID: "buttonTable",
	    title: "Tabel",
	    showRollOver: false,
	    showDown: true,
	    showFocused: false,
	    actionType: "radio",
	    radioGroup: "typeInfo",
	    width: 120,
	    click: function(form, item){
	        fcm.refreshContent();
	    },
	
	    autoDraw: false
	});
	
	buttonGraph.select();

 
 	return {
 				name: "fews tools",
 				tools: [buttonGraph,
	    	 		"separator",
			 		buttonTable]
			 };
}

console.log('klaar laden fews/toolbar.js');

