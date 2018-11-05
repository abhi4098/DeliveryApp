import {
    
      USERNAME_CHANGED,
      PASSWORD_CHANGED,
       LOGIN_USER,
       SHOW_LOADING,
    CLEAR_LOGIN_RECORD                               
    } from './actionTypes';
import APIURLCONSTANTS from "../ApiUrlList";

export const usernameChanged = (username) => {
    return{
          type: USERNAME_CHANGED,
          payload: username
    };
};

export const passwordChanged = (password) => {
	return {
		type:PASSWORD_CHANGED,
		payload : password
	}
};

export const clearLoginRecord = () => ({
  type:CLEAR_LOGIN_RECORD
});

export const showLoading =(value)=>{
    //
    return (dispatch) => {
      dispatch({
        type: SHOW_LOADING,
        payload: value
      });
    }
  };

  export const loginUser = ({phone,password,type}) => {

    
    
    
   
  
    return (dispatch) => {
  
      //call the API and use the promise to check the response
      // in response callBack .then() call the dispatcher.
  
      fetch(APIURLCONSTANTS.LOGIN, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({phone,password,type})
      })
      .then( (response) => {
        
        return response.json();
      })
      .then( (responseJSON) => {
        
  
        dispatch({
          type:LOGIN_USER,
          payload: responseJSON
        });
          
       // const loaderHandler = require('react-native-busy-indicator/LoaderHandler').default.default;
        //loaderHandler.hideLoader();
      })
      .catch(e => {
        
        alert('Server not responding');
        dispatch({
          type: SHOW_LOADING,
          payload: false
        });
  
      });
    }
  
  };
  

