import {
    FORGOT_PASSWORD,
    EMAIL_CHANGED,
    SHOW_LOADING_FORGOT_PASSWORD,
    CLEAR_FORGOT_RESPONSE_RECORD


} from "../actions/actionTypes";

const INITIAL_STATE = {
    email: '',
    forgotResponseData: '',
    isForgotLoading: false
}
export default (state = INITIAL_STATE, action) => {

    switch (action.type) {
        case EMAIL_CHANGED:
            return { ...state, email: action.payload }

        case FORGOT_PASSWORD:
            return { ...state, forgotResponseData: action.payload }

            case SHOW_LOADING_FORGOT_PASSWORD:
	    	return {...state, isForgotLoading:action.payload}

            case CLEAR_FORGOT_RESPONSE_RECORD:
	    	return {...state, forgotResponseData: '', isForgotLoading:false}

        default:
            return state;
    }

};

