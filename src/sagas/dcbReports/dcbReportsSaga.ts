import { put, takeEvery } from "redux-saga/effects";
import { apiPost } from "../../config/apiConfig";
import axios from "axios";
import {
  ACADEMIC_CLASS_WISE_DCB,
  ACADEMIC_CONSOLIDATED_DCB,
  ACADEMIC_DEFAULTERS,
  ACADEMIC_DETAIL_DCB,
  HOSTEL_CONSOLIDATED_DCB,
  HOSTEL_DETAIL_DCB,
  HOSTEL_TYPE_WISE_DCB,
  TRANSPORT_CONSOLIDATED_DCB,
  TRANSPORT_DETAIL_DCB,
  TRANSPORT_ROUTE_WISE_DCB,
} from "../../config/BaseUrl";
import {
  setAcademicClassWiseDcbData,
  setAcademicConsolidatedDcbData,
  setAcademicDefaultersData,
  setAcademicDetailsDcbData,
  setHostelConsolidatedDcbData,
  setHostelDetailsDcbData,
  setHostelTypeWiseDcbData,
  setTransportConsolidatedDcbData,
  setTransportDetailsDcbData,
  setTransportRouteWiseDcbData,
  tryFetchAcademicClassWiseDcbData,
  tryFetchAcademicConsolidatedDcbData,
  tryFetchAcademicDefaultersData,
  tryFetchAcademicDetailsDcbData,
  tryFetchHostelConsolidatedDcbData,
  tryFetchHostelDetailsDcbData,
  tryFetchHostelTypeWiseDcbData,
  tryFetchTransportConsolidatedDcbData,
  tryFetchTransportDetailsDcbData,
  tryFetchTransportRouteWiseDcbData,
} from "../../slices/dcbReports/dcbReportSlice";

//Academic DCB
function* fetchAcademicDetailsDcb(data: any): any {
  try {
    var token = localStorage.getItem("token") as string;
    var bodyFormData = new FormData();
    bodyFormData.append("Authorization", token);
    bodyFormData.append("academic_year", data.payload.year);
    bodyFormData.append("class_id", data.payload.classId);
    bodyFormData.append("division_id", data.payload.divisionId);
    bodyFormData.append("fee_month", data.payload.monthId);
    bodyFormData.append("date", data.payload.date);

    let resp: any = yield apiPost(ACADEMIC_DETAIL_DCB, bodyFormData);
    console.log("response slip", resp.response.data);
    if (resp.response.data.status === 200) {
      yield put(setAcademicDetailsDcbData(resp.response.data));
    }
  } catch (error) {
    yield put(setAcademicDetailsDcbData([]));
    if (axios.isAxiosError(error)) {
      return error.message;
    } else {
      yield put(setAcademicDetailsDcbData([]));
      console.log("unexpected error: ", error);
      return "An unexpected error occurred";
    }
  }
}

function* fetchAcademicClassWiseDcb(data: any): any {
  try {
    var token = localStorage.getItem("token") as string;
    var bodyFormData = new FormData();
    bodyFormData.append("Authorization", token);
    bodyFormData.append("academic_year", data.payload.year);
    bodyFormData.append("class_id", data.payload.classId);
    bodyFormData.append("division_id", data.payload.divisionId);
    bodyFormData.append("fee_month", data.payload.monthId);

    let resp: any = yield apiPost(ACADEMIC_CLASS_WISE_DCB, bodyFormData);
    console.log("response slip", resp.response.data);
    if (resp.response.data.status === 200) {
      yield put(setAcademicClassWiseDcbData(resp.response.data));
    }
  } catch (error) {
    yield put(setAcademicClassWiseDcbData([]));
    if (axios.isAxiosError(error)) {
      return error.message;
    } else {
      yield put(setAcademicClassWiseDcbData([]));
      console.log("unexpected error: ", error);
      return "An unexpected error occurred";
    }
  }
}

function* fetchAcademicConsolidatedDcb(data: any): any {
  try {
    var token = localStorage.getItem("token") as string;
    var bodyFormData = new FormData();
    bodyFormData.append("Authorization", token);
    bodyFormData.append("academic_year", data.payload.year);
    // bodyFormData.append("class_id", data.payload.classId);
    // bodyFormData.append("division_id", data.payload.divisionId);
    // bodyFormData.append("fee_month", data.payload.monthId);
    // bodyFormData.append("date", data.payload.date);

    let resp: any = yield apiPost(ACADEMIC_CONSOLIDATED_DCB, bodyFormData);
    console.log("response slip", resp.response.data);
    if (resp.response.data.status === 200) {
      yield put(setAcademicConsolidatedDcbData(resp.response.data));
    }
  } catch (error) {
    yield put(setAcademicConsolidatedDcbData([]));
    if (axios.isAxiosError(error)) {
      return error.message;
    } else {
      yield put(setAcademicConsolidatedDcbData([]));
      console.log("unexpected error: ", error);
      return "An unexpected error occurred";
    }
  }
}

function* fetchAcademicDefaulters(data: any): any {
  try {
    var token = localStorage.getItem("token") as string;
    var bodyFormData = new FormData();
    bodyFormData.append("Authorization", token);
    bodyFormData.append("academic_year", data.payload.year);
    bodyFormData.append("class_id", data.payload.classId);
    bodyFormData.append("division_id", data.payload.divisionId);
    bodyFormData.append("fee_month", data.payload.monthId);
    // bodyFormData.append("date", data.payload.date);

    let resp: any = yield apiPost(ACADEMIC_DEFAULTERS, bodyFormData);
    console.log("response slip", resp.response.data);
    if (resp.response.data.status === 200) {
      yield put(setAcademicDefaultersData(resp.response.data));
    }
  } catch (error) {
    yield put(setAcademicDefaultersData([]));
    if (axios.isAxiosError(error)) {
      return error.message;
    } else {
      yield put(setAcademicDefaultersData([]));
      console.log("unexpected error: ", error);
      return "An unexpected error occurred";
    }
  }
}

//Transport DCB
function* fetchTransportDetailsDcb(data: any): any {
  try {
    var token = localStorage.getItem("token") as string;
    var bodyFormData = new FormData();
    bodyFormData.append("Authorization", token);
    bodyFormData.append("academic_year", data.payload.year);
    bodyFormData.append("class_id", data.payload.classId);
    bodyFormData.append("division_id", data.payload.divisionId);
    bodyFormData.append("fee_month", data.payload.monthId);
    bodyFormData.append("route", data.payload.route);
    bodyFormData.append("date", data.payload.date);

    let resp: any = yield apiPost(TRANSPORT_DETAIL_DCB, bodyFormData);
    console.log("response slip", resp.response.data);
    if (resp.response.data.status === 200) {
      yield put(setTransportDetailsDcbData(resp.response.data));
    }
  } catch (error) {
    yield put(setTransportDetailsDcbData([]));
    if (axios.isAxiosError(error)) {
      return error.message;
    } else {
      yield put(setTransportDetailsDcbData([]));
      console.log("unexpected error: ", error);
      return "An unexpected error occurred";
    }
  }
}

function* fetchTransportRouteWiseDcb(data: any): any {
  try {
    var token = localStorage.getItem("token") as string;
    var bodyFormData = new FormData();
    bodyFormData.append("Authorization", token);
    bodyFormData.append("academic_year", data.payload.year);
    bodyFormData.append("class_id", data.payload.classId);
    bodyFormData.append("division_id", data.payload.divisionId);
    bodyFormData.append("fee_month", data.payload.monthId);
    bodyFormData.append("route", data.payload.route);
    bodyFormData.append("date", data.payload.date);

    let resp: any = yield apiPost(TRANSPORT_ROUTE_WISE_DCB, bodyFormData);
    console.log("response slip", resp.response.data);
    if (resp.response.data.status === 200) {
      yield put(setTransportRouteWiseDcbData(resp.response.data));
    }
  } catch (error) {
    yield put(setTransportRouteWiseDcbData([]));
    if (axios.isAxiosError(error)) {
      return error.message;
    } else {
      yield put(setTransportRouteWiseDcbData([]));
      console.log("unexpected error: ", error);
      return "An unexpected error occurred";
    }
  }
}

function* fetchTransportConsolidatedDcb(data: any): any {
  try {
    var token = localStorage.getItem("token") as string;
    var bodyFormData = new FormData();
    bodyFormData.append("Authorization", token);
    bodyFormData.append("academic_year", data.payload.year);
    // bodyFormData.append("class_id", data.payload.classId);
    // bodyFormData.append("division_id", data.payload.divisionId);
    // bodyFormData.append("fee_month", data.payload.monthId);
    // bodyFormData.append("date", data.payload.date);

    let resp: any = yield apiPost(TRANSPORT_CONSOLIDATED_DCB, bodyFormData);
    console.log("response slip", resp.response.data);
    if (resp.response.data.status === 200) {
      yield put(setTransportConsolidatedDcbData(resp.response.data));
    }
  } catch (error) {
    yield put(setTransportConsolidatedDcbData([]));
    if (axios.isAxiosError(error)) {
      return error.message;
    } else {
      yield put(setTransportConsolidatedDcbData([]));
      console.log("unexpected error: ", error);
      return "An unexpected error occurred";
    }
  }
}

//Hostel DCB
function* fetchHostelDetailsDcb(data: any): any {
  try {
    var token = localStorage.getItem("token") as string;
    var bodyFormData = new FormData();
    bodyFormData.append("Authorization", token);
    bodyFormData.append("academic_year", data.payload.year);
    bodyFormData.append("class_id", data.payload.classId);
    bodyFormData.append("division_id", data.payload.divisionId);
    bodyFormData.append("fee_month", data.payload.monthId);
    bodyFormData.append("hostel_type", data.payload.hostel_type);
    bodyFormData.append("date", data.payload.date);
    bodyFormData.append("fee_type", data.payload.feeHeadId);
    bodyFormData.append("discontinue", data.payload.discontinue);
    
    let resp: any = yield apiPost(HOSTEL_DETAIL_DCB, bodyFormData);
    console.log("response slip", resp.response.data);
    if (resp.response.data.status === 200) {
      yield put(setHostelDetailsDcbData(resp.response.data));
    }
  } catch (error) {
    yield put(setHostelDetailsDcbData([]));
    if (axios.isAxiosError(error)) {
      return error.message;
    } else {
      yield put(setHostelDetailsDcbData([]));
      console.log("unexpected error: ", error);
      return "An unexpected error occurred";
    }
  }
}

function* fetchHostelTypeWiseDcb(data: any): any {
  try {
    var token = localStorage.getItem("token") as string;
    var bodyFormData = new FormData();
    bodyFormData.append("Authorization", token);
    bodyFormData.append("academic_year", data.payload.year);
    bodyFormData.append("class_id", data.payload.classId);
    bodyFormData.append("division_id", data.payload.divisionId);
    bodyFormData.append("fee_month", data.payload.monthId);
    bodyFormData.append("hostel_type", data.payload.hostel_type);

    let resp: any = yield apiPost(HOSTEL_TYPE_WISE_DCB, bodyFormData);
    console.log("response slip", resp.response.data);
    if (resp.response.data.status === 200) {
      yield put(setHostelTypeWiseDcbData(resp.response.data));
    }
  } catch (error) {
    yield put(setHostelTypeWiseDcbData([]));
    if (axios.isAxiosError(error)) {
      return error.message;
    } else {
      yield put(setHostelTypeWiseDcbData([]));
      console.log("unexpected error: ", error);
      return "An unexpected error occurred";
    }
  }
}

function* fetchHostelConsolidatedDcb(data: any): any {
  try {
    var token = localStorage.getItem("token") as string;
    var bodyFormData = new FormData();
    bodyFormData.append("Authorization", token);
    bodyFormData.append("academic_year", data.payload.year);
    // bodyFormData.append("class_id", data.payload.classId);
    // bodyFormData.append("division_id", data.payload.divisionId);
    // bodyFormData.append("fee_month", data.payload.monthId);
    // bodyFormData.append("date", data.payload.date);

    let resp: any = yield apiPost(HOSTEL_CONSOLIDATED_DCB, bodyFormData);
    console.log("response slip", resp.response.data);
    if (resp.response.data.status === 200) {
      yield put(setHostelConsolidatedDcbData(resp.response.data));
    }
  } catch (error) {
    yield put(setHostelConsolidatedDcbData([]));
    if (axios.isAxiosError(error)) {
      return error.message;
    } else {
      yield put(setHostelConsolidatedDcbData([]));
      console.log("unexpected error: ", error);
      return "An unexpected error occurred";
    }
  }
}

export default function* dcbReportSaga() {
  yield takeEvery(tryFetchAcademicDetailsDcbData, fetchAcademicDetailsDcb);
  yield takeEvery(tryFetchAcademicClassWiseDcbData, fetchAcademicClassWiseDcb);
  yield takeEvery(
    tryFetchAcademicConsolidatedDcbData,
    fetchAcademicConsolidatedDcb
  );
  yield takeEvery(tryFetchAcademicDefaultersData, fetchAcademicDefaulters);

  yield takeEvery(tryFetchTransportDetailsDcbData, fetchTransportDetailsDcb);
  yield takeEvery(
    tryFetchTransportRouteWiseDcbData,
    fetchTransportRouteWiseDcb
  );
  yield takeEvery(
    tryFetchTransportConsolidatedDcbData,
    fetchTransportConsolidatedDcb
  );

  yield takeEvery(tryFetchHostelDetailsDcbData, fetchHostelDetailsDcb);
  yield takeEvery(tryFetchHostelTypeWiseDcbData, fetchHostelTypeWiseDcb);
  yield takeEvery(
    tryFetchHostelConsolidatedDcbData,
    fetchHostelConsolidatedDcb
  );
}
