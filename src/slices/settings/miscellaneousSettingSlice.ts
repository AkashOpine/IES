import { createSelector, createSlice } from "@reduxjs/toolkit";

interface InitState {
  isLoading: boolean;
  miscellaneousSettingList: any;
  addFeeHead: any;
  receiptData: any;
}

const initState: InitState = {
  isLoading: false,
  miscellaneousSettingList: [],
  addFeeHead: [],
  receiptData: {},
};

const miscellaneousSettingSlice = createSlice({
  name: "miscellaneousSetting",
  initialState: initState,
  reducers: {
    tryFetchMiscellaneousSettingList: (state) => {
      state.isLoading = true;
    },
    setMiscellaneousSettingList: (state, action) => {
      state.isLoading = false;
      state.miscellaneousSettingList = action.payload;
    },
    setDefaultFeeHead: (state: any) => {
      var tableData = {
        fee_head_id: "",
        amount: "",
      };
      state.addFeeHead = [...state.addFeeHead, tableData];
      // return {
      //   ...state,
      //   addFeeHead: [...state.addFeeHead, tableData],
      // };
    },
    deleteFeeHeadDiv: (state, action) => {
      var array = [...state.addFeeHead];
      if (action.payload !== -1) {
        array.splice(action.payload, 1);
      }
      return {
        ...state,
        addFeeHead: array,
      };
    },
    // updateFeeHeadDiv: (state, action: any) => {
    //   console.log("feehead slice", action);
    //   state.addFeeHead[action.payload.index][action.payload.name] =
    //     action.payload.value;
    // },
    updateFeeHeadDiv: (state, action: any) => {
      console.log("feehead slice", action);
      // Ensure addFeeHead is initialized as an array if it's undefined
      if (!state.addFeeHead) {
        state.addFeeHead = [];
      }
      // Ensure the array at the specified index is initialized
      if (!state.addFeeHead[action.payload.index]) {
        state.addFeeHead[action.payload.index] = {};
      }
      // Set the property value
      state.addFeeHead[action.payload.index][action.payload.name] =
        action.payload.value;
    },
    clearFeeHeadDiv: (state) => {
      state.addFeeHead = [
        {
          fee_head_id: "",
          amount: "",
        },
      ];
    },
    tryGenerateReceipt: (state, action: any) => {
      state.isLoading = true;
    },
    setReceiptData: (state, action: any) => {
      state.isLoading = false;
      state.receiptData = action.payload;
    },
  },
});

export const {
  tryFetchMiscellaneousSettingList,
  setMiscellaneousSettingList,
  setDefaultFeeHead,
  deleteFeeHeadDiv,
  updateFeeHeadDiv,
  clearFeeHeadDiv,
  tryGenerateReceipt,
  setReceiptData,
} = miscellaneousSettingSlice.actions;

export default miscellaneousSettingSlice.reducer;
