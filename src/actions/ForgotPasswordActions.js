import { 
        FORGOT_PASSWORD,
        EMAIL_CHANGED,
        SHOW_LOADING_FORGOT_PASSWORD,
        CLEAR_FORGOT_RESPONSE_RECORD

     } from "./actionTypes";
import APIURLCONSTANTS from "../ApiUrlList";


export const emailChanged = (email) => {
    return{
          type: EMAIL_CHANGED,
          payload: email
    };
};

export const showForgotPasswordLoading =(value)=>{
    
    return (dispatch) => {
      dispatch({
        type: SHOW_LOADING_FORGOT_PASSWORD,
        payload: value
      });
    }
  };
  
  export const clearForgotResponseRecord = () => ({
    type:CLEAR_FORGOT_RESPONSE_RECORD
  });

export const forgotPassword = ({email }) => {
    
    
    return (dispatch) => {

        fetch(APIURLCONSTANTS.FORGOT_PASSWORD_URL, {

            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email })
        }).then((response) => {
            
            return response.json();
        }).then((responseJSON) => {
           

            dispatch({
                type: FORGOT_PASSWORD,
                payload: responseJSON
            });
        }).catch(error => {

            
            alert('Server not responding');
            

        });

    }

};