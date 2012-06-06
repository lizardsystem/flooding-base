console.log('laden nhi/map/navigation ...');
/***************************************************/
/*****  The navigation menu on the left side       */ 
/*****  For the matroos viewer                     */
/***************************************************/


/******************** blocks **********************/


/*
 * This method is specifically written for being called by the graph_settings_form,
 * when the submit button is pressed. It reads the parameters from the form to use
 * them in the asynchronous load of the graph.
 * 
 */
function redraw_graph(){ 
 		sendingForm = document.forms['graph_settings_form'];
				
		var scenarios = ""
		for (var n=0; n<sendingForm.elements.length; n++){		 		
			if(sendingForm.elements[n].checked){
			    scenarios = scenarios + sendingForm.elements[n].value + ",";
			}
		}
		if (scenarios.length>0)
		{		
			scenarios = scenarios.substring(0, scenarios.length-1);
		}		
		
		id = appManager.selectedApp.overlayManager.activeOverlay.cloud.lastLocation;
	    name =  'test';
	    service_url = locationNhiData;
	    params = {result_id: nhi_mapBlockParameters.tree.getSelectedRecord().id, scenarios: scenarios, linevalue: sendingForm.elements["linevalue"].value};
		
		appManager.selectedApp.overlayManager.activeOverlay.cloud.refreshContent({'id':id}, id, name, service_url, params);
		//windowsettings.destroy();
}


/*
 * This method creates the modal window for the settings of the graph.
 * The content-element is filled by referring to a contentsURL
 */
function create_windowsettings() {
		url_params = '?callbackfunction=redraw_graph()';
		    
    	var content = isc.HTMLPane.create({
			ID: "settingContent",			
			width: "100%",
			height: "100%",			
			contentsURL: locationNhiData + '../views/graph_settings'+url_params,		    
			border: "none",
			overflow:"auto",
			autoDraw: false // Note: needed for creating the pane object with all its content
		});
		
		isc.Window.create({
	        ID: "windowsettings", title: "Instellingen grafiek",
	        items: [settingContent],
	        showMinimizeButton: false,
	        keepInParentRect: true,
	        showResizeBar: false,
	        closeClick: function(){
	            this.hide();
	            return false;
	        },
	        isModal: true, showShadow: true, bodyColor: "#FEFEFE",
	        height: 400, width: 400, overflow: 'hide', autoCenter: true, shadowDepth: 10,
	        autoDraw: true
	    });    
    }


/*
 * This methods creates the navigation toolbar
 */
function nhi_mapNavigation() {

	/*
	 * The block for the scenario's
	 */
	nhi_mapBlockScenarios = new NBlock("Scenario", "Scenario",
	{
	   dataURL: locationNhiData,	   
	   fields:[
	        {name:"id", primaryKey:true, hidden:true, type:"integer"},
	        {name:"name", type:"text" }],
	   transformRequest : function (dsRequest) {
	        if (dsRequest.operationType == "fetch") {
	            var params = {action :'get_scenarios'};
	            // combine paging parameters with criteria
	            return isc.addProperties({}, dsRequest.data, params);
	        }
	    }	    
	},{
	    autoFetchData:true,
	    emptyMessage:"Geen scenario's of niet ingelogd",
	    loadingDataMessage:"Laden...",
	    leafClick: function(viewer,leaf,recordNum){
	    		appManager.selectedApp.overlayManager.clearAllOverlays();
	    		nhi_mapLegend.disable(true);
	    		try{
	    			scAnimationControl.hide();
	    			}
	    		catch (error)
	    		{
	    		}
	        	nhi_mapBlockScenarios.setLabel(leaf.name);	        	
	        	nhi_mapBlockParameters.tree.fetchData({scenario_id:leaf.id},function(dsResponse, data, dsRequest) {
	        		        		
	        	});        
	    }
	});

	/*
	 * The block for the parameters
	 */	 
	nhi_mapBlockParameters = new NBlock("Parameter", "Parameter",
	{
	    dataURL: locationNhiData,
	    fields:[
	        {name:"id", primaryKey:true, hidden:true, type:"integer"},
	        {name:"name", type:"text" },
	        {name:"begin_period", type:"integer"},
	        {name:"end_period", type:"integer"}],
	    transformRequest : function (dsRequest)
	    {
	        if (dsRequest.operationType == "fetch") 
	        {
	            var params = {action:'get_parameters'};
	            // combine paging parameters with criteria
	            return isc.addProperties({}, dsRequest.data, params);
	        }
	    }
	}, 
	{
		emptyMessage: "Geen parameters, geen scenario geselecteerd of niet ingelogd",	    
	    autoFetchData:false,
	    loadingDataMessage:"Laden...",
	    leafClick: function(viewer,leaf,recordNum){
	        begindate = new Date(leaf.begin_period*60*1000);
	        enddate = new Date(leaf.end_period*60*1000);
	        nhi_mapBlockParameters.setLabel(leaf.name);	 
	        nhi_mapLegend.disable(true);
	        nhi_timerangeStart.startDate = begindate;
	        nhi_timerangeStart.endDate = enddate;
	        nhi_timerangeStart.redraw();
	        nhi_timerangeEnd.startDate = begindate;
	        nhi_timerangeEnd.endDate = enddate;
	        nhi_timerangeEnd.redraw();	        
	        nhi_scTimerange.setValue('timerangeStart', begindate);
    		nhi_scTimerange.setValue('timerangeEnd', enddate);
	         
	        appManager.selectedApp.overlayManager.clearAllOverlays();	     
	        if (!appManager.selectedApp.overlayManager.setActiveOverlay(leaf.id))        
	        {	    
	            // Returns the html that has to be shown in the popup    
	        	get_popup_content = function(id,name, service_url, params, cloud_width, cloud_height, cloud_ref, divname ){	        				            
			            var width = cloud_width;
			            var height = cloud_height-25;
			            var data_id = nhi_mapBlockParameters.tree.getSelectedRecord().id;
			            var geom_id = id;			            
			            var start_time = nhi_scTimerange.getValue('timerangeStart').toSerializeableDate();
			            var end_time = nhi_scTimerange.getValue('timerangeEnd').toSerializeableDate();
			            var format = nhi_popup_format;			            
			            var linevalue = params.linevalue;
			            var request_string = '?action=get_details' +			                				 
			                				 '&geom_id='+ geom_id +
			                				 '&start='+ start_time +
			                				 '&end='+ end_time +			                				 
			                				 '&result_id=' + data_id;			            
			            if (format == 'graph') 
			            {
			            	request_string += '&format=graph' +
			            					  '&linevalue=' + linevalue;
			                form_html = locationNhiData + '../views/graph_settings?callbackfunction=redraw_graph()'
			            	head = get_header(format, geom_id, start_time, end_time, data_id) + '<BR><BR><img src="' +locationNhiData + request_string.replace(/ /g, '%20') + '"/>';
			            	
				            RPCManager.sendRequest({
								actionURL: locationNhiData + '../views/graph_settings',
								useSimpleHttp: true,
								httpMethod: "GET",		 
								params: {callbackfunction:'redraw_graph()'}, 
								callback: function(response, data, request){									  	 
										  	 if (response.httpResponseCode == 200) {										  	 											  	 										     	
										     	cloud_ref.setHtmlSpan(head + data);									     	
										     } else {
										     	console.log("Fout bij het ophalen van gegevens.");  
										     	return '<b>' + name + '</b><br>' + ST_NO_DATA               
										     }
								}
							});
							return 'loading data';
			           	} 
			           	else if (format == 'html') 
			           	{
			           		request_string += '&format=html';				           
							return get_header(format, geom_id, start_time, end_time, data_id) + '<BR><BR>' + '<iframe src="' + locationNhiData + request_string +'" width="'+ width +'px" height="'+ height +'px" frameborder="0" scrolling = "auto"/>';
						}
						//return 'laden....'
		       		}
		        	if (leaf.geo_type==1)
		        	{
			        	layer = new NWMSOverlay(leaf.id, leaf.name, {
								cloud: {
									content_function:get_popup_content,
									min_width:350,
		    						max_width:350,
		    						min_height:360,
		    						max_height:360
								},					    
							    rootURL:rootUrl,
							    singleTile:true,
							    geoType:4,
							    valueType:2,
								getSettingsFromRequest: false,						
								getFramesFromRequest:true,
								frameUrl:locationNhiData, 
								framesRequestParams: {
									action:'wms',
									result_id:leaf.id
								},											
								app: 'nhi',
								visible: true,								
								locationMenuWidth:300
								
							});
							
						layer.setAvailableLegends([{id:leaf.id, name:leaf.name}]);
	               		layer.setDefaultLegend({id:leaf.id, name:leaf.name});
					}
					else if (leaf.geo_type==2)
					{
						layer = new NAnimatedWMSOverlay(leaf.id, leaf.name, {
								legendWindow: nhi_mapLegend,
					    		legendBaseURL:  '?action=get_legend&object_id=',
								cloud: {
									content_function:get_popup_content,
									min_width:400,
		    						max_width:400,
		    						min_height:500,
		    						max_height:500
								},					    
							    rootURL:locationNhiData,
							    singleTile:true,
							    geoType:4,
							    valueType:3,
								getSettingsFromRequest: true,
								settingsRequestUrl: locationNhiData,
								settingsRequestParams: {
									action:'get_animation_settings',
									result_id:leaf.id,
									start_time: nhi_scTimerange.getValue('timerangeStart').toSerializeableDate(),
			                        end_time: nhi_scTimerange.getValue('timerangeEnd').toSerializeableDate()				
								},
								animation: new NAnimation(0,1,{
									firstlabel: nhi_scTimerange.getValue('timerangeStart').toEuropeanShortDate(),
    								lastlabel: end_time = nhi_scTimerange.getValue('timerangeEnd').toEuropeanShortDate(),
    								showDateLabel: true,
    								label_function : function(nr,layer,display) {
	    								RPCManager.sendRequest({
											actionURL: locationNhiData,
											useSimpleHttp: true,
											httpMethod: "GET",		 
											params: {action: 'get_date_for_animation',
													 result_id: leaf.id,  
													 slider_nr: nr,
													 start_time: nhi_scTimerange.getValue('timerangeStart').toSerializeableDate(),
													 end_time: nhi_scTimerange.getValue('timerangeEnd').toSerializeableDate()
													 }, 
											callback: function(response, data, request){									  	 
													  	 if (response.httpResponseCode == 200) 
													  	 {													  	 	
													  	 	var chosenDate = new Date(parseInt(data)*60*1000);										  	 											  	 										     	
													     	display.setContents(chosenDate.toEuropeanShortDate());									     	
													     } 
													     else {
													     	console.log("Fout bij het ophalen van gegevens.");  
													     	return '<b>' + name + '</b><br>' + ST_NO_DATA               
													     }
											}
										});    								
	    								}, 
    								showValue: false
								}),			
								getFramesFromRequest:true,
								frameUrl:locationNhiData, 
								framesRequestParams: {
									action:'wms',
									result_id:leaf.id
								},											
								app: 'nhi',
								visible: true,								
								locationMenuWidth:300
								
							});
						nhi_mapLegend.enable(true);
						layer.setAvailableLegends([{id:leaf.id, name:leaf.name}]);
	               		layer.setDefaultLegend({id:leaf.id, name:leaf.name});
					
					}
					else if (leaf.geo_type==3)
		        	{
			        	layer = new NWMSOverlay(leaf.id, leaf.name, {
								cloud: {
									content_function:get_popup_content,
									min_width:400,
		    						max_width:400,
		    						min_height:500,
		    						max_height:500
								},
								legendWindow: nhi_mapLegend,
					    		legendBaseURL:  '?action=get_legend&object_id=',					    
							    rootURL:locationNhiData,
							    singleTile:true,
							    geoType:4,
							    valueType:2,
								getSettingsFromRequest: false,						
								getFramesFromRequest:true,
								frameUrl:locationNhiData, 
								framesRequestParams: {
									action:'wms',
									result_id:leaf.id
								},											
								app: 'nhi',
								visible: true,								
								locationMenuWidth:300
								
							});
						nhi_mapLegend.enable(true);	
						layer.setAvailableLegends([{id:leaf.id, name:leaf.name}]);
	               		layer.setDefaultLegend({id:leaf.id, name:leaf.name});
					}
					appManager.selectedApp.overlayManager.addAndSetActiveOverlay(layer);					
	        }
	        else
	        {
	        	console.log('Add and set activer overlay.');
	        	appManager.selectedApp.overlayManager.addAndSetActiveOverlay(layer);
	        } 
	    }
	  }
	);
	
	/*
	 * This creates the period-selector at the bottom of the navigation.
	 */
    isc.DynamicForm.create({
        ID: "nhi_scTimerange",
        height: "50px",
        fields: [
            {
             ID:"nhi_timerangeStart",
             name: "timerangeStart",
             title: "Van",
             type: "date",             
             required: true,
             changed: function(form, item, value) {
                if (value >= nhi_scTimerange.getValue('timerangeEnd'))
                {
                   alert('De gekozen begindatum moet eerder zijn dan de einddatum!');
                } 
                else
                {              
                	if (appManager.selectedApp.overlayManager.activeOverlay.cloud.popup != null)
                	{ 
                		refresh_popup();
                	}
                }
             }
            },
            {
             ID:"nhi_timerangeEnd",
             name: "timerangeEnd",
             title: "Tot",
             type: "date",
             required: true,
             changed: function(form, item, value) {
             	if (value <= nhi_scTimerange.getValue('timerangeStart'))
                {
                   alert('De gekozen einddatum moet eerder zijn dan de begindatum!');
                }
                else
                {
               		if (appManager.selectedApp.overlayManager.activeOverlay.cloud.popup != null)
                	{ 
                		refresh_popup();
                	}
               	}
             }
            }
        ],
        autoDraw: false
    });
   
    /*
     * Refresh_popup
     * 
     * This method is used to refresh the popup if an active overlay exists and a location is already selected.
     */
    function refresh_popup(extra_params){
    	if (appManager.selectedApp.overlayManager.activeOverlay != null)
    	{    		
	    	if (appManager.selectedApp.overlayManager.activeOverlay.cloud.lastLocation!=null)
	    	{    		
		    	id = appManager.selectedApp.overlayManager.activeOverlay.cloud.lastLocation;
		        name =  'test';
		        service_url = locationNhiData;
		        params = {result_id: nhi_mapBlockParameters.tree.getSelectedRecord().id};
		        
		        for (i in extra_params)
		        	{
			 		    params[i] = extra_params[i];
			 		}		
		        
		        appManager.selectedApp.overlayManager.activeOverlay.cloud.refreshContent({'id':id}, id, name, service_url, params);
	        }
	    }
    }
    
    /*
     * This method select the format of the data (html or graph)
     */
    NCloudManager.prototype.select_format = function(format){
    	nhi_popup_format = format;    	
    	refresh_popup();
    }

    nhi_popup_format = 'graph'
        
    function get_header(selected_format, id, start_time, end_time, data_id){
        base_url = '?action=get_details' +
        		   '&geom_id='+ id +
				   '&start='+ start_time +
				   '&end='+ end_time +
				   '&result_id=' + data_id;
	    linkToCsv = '<a href="'+locationNhiData + base_url + '&format=csv">Csv</a>';
	    if (selected_format=='html')
	    {
	    	html_text = 'Tabel'
	    	linkToGraph='<a href="javascript:appManager.selectedApp.overlayManager.activeOverlay.cloud.select_format(\'graph\');">Grafiek</a>';
	    	return linkToCsv + ' ' + linkToGraph + ' ' + html_text;	
	    }
	    if (selected_format=='graph')
	    {
	    	graph_text = 'Grafiek'
	    	linkToHtml='<a href="javascript:appManager.selectedApp.overlayManager.activeOverlay.cloud.select_format(\'html\');">Tabel</a>';
	    	return linkToCsv + ' ' + graph_text + ' ' + linkToHtml;
	    }    	
    }

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
 
    nhi_scTimerange.setValue('timerangeStart', new Date(range.begin));
    nhi_scTimerange.setValue('timerangeEnd', new Date(range.end));

	
	/******************** screen **********************/	
	isc.VLayout.create({
	    ID:"nhi_mapResultNavigation",
	    membersMargin: 5,
	    width: "100%", height: "100%", overflow:"hidden",
	    members: [
	        isc.VLayout.create({height:"25%", members:nhi_mapBlockScenarios.getMembers(), autoDraw:false}),
	        isc.VLayout.create({height:"75%", members:nhi_mapBlockParameters.getMembers(), autoDraw:false}),
	        nhi_scTimerange
	    ],
	    autoDraw:false
	});
	return nhi_mapResultNavigation;
}

console.log('klaar laden nhi/map/navigation ...');