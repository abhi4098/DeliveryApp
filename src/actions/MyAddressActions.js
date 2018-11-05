import {
  SHOW_ADDRESS_LOADING,
   ADDRESS_LIST ,
   CLEAR_ADDRESS_RECORD,
   DELETE_ADDRESS_RECORD,
   CLEAR_DELETE_ADDRESS_RECORD
  } from './actionTypes';
import APIURLCONSTANTS from "../ApiUrlList";

export const showAddressLoading =(value)=>{

  return (dispatch) => {
    dispatch({
      type: SHOW_ADDRESS_LOADING,
      payload: value
    });
  }
};


export const clearAddressRecord = () => ({
type:CLEAR_ADDRESS_RECORD
});

export const clearDeleteAddress = () => ({
  type:CLEAR_DELETE_ADDRESS_RECORD
  });
  



export const addressList = ({userid}) => {

  
  
  //
 

  return (dispatch) => {

    //call the API and use the promise to check the response
    // in response callBack .then() call the dispatcher.

    fetch(APIURLCONSTANTS.ADDRESS_LIST_URL +"/"+ userid, {
      method: 'GET',
      // headers: {
      //   'Accept': 'application/json',
      //   'Content-Type': 'application/json',
      // },
      // body: JSON.stringify({userid})
    })
    .then( (response) => {
      
      return response.json();
    })
    .then( (responseJSON) => {
      

      dispatch({
        type:ADDRESS_LIST,
        payload: responseJSON
      });
        
   
    })
    .catch(e => {
      
      alert('Server not responding');
      dispatch({
        type: SHOW_ADDRESS_LOADING,
        payload: false
      });

    });
  }

};


export const deleteAddress = ({addressid,_id}) => {

  
  
  
 

  return (dispatch) => {

    //call the API and use the promise to check the response
    // in response callBack .then() call the dispatcher.

    fetch(APIURLCONSTANTS.ADDRESS_DELETE_URL, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({addressid,_id})
    })
    .then( (response) => {
      
      return response.json();
    })
    .then( (responseJSON) => {
      

      dispatch({
   
         type:DELETE_ADDRESS_RECORD,
        payload: responseJSON
      });
        
   
    })
    .catch(e => {
      
      alert('Server not responding');
      dispatch({
        type: SHOW_ADDRESS_LOADING,
        payload: false
      });

    });
  }

};


