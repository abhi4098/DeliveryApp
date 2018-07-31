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
            console.log('USER_PROFILE action.payload == ' + action.payload);
            return { ...state, profileResponseData: action.payload }

         case UPDATE_PROFILE:
            console.log('UPDATE_PROFILE action.payload == ' + action.payload);
            return { ...state, updateProfileResponseData: action.payload }

        case UPDATE_PASSWORD:
            console.log('UPDATE_PASSWORD action.payload == ' + action.payload);
            return { ...state, updatePasswordResponseData: action.payload }

         case SHOW_UPDATE_PROFILE_LOADING:
            console.log('in loading SHOW_UPDATE_PROFILE_LOADING' + action.payload)
            return { ...state, isLoading: action.payload } 

            case SHOW_PROFILE_LOADING:
            console.log('in loading SHOW_UPDATE_PROFILE_LOADING' + action.payload)
            return { ...state, isLoading: action.payload }

            case SHOW_UPDATE_PASSWORD_LOADING:
            console.log('in loading SHOW_UPDATE_PASSWORD_LOADING' + action.payload)
            return { ...state, isLoading: action.payload }

        default:
            return state;

    }

};