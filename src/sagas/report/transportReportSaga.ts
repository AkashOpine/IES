import axios from "axios";
import { call, put, takeEvery } from "redux-saga/effects";
import { apiPost } from "../../config/apiConfig";
import {
  TRANSPORT_DEFAULTERS_REPORT,
  TRANSPORT_FEE_COLLECTION_REPORT,
  TRANSPORT_FUEL_FILLING_REPORT,
  TRANSPORT_LIST_REPORT,
  TRANSPORT_MAINTANENCE_REPORT,
} from "../../config/BaseUrl";
import {
  setTransportDefaultersReportData,
  setTransportFuelReportData,
  setTransportMaintanenceReportData,
  setTransportListReportData,
  tryFetchTransportDefaultersReportData,
  tryFetchTransportFuelReportData,
  tryFetchTransportMaintanenceReportData,
  tryFetchTransportListReportData,
  tryFetchTransportFeeCollectionReportData,
  setTransportFeeCollectionReportData,
} from "../../slices/reports/transportReportSlice";

function* fetchTransportDefaultersReportData(data: any): any {
  try {
    var token = localStorage.getItem("token") as string;
    var bodyFormData = new FormData();
    bodyFormData.append("Authorization", token);
    bodyFormData.append("academic_year", data.payload.year);
    bodyFormData.append("class_id", data.payload.classId);
    bodyFormData.append("division_id", data.payload.divisionId);
    bodyFormData.append("fee_month", data.payload.monthId);
    bodyFormData.append("route", data.payload.route);
    let resp: any = yield apiPost(TRANSPORT_DEFAULTERS_REPORT, bodyFormData);
    // console.log("response slip", resp);
    if (resp.response.data.status === 200) {
      yield put(setTransportDefaultersReportData(resp.response.data));
    }
  } catch (error) {
    yield put(setTransportDefaultersReportData([]));
    if (axios.isAxiosError(error)) {
      return error.message;
    } else {
      yield put(setTransportDefaultersReportData([]));
      console.log("unexpected error: ", error);
      return "An unexpected error occurred";
    }
  }
}
function* fetchTransportFuelReportData(data: any): any {
  try {
    var token = localStorage.getItem("token") as string;
    var bodyFormData = new FormData();
    bodyFormData.append("Authorization", token);
    bodyFormData.append("from_date", data.payload.fromDate);
    bodyFormData.append("to_date", data.payload.toDate);
    bodyFormData.append("vehicle_id", data.payload.vehicleId);

    let resp: any = yield apiPost(TRANSPORT_FUEL_FILLING_REPORT, bodyFormData);
    console.log("transport fuel report", resp);
    if (resp.response.data.status === 200) {
      yield put(setTransportFuelReportData(resp.response.data.data));
    }
  } catch (error) {
    yield put(setTransportFuelReportData([]));
    if (axios.isAxiosError(error)) {
      return error.message;
    } else {
      yield put(setTransportFuelReportData([]));
      console.log("unexpected error: ", error);
      return "An unexpected error occurred";
    }
  }
}
function* fetchTransportMaintanenceReportData(data: any): any {
  try {
    var token = localStorage.getItem("token") as string;
    var bodyFormData = new FormData();
    bodyFormData.append("Authorization", token);
    bodyFormData.append("from_date", data.payload.fromDate);
    bodyFormData.append("to_date", data.payload.toDate);
    bodyFormData.append("vehicle_id", data.payload.vehicleId);

    let resp: any = yield apiPost(TRANSPORT_MAINTANENCE_REPORT, bodyFormData);
    console.log("transport maintainance report", resp);
    if (resp.response.data.status === 200) {
      yield put(setTransportMaintanenceReportData(resp.response.data.data));
    }
  } catch (error) {
    yield put(setTransportMaintanenceReportData([]));
    if (axios.isAxiosError(error)) {
      return error.message;
    } else {
      yield put(setTransportMaintanenceReportData([]));
      console.log("unexpected error: ", error);
      return "An unexpected error occurred";
    }
  }
}
function* fetchTransportListReportData(data: any): any {
  try {
    var token = localStorage.getItem("token") as string;
    var bodyFormData = new FormData();
    bodyFormData.append("Authorization", token);
    bodyFormData.append("class_id", data.payload.class);
    bodyFormData.append("division_id", data.payload.division);
    bodyFormData.append("route_id", data.payload.route);
    bodyFormData.append("month_id", data.payload.month);
    bodyFormData.append("not_used", data.payload.notUsed);

    let resp: any = yield apiPost(TRANSPORT_LIST_REPORT, bodyFormData);
    console.log("transport List report", resp);
    if (resp.response.data.status === 200) {
      yield put(setTransportListReportData(resp.response.data));
    }
  } catch (error) {
    yield put(setTransportListReportData([]));
    if (axios.isAxiosError(error)) {
      return error.message;
    } else {
      yield put(setTransportListReportData([]));
      console.log("unexpected error: ", error);
      return "An unexpected error occurred";
    }
  }
}
function* fetchTransportFeeCollectionReportData(data: any): any {
  try {
    var token = localStorage.getItem("token") as string;
    var bodyFormData = new FormData();
    bodyFormData.append("Authorization", token);
    bodyFormData.append("class_id", data.payload.class);
    bodyFormData.append("division_id", data.payload.division);
    bodyFormData.append("from_date", data.payload.from);
    bodyFormData.append("to_date", data.payload.to);
    bodyFormData.append("route_id", data.payload.route_id);

    let resp: any = yield apiPost(
      TRANSPORT_FEE_COLLECTION_REPORT,
      bodyFormData
    );
    console.log("transport List report", resp);
    if (resp.response.data.status === 200) {
      yield put(setTransportFeeCollectionReportData(resp.response.data.data));
    }
  } catch (error) {
    yield put(setTransportFeeCollectionReportData([]));
    if (axios.isAxiosError(error)) {
      return error.message;
    } else {
      yield put(setTransportFeeCollectionReportData([]));
      console.log("unexpected error: ", error);
      return "An unexpected error occurred";
    }
  }
}
export default function* transportReportSaga() {
  yield takeEvery(
    tryFetchTransportDefaultersReportData,
    fetchTransportDefaultersReportData
  );
  yield takeEvery(
    tryFetchTransportFuelReportData,
    fetchTransportFuelReportData
  );
  yield takeEvery(
    tryFetchTransportMaintanenceReportData,
    fetchTransportMaintanenceReportData
  );
  yield takeEvery(
    tryFetchTransportListReportData,
    fetchTransportListReportData
  );
  yield takeEvery(
    tryFetchTransportFeeCollectionReportData,
    fetchTransportFeeCollectionReportData
  );
}
