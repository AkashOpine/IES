import { createSlice } from "@reduxjs/toolkit";

interface InitState {
  isLoading: boolean;
  concessionList: any;
  specialConcession: any;
  excel: any;
}

const initState: InitState = {
  isLoading: false,
  concessionList: [],
  specialConcession: [],
  excel: [],
};

const concessionSlice = createSlice({
  name: "concession",
  initialState: initState,
  reducers: {
    tryFetchConcessionListData: (state) => {
      state.isLoading = true;
    },
    setConcessionListData: (state, action) => {
      state.isLoading = false;
      state.concessionList = action.payload.data;
      state.excel = action.payload.excel;
    },
    tryFetchSpecialConcessionData: (state, data) => {
      state.isLoading = true;
    },
    setSpecialConcessionData: (state, action) => {
      state.isLoading = false;
      state.specialConcession = action.payload.data;
      state.excel = action.payload.excel;
    },
  },
});

export const {
  tryFetchConcessionListData,
  setConcessionListData,
  tryFetchSpecialConcessionData,
  setSpecialConcessionData,
} = concessionSlice.actions;

export default concessionSlice.reducer;
