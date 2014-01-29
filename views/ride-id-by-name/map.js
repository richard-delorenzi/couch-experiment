function(doc) {  
    if (doc.type == "ride") {
	emit(doc.name, doc._id);
    } 
};