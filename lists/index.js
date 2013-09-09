function(head, req) {
    var ddoc = this;
    var Mustache = require("lib/mustache");
    var List = require("vendor/couchapp/lib/list");
    var path = require("vendor/couchapp/lib/path").init(req);

    var indexPath = path.list('index','rides',{descending:true, limit:10});


    var path_parts = req.path;
    // The provides function serves the format the client requests.
    // The first matching format is sent, so reordering functions changes 
    // thier priority. In this case HTML is the preferred format, so it comes first.

    function addHas(stash)
    {
	var Result=new Object();
	for ( var i in stash)
	{
	    Result[i] = stash[i];
	    Result["has_"+i] = (stash[i]===null)?false:true;
	}
	return Result;
    }

    function listify(i)
    {
	return i;
    }

    function stash()
    {
	var key = "";
	// render the html head using a template
	var stash = {
	    rides : List.withRows(
		function(row) {
		    var ride = row.value;
		    key = row.key;
		    var ride_stash = {
			//has_wait_time_min : ride.wait_time_min ? true : false,
			wait_time_min: ride.wait_time_min,
			
			//has_description: ride.description ? true : false,
			description: listify(ride.description),
			
			name : ride.name
		    };
		    return addHas(ride_stash);
		})
	};
	return stash;
    }

    provides("html", function() {
	return Mustache.to_html(ddoc.templates.index, stash(), ddoc.templates.partials);
    });

    provides("json", function() {
	return JSON.stringify(stash());
    });

    
};