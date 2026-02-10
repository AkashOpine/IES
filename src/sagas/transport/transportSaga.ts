import { call, put, takeEvery } from "redux-saga/effects";
import axios from "axios";
import { apiPost } from "../../config/apiConfig";
import Moment from "moment";
import {
  setDriverListData,
  setDriverProfileData,
  setPickupPointListData,
  setRouteListData,
  setTransportListData,
  setTransportStudentListData,
  setVehicleProfileData,
  tryFetchDriverListData,
  tryFetchDriverProfileData,
  setFuelListData,
  tryFetchFuelListData,
  tryFetchPickupPointListData,
  tryFetchRouteListData,
  tryFetchTransportListData,
  tryFetchTransportStudentListData,
  tryFetchRepairListData,
  setRepairListData,
  tryFetchVehicleProfileData,
} from "../../slices/transport/transportSlice";
import {
  DRIVER_LIST,
  DRIVER_PROFILE_DATA,
  FUEL_LIST_DATA,
  PICKUP_POINT_LIST,
  REPAIR_LIST_DATA,
  ROUTE_LIST,
  TRANSPORT_LIST,
  TRANSPORT_PROFILE_DATA,
  TRANSPORT_STUDENT_LIST,
} from "../../config/BaseUrl";
function* fetchTransportListData(): any {
  try {
    var token = localStorage.getItem("token") as string;
    var bodyFormData = new FormData();
    bodyFormData.append("Authorization", token);
    let resp: any = yield apiPost(TRANSPORT_LIST, bodyFormData);
    // console.log("transport list data", resp);
    yield put(setTransportListData(resp.response.data.data));
  } catch (error) {
    yield put(setTransportListData([]));
    if (axios.isAxiosError(error)) {
      return error.message;
    } else {
      yield put(setTransportListData([]));
      // console.log("unexpected error: ", error);
      return "An unexpected error occurred";
    }
  }
}
function* fetchTransportStudentListData(data: any): any {
  try {
    var token = localStorage.getItem("token") as string;
    var bodyFormData = new FormData();
    bodyFormData.append("Authorization", token);
    bodyFormData.append("route", data.payload.route);
    bodyFormData.append("class", data.payload.class);
    bodyFormData.append("division", data.payload.division);
    let resp: any = yield apiPost(TRANSPORT_STUDENT_LIST, bodyFormData);
    // console.log("transport student list data", resp);
    yield put(setTransportStudentListData(resp.response.data));
    if (resp.response.data.data === null) {
      yield put(setTransportStudentListData([]));
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      yield put(setTransportStudentListData([]));
      return error.message;
    } else {
      yield put(setTransportStudentListData([]));
      // console.log("unexpected error: ", error);
      return "An unexpected error occurred";
    }
  }
}
function* fetchDriverListData(data: any): any {
  try {
    var token = localStorage.getItem("token") as string;
    var bodyFormData = new FormData();
    bodyFormData.append("Authorization", token);
    let resp: any = yield apiPost(DRIVER_LIST, bodyFormData);
    // console.log("driver list data", resp);
    yield put(setDriverListData(resp.response.data.data));
  } catch (error) {
    yield put(setDriverListData([]));
    if (axios.isAxiosError(error)) {
      return error.message;
    } else {
      yield put(setDriverListData([]));
      // console.log("unexpected error: ", error);
      return "An unexpected error occurred";
    }
  }
}
function* fetchPickupPointListData(data: any): any {
  // console.log("data saga",data)
  try {
    var token = localStorage.getItem("token") as string;
    var bodyFormData = new FormData();
    bodyFormData.append("Authorization", token);
    bodyFormData.append("academic_year", data.payload.year);
    bodyFormData.append("route_id", data.payload.route);
    let resp: any = yield apiPost(PICKUP_POINT_LIST, bodyFormData);
    // console.log("pickup point list data", resp);
    yield put(setPickupPointListData(resp.response.data));
  } catch (error) {
    yield put(setPickupPointListData([]));
    if (axios.isAxiosError(error)) {
      return error.message;
    } else {
      yield put(setPickupPointListData([]));
      // console.log("unexpected error: ", error);
      return "An unexpected error occurred";
    }
  }
}
function* fetchRouteListData(data: any): any {
  // console.log("data saga",data)
  try {
    var token = localStorage.getItem("token") as string;
    var bodyFormData = new FormData();
    bodyFormData.append("Authorization", token);
    // bodyFormData.append("academic_year", data.payload.year);
    // bodyFormData.append("route_id", data.payload.route);
    let resp: any = yield apiPost(ROUTE_LIST, bodyFormData);
    console.log("Route list data", resp);
    yield put(setRouteListData(resp.response.data.data));
  } catch (error) {
    yield put(setRouteListData([]));
    if (axios.isAxiosError(error)) {
      return error.message;
    } else {
      yield put(setRouteListData([]));
      // console.log("unexpected error: ", error);
      return "An unexpected error occurred";
    }
  }
}
function* fetchVehicleProfileData(data: any): any {
  // console.log("data saga",data)
  try {
    var token = localStorage.getItem("token") as string;
    var bodyFormData = new FormData();
    bodyFormData.append("Authorization", token);
    bodyFormData.append("vehicle_id", data.payload);
    let resp: any = yield apiPost(TRANSPORT_PROFILE_DATA, bodyFormData);
    // console.log("pickup point list data", resp);
    yield put(setVehicleProfileData(resp.response.data.data));
  } catch (error) {
    yield put(setVehicleProfileData({}));
    if (axios.isAxiosError(error)) {
      return error.message;
    } else {
      yield put(setVehicleProfileData({}));
      // console.log("unexpected error: ", error);
      return "An unexpected error occurred";
    }
  }
}
function* fetchDriverProfileData(data: any): any {
  // console.log("data saga",data)
  try {
    var token = localStorage.getItem("token") as string;
    var bodyFormData = new FormData();
    bodyFormData.append("Authorization", token);
    bodyFormData.append("driver_id", data.payload);
    let resp: any = yield apiPost(DRIVER_PROFILE_DATA, bodyFormData);
    // console.log("pickup point list data", resp);
    yield put(setDriverProfileData(resp.response.data.data));
  } catch (error) {
    yield put(setDriverProfileData({}));
    if (axios.isAxiosError(error)) {
      return error.message;
    } else {
      yield put(setDriverProfileData({}));
      // console.log("unexpected error: ", error);
      return "An unexpected error occurred";
    }
  }
}
function* fetchFuelListData(data: any): any {
  // console.log("data saga",data)
  try {
    var token = localStorage.getItem("token") as string;
    var bodyFormData = new FormData();
    bodyFormData.append("Authorization", token);
    let resp: any = yield apiPost(FUEL_LIST_DATA, bodyFormData);
    // console.log("pickup point list data", resp);
    yield put(setFuelListData(resp.response.data.data));
  } catch (error) {
    yield put(setFuelListData([]));
    if (axios.isAxiosError(error)) {
      return error.message;
    } else {
      yield put(setFuelListData([]));
      // console.log("unexpected error: ", error);
      return "An unexpected error occurred";
    }
  }
}
function* fetchRepairListData(data: any): any {
  console.log("data saga", data);
  try {
    var token = localStorage.getItem("token") as string;
    var bodyFormData = new FormData();
    bodyFormData.append("Authorization", token);
    let resp: any = yield apiPost(REPAIR_LIST_DATA, bodyFormData);
    console.log("Repair list data", resp);
    yield put(setRepairListData(resp.response.data.data));
  } catch (error) {
    yield put(setRepairListData([]));
    if (axios.isAxiosError(error)) {
      return error.message;
    } else {
      yield put(setRepairListData([]));
      // console.log("unexpected error: ", error);
      return "An unexpected error occurred";
    }
  }
}
export default function* transportSaga() {
  yield takeEvery(tryFetchTransportListData, fetchTransportListData);
  yield takeEvery(
    tryFetchTransportStudentListData,
    fetchTransportStudentListData
  );
  yield takeEvery(tryFetchDriverListData, fetchDriverListData);
  yield takeEvery(tryFetchPickupPointListData, fetchPickupPointListData);
  yield takeEvery(tryFetchRouteListData, fetchRouteListData);
  yield takeEvery(tryFetchVehicleProfileData, fetchVehicleProfileData);
  yield takeEvery(tryFetchDriverProfileData, fetchDriverProfileData);
  yield takeEvery(tryFetchFuelListData, fetchFuelListData);
  yield takeEvery(tryFetchRepairListData, fetchRepairListData);
}
