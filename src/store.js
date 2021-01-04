import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { settingsReducer } from "./reducers/settingsReducer";
import { groupsReducer } from "./reducers/groupsReducer";
import { authReducer } from "./reducers/authReducer";

const reducer = combineReducers({
  settings: settingsReducer,
  groups: groupsReducer,
  auth: authReducer
});

const middleware = [thunk];
const initialState = {};

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
