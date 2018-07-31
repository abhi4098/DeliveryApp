const BASE_URL='http://brandly.in:5000/';

const APIURLCONSTANTS = {
    LOGIN 								: 		BASE_URL+'users/signin',
    FORGOT_PASSWORD_URL                     :       BASE_URL+'users/forgotPassword',
    REGISTER_USER_URL                     :  BASE_URL+'users/addUser',
    USER_PROFILE_DETAILS                  :  BASE_URL+'users/findUser',
    USER_UPDATE_PASSWORD                  :  BASE_URL+'users/updatePassword',
    USER_UPDATE_PROFILE                    :  BASE_URL+'users/updateProfile'
}
export default APIURLCONSTANTS;