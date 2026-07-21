import { createSelector, createSlice } from "@reduxjs/toolkit";

interface InitState {
  isLoading: boolean;
  paymentReportData: any;
  paymentReportExcel: any;
  dcbReportData: any;
  dcbReportExcel: any;
  defaultersReportData: any;
  dailySummaryReportData: any;
  standardReportData: any;
  standardReportExcel: any;
  detailedReportData: any;
  paymentModeReportData: any;
  paymentModeReportExcel: any;
  headWiseReportData: any;
  headWiseReportExcel: any;
  detailedFeeReportData: any;
  detailedFeeReportExcel: any;
  newDefaultersReportData: any;
  newDefaultersReportExcel: any;
  newDefaultersWithDCBReportData: any;
  newDefaultersWithDate: any;
  consolidatedReport: any;
  consolidatedReportExcel: any;
  concessionReport: any;
  concessionReportExcel: any;
  miscellaneousReport: any;
  miscellaneousReportExcel: any;
  consolidatedPaymentHistoryReport: any;
  dailyFeeCollectionReportData: any;
  TermWiseReportData: any;
  miscFilters: any;
}

const initState: InitState = {
  isLoading: false,
  paymentReportData: { Details: [], grand_total: {} },

  dcbReportData: [],

  defaultersReportData: [],
  dailySummaryReportData: {},
  standardReportData: [],
  detailedReportData: [],
  paymentModeReportData: [],
  headWiseReportData: [],
  detailedFeeReportData: [],
  newDefaultersReportData: [],
  newDefaultersWithDCBReportData: [],
  newDefaultersWithDate: [],
  consolidatedReport: [],
  concessionReport: {},
  miscellaneousReport: [],
  paymentReportExcel: "",
  dcbReportExcel: "",
  standardReportExcel: "",
  paymentModeReportExcel: "",
  headWiseReportExcel: "",
  detailedFeeReportExcel: "",
  newDefaultersReportExcel: "",
  consolidatedReportExcel: "",
  concessionReportExcel: "",
  miscellaneousReportExcel: "",
  consolidatedPaymentHistoryReport: null,
  dailyFeeCollectionReportData: [],
  TermWiseReportData: [],
  miscFilters: null,
};

const paymentReportSlice = createSlice({
  name: "paymentreport",
  initialState: initState,
  reducers: {
    tryFetchPaymentReportData: (state, action) => {
      state.isLoading = true;
    },
    tryFetchDcbReportData: (state, action) => {
      state.isLoading = true;
    },
    tryFetchDefaultersReportData: (state, action) => {
      state.isLoading = true;
    },
    tryFetchDailySummaryReportData: (state, action) => {
      state.isLoading = true;
    },
    tryFetchPaymentModeReportData: (state, action) => {
      state.isLoading = true;
    },
    tryFetchHeadWiseReportData: (state, action) => {
      state.isLoading = true;
    },
    tryFetchDetailedFeeReportData: (state, action) => {
      state.isLoading = true;
    },
    setDetailedFeeReportData: (state: any, action: any) => {
      state.isLoading = false;
      state.detailedFeeReportData = action.payload.data;
      state.detailedFeeReportExcel = action.payload.excel;
    },
    setHeadWiseReportData: (state: any, action: any) => {
      state.isLoading = false;
      state.headWiseReportData = action.payload.data;
      state.headWiseReportExcel = action.payload.excel;
    },
    setPaymentReportData: (state: any, action: any) => {
      state.isLoading = false;
      state.paymentReportData =
        action.payload.data === null ? [] : action.payload.data;
      state.paymentReportExcel = action.payload.excel;
    },
    setDcbReportData: (state: any, action: any) => {
      state.isLoading = false;
      state.dcbReportData = action.payload.data;
      state.dcbReportExcel = action.payload.excel;
    },
    setDefaultersReportData: (state: any, action: any) => {
      state.isLoading = false;
      state.defaultersReportData = action.payload;
    },
    setDailySummaryReportData: (state: any, action: any) => {
      state.isLoading = false;
      state.dailySummaryReportData = action.payload;
    },
    setStandardReportData: (state: any, action: any) => {
      state.isLoading = false;
      state.standardReportData = action.payload.data;
      state.standardReportExcel = action.payload.excel;
    },
    setDetailedReportData: (state: any, action: any) => {
      state.isLoading = false;
      state.detailedReportData = action.payload;
    },
    setPaymentModeReportData: (state: any, action: any) => {
      state.isLoading = false;
      state.paymentModeReportData = action.payload.data;
      state.paymentModeReportExcel = action.payload.excel;
    },
    tryFetchNewDefaulterReportData: (state: any, action: any) => {
      state.isLoading = true;
    },
    setNewDefaulterReportData: (state: any, action: any) => {
      state.isLoading = false;
      state.newDefaultersReportData = action.payload.data;
      state.newDefaultersReportExcel = action.payload.excel;
    },
    tryFetchNewDefaulterWithDCBReportData: (state: any, action: any) => {
      state.isLoading = true;
    },
    setNewDefaulterWithDCBReportData: (state: any, action: any) => {
      state.isLoading = false;
      state.newDefaultersWithDCBReportData = action.payload;
    },
    tryFetchConsolidatedReportData: (state: any, action: any) => {
      state.isLoading = true;
    },
    setNewConsolidatedReportData: (state: any, action: any) => {
      state.isLoading = false;
      state.consolidatedReport = action.payload.data;
      state.consolidatedReportExcel = action.payload.excel;
    },
    tryFetchNewDefaulterWithDate: (state: any, action: any) => {
      state.isLoading = true;
    },
    setNewDefaulterWithDate: (state: any, action: any) => {
      state.isLoading = false;
      state.newDefaultersWithDate = action.payload;
    },
    tryFetchConcessionReportData: (state) => {
      state.isLoading = true;
    },
    setConcessionReportData: (state: any, action: any) => {
      state.isLoading = false;
      state.concessionReport = action.payload;
      // state.concessionReportExcel = action.payload.excel;
    },
    tryFetchMiscellaneousReportData: (state: any, action: any) => {
      state.isLoading = true;
    },
    setMiscellaneousReportData: (state: any, action: any) => {
      state.isLoading = false;
      state.miscellaneousReport = action.payload.data;
      state.miscellaneousReportExcel = action.payload.excel;
      // state.concessionReportExcel = action.payload.excel;
    },
    tryFetchConsolidatedPaymentHistoryReportData: (state: any, action: any) => {
      state.isLoading = true;
    },
    setConsolidatedPaymentHistoryReportData: (state: any, action: any) => {
      state.isLoading = false;
      state.consolidatedPaymentHistoryReport = action.payload.data;
    },
    tryFetchDailyFeeCollectionReportData: (state: any, action: any) => {
      state.isLoading = true;
    },
    setDailyFeeCollectionReportData: (state: any, action: any) => {
      state.isLoading = false;
      state.dailyFeeCollectionReportData = action.payload.data;
    },
    tryFetchTermWiseReportData: (state: any) => {
      state.isLoading = true;
    },
    setTermWiseReportData: (state: any, action: any) => {
      state.isLoading = false;
      state.TermWiseReportData = action.payload.data;
    },
    setMiscReportFilters: (state, action) => {
      state.miscFilters = action.payload;
    },
  },
});

export const {
  tryFetchConsolidatedPaymentHistoryReportData,
  setConsolidatedPaymentHistoryReportData,
  tryFetchMiscellaneousReportData,
  setMiscellaneousReportData,
  tryFetchDetailedFeeReportData,
  setDetailedFeeReportData,
  tryFetchPaymentReportData,
  setPaymentReportData,
  tryFetchDcbReportData,
  setDcbReportData,
  tryFetchDefaultersReportData,
  setDefaultersReportData,
  tryFetchDailySummaryReportData,
  setDailySummaryReportData,
  setStandardReportData,
  setDetailedReportData,
  tryFetchPaymentModeReportData,
  setPaymentModeReportData,
  tryFetchHeadWiseReportData,
  setHeadWiseReportData,
  tryFetchNewDefaulterReportData,
  setNewDefaulterReportData,
  tryFetchNewDefaulterWithDCBReportData,
  setNewDefaulterWithDCBReportData,
  tryFetchConsolidatedReportData,
  setNewConsolidatedReportData,
  tryFetchNewDefaulterWithDate,
  setNewDefaulterWithDate,
  tryFetchConcessionReportData,
  setConcessionReportData,
  tryFetchDailyFeeCollectionReportData,
  setDailyFeeCollectionReportData,
  tryFetchTermWiseReportData,
  setTermWiseReportData,
  setMiscReportFilters
} = paymentReportSlice.actions;

export default paymentReportSlice.reducer;
