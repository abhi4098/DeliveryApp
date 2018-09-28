import {
    DASHBOARD_API,
    SHOW_DASHBOARD_LOADING
} from "../actions/actionTypes";

const INITIAL_STATE = {
    
    dasboardResponseData: '',
    isLoading: false
}

export default (state = INITIAL_STATE, action) => {

    switch (action.type) {

  
        case DASHBOARD_API:
            return { ...state, dasboardResponseData: action.payload }

        case SHOW_DASHBOARD_LOADING:
            return { ...state, isLoading: action.payload }

        default:
            return state;

    }

};