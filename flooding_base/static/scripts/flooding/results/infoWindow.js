// Uses CONFIG from flooding_config.js

console.log('start laden flooding/result/infowindow ...');

function frInfoWindowSettings() {
    console.log('entering method: "frInfoWindowSettings"');
    iwScenarioInformation = new NInfoWindow("Scenario Informatie",{

        tabName: 'Info' ,
	defaultSize : {width: 420, height:400 },
	canClose: false,
	canMax: false,
	canMin: false,
	showTitle: true,
	preLoad:false,
	enabled:false,

	isForm:false,
	baseUrl: flooding_config.root_url + "flooding/infowindow/",
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

    iwScenarioRemarks = new NInfoWindow("Scenario Opmerkingen",{

        tabName: 'Opmerkingen' ,
	defaultSize : {width: 420, height:320 },
	canClose: false,
	canMax: false,
	canMin: false,
	showTitle: true,
	preLoad:false,
	enabled:false,

	isForm:true,
	baseUrl: flooding_config.root_url + "flooding/infowindow/",
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

    iwApprovalInformation = new NInfoWindow("Keuringen",{
        tabName: 'Goedkeuring' ,
	defaultSize : {width: 420, height:400 },
	canClose: false,
	canMax: false,
	canMin: false,
	showTitle: true,
	preLoad:false,
	enabled:false,

	isForm:true,
	baseUrl: flooding_config.root_url + "flooding/infowindow/",
	params:{scenarioid:1,action:'approval'},
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

    iwEdit = new NInfoWindow("Scenario bewerken",{
        tabName: 'Bewerken' ,
	defaultSize : {width: 300, height:400 },
	canClose: false,
	canMax: false,
	canMin: false,
	showTitle: true,
	preLoad:false,
	enabled:false,

	isForm:false,
	baseUrl: flooding_config.root_url + "flooding/infowindow/",
	params:{scenarioid:1,action:'edit'},
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

    iwLegend = new NLegendInfoWindow("Legenda",{
        tabName: 'Legenda' ,
	defaultSize : {width: 300, height:400 },
	canClose: false,
	canMax: false,
	canMin: false,
	showTitle: true,
	preLoad:false,
	enabled:false,
	rootURL: flooding_config.root_url,
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

    iwArchive = new NInfoWindow("Archief",{
        tabName: 'Archief' ,
    	defaultSize : {width: 300, height:400 },
    	canClose: false,
    	canMax: false,
    	canMin: false,
    	showTitle: true,
    	preLoad:false,
    	enabled:false,
    	baseUrl: flooding_config.root_url + "flooding/infowindow/",
    	params:{scenarioid: 1, action: 'archive'},
    	type: HTMLPANE,
    	isForm:true,

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


    return [iwScenarioInformation, iwLegend, iwScenarioRemarks, iwApprovalInformation, iwEdit, iwArchive ];
}

console.log('klaar laden flooding/result/infowindow ...');
