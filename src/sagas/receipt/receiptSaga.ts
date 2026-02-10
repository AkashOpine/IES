import axios from "axios";
import { call, put, takeEvery } from "redux-saga/effects";
import { apiPost } from "../../config/apiConfig";
import { GENERATE_SLIP, PRE_REGISTRATION_LIST } from "../../config/BaseUrl";

import {
  setPreBookingTableData,
  setReceiptData,
  tryFetchPreBookingTableData,
  tryFetchReceiptData,
} from "../../slices/receipt/receiptSlice";

function* fetchReceiptData(data: any): any {
  try {
    var token = localStorage.getItem("token") as string;
    var bodyFormData = new FormData();
    bodyFormData.append("Authorization", token);
    bodyFormData.append("slip_id", data.payload.data);
    bodyFormData.append("academic_year", data.payload.academicYear);
    let resp: any = yield apiPost(GENERATE_SLIP, bodyFormData);
    console.log("response slip", resp);
    if (resp.response.data.status === 200) {
      yield put(setReceiptData(resp.response.data.data.Details));
      // data.payload.history("/receipt");
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.message;
    } else {
      console.log("unexpected error: ", error);
      return "An unexpected error occurred";
    }
  }
}
function* fetchPreBookingTableData(data?: any): any {
  try {
    var token = localStorage.getItem("token") as string;
    var bodyFormData = new FormData();
    bodyFormData.append("Authorization", token);
    let resp: any = yield apiPost(PRE_REGISTRATION_LIST, bodyFormData);
    console.log("pre data", resp);
    yield put(setPreBookingTableData(resp.response.data.data));
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.message;
    } else {
      console.log("unexpected error: ", error);
      return "An unexpected error occurred";
    }
  }
}
export default function* receiptSaga() {
  yield takeEvery(tryFetchReceiptData, fetchReceiptData);
  yield takeEvery(tryFetchPreBookingTableData, fetchPreBookingTableData);
}
