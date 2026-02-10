import { createSelector, createSlice } from "@reduxjs/toolkit";

interface InitState {
  isLoading: boolean;
  hostelDefaultersReportData: any;
  hostelDefaultersReportExcel: any;
  hostelListReportData: any;
  hostelListReportExcel: any;
}

const initState: InitState = {
  isLoading: false,
  hostelDefaultersReportData: [],
  hostelDefaultersReportExcel: "",
  hostelListReportData: [],
  hostelListReportExcel: "",
};

const hostelReportSlice = createSlice({
  name: "hostelreport",
  initialState: initState,
  reducers: {
    tryFetchHostelDefaultersReportData: (state, action) => {
      state.isLoading = true;
    },
    setHostelDefaultersReportData: (state: any, action: any) => {
      state.isLoading = false;
      state.hostelDefaultersReportData = action.payload.data;
      state.hostelDefaultersReportExcel = action.payload.excel;
    },
    tryFetchHostelListReportData: (state, action) => {
      state.isLoading = true;
    },
    setHostelListReportData: (state: any, action: any) => {
      state.isLoading = false;
      state.hostelListReportData = action.payload.data;
      state.hostelListReportExcel = action.payload.excel;
    },
  },
});

export const {
  tryFetchHostelDefaultersReportData,
  setHostelDefaultersReportData,
  tryFetchHostelListReportData,
  setHostelListReportData,
} = hostelReportSlice.actions;

export default hostelReportSlice.reducer;
