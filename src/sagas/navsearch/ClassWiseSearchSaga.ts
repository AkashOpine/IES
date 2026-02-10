import axios from "axios";
import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import { apiPost } from "../../config/apiConfig";
import {
  AUTOCOMPLTE_SEARCH,
  CLASS_WISE_STUDENT_LIST_UPDATED,
  CONSOLIDATED_PAYMENT_HISTORY_SEARCH,
  FEE_HISTORY,
  STUDENT_LIST,
} from "../../config/BaseUrl";
import {
  tryFetchClassSearchList,
  setClassSearchList,
  setStudentSearch,
  tryFetchStudentSearchList,
  tryFetchAutoCompleteSearch,
  setAutoCompleteSearcgResult,
  tryFetchNewAutoCompleteSearch,
  setNewAutoCompleteSearchResult,
} from "../../slices/navsearch/ClassWiseSearchSlice";

function* fetchClassWiseSearchData(data: any): any {
  try {
    var token = localStorage.getItem("token") as string;
    var bodyFormData = new FormData();
    bodyFormData.append("Authorization", token);
    bodyFormData.append("class_id", data.payload.classSearch);
    bodyFormData.append("division_id", data.payload.divisionSearch);
    bodyFormData.append("academic_year", data.payload.year);
    let resp: any = yield apiPost(
      CLASS_WISE_STUDENT_LIST_UPDATED,
      bodyFormData
    );
    if (resp.response.data.status == 200) {
      yield put(setClassSearchList(resp.response.data.data));
    }
    if (
      resp.response.data.status == 500 &&
      resp.response.data.status_message == "Not Found"
    ) {
      yield put(setClassSearchList([]));
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("error message: ", error.message);
      return error.message;
    } else {
      console.log("unexpected error: ", error);
      return "An unexpected error occurred";
    }
  }
}

function* fetchFeeHistoryData(data: any): any {
  console.log("data academic yearasd", data);
  try {
    var token = localStorage.getItem("token") as string;
    var bodyFormData = new FormData();
    bodyFormData.append("Authorization", token);
    bodyFormData.append("academic_year", data.payload.academicYear);
    bodyFormData.append("student_id", data.payload.studentId);
    let resp: any = yield apiPost(FEE_HISTORY, bodyFormData);
    if (resp.response.data.status == 200) {
      yield put(setStudentSearch(resp.response.data.data));
    }
    if (
      resp.response.data.status == 500 &&
      resp.response.data.status_message == "Not Found"
    ) {
      yield put(setStudentSearch([]));
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("error message: ", error.message);
      return error.message;
    } else {
      console.log("unexpected error: ", error);
      return "An unexpected error occurred";
    }
  }
}
function* fetchAutoCompleteSearchData(data: any): any {
  try {
    var token = localStorage.getItem("token") as string;
    var bodyFormData = new FormData();
    console.log("data.payload", data.payload);

    bodyFormData.append("Authorization", token);
    bodyFormData.append("username", data.payload.id);
    bodyFormData.append("academic_year", data.payload.year);
    let resp: any = yield apiPost(AUTOCOMPLTE_SEARCH, bodyFormData);
    if (resp.response.data.status == 200) {
      yield put(setAutoCompleteSearcgResult(resp.response.data.data));
    }
    if (
      resp.response.data.status == 500 &&
      resp.response.data.status_message == "Not Found"
    ) {
      yield put(setAutoCompleteSearcgResult([]));
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      yield put(setAutoCompleteSearcgResult([]));
      console.log("error message: ", error.message);
      return error.message;
    } else {
      yield put(setAutoCompleteSearcgResult([]));
      console.log("unexpected error: ", error);
      return "An unexpected error occurred";
    }
  }
}
function* fetchNewAutoCompleteSearchData(data: any): any {
  try {
    var token = localStorage.getItem("token") as string;
    var bodyFormData = new FormData();
    console.log("data.payload", data.payload);

    bodyFormData.append("Authorization", token);
    bodyFormData.append("username", data.payload.username);
    bodyFormData.append("academic_year", data.payload.academicYear);
    let resp: any = yield apiPost(
      CONSOLIDATED_PAYMENT_HISTORY_SEARCH,
      bodyFormData
    );
    if (resp.response.data.status == 200) {
      yield put(setNewAutoCompleteSearchResult(resp.response.data.data));
    }
    if (
      resp.response.data.status == 500 &&
      resp.response.data.status_message == "Not Found"
    ) {
      yield put(setNewAutoCompleteSearchResult([]));
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      yield put(setNewAutoCompleteSearchResult([]));
      console.log("error message: ", error.message);
      return error.message;
    } else {
      yield put(setNewAutoCompleteSearchResult([]));
      console.log("unexpected error: ", error);
      return "An unexpected error occurred";
    }
  }
}
export default function* classWiseSearchSaga() {
  yield takeEvery(tryFetchClassSearchList, fetchClassWiseSearchData);
  yield takeEvery(tryFetchStudentSearchList, fetchFeeHistoryData);
  yield takeLatest(tryFetchAutoCompleteSearch, fetchAutoCompleteSearchData);
  yield takeLatest(
    tryFetchNewAutoCompleteSearch,
    fetchNewAutoCompleteSearchData
  );
}
