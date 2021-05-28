var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

var candidateSchema = new mongoose.Schema({
	username: String,
	applications: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Job',
			selected: Boolean
		}
	]
});

candidateSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('Candidate', candidateSchema);
