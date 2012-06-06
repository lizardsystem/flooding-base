
intervalFormatter = function(value, shortNotation) {
    if (shortNotation == null) { var shortNotation = false }
    if (value == null) { var value = this }
    if (value.getUTCMinutes == null) { value = intervalReader(value)   }

    var p = "";
    //als negatief, maak positief
    if (value.valueOf()<0) {
        value = new Date( -value.valueOf());
        p = "-";
    }

    var m=value.getUTCMinutes();
    var h=value.getUTCHours();
    var d=value.getUTCDate() - 1 ;
    //var m=(value.getUTCMonth());
    //if(d<10) d='0'+d;
    if(m<10) m='0'+m;

    if (shortNotation) {
        if(h<10) h='0'+h;
        //if(d<10) d='0'+d;
        return p+ d+' d '+ h + ":" + m ;
    } else {
        return p + d+' d '+ h + ":" + m ;//+ " uur"
    }
}

intervalReader = function(value) {//transformInput
    if (value == null) {
    	return new Date(Date.UTC(1970,0,1,0,0,0));
    } else if (typeof(value) == "object") {
    	//Date object
    	return value;
    } else if (typeof(value) == "number") {	
    	//in days
    	var d = new Date();
		d.setTime(value*24*60*60*1000);
		return d;
    } else if (typeof(value) == "string") { 
	    value = value.toString();
	
	    var days = (value.match(/^-?\d*\s(?!\:)/) * 1) || 0;
	    var hours = (value.match(/(\d*)\:/));
	    if (hours!=null) {hours = hours[1] * 1} else {hours = 0}
	    var minutes = (value.match(/\:(\d*)/));
	    if (minutes!=null) {minutes = minutes[1] * 1} else {minutes = 0}
	    //if (value.match(/-/))
	    //if (value.match(/-/)) {
	
	    if (value.match(/^-/)) {
	        return new Date(-(Date.UTC(1970,0,-days+1,hours,minutes,0)).valueOf());
	    } else {
	        return new Date(Date.UTC(1970,0,days+1,hours,minutes,0));
	    }
    }
}