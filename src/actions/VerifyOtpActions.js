import {
    
    SHOW_VERIFY_OTP_LOADING,
    VERIFY_OTP,
    RESEND_OTP,
    CLEAR_VERIFY_OTP_DATA                          
    } from './actionTypes';
  import APIURLCONSTANTS from "../ApiUrlList";
  
  
  export const showVerifyOtpLoading =(value)=>{
    //console.log('in loading login='+ value);
    return (dispatch) => {
      dispatch({
        type: SHOW_VERIFY_OTP_LOADING,
        payload: value
      });
    }
  };
  
  export const verifyOtp = ({phoneNumber,code,mode}) => {
  
      
      console.log(APIURLCONSTANTS.VERIFY_RECEIVED_OTP);
      console.log('Postdata JSON otp recieve---------------------------'+JSON.stringify({phoneNumber,code,mode}));
     
    
      return (dispatch) => {
    
        //call the API and use the promise to check the response
        // in response callBack .then() call the dispatcher.
    
        fetch(APIURLCONSTANTS.VERIFY_RECEIVED_OTP, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({phoneNumber,code,mode})
        })
        .then( (response) => {
          console.log('Received response verify otp--------------------: ', response);
          return response.json();
        })
        .then( (responseJSON) => {
          console.log('JSON response from verify otp API------------------- ', responseJSON);
    
          dispatch({
            type:VERIFY_OTP,
            payload: responseJSON
          });
            
         // const loaderHandler = require('react-native-busy-indicator/LoaderHandler').default.default;
          //loaderHandler.hideLoader();
        })
        .catch(e => {
          console.log('Error==='+e);
          alert('Server not responding');
          dispatch({
            type: SHOW_VERIFY_OTP_LOADING,
            payload: false
          });
    
        });
      }
    
    };

    export const resendOtp = ({phoneNumber,type}) => {

    
      console.log(APIURLCONSTANTS.OTP_RECEIVE);
      console.log('Postdata JSON otp recieve---------------------------'+JSON.stringify({phoneNumber,type}));
     
    
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
          console.log('Received response receive otp--------------------: ', response);
          return response.json();
        })
        .then( (responseJSON) => {
          console.log('JSON response from receive otp API------------------- ', responseJSON);
    
          dispatch({
            type:RESEND_OTP,
            payload: responseJSON
          });
            
         // const loaderHandler = require('react-native-busy-indicator/LoaderHandler').default.default;
          //loaderHandler.hideLoader();
        })
        .catch(e => {
          console.log('Error==='+e);
          alert('Server not responding');
          dispatch({
            type: SHOW_VERIFY_OTP_LOADING,
            payload: false
          });
    
        });
      }
    
    };

    export const clearVerifyOtpData = () => ({
      type: CLEAR_VERIFY_OTP_DATA
    });
    