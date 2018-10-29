import {
    SHOW_SAVE_ADDRESS_LOADING,
    SAVE_ADDRESS ,
    CLEAR_SAVE_ADDRESS_RECORD
    
    
} from "../actions/actionTypes";

const INITIAL_STATE = {
  saveAddResponse: '',
   isLoading:false,
  
    
};

export default (state = INITIAL_STATE ,action) => {

    switch (action.type) {

             case SAVE_ADDRESS:
             return {
                 ...state,
                 saveAddResponse: action.payload
             };

             case SHOW_SAVE_ADDRESS_LOADING:
             return {
                 ...state,
                 isLoading: action.payload
             };

             case CLEAR_SAVE_ADDRESS_RECORD:
             return {
                 ...state,
                 saveAddResponse: ''
             };
            


        default:
             return state;
    }
};
