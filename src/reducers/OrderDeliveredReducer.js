import {
    ORDER_DELIVERED_API,
    SHOW_ORDER_DELIVER_LOADING,
    CLEAR_LIST_DATA_RECORD
} from "../actions/actionTypes";

const INITIAL_STATE = {

    orderDeliveredResponseData: '',
    isLoading: false
}

export default (state = INITIAL_STATE, action) => {

    switch (action.type) {


        case ORDER_DELIVERED_API:
            return { ...state, orderDeliveredResponseData: action.payload }

        case SHOW_ORDER_DELIVER_LOADING:
            return { ...state, isLoading: action.payload }


            case CLEAR_LIST_DATA_RECORD:
            return { ...state, orderDeliveredResponseData: '' }


        default:
            return state;

    }

};