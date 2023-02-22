import {
	FETCH_REPOS_REQUEST,
	FETCH_REPOS_SUCCESS,
	FETCH_REPOS_FAILURE,
	FETCH_COMMITS_REQUEST,
	FETCH_COMMITS_SUCCESS,
	FETCH_COMMITS_FAILURE,
} from "./action";

const initialState = {
	repos: [],
	commits: [],
	loading: false,
	error: null,
};

const rootReducer = (state = initialState, action) => {
	switch (action.type) {
		case FETCH_REPOS_REQUEST:
			return {
				...state,
				loading: true,
			};
		case FETCH_REPOS_SUCCESS:
			return {
				...state,
				loading: false,
				repos: action.payload,
			};
		case FETCH_REPOS_FAILURE:
			return {
				...state,
				loading: false,
				error: action.payload,
			};
		case FETCH_COMMITS_REQUEST:
			return {
				...state,
				loading: true,
			};
		case FETCH_COMMITS_SUCCESS:
			return {
				...state,
				loading: false,
				commits: action.payload,
			};
		case FETCH_COMMITS_FAILURE:
			return {
				...state,
				loading: false,
				error: action.payload,
			};
		default:
			return state;
	}
};

export default rootReducer;
