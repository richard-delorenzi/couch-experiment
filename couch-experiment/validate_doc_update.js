function (newDoc, oldDoc, userCtx, secObj) {
    var v = require("lib/validate").init(newDoc, oldDoc, userCtx, secObj);

    v.isAuthor = function() {
	return v.isAdmin() || userCtx.roles.indexOf("author") != -1;
    };

    isNumber = function(n) {
	return !isNaN(parseFloat(n)) && isFinite(n);
    }

    // admins or owner can always delete
    //if (v.isAdmin()) return true;

    v.require("type");
    v.unchanged("type");

    if (newDoc.created_at) v.dateFormat("created_at");

    v.assert( newDoc.type == "ride"               ||
	      newDoc.type == "ride_status"        ||
	      newDoc.type == "wait_time_modifier" );
    
    switch (newDoc.type)
    {
    case "ride":
    case "wait_time_modifier":
	v.require("name");
	break;
    case "ride_status":
	v.require("attraction_id");
	break;
    }

    if (newDoc.type == "ride" ||
	newDoc.type == "wait_time_modifier" ) 
    {
	v.require("name");
    }

    if (newDoc.type == "ride") {
    }

    if (newDoc.type == "ride_status") {

    }

    if (newDoc.type == "wait_time_modifier") {

    }

    
}
