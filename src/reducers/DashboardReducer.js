import {
    DASHBOARD_API,
    SHOW_DASHBOARD_LOADING,
    DRIVER_STATUS,
    CLEAR_DRIVER_STATUS_RESPONSE,
    
} from "../actions/actionTypes";

const INITIAL_STATE = {

    dasboardResponseData: '',
    driverStatusResData: '',
    isLoading: false
}

export default (state = INITIAL_STATE, action) => {

    switch (action.type) {


        case DASHBOARD_API:
            return { ...state, dasboardResponseData: action.payload }

        case SHOW_DASHBOARD_LOADING:
            return { ...state, isLoading: action.payload }

        case DRIVER_STATUS:
            return { ...state, driverStatusResData: action.payload }

            case CLEAR_DRIVER_STATUS_RESPONSE:
            return { ...state, driverStatusResData:'' }

            


        default:
            return state;

    }

};