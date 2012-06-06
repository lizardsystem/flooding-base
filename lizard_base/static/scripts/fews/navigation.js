console.log('start laden fews/navigation.js');
/***************navigatie balk (linker balk**********/
//contenttype
GRAPH =0;
TABEL =1;

var active_configuration = null;

function get_active_configuration() {
    return active_configuration;
}

function set_active_configuration(configuration) {
    active_configuration = configuration;
}


function FewsContentManager() {

//this.lastActiveApp = null;
//this.lastParameter = null;
this.lastLocation = null;
//this.lastFirstDate = null;
//this.lastLastDate = null;
this.popup = null;

}

FewsContentManager.prototype.removePopup = function() {
    if (this.popup != null) {
        map.removePopup(this.popup);
        this.popup.destroy();
        this.popup = null;
    //first close previous

    }
}

FewsContentManager.prototype.openPopup = function(latlon) {
    //first close previous
    this.removePopup();

	//create new popup    
	var this_ref = this;
	var closeBoxCallback = function() { 
		this_ref.removePopup();
		//alert('close'); 
	}
	var closeBox = true;
	var size = getPopupSize(scMap.getWidth(), scMap.getHeight());
	size = new OpenLayers.Size(size.width,size.height)
    var popupContentHTML = '<div id="mmPopupSpan">laden...</div>';
    
    if (this.popup == null) {
        this.popup = new OpenLayers.Popup.FramedCloud('hoi',
                                      latlon,
                                      size,
                                      popupContentHTML,
                                      null,
                                      closeBox,
                                      closeBoxCallback);
         
        this.popup.panMapIfOutOfView = true;
        this.popup.minSize = size;
        this.popup.maxSize = size;
        this.popup.autoSize = false;
        //this.popup.data.overflow = (false) ? "auto" : "hidden";
        
        map.addPopup(this.popup);
        this.popup.show();
    } else {
        this.popup.toggle();
    }
}


FewsContentManager.prototype.refreshContent = function() {
    var selectedFilter = mmBlockFilter.tree.getSelectedRecord();
    var selectedLocation = mmBlockLocation.tree.getSelectedRecord();
    if (!mmBlockParameter.tree.anySelected()) {
        //select first item
        mmBlockParameter.tree.selectRecord(0);
    }
    var selectedParameter = mmBlockParameter.tree.getSelectedRecord();
    //alert(selectedFilter + ' '+selectedLocation+' '+selectedParameter);
    if (selectedFilter && selectedLocation && selectedParameter) { //do this only if filter+location+parameter is filled

        if ((appManager.getSelectedSubApp()).name=='map')
        {
	        if (this.popup == null || selectedLocation != this.lastLocation) {
	            this.lastLocation = selectedLocation;
	            this.openPopup( (new OpenLayers.LonLat(selectedLocation.lon, selectedLocation.lat)).transform(map.displayProjection, map.projection ) );
	
	        }
        }
        if (buttonGraph.isSelected()) {
            var contenttype = GRAPH;
        } else {
            var contenttype = TABEL;
        }

        if ((appManager.getSelectedSubApp()).name == 'map') {
            var divname = 'mmPopupSpan';
            var size = getPopupSize(scMap.getWidth(), scMap.getHeight());
            var width = size.width-10;
            var height = size.height-50;
        	var itemsPerPage = 40;
        } else {
            var divname = 'mmScreenSpan';
            var width = scCanvas.getWidth()-10;
            var height = scCanvas.getHeight()-40;
        	var itemsPerPage = 100;

        }

        this.updateHtmlSpan( divname, locationLizardFewsData,selectedFilter.id,selectedLocation.id,selectedParameter.id,scTimerange.getValue('timerangeStart'), scTimerange.getValue('timerangeEnd'), contenttype,width, height, itemsPerPage );
    } else {
        if ((appManager.getSelectedSubApp()).name == 'grafieken') {
            document.getElementById('mmScreenSpan').innerHTML = 'kies locatie';            
        }
    }
}


FewsContentManager.prototype.updateHtmlSpan = function(divname , locationDataTimeseries, filter_id, location_id, parameter_id, timerangeStart, timerangeEnd, contenttype,width, height, itemsPerPage)
{	
    try
    {
        //fill graph tab
        linkToCsv = '<a href="'+locationDataTimeseries+'?action=get_timeseries&configuration_id='+ get_active_configuration()  +'&format=csv&filter_id='+filter_id+'&location_id='+location_id+'&parameter_id='+parameter_id+'&dtstart='+timerangeStart.toSerializeableDate()+'&dtend='+timerangeEnd.toSerializeableDate()+'">csv</a>';
        if (contenttype == GRAPH) {
        	// BugFix, the fast way: mmScreenSpan can not be found, so set the scCanvas. 
        	if (divname =='mmScreenSpan')
        	{
        		scCanvas.setContents('period '+timerangeStart.toSerializeableDate()+' - '+timerangeEnd.toSerializeableDate()+'<br>'+linkToCsv+'<br/><img src="'+locationDataTimeseries+'?action=get_timeseries&configuration_id='+ get_active_configuration()  +'&format=graph&filter_id='+filter_id+'&location_id='+location_id+'&parameter_id='+parameter_id+'&dtstart='+timerangeStart.toSerializeableDate()+'&dtend='+timerangeEnd.toSerializeableDate()+'&graphwidth='+ width +'&graphheight='+ height + '" width="'+width +'px" height="'+ height +'px"/>');
        	}
        	else
        	{
            	document.getElementById(divname).innerHTML = 'period '+timerangeStart.toSerializeableDate()+' - '+timerangeEnd.toSerializeableDate()+'<br>'+linkToCsv+'<br/><img src="'+locationDataTimeseries+'?action=get_timeseries&configuration_id='+ get_active_configuration()  +'&format=graph&filter_id='+filter_id+'&location_id='+location_id+'&parameter_id='+parameter_id+'&dtstart='+timerangeStart.toSerializeableDate()+'&dtend='+timerangeEnd.toSerializeableDate()+'&graphwidth='+ width +'&graphheight='+ height + '" width="'+width +'px" height="'+ height +'px"/>';
            }
            
        } else {
        	//table
        	// BugFix, the fast way: mmScreenSpan can not be found, so set the scCanvas. 
        	if (divname =='mmScreenSpan')
        	{        		
        		scCanvas.setContents('period '+timerangeStart.toSerializeableDate()+' - '+timerangeEnd.toSerializeableDate()+'<br>'+linkToCsv+'<br/><iframe src="'+locationDataTimeseries+'?action=get_timeseries&configuration_id='+ get_active_configuration()  +'&format=html&filter_id='+filter_id+'&location_id='+location_id+'&parameter_id='+parameter_id+'&dtstart='+timerangeStart.toSerializeableDate()+'&dtend='+timerangeEnd.toSerializeableDate()+'&items_per_page='+itemsPerPage+'" width="'+ (width - 30) +'px" height="'+ (height-30) +'px" frameborder="0" scrolling = "auto"/>');
        	}
        	else
        	{
            	document.getElementById(divname).innerHTML = 'period '+timerangeStart.toSerializeableDate()+' - '+timerangeEnd.toSerializeableDate()+'<br>'+linkToCsv+'<br/><iframe src="'+locationDataTimeseries+'?action=get_timeseries&configuration_id='+ get_active_configuration()  +'&format=html&filter_id='+filter_id+'&location_id='+location_id+'&parameter_id='+parameter_id+'&dtstart='+timerangeStart.toSerializeableDate()+'&dtend='+timerangeEnd.toSerializeableDate()+'&items_per_page='+itemsPerPage+'" width="'+ (width - 30) +'px" height="'+ (height-30) +'px" frameborder="0" scrolling = "auto"/>';
            }
        }
        //parameter tab: periode, link to csv, then graph in clientSideInclude?type=1
        //document.getElementById('parametertab_a_'+location_id).innerHTML = 'period '+timerangeStart.toSerializeableDate()+' to '+timerangeEnd.toSerializeableDate()+'<br><a href="'+locationDataTimeseries+'?type=2&filter_id='+filter_id+'&location_id='+location_id+'&parameter_id='+parameter_id+'&start='+timerangeStart.toSerializeableDate()+'&end='+timerangeEnd.toSerializeableDate()+'">download CSV</a>';
        //clientSideInclude('parametertab_b_'+location_id,locationDataTimeseries+'?type=0&filter_id='+filter_id+'&location_id='+location_id+'&parameter_id='+parameter_id+'&start='+timerangeStart.toSerializeableDate()+'&end='+timerangeEnd.toSerializeableDate());
    } catch (e) {
        //fill graph tab
        if (document.getElementById(divname)) // may not be initialized yet
        {
            document.getElementById(divname).innerHTML = e ; //'No graph available';
        }
    }
}

FewsContentManager.prototype.clear = function() {

}


FewsContentManager.prototype.selectLocation = function(id) {

}


fcm = new FewsContentManager();



/***************** location2filter tree: never visible, used when url parameter location_id or kwkident **********************/

/***************** filters tree **********************/
function ifmmNavigation() { 
	mmBlockFilter = new NBlock("filters","filter",
    // define the datasource settings for the NBlock
    {
        dataURL:locationLizardFewsData,
        fields:[
            {name:"id", primaryKey:true, hidden:true, type:"text"},
            {name:"name", type:"text"},
            {name:"parentid", type:"text" , foreignKey: "id", rootValue:None}
        ],
        transformRequest : function (dsRequest) {
            if (dsRequest.operationType == "fetch") {
                var params = {action : 'get_auth_filters'};
            	// combine paging parameters with criteria
            	return isc.addProperties({}, dsRequest.data, params);
            	}
        	}
    },
    // define the tree settings for the NBlock
    {
        autoFetchData:true,
        emptyMessage:"<a href='javascript: mmBlockFilter.tree.fetchData({action: (new Date()).valueOf()})'>Geen databron beschikbaar<br>(login of raadpleeg systeembeheerder)</a>",
        nodeClick: function onClick(viewer,leaf,recordNum){
            mmBlockFilter.setLabel(leaf.name);
            mmBlockParameter.setLabel();
            mmBlockLocation.setLabel();
            fcm.removePopup();
            set_active_configuration(leaf.configurationid);
            if (leaf.is_filter) {
	            mmBlockLocation.tree.fetchData({filter_id:leaf.id, configuration_id:leaf.configurationid}, function(dsResponse,data,dsRequest){
	               	if (dsResponse.httpResponseCode == 200) {
	               		var start_time = new Date();
						console.log('0 ms: data verwerken naar kaart');
	                	mmLayer.refreshByData(data,{field:'parentid',value:None});
	                	mmLayer.show();
	                
						console.log((new Date() - start_time) + ' ms: zoom bepalen');
	                	min_lat = 200
	                	min_lon = 200
	                	max_lat = -200
	                	max_lon = -200
	                	for (var i = 0 ; i < data.length; i++) {
	                    	if (data[i].lat < 9000) { 
	                        	min_lat = Math.min( min_lat, data[i].lat);
	                       		min_lon = Math.min( min_lon, data[i].lon);
	                        	max_lat = Math.max( max_lat, data[i].lat);
	                        	max_lon = Math.max( max_lon, data[i].lon);
	                    	}
	                	}
	            		if ( min_lat < max_lat && min_lon < max_lon) {
                    		Ozoom(map, {north: max_lat, south: min_lat, west: min_lon, east: max_lon});
                		}                
                		console.log((new Date() - start_time) + ' ms: verwerken klaar');
                	} else {
                		console.log('request unsuccesfull');
                		mmBlockLocation.clear('fout in ophalen gegevens');
                	}
            	});
            	mmBlockParameter.tree.fetchData({filter_id:leaf.id, configuration_id:leaf.configurationid }, function (dsResponse, data, dsRequest) {
                	if (dsResponse.httpResponseCode != 200) {
                		console.log('request unsuccesfull')
            			mmBlockParameter.clear('fout in ophalen gegevens');
                	}
            	});
            } else {
            	Ozoom(map, leaf);
           		mmBlockParameter.clear();
           		mmBlockLocation.clear();
            }
        }
    });
/***************** location tree **********************/


	mmBlockLocation = new NBlock("locaties","locatie",
    {
        dataURL:locationLizardFewsData, //syntax: location.jsp?filter_id='[filtername]'
        recordXPath:"items",
        fields:[
            {name:"id", primaryKey:true, hidden:true, type:"text"},
            {name:"name", type:"text" },
            {name:"parentid", type:"text" ,foreignKey: "id", rootValue:None }
        ],
        transformRequest : function (dsRequest) {
            if (dsRequest.operationType == "fetch") {
                 var params = {
                            action : 'get_locations'
                    };
                // combine paging parameters with criteria
                return isc.addProperties({}, dsRequest.data, params);
            }
        }
    },{
        emptyMessage:"geen data",
        animateFolders:false,
        nodeClick: function(viewer,leaf,recordNum){
            mmBlockLocation.setLabel(leaf.name);
            if(appManager.selectedApp=='fewsMap')
            {
	            if (leaf.parentid == None) 
	            {
	            	mmLayer.select(leaf.id, false);
	            } 
	            else 
	            {
	            	mmLayer.select(leaf.parentid, false);
	            }
            }

            selectedFilter = mmBlockFilter.tree.getSelectedRecord();
            
            if (settings.fews_parameters_on_location) {
            	var close_popup = false;
            	mmBlockParameter.tree.fetchData({filter_id: selectedFilter.id, configuration_id: selectedFilter.configurationid, location_id: leaf.id },function (dsResponse, data, dsRequest) {
            		if (last_selected!=null) {
            			var nr = mmBlockParameter.tree.data.findIndex('id',last_selected.id);
            			if (nr >= 0) {
            				mmBlockParameter.tree.selectRecord(nr);
            				mmBlockParameter.tree.leafClick(null,mmBlockParameter.tree.getSelectedRecord(),null);
            			} else {
            				close_popup = true;
            			}
            		} else {
            			close_popup = true;
            		}
            		if (close_popup) {
            			fcm.removePopup();
            		}
            	});
            } else {          
            	fcm.refreshContent();
            }
        }
    });

	var last_selected = null;

	mmBlockParameter = new NBlock("parameters","parameter",
    {
        dataURL:locationLizardFewsData, //syntax: parameter.jsp?filter_id='[filtername]'
        recordXPath:"items",
        fields:[
            {name:"id", primaryKey:true, hidden:true, type:"text"},
            {name:"name", type:"text" }
        ],
        transformRequest : function (dsRequest) {
            if (dsRequest.operationType == "fetch") {
                 var params = {
                            action : 'get_parameters'
                    };
                // combine paging parameters with criteria
                return isc.addProperties({}, dsRequest.data, params);
            }
        }
    },{
        emptyMessage:"geen data",
        leafClick: function(viewer,leaf,recordNum){
            mmBlockParameter.setLabel(leaf.name);
            fcm.refreshContent();
            last_selected = leaf;

        },
        folderClick: function(viewer,folder,recordNum){

        }
    });


    /*Timerange*/
    isc.DynamicForm.create({
        ID: "scTimerange",
        height: "50px",
        fields: [
            {name: "timerangeStart",
             title: "From",
             type: "date",
             required: true,
             changed: function(form, item, value) {
                fcm.refreshContent();
             }
            },
            {name: "timerangeEnd",
             title: "To",
             type: "date",
             required: true,
             changed: function(form, item, value) {
                fcm.refreshContent();
             }
            }
        ],
        autoDraw: false
    });
    scTimerange.hide();


    function get_rounded_dates(begin_date, end_date, mindelta){
    	mindelta = mindelta ||null;
    	
    	var delta = end_date - begin_date;
		
		end_date = 1*end_date + 2*3600*1000;
		
		if (mindelta != null && delta < mindelta) {
			delta = mindelta;
		}

    	if (delta > (10*24*3600*1000)) { //round on day
    		var e = (Math.floor(end_date/(24*3600*1000))+1) *24*3600*1000;
    		var b =  e - Math.round(delta/(24*3600*1000)) *24*3600*1000;
    	} else if (delta > (10*6*3600*1000)) { //round on 6 hour
    		var e = (Math.floor(end_date/(6*3600*1000))+1) *6*3600*1000;
    		var b =  e - Math.round(delta/(6*3600*1000)) *6*3600*1000;
    	} else if (delta > (10*3600*1000)) { //round on 1 hour
    		var e = (Math.floor(end_date/(3600*1000))+1) *3600*1000;
    		var b =  e - Math.round(delta/(3600*1000)) *3600*1000;
    	} else { //round on minutes
    		var e = (Math.floor(end_date/(60*1000))+1) *60*1000;
    		var b =  e - Math.round(delta/(60*1000)) *60*1000;
    	}
    	return {begin:(b - 2*3600*1000), end:(e- 2*3600*1000)};
  
    }
    
    var range = get_rounded_dates(((new Date())-settings.fews_default_period*24*60*60*1000), new Date(), 61*24*60*60*1000);
 
    scTimerange.setValue('timerangeStart', new Date(range.begin));
    scTimerange.setValue('timerangeEnd', new Date(range.end));

    /*Timerange scroll*/
    isc.IButton.create({
        ID: "scButtonTimerangeBack",
        title: "<<",
        width: "100%",
        click: function () {
            //recalculate time and set it with scTimerange.setValue('timerangeStart'); / timerangeEnd
            var curStart = scTimerange.getValue('timerangeStart').getTime();
            var curEnd = scTimerange.getValue('timerangeEnd').getTime();
            var shiftAmount = (curEnd-curStart)/5;
            
            var end = Math.min(new Date(curEnd-shiftAmount),(new Date()))
            var begin = end - 5*shiftAmount;
            var range = get_rounded_dates(begin, end,  2*3600*1000)
            
            scTimerange.setValue('timerangeStart', new Date(range.begin));
            scTimerange.setValue('timerangeEnd', new Date(range.end));
            fcm.refreshContent();
        },
        autoDraw: false
    });
    
    isc.IButton.create({
        ID: "scButtonTimerangeZoomOut",
        title: "-",
        width: "100%",
        click: function () {
        //recalculate time and set it with scTimerange.setValue('timerangeStart'); / timerangeEnd
            var curStart = scTimerange.getValue('timerangeStart').getTime();
            var curEnd = scTimerange.getValue('timerangeEnd').getTime();
            var shiftAmount = (curEnd-curStart)/5;
            
            var end = Math.min(new Date(curEnd+shiftAmount),(new Date()))
            var begin = end - 7*shiftAmount;
            var range = get_rounded_dates(begin, end,  2*3600*1000)
            
            scTimerange.setValue('timerangeStart', new Date(range.begin));
            scTimerange.setValue('timerangeEnd', new Date(range.end));
            fcm.refreshContent();
        },
        autoDraw: false
    });
    

    isc.IButton.create({
        ID: "scButtonTimerangeZoomIn",
        title: "+",
        width: "100%",
        click: function () {
            //recalculate time and set it with scTimerange.setValue('timerangeStart'); / timerangeEnd
            var curStart = scTimerange.getValue('timerangeStart').getTime();
            var curEnd = scTimerange.getValue('timerangeEnd').getTime();
            var shiftAmount = (curEnd-curStart)/5;
            
            var end = Math.min(new Date(curEnd-shiftAmount),(new Date()))
            var begin = end - 3*shiftAmount;
            var range = get_rounded_dates(begin, end,  2*3600*1000)
            
            scTimerange.setValue('timerangeStart', new Date(range.begin));
            scTimerange.setValue('timerangeEnd', new Date(range.end));
            fcm.refreshContent();
        },
        
        autoDraw: false
    });

    isc.IButton.create({
        ID: "scButtonTimerangeForward",
        title: ">>",
        width: "100%",
        click: function () {
            //recalculate time and set it with scTimerange.setValue('timerangeStart'); / timerangeEnd
            var curStart = scTimerange.getValue('timerangeStart').getTime();
            var curEnd = scTimerange.getValue('timerangeEnd').getTime();
            var shiftAmount = (curEnd-curStart)/5;
            
            var end = Math.min(new Date(curEnd+shiftAmount),(new Date()))
            var begin = end - 5*shiftAmount;
            var range = get_rounded_dates(begin, end,  2*3600*1000)
            
            scTimerange.setValue('timerangeStart', new Date(range.begin));
            scTimerange.setValue('timerangeEnd', new Date(range.end));
            fcm.refreshContent();
        },
        autoDraw: false
    });

    isc.IButton.create({
        ID: "scButtonShowDatePickers",
        width: "35px",
        icon: isomorphicDir + "skins/TreeFrog/images/controls/date_control.gif",
        showRollOver: false,
        actionType: "checkbox",
        showDown:true,
        showFocused:false,
        click: function () {
            if (this.isSelected()) {
                scTimerange.show();
            } else {
                scTimerange.hide();
            }
        },
        autoDraw: false
    });


    isc.HLayout.create({
        ID:"scTimerangeButtons",
        overflow: "hidden",
        height: "30px",
        //border: "1px solid blue",
        members: [
            scButtonTimerangeBack,
            scButtonTimerangeZoomOut,
            scButtonTimerangeZoomIn,
            scButtonTimerangeForward,
            scButtonShowDatePickers
        ],
        showResizeBar: false,
        autoDraw:false
    });

    //filled by changing filter/location/parameter


    /*container voor 3 trees, links*/
    isc.VLayout.create({
        ID:"leftMenu",
        membersMargin: 5,
        width: "100%",
        height: "100%",
        overflow:"hidden",
        animateMembers:true,
        animateMemberTime:100,
        members: [
            isc.VLayout.create({ height:"35%", members: mmBlockFilter.getMembers(), autoDraw:false}),
            isc.VLayout.create({ height:"30%", members: mmBlockLocation.getMembers(),   autoDraw:false}),
            isc.VLayout.create({ height:"35%", members: mmBlockParameter.getMembers(),  autoDraw:false}),
            scTimerange,
            scTimerangeButtons

            ],
        autoDraw:false,
        layoutTopMargin:5,
        showEdges:false
    });
    
    return leftMenu;
}

console.log('finished loading fews/navigation.js');
