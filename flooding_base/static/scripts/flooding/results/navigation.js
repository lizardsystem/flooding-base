console.log('laden flooding/result/navigation ...');
/***************** functions **********************/
var selectedScenario = null;
var selectedRegion = null;

isc.DataSource.create({
    ID:"dsLoccuttoffs",
    showPrompt:false,
    dataFormat:"json",
    dataURL: locationFloodingData,
    transformRequest : function (dsRequest) {
        if (dsRequest.operationType == "fetch") {
            var params = {action : 'get_cutofflocations_from_scenario'};
            // combine paging parameters with criteria
            return isc.addProperties({}, dsRequest.data, params);
        }
    },
    /*transformResponse: function(dsResponse, dsRequest, data ) {
      frLoccutoffsLayer.refreshByData(data);
      frLoccutoffsLayer.show();
      },*/
    recordXPath:"items",
    autoFetchData:false,
    autoDraw:false,
    fields:[
        {name:"id", primaryKey:true, hidden:true, type:"text"},
        {name:"name", type:"text" },
        {name:"type", type:"text" },
        {name:"tclose", type:"text" },
        {name:"lat", type:"float" },
        {name:"lng", type:"float" }
    ]
});

function getSelectedScenario() {
    return selectedScenario;
}

function getSelectedRegion() {
    return selectedRegion;
}

function clear_breaches() {
    frBlockBreaches.clear(); // fetch empty array
    clear_scenarios();
    breachLayer.clearAll();
    breach_def = null;
}

function clear_scenarios() {
    console.log('clear_scenarios');
    frBlockScenarios.clear(); // fetch empty array
    selectedScenario = null;
    buttonExporteer.setDisabled(true);
    clear_results();
    frLoccutoffsLayer.clearAll();
    iwScenarioInformation.disable(false);
    iwScenarioRemarks.disable(false);
    iwEdit.disable(false);
    iwApprovalInformation.disable(true);
}

function clear_results() {
    frBlockResults.clear(); // fetch empty array
    clear_results_without_tree();
}

function clear_results_without_tree() {
    //set tree leeg
    frExtraEmbankmentLayer.hide();
    frBlockResults.setLabel();
    appManager.selectedApp.overlayManager.clearAllOverlays();
    appManager.selectedApp.overlayManager.hide();
    sliderOpacity.setDisabled(true);
    iwLegend.disable(true);
    //windowCaseInformation.hide();
}


/******************** blocks **********************/
function frNavigation() {

    isc.DataSource.create({
        ID: "dsListRegionMapsResults",
        showPrompt:false,
        dataFormat:"json",
        dataURL: locationFloodingData,
        transformRequest : function (dsRequest) {
            if (dsRequest.operationType == "fetch") {
                var params = {action : 'get_region_maps'};
                // combine paging parameters with criteria
                return isc.addProperties({}, dsRequest.data, params);
            }
        },
        autoFetchData:false,
        autoDraw:false
    });

    region_layers_results = new NOverlayContainer();

    frBlockRegions = new NBlock(
        ST_REGION,ST_REGION,
        {
            dataURL: locationFloodingData,
            fields: [
                {name:"rsid", primaryKey:true, hidden:true, type:"integer"},
                {name:"rid", primaryKey:true, hidden:true, type:"integer"},
                {name:"name", type:"text" },
                {name:"parentid", type:"integer" ,foreignKey: "rsid", rootValue:null },
                {name:"isregion"},
                {name:"north" , type:"integer"},
                {name:"south" , type:"integer"},
                {name:"west" , type:"integer"},
                {name:"east" , type:"integer"}
            ],
            transformRequest : function (dsRequest) {
                if (dsRequest.operationType == "fetch") {
                    var params = {action : 'get_region_tree'};
                    // combine paging parameters with criteria
                    return isc.addProperties({}, dsRequest.data, params);
                }
            }
        }, {
            emptyMessage:"<a href='javascript: frBlockRegions.tree.fetchData()'>herladen</a>",
            autoFetchData:true,
            leafClick: function(viewer,leaf,recordNum) {
                if (leaf.isregion === true) {
                    frBlockRegions.setLabel(leaf.name);
                    selectedRegion = leaf;//to do, dit moet anders
                    frBlockBreaches.tree.fetchData({region_id:leaf.rid, filter:floodingFilterResults},function(dsResponse, data, dsRequest) {
                        frbreachLayer.refreshByData(data);
                        frbreachLayer.show();

                    });//teken punten via callback (na het laden)
                    clear_scenarios();
                    Ozoom(map ,leaf );

                    region_layers_results.clear();
                    region_layers_results.addOverlays();
                    dsListRegionMapsResults.fetchData({region_id:leaf.rid}, function(dsResponse, data, dsRequest){
                        if (data.length > 0) {
                            for (var i=0; i<data.length; i++){
                                var map = data[i];
                                layer = new NWMSOverlay(map.id, map.name, {
                                    rootURL:map.url,
                                    singleTile:!(map.tiled),
                                    layerIndex:20-i,
                                    displayInLayerSwitcher: true,
                                    geoType:3,
                                    valueType:2,
                                    getSettingsFromRequest: false,
                                    getFramesFromRequest:true,
                                    frameUrl:map.url,
                                    app: 'flooding',
                                    visible: false
                                });
                                region_layers_results.addOverlayToContainer(layer);
                            }

                            //Bestaande keringen, get_existing_embankments_shape,
                            //Hoogtekaart, action:'get_extra_grid_shapes', only_selected:True
                            //Bestaande keringen, action:'get_extra_shapes', only_selected:True
                        }

                    });

                }
            },

            folderClick: function(viewer,folder,recordNum){
                Ozoom(map ,folder );
                this.openFolder(folder);
            }
        });

    frBlockBreaches = new NBlock(
        ST_BREACH,ST_BREACH,
        {
            dataURL:locationFloodingData,
            fields:[
                {name:"id", primaryKey:true, hidden:true, type:"integer"},
                {name:"name", type:"text" },
                {name:"parentid", type:"integer" ,foreignKey: "id", rootValue:None },
                {name:"isbreach"},
                {name:"x" , type:"integer"},
                {name:"y" , type:"integer"},
                {name:"info_url", type:"url"}
            ],
            transformRequest : function (dsRequest) {
                if (dsRequest.operationType == "fetch") {
                    var params = {action : 'get_breach_tree', onlyscenariobreaches:1};
                    // combine paging parameters with criteria
                    return isc.addProperties({}, dsRequest.data, params);
                }
            }
        },{
            fields: [
                {name:"name"},  // Description of breach
                {name:"info_url", // Clickable to get to breach info screen
                 type:"link",
                 align:"center",
                 linkText: isc.Canvas.imgHTML("/static_media/flooding_lib/img/icon-16-info.png"),
                 width:30}
            ],
            emptyMessage:ST_SELECT_REGION,
            leafClick: function(viewer,leaf,recordNum){
                if (leaf.isbreach === true) {
                    breach_def = leaf.id;//to do, dit kan anders
                    frBlockBreaches.setLabel(leaf.name);
                    frbreachLayer.select(leaf.id,false);
                    clear_scenarios();
                    frLoccutoffsLayer.clearAll();
                    frExtraEmbankmentLayer.hide();
                    frBlockScenarios.tree.fetchData({breach_id:leaf.id, filter:floodingFilterResults}, function(request, data) {
                        for (var idx=0; idx<data.length; idx++) {
                            if (data[idx].isFolder) {
                                frBlockScenarios.tree.openFolder(data[idx]);
                            }
                        }
                    });
                }
            },
            folderClick: function(viewer,folder,recordNum){
                this.openFolder(folder);

            }
        });

    frBlockScenarios = new NBlock(
        ST_SCENARIO,ST_SCENARIO,
        {
            dataURL: locationFloodingData,
            fields:[
                {name:"pid", primaryKey:true, hidden:true, type:"integer"},
                {name:"sid", primaryKey:true, hidden:true, type:"integer"},
                {name:"name", type:"text" },
                {name:"parentid", type:"integer" ,foreignKey: "pid", rootValue:None },
                {name:"status",type:"integer"}
            ],
            transformRequest : function (dsRequest) {
                if (dsRequest.operationType == "fetch") {
                    var params = {action : 'get_scenario_tree', onlyprojectswithscenario:1};

                    // combine paging parameters with criteria
                    return isc.addProperties({}, dsRequest.data, params);
                }
            }
        },{
            emptyMessage:ST_SELECT_BREACH,
            leafClick: function(viewer,leaf,recordNum){
                clear_results_without_tree();
                frBlockScenarios.setLabel(leaf.name);
                buttonExporteer.setDisabled(false);
                selectedScenario = leaf;//to do: dit moet anders
                frBlockResults.tree.fetchData({scenario_id:leaf.sid}, function(request,data,response){
                });

                // Enable tabs for the infowindows
                console.log('enabling informationwindows');
                iwScenarioInformation.enable(false);
                iwScenarioRemarks.enable(false);
                iwEdit.enable(false);
                iwApprovalInformation.enable(true);
                if (leaf.strategy_id !== null) {
                    frExtraEmbankmentLayer.setParams({strategy_id:leaf.strategy_id});
                    frExtraEmbankmentLayer.show();
                }


                // Send id to the information windows (information, remarks and approval)
                iwScenarioInformation.addOrUpdateParams({scenarioid:leaf.sid});
                iwScenarioRemarks.addOrUpdateParams({scenarioid:leaf.sid});
                iwApprovalInformation.addOrUpdateParams({scenarioid:leaf.sid});
                iwEdit.addOrUpdateParams({scenarioid:leaf.sid});
                iwLegend.addOrUpdateParams({scenarioid:leaf.sid});


                dsLoccuttoffs.fetchData({scenario_id:leaf.sid}, function(dsResponce,data,dsRequest) {
                    frLoccutoffsLayer.refreshByData(data);
                    frLoccutoffsLayer.show();
                });
            },
            folderClick: function(viewer,folder,recordNum) {
                this.openFolder(folder);
            }
        });

    frBlockResults = new NBlock(
        ST_RESULT, ST_RESULT,
        { //datasource
            dataURL: locationFloodingData,
            fields:[
                {name:"id", primaryKey:true, hidden:true, type:"integer"},
                {name:"name", type:"text" },
                {name:"geoType",type:"integer"},
                {name:"valueType",type:"integer"},
                {name:"resulttypeid",type:"integer"}
            ],
            transformRequest : function (dsRequest) {
                if (dsRequest.operationType == "fetch") {
                    var params = {action : 'get_presentation_of_scenario'};//get_results_from_scenario
                    // combine paging parameters with criteria
                    return isc.addProperties({}, dsRequest.data, params);
                }
            }
        },{ //tree
            emptyMessage:ST_SELECT_SCENARIO,
            leafClick: function(viewer,leaf,recordNum){
                frBlockResults.setLabel(leaf.name);
                iwLegend.enable(true);
                //to do, dit anders!
                appManager.selectedApp.overlayManager.clearAllOverlays();

                get_popup_content = function(id,name, service_url, params, cloud_width, cloud_height ){
                    var width = cloud_width;
                    var height = cloud_height-25;

                    var html = '<b>' + name + '</b><br> <br/><img src="'+service_url+'?action=get_graph_of_shape&format=graph&graphwidth='+ width +'&graphheight='+ height;
                    var elem;
                    for (elem in params) {
                        html += '&' + elem + '=' + params[elem];
                    }

                    html += '" width="'+width +'px" height="'+ height +'px"/>';
                    return html;
                };

                if (!appManager.selectedApp.overlayManager.setActiveOverlay(leaf.id)) {
                    //add overlay
                    var layer = null;
                    if (leaf.geoType == 1 && leaf.valueType == 2  ) { //MapOverlay

                        layer = new NMapOverlay(leaf.id, leaf.name, {
                            legendWindow: iwLegend,
                            rootURL: flooding_config.root_url,
                            geoType:leaf.geoType,
                            layerIndex:25,
                            valueType:leaf.valueType,
                            getSettingsFromRequest: true,
                            settingsRequestUrl: locationPresentationData,
                            settingsRequestParams: {
                                action:'get_presentationlayer_settings',
                                result_id:leaf.id      //result_id is actually your presentationlayer_id
                            },
                            getFramesFromRequest:true,
                            frameUrl :locationPresentationData,
                            framesRequestParams: {
                                action:'get_gridframe',
                                result_id:leaf.id  //result_id is actually your presentationlayer_id
                            },
                            rawResultUrl:locationFloodingData + '?TODO',
                            app: 'flooding',
                            visibile: true

                        });
                    } else if (leaf.geoType == 1 && [3,4].contains(leaf.valueType)  ){ //ANIMATEDMAPOVERLAY
                        layer = new NAnimatedMapOverlay(leaf.id, leaf.name, {
                            legendWindow: iwLegend,
                            rootURL: flooding_config.root_url,
                            geoType:leaf.geoType,
                            valueType:leaf.valueType,
                            layerIndex:25,
                            getSettingsFromRequest: true,
                            settingsRequestUrl: locationPresentationData,
                            settingsRequestParams: {
                                action:'get_presentationlayer_settings',
                                result_id:leaf.id   //result_id is actually your presentationlayer_id
                            },
                            getFramesFromRequest:true,
                            frameUrl :locationPresentationData,
                            framesRequestParams: {
                                action:'get_gridframe',
                                result_id:leaf.id //result_id is actually your presentationlayer_id
                            },
                            rawResultUrl:locationFloodingData + '?TODO',
                            app: 'flooding',
                            visibile: true

                        });

                    }  else if ( [2,3,4].contains(leaf.geoType) && [1,2].contains(leaf.valueType)  ){ //WMSOVERLAY
                        layer = new NWMSOverlay(leaf.id, leaf.name, {
                            legendWindow: iwLegend,
                            rootURL: flooding_config.root_url,
                            singleTile:true,
                            geoType:leaf.geoType,
                            valueType:leaf.valueType,
                            layerIndex:50,
                            getSettingsFromRequest: true,
                            settingsRequestUrl: locationPresentationData,
                            settingsRequestParams: {
                                action:'get_presentationlayer_settings',
                                result_id:leaf.id      //result_id is actually your presentationlayer_id
                            },
                            getFramesFromRequest:true,
                            frameUrl :locationPresentationData,
                            framesRequestParams: {
                                action:'get_wms_of_shape',
                                result_id:leaf.id   //result_id is actually your presentationlayer_id
                            },
                            cloud: {
                                content_function:get_popup_content
                            },
                            rawResultUrl:locationFloodingData + '?TODO',
                            app: 'flooding',
                            visibile: true

                        });
                    } else if ( [2,3,4].contains(leaf.geoType) && [3].contains(leaf.valueType)  ){ //WMSOVERLAY
                        layer = new NAnimatedWMSOverlay(leaf.id, leaf.name, {
                            legendWindow: iwLegend,
                            rootURL: flooding_config.root_url,
                            singleTile:true,
                            geoType:leaf.geoType,
                            valueType:leaf.valueType,
                            layerIndex:50,
                            getSettingsFromRequest: true,
                            settingsRequestUrl: locationPresentationData,
                            settingsRequestParams: {
                                action:'get_presentationlayer_settings',
                                result_id:leaf.id      //result_id is actually your presentationlayer_id
                            },
                            getFramesFromRequest:true,
                            frameUrl :locationPresentationData,
                            framesRequestParams: {
                                action:'get_wms_of_shape',
                                result_id:leaf.id  //result_id is actually your presentationlayer_id
                            },
                            cloud: {
                                content_function:get_popup_content
                            },
                            rawResultUrl:locationFloodingData + '?TODO',
                            app: 'flooding',
                            visibile: true

                        });
                    } else {
                        console.log('asked overlay format not supported yet geoType: ' +
                                    leaf.geoType + ' valueType: ' + leaf.valueType);
                    }

                    appManager.selectedApp.overlayManager.addAndSetActiveOverlay(layer);
                }
                sliderOpacity.setDisabled(false);
            },
            folderClick: function(viewer,folder,recordNum){
                this.openFolder(folder);
            }
        });

    /******************** screen **********************/

    isc.VLayout.create({
        ID:"floodingResultNavigation",
        membersMargin: 5,
        width: "100%", height: "100%", overflow:"hidden",
        members: [
            isc.VLayout.create({ height:"25%", members: frBlockRegions.getMembers(),    autoDraw:false}),
            isc.VLayout.create({ height:"20%", members: frBlockBreaches.getMembers(),   autoDraw:false}),
            isc.VLayout.create({ height:"30%", members: frBlockScenarios.getMembers(),  autoDraw:false}),
            isc.VLayout.create({ height:"25%", members: frBlockResults.getMembers(),    autoDraw:false})
        ],
        autoDraw:false
    });
    return floodingResultNavigation;
}


console.log('klaar laden flooding/result/navigation ...');
