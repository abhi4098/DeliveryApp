import {
    USERNAME_CHANGED,
    PASSWORD_CHANGED,
    LOGIN_USER,
    SHOW_LOADING,
    CLEAR_LOGIN_RECORD
} from "../actions/actionTypes";

const INITIAL_STATE = {
    username: '',
    password: '',
    loginResponseData: '',
    isLoading: false
}

export default (state = INITIAL_STATE, action) => {

    switch (action.type) {

        case USERNAME_CHANGED:
            return { ...state, username: action.payload }

        case PASSWORD_CHANGED:
            return { ...state, password: action.payload }

            case CLEAR_LOGIN_RECORD:
            return {...state,loginResponseData: '', isLoading:false}
            
        case LOGIN_USER:
            
            return { ...state, loginResponseData: action.payload }

        case SHOW_LOADING:
            
            return { ...state, isLoading: action.payload }

        default:
            return state;

    }

};