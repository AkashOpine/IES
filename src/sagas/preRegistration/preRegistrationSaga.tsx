import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";
import { apiPost } from "../../config/apiConfig";
import {
  ADMISSION_REPORT,
  PRE_REGISTRATION_REPORT,
  PRE_REGISTRATION_STUDENT_REPORT,
} from "../../config/BaseUrl";
import {
  SetPreRegistrationReport,
  SetAdmissionFeeReport,
  tryFetchAdmissionFeeReport,
  tryFetchPreRegistrationReport,
  tryFetchStudentPaymentTypeReport,
  SetStudentPaymentTypeReport,
} from "../../slices/preRegistration/preRegistrationSlice";
function* fetchPreRegistrationReport(data: any): any {
  try {
    var token = localStorage.getItem("token") as string;
    var bodyFormData = new FormData();
    console.log("data.payload", data.payload);
    bodyFormData.append("Authorization", token);
    bodyFormData.append("academic_year", data.payload.year);
    bodyFormData.append("from_date", data.payload.fromDate);
    bodyFormData.append("to_date", data.payload.toDate);
    bodyFormData.append("class_id", data.payload.class);
    let resp: any = yield apiPost(PRE_REGISTRATION_REPORT, bodyFormData);
    if (resp.response.data.status === 200) {
      console.log("pre report ecxcel", resp);

      yield put(SetPreRegistrationReport(resp.response.data));
    }
    // if (
    //   resp.response.data.status == 500 &&
    //   resp.response.data.status_message == "Not Found"
    // ) {
    //   yield put(SetPreRegistrationReport([]));
    // }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      yield put(SetPreRegistrationReport([]));
      console.log("error message: ", error.message);
      return error.message;
    } else {
      yield put(SetPreRegistrationReport([]));
      console.log("unexpected error: ", error);
      return "An unexpected error occurred";
    }
  }
}
function* fetchStudentPaymentTypeReport(data: any): any {
  try {
    var token = localStorage.getItem("token") as string;
    var bodyFormData = new FormData();

    bodyFormData.append("Authorization", token);
    bodyFormData.append("academic_year", data.payload.year);
    bodyFormData.append("from_date", data.payload.fromDate);
    bodyFormData.append("to_date", data.payload.toDate);
    bodyFormData.append("payment_type", data.payload.payment_type);
    let resp: any = yield apiPost(
      PRE_REGISTRATION_STUDENT_REPORT,
      bodyFormData
    );
    if (resp.response.data.status === 200) {
      console.log("data.resp payment type", resp.response.data);
      yield put(SetStudentPaymentTypeReport(resp.response.data.data));
    }
    // if (
    //   resp.response.data.status == 500 &&
    //   resp.response.data.status_message == "Not Found"
    // ) {
    //   yield put(SetStudentPaymentTypeReport([]));
    // }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      yield put(SetStudentPaymentTypeReport([]));
      console.log("error message: ", error.message);
      return error.message;
    } else {
      yield put(SetStudentPaymentTypeReport([]));
      console.log("unexpected error: ", error);
      return "An unexpected error occurred";
    }
  }
}
function* fetchAdmissionFeeReport(data: any): any {
  try {
    var token = localStorage.getItem("token") as string;
    var bodyFormData = new FormData();
    bodyFormData.append("Authorization", token);
    bodyFormData.append("academic_year", data.payload.year);
    bodyFormData.append("from_date", data.payload.fromDate);
    bodyFormData.append("to_date", data.payload.toDate);
    // bodyFormData.append("class_id", data.payload.class);
    let resp: any = yield apiPost(ADMISSION_REPORT, bodyFormData);
    console.log("data.res adm fee report", resp.response.data);
    if (resp.response.data.status === 200) {
      yield put(SetAdmissionFeeReport(resp.response.data));
    }
    // if (
    //   resp.response.data.status == 500 &&
    //   resp.response.data.status_message == "Not Found"
    // ) {
    //   yield put(SetAdmissionFeeReport([]));
    // }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      yield put(SetAdmissionFeeReport([]));
      console.log("error message: ", error.message);
      return error.message;
    } else {
      yield put(SetAdmissionFeeReport([]));
      console.log("unexpected error: ", error);
      return "An unexpected error occurred";
    }
  }
}
export default function* PreRegistrationSaga() {
  yield takeLatest(tryFetchPreRegistrationReport, fetchPreRegistrationReport);
  yield takeLatest(tryFetchAdmissionFeeReport, fetchAdmissionFeeReport);
  yield takeLatest(
    tryFetchStudentPaymentTypeReport,
    fetchStudentPaymentTypeReport
  );
}
