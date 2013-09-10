function(doc, req) {  
    var ddoc = this;
    var Mustache = require("lib/mustache");
    
    var stash = {};
    if (doc) {
	//stash.doc = JSON.stringify(doc);
	stash.name          = doc.name;
	stash.description   = doc.description;
	stash.wait_time_min = doc.wait_time_min;
	//using a show may not be the way to go, we need to join on reservation
    } else {
	stash.name ="ahhh";
    }
    
    return  Mustache.to_html(
	ddoc.templates.ride, 
	stash, 
	ddoc.templates.partials);
}
