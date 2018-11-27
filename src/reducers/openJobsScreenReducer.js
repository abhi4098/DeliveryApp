import {
    OPEN_JOB_API,
    SHOW_OPEN_JOB_LOADING,
    CLEAR_OPEN_JOB_RECORD
} from "../actions/actionTypes";

const INITIAL_STATE = {

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


        default:
            return state;

    }

};