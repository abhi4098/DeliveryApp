import {
    
  PHONE_NUM_CHANGED,
  RECEIVE_OTP ,
  SHOW_OTP_LOADING ,
  CLEAR_RECEIVE_OTP_DATA                             
  } from './actionTypes';
import APIURLCONSTANTS from "../ApiUrlList";

export const userPhoneChanged = (phone) => {
    return{
          type: PHONE_NUM_CHANGED,
          payload: phone
    };
};

export const showReceiveOtpLoading =(value)=>{
  //
  return (dispatch) => {
    dispatch({
      type: SHOW_OTP_LOADING,
      payload: value
    });
  }
};

export const receiveOtp = ({phoneNumber,type}) => {

    
    
    
   
  
    return (dispatch) => {
  
      //call the API and use the promise to check the response
      // in response callBack .then() call the dispatcher.
  
      fetch(APIURLCONSTANTS.OTP_RECEIVE, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({phoneNumber,type})
      })
      .then( (response) => {
        
        return response.json();
      })
      .then( (responseJSON) => {
        console.log("sent otp client response........................................",responseJSON)
  
        dispatch({
          type:RECEIVE_OTP,
          payload: responseJSON
        });
          
       // const loaderHandler = require('react-native-busy-indicator/LoaderHandler').default.default;
        //loaderHandler.hideLoader();
      })
      .catch(e => {
        
        alert('Server not responding');
        dispatch({
          type: SHOW_OTP_LOADING,
          payload: false
        });
  
      });
    }
  
  };

  export const clearReceiveOtpData = () => ({
      type: CLEAR_RECEIVE_OTP_DATA
    });