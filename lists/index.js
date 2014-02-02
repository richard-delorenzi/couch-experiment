function(head, req) {
    var ddoc = this;
    var Mustache = require("lib/mustache");
    var List = require("vendor/couchapp/lib/list");
    var path = require("vendor/couchapp/lib/path").init(req);

    //var indexPath = path.list('index','rides',{descending:true, limit:10});


    //var path_parts = req.path;
   

    function addIfdef(stash)
    {
	var Result=new Object();
	for ( var i in stash)
	{
	    Result[i] = stash[i];
	    if (typeof stash[i] != "undefined") {
		Result["ifdef_"+i] = true; 
	    }
	}
	return Result;
    }

    function listify(i)
    {
	if ( typeof i == "undefined" ) {
	    return null;
	}
	else if (typeof i == "boolean") {
	    return i?["true"]:["false"];
	}
	else if (Array.isArray(i)) {
	    return i;
	}
	else {
	    return [i]
	}
    }

    function stash()
    {
	var key = "";
	var stash = {
	    rides : List.withRows(
		function(row) {
		    var value = row.value;
		    key = row.key;
		    if (value.type == "ride")
		    {
			var ride = value;	
			var ride_stash = {
			    description: listify(ride.description),
			    name : ride.name,
			};
		
			ride_stash["wait_time_min"]= ride.wait_time_min;
			

			return addIfdef(ride_stash);
		    } else {
			s_entry_time = value.entry_time;
			return false;
		    }
		})
	};
	return stash;
    }

    //-- The provides function serves the format the client requests.
    //-- The first matching format is sent, so reordering functions changes 
    //-- thier priority. In this case HTML is the preferred format, so it comes first.

    provides("html", function() {
	return Mustache.to_html(ddoc.templates.index, stash(), ddoc.templates.partials);
    });

    provides("json", function() {
	return JSON.stringify(stash());
    });   
};