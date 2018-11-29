const BASE_URL='https://nboxitdb.azurewebsites.net/';
const LOCAL_URL = 'http://localhost:5000/';

const APIURLCONSTANTS = {
    LOGIN 								: 		BASE_URL+'users/signin',
    FORGOT_PASSWORD_URL                     :       BASE_URL+'users/forgotPassword',
    REGISTER_USER_URL                     :  BASE_URL+'users/addUser',
    USER_PROFILE_DETAILS                  :  BASE_URL+'users/findUser',
    USER_UPDATE_PASSWORD                  :  BASE_URL+'users/updatePassword',
    USER_UPDATE_PROFILE                    :  BASE_URL+'users/updateProfile',
    OTP_RECEIVE                            : BASE_URL+ 'users/sendClientOtp',
    VERIFY_RECEIVED_OTP                            : BASE_URL+ 'users/verifyUser',
    DASHBOARD_URL                            : BASE_URL+ 'shipments/ShipmentsList/',
    DRIVER_STATUS_URL                            : BASE_URL+ 'users/changedriverStatus',
    ADDRESS_LIST_URL                            : BASE_URL+ 'users/getAddressList',
    ADDRESS_DELETE_URL                            : BASE_URL+ 'users/deleteAddress',
    PIN_MAP_URL                            : BASE_URL+ 'users/addAddress',
    DASHBOARD_COUNT_URL                           : BASE_URL+ 'shipments/getDriverDashboardCounts',
    ACCEPT_OPEN_JOB_URL                           : BASE_URL+ 'shipments/updateShipment',
}

export default APIURLCONSTANTS;