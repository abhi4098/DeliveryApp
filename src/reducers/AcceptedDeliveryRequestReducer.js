import {
    OPEN_ACCEPTED_DELIVERY_API,
    SHOW_ACCEPTED_DELIVERY_LOADING,
    CLEAR_ACCEPTED_DELIVERY_RECORD,
    

} from "../actions/actionTypes";

const INITIAL_STATE = {

    acceptedDeliveryResponse: '',
    isLoading: false,
  
}

export default (state = INITIAL_STATE, action) => {

    switch (action.type) {


        case OPEN_ACCEPTED_DELIVERY_API:
            return { ...state, acceptedDeliveryResponse: action.payload }

        case SHOW_ACCEPTED_DELIVERY_LOADING:
            return { ...state, isLoading: action.payload }


        case CLEAR_ACCEPTED_DELIVERY_RECORD:
            return { ...state, acceptedDeliveryResponse: '' }

      

        default:
            return state;

    }

};