import {

    DRIVER_STATUS,
    SHOW_DRIVER_STATUS_LOADING,
    CLEAR_DRIVER_STATUS
                                
 } from './actionTypes';
import APIURLCONSTANTS from "../ApiUrlList";

export const showDriverStatusLoading =(value)=>{
    //
    return (dispatch) => {
      dispatch({
        type: SHOW_DRIVER_STATUS_LOADING,
        payload: value
      });
    }
  };

  export const driverStatusCall = ({driverid,dutystatus}) => {

    
    
    
   
  
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
        
        return response.json();
      })
      .then( (responseJSON) => {
        
  
        dispatch({
          type:DRIVER_STATUS,
          payload: responseJSON
        });
          
       // const loaderHandler = require('react-native-busy-indicator/LoaderHandler').default.default;
        //loaderHandler.hideLoader();
      })
      .catch(e => {
        
        alert('Server not responding');
        dispatch({
          type: SHOW_DRIVER_STATUS_LOADING,
          payload: false
        });
  
      });
    }
  
  };

  export const clearDriverStatusRecord = () => ({
    type:CLEAR_DRIVER_STATUS
  });