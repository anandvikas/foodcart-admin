import {SET_LOGIN, SET_ACTIVE_PAGE, SET_LOGOUT} from "./actionTypes"


export const setLogin = (data) => {
    localStorage.setItem('auth', JSON.stringify({token:data.token}))
    return {
        type : SET_LOGIN,
        payload : data
    }
}

export const setLogout = () => {
    localStorage.removeItem('auth')

    return {
        type : SET_LOGOUT,        
    }
}

export const setActivePage = (data) => {
    return {
        type : SET_ACTIVE_PAGE,
        payload : data
    }
}