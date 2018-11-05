import {

    ORDER_DELIVERED_API,
    SHOW_ORDER_DELIVER_LOADING,
    CLEAR_LIST_DATA_RECORD
                                
 } from './actionTypes';
import APIURLCONSTANTS from "../ApiUrlList";

export const showOrderDeliveredLoading =(value)=>{
   //
   return (dispatch) => {
     dispatch({
       type: SHOW_ORDER_DELIVER_LOADING,
       payload: value
     });
   }
 };

 export const orderDeliveredData = ({shipment_status,userid,type}) => {

   
   
   
  
 
   return (dispatch) => {
 
     //call the API and use the promise to check the response
     // in response callBack .then() call the dispatcher.
 
     fetch(APIURLCONSTANTS.DASHBOARD_URL , {
       method: 'POST',
       headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json',
       },
       body: JSON.stringify({shipment_status,userid,type})
     })
     .then( (response) => {
       
       return response.json();
     })
     .then( (responseJSON) => {
       
 
       dispatch({
         type:ORDER_DELIVERED_API,
         payload: responseJSON
       });
         
      // const loaderHandler = require('react-native-busy-indicator/LoaderHandler').default.default;
       //loaderHandler.hideLoader();
     })
     .catch(e => {
       
       alert('Server not responding');
       dispatch({
         type: SHOW_ORDER_DELIVER_LOADING,
         payload: false
       });
 
     });
   }
 
 };

 


 export const clearListData = () => ({
   type:CLEAR_LIST_DATA_RECORD
 });
 