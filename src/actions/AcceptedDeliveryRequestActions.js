import {

    OPEN_ACCEPTED_DELIVERY_API,
    SHOW_ACCEPTED_DELIVERY_LOADING,
    CLEAR_ACCEPTED_DELIVERY_RECORD
                                
 } from './actionTypes';
import APIURLCONSTANTS from "../ApiUrlList";

export const showAcceptedDeliveryLoading =(value)=>{
   //
   return (dispatch) => {
     dispatch({
       type: SHOW_ACCEPTED_DELIVERY_LOADING,
       payload: value
     });
   }
 };

 export const orderAcceptedDeliveredData = ({shipment_status,userid,type,listtype}) => {

   
   
   
  
 
   return (dispatch) => {
 
     //call the API and use the promise to check the response
     // in response callBack .then() call the dispatcher.
 
     fetch(APIURLCONSTANTS.DASHBOARD_URL , {
       method: 'POST',
       headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json',
       },
       body: JSON.stringify({shipment_status,userid,type,listtype})
     })
     .then( (response) => {
       
       return response.json();
     })
     .then( (responseJSON) => {
       console.log("response........................................",responseJSON);
 
       dispatch({
         type:OPEN_ACCEPTED_DELIVERY_API,
         payload: responseJSON
       });
         
      // const loaderHandler = require('react-native-busy-indicator/LoaderHandler').default.default;
       //loaderHandler.hideLoader();
     })
     .catch(e => {
       
       alert('Server not responding');
       dispatch({
         type: SHOW_ACCEPTED_DELIVERY_LOADING,
         payload: false
       });
 
     });
   }
 
 };

 


 export const clearAcceptedDeliveryData = () => ({
   type:CLEAR_ACCEPTED_DELIVERY_RECORD
 });
 