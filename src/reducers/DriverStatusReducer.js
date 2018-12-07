import {

    DRIVER_STATUS,
    SHOW_DRIVER_STATUS_LOADING,
    CLEAR_DRIVER_STATUS
                                
 } from '../actions/actionTypes';

 const INITIAL_STATE = {
    
    driverStatusResponseData: '',
    isLoading: false
}

export default (state = INITIAL_STATE, action) => {

    switch (action.type) {

  
        case DRIVER_STATUS:
            return { ...state, driverStatusResponseData: action.payload }

        case SHOW_DRIVER_STATUS_LOADING:
            return { ...state, isLoading: action.payload }

            case CLEAR_DRIVER_STATUS:
            return { ...state, driverStatusResponseData: '' }


        default:
            return state;

    }

};