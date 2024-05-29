import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "../apis/authApi";
import { mainApi } from "../apis/mainApi";
import orderSlice from "../slices/orderSlice";
import utilsSlice from "./utilsSlice";

export default configureStore({
  reducer: {
    utils: utilsSlice,
    auth: authSlice.reducer,
    order: orderSlice,
    [mainApi.reducerPath]: mainApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      mainApi.middleware
    ),
});
