import { createSelector, createSlice } from "@reduxjs/toolkit";
import { Action } from "@remix-run/router";

interface FeeState {
  isLoading: boolean;
  feeData: any;
  rawData1: any;
  rawData2: any;
  rawData3: any;
  rawData4: any;
  rawData5: any;
  rawData6: any;
  busFee: any;
  hostelFee: any;
  admissionFeeRaw: any;
  cautionDepositRaw: any;
  diaryFee: any;
  rawName1: string;
  rawName2: string;
  rawName3: string;
  rawName4: string;
  rawName5: string;
  rawName6: string;
  busFeeName: string;
  diaryFeeName: string;
  hostelFeeName: string;
  admissionFeeName: string;
  cautionDepositName: string;
  academicFine: number;
  busFine: number;
  hostelFine: number;
  rawFine1: number;
  rawFine2: number;
  rawFine3: number;
  rawFine4: number;
  rawFine5: number;
  rawFine6: number;
  rawSum1: number;
  rawSum2: number;
  rawSum3: number;
  rawSum4: number;
  rawSum5: number;
  rawSum6: number;
  rawBusSum: number;
  hostelSum: number;
  admissionFeeSum: number;
  cautionDepositSum: number;
  diaryFeeSum: number;
  allRawTotal: number;
  selectedMonth: any;
  calculatedFine: any;
  totalFineSum: any;
}

const feeState: FeeState = {
  isLoading: false,
  feeData: {},
  rawData1: [],
  rawData2: [],
  rawData3: [],
  rawData4: [],
  rawData5: [],
  rawData6: [],
  busFee: [],
  hostelFee: [],
  admissionFeeRaw: [],
  cautionDepositRaw: [],
  diaryFee: [],
  rawName1: "",
  rawName2: "",
  rawName3: "",
  rawName4: "",
  rawName5: "",
  rawName6: "",

  busFeeName: "",
  diaryFeeName: "",
  hostelFeeName: "",
  admissionFeeName: "",
  cautionDepositName: "",
  academicFine: 0,
  busFine: 0,
  hostelFine: 0,
  rawFine1: 0,
  rawFine2: 0,
  rawFine3: 0,
  rawFine4: 0,
  rawFine5: 0,
  rawFine6: 0,
  rawSum1: 0,
  rawSum2: 0,
  rawSum3: 0,
  rawSum4: 0,
  rawSum5: 0,
  rawSum6: 0,

  rawBusSum: 0,
  hostelSum: 0,
  admissionFeeSum: 0,
  cautionDepositSum: 0,
  diaryFeeSum: 0,
  allRawTotal: 0,
  selectedMonth: [],
  calculatedFine: 0,
  totalFineSum: 0,
};

const feeSlice = createSlice({
  name: "fees",
  initialState: feeState,
  reducers: {
    tryFetchFeeTableData: (state: FeeState, action: any) => {
      state.isLoading = true;
    },
    setFeeData: (state: FeeState, action: any) => {
      state.isLoading = false;
      state.feeData = action.payload;
    },
    setRawData1: (state: FeeState, action: any) => {
      let totalSum = 0;
      let totalFine = 0;
      var oldData = [...state.rawData1];
      if (action.payload.amount > 0) {
        var tableData = {
          id: action.payload.id,
          amount: action.payload.amount,
          monthId: action.payload.monthId,
          fine: action.payload.fine,
          fee_settings_id: action.payload.fee_settings_id,
        };
        var index = oldData.findIndex((x) => x.id === action.payload.id);
        if (index === -1 && action.payload.isSelected) {
          oldData.push(tableData);
        } else {
          oldData.splice(index, 1);
        }
      }
      totalSum = oldData.reduce((a, v) => (a = a + v.amount), 0);
      totalFine = oldData.reduce((a, v) => (a = a + v.fine), 0);

      return {
        ...state,
        rawData1: oldData,
        rawName1: action.payload.name,
        rawSum1: totalSum,
        rawFine1: totalFine,
      };
    },
    setRawData2: (state: FeeState, action: any) => {
      let totalSum = 0;
      let totalFine = 0;
      var oldData = [...state.rawData2];
      var selMonth = [...state.selectedMonth];
      if (action.payload.amount > 0) {
        var tableData = {
          id: action.payload.id,
          amount: action.payload.amount,
          monthId: action.payload.monthId,
          fine: action.payload.fine,
          fee_settings_id: action.payload.fee_settings_id,
        };
        var index = oldData.findIndex((x) => x.id === action.payload.id);
        if (index === -1 && action.payload.isSelected) {
          oldData.push(tableData);
        } else {
          oldData.splice(index, 1);
        }
      }
      totalSum = oldData.reduce((a, v) => (a = a + v.amount), 0);
      totalFine = oldData.reduce((a, v) => (a = a + v.fine), 0);
      return {
        ...state,
        rawData2: oldData,
        rawName2: action.payload.name,
        rawSum2: totalSum,
        rawFine2: totalFine,
      };
    },
    setRawData3: (state: FeeState, action: any) => {
      let totalSum = 0;
      let totalFine = 0;
      var oldData = [...state.rawData3];
      var selMonth = [...state.selectedMonth];
      if (action.payload.amount > 0) {
        var tableData = {
          id: action.payload.id,
          amount: action.payload.amount,
          monthId: action.payload.monthId,
          fine: action.payload.fine,
          fee_settings_id: action.payload.fee_settings_id,
        };
        var index = oldData.findIndex((x) => x.id === action.payload.id);
        if (index === -1 && action.payload.isSelected) {
          oldData.push(tableData);
        } else {
          oldData.splice(index, 1);
        }
      }
      totalSum = oldData.reduce((a, v) => (a = a + v.amount), 0);
      totalFine = oldData.reduce((a, v) => (a = a + v.fine), 0);
      return {
        ...state,
        rawData3: oldData,
        rawName3: action.payload.name,
        rawSum3: totalSum,
        rawFine3: totalFine,
      };
    },
    setRawData4: (state: FeeState, action: any) => {
      let totalSum = 0;
      let totalFine = 0;
      var oldData = [...state.rawData4];
      var selMonth = [...state.selectedMonth];
      if (action.payload.amount > 0) {
        var tableData = {
          id: action.payload.id,
          amount: action.payload.amount,
          monthId: action.payload.monthId,
          fine: action.payload.fine,
          fee_settings_id: action.payload.fee_settings_id,
        };
        var index = oldData.findIndex((x) => x.id === action.payload.id);
        if (index === -1 && action.payload.isSelected) {
          oldData.push(tableData);
        } else {
          oldData.splice(index, 1);
        }
      }
      totalSum = oldData.reduce((a, v) => (a = a + v.amount), 0);
      totalFine = oldData.reduce((a, v) => (a = a + v.fine), 0);
      return {
        ...state,
        rawData4: oldData,
        rawName4: action.payload.name,
        rawSum4: totalSum,
        rawFine4: totalFine,
      };
    },
    setRawData5: (state: FeeState, action: any) => {
      let totalSum = 0;
      let totalFine = 0;
      var oldData = [...state.rawData5];
      var selMonth = [...state.selectedMonth];
      if (action.payload.amount > 0) {
        var tableData = {
          id: action.payload.id,
          amount: action.payload.amount,
          monthId: action.payload.monthId,
          fine: action.payload.fine,
          fee_settings_id: action.payload.fee_settings_id,
        };
        var index = oldData.findIndex((x) => x.id === action.payload.id);
        if (index === -1 && action.payload.isSelected) {
          oldData.push(tableData);
        } else {
          oldData.splice(index, 1);
        }
      }
      totalSum = oldData.reduce((a, v) => (a = a + v.amount), 0);
      totalFine = oldData.reduce((a, v) => (a = a + v.fine), 0);
      return {
        ...state,
        rawData5: oldData,
        rawName5: action.payload.name,
        rawSum5: totalSum,
        rawFine5: totalFine,
      };
    },
    setRawData6: (state: FeeState, action: any) => {
      let totalSum = 0;
      let totalFine = 0;
      var oldData = [...state.rawData6];
      var selMonth = [...state.selectedMonth];
      if (action.payload.amount > 0) {
        var tableData = {
          id: action.payload.id,
          amount: action.payload.amount,
          monthId: action.payload.monthId,
          fine: action.payload.fine,
          fee_settings_id: action.payload.fee_settings_id,
        };
        var index = oldData.findIndex((x) => x.id === action.payload.id);
        if (index === -1 && action.payload.isSelected) {
          oldData.push(tableData);
        } else {
          oldData.splice(index, 1);
        }
      }
      totalSum = oldData.reduce((a, v) => (a = a + v.amount), 0);
      totalFine = oldData.reduce((a, v) => (a = a + v.fine), 0);
      return {
        ...state,
        rawData6: oldData,
        rawName6: action.payload.name,
        rawSum6: totalSum,
        rawFine6: totalFine,
      };
    },
    setAdmissionFeeRaw: (state: FeeState, action: any) => {
      let totalSum = 0;
      let totalFine = 0;
      var oldData = [...state.admissionFeeRaw];
      var selMonth = [...state.selectedMonth];
      if (action.payload.amount > 0) {
        var tableData = {
          id: action.payload.id,
          amount: action.payload.amount,
          monthId: action.payload.monthId,
          fine: action.payload.fine,
        };
        var index = oldData.findIndex((x) => x.id === action.payload.id);
        if (index === -1 && action.payload.isSelected) {
          oldData.push(tableData);
        } else {
          oldData.splice(index, 1);
        }
      }
      totalSum = oldData.reduce((a, v) => (a = a + v.amount), 0);
      totalFine = oldData.reduce((a, v) => (a = a + v.fine), 0);
      return {
        ...state,
        admissionFeeRaw: oldData,
        admissionFeeName: action.payload.name,
        admissionFeeSum: totalSum,
      };
    },
    setCautionDepositRaw: (state: FeeState, action: any) => {
      let totalSum = 0;
      let totalFine = 0;
      var oldData = [...state.cautionDepositRaw];
      var selMonth = [...state.selectedMonth];
      if (action.payload.amount > 0) {
        var tableData = {
          id: action.payload.id,
          amount: action.payload.amount,
          monthId: action.payload.monthId,
          fine: action.payload.fine,
        };
        var index = oldData.findIndex((x) => x.id === action.payload.id);
        if (index === -1 && action.payload.isSelected) {
          oldData.push(tableData);
        } else {
          oldData.splice(index, 1);
        }
      }
      totalSum = oldData.reduce((a, v) => (a = a + v.amount), 0);
      totalFine = oldData.reduce((a, v) => (a = a + v.fine), 0);
      return {
        ...state,
        cautionDepositRaw: oldData,
        cautionDepositName: action.payload.name,
        cautionDepositSum: totalSum,
      };
    },
    setBusFee: (state: FeeState, action: any) => {
      let totalSum = 0;
      let totalFine = 0;
      var oldData = [...state.busFee];

      var tableData = {
        id: action.payload.id,
        amount: action.payload.amount,
        monthId: action.payload.monthId,
        fine: action.payload.fine,
        fee_settings_id: action.payload.fee_settings_id,
      };
      var index = oldData.findIndex((x) => x.id === action.payload.id);
      if (index === -1 && action.payload.isSelected) {
        oldData.push(tableData);
      } else {
        oldData.splice(index, 1);
      }
      // index === -1 ? oldData.push(tableData) : oldData.splice(index, 1);

      totalSum = oldData.reduce((a, v) => (a = a + v.amount), 0);
      totalFine = oldData.reduce((a, v) => (a = a + v.fine), 0);
      return {
        ...state,
        busFee: oldData,
        busFeeName: action.payload.name,
        rawBusSum: totalSum,
        busFine: totalFine,
      };
    },
    setDiaryFee: (state: FeeState, action: any) => {
      let totalSum = 0;
      let totalFine = 0;
      var oldData = [...state.diaryFee];
      console.log("setDiaryFee action", action);

      var tableData = {
        id: action.payload.id,
        name: action.payload.name,
        amount: action.payload.amount,
        monthId: action.payload.monthId,
        fine: action.payload.fine,
      };
      var index = oldData.findIndex((x) => x.id === action.payload.id);
      if (index === -1 && action.payload.isSelected) {
        oldData.push(tableData);
      } else {
        oldData.splice(index, 1);
      }
      // index === -1 ? oldData.push(tableData) : oldData.splice(index, 1);

      totalSum = oldData.reduce((a, v) => (a = a + v.amount), 0);
      totalFine = oldData.reduce((a, v) => (a = a + v.fine), 0);
      console.log("SET DIARY FEE", {
        diaryFee: oldData,
        diaryFeeName: action.payload.name,
        diaryFeeSum: totalSum,
      });
      return {
        ...state,
        diaryFee: oldData,
        diaryFeeName: action.payload.name,
        diaryFeeSum: totalSum,
      };
    },
    setHostelFee: (state: FeeState, action: any) => {
      let totalSum = 0;
      let totalFine = 0;
      var oldData = [...state.hostelFee];
      var tableData = {
        id: action.payload.id,
        amount: action.payload.amount,
        monthId: action.payload.monthId,
        fine: action.payload.fine,
        fee_settings_id: action.payload.fee_settings_id,
      };
      var index = oldData.findIndex((x) => x.id === action.payload.id);
      if (index === -1 && action.payload.isSelected) {
        oldData.push(tableData);
      } else {
        oldData.splice(index, 1);
      }
      // index === -1 ? oldData.push(tableData) : oldData.splice(index, 1);

      totalSum = oldData.reduce((a, v) => (a = a + v.amount), 0);
      totalFine = oldData.reduce((a, v) => (a = a + v.fine), 0);
      return {
        ...state,
        hostelFee: oldData,
        hostelFeeName: action.payload.name,
        hostelSum: totalSum,
        hostelFine: totalFine,
      };
    },
    setCalculatedFine: (state: FeeState, action: any) => {
      state.calculatedFine = action.payload;
    },
    setColumnTable: (state: FeeState, action: any) => {
      var oldData = [...state.selectedMonth];
      var selectedMonthData = {
        name: action.payload,
      };
      var index = oldData.findIndex((x: any) => x.name === action.payload);
      index === -1 ? oldData.push(selectedMonthData) : oldData.splice(index, 1);
      console.log("slected Month is", oldData);
      return {
        ...state,
        selectedMonth: oldData,
      };
    },

    calculateTotal: (state: FeeState) => {
      let allTotal = 0;
      let totalAcademicFine = 0;
      let totalFeeToBePaid = 0;
      let totalFine = 0;
      allTotal =
        state.rawSum1 +
        state.rawSum2 +
        state.rawSum3 +
        state.rawSum4 +
        state.rawSum5 +
        state.rawSum6 +
        state.rawBusSum +
        state.hostelSum +
        state.admissionFeeSum +
        state.cautionDepositSum +
        state.diaryFeeSum;
      totalAcademicFine =
        state.rawFine1 +
        state.rawFine2 +
        state.rawFine3 +
        state.rawFine4 +
        state.rawFine5 +
        state.rawFine6;
      totalFeeToBePaid =
        allTotal + totalAcademicFine + state.busFine + state.hostelFine;
      // state.totalFineSum = totalAcademicFine + state.busFine + state.hostelFine;
      totalFine = totalAcademicFine + state.busFine + state.hostelFine;
      return {
        ...state,
        allRawTotal: allTotal,
        academicFine: totalAcademicFine,
        totalFineSum: totalFine,
      };
    },

    clearRawDatas: (state: FeeState) => {
      return {
        ...state,
        feeData: {},
        rawData1: [],
        rawData2: [],
        rawData3: [],
        rawData4: [],
        rawData5: [],
        rawData6: [],
        busFee: [],
        hostelFee: [],
        admissionFeeRaw: [],
        cautionDepositRaw: [],
        diaryFee: [],
        rawName1: "",
        rawName2: "",
        rawName3: "",
        rawName4: "",
        rawName5: "",
        rawName6: "",

        busFeeName: "",
        diaryFeeName: "",
        hostelFeeName: "",
        admissionFeeName: "",
        cautionDepositName: "",
        academicFine: 0,
        busFine: 0,
        hostelFine: 0,
        rawFine1: 0,
        rawFine2: 0,
        rawFine3: 0,
        rawFine4: 0,
        rawFine5: 0,
        rawFine6: 0,
        rawSum1: 0,
        rawSum2: 0,
        rawSum3: 0,
        rawSum4: 0,
        rawSum5: 0,
        rawSum6: 0,

        rawBusSum: 0,
        hostelSum: 0,
        admissionFeeSum: 0,
        cautionDepositSum: 0,
        diaryFeeSum: 0,
        allRawTotal: 0,
        selectedMonth: [],

        totalFineSum: 0,
      };
    },
    clearTableDataAfterPay: (state: FeeState) => {
      return {
        ...state,
        rawData1: [],
        rawData2: [],
        rawData3: [],
        rawData4: [],
        rawData5: [],
        rawData6: [],
        busFee: [],
        hostelFee: [],
        admissionFeeRaw: [],
        cautionDepositRaw: [],
        diaryFee: [],
        rawName1: "",
        rawName2: "",
        rawName3: "",
        rawName4: "",
        rawName5: "",
        rawName6: "",
        busFeeName: "",
        diaryFeeName: "",
        hostelFeeName: "",
        admissionFeeName: "",
        cautionDepositName: "",
        academicFine: 0,
        busFine: 0,
        hostelFine: 0,
        rawFine1: 0,
        rawFine2: 0,
        rawFine3: 0,
        rawFine4: 0,
        rawFine5: 0,
        rawFine6: 0,
        rawSum1: 0,
        rawSum2: 0,
        rawSum3: 0,
        rawSum4: 0,
        rawSum5: 0,
        rawSum6: 0,
        rawBusSum: 0,
        hostelSum: 0,
        admissionFeeSum: 0,
        cautionDepositSum: 0,
        diaryFeeSum: 0,
        allRawTotal: 0,
        selectedMonth: [],
        totalFineSum: 0,
      };
    },
  },
});
// export const selectSelf = (state: any) => state.feeTable.feeData;
export const academicArray = createSelector(
  (state: any) => state,
  (fees: any) => {
    let months = [5, 6, 7, 8, 9, 10, 11, 12, 1, 2, 3];
    let filteredArray = [];
    let finalArray: any[] = [];
    var array1 = fees.feeTable.rawData1;
    var array2 = fees.feeTable.rawData2;
    var array3 = fees.feeTable.rawData3;
    var array4 = fees.feeTable.rawData4;
    var array5 = fees.feeTable.rawData5;
    var array6 = fees.feeTable.rawData6;
    var combinedArray = [
      ...array1,
      ...array2,
      ...array3,
      ...array4,
      ...array5,
      ...array6,
    ];
    months.map((month) => {
      filteredArray = combinedArray.filter((item) => month === item.monthId);
      if (filteredArray.length > 0) {
        finalArray.push(filteredArray[0].monthId);
      }
    });
    return finalArray;
  },
);
export const busFeeArray = createSelector(
  (state: any) => state,
  (fees: any) => {
    let finalArray: any[] = [];
    var array1 = fees.feeTable.busFee;

    finalArray = array1.map((item: any) => item.monthId);

    return finalArray;
  },
);
export const diaryFeeArray = createSelector(
  (state: any) => state,
  (fees: any) => {
    let finalArray: any[] = [];
    var array1 = fees.feeTable.diaryFee;

    finalArray = array1.map((item: any) => item.monthId);

    return finalArray;
  },
);
export const hostelFeeArray = createSelector(
  (state: any) => state,
  (fees: any) => {
    let finalArray: any[] = [];
    var array1 = fees.feeTable.hostelFee;

    finalArray = array1.map((item: any) => item.monthId);

    return finalArray;
  },
);
export const admissionFeeArray = createSelector(
  (state: any) => state,
  (fees: any) => {
    let finalArray: any[] = [];
    var array1 = fees.feeTable.admissionFeeRaw;

    finalArray = array1.map((item: any) => item.monthId);

    return finalArray;
  },
);
export const cautionDepositArray = createSelector(
  (state: any) => state,
  (fees: any) => {
    let finalArray: any[] = [];
    var array1 = fees.feeTable.cautionDepositRaw;

    finalArray = array1.map((item: any) => item.monthId);

    return finalArray;
  },
);
export const readmissionArray = createSelector(
  (state: any) => state,
  (fees: any) => {
    let finalArray: any[] = [];
    var array1 = fees.feeTable.cautionDepositRaw;

    finalArray = array1.map((item: any) => item.monthId);

    return finalArray;
  },
);
export const {
  tryFetchFeeTableData,
  setFeeData,
  setRawData1,
  setRawData2,
  setRawData3,
  setRawData4,
  setRawData5,
  setRawData6,
  setAdmissionFeeRaw,
  setCautionDepositRaw,
  clearRawDatas,
  clearTableDataAfterPay,
  calculateTotal,
  setColumnTable,
  setBusFee,
  setHostelFee,
  setCalculatedFine,
  setDiaryFee,
} = feeSlice.actions;

export default feeSlice.reducer;
