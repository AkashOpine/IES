import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ClassWiseState {
  year: string;
  classId: string;
  divisionId: string;
}

const initialState: ClassWiseState = {
  year: "",
  classId: "",
  divisionId: "",
};

const classWiseSlice = createSlice({
  name: "classWise",
  initialState,
  reducers: {
    setClassWiseFilters(
      state,
      action: PayloadAction<ClassWiseState>
    ) {
      state.year = action.payload.year;
      state.classId = action.payload.classId;
      state.divisionId = action.payload.divisionId;
    },

    clearClassWiseFilters(state) {
      state.year = "";
      state.classId = "";
      state.divisionId = "";
    },
  },
});

export const {
  setClassWiseFilters,
  clearClassWiseFilters,
} = classWiseSlice.actions;

export default classWiseSlice.reducer;
