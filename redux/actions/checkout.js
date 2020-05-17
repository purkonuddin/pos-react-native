import Axios from "react-native-axios";
import { REACT_APP_URL_STRING } from 'react-native-dotenv';

// export const checkout = (bodyFormData, idUser, number) => {
//   return {
//     type: "CHECKOUT_ORDER",
//     payload: Axios.post(
//       `http://localhost:8080/api/order/order/${idUser}/${number}`,
//       bodyFormData,
//       {
//         headers: {
//           "content-type": "application/x-www-form-urlencoded;charset=utf-8",
//           "x-access-token": localStorage.usertoken
//         }
//       }
//     )
//   };
// };
export const checkout = (bodyFormData, idUser, number) => {
  return {
    type: "CHECKOUT_ORDER",
    payload: Axios.post(
      `${REACT_APP_URL_STRING}order/order/${idUser}/${number}`, bodyFormData, {
        headers: {
          "content-type": "application/x-www-form-urlencoded;charset=utf-8",
          "x-access-token": 'localStorage.usertoken'
        }
      }
    )
  };
};

// export const getCheckout = no_transaction => {
//   return {
//     type: "GET_CHECKOUT",
//     payload: Axios.get(
//       `http://localhost:8080/api/order/${no_transaction}`,
//       {
//         headers: { "x-access-token": localStorage.usertoken }
//       }
//     )
//   };
// }; 
export const getCheckout = no_transaction => {
  return {
    type: "GET_CHECKOUT",
    payload: Axios.get(
      `${REACT_APP_URL_STRING}order/${no_transaction}`,
      {
        headers: { "x-access-token": 'localStorage.usertoken' }
      }
    )
  };
};  