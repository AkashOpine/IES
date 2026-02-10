import { put, takeEvery } from "redux-saga/effects";
import axios from "axios";
import { apiPost } from "../../config/apiConfig";
import {
  tryFetchTransportSettingTableData,
  setTransportSettingTableData,
  tryFetchTransportSettingRouteListData,
  setTransportSettingRouteListData,
  tryFetchTransportSettingPickupListData,
  setTransportSettingPickupListData,
  tryFetchTransportSettingFeeListData,
  setTransportSettingFeeListData,
} from "../../slices/settings/transportSettingSlice";
import {
  TRANSPORT_FEE_SETTINGS_LIST,
  TRANSPORT_SETTING,
  TRANSPORT_SETTING_PICKUP_LIST,
  TRANSPORT_SETTING_ROUTE_LIST,
} from "../../config/BaseUrl";
function* fetchTransportSettingTableData(data: any): any {
  try {
    var token = localStorage.getItem("token") as string;
    var bodyFormData = new FormData();
    bodyFormData.append("Authorization", token);
    bodyFormData.append("student_id", data.payload);
    // bodyFormData.append("academic_year", "2022-2023");
    let resp: any = yield apiPost(TRANSPORT_SETTING, bodyFormData);
    console.log("transport setting", resp);
    yield put(setTransportSettingTableData(resp.response.data.data));
  } catch (error) {
    yield put(setTransportSettingTableData([]));
    if (axios.isAxiosError(error)) {
      return error.message;
    } else {
      yield put(setTransportSettingTableData([]));
      console.log("unexpected error: ", error);
      return "An unexpected error occurred";
    }
  }
}
function* fetchTransportSettingRouteListData(data: any): any {
  try {
    var token = localStorage.getItem("token") as string;
    var bodyFormData = new FormData();
    bodyFormData.append("Authorization", token);
    let resp: any = yield apiPost(TRANSPORT_SETTING_ROUTE_LIST, bodyFormData);
    console.log("transport setting routelist", resp);
    yield put(setTransportSettingRouteListData(resp.response.data.data));
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.message;
    } else {
      console.log("unexpected error: ", error);
      return "An unexpected error occurred";
    }
  }
}
function* fetchTransportSettingPickupListData(data: any): any {
  try {
    var token = localStorage.getItem("token") as string;
    var bodyFormData = new FormData();
    bodyFormData.append("Authorization", token);
    bodyFormData.append("route_id", data.payload);
    let resp: any = yield apiPost(TRANSPORT_SETTING_PICKUP_LIST, bodyFormData);
    console.log("transport setting pickuplist", resp);
    yield put(setTransportSettingPickupListData(resp.response.data.data));
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.message;
    } else {
      console.log("unexpected error: ", error);
      return "An unexpected error occurred";
    }
  }
}
function* fetchTransportSettingFeeListData(): any {
  try {
    var token = localStorage.getItem("token") as string;
    var bodyFormData = new FormData();
    bodyFormData.append("Authorization", token);
    let resp: any = yield apiPost(TRANSPORT_FEE_SETTINGS_LIST, bodyFormData);
    console.log("transport setting Fee list", resp);
    yield put(setTransportSettingFeeListData(resp.response.data.data));
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.message;
    } else {
      console.log("unexpected error: ", error);
      return "An unexpected error occurred";
    }
  }
}
export default function* transportSettingSaga() {
  yield takeEvery(
    tryFetchTransportSettingTableData,
    fetchTransportSettingTableData
  );
  yield takeEvery(
    tryFetchTransportSettingRouteListData,
    fetchTransportSettingRouteListData
  );
  yield takeEvery(
    tryFetchTransportSettingPickupListData,
    fetchTransportSettingPickupListData
  );
  yield takeEvery(
    tryFetchTransportSettingFeeListData,
    fetchTransportSettingFeeListData
  );
}
