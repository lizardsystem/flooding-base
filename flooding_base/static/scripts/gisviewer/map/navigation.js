console.log('laden gisviewer/map/navigation ...');
/***************** functions **********************/


/******************** blocks **********************/


function gvNavigation() {



	gvThemeMapBlock = new NBlock("themakaart","themakaart",
	{
	    dataURL: locationMapviewerData + 'get_theme_maps',
	    fields:[
	        {name:"id", primaryKey:true, hidden:true, type:"integer"},
	        {name:"name", type:"text"}/*,
	        {name:"parentid", type:"integer" ,foreignKey: "rsid", rootValue:None },
	        {name:"isMap"},
	        {name:"north" , type:"integer"},
	        {name:"south" , type:"integer"},
	        {name:"west" , type:"integer"},
	        {name:"east" , type:"integer"},
	        {name:"layers" , type:"text"}*/
	    ],
	    transformRequest : function (dsRequest) {
	        /*if (dsRequest.operationType == "fetch") {
	            var params = {action : 'get_theme_maps'};
	            // combine paging parameters with criteria
	            return isc.addProperties({}, dsRequest.data, params);
	        }*/
	    }
	}, {
	    emptyMessage:"<a href='javascript: gvThemeMapBlock.tree.fetchData()'>herladen</a>",
	    autoFetchData:true,
	    leafClick: function(viewer,leaf,recordNum){
			if (leaf.isMap == true) {
	        	//TO DO: do something
	        	Ozoom(map ,leaf );
	        }
	    },

	    folderClick: function(viewer,folder,recordNum){
	        Ozoom(map ,folder );
	        this.openFolder(folder);
	    }
	});


	 isc.ListGrid.create({
    	ID:"gvLayerBlock",    	
     	data: [],
     	/* [{id:1, name:"Duikers", group:"infra"},
    		{id:2, name:"Gemalen", group:"infra"},
    		{id:3, name:"Stuwen", group:"top"},
    		{id:4, name:"Oppervlakte water", group:"infra"},
    		{id:5, name:"Watergang richtingen", group:"basis"},
    	],*/
    	autoFetchData:true,
		width:'100%',
		height:'100%',
		margin:5,
		canFreezeFields:true,
    	showFilterEditor:false,
    	canReorderRecords:true,
    	canGroupBy:true,
    	//canHover:true,
    	//cellPadding:5,
    	canEdit:true, editEvent:"click", editByCell: true,
		modalEditing:true,
    	alternateRecordStyles:true,
    	wrapCells: true,
    	fixedRecordHeights: false,
   		groupStartOpen:'all',
    	groupByField: 'group',
    	//showFilterEditor: true,
		fields:[//project
       		{name: "id",title: "id",type: "number",canEdit: false,primaryKey:true,width:25}, 
       		{name: "name",title: "naam",type: "text",canEdit: false},
			{name:"group", title:"group", type:"text", canEdit:false,width:30},
       		{name: "a", title: "A",type: "boolean",canEdit: true, width:20},
       		{name: "b", title: "B",type: "boolean",canEdit: true, width:20}

        ],
    	autoDraw:false,
    	recordClick: function(viewer, record, recordNum) {

    	},
    	editComplete: function() {
		    var items = gvLayerBlock.data.getAllItems()
    		var layer_for_a = []
    		var layer_for_b = []
    		
    		for (i = 0 ; i < items.length ; i++ ) {
    			if (items[i].a) {
    				layer_for_a.push(items[i].id)
    			}
    			if (items[i].b) {
    				layer_for_b.push(items[i].id)
    			}		
    		}
    		layera.setParams({maps:layer_for_a})
    		layerb.setParams({maps:layer_for_b})
    		console.log('a: ' + layer_for_a)
    		console.log('b: ' + layer_for_b)
    	}    	

 	});
 	
 	isc.DataSource.create({
    	ID:"dsListLayer",
	    showPrompt:true,
	    dataFormat:"json",
	    dataURL: locationMapviewerData + 'get_layer_maps',
	    transformResponse: function(dsResponse, dsRequest, data ) {
	    	if (dsResponse.httpResponseCode == 200) {
	    		gvLayerBlock.setData(data);
	    	} else {
	    		console.log('error in ophalen afsluitlocatie gegevens');
	    	}
	    },
	    autoFetchData:false,
	    autoDraw:false
	});
	dsListLayer.fetchData();
 	
 	
 	//gvLayerBlock.setFieldState({group:{visibility:false}}) 
 	
 	



/*
	gvLayerBlock = new NBlock("layers","layers",
	{
	    dataURL: locationGisviewerData,
	    fields:[
	        {name:"id", primaryKey:true, hidden:true, type:"integer"},
	        {name:"name", type:"text"},
	        {name:"group", type:"text"}
	    ],
	    transformRequest : function (dsRequest) {
	        if (dsRequest.operationType == "fetch") {
	            var params = {action : 'get_region_tree'};
	            // combine paging parameters with criteria
	            return isc.addProperties({}, dsRequest.data, params);
	        }
	    }
	}, {
	    emptyMessage:"<a href='javascript: gvLayerBlock.tree.fetchData()'>herladen</a>",
	    autoFetchData:true,
	    leafClick: function(viewer,leaf,recordNum){
			if (leaf.isregion == true) {
	        	flBlockRegions.setLabel(leaf.name);
	        	flowSelectedRegion = leaf;//to do, dit moet anders
		        flow_clear_results();
		        flBlockScenarios.tree.fetchData({region_id:leaf.rid, filter:floodingFilterResults}, function(request, data) {
		            for (idx=0; idx<data.length; idx++) {
		                if (data[idx].isFolder) {
		                	flBlockScenarios.tree.openFolder(data[idx]);
		                }
		            }
		        });
	        	Ozoom(map ,leaf );
	        }
	    },

	    folderClick: function(viewer,folder,recordNum){
	        Ozoom(map ,folder );
	        this.openFolder(folder);
	    }
	});
*/

	
	/******************** screen **********************/
	
	isc.VLayout.create({
	    ID:"gisviewerNavigation",
	    membersMargin: 5,
	    width: "100%", height: "100%", overflow:"hidden",
	    members: [
	    
	    	isc.VLayout.create({ height:"25%", members: gvThemeMapBlock.getMembers(),    autoDraw:false}),
	        isc.VLayout.create({ height:"75%", members: gvLayerBlock,    autoDraw:false}) //.getMembers()
	    ],
	    autoDraw:false
	});
	return gisviewerNavigation;

}


console.log('klaar laden gisviewer/map/navigation ...');
