import { combineReducers } from "redux";
import {SET_LOGIN, SET_ACTIVE_PAGE, SET_LOGOUT} from "./actionTypes"

const initialState = {
    login : false,
    adminAuth : {
        schoolName:null,
        schoolId:null,
        token:null
    },
    activePage:null
}

const generalReducer = (state = initialState , action) => {
    switch(action.type){
        case SET_LOGIN : return {...state, login:true, adminAuth:action.payload}
        case SET_LOGOUT : return {...initialState}
        case SET_ACTIVE_PAGE : return {...state, activePage:action.payload}
        default : return {...state}
    }
}

// root reducer ------------------------------------------------------
const rootReducer = combineReducers({
    generalReducer: generalReducer,
  });
export default rootReducer;