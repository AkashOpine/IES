import { takeLatest, call, put } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import { tryFetchClassSearchList } from "../../slices/navsearch/ClassWiseSearchSlice";
import { setClassWiseFilters } from "../../slices/classWiseSlice/classWiseSlice";

function* handleClassWiseFilters(
  action: PayloadAction<{
    year: string;
    classId: string;
    divisionId: string;
  }>
) {
  try {
    yield put(
      tryFetchClassSearchList({
        year: action.payload.year,
        classSearch: action.payload.classId,
        divisionSearch: action.payload.divisionId,
      })
    );
  } catch (error) {
    console.error("Class wise saga error", error);
  }
}

export function* classWiseSaga() {
  yield takeLatest(
    setClassWiseFilters.type,
    handleClassWiseFilters
  );
}
