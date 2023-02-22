export const FETCH_REPOS_REQUEST = "FETCH_REPOS_REQUEST";
export const FETCH_REPOS_SUCCESS = "FETCH_REPOS_SUCCESS";
export const FETCH_REPOS_FAILURE = "FETCH_REPOS_FAILURE";
export const FETCH_COMMITS_REQUEST = "FETCH_COMMITS_REQUEST";
export const FETCH_COMMITS_SUCCESS = "FETCH_COMMITS_SUCCESS";
export const FETCH_COMMITS_FAILURE = "FETCH_COMMITS_FAILURE";

export const fetchReposRequest = () => {
	return {
		type: FETCH_REPOS_REQUEST,
	};
};

export const fetchReposSuccess = (repos) => {
	return {
		type: FETCH_REPOS_SUCCESS,
		payload: repos,
	};
};

export const fetchReposFailure = (error) => {
	return {
		type: FETCH_REPOS_FAILURE,
		payload: error,
	};
};

export const fetchRepos = (username) => {
	return (dispatch) => {
		dispatch(fetchReposRequest());
		fetch(`https://api.github.com/users/${username}/repos`)
			.then((response) => response.json())
			.then((data) => {
				dispatch(fetchReposSuccess(data));
			})
			.catch((error) => {
				dispatch(fetchReposFailure(error.message));
			});
	};
};

//COMMITS

export const fetchCommitsRequest = () => {
	return {
		type: FETCH_COMMITS_REQUEST,
	};
};

export const fetchCommitsSuccess = (commits) => {
	return {
		type: FETCH_COMMITS_SUCCESS,
		payload: commits,
	};
};

export const fetchCommitsFailure = (error) => {
	return {
		type: FETCH_COMMITS_FAILURE,
		payload: error,
	};
};

export const fetchCommits = (owner, repo) => {
	return (dispatch) => {
		dispatch(fetchCommitsRequest());
		fetch(`https://api.github.com/repos/${owner}/${repo}/commits`)
			.then((response) => response.json())
			.then((data) => {
				dispatch(fetchCommitsSuccess(data));
			})
			.catch((error) => {
				dispatch(fetchCommitsFailure(error.message));
			});
	};
};
