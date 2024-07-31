import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { personalCRUDSlice } from "./personalCRUDSlice";

export const store = configureStore({
  reducer: {
    personalCRUDSlice: personalCRUDSlice.reducer,
  },
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(), // For API's
});

export type AppDispatch = typeof store.dispatch;
export type AppState = ReturnType<typeof store.getState>;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;
