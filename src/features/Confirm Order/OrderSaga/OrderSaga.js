import { call, put, takeLatest } from "redux-saga/effects";
import { orderData } from "../../../app/Api";
import { ConfirmOrderFailure, ConfirmOrderSuccess } from "../OrderAction";

export function* setOrderData({ payload }) {
  console.log(payload,"ordersaga--out")
  try {
    const data = yield call(orderData, payload);
    yield put(ConfirmOrderSuccess(data.data));
    console.log(data,"ordersaga--in");
  } catch (error) {
    yield put(ConfirmOrderFailure(error));
  }
}

export function* orderWatcherlist(){
  yield takeLatest("CONFIRMORDERREQUEST",setOrderData)
}
