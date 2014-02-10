function (head, req) {
    var ddoc = this;
    var Mustache = require("lib/mustache");
    var List = require("vendor/couchapp/lib/list");
    var path = require("vendor/couchapp/lib/path").init(req);
    var myLib = require("lib/myLib");

    //:sub-optimal: filtering on ridename here is sub-optimal, as all ride pages will be recalculated. 
    //If any ride changes.
    var requestedRideName=req.query["rideName"];

//-----------------------------------------------------------------------------------------
    function stash()
    {
	var wait_time_modifiers = new Array();
	function preProcess(key, id, value){
	    wait_time_modifiers.push(value);
	}

	var rides = new Array();
	var ride_stash = new Object();
	var prevkey = null;

	function rides_push(){
	    if (requestedRideName == null || requestedRideName == ride_stash.name) {
		rides.push(ride_stash);
	    }
	    ride_stash = new Object();
	}

	function processRides(key, id, value){

	    if ( key==null || prevkey!=null && key!=prevkey ){
		rides_push();
	    }
	    prevkey=key;

	    if (value!=null){
		if (value.type == "ride")
		{
		    var ride = value;	
		    ride_stash["description"] = myLib.listify(ride.description);
		    ride_stash["name"] = ride.name;
		    ride_stash["id"] = id;
		}

		if (value.type == "ride_status")
		{
		    var status = value;
		    ride_stash["state"] = status.state;		
		    
		    wait_times= new Array();
		    for ( i in wait_time_modifiers )
		    {
			s=new Object();
			s["value"]= status.wait_time_min*wait_time_modifiers[i].percentage/100;
			s["name"] = wait_time_modifiers[i].name;
			wait_times.push(s);
		    }
		    ride_stash["wait_time_min"]=wait_times;
		}
	    }
	}

	function noProcess(key, id, value){}

	var prevMethod=noProcess;
	function process(row){
	    if (row!=null){	   
		var method = 
		    row.key[0]==0 ? preProcess :
		    row.key[0]==1 ? processRides :
		    null;
		myLib.assert( method!=null );
		
		method(row.key[1], row.id, row.value);
		prevMethod=method;
	    }else{
		prevMethod(null,null,null);
	    }
	}

	function mainLoop(){
	    while (row = getRow() ) {
		process(row);
	    }
	    process(null);
	}

	mainLoop();

	var stash = { "rides": rides, "wait_time_modifiers": wait_time_modifiers };
	return stash;
    }

    //-- The provides function serves the format the client requests.
    //-- The first matching format is sent, so reordering functions changes 
    //-- thier priority. In this case HTML is the preferred format, so it comes first.

    provides("html", function() {
	var isSummary = req.query["summary"] != null;
	var template = isSummary?"rides-summary":"ride";

	return Mustache.to_html(ddoc.templates[template],  myLib.addIfdef(stash()), ddoc.templates.partials);
    });

    provides("json", function() {
	//return JSON.stringify(req);
	return JSON.stringify(stash());
    });   
};