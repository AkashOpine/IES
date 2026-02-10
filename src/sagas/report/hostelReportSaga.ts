import axios from "axios";
import { call, put, takeEvery } from "redux-saga/effects";
import { apiPost } from "../../config/apiConfig";
import {
  HOSTEL_DEFAULTERS_REPORT,
  HOSTEL_LIST_REPORT,
} from "../../config/BaseUrl";
import {
  setHostelDefaultersReportData,
  setHostelListReportData,
  tryFetchHostelDefaultersReportData,
  tryFetchHostelListReportData,
} from "../../slices/reports/hostelReportSlice";

function* fetchHostelDefaultersReportData(data: any): any {
  try {
    var token = localStorage.getItem("token") as string;
    var bodyFormData = new FormData();
    bodyFormData.append("Authorization", token);
    bodyFormData.append("academic_year", data.payload.year);
    bodyFormData.append("class_id", data.payload.classId);
    bodyFormData.append("division_id", data.payload.divisionId);
    bodyFormData.append("fee_month", data.payload.monthId);
    bodyFormData.append("hostel_type", data.payload.hostel_type);
    let resp: any = yield apiPost(HOSTEL_DEFAULTERS_REPORT, bodyFormData);
    // console.log("response slip", resp);
    if (resp.response.data.status === 200) {
      yield put(setHostelDefaultersReportData(resp.response.data));
    }
  } catch (error) {
    yield put(setHostelDefaultersReportData([]));
    if (axios.isAxiosError(error)) {
      return error.message;
    } else {
      yield put(setHostelDefaultersReportData([]));
      console.log("unexpected error: ", error);
      return "An unexpected error occurred";
    }
  }
}
function* fetchHostelListReportData(data: any): any {
  console.log("hostel data", data.payload);
  try {
    var token = localStorage.getItem("token") as string;
    var bodyFormData = new FormData();
    bodyFormData.append("Authorization", token);
    bodyFormData.append("class_id", data.payload.classId);
    bodyFormData.append("division_id", data.payload.divisionId);
    bodyFormData.append("fee_month", data.payload.monthId);
    bodyFormData.append("hostel_type", data.payload.hostel_type);
    let resp: any = yield apiPost(HOSTEL_LIST_REPORT, bodyFormData);
    console.log("response hostel list ", resp);
    if (resp.response.data.status === 200) {
      yield put(setHostelListReportData(resp.response.data));
    }
  } catch (error) {
    yield put(setHostelListReportData([]));
    if (axios.isAxiosError(error)) {
      return error.message;
    } else {
      yield put(setHostelListReportData([]));
      console.log("unexpected error: ", error);
      return "An unexpected error occurred";
    }
  }
}

export default function* hostelReportSaga() {
  yield takeEvery(
    tryFetchHostelDefaultersReportData,
    fetchHostelDefaultersReportData
  );
  yield takeEvery(tryFetchHostelListReportData, fetchHostelListReportData);
}
