import {

    OPEN_JOB_API,
    SHOW_OPEN_JOB_LOADING,
    CLEAR_OPEN_JOB_RECORD,
    ACCEPT_OPEN_JOB,
    CLEAR_ACCEPT_JOB_RECORD,
                                
 } from './actionTypes';
import APIURLCONSTANTS from "../ApiUrlList";

export const showOpenJobsLoading =(value)=>{
   //
   return (dispatch) => {
     dispatch({
       type: SHOW_OPEN_JOB_LOADING,
       payload: value
     });
   }
 };

 export const openJobData = ({shipment_status,userid,type,listtype}) => {

   
   
   
  
 
   return (dispatch) => {
 
     //call the API and use the promise to check the response
     // in response callBack .then() call the dispatcher.
     console.log("request..................................................",{shipment_status,userid,type,listtype})
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
       console.log("response.........................................",responseJSON);
 
       dispatch({
         type:OPEN_JOB_API,
         payload: responseJSON
       });
         
      // const loaderHandler = require('react-native-busy-indicator/LoaderHandler').default.default;
       //loaderHandler.hideLoader();
     })
     .catch(e => {
       
       alert('Server not responding');
       dispatch({
         type: SHOW_OPEN_JOB_LOADING,
         payload: false
       });
 
     });
   }
 
 };

 
 export const acceptJobData = ({assign_driver,driverid,_id}) => {

   
   
   
  
 
  return (dispatch) => {

    //call the API and use the promise to check the response
    // in response callBack .then() call the dispatcher.
    console.log("request..................................................",{assign_driver,driverid,_id})
    fetch(APIURLCONSTANTS.ACCEPT_OPEN_JOB_URL , {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({assign_driver,driverid,_id})
    })
    .then( (response) => {
      
      return response.json();
    })
    .then( (responseJSON) => {
      console.log("response open jobs.........................................",responseJSON);

      dispatch({
        type:ACCEPT_OPEN_JOB,
        payload: responseJSON
      });
        
     // const loaderHandler = require('react-native-busy-indicator/LoaderHandler').default.default;
      //loaderHandler.hideLoader();
    })
    .catch(e => {
      
      alert('Server not responding');
      dispatch({
        type: SHOW_OPEN_JOB_LOADING,
        payload: false
      });

    });
  }

};


 export const clearOpenJobsData = () => ({
   type:CLEAR_OPEN_JOB_RECORD
 });


 export const clearAcceptJobData = () => ({
  type:CLEAR_ACCEPT_JOB_RECORD
});
 
 