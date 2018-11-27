import {
    DASHBOARD_API,
    SHOW_DASHBOARD_LOADING,
    DRIVER_STATUS,
    CLEAR_DRIVER_STATUS_RESPONSE,
    DASHBOARD_COUNT
    
} from "../actions/actionTypes";

const INITIAL_STATE = {
    dashboardCountResponse: '',
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

            case DASHBOARD_COUNT:
            console.log("dashboard reducer.................................................")
            return { ...state, dashboardCountResponse: action.payload }



        default:
            return state;

    }

};