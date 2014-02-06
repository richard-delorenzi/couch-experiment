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

	while (row = getRow() ) {
	    var value = row.value;
	    var key = row.key;
	    var subkey = key[1];

	    ride_stash = new Object();

	    if (value.type == "ride")
	    {
		var ride = value;	
		ride_stash["description"] = myLib.listify(ride.description);
		ride_stash["name"] = ride.name;
	    }

	    if (subkey == 0) {
		rides.push(ride_stash);
	    }
	}

	var stash = { "rides": rides };
	return stash;
    }

    //-- The provides function serves the format the client requests.
    //-- The first matching format is sent, so reordering functions changes 
    //-- thier priority. In this case HTML is the preferred format, so it comes first.

    provides("html", function() {
	return Mustache.to_html(ddoc.templates.rides,  myLib.addIfdef(stash()), ddoc.templates.partials);
    });

    provides("json", function() {
	return JSON.stringify(stash());
    });   
};