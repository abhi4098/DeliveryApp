import {ADDRESS_LIST,SHOW_ADDRESS_LOADING} from "../actions/actionTypes";

const INITIAL_STATE = {
   addressListResponse: '',
   isLoading:false,
    
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


        default:
             return state;
    }
};
