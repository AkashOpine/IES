import axios from "axios";
import { call, put, takeEvery } from "redux-saga/effects";
import { apiPost } from "../../config/apiConfig";
import {
  CONCESSION_REPORT,
  CONSOLIDATED_PAYMENT_HISTORY_REPORT,
  CONSOLIDATED_REPORT,
  DAILY_FEE_COLLECTION_REPORT,
  DCB_REPORT,
  DEFAULTERS_REPORT,
  DETAILED_FEE_REPORT,
  DETAILED_REPORT,
  FEE_DEFAULTERS,
  HEAD_WISE_REPORT,
  MISCELLANEOUS_REPORT,
  NEW_DEFAULTER_REPORT,
  NEW_DEFAULTER_REPORT_WITH_DATE,
  NEW_DEFAULTER_REPORT_WITH_DCB,
  PAYMENT_MODE_REPORT,
  PAYMENT_REPORT,
  STANDARD_REPORT,
  SUMMARY_REPORT,
  TERMWISE_SUMMARY,
} from "../../config/BaseUrl";
import {
  setConcessionReportData,
  setConsolidatedPaymentHistoryReportData,
  setDailyFeeCollectionReportData,
  setDailySummaryReportData,
  setDcbReportData,
  setDefaultersReportData,
  setDetailedFeeReportData,
  setDetailedReportData,
  setHeadWiseReportData,
  setMiscellaneousReportData,
  setNewConsolidatedReportData,
  setNewDefaulterReportData,
  setNewDefaulterWithDate,
  setNewDefaulterWithDCBReportData,
  setPaymentModeReportData,
  setPaymentReportData,
  setStandardReportData,
  setTermWiseReportData,
  tryFetchConcessionReportData,
  tryFetchConsolidatedPaymentHistoryReportData,
  tryFetchConsolidatedReportData,
  tryFetchDailyFeeCollectionReportData,
  tryFetchDailySummaryReportData,
  tryFetchDcbReportData,
  tryFetchDefaultersReportData,
  tryFetchDetailedFeeReportData,
  tryFetchHeadWiseReportData,
  tryFetchMiscellaneousReportData,
  tryFetchNewDefaulterReportData,
  tryFetchNewDefaulterWithDate,
  tryFetchNewDefaulterWithDCBReportData,
  tryFetchPaymentModeReportData,
  tryFetchPaymentReportData,
  tryFetchTermWiseReportData,
} from "../../slices/reports/paymentReportSlice";

function* fetchPaymentReportData(data: any): any {
  try {
    var token = localStorage.getItem("token") as string;
    var bodyFormData = new FormData();
    bodyFormData.append("Authorization", token);
    bodyFormData.append("academic_year", data.payload.year);
    bodyFormData.append("date1", data.payload.fromDate);
    bodyFormData.append("date2", data.payload.toDate);
    bodyFormData.append("class_id", data.payload.classId);
    bodyFormData.append("division_id", data.payload.divisionId);
    let resp: any = yield apiPost(PAYMENT_REPORT, bodyFormData);
    console.log("response slip", resp.response.data);
    if (resp.response.data.status === 200) {
      yield put(setPaymentReportData(resp.response.data));
    }
  } catch (error) {
    yield put(setPaymentReportData([]));
    if (axios.isAxiosError(error)) {
      return error.message;
    } else {
      yield put(setPaymentReportData([]));
      console.log("unexpected error: ", error);
      return "An unexpected error occurred";
    }
  }
}
function* fetchDcbReportData(data: any): any {
  try {
    var token = localStorage.getItem("token") as string;
    var bodyFormData = new FormData();
    bodyFormData.append("Authorization", token);
    bodyFormData.append("academic_year", data.payload.year);
    bodyFormData.append("class_id", data.payload.classId);
    bodyFormData.append("division_id", data.payload.divisionId);
    bodyFormData.append("fee_month", data.payload.monthId);
    let resp: any = yield apiPost(DCB_REPORT, bodyFormData);
    console.log("response dcb report", resp);
    if (resp.response.data.status === 200) {
      yield put(setDcbReportData(resp.response.data));
    }
  } catch (error) {
    yield put(setDcbReportData([]));
    if (axios.isAxiosError(error)) {
      return error.message;
    } else {
      yield put(setDcbReportData([]));
      console.log("unexpected error: ", error);
      return "An unexpected error occurred";
    }
  }
}
function* fetchDefaultersReportData(data: any): any {
  try {
    var token = localStorage.getItem("token") as string;
    var bodyFormData = new FormData();
    bodyFormData.append("Authorization", token);
    bodyFormData.append("academic_year", data.payload.year);
    bodyFormData.append("class_id", data.payload.classId);
    bodyFormData.append("division_id", data.payload.divisionId);
    bodyFormData.append("fee_month", data.payload.monthId);
    let resp: any = yield apiPost(DEFAULTERS_REPORT, bodyFormData);
    console.log("response defaulters report", resp);
    if (resp.response.data.status === 200) {
      yield put(setDefaultersReportData(resp.response.data.data));
    }
  } catch (error) {
    yield put(setDefaultersReportData([]));
    if (axios.isAxiosError(error)) {
      return error.message;
    } else {
      yield put(setDefaultersReportData([]));
      console.log("unexpected error: ", error);
      return "An unexpected error occurred";
    }
  }
}
function* fetchDailySummaryReportData(data: any): any {
  try {
    var token = localStorage.getItem("token") as string;
    var bodyFormData = new FormData();
    bodyFormData.append("Authorization", token);
    bodyFormData.append("academic_year", data.payload.academicYear);
    bodyFormData.append("from_date", data.payload.fromDate);
    bodyFormData.append("to_date", data.payload.date);
    let resp: any = yield apiPost(SUMMARY_REPORT, bodyFormData);
    console.log("response DAILY SUMMARY report", resp);
    if (resp.response.data.status === 200) {
      yield put(setDailySummaryReportData(resp.response.data.data));
    }
  } catch (error) {
    yield put(setDailySummaryReportData([]));
    if (axios.isAxiosError(error)) {
      return error.message;
    } else {
      yield put(setDailySummaryReportData([]));
      console.log("unexpected error: ", error);
      return "An unexpected error occurred";
    }
  }
}
function* fetchStandardReportData(data: any): any {
  try {
    var token = localStorage.getItem("token") as string;
    var bodyFormData = new FormData();
    bodyFormData.append("Authorization", token);
    bodyFormData.append("academic_year", data.payload.academicYear);
    bodyFormData.append("from_date", data.payload.fromDate);
    bodyFormData.append("to_date", data.payload.date);
    let resp: any = yield apiPost(STANDARD_REPORT, bodyFormData);
    console.log("response Standard report", resp);
    if (resp.response.data.status === 200) {
      yield put(setStandardReportData(resp.response.data));
    }
  } catch (error) {
    yield put(setStandardReportData([]));
    if (axios.isAxiosError(error)) {
      return error.message;
    } else {
      yield put(setStandardReportData([]));
      console.log("unexpected error: ", error);
      return "An unexpected error occurred";
    }
  }
}
function* fetchDetailedReportData(data: any): any {
  try {
    var token = localStorage.getItem("token") as string;
    var bodyFormData = new FormData();
    bodyFormData.append("Authorization", token);
    bodyFormData.append("academic_year", data.payload.academicYear);
    bodyFormData.append("from_date", data.payload.fromDate);
    bodyFormData.append("to_date", data.payload.date);
    let resp: any = yield apiPost(DETAILED_REPORT, bodyFormData);
    console.log("response Detailed report", resp);
    if (resp.response.data.status === 200) {
      yield put(setDetailedReportData(resp.response.data));
    }
  } catch (error) {
    yield put(setDetailedReportData([]));
    if (axios.isAxiosError(error)) {
      return error.message;
    } else {
      yield put(setDetailedReportData([]));
      console.log("unexpected error: ", error);
      return "An unexpected error occurred";
    }
  }
}
function* fetchPaymentModeReportData(data: any): any {
  try {
    var token = localStorage.getItem("token") as string;
    var bodyFormData = new FormData();
    bodyFormData.append("Authorization", token);
    bodyFormData.append("academic_year", data.payload.academicYear);
    bodyFormData.append("from_date", data.payload.fromDate);
    bodyFormData.append("to_date", data.payload.toDate);
    bodyFormData.append("payment_type", data.payload.paymentType);
    let resp: any = yield apiPost(PAYMENT_MODE_REPORT, bodyFormData);
    console.log("response payment mode report", resp);
    if (resp.response.data.status === 200) {
      yield put(setPaymentModeReportData(resp.response.data));
    }
  } catch (error) {
    yield put(setPaymentModeReportData([]));
    if (axios.isAxiosError(error)) {
      return error.message;
    } else {
      yield put(setPaymentModeReportData([]));
      console.log("unexpected error: ", error);
      return "An unexpected error occurred";
    }
  }
}
function* fetchHeadWiseReportData(data: any): any {
  try {
    var token = localStorage.getItem("token") as string;
    var bodyFormData = new FormData();
    bodyFormData.append("Authorization", token);
    bodyFormData.append("academic_year", data.payload.academicYear);
    bodyFormData.append("from_date", data.payload.fromDate);
    bodyFormData.append("to_date", data.payload.toDate);
    let resp: any = yield apiPost(HEAD_WISE_REPORT, bodyFormData);
    console.log("response head wise report", resp);
    if (resp.response.data.status === 200) {
      yield put(setHeadWiseReportData(resp.response.data));
    }
  } catch (error) {
    yield put(setHeadWiseReportData([]));
    if (axios.isAxiosError(error)) {
      return error.message;
    } else {
      yield put(setHeadWiseReportData([]));
      console.log("unexpected error: ", error);
      return "An unexpected error occurred";
    }
  }
}
function* fetchDetailedFeeReportData(data: any): any {
  try {
    var token = localStorage.getItem("token") as string;
    var bodyFormData = new FormData();
    bodyFormData.append("Authorization", token);
    bodyFormData.append("academic_year", data.payload.year);
    bodyFormData.append("month", data.payload.monthId);
    bodyFormData.append("date", data.payload.date);

    let resp: any = yield apiPost(DETAILED_FEE_REPORT, bodyFormData);
    console.log("response detailed fee report", resp);
    if (resp.response.data.status === 200) {
      yield put(setDetailedFeeReportData(resp.response.data));
    }
  } catch (error) {
    yield put(setDetailedFeeReportData([]));
    if (axios.isAxiosError(error)) {
      return error.message;
    } else {
      yield put(setDetailedFeeReportData([]));
      console.log("unexpected error: ", error);
      return "An unexpected error occurred";
    }
  }
}
function* fetchNewDefaultersFeeReportData(data: any): any {
  try {
    var token = localStorage.getItem("token") as string;
    var bodyFormData = new FormData();
    bodyFormData.append("Authorization", token);
    bodyFormData.append("academic_year", data.payload.year);
    bodyFormData.append("class_id", data.payload.classId);
    bodyFormData.append("division_id", data.payload.divisionId);
    bodyFormData.append("fee_month", data.payload.monthId);
    bodyFormData.append("concession_type", data.payload.concession);

    // let resp: any = yield apiPost(NEW_DEFAULTER_REPORT, bodyFormData);
    let resp: any = yield apiPost(FEE_DEFAULTERS, bodyFormData);
    console.log("response new defaulters fee report", resp);
    if (resp.response.data.status === 200) {
      yield put(setNewDefaulterReportData(resp.response.data));
    }
  } catch (error) {
    yield put(setNewDefaulterReportData([]));
    if (axios.isAxiosError(error)) {
      return error.message;
    } else {
      yield put(setNewDefaulterReportData([]));
      console.log("unexpected error: ", error);
      return "An unexpected error occurred";
    }
  }
}
function* fetchNewDefaultersWithDCBFeeReportData(data: any): any {
  try {
    var token = localStorage.getItem("token") as string;
    var bodyFormData = new FormData();
    bodyFormData.append("Authorization", token);
    bodyFormData.append("academic_year", data.payload.year);
    bodyFormData.append("class_id", data.payload.classId);
    bodyFormData.append("division_id", data.payload.divisionId);
    bodyFormData.append("fee_month", data.payload.monthId);
    bodyFormData.append("concession_type", data.payload.concession);

    let resp: any = yield apiPost(NEW_DEFAULTER_REPORT_WITH_DCB, bodyFormData);
    console.log("response new defaulters with dcb fee report", resp);
    if (resp.response.data.status === 200) {
      yield put(setNewDefaulterWithDCBReportData(resp.response.data));
    }
  } catch (error) {
    yield put(setNewDefaulterWithDCBReportData([]));
    if (axios.isAxiosError(error)) {
      return error.message;
    } else {
      yield put(setNewDefaulterWithDCBReportData([]));
      console.log("unexpected error: ", error);
      return "An unexpected error occurred";
    }
  }
}
function* fetchConsolidatedReportData(data: any): any {
  try {
    var token = localStorage.getItem("token") as string;
    var bodyFormData = new FormData();
    bodyFormData.append("Authorization", token);
    bodyFormData.append("academic_year", data.payload.academicYear);
    bodyFormData.append("adm_no", data.payload.admissionNumber);

    let resp: any = yield apiPost(CONSOLIDATED_REPORT, bodyFormData);
    console.log("Consolidated report data", resp);
    if (resp.response.data.status === 200) {
      yield put(setNewConsolidatedReportData(resp.response.data));
    }
  } catch (error) {
    yield put(setNewConsolidatedReportData([]));
    if (axios.isAxiosError(error)) {
      return error.message;
    } else {
      yield put(setNewConsolidatedReportData([]));
      console.log("unexpected error: ", error);
      return "An unexpected error occurred";
    }
  }
}
function* fetchNewDefaultersWithDate(data: any): any {
  try {
    var token = localStorage.getItem("token") as string;
    var bodyFormData = new FormData();
    bodyFormData.append("Authorization", token);
    bodyFormData.append("date", data.payload.date);
    bodyFormData.append("academic_year", data.payload.year);
    bodyFormData.append("class_id", data.payload.classId);
    bodyFormData.append("division_id", data.payload.divisionId);
    bodyFormData.append("fee_month", data.payload.monthId);

    let resp: any = yield apiPost(NEW_DEFAULTER_REPORT_WITH_DATE, bodyFormData);
    console.log("response new defaulters with dcb fee report", resp);
    if (resp.response.data.status === 200) {
      yield put(setNewDefaulterWithDate(resp.response.data.data));
    }
  } catch (error) {
    yield put(setNewDefaulterWithDate([]));
    if (axios.isAxiosError(error)) {
      return error.message;
    } else {
      yield put(setNewDefaulterWithDate([]));
      console.log("unexpected error: ", error);
      return "An unexpected error occurred";
    }
  }
}
function* fetchConcessionReportData(data: any): any {
  try {
    var token = localStorage.getItem("token") as string;
    var bodyFormData = new FormData();
    bodyFormData.append("Authorization", token);

    let resp: any = yield apiPost(CONCESSION_REPORT, bodyFormData);
    console.log("response concession report", resp);
    if (resp.response.data.status === 200) {
      yield put(setConcessionReportData(resp.response.data.data));
    }
  } catch (error) {
    yield put(setConcessionReportData({}));
    if (axios.isAxiosError(error)) {
      return error.message;
    } else {
      yield put(setConcessionReportData({}));
      console.log("unexpected error: ", error);
      return "An unexpected error occurred";
    }
  }
}
function* fetchMiscellaneousReportData(data: any): any {
  try {
    var token = localStorage.getItem("token") as string;
    var bodyFormData = new FormData();
    bodyFormData.append("Authorization", token);
    bodyFormData.append("from_date", data.payload.paymentMode);
    bodyFormData.append("from_date", data.payload.fromDate);
    bodyFormData.append("to_date", data.payload.toDate);
    bodyFormData.append("fee_head", data.payload.feeHeads);

    let resp: any = yield apiPost(MISCELLANEOUS_REPORT, bodyFormData);
    console.log("response MISCELLANEOUS report", resp);
    if (resp.response.data.status === 200) {
      yield put(setMiscellaneousReportData(resp.response.data));
    }
  } catch (error) {
    yield put(setMiscellaneousReportData([]));
    if (axios.isAxiosError(error)) {
      return error.message;
    } else {
      yield put(setMiscellaneousReportData([]));
      console.log("unexpected error: ", error);
      return "An unexpected error occurred";
    }
  }
}
function* fetchConsolidatedPaymentHistoryReportData(data: any): any {
  try {
    var token = localStorage.getItem("token") as string;
    var bodyFormData = new FormData();
    bodyFormData.append("Authorization", token);
    bodyFormData.append("adm_no", data.payload.admissionNumber);
    bodyFormData.append("academic_year", data.payload.academicYear);

    let resp: any = yield apiPost(
      CONSOLIDATED_PAYMENT_HISTORY_REPORT,
      bodyFormData,
    );
    console.log("response ConsolidatedPaymentHistoryReportData report", resp);
    if (resp.response.data.status === 200) {
      yield put(setConsolidatedPaymentHistoryReportData(resp.response.data));
    }
  } catch (error) {
    yield put(setConsolidatedPaymentHistoryReportData(null));
    if (axios.isAxiosError(error)) {
      return error.message;
    } else {
      yield put(setConsolidatedPaymentHistoryReportData(null));
      console.log("unexpected error: ", error);
      return "An unexpected error occurred";
    }
  }
}
function* fetchDailyFeeCollectionReportData(data: any): any {
  console.log("started daily fee collection", data);
  try {
    var token = localStorage.getItem("token") as string;
    var bodyFormData = new FormData();
    bodyFormData.append("Authorization", token);
    bodyFormData.append("class_id", data.payload.class);
    bodyFormData.append("division_id", data.payload.division);
    bodyFormData.append("from_date", data.payload.fromDate);
    bodyFormData.append("to_date", data.payload.toDate);

    let resp: any = yield apiPost(DAILY_FEE_COLLECTION_REPORT, bodyFormData);
    console.log("response ConsolidatedPaymentHistoryReportData report", resp);
    if (resp.response.data.status === 200) {
      yield put(setDailyFeeCollectionReportData(resp.response.data));
    }
  } catch (error) {
    yield put(setDailyFeeCollectionReportData(null));
    if (axios.isAxiosError(error)) {
      return error.message;
    } else {
      yield put(setDailyFeeCollectionReportData(null));
      console.log("unexpected error: ", error);
      return "An unexpected error occurred";
    }
  }
}
function* fetchTerWiseReportData(): any {
  try {
    var token = localStorage.getItem("token") as string;
    var bodyFormData = new FormData();
    bodyFormData.append("Authorization", token);
    let resp: any = yield apiPost(TERMWISE_SUMMARY, bodyFormData);
    console.log("response ConsolidatedPaymentHistoryReportData report", resp);
    if (resp.response.data.status === 200) {
      yield put(setTermWiseReportData(resp.response.data));
    }
  } catch (error) {
    yield put(setTermWiseReportData(null));
    if (axios.isAxiosError(error)) {
      return error.message;
    } else {
      yield put(setTermWiseReportData(null));
      console.log("unexpected error: ", error);
      return "An unexpected error occurred";
    }
  }
}
export default function* paymentReportSaga() {
  yield takeEvery(tryFetchPaymentReportData, fetchPaymentReportData);
  yield takeEvery(tryFetchDcbReportData, fetchDcbReportData);
  yield takeEvery(tryFetchDefaultersReportData, fetchDefaultersReportData);
  yield takeEvery(tryFetchDailySummaryReportData, fetchDailySummaryReportData);
  yield takeEvery(tryFetchDailySummaryReportData, fetchStandardReportData);
  yield takeEvery(tryFetchDailySummaryReportData, fetchDetailedReportData);
  yield takeEvery(tryFetchPaymentModeReportData, fetchPaymentModeReportData);
  yield takeEvery(tryFetchHeadWiseReportData, fetchHeadWiseReportData);
  yield takeEvery(tryFetchDetailedFeeReportData, fetchDetailedFeeReportData);
  yield takeEvery(
    tryFetchNewDefaulterReportData,
    fetchNewDefaultersFeeReportData,
  );
  yield takeEvery(
    tryFetchNewDefaulterWithDCBReportData,
    fetchNewDefaultersWithDCBFeeReportData,
  );
  yield takeEvery(tryFetchConsolidatedReportData, fetchConsolidatedReportData);
  yield takeEvery(tryFetchNewDefaulterWithDate, fetchNewDefaultersWithDate);
  yield takeEvery(tryFetchConcessionReportData, fetchConcessionReportData);
  yield takeEvery(
    tryFetchMiscellaneousReportData,
    fetchMiscellaneousReportData,
  );
  yield takeEvery(
    tryFetchConsolidatedPaymentHistoryReportData,
    fetchConsolidatedPaymentHistoryReportData,
  );
  yield takeEvery(
    tryFetchDailyFeeCollectionReportData,
    fetchDailyFeeCollectionReportData,
  );
  yield takeEvery(tryFetchTermWiseReportData, fetchTerWiseReportData);
}
