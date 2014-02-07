function (head, req) {
    var ddoc = this;
    var Mustache = require("lib/mustache");
    var List = require("vendor/couchapp/lib/list");
    var path = require("vendor/couchapp/lib/path").init(req);
    var myLib = require("lib/myLib");

    function stash()
    {
	var rides = new Array();
	var ride_stash = new Object();
	var prevkey = null;

	while (row = getRow() ) {
	    var value = row.value;
	    var key   = row.key;
	    var id    = row.id;

	    if (key != prevkey && prevkey != null) {
		rides.push(ride_stash);
		ride_stash = new Object();
	    }
	    prevkey=key;

	    if (value.type == "ride")
	    {
		var ride = value;	
		ride_stash["description"] = myLib.listify(ride.description);
		ride_stash["name"] = ride.name;
		ride_stash["id"] = id;
	    }

	    if (value.type == "ride-status")
	    {
		var status = value;
		ride_stash["wait_time_min"] = status.wait_time_min;
		ride_stash["state"] = status.state;
		ride_stash["wait_time_gold"]= status.wait_time_min*5/100;
		ride_stash["wait_time_silver"]= status.wait_time_min*50/100;
		ride_stash["wait_time_bronze"]= status.wait_time_min*100/100;
	    }
	}
	rides.push(ride_stash);

	var stash = { "rides": rides };
	return stash;
    }

    //-- The provides function serves the format the client requests.
    //-- The first matching format is sent, so reordering functions changes 
    //-- thier priority. In this case HTML is the preferred format, so it comes first.

    provides("html", function() {
	var isSummary = req.query["summary"] != null;
	var template = isSummary?"rides-summary":"rides";

	return Mustache.to_html(ddoc.templates[template],  myLib.addIfdef(stash()), ddoc.templates.partials);
    });

    provides("json", function() {
//	return JSON.stringify(req.query);
	return JSON.stringify(stash());
    });   
};