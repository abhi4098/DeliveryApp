import {
    USER_PROFILE,
    UPDATE_PASSWORD,
    UPDATE_PROFILE,
    SHOW_UPDATE_PROFILE_LOADING,
    SHOW_UPDATE_PASSWORD_LOADING,
    SHOW_PROFILE_LOADING
} from "../actions/actionTypes";

const INITIAL_STATE = {
    profileResponseData: '',
    updateProfileResponseData: '',
    updatePasswordResponseData: '',
    isLoading: false
}

export default (state = INITIAL_STATE, action) => {

    switch (action.type) {

        case USER_PROFILE:
            
            return { ...state, profileResponseData: action.payload }

         case UPDATE_PROFILE:
            
            return { ...state, updateProfileResponseData: action.payload }

        case UPDATE_PASSWORD:
            
            return { ...state, updatePasswordResponseData: action.payload }

         case SHOW_UPDATE_PROFILE_LOADING:
            
            return { ...state, isLoading: action.payload } 

            case SHOW_PROFILE_LOADING:
            
            return { ...state, isLoading: action.payload }

            case SHOW_UPDATE_PASSWORD_LOADING:
            
            return { ...state, isLoading: action.payload }

        default:
            return state;

    }

};