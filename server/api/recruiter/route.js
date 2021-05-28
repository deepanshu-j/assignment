var recruiter = require('./controller');

module.exports = function(router) {
	// router.get('/', recruiter.home);
	/**
	 * recruiter Route
	 * The Route which fetches the list of jobs at which a particular recruiter applied
	 * 
	 * res.body must have recruiterId to ensure it's a recruiter and fetch his details 
	 */

	//New Recruiter Signs up//
	router.post('/recruiter/new-user-recruiter', recruiter.add);

	router.get('/recruiter/:jobId', recruiter.candidatesForThisJob);

	router.get('/recruiter/:jobId/:candidateId', recruiter.selectThisCandidate);

	// Recruiter posts a new job//
	router.post('/recruiter/add-job', recruiter.addJob);
	// router.get('/recruiter/list', recruiter.list);
	// router.put('/recruiter/list/update', recruiter.updateTheList, recruiter.redirectToList);
	// router.delete('/recruiter/list/delete', recruiter.deleteFromList);
};
