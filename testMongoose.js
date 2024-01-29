const mongoose = require('mongoose');

mongoose.connect('mongodb://mongo:27017/personsDatabase');
let Person = mongoose.model('Person',{nom : String,mail : String});
let aPerson = new Person({name : 'reda', mail : 'reda@gmail.com'});

aPerson.save(function(err,results){
	if(err){
		console.error(err);
		process.exit(1);
	}
	else {
		console.log('saved : ', results);
		process.exit(0);
	}
});