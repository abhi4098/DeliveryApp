import {

    DRIVER_STATUS,
    SHOW_DRIVER_STATUS_LOADING
                                
 } from './actionTypes';
import APIURLCONSTANTS from "../ApiUrlList";

export const showDriverStatusLoading =(value)=>{
    //console.log('in loading login='+ value);
    return (dispatch) => {
      dispatch({
        type: SHOW_DRIVER_STATUS_LOADING,
        payload: value
      });
    }
  };

  export const driverStatusCall = ({driverid,dutystatus}) => {

    
    console.log(APIURLCONSTANTS.DRIVER_STATUS_URL);
    console.log('Postdata JSON='+JSON.stringify({driverid,dutystatus}));
   
  
    return (dispatch) => {
  
      //call the API and use the promise to check the response
      // in response callBack .then() call the dispatcher.
  
      fetch(APIURLCONSTANTS.DRIVER_STATUS_URL , {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({driverid,dutystatus})
      })
      .then( (response) => {
        console.log('Received response Login: ', response);
        return response.json();
      })
      .then( (responseJSON) => {
        console.log('JSON response from Login API: ', responseJSON);
  
        dispatch({
          type:DRIVER_STATUS,
          payload: responseJSON
        });
          
       // const loaderHandler = require('react-native-busy-indicator/LoaderHandler').default.default;
        //loaderHandler.hideLoader();
      })
      .catch(e => {
        console.log('Error==='+e);
        alert('Server not responding');
        dispatch({
          type: SHOW_DRIVER_STATUS_LOADING,
          payload: false
        });
  
      });
    }
  
  };