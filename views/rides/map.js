function(doc) {  
    if (doc.type == "ride") {
	emit([doc.ordinal,doc.name], doc);
    } 
};
