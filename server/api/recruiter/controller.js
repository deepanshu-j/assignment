//Assume you are fetching this jobs array from a mongoDB database in the cloud//
// From Jobs Collection//
/**
 * jobs 
 *  - jobId (primary key) 
 *  - jobDescription
 *  - isAvailable (boolean)
 */
const Recruiter = require('../../models/recruiter');
const Job = require('../../models/job');
const Candidate = require('../../models/candidate');

//From Authentication we know the candidateId//
//Now by using this candidateId fetch the list of jobs applied by the candidate in the candidateJobs Collection//
//Assume you are fetching this candidateJobs  array from a mongoDB database in the cloud//
// From Jobs Collection//
/**
 * RecruiterJobs 
 *  - jobId (primary key) 
 *  - candidateId (will be used to update it in collection of the candidate's applications)
 *  - isSelected (boolean) 
 */

exports.home = function(req, res) {
	res.send('hello world!!');
};
exports.add = async function(req, res) {
	const addRecruiter = await Recruiter.create(req.body);
	res.send(JSON.stringify(addRecruiter));
};

/** This middleware is used when a recruiter adds a new job, Therefore its candidates array is empty,
 * as intially no candidate would have applied to it.
 */
exports.addJob = async function(req, res) {
	const addJob = await Job.create(req.body);
	res.send(JSON.stringify(addJob));
};

exports.candidatesForThisJob = async function(req, res) {
	const { jobId } = req.params;
	const getCandidates = await Job.find({ _id: jobId }, (err, candidateArr) => {
		if (err) throw err;
		else {
			res.send(JSON.stringify(candidateArr));
		}
	});
};

exports.selectThisCandidate = async function(req, res) {
	const { jobId, candidateId } = req.params;

	const getCandidates = await Candidate.findOne({ _id: candidateId }, (err, candidate) => {
		if (err) throw err;
		else {
			// res.send(JSON.stringify(candidate));
			var newApplications = candidate.applications;
			newApplications.forEach((el) => {
				if (el._id == jobId) {
					//make this candidate selected//
					//and close this job availabilty//
					//currently it means when we post a job it has only 1 opening//
					el.selected = true;
				}
			});
			Candidate.findByIdAndUpdate(
				candidateId,
				{
					$set: {
						applications: newApplications
					}
				},
				(err, candi) => {
					if (err) throw err;
					res.send(candi);
				}
			);
		}
	});
};

// exports.list = function(req, res) {
// 	res.send(JSON.stringify(jobsOfThisCandidate));
// };

// exports.updateTheList = function(req, res, next) {
// 	const { jobId } = req.body;

// 	/**Lets suppose it deletes the entry with this jobId from the
//     *  Collection jobsOfThisCandidate
//     */

// 	jobsOfThisCandidate.filter((el) => {
// 		return el.jobId !== jobId && el.isSelected;
// 	});
// 	// res.send(JSON.stringify(jobsOfThisCandidate));
// 	next();
// };

// exports.redirectToList = function(req, res) {
// 	res.redirect('/candidate/list');
// };
// exports.deleteFromList = function(req, res) {
// 	const { jobId } = req.body;
// 	//Delete the element with jobId from the collectio of candidateId//

// 	res.redirect('/candidate/list');
// };
