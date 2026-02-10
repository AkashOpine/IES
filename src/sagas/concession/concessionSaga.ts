import { call, put, takeEvery } from "redux-saga/effects";
import axios from "axios";
import { apiPost } from "../../config/apiConfig";
import { CONCESSION_LIST, STUDENT_CONCESSION_LIST } from "../../config/BaseUrl";
import {
  setConcessionListData,
  setSpecialConcessionData,
  tryFetchConcessionListData,
  tryFetchSpecialConcessionData,
} from "../../slices/concession/concessionSlice";
function* fetchConcessionListData(): any {
  try {
    var token = localStorage.getItem("token") as string;
    var bodyFormData = new FormData();
    bodyFormData.append("Authorization", token);
    let resp: any = yield apiPost(STUDENT_CONCESSION_LIST, bodyFormData);
    yield put(setConcessionListData(resp.response.data));
  } catch (error) {
    yield put(setConcessionListData([]));
    if (axios.isAxiosError(error)) {
      return error.message;
    } else {
      yield put(setConcessionListData([]));
      console.log("unexpected error: ", error);
      return "An unexpected error occurred";
    }
  }
}
function* fetchSpecialConcessionData(data: any): any {
  try {
    var token = localStorage.getItem("token") as string;
    var bodyFormData = new FormData();
    bodyFormData.append("Authorization", token);
    bodyFormData.append("academic_year", data.payload.year);
    bodyFormData.append("student_id", data.payload.id);
    let resp: any = yield apiPost(CONCESSION_LIST, bodyFormData);
    yield put(setSpecialConcessionData(resp.response.data));
  } catch (error) {
    yield put(setSpecialConcessionData([]));
    if (axios.isAxiosError(error)) {
      return error.message;
    } else {
      yield put(setSpecialConcessionData([]));
      console.log("unexpected error: ", error);
      return "An unexpected error occurred";
    }
  }
}

export default function* concessionSaga() {
  yield takeEvery(tryFetchConcessionListData, fetchConcessionListData);
  yield takeEvery(tryFetchSpecialConcessionData, fetchSpecialConcessionData);
}
