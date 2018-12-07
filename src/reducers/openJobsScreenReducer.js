import {
    OPEN_JOB_API,
    SHOW_OPEN_JOB_LOADING,
    CLEAR_OPEN_JOB_RECORD,
    ACCEPT_OPEN_JOB,
    CLEAR_ACCEPT_JOB_RECORD
} from "../actions/actionTypes";

const INITIAL_STATE = {
    AcceptOpenJobsResponseData: '',
    openJobsResponseData: '',
    isLoading: false
}

export default (state = INITIAL_STATE, action) => {

    switch (action.type) {


        case OPEN_JOB_API:
            return { ...state, openJobsResponseData: action.payload }

        case SHOW_OPEN_JOB_LOADING:
            return { ...state, isLoading: action.payload }


        case CLEAR_OPEN_JOB_RECORD:
            return { ...state, openJobsResponseData: '' }


        case ACCEPT_OPEN_JOB:
            return { ...state, AcceptOpenJobsResponseData: action.payload }

        case CLEAR_ACCEPT_JOB_RECORD:
            return { ...state, AcceptOpenJobsResponseData: '' }


        default:
            return state;

    }

};