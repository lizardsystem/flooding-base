console.log('start loading fews/map/mmOverlaysettings.js');

/****  mm = ?? This returns the overlay? ****/
function ifmmOverlaySettings() {       

        mmLayer = new NMarkerOverlay("mmLayer","Meetlocaties",map,null,{
        canSelect: true,
        canUnselect: false,
        multipleSelect:false,
        defaultMarker:icons["rondje"],
        defaultSelectedMarker:icons["circleyellow"],
        isDataTreeFormat:false,
        clickMarker: function(isSelected,marker,loc){
            var node = loc ;
            
            ///unselect previous
            mmBlockLocation.tree.deselectAllRecords();
            
            //open folder of parent or open own folder
            if (node.parentid) {
                mmBlockLocation.tree.openFolder(mmBlockLocation.tree.data.findById(node.parentid));
            }
            if (node.isFolder) {
            	 mmBlockLocation.tree.openFolder(node);
            }
    		
    		//scroll to position in treegrid
            var height = mmBlockLocation.tree.getRecordIndex(node)* mmBlockLocation.tree.cellHeight - 0.15* mmBlockLocation.tree.getHeight();
            mmBlockLocation.tree.body.scrollTo(0,height);
            
            //reopen (workaround, otherwise layout is not correct)
            if (node.parentid) {
                mmBlockLocation.tree.openFolder(mmBlockLocation.tree.data.findById(node.parentid));
            }
            if (node.isFolder) {
            	 mmBlockLocation.tree.openFolder(node);
            }
                        
            //select record
            mmBlockLocation.tree.selectRecord(node);            
            mmBlockLocation.tree.nodeClick(null,node,null);
        }
    });
    return {overlays:[mmLayer]};
}

console.log('finished loading fews/map/mmOverlaysettings.js');