import {
    ADDRESS_LIST,
    SHOW_ADDRESS_LOADING,
    CLEAR_ADDRESS_RECORD,
    DELETE_ADDRESS_RECORD,
    CLEAR_DELETE_ADDRESS_RECORD
    
} from "../actions/actionTypes";

const INITIAL_STATE = {
   addressListResponse: '',
   isLoading:false,
   deleteAddressResponse:''
    
};

export default (state = INITIAL_STATE ,action) => {

    switch (action.type) {

             case ADDRESS_LIST:
             return {
                 ...state,
                 addressListResponse: action.payload
             };

             case SHOW_ADDRESS_LOADING:
             return {
                 ...state,
                 isLoading: action.payload
             };
             case CLEAR_ADDRESS_RECORD:
             return {
                 ...state,
                 addressListResponse: ''
             };

             case DELETE_ADDRESS_RECORD:
             return {
                 ...state,
                 deleteAddressResponse:  action.payload
             };


             case CLEAR_DELETE_ADDRESS_RECORD:
             return {
                 ...state,
                 deleteAddressResponse: ''
             };
             
        default:
             return state;
    }
};
