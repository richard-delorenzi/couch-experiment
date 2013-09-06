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
    provides("html", function() {
	var key = "";
	// render the html head using a template
	var stash = {
	    header : {
		index : indexPath,
		blogName : "",
		feedPath : "",
		commentsFeed : ""

	    },
	    scripts : {},
	    db : req.path[0],
	    design : req.path[2],
	    newPostPath : path.show("edit"),
	    assets : path.asset(),
	    rides : List.withRows(function(row) {
		var ride = row.value;
		key = row.key;
		return {
		    has_wait_time_min : ride.wait_time_min ? true : false,
                    wait_time_min: ride.wait_time_min,

		    has_description: ride.description ? true : false,
		    description: ride.description,

		    name : ride.name
		};
	    }),
	    older : function() {
		return path.older(key);
	    }
	};
	return Mustache.to_html(ddoc.templates.index, stash, ddoc.templates.partials, List.send);
    });

    
};