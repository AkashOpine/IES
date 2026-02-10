import { createSelector, createSlice } from "@reduxjs/toolkit";

interface InitState {
  isLoading: boolean;
  hostelStudentData: any;
  hostelTypeListData: any;
  roomTypeListData: any;
  hostelDetails: any;
  singleHostelerDetails: any;
}

const initState: InitState = {
  isLoading: false,
  hostelStudentData: [],
  hostelTypeListData: [],
  roomTypeListData: [],
  hostelDetails: {},
  singleHostelerDetails: {},
};

const hostelSlice = createSlice({
  name: "hostel",
  initialState: initState,
  reducers: {
    tryFetchHostelStudentData: (state) => {
      state.isLoading = true;
    },
    setHostelStudentData: (state: any, action: any) => {
      state.isLoading = false;
      state.hostelStudentData = action.payload;
    },

    tryFetchHostelRequiredList: (state) => {
      state.isLoading = true;
    },
    setHostelTypeList: (state: any, action: any) => {
      state.isLoading = false;
      state.hostelTypeListData = action.payload;
    },
    setRoomTypeList: (state: any, action: any) => {
      state.isLoading = false;
      state.roomTypeListData = action.payload;
    },
    tryFetchHostelDetails: (state: any, action: any) => {
      state.isLoading = true;
    },
    setHostelDetails: (state: any, action: any) => {
      state.isLoading = false;
      state.hostelDetails = action.payload;
    },
    tryFetchSingleHostelerDetails: (state: any, action: any) => {
      state.isLoading = true;
    },
    setSingleHostelerDetails: (state: any, action: any) => {
      state.isLoading = false;
      state.singleHostelerDetails = action.payload;
    },
  },
});

export const {
  tryFetchHostelStudentData,
  setHostelStudentData,
  tryFetchHostelRequiredList,
  setHostelTypeList,
  setRoomTypeList,
  tryFetchHostelDetails,
  setHostelDetails,
  tryFetchSingleHostelerDetails,
  setSingleHostelerDetails,
} = hostelSlice.actions;

export default hostelSlice.reducer;
