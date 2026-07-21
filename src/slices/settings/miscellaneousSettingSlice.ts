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
    setDefaultFeeHead: (state: any, action: any) => {
      state.addFeeHead = action.payload;
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
    updateFeeHeadDiv: (state, action) => {
      const { index, ...fields } = action.payload;

      if (!state.addFeeHead[index]) {
        state.addFeeHead[index] = {
          fee_head_id: "",
          amount: "",
          remarks: "",
        };
      }

      state.addFeeHead[index] = {
        ...state.addFeeHead[index],
        ...fields,
      };
    },
    clearFeeHeadDiv: (state) => {
      state.addFeeHead = [
        {
          fee_head_id: "",
          amount: "",
          remarks: "",
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
