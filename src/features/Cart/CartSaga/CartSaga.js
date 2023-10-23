import { call, put, takeLatest } from "redux-saga/effects";
import {
  cartData,
  cartDataByUser,
  cartDataDelete,
  cartDataUpdate,
} from "../../../app/Api";
import {
  getCartFailure,
  getCartFailureByuser,
  getCartFailureCartDelete,
  getCartFailureDelete,
  getCartFailureUpdate,
  getCartSuccess,
  getCartSuccessByuser,
  getCartSuccessCartDelete,
  getCartSuccessDelete,
  getCartSuccessUpdate,
} from "../CartAction";

export function* getCartData({ payload }) {
  // console.log(payload,"cartSaga--out");
  try {
    const data = yield call(cartData, payload);
    yield put(getCartSuccess(data.data));
    // console.log(payload,"cartSaga--in");
  } catch (error) {
    yield put(getCartFailure(error));
  }
}

export function* getCartDataByUser({ payload }) {
  // console.log(payload,"cartSaga--outt");
  try {
    const cartData = yield call(cartDataByUser, payload);
    yield put(getCartSuccessByuser(cartData.data));
    // console.log(cartData.data,"cartSaga--inn");
  } catch (error) {
    yield put(getCartFailureByuser(error));
  }
}

export function* getCartDataUpdate({ payload }) {
  try {
    const data = yield call(cartDataUpdate, payload);
    yield put(getCartSuccessUpdate(data.data));
  } catch (error) {
    yield put(getCartFailureUpdate(error));
  }
}

export function* getCartSelectedDataDelete({ payload }) {
  console.log(payload, "cartSaga--out");
  try {
    const data = yield call(cartDataDelete, payload.id);
    console.log(data.data, "cartSaga--in");
    yield put(getCartSuccessDelete(data.data));
  } catch (error) {
    yield put(getCartFailureDelete(error));
  }
}

export function* getCartSelectedUserDataDelete({ payload }) {
    console.log(payload,"cart saga check");
    try {
        const getData = yield getCartDataByUser({payload:`?user=${payload}`});
        const items = getData.data;
        console.log(getData,"cart saga check getData data");
    for (let item of items) {
      yield getCartSelectedDataDelete({payload:item.id});
    }
    yield put(getCartSuccessCartDelete({status:"success"}))
  } catch (error) {
    yield put(getCartFailureCartDelete(error))
  }
}

export function* watchCartList() {
  yield takeLatest("GETCARTREQUEST", getCartData);
  yield takeLatest("GETCARTREQUESTBYUSER", getCartDataByUser);
  yield takeLatest("GETCARTREQUESTUPDATE", getCartDataUpdate);
  yield takeLatest("GETCARTREQUESTDELETE", getCartSelectedDataDelete);
  yield takeLatest("GETCARTREQUESTCARTDELETE", getCartSelectedUserDataDelete);
}