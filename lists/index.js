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
	    posts : List.withRows(function(row) {
		var post = row.value;
		key = row.key;
		return {
		    title : ride.title,
		    description : ride.description
		};
	    }),
	    older : function() {
		return path.older(key);
	    },
	    "5" : path.limit(5),
	    "10" : path.limit(10),
	    "25" : path.limit(25)
	};
	return Mustache.to_html(ddoc.templates.index, stash, ddoc.templates.partials, List.send);
    });

    
};