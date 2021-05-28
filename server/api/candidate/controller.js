//Assume you are fetching this jobs array from a mongoDB database in the cloud//
// From Jobs Collection//
/**
 * jobs 
 *  - jobId (primary key) 
 *  - jobDescription
 *  - isAvailable (boolean)
 */
const CircularJSON = require('circular-json');
const Job = require('../../models/job');
const Candidate = require('../../models/candidate');

//From Authentication we know the candidateId//
//Now by using this candidateId fetch the list of jobs applied by the candidate in the candidateJobs Collection//
//Assume you are fetching this candidateJobs  array from a mongoDB database in the cloud//
// From Jobs Collection//
/**
 * CandidateJobs 
 *  - jobId (primary key) 
 *  - isSelected (boolean) 
 */

exports.home = (req, res) => {
	const openJobs = Job.find({}, (err, allJobs) => {
		if (err) throw err;
		else {
			// const str = allJobs;
			res.json(allJobs);
		}
	});
};

exports.add = async function(req, res) {
	const addCandidate = await Candidate.create(req.body);
	res.send(JSON.stringify(addCandidate));
};

exports.all = async function(req, res) {
	// const addCandidate = await Candidate.create(req.body);
	// res.send(JSON.stringify(addCandidate));
	res.send(await Candidate.find({}));
};

exports.list = function(req, res) {
	res.send(JSON.stringify(jobsOfThisCandidate));
};

/**To apply for a job we need to know two things
 * 1. which job we are applying (jobId)
 * 2. which candidate is apllying (candidateId)
 */
exports.applyForJob = async function(req, res) {
	// const addCandidate = await Candidate.create(req.body);
	// res.send(JSON.stringify(addCandidate));
	var updatedCandidate = null,
		updatedJob = null;
	const { jobId, candidateId } = req.params;

	//add it in the candidates application array//
	await Candidate.findByIdAndUpdate(
		candidateId,
		{
			$push: {
				applications: { _id: jobId, selected: false }
			}
		},
		// { new: true, upsert: true },
		(err, candidate) => {
			if (err) throw err;
			else {
				updatedCandidate = candidate;
			}
		}
	);
	//add it in the Job candidate list//
	await Job.findByIdAndUpdate(
		jobId,
		{
			$push: {
				candidates: { _id: candidateId }
			}
		},
		(err, job) => {
			if (err) throw err;
			else {
				updatedJob = job;
			}
		}
	);

	res.send({ updatedJob, updatedCandidate });
};

exports.updateTheList = function(req, res, next) {
	/**Lets suppose it deletes the entry with this jobId from the 
    *  Collection jobsOfThisCandidate 
    */
	// res.send(JSON.stringify(jobsOfThisCandidate));
	next();
};

exports.redirectToList = function(req, res) {
	res.redirect('/candidate/list');
};
exports.deleteFromList = function(req, res) {
	const { jobId } = req.body;
	//Delete the element with jobId from the collectio of candidateId//

	res.redirect('/candidate/list');
};
