function(doc) {  
    if (doc.type == "wait_time_modifier") {
	emit(doc.percentage, doc);
    }
};