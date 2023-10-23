import { all } from "redux-saga/effects";
import { watchProductList } from "../features/Product List/Product Saga/ProductSaga";
import { watchAddUser } from "../features/Auth/AuthSaga/AuthSaga";
import { watchCartList } from "../features/Cart/CartSaga/CartSaga";
import { orderWatcherlist } from "../features/Confirm Order/OrderSaga/OrderSaga";

export default function* RootSaga() {
  yield all([watchProductList(), watchAddUser(),watchCartList(),orderWatcherlist()]);
}
