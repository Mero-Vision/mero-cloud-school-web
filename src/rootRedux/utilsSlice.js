import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   date: {},
   singleDate: new Date(),
   search_keyword: "",
   template: "template1",
   columns: {},
};

const utilsSlice = createSlice({
   name: "utils",
   initialState,
   reducers: {
      setCalendarDate: (state, action) => {
         state.date = action.payload;
      },
      setSingleDate: (state, action) => {
         state.singleDate = action.payload;
      },
      setLatestAccount: (state, action) => {
         state.latestAccount = action.payload;
      },
      setColumns: (state, action) => {
         state.columns = {
            ...state?.columns,
            [action.payload.type]: action.payload,
         };
      },
      clearColumns: (state, action) => {
         state.columns = action.payload;
      },
      setSearch: (state, action) => {
         state.search_keyword = action.payload;
      },
      setTemplate: (state, action) => {
         state.template = action.payload;
      },
      setDynamicData: (state, action) => {
         return { ...state, [action?.payload?.type]: action.payload };
      },
      setDynamicArrayData: (state, action) => {
         return { ...state, [action?.payload?.type]: action.payload };
      },
   },
});

export const {
   setCalendarDate,
   setLatestAccount,
   setColumns,
   clearColumns,
   setSearch,
   setTemplate,
   setSingleDate,
   setDynamicData,
   setDynamicArrayData,
} = utilsSlice?.actions;
export default utilsSlice?.reducer;
