import { createStore, applyMiddleware, combineReducers } from "redux";
import promiseMiddleware from "redux-promise-middleware";
import thunk from "redux-thunk";
import logger from "redux-logger";

const middleware = applyMiddleware(thunk, promiseMiddleware(), logger);

const connection = (state = { connected: false, user: null }, action) => {
  switch (action.type) {
    case "CONNECTION_PENDING":
      return { connected: false, user: null };
    case "CONNECTION_FULFILLED":
      return { connected: true, user: action.payload };
    default:
      return state;
  }
};

const channels = (state = { loading: false, channels: [] }, action) => {
  switch (action.type) {
    case "FETCH_CHANNELS_PENDING":
      return {
        loading: true,
        channels: []
      };
    case "FETCH_CHANNELS_FULFILLED":
      const newObj = Object.assign(
        {},
        ...action.payload.map(a => ({ [a.url]: a }))
      );
      const defaultObj = action.payload.map(a => a.url)[0];
      return { loading: false, channels: newObj, selected: defaultObj };
    case "CREATE_CHANNEL_FULFILLED":
      return {
        ...state,
        channels: Object.assign(
          { [action.payload.url]: action.payload },
          state.channels
        )
      };
    case "SELECT_CHANNEL":
      return { ...state, selected: action.channel };
    default:
      return state;
  }
};

const reducers = combineReducers({
  connection,
  channels
});

export default createStore(reducers, middleware);
