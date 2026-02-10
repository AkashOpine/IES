import { createSlice } from "@reduxjs/toolkit";

interface InitState {
  isLoading: boolean;
  preRegistrationReport: any;
  admissionFeeReport: any;
  studentPaymentTypeReport: any;
}

const initState: InitState = {
  isLoading: false,
  preRegistrationReport: [],
  admissionFeeReport: [],
  studentPaymentTypeReport: [],
};

const PreRegistration = createSlice({
  name: "preRegistration",
  initialState: initState,
  reducers: {
    tryFetchPreRegistrationReport: (state, action) => {
      state.isLoading = true;
    },
    SetPreRegistrationReport: (state, action) => {
      state.isLoading = false;
      state.preRegistrationReport = action.payload;
    },
    tryFetchAdmissionFeeReport: (state, action) => {
      state.isLoading = true;
    },
    SetAdmissionFeeReport: (state, action) => {
      state.isLoading = false;
      state.admissionFeeReport = action.payload;
    },
    tryFetchStudentPaymentTypeReport: (state, action) => {
      state.isLoading = true;
    },
    SetStudentPaymentTypeReport: (state, action) => {
      state.isLoading = false;
      state.studentPaymentTypeReport = action.payload;
    },
  },
});

export const {
  tryFetchPreRegistrationReport,
  SetPreRegistrationReport,
  tryFetchAdmissionFeeReport,
  SetAdmissionFeeReport,
  tryFetchStudentPaymentTypeReport,
  SetStudentPaymentTypeReport,
} = PreRegistration.actions;

export default PreRegistration.reducer;
