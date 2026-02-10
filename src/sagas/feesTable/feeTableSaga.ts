import axios from "axios";
import { call, put, takeEvery } from "redux-saga/effects";
import { apiPost } from "../../config/apiConfig";
import { FEE_TABLE_DATA } from "../../config/BaseUrl";
import {
  setFeeData,
  tryFetchFeeTableData,
} from "../../slices/feetable/feeTableSlice";

function* fetchFeeTableData(data: any): any {
  try {
    var token = localStorage.getItem("token") as string;
    var bodyFormData = new FormData();
    console.log("data", data.payload);

    bodyFormData.append("Authorization", token);
    bodyFormData.append("academic_year", data.payload.academicYear);
    bodyFormData.append("student_id", data.payload.studentId);
    let resp: any = yield apiPost(FEE_TABLE_DATA, bodyFormData);
    console.log("feeData table resp", resp.response.data.data);

    yield put(setFeeData(resp.response.data.data));
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.message;
    } else {
      console.log("unexpected error: ", error);
      return "An unexpected error occurred";
    }
  }
}

export default function* feeTableSaga() {
  yield takeEvery(tryFetchFeeTableData, fetchFeeTableData);
}
