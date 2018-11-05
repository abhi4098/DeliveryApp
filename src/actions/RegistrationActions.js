import {
    
    USERNAME_CHANGED,
    PASSWORD_CHANGED,
    PHONE_CHANGED,
    EMAIL_CHANGED,
     REGISTER_USER,
     SHOW_LOADING,
     CLEAR_REGISTRATION_RECORD,
     SHOW_LOADING_REGISTRATION
  } from './actionTypes';
import APIURLCONSTANTS from "../ApiUrlList";

export const nameChanged = (username) => {
  return{
        type: USERNAME_CHANGED,
        payload: username
  };
};

export const passChanged = (password) => {
  return {
      type:PASSWORD_CHANGED,
      payload : password
  }
};

export const emailIsChanged = (email) => {
    return{
          type: EMAIL_CHANGED,
          payload: email
    };
};

export const phoneChanged = (phone) => {
    return{
          type: PHONE_CHANGED,
          payload: phone
    };
};

export const clearRegistrationRecord = () => ({
type:CLEAR_REGISTRATION_RECORD
});

export const showRegistrationLoading =(value)=>{
  //
  return (dispatch) => {
    dispatch({
      type: SHOW_LOADING_REGISTRATION,
      payload: value
    });
  }
};

export const registerUser = ({name,password,phone,email,type}) => {

  
  
  
 

  return (dispatch) => {

    //call the API and use the promise to check the response
    // in response callBack .then() call the dispatcher.

    fetch(APIURLCONSTANTS.REGISTER_USER_URL, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({name,password,phone,email,type})
    })
    .then( (response) => {
      
      return response.json();
    })
    .then( (responseJSON) => {
      

      dispatch({
        type:REGISTER_USER,
        payload: responseJSON
      });
        
     // const loaderHandler = require('react-native-busy-indicator/LoaderHandler').default.default;
      //loaderHandler.hideLoader();
    })
    .catch(e => {
      
      alert('Server not responding');
      dispatch({
        type: SHOW_LOADING_REGISTRATION,
        payload: false
      });

    });
  }

};


