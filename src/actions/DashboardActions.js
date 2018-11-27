import {

     DASHBOARD_API,
     SHOW_DASHBOARD_LOADING,
     DRIVER_STATUS,
     CLEAR_DRIVER_STATUS_RESPONSE,
     DASHBOARD_COUNT,
     
                                 
  } from './actionTypes';
import APIURLCONSTANTS from "../ApiUrlList";

export const showDashBoardLoading =(value)=>{
    //
    return (dispatch) => {
      dispatch({
        type: SHOW_DASHBOARD_LOADING,
        payload: value
      });
    }
  };

  export const dashboardData = ({shipment_status,userid,type}) => {

    
    
    
   
  
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
        console.log("response json.................................." ,responseJSON);
  
        dispatch({
          type:DASHBOARD_API,
          payload: responseJSON
        });
          
       // const loaderHandler = require('react-native-busy-indicator/LoaderHandler').default.default;
        //loaderHandler.hideLoader();
      })
      .catch(e => {
        
        alert('Server not responding');
        dispatch({
          type: SHOW_DASHBOARD_LOADING,
          payload: false
        });
  
      });
    }
  
  };


  export const dashboardCounts = ({id}) => {

    
    return (dispatch) => {
  
      //call the API and use the promise to check the response
      // in response callBack .then() call the dispatcher.
        console.log("request.............................................",APIURLCONSTANTS.DASHBOARD_COUNT_URL+'/'+id)
        console.log("request.............................................",{id})
      fetch(APIURLCONSTANTS.DASHBOARD_COUNT_URL+'/'+id , {
        method: 'GET',
        // headers: {
        //   'Accept': 'application/json',
        //   'Content-Type': 'application/json',
        // },
        //body: JSON.stringify({id})
      })
      .then( (response) => {
        
        return response.json();
      })
      .then( (responseJSON) => {
        console.log("response json.................................." ,responseJSON);
  
        dispatch({
          type:DASHBOARD_COUNT,
          payload: responseJSON
        });
          
      
      })
      .catch(e => {
        console.log("error....................................",e)
        alert('Server not responding');
        dispatch({
          type: SHOW_DASHBOARD_LOADING,
          payload: false
        });
  
      });
    }
  
  };


  export const driverStatusCallFromDashboard = ({driverid,dutystatus}) => {

    
    
    console.log("driverStatusCallFromDashboard..............................." ,{driverid,dutystatus})
   
  
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
        console.log("............................................."  ,responseJSON)
  
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
          type: SHOW_DASHBOARD_LOADING,
          payload: false
        });
  
      });
    }
  
  };
  export const clearDriverStatusResponseRecord = () => ({
    type:CLEAR_DRIVER_STATUS_RESPONSE
  });

  
  