import axios from "axios";
import { call, put, takeEvery } from "redux-saga/effects";
import { apiPost } from "../../config/apiConfig";
import {
  HOSTEL_ROOM_TYPE,
  HOSTEL_SETTINGS_DETAILS_BY_ID,
  HOSTEL_SETTING_LIST,
  HOSTEL_STUDENT_LIST,
  HOSTEL_TYPE_LIST,
} from "../../config/BaseUrl";

import {
  tryFetchHostelStudentData,
  setHostelStudentData,
  setHostelTypeList,
  tryFetchHostelRequiredList,
  setRoomTypeList,
  setHostelDetails,
  tryFetchHostelDetails,
  tryFetchSingleHostelerDetails,
  setSingleHostelerDetails,
} from "../../slices/hostel/hostelSlice";

function* fetchHostelStudent(data: any): any {
  try {
    var token = localStorage.getItem("token") as string;
    var bodyFormData = new FormData();
    bodyFormData.append("Authorization", token);

    let resp: any = yield apiPost(HOSTEL_STUDENT_LIST, bodyFormData);
    console.log("response hostel", resp);
    if (resp.response.data.status === 200) {
      yield put(setHostelStudentData(resp.response.data.data));
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

function* fetchHostelType(data: any): any {
  try {
    var token = localStorage.getItem("token") as string;
    var bodyFormData = new FormData();
    bodyFormData.append("Authorization", token);

    let resp: any = yield apiPost(HOSTEL_TYPE_LIST, bodyFormData);
    console.log("response HOSTEL_TYPE_LIST", resp);
    if (resp.response.data.status === 200) {
      yield put(setHostelTypeList(resp.response.data.data));
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
function* fetchRoomType(data: any): any {
  try {
    var token = localStorage.getItem("token") as string;
    var bodyFormData = new FormData();
    bodyFormData.append("Authorization", token);
    let resp: any = yield apiPost(HOSTEL_ROOM_TYPE, bodyFormData);
    console.log("response HOSTEL_ROOM_TYPE", resp);
    if (resp.response.data.status === 200) {
      yield put(setRoomTypeList(resp.response.data.data));
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
function* fetchHostelDetails(data: any): any {
  try {
    var token = localStorage.getItem("token") as string;
    var bodyFormData = new FormData();
    bodyFormData.append("Authorization", token);
    bodyFormData.append("academic_year", "2023-2024");
    bodyFormData.append("hostel_type", data.payload.hostelId);
    bodyFormData.append("room_type", data.payload.roomId);
    let resp: any = yield apiPost(HOSTEL_SETTING_LIST, bodyFormData);
    console.log("response HOSTEL_SETTING_LIST", resp);
    if (resp.response.data.status === 200) {
      yield put(setHostelDetails(resp.response.data.data));
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
function* fetchSingleHostelerDetails(data: any): any {
  try {
    var token = localStorage.getItem("token") as string;
    var bodyFormData = new FormData();
    bodyFormData.append("Authorization", token);
    bodyFormData.append("student_id", data.payload);
    let resp: any = yield apiPost(HOSTEL_SETTINGS_DETAILS_BY_ID, bodyFormData);
    console.log("SingleHostelerDetails", resp);
    if (resp.response.data.status === 200) {
      yield put(setSingleHostelerDetails(resp.response.data.data));
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
export default function* hostelSaga() {
  yield takeEvery(tryFetchHostelStudentData, fetchHostelStudent);
  yield takeEvery(tryFetchHostelRequiredList, fetchHostelType);
  yield takeEvery(tryFetchHostelRequiredList, fetchRoomType);
  yield takeEvery(tryFetchHostelDetails, fetchHostelDetails);
  yield takeEvery(tryFetchSingleHostelerDetails, fetchSingleHostelerDetails);
}
