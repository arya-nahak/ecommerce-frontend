// import { configureStore } from '@reduxjs/toolkit';
// import ProductListSlice from '../features/Product List/ProductListSlice';
import { applyMiddleware, combineReducers, createStore } from "redux";
import ProductReducer from "../features/Product List/ProductReducer";
import createSagaMiddleware from "@redux-saga/core";
import RootSaga from "./RootSaga";
import AuthReducer from "../features/Auth/AuthReducer";
import CartReducer from "../features/Cart/CartReducer";
import OrderReducer from "../features/Confirm Order/OrderReducer";

const rootReducer = combineReducers({
  product: ProductReducer,
  userAuth:AuthReducer,
  cart:CartReducer,
  order:OrderReducer,
});

const rootSaga = createSagaMiddleware();

const store = createStore(rootReducer, applyMiddleware(rootSaga));
rootSaga.run(RootSaga);
export default store;
