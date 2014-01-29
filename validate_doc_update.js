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
    
    if (newDoc.type == "ride") {
	v.require("name");
	//v.assert(isNumber(newDoc.wait_time_min), "wait time, not a number");
    }
    else if (newDoc.type = "zzzz") {
    }
    else {
	v.assert(false, "invalid doc type");
    }
}
