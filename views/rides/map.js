function(doc) {  
    if (doc.type == "ride") {
	emit([doc._id], doc);
    }
    if (doc.type == "reservation" ) {
	emit([doc.attraction_id], doc);
    }
};
