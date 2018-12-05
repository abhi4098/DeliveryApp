import {
    
    SHOW_VERIFY_OTP_LOADING,
    VERIFY_OTP,
    RESEND_OTP ,
    CLEAR_VERIFY_OTP_DATA                        
    } from '../actions/actionTypes';

const INITIAL_STATE = {
    isLoading:false,
    verifyOtpResponseData:'',
    resendOTPResponseData:''
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
       
            case SHOW_VERIFY_OTP_LOADING:
            return {...state, isLoading:action.payload}

            case VERIFY_OTP:
             return {...state, verifyOtpResponseData:action.payload}

             case RESEND_OTP:
             return {...state, resendOTPResponseData:action.payload}

             case CLEAR_VERIFY_OTP_DATA:
             return {...state, verifyOtpResponseData:''}
            
        default:
            return state;
    }
}