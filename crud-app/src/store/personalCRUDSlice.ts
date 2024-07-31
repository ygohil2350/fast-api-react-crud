import { GridValidRowModel } from "@mui/x-data-grid";
import { createSlice } from "@reduxjs/toolkit";
const initialState: { rows: GridValidRowModel[] } = {
  rows: [],
};
export const personalCRUDSlice = createSlice({
  name: "personalCRUDSlice",
  initialState,
  reducers: {
    addReduxPersonal: (state, action) => {
      state.rows = [...state.rows, action.payload];
    },
    updateReduxPersonal: (state, action) => {
      state.rows = state.rows.map((ele) => {
        if (ele.id === action.payload.id) return { ...action.payload, id: crypto.randomUUID };
        else return ele;
      });
    },
    deleteReduxPersonal: (state, action) => {
      state.rows = [...state.rows.filter((ele) => ele.id !== action.payload.id)];
    },
  },
});

export const { addReduxPersonal, updateReduxPersonal, deleteReduxPersonal } = personalCRUDSlice.actions;
