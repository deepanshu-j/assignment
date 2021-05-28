var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');
// var Candidate = require('./candidate');
// var Recruiter = require('./recruiter');

var jobSchema = new mongoose.Schema({
	title: String,
	recruiter: { type: mongoose.Schema.Types.ObjectId, ref: 'Recruiter' },
	open: Boolean,
	candidates: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Candidate'
		}
	]
});
jobSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('job', jobSchema);
