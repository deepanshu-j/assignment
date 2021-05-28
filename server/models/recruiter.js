var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');
// var Job = require('./job');

var recruiterSchema = new mongoose.Schema({
	name: String,
	jobs: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Job'
		}
	]
});

recruiterSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('recruiter', recruiterSchema);
// [
// 	{
// 		type: mongoose.Schema.Types.ObjectId,
// 		ref: Job
// 	}
// ]
