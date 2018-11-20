import {
    
    SHOW_VERIFY_OTP_LOADING,
    VERIFY_OTP,
    RESEND_OTP,
    CLEAR_VERIFY_OTP_DATA                          
    } from './actionTypes';
  import APIURLCONSTANTS from "../ApiUrlList";
  
  
  export const showVerifyOtpLoading =(value)=>{
    //
    return (dispatch) => {
      dispatch({
        type: SHOW_VERIFY_OTP_LOADING,
        payload: value
      });
    }
  };
  
  export const verifyOtp = ({phoneNumber,code,mode,type}) => {
  
      console.log("....................................................",{phoneNumber,code,mode,type})
      
      
     
    
      return (dispatch) => {
    
        //call the API and use the promise to check the response
        // in response callBack .then() call the dispatcher.
    
        fetch(APIURLCONSTANTS.VERIFY_RECEIVED_OTP, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({phoneNumber,code,mode,type})
        })
        .then( (response) => {
          
          return response.json();
        })
        .then( (responseJSON) => {
          console.log("....................................................",responseJSON)
    
          dispatch({
            type:VERIFY_OTP,
            payload: responseJSON
          });
            
         // const loaderHandler = require('react-native-busy-indicator/LoaderHandler').default.default;
          //loaderHandler.hideLoader();
        })
        .catch(e => {
          
          alert('Server not responding');
          dispatch({
            type: SHOW_VERIFY_OTP_LOADING,
            payload: false
          });
    
        });
      }
    
    };

    export const resendOtp = ({phoneNumber,type}) => {

    
      
      
     
    
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
          
    
          dispatch({
            type:RESEND_OTP,
            payload: responseJSON
          });
            
         // const loaderHandler = require('react-native-busy-indicator/LoaderHandler').default.default;
          //loaderHandler.hideLoader();
        })
        .catch(e => {
          
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
    