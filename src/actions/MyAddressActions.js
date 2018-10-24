import {
    
   ADDRESS_LIST                              
  } from './actionTypes';
import APIURLCONSTANTS from "../ApiUrlList";




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

export const addressList = ({type,userid}) => {

  
  console.log(APIURLCONSTANTS.ADDRESS_LIST_URL);
  console.log('Postdata JSON='+JSON.stringify({type,userid}));
 

  return (dispatch) => {

    //call the API and use the promise to check the response
    // in response callBack .then() call the dispatcher.

    fetch(APIURLCONSTANTS.ADDRESS_LIST_URL, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({type,userid})
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
        type: SHOW_LOADING,
        payload: false
      });

    });
  }

};


