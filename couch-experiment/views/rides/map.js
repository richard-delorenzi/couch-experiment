function(doc) {  
    if (doc.type == "wait_time_modifier" ) {
	emit([0, doc.percentage], doc);
    }

    if (doc.type == "ride") {
	emit([1, doc._id], doc);
    }
    if (doc.type == "ride_status" ) {
	emit([1, doc.attraction_id], doc);
    }
};
