function(doc) {  
    if (doc.type == "ride") {
	emit([0,doc._id], doc);
    }
    if (doc.type == "ride_status" ) {
	emit([0,doc.attraction_id], doc);
    }
   
};
