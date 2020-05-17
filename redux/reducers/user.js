import { ADD_FRIEND, GET_USERS } from '../types';
import AsyncStorage from '@react-native-community/async-storage';

const INITIAL_STATE = {
    loginData:[],
    ajaxError: {},
    usersData:[],
    errMsg: [],
    isPending: false,
    isRejected: false,
    isFulfilled: false, 
}

const friendReducer = (state = INITIAL_STATE, action) => {  
    
    switch (action.type) {
        case "LOGOUT": {
            return {
                ...state,
                isPending: false,
                isRejected: false,
                isFulfilled: false,
                loginData: [],
                errMsg: ''
            };
        }
        case "LOGIN_PENDING":{
            return {
                ...state,
                isPending: true, 
            };
        }
        case "LOGIN_REJECTED":{
            const { response } = action.payload;
            return {
                ...state,
                isPending: false,
                isRejected: true,  
                ajaxError: {
                    status: response.status  
                }
            };
        }
        case "LOGIN_FULFILLED":{
            let {data} = action.payload;
            // console.log('@LOGIN_FULFILLED ',data);
            if (Array.isArray(data)) { 
                AsyncStorage.setItem('TOKEN', data[0].token);
                AsyncStorage.setItem('USER', JSON.stringify(data[0]));
                return {
                    ...state,
                    isPending: false,
                    isRejected: false,
                    isFulfilled: true,
                    loginData: data,
                    errMsg: '',
                };
            }else{
                return {
                    ...state,
                    isPending: false,
                    isRejected: false,
                    isFulfilled: false,
                    loginData: [],
                    errMsg: data
                };
            }
        }
        case 'ADD_FRIEND':{
            const {
                current,
                possible,
              } = state;

            const addedFriend = possible.splice(action.payload, 1);
            // console.log('@add friend : ', addedFriend);
            
            current.push(addedFriend);
            const newState = { current, possible };
            return newState;
        }
        case 'GET_USERS_PENDING':{
            // console.log('get users reducer pending>>',action.payload); 
            return {
                ...state,
                isPending: true,
                isRejected: false, 
            };
        }
        case 'GET_USERS_REJECTED':{
        const { response } = action.payload;
        // console.log('get users reducer rejected>>',action.payload); 
            return {
                ...state,
                isPending: false,
                isRejected: true, 
                errMsg: action.payload,
                ajaxError: {
                    status: response.status  
                }
            };
        }
        case 'GET_USERS_FULFILLED':{
            // console.log('get users reducer fulfilled>>',action.payload); 
            return {
                ...state,
                isPending: false,
                isRejected: false,
                isFulfilled: true,
                usersData: action.payload.data,
            };
        }
        default:
            return state;

    }
}

const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type){
        case 'GET_USERS_PENDING':
            // console.log('get users reducer pending>>',action.payload); 
            return {
                ...state,
                isPending: true,
                isRejected: false, 
            };
        case 'GET_USERS_REJECTED':
            // console.log('get users reducer rejected>>',action.payload); 
            return {
                ...state,
                isPending: false,
                isRejected: true, 
                errMsg: action.payload.data,
            };
        case 'GET_USERS_FULFILLED':
            // console.log('get users reducer fulfilled>>',action.payload); 
            return {
                ...state,
                isPending: false,
                isRejected: false,
                isFulfilled: true,
                usersData: action.payload.data,
            };
        default:
            return state;
    }
}

export default friendReducer;