import { combineReducers } from 'redux';

import MyAddressReducer from "./MyAddressReducer";
import LoginReducer from "./LoginReducer";
import ForgotPasswordReducer from "./ForgotPasswordReducer";
import RegistrationReducer from "./RegistrationReducer";
import ProfileReducer from './ProfileReducer';
import OtpReceiveReducer from './OtpReceiveReducer';


export default combineReducers({
  places: MyAddressReducer,
  login: LoginReducer,
  forgot: ForgotPasswordReducer,
  register: RegistrationReducer,
  profile: ProfileReducer,
  otpReceive: OtpReceiveReducer
});