import { combineReducers } from 'redux';

import MyAddressReducer from "./MyAddressReducer";
import LoginReducer from "./LoginReducer";
import ForgotPasswordReducer from "./ForgotPasswordReducer";
import RegistrationReducer from "./RegistrationReducer";
import ProfileReducer from './ProfileReducer';
import OtpReceiveReducer from './OtpReceiveReducer';
import VerifyOtpReducer from './VerifyOtpReducer';
import DashboardReducer from './DashboardReducer';


export default combineReducers({
  places: MyAddressReducer,
  login: LoginReducer,
  forgot: ForgotPasswordReducer,
  register: RegistrationReducer,
  profile: ProfileReducer,
  otpReceive: OtpReceiveReducer,
  verifyReceivedOtp:VerifyOtpReducer,
  dashboardReducer: DashboardReducer

});