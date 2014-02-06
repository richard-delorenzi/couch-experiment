function(doc) {  
    if (doc.type == "ride") {
	emit(doc._id, doc);
    }
    if (doc.type == "ride-status" ) {
	emit(doc.attraction_id, doc);
    }
   
};
