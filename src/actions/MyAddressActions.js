import {
  SHOW_ADDRESS_LOADING,
   ADDRESS_LIST                              
  } from './actionTypes';
import APIURLCONSTANTS from "../ApiUrlList";

export const ShowAddressLoading =(value)=>{

  return (dispatch) => {
    dispatch({
      type: SHOW_ADDRESS_LOADING,
      payload: value
    });
  }
};


// export const clearLoginRecord = () => ({
// type:CLEAR_LOGIN_RECORD
// });

// export const showLoading =(value)=>{
//   //console.log('in loading login='+ value);
//   return (dispatch) => {
//     dispatch({
//       type: SHOW_LOADING,
//       payload: value
//     });
//   }
// };

export const addressList = ({userid}) => {

  
  console.log(APIURLCONSTANTS.ADDRESS_LIST_URL +"/"+ "5ba8a27e2607e618d80eb9fa");
  //console.log('Postdata JSON='+JSON.stringify({userid}));
 

  return (dispatch) => {

    //call the API and use the promise to check the response
    // in response callBack .then() call the dispatcher.

    fetch(APIURLCONSTANTS.ADDRESS_LIST_URL +"/"+ "5ba8a27e2607e618d80eb9fa", {
      method: 'GET',
      // headers: {
      //   'Accept': 'application/json',
      //   'Content-Type': 'application/json',
      // },
      // body: JSON.stringify({userid})
    })
    .then( (response) => {
      console.log('Received response Login: ', response);
      return response.json();
    })
    .then( (responseJSON) => {
      console.log('JSON response from Login API: ', responseJSON);

      dispatch({
        type:ADDRESS_LIST,
        payload: responseJSON
      });
        
   
    })
    .catch(e => {
      console.log('Error==='+e);
      alert('Server not responding');
      dispatch({
        type: SHOW_ADDRESS_LOADING,
        payload: false
      });

    });
  }

};


