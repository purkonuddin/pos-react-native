import { REACT_APP_URL_STRING } from 'react-native-dotenv';
import Axios from 'react-native-axios'; 

export const getChartUser = (val) => ({
    type: 'CHART_USER',
    payload: Axios.get(`${REACT_APP_URL_STRING}chart/user?id=${val}`, {
        headers: { 
            'Accept': 'application/json',
            'Content-Type': 'application/json', 
        }
    })
});

export const getCharts = () => ({
    type: 'CHART',
    payload: Axios.get(`${REACT_APP_URL_STRING}chart/all_users`, {
        headers: { 
            'Accept': 'application/json',
            'Content-Type': 'application/json', 
        }
    })
});