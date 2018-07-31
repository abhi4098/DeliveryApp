import {
    USER_PROFILE,
    UPDATE_PASSWORD,
    UPDATE_PROFILE,
    SHOW_UPDATE_PROFILE_LOADING,
    SHOW_UPDATE_PASSWORD_LOADING,
    SHOW_PROFILE_LOADING
} from './actionTypes';

import APIURLCONSTANTS from "../ApiUrlList";

export const showUpdateProfileLoading =(value)=>{
  //console.log('in loading login='+ value);
  return (dispatch) => {
    dispatch({
      type: SHOW_UPDATE_PROFILE_LOADING,
      payload: value
    });
  }
};

export const showProfileLoading =(value)=>{
    //console.log('in loading login='+ value);
    return (dispatch) => {
      dispatch({
        type: SHOW_PROFILE_LOADING,
        payload: value
      });
    }
  };

  export const showUpdatePasswordLoading =(value)=>{
    //console.log('in loading login='+ value);
    return (dispatch) => {
      dispatch({
        type: SHOW_UPDATE_PASSWORD_LOADING,
        payload: value
      });
    }
  };



export const userProfile = ({userId}) => {

    
    console.log(APIURLCONSTANTS.USER_PROFILE);
    console.log('Postdata JSON='+JSON.stringify({userId}));
   
  
    return (dispatch) => {
  
      //call the API and use the promise to check the response
      // in response callBack .then() call the dispatcher.
  
      fetch(APIURLCONSTANTS.USER_PROFILE_DETAILS, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({userId})
      })
      .then( (response) => {
        console.log('Received response user profile: ', response);
        return response.json();
      })
      .then( (responseJSON) => {
        console.log('JSON response from  user profile: ', responseJSON);
  
        dispatch({
          type:USER_PROFILE,
          payload: responseJSON
        });
          
       // const loaderHandler = require('react-native-busy-indicator/LoaderHandler').default.default;
        //loaderHandler.hideLoader();
      })
      .catch(e => {
        console.log('Error==='+e);
        alert('Server not responding');
        dispatch({
          type: SHOW_LOADING,
          payload: false
        });
  
      });
    }
  
  };


  export const userProfileUpdate = ({name,email,phone,userId}) => {

    
    console.log(APIURLCONSTANTS.USER_UPDATE_PROFILE);
    console.log('Postdata JSON='+JSON.stringify({name,email,phone,userId}));
   
  
    return (dispatch) => {
  
      //call the API and use the promise to check the response
      // in response callBack .then() call the dispatcher.
  
      fetch(APIURLCONSTANTS.USER_UPDATE_PROFILE, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({name,email,phone,userId})
      })
      .then( (response) => {
        console.log('Received response profile update: ', response);
        return response.json();
      })
      .then( (responseJSON) => {
        console.log('JSON response from profile update API: ', responseJSON);
  
        dispatch({
          type:UPDATE_PROFILE,
          payload: responseJSON
        });
          
       // const loaderHandler = require('react-native-busy-indicator/LoaderHandler').default.default;
        //loaderHandler.hideLoader();
      })
      .catch(e => {
        console.log('Error==='+e);
        alert('Server not responding');
        dispatch({
          type: SHOW_LOADING,
          payload: false
        });
  
      });
    }
  
  };

  export const userPasswordUpdate = ({userId,password}) => {

    
    console.log(APIURLCONSTANTS.USER_UPDATE_PASSWORD);
    console.log('Postdata JSON='+JSON.stringify({userId,password}));
   
  
    return (dispatch) => {
  
      //call the API and use the promise to check the response
      // in response callBack .then() call the dispatcher.
  
      fetch(APIURLCONSTANTS.USER_UPDATE_PASSWORD, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({userId,password})
      })
      .then( (response) => {
        console.log('Received response password update: ', response);
        return response.json();
      })
      .then( (responseJSON) => {
        console.log('JSON response from password update API: ', responseJSON);
  
        dispatch({
          type:UPDATE_PASSWORD,
          payload: responseJSON
        });
          
       // const loaderHandler = require('react-native-busy-indicator/LoaderHandler').default.default;
        //loaderHandler.hideLoader();
      })
      .catch(e => {
        console.log('Error==='+e);
        alert('Server not responding');
        dispatch({
          type: SHOW_LOADING,
          payload: false
        });
  
      });
    }
  
  };