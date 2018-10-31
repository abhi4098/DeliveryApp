import { combineReducers } from 'redux';

import MyAddressReducer from "./MyAddressReducer";
import LoginReducer from "./LoginReducer";
import ForgotPasswordReducer from "./ForgotPasswordReducer";
import RegistrationReducer from "./RegistrationReducer";
import ProfileReducer from './ProfileReducer';
import OtpReceiveReducer from './OtpReceiveReducer';
import VerifyOtpReducer from './VerifyOtpReducer';
import DashboardReducer from './DashboardReducer';
import DriverStatusReducer from './DriverStatusReducer';
import MapScreenReducer from './MapScreenReducer';
import OrderDeliveredReducer from './OrderDeliveredReducer';


export default combineReducers({
  address: MyAddressReducer,
  login: LoginReducer,
  forgot: ForgotPasswordReducer,
  register: RegistrationReducer,
  profile: ProfileReducer,
  otpReceive: OtpReceiveReducer,
  verifyReceivedOtp:VerifyOtpReducer,
  dashboardReducer: DashboardReducer,
  driverStatusReducer:DriverStatusReducer,
  mapScreenReducer:MapScreenReducer,
  orderDeliveredReducer:OrderDeliveredReducer
});