function(doc, req) {  
    var ddoc = this;
    var Mustache = require("lib/mustache");
    
    var stash = {};
    if (doc) {
	stash.doc = JSON.stringify(doc);
	stash.name = doc.name;
    } else {
	stash.name ="ahhh";
    }
    
    return  Mustache.to_html(
	ddoc.templates.ride, 
	stash, 
	ddoc.templates.partials);
}
