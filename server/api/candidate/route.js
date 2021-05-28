var candidates = require('./controller');

const Candidate = require('../../models/candidate');
// bodyParser = require('body-parser').json();

module.exports = function(router) {
	router.get('/', candidates.home);

	/**
	 * candidate Route
	 * The Route which fetches the list of jobs at which a particular candidate applied
	 * 
	 * res.body must have candidateId to ensure it's a candidate and fetch his details 
	 */

	router.post('/candidate/new-user-candidate', candidates.add);
	/**Fetches all the candidates in the db */

	router.get('/candidate/all', candidates.all);
	/**list the apllications of candidate, where he applied 
	 * must pass the objectId of the candidate to know which candidate is logged in
	 */

	router.get('/candidate/:jobId/:candidateId', candidates.applyForJob);

	router.get('/candidate/list', candidates.list);

	// // router.put('/candidate/list/update', candidates.updateTheList, candidates.redirectToList);

	// router.delete('/candidate/list/delete', candidates.deleteFromList);
};
