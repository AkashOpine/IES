import { all, fork } from "redux-saga/effects";
import authSaga from "./authentication/authSaga";
import feeTableSaga from "./feesTable/feeTableSaga";
import classWiseSearchSaga from "./navsearch/ClassWiseSearchSaga";
import receiptSaga from "./receipt/receiptSaga";
import paymentReportSaga from "./report/paymentReportSaga";
import transportSettingSaga from "./settings/transportSettingSaga";
import transportSaga from "./transport/transportSaga";
import transportReportSaga from "./report/transportReportSaga";
import hostelReportSaga from "./report/hostelReportSaga";
import concessionSaga from "./concession/concessionSaga";
import miscellaneousSettingSaga from "./settings/miscellaneousSettingSaga";
import hostelSaga from "./hostel/hostelSaga";
import PreRegistrationSaga from "./preRegistration/preRegistrationSaga";
import dcbReportSaga from "./dcbReports/dcbReportsSaga";
export default function* rootSaga() {
  yield all([
    fork(authSaga),
    fork(feeTableSaga),
    fork(classWiseSearchSaga),
    fork(receiptSaga),
    fork(paymentReportSaga),

    fork(transportSettingSaga),
    fork(transportSaga),
    fork(transportReportSaga),
    fork(hostelReportSaga),
    fork(concessionSaga),
    fork(miscellaneousSettingSaga),
    fork(hostelSaga),
    fork(PreRegistrationSaga),
    fork(dcbReportSaga),
  ]);
}
