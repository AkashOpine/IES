import { createSelector, createSlice } from "@reduxjs/toolkit";
interface InitState {
  isLoading: boolean;
  //Academic Dcb
  academicDetailsDcb: any;
  academicDetailsDcbExcel: any;
  academicClassWiseDcb: any;
  academicClassWiseDcbExcel: any;
  academicConsolidatedDcb: any;
  academicConsolidatedDcbExcel: any;
  academicDefaulters: any;
  academicDefaultersExcel: any;

  //Transport dcb
  transportDetailsDcb: any;
  transportDetailsDcbExcel: any;
  transportRouteWiseDcb: any;
  transportRouteWiseDcbExcel: any;
  transportConsolidatedDcb: any;
  transportConsolidatedDcbExcel: any;

  //Hostel dcb
  hostelDetailsDcb: any;
  hostelDetailsDcbExcel: any;
  hostelTypeWiseDcb: any;
  hostelTypeWiseDcbExcel: any;
  hostelConsolidatedDcb: any;
  hostelConsolidatedDcbExcel: any;
}

const initState: InitState = {
  isLoading: false,
  //Academic dcb
  academicDetailsDcb: [],
  academicDetailsDcbExcel: "",
  academicClassWiseDcb: [],
  academicClassWiseDcbExcel: "",
  academicConsolidatedDcb: [],
  academicConsolidatedDcbExcel: "",
  academicDefaulters: [],
  academicDefaultersExcel: "",

  //Transport dcb
  transportDetailsDcb: [],
  transportDetailsDcbExcel: "",
  transportRouteWiseDcb: [],
  transportRouteWiseDcbExcel: "",
  transportConsolidatedDcb: [],
  transportConsolidatedDcbExcel: "",

  //Hostel dcb
  hostelDetailsDcb: [],
  hostelDetailsDcbExcel: "",
  hostelTypeWiseDcb: [],
  hostelTypeWiseDcbExcel: "",
  hostelConsolidatedDcb: [],
  hostelConsolidatedDcbExcel: "",
};

const dcbReportSlice = createSlice({
  name: "dcbReports",
  initialState: initState,
  reducers: {
    //Academic Dcbs
    tryFetchAcademicDetailsDcbData: (state, action) => {
      state.isLoading = true;
    },
    tryFetchAcademicClassWiseDcbData: (state, action) => {
      state.isLoading = true;
    },
    tryFetchAcademicConsolidatedDcbData: (state, action) => {
      state.isLoading = true;
    },
    tryFetchAcademicDefaultersData: (state, action) => {
      state.isLoading = true;
    },

    //Transport dcbs
    tryFetchTransportDetailsDcbData: (state, action) => {
      state.isLoading = true;
    },
    tryFetchTransportRouteWiseDcbData: (state, action) => {
      state.isLoading = true;
    },
    tryFetchTransportConsolidatedDcbData: (state, action) => {
      state.isLoading = true;
    },

    //Hostel Dcbs
    tryFetchHostelDetailsDcbData: (state, action) => {
      state.isLoading = true;
    },
    tryFetchHostelTypeWiseDcbData: (state, action) => {
      state.isLoading = true;
    },
    tryFetchHostelConsolidatedDcbData: (state, action) => {
      state.isLoading = true;
    },

    //Academic Dcbs
    setAcademicDetailsDcbData: (state: any, action: any) => {
      state.isLoading = false;
      state.academicDetailsDcb = action.payload.data;
      state.academicDetailsDcbExcel = action.payload.excel;
    },
    setAcademicClassWiseDcbData: (state: any, action: any) => {
      state.isLoading = false;
      state.academicClassWiseDcb = action.payload.data;
      state.academicClassWiseDcbExcel = action.payload.excel;
    },
    setAcademicConsolidatedDcbData: (state: any, action: any) => {
      state.isLoading = false;
      state.academicConsolidatedDcb = action.payload.data;
      state.academicConsolidatedDcbExcel = action.payload.excel;
    },

    setAcademicDefaultersData: (state: any, action: any) => {
      state.isLoading = false;
      state.academicDefaulters = action.payload.data;
      state.academicDefaultersExcel = action.payload.excel;
    },
    //Transport dcbs
    setTransportDetailsDcbData: (state: any, action: any) => {
      state.isLoading = false;
      state.transportDetailsDcb = action.payload.data;
      state.transportDetailsDcbExcel = action.payload.excel;
    },
    setTransportRouteWiseDcbData: (state: any, action: any) => {
      state.isLoading = false;
      state.transportRouteWiseDcb = action.payload.data;
      state.transportRouteWiseDcbExcel = action.payload.excel;
    },
    setTransportConsolidatedDcbData: (state: any, action: any) => {
      state.isLoading = false;
      state.transportConsolidatedDcb = action.payload.data;
      state.transportConsolidatedDcbExcel = action.payload.excel;
    },

    //Hostel Dcbs
    setHostelDetailsDcbData: (state: any, action: any) => {
      state.isLoading = false;
      state.hostelDetailsDcb = action.payload.data;
      state.hostelDetailsDcbExcel = action.payload.excel;
    },
    setHostelTypeWiseDcbData: (state: any, action: any) => {
      state.isLoading = false;
      state.hostelTypeWiseDcb = action.payload.data;
      state.hostelTypeWiseDcbExcel = action.payload.excel;
    },
    setHostelConsolidatedDcbData: (state: any, action: any) => {
      state.isLoading = false;
      state.hostelConsolidatedDcb = action.payload.data;
      state.hostelConsolidatedDcbExcel = action.payload.excel;
    },
  },
});

export const {
  //Accademic Dcbs
  tryFetchAcademicDetailsDcbData,
  setAcademicDetailsDcbData,
  tryFetchAcademicClassWiseDcbData,
  setAcademicClassWiseDcbData,
  tryFetchAcademicConsolidatedDcbData,
  setAcademicConsolidatedDcbData,
  tryFetchAcademicDefaultersData,
  setAcademicDefaultersData,

  //Transport dcbs
  tryFetchTransportDetailsDcbData,
  setTransportDetailsDcbData,
  tryFetchTransportRouteWiseDcbData,
  setTransportRouteWiseDcbData,
  tryFetchTransportConsolidatedDcbData,
  setTransportConsolidatedDcbData,

  //Hostel Dcbs
  tryFetchHostelDetailsDcbData,
  setHostelDetailsDcbData,
  tryFetchHostelTypeWiseDcbData,
  setHostelTypeWiseDcbData,
  tryFetchHostelConsolidatedDcbData,
  setHostelConsolidatedDcbData,
} = dcbReportSlice.actions;
export default dcbReportSlice.reducer;
