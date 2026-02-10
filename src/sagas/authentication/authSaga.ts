import { call, put, takeEvery } from "redux-saga/effects";
import {
  setInvalidLogin,
  setUser,
  tryPasswordReset,
  tryUserLogin,
  tryUserLogOut,
} from "../../slices/authentication/authSlice";
import { FORGOT_PASSWORD_MAIL_SEND, LOGIN } from "../../config/BaseUrl";
import axios from "axios";
import { apiPost } from "../../config/apiConfig";

import Moment from "moment";
function* userLogin(data: any): any {
  try {
    var bodyFormData = new FormData();
    bodyFormData.append("username", data.payload.data.username);
    bodyFormData.append("password", data.payload.data.password);
    let resp: any = yield apiPost(LOGIN, bodyFormData);
    console.log("logion", resp);
    if (
      resp.response?.data.status === 200 &&
      resp.response?.data.status_message === "Login Success"
    ) {
      localStorage.setItem("token", resp.response.data.data.token);
      localStorage.setItem("year", resp.response.data.data.academic_year);
      localStorage.setItem("expires", resp.response.data.data.expire);
      localStorage.setItem("roleId", resp.response.data.data.role_id);
      localStorage.setItem("roleName", resp.response.data.data.role_name);
      if (resp.response.data.data.only_reports) {
        localStorage.setItem(
          "only_reports",
          resp.response.data.data.only_reports
        );
      }

      localStorage.setItem(
        "expireTime",
        Date.now() + resp.response.data.data.expire_time
      );
      yield put(setUser(resp.response.data.data));

      data.payload.navigate("/home");
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.message;
    } else {
      console.log("unexpected error: ", error);
      return yield put(setInvalidLogin("Incorrect username or password"));
    }
  }
}
function* resetPasswordSendEmail(data: any): any {
  try {
    var bodyFormData = new FormData();
    bodyFormData.append("email", data.payload.data.email);
    let resp: any = yield apiPost(FORGOT_PASSWORD_MAIL_SEND, bodyFormData);
    console.log("FORGOT PASSWORD", resp);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.message;
    } else {
      console.log("unexpected error: ", error);
      return "unexpected error";
    }
  }
}
function* userLogOut(data: { payload: { navigate: (arg0: string) => void } }) {
  localStorage.clear();
  data.payload.navigate("/");
}
export default function* authSaga() {
  yield takeEvery(tryUserLogin, userLogin);
  yield takeEvery(tryUserLogOut, userLogOut);
  yield takeEvery(tryPasswordReset, resetPasswordSendEmail);
}
