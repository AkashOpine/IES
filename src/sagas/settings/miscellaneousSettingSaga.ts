import { call, put, takeEvery } from "redux-saga/effects";
import axios from "axios";
import { apiPost } from "../../config/apiConfig";
import Moment from "moment";

import {
  GENERATE_MISCELLANEOUS_COLLECTION_RECEIPT,
  MISCELLANEOUS_SETTING_LIST,
} from "../../config/BaseUrl";
import {
  setMiscellaneousSettingList,
  setReceiptData,
  tryFetchMiscellaneousSettingList,
  tryGenerateReceipt,
} from "../../slices/settings/miscellaneousSettingSlice";
function* fetchMiscellaneousSettingListData(): any {
  try {
    var token = localStorage.getItem("token") as string;
    var bodyFormData = new FormData();
    bodyFormData.append("Authorization", token);
    let resp: any = yield apiPost(MISCELLANEOUS_SETTING_LIST, bodyFormData);
    console.log("miscellaneous setting", resp);
    yield put(setMiscellaneousSettingList(resp.response.data.data));
  } catch (error) {
    yield put(setMiscellaneousSettingList([]));
    if (axios.isAxiosError(error)) {
      return error.message;
    } else {
      yield put(setMiscellaneousSettingList([]));
      console.log("unexpected error: ", error);
      return "An unexpected error occurred";
    }
  }
}
function* fetchMiscellaneousReceiptData(data: any): any {
  console.log("data receipt", data);
  try {
    var token = localStorage.getItem("token") as string;
    var bodyFormData = new FormData();
    bodyFormData.append("Authorization", token);
    bodyFormData.append("receipt_no", data.payload);
    let resp: any = yield apiPost(
      GENERATE_MISCELLANEOUS_COLLECTION_RECEIPT,
      bodyFormData
    );
    console.log("miscellaneous receipt data", resp);
    yield put(setReceiptData(resp.response.data.data));
  } catch (error) {
    yield put(setReceiptData({}));
    if (axios.isAxiosError(error)) {
      return error.message;
    } else {
      yield put(setReceiptData({}));
      console.log("unexpected error: ", error);
      return "An unexpected error occurred";
    }
  }
}
export default function* miscellaneousSettingSaga() {
  yield takeEvery(
    tryFetchMiscellaneousSettingList,
    fetchMiscellaneousSettingListData
  );
  yield takeEvery(tryGenerateReceipt, fetchMiscellaneousReceiptData);
}
