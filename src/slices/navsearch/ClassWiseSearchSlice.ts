import { createSelector, createSlice } from "@reduxjs/toolkit";

interface InitState {
  isLoading: boolean;
  classList: any;
  studentSearch: any;
  autoCompleteSearch: any;
  newAutoCompleteSearch: any;
}

const initState: InitState = {
  isLoading: false,
  classList: [],
  studentSearch: [],
  autoCompleteSearch: [],
  newAutoCompleteSearch: [],
};

const classListSlice = createSlice({
  name: "classList",
  initialState: initState,
  reducers: {
    tryFetchClassSearchList: (state, action) => {
      state.isLoading = true;
    },
    tryFetchStudentSearchList: (state, action) => {
      state.isLoading = true;
    },
    tryFetchAutoCompleteSearch: (state, action) => {
      state.isLoading = true;
    },
    tryFetchNewAutoCompleteSearch: (state, action) => {
      state.isLoading = true;
    },
    setClassSearchList: (state: any, action: any) => {
      state.isLoading = false;
      state.classList = action.payload;
    },
    setStudentSearch: (state: any, action: any) => {
      state.isLoading = false;
      state.studentSearch = action.payload;
    },
    setAutoCompleteSearcgResult: (state: any, action: any) => {
      state.isLoading = false;
      state.autoCompleteSearch = action.payload;
    },
    setNewAutoCompleteSearchResult: (state: any, action: any) => {
      state.isLoading = false;
      state.newAutoCompleteSearch = action.payload;
    },
    clearSearch: (state: any) => {
      state.studentSearch = [];
      state.autoCompleteSearch = [];
      state.newAutoCompleteSearch = [];
    },
    clearClassList: (state: any) => {
      state.classList = [];
    },
  },
});

export const {
  tryFetchClassSearchList,
  setClassSearchList,
  tryFetchStudentSearchList,
  setStudentSearch,
  tryFetchAutoCompleteSearch,
  setAutoCompleteSearcgResult,
  clearSearch,
  clearClassList,
  tryFetchNewAutoCompleteSearch,
  setNewAutoCompleteSearchResult,
} = classListSlice.actions;

export default classListSlice.reducer;
