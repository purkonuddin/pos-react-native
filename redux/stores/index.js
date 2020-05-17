import { createStore, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import promise from "redux-promise-middleware";
import reducers from "../reducers/index";
import { composeWithDevTools} from 'redux-devtools-extension';
const logger = createLogger();
// const enhancers = applyMiddleware(logger, promise);

const store = createStore(reducers, composeWithDevTools(
    applyMiddleware(logger, promise)
));

export default store;