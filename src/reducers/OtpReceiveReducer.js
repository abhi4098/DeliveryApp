import {
    PHONE_NUM_CHANGED,
    RECEIVE_OTP,
    SHOW_OTP_LOADING
} from "../actions/actionTypes";

const INITIAL_STATE = {
    phone: '',
    isLoading:false,
    receiveOtpResponseData:''
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case PHONE_NUM_CHANGED:
            return { ...state, phone: action.payload }

            case SHOW_OTP_LOADING:
            return {...state, isLoading:action.payload}

            case RECEIVE_OTP:
            console.log('RECEIVE_OTP action.payload reducer============== ' + action.payload);
            return {...state, receiveOtpResponseData:action.payload}
            
        default:
            return state;
    }
}