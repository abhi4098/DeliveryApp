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
    //console.log('in loading login='+ value);
    return (dispatch) => {
      dispatch({
        type: SHOW_LOADING,
        payload: value
      });
    }
  };

  export const loginUser = ({phone,password}) => {

    
    console.log(APIURLCONSTANTS.LOGIN);
    console.log('Postdata JSON='+JSON.stringify({phone,password}));
   
  
    return (dispatch) => {
  
      //call the API and use the promise to check the response
      // in response callBack .then() call the dispatcher.
  
      fetch(APIURLCONSTANTS.LOGIN, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({phone,password})
      })
      .then( (response) => {
        console.log('Received response Login: ', response);
        return response.json();
      })
      .then( (responseJSON) => {
        console.log('JSON response from Login API: ', responseJSON);
  
        dispatch({
          type:LOGIN_USER,
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
  

