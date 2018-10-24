import {ADDRESS_LIST} from "../actions/actionTypes";

const INITIAL_STATE = {
   addressListResponse: ''
    
};

export default (state = INITIAL_STATE ,action) => {

    switch (action.type) {

             case ADDRESS_LIST:
             return {
                 ...state,
                 addressListResponse: action.payload
             };


        default:
             return state;
    }
};
