function (head, req) {
    var ddoc = this;
    var Mustache = require("lib/mustache");
    var List = require("vendor/couchapp/lib/list");
    var path = require("vendor/couchapp/lib/path").init(req);
    var myLib = require("lib/myLib");

    //:sub-optimal: filtering on ridename here is sub-optimal, as all ride pages will be recalculated. 
    //If any ride changes.
    var requestedRideName=req.query["rideName"];


    

    function zzz(methods)
    {
	var prevphase=0;
	while (row = getRow() ) {
	    var value = row.value;
	    var id    = row.id;
	    var key   = key.row;
	    var phase = key[0];

	    if ( prevphase != null && phase != prevphase) {
		if ( finish in methods[prevphase] ) {
		    methods[prevphase].finish();
		}
	    }
	    prevphase=phase;

	    methods[phase].act();
	}
	if ( finish in methods[prevphase] ) {
	    methods[prevphase].finish();
	}
    }



    function stash()
    {
	var rides = new Array();
	var ride_stash = new Object();
	var prevkey = null;

	function rides_push(){
	    if (requestedRideName == null || requestedRideName == ride_stash.name) {
		rides.push(ride_stash);
	    }
	    ride_stash = new Object();
	}

	while (row = getRow() ) {
	    var value = row.value;
	    var key   = row.key;
	    var id    = row.id;

	    if ( prevkey != null && key[1] != prevkey[1]) {
		rides_push();
	    }
	    prevkey=key;

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

		ride_stash["wait_time_min"]= [
		    {"value":   status.wait_time_min*5/100, "name": "gold"},
		    {"value": status.wait_time_min*50/100,  "name": "silver"},
		    {"value": status.wait_time_min*100/100, "name": "bronze"}
		];
	    }
	}
	rides_push();

	var stash = { "rides": rides };
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