function(doc) {  
    if (doc.type == "reservation" ) {
	emit([doc.attraction_id,0], doc);
    }
    if (doc.type == "ride") {
	emit([doc._id,1], doc);
    }
    if (doc.type == "ride-status" ) {
	emit([doc.attraction_id,2], doc);
    }
   
};
