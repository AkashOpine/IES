import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./authentication/authSlice";
import feesReducer from "./feetable/feeTableSlice";
import classListReducer from "./navsearch/ClassWiseSearchSlice";
import receiptReducer from "./receipt/receiptSlice";
import paymentReportReducer from "./reports/paymentReportSlice";
import transportSettingReducer from "./settings/transportSettingSlice";
import transportReducer from "./transport/transportSlice";
import transportReportReducer from "./reports/transportReportSlice";
import hostelReportReducer from "./reports/hostelReportSlice";
import concessionReducer from "./concession/concessionSlice";
import miscellaneousReducer from "./settings/miscellaneousSettingSlice";
import hostelReducer from "./hostel/hostelSlice";
import preRegistrationSlice from "./preRegistration/preRegistrationSlice";
import dcbReportReducer from "./dcbReports/dcbReportSlice";
import classWiseReducer from "./classWiseSlice/classWiseSlice";
const combinedReducer = combineReducers({
  auth: authReducer,
  feeTable: feesReducer,
  classWiseList: classListReducer,
  receipt: receiptReducer,
  paymentreport: paymentReportReducer,
  transportsetting: transportSettingReducer,
  transport: transportReducer,
  transportreport: transportReportReducer,
  hostelreport: hostelReportReducer,
  concession: concessionReducer,
  miscellaneousSetting: miscellaneousReducer,
  hostel: hostelReducer,
  PreRegistration: preRegistrationSlice,
  dcbReport: dcbReportReducer,
  classWise: classWiseReducer,

});

const rootReducer = (state: any, action: any) => {
  return combinedReducer(state, action);
};

export default rootReducer;
