var mongoose = require('mongoose');

// where does the db name come from? I just made this up
mongoose.connect('mongodb://localhost:27017/personsDatabase');

var Schema = mongoose.Schema;

var personSchema = new Schema({
	nom:  String,
	mail: String
    });


// why is the collection called "users"? Is that the default or did I do something?
module.exports = mongoose.model('Person', personSchema);

personSchema.methods.standardizeName = function() {
    this.name = this.name.toLowerCase();
    return this.name;
}
