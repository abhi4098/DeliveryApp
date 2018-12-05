import {
    PHONE_NUM_CHANGED,
    RECEIVE_OTP,
    SHOW_OTP_LOADING,
    CLEAR_RECEIVE_OTP_DATA
    
} from "../actions/actionTypes";

const INITIAL_STATE = {
    phone: '',
    isLoading:false,
    receiveOtpResponseData:'',
    
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case PHONE_NUM_CHANGED:
            return { ...state, phone: action.payload }

            case SHOW_OTP_LOADING:
            return {...state, isLoading:action.payload}

            case RECEIVE_OTP:
             return {...state, receiveOtpResponseData:action.payload}
           
             case CLEAR_RECEIVE_OTP_DATA:
             return {...state, receiveOtpResponseData:''}
        default:
            return state;
    }
}