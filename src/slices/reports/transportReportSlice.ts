import { createSelector, createSlice } from "@reduxjs/toolkit";

interface InitState {
  isLoading: boolean;
  transportDefaultersReportData: any;
  transportDefaultersReportExcel: any;
  transportFuelReportData: any;
  transportMaintanenceReportData: any;
  transportListReportData: any;
  transportFeeCollectionReportData: any;
}
const initState: InitState = {
  isLoading: false,
  transportDefaultersReportData: [],
  transportDefaultersReportExcel: "",
  transportFuelReportData: [],
  transportMaintanenceReportData: [],
  transportListReportData: [],
  transportFeeCollectionReportData: [],
};

const transportReportSlice = createSlice({
  name: "transportreport",
  initialState: initState,
  reducers: {
    tryFetchTransportDefaultersReportData: (state, action) => {
      state.isLoading = true;
    },
    setTransportDefaultersReportData: (state: any, action: any) => {
      state.isLoading = false;
      state.transportDefaultersReportData = action.payload.data;
      state.transportDefaultersReportExcel = action.payload.excel;
    },
    tryFetchTransportFuelReportData: (state, action) => {
      state.isLoading = true;
    },
    setTransportFuelReportData: (state: any, action: any) => {
      state.isLoading = false;
      state.transportFuelReportData = action.payload;
    },
    tryFetchTransportMaintanenceReportData: (state, action) => {
      state.isLoading = true;
    },
    setTransportMaintanenceReportData: (state: any, action: any) => {
      state.isLoading = false;
      state.transportMaintanenceReportData = action.payload;
    },
    tryFetchTransportListReportData: (state, action) => {
      state.isLoading = true;
    },
    setTransportListReportData: (state: any, action: any) => {
      state.isLoading = false;
      state.transportListReportData = action.payload;
    },
    tryFetchTransportFeeCollectionReportData: (state, action) => {
      state.isLoading = true;
    },
    setTransportFeeCollectionReportData: (state: any, action: any) => {
      state.isLoading = false;
      state.transportFeeCollectionReportData = action.payload;
    },
  },
});

export const {
  tryFetchTransportDefaultersReportData,
  setTransportDefaultersReportData,
  tryFetchTransportFuelReportData,
  setTransportFuelReportData,
  tryFetchTransportMaintanenceReportData,
  setTransportMaintanenceReportData,
  tryFetchTransportListReportData,
  setTransportListReportData,
  tryFetchTransportFeeCollectionReportData,
  setTransportFeeCollectionReportData,
} = transportReportSlice.actions;

export default transportReportSlice.reducer;
