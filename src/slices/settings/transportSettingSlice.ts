import { createSlice } from "@reduxjs/toolkit";

interface InitState {
  isLoading: boolean;
  transportSettingTableData: any;
  transportSettingRouteListData: any;
  transportSettingPickupListData: any;
  transportSettingFeeListData: any;
}

const initState: InitState = {
  isLoading: false,
  transportSettingTableData: {},
  transportSettingRouteListData: [],
  transportSettingPickupListData: [],
  transportSettingFeeListData: [],
};

const transportSettingSlice = createSlice({
  name: "transportsetting",
  initialState: initState,
  reducers: {
    tryFetchTransportSettingTableData: (state, action) => {
      state.isLoading = true;
    },
    tryFetchTransportSettingRouteListData: (state) => {
      state.isLoading = true;
    },
    tryFetchTransportSettingPickupListData: (state, action) => {
      state.isLoading = true;
    },
    tryFetchTransportSettingFeeListData: (state) => {
      state.isLoading = true;
    },
    setTransportSettingTableData: (state, action) => {
      state.isLoading = false;
      state.transportSettingTableData = action.payload;
    },
    setTransportSettingRouteListData: (state, action) => {
      state.isLoading = false;
      state.transportSettingRouteListData = action.payload;
    },
    setTransportSettingPickupListData: (state, action) => {
      state.isLoading = false;
      state.transportSettingPickupListData = action.payload;
    },
    setTransportSettingFeeListData: (state, action) => {
      state.isLoading = false;
      state.transportSettingFeeListData = action.payload;
    },
  },
});

export const {
  tryFetchTransportSettingTableData,
  setTransportSettingTableData,
  tryFetchTransportSettingRouteListData,
  setTransportSettingRouteListData,
  tryFetchTransportSettingPickupListData,
  setTransportSettingPickupListData,
  tryFetchTransportSettingFeeListData,
  setTransportSettingFeeListData,
} = transportSettingSlice.actions;

export default transportSettingSlice.reducer;
