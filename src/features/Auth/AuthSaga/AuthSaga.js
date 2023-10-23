import { call, put, takeLatest } from "redux-saga/effects";
import { loginUser, postAddUser } from "../../../app/Api";
import {
  failAddUser,
  failGetUser,
  successAddUser,
  successGetUser,
} from "../AuthAction";
// import InterCeptor from "./InterCeptor";

export function* postUser({ payload }) {
  try {
    const user = yield call(postAddUser, payload);
    yield put(successAddUser(user.data));
  } catch (error) {
    yield put(failAddUser(error));
  }
}

export function* getUser({ payload }) {
  try {
    const user = yield call(loginUser, payload);
    yield put(successGetUser(user.data));
    sessionStorage.setItem("user",JSON.stringify(user.data))

    // InterCeptor.get("accounts").then((y) => {
    //   console.log(y,"y_data");
    // });

  } catch (error) {
    yield put(failGetUser(error));
  }
}

export function* watchAddUser() {
  yield takeLatest("REQUESTADDUSER", postUser);
  yield takeLatest("REQUESTGETUSER", getUser);
}
