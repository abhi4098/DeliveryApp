import {
    SHOW_SAVE_ADDRESS_LOADING,
     SAVE_ADDRESS ,
     CLEAR_SAVE_ADDRESS_RECORD
    
    } from './actionTypes';
  import APIURLCONSTANTS from "../ApiUrlList";
  
  export const showSaveAddLoading =(value)=>{
  
    return (dispatch) => {
      dispatch({
        type: SHOW_SAVE_ADDRESS_LOADING,
        payload: value
      });
    }
  };

  export const clearSaveAddressRecord = () => ({
    type:CLEAR_SAVE_ADDRESS_RECORD
    });
  
  
  
  
  
  export const saveAdd = ({_id,latitude,longitude,street}) => {
  
    
    console.log(APIURLCONSTANTS.PIN_MAP_URL );
    console.log('Postdata JSON='+JSON.stringify({_id,latitude,longitude,street}));
   
  
    return (dispatch) => {
  
      //call the API and use the promise to check the response
      // in response callBack .then() call the dispatcher.
  
      fetch(APIURLCONSTANTS.PIN_MAP_URL, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({_id,latitude,longitude,street})
      })
      .then( (response) => {
        console.log('Received response Login: ', response);
        return response.json();
      })
      .then( (responseJSON) => {
        console.log('JSON response from Login API: ', responseJSON);
  
        dispatch({
          type:SAVE_ADDRESS,
          payload: responseJSON
        });
          
     
      })
      .catch(e => {
        console.log('Error==='+e);
        alert('Server not responding');
        dispatch({
          type: SHOW_SAVE_ADDRESS_LOADING,
          payload: false
        });
  
      });
    }
  
  };
  
  
  
  
  
  