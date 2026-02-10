import { createSlice } from "@reduxjs/toolkit";

interface InitState {
  isLoading: boolean;
  transportListTableData: any;
  addTransportDocuments: any;
  transportStudentListData: any;
  driverListData: any;
  pickupPointListData: any;
  routeListData: any;
  fuelListData: any;
  routeId: any;
  academicYear: any;
  vehicleProfileData: any;
  driverProfileData: any;
  pickupPointDetails: any;
  repairListData: any;
  transportStudentListExcel: any;
}

const initState: InitState = {
  isLoading: false,
  transportListTableData: [],
  addTransportDocuments: [],
  transportStudentListData: [],
  driverListData: [],
  pickupPointListData: [],
  routeListData: [],
  fuelListData: [],
  routeId: "",
  academicYear: "",
  vehicleProfileData: {},
  driverProfileData: {},
  pickupPointDetails: [],
  repairListData: [],
  transportStudentListExcel: "",
};

const transportSlice = createSlice({
  name: "transport",
  initialState: initState,
  reducers: {
    tryFetchTransportListData: (state) => {
      state.isLoading = true;
    },
    setTransportListData: (state, action) => {
      state.isLoading = true;
      state.transportListTableData = action.payload;
    },
    setDefaultDocument: (state) => {
      var tableData = {
        name: "",
        expiry: "",
        vfile: "",
      };
      return {
        ...state,
        addTransportDocuments: [...state.addTransportDocuments, tableData],
      };
    },
    deleteDocuments: (state, action) => {
      var array = [...state.addTransportDocuments];
      if (action.payload !== -1) {
        array.splice(action.payload, 1);
      }
      return {
        ...state,
        addTransportDocuments: array,
      };
    },
    updateDocumentDetails: (state, action: any) => {
      // state.addTransportDocuments[action.payload.index][action.payload.name] =
      //   action.payload.value;
      if (action.payload.name === "vfile") {
        console.log("selected file", action.payload.value);
        state.addTransportDocuments[action.payload.index][action.payload.name] =
          action.payload.value;
      } else {
        state.addTransportDocuments[action.payload.index][action.payload.name] =
          action.payload.value;
      }
    },
    clearDocumentDetails: (state) => {
      state.addTransportDocuments = [
        {
          name: "",
          expiry: "",
          vfile: "",
        },
      ];
    },
    tryFetchTransportStudentListData: (state, action) => {
      state.isLoading = true;
    },
    setTransportStudentListData: (state, action) => {
      console.log("");
      state.isLoading = true;
      state.transportStudentListData = action.payload.data;
      state.transportStudentListExcel = action.payload.excel;
    },
    tryFetchDriverListData: (state) => {
      state.isLoading = true;
    },
    setDriverListData: (state, action) => {
      state.isLoading = true;
      state.driverListData = action.payload;
    },
    tryFetchPickupPointListData: (state, action) => {
      state.isLoading = true;
      state.academicYear = action.payload.year;
      state.routeId = action.payload.route;
    },
    setPickupPointListData: (state, action) => {
      state.isLoading = true;
      state.pickupPointListData = action.payload;
    },
    tryFetchRouteListData: (state) => {
      state.isLoading = true;
    },
    setRouteListData: (state, action) => {
      state.isLoading = true;
      state.routeListData = action.payload;
    },

    tryFetchVehicleProfileData: (state, action) => {
      state.isLoading = true;
    },
    setVehicleProfileData: (state, action) => {
      state.isLoading = true;
      state.vehicleProfileData = action.payload;
    },
    tryFetchDriverProfileData: (state, action) => {
      state.isLoading = true;
    },
    setDriverProfileData: (state, action) => {
      state.isLoading = true;
      state.driverProfileData = action.payload;
    },
    tryFetchFuelListData: (state) => {
      state.isLoading = true;
    },
    setFuelListData: (state, action) => {
      state.isLoading = true;
      state.fuelListData = action.payload;
    },
    setDefaultPickupPoint: (state: any) => {
      var tableData = {
        pick_up_point: "",
        pick_up_fee: "",
        pick_up_time: "",
        drop_off_time: "",
        description: "",
      };
      state.pickupPointDetails = [...state.pickupPointDetails, tableData];
    },
    deletePickupPoint: (state, action) => {
      var array = [...state.pickupPointDetails];
      if (action.payload !== -1) {
        array.splice(action.payload, 1);
      }
      return {
        ...state,
        pickupPointDetails: array,
      };
    },
    updatePickupPoint: (state: any, action: any) => {
      console.log("pickupdata reducer", action.payload);
      state.pickupPointDetails[action.payload.index][action.payload.name] =
        action.payload.value;
    },
    clearPickupPoint: (state: any) => {
      return {
        ...state,
        pickupPointDetails: [],
      };
    },
    tryFetchRepairListData: (state) => {
      state.isLoading = true;
    },
    setRepairListData: (state, action) => {
      state.isLoading = true;
      state.repairListData = action.payload;
    },
  },
});

export const {
  tryFetchTransportListData,
  setTransportListData,
  setDefaultDocument,
  deleteDocuments,
  updateDocumentDetails,
  clearDocumentDetails,
  tryFetchTransportStudentListData,
  setTransportStudentListData,
  tryFetchDriverListData,
  setDriverListData,
  tryFetchPickupPointListData,
  setPickupPointListData,
  tryFetchRouteListData,
  setRouteListData,
  tryFetchVehicleProfileData,
  setVehicleProfileData,
  tryFetchDriverProfileData,
  setDriverProfileData,
  tryFetchFuelListData,
  setFuelListData,
  setDefaultPickupPoint,
  deletePickupPoint,
  updatePickupPoint,
  clearPickupPoint,
  tryFetchRepairListData,
  setRepairListData,
} = transportSlice.actions;

export default transportSlice.reducer;
