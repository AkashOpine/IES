import { createSelector, createSlice } from "@reduxjs/toolkit";

interface InitState {
  isLoading: boolean;
  receiptData: any;
  preBookingTableData: any;
}

const initState: InitState = {
  isLoading: false,
  receiptData: {},
  preBookingTableData: [],
};

const receiptSlice = createSlice({
  name: "receipt",
  initialState: initState,
  reducers: {
    tryFetchReceiptData: (state, action) => {
      state.isLoading = true;
    },
    setReceiptData: (state: any, action: any) => {
      state.isLoading = false;
      state.receiptData = action.payload;
    },
    clearRecieptData: (state: any) => {
      state.isLoading = false;
      state.receiptData = {};
    },
    tryFetchPreBookingTableData: (state) => {
      state.isLoading = true;
    },
    setPreBookingTableData: (state: any, action: any) => {
      state.isLoading = false;
      state.preBookingTableData = action.payload;
    },
  },
});

export const {
  tryFetchReceiptData,
  setReceiptData,
  tryFetchPreBookingTableData,
  setPreBookingTableData,
  clearRecieptData,
} = receiptSlice.actions;

export default receiptSlice.reducer;
