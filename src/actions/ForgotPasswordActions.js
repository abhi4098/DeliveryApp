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
    console.log('in loading Forgot Password= '+ value);
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
    console.log("forgot password url---------------", "TO BE IMPLEMENTED")
    console.log('Postdata JSON=' + JSON.stringify({ email }));
    return (dispatch) => {

        fetch(APIURLCONSTANTS.FORGOT_PASSWORD_URL, {

            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email })
        }).then((response) => {
            console.log('recieved forgot passward response', response)
            return response.json();
        }).then((responseJSON) => {
           console.log("JSON response of forgot password api ", responseJSON)

            dispatch({
                type: FORGOT_PASSWORD,
                payload: responseJSON
            });
        }).catch(error => {

            console.log('Error==='+error);
            alert('Server not responding');
            

        });

    }

};