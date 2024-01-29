const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
mongoose.connect('mongodb://localhost:27017/personsDatabase');
mongoose.connection.on('open', function() {
console.log('Connected to Mongodb');

});
var Schema = mongoose.Schema;

var personSchema = new Schema({
	nom:  String,
	mail: String
    });

let Person = mongoose.model('Person',personSchema);
app.set('view engine', 'ejs');

app.use('/create', (req, res) => {
	var newPerson = new Person ({
		nom: req.body.nom,
		mail: req.body.mail,
	    });

	newPerson.save( (err) => { 
		if (err) {
		    res.type('html').status(500);
		    res.send('Error: ' + err);
		}
		else {
		    res.render('created', {nom : req.body.nom, mail:req.body.mail});
		}
	    } ); 

    });

app.use('/all', (req,res)=>{
	Person.find(function(err,allPersons){
		if (err) {
		    res.type('html').status(500);
		    res.send('Error: ' + err);
		}
		else if (allPersons.length==0){
			res.type('html').status(200);
			res.send('ther are no persons');
		}
		else{
			res.render('showAll',{persons: allPersons});
		}
	});


});
app.use('/person',(req,res)=>{
	let searchName=req.query.nom;
	Person.findOne({nom:searchName},(err,person)=>{
		if(err){
			res.type('html').status(500);
		    res.send('Error: ' + err);
		}
		else if(!person){
			res.type('html').status(200);
			res.send('No person named : '+searchName);

		}
		else{
			res.type('html');
			res.render('personInfo',{person : person});
		}
	});
});

app.use('/update',(req,res)=>{
let updateName=req.body.nom;
	Person.findOne({nom: updateName},(err,person)=>{
		if(err){
			res.type('html').status(500);
		    res.send('Error: ' + err);
		}
		else if(!person){
			res.type('html').status(200);
			res.send('No person named : '+searchName)

		}
		else{
			person.mail=req.body.mail;
			person.save((err,person)=>{
				if(err){
					res.type('html').status(500);
					res.send('Error : '+err);
				}
				else {
					res.render('updated',{person:person});
				}
			});
			
		
		}
});
});

app.use('/public', express.static('public'));

app.use('/', (req, res) => { res.redirect('/public/index.html'); } );



app.listen(3000,  () => {
	console.log('Listening on port 3000');
    });
