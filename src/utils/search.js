import axios from "react-native-axios";
const resources = {};
const makeRequestCreator = () => {
    let cancel;

    return async query => {
      if (cancel) {
        // Cancel the previous request before making a new request
        cancel.cancel();
      }
      // Create a new CancelToken
      const CancelToken = axios.CancelToken;  
    //   cancel = CancelToken.source();
      try {
        if (resources[query]) {
          // Return result if it exists
          return resources[query];
        }
        const res = await axios(query, { cancelToken: CancelToken });
  
        const result = res.data;
        // Store response
        resources[query] = result;
  
        return result;
      } catch (error) {
        if (axios.isCancel(error)) {
          // Handle if request was cancelled
          console.log('Request canceled', error.message);
        } else {
          // Handle usual errors
          console.log('Something went wrong: ', error.message);
        }
      }
    };
  };

export const search = makeRequestCreator()