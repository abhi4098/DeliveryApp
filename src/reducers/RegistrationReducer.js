import {
    USERNAME_CHANGED,
    PASSWORD_CHANGED,
    PHONE_CHANGED,
    EMAIL_CHANGED,
    REGISTER_USER,
    SHOW_LOADING_REGISTRATION,
    CLEAR_REGISTRATION_RECORD
} from "../actions/actionTypes";

const INITIAL_STATE = {
    username: '',
    password: '',
    phone:'',
    email:'',
    registerResponseData: '',
    isRegisterLoading: false
}

export default (state = INITIAL_STATE, action) => {

    switch (action.type) {

        case USERNAME_CHANGED:
            return { ...state, username: action.payload }

        case PASSWORD_CHANGED:
            return { ...state, password: action.payload }

            case PHONE_CHANGED:
            return { ...state, phone: action.payload }

            case EMAIL_CHANGED:
            return { ...state, email: action.payload }

            case CLEAR_REGISTRATION_RECORD:
            return {...state,registerResponseData: '', isRegisterLoading:false}
            
        case REGISTER_USER:
            
            return { ...state, registerResponseData: action.payload }

        case SHOW_LOADING_REGISTRATION:
            
            return { ...state, isRegisterLoading: action.payload }

        default:
            return state;

    }

};