function(doc) {  
    if (doc.type == "ride") {
	emit([doc._id,0], doc);
    }
    if (doc.type == "ride-status" ) {
	emit([doc.attraction_id,-1], doc);
    }
   
};
