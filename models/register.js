// Import mongoose and bcrypt

var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

// Alias for mongoose.Schema
var Schema = mongoose.Schema;

// Define our user Schema
var UserSchema = new Schema({
	username: String,
	password: String,
	email: String,
	displayName: String,
	salt: String,
	provider: String,
	providerId: String,
	providerData: {},
	created: Number,
	updated: Number
}, {
	collection: 'user1Info'
});

// Generate a Hash
UserSchema.methods.generateHash = function(password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);	

};

//check to see if password is valid
UserSchema.methods.validPassword = function(password){
	return bcrypt.compareSync(password, this.password);
}

module.exports = mongoose.model('User1', UserSchema);