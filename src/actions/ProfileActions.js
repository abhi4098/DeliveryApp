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
  //
  return (dispatch) => {
    dispatch({
      type: SHOW_UPDATE_PROFILE_LOADING,
      payload: value
    });
  }
};

export const showProfileLoading =(value)=>{
    //
    return (dispatch) => {
      dispatch({
        type: SHOW_PROFILE_LOADING,
        payload: value
      });
    }
  };

  export const showUpdatePasswordLoading =(value)=>{
    //
    return (dispatch) => {
      dispatch({
        type: SHOW_UPDATE_PASSWORD_LOADING,
        payload: value
      });
    }
  };



export const userProfile = ({userId}) => {

    
    
    
   
  
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
        
        return response.json();
      })
      .then( (responseJSON) => {
        
  
        dispatch({
          type:USER_PROFILE,
          payload: responseJSON
        });
          
       // const loaderHandler = require('react-native-busy-indicator/LoaderHandler').default.default;
        //loaderHandler.hideLoader();
      })
      .catch(e => {
        
        alert('Server not responding');
        dispatch({
          type: SHOW_PROFILE_LOADING,
          payload: false
        });
  
      });
    }
  
  };


  export const userProfileUpdate = ({name,email,phone,userId,type,mode,avatar,profilepic}) => {

    
    
    console.log("response edit profile.............................",{name,email,phone,userId,type,mode,avatar,profilepic});
   
  
    return (dispatch) => {
  
      //call the API and use the promise to check the response
      // in response callBack .then() call the dispatcher.
  
      fetch(APIURLCONSTANTS.USER_UPDATE_PROFILE, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({name,email,phone,userId,type,mode,avatar,profilepic})
      })
      .then( (response) => {
        
        return response.json();
      })
      .then( (responseJSON) => {
        
  
        dispatch({
          type:UPDATE_PROFILE,
          payload: responseJSON
        });
          
       // const loaderHandler = require('react-native-busy-indicator/LoaderHandler').default.default;
        //loaderHandler.hideLoader();
      })
      .catch(e => {
        
        alert('Server not responding');
        dispatch({
          type: SHOW_UPDATE_PROFILE_LOADING,
          payload: false
        });
  
      });
    }
  
  };

  export const userPasswordUpdate = ({userId,password}) => {

    
    
    
   
  
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
        
        return response.json();
      })
      .then( (responseJSON) => {
        
  
        dispatch({
          type:UPDATE_PASSWORD,
          payload: responseJSON
        });
          
       // const loaderHandler = require('react-native-busy-indicator/LoaderHandler').default.default;
        //loaderHandler.hideLoader();
      })
      .catch(e => {
        
        alert('Server not responding');
        dispatch({
          type: SHOW_UPDATE_PASSWORD_LOADING,
          payload: false
        });
  
      });
    }
  
  };