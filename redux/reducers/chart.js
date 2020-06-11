import AsyncStorage from '@react-native-community/async-storage';

const INITIAL_STATE = {
    chartData:[],
    chartDataUser:[], 
    ajaxError: [],
    isPending: false,
    isRejected: false,
    isFulfilled: false, 
}

const chartReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "CHART_USER_PENDING":{
            return {
                ...state,
                isPending: true, 
            };
        }
        case "CHART_USER_REJECTED":{
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
        case "CHART_USER_FULFILLED":{ 
            console.log('@CHART_USER_FULFILLED : ',action.payload.data);

                return {
                    ...state,
                    isPending: false,
                    isRejected: false,
                    isFulfilled: true,
                    chartDataUser: action.payload.data
                };
        }
        case "CHART_PENDING":{
            return {
                ...state,
                isPending: true, 
            }; 
        }
        case "CHART_REJECTED":{
            let { response } = action.payload;
            return {
                ...state,
                isPending: false,
                isRejected: true,  
                ajaxError: {
                    status: response.status  
                }
            }; 
        }
        case "CHART_FULFILLED":{ 
            console.log('@CHART_FULFILLED : ',action.payload.data);
            
            return {
                ...state,
                isPending: false,
                isRejected: false,
                isFulfilled: true,
                chartData: action.payload.data 
            }; 
             
        }
        default:
            return state;
    }
}

export default chartReducer;