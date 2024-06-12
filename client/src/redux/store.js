import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./rootSlice";

const reducer = combineReducers({
  root: rootReducer,
});

const store = configureStore({
  reducer,
});

export default store;
