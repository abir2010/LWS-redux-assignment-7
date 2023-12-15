import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  search: "",
  sortBy: "",
  tag: "",
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    searchJob: (state, action) => {
      state.search = action.payload;
    },
    sortJob: (state, action) => {
      state.sortBy = action.payload;
    },
    tagJob: (state, action) => {
      state.tag = action.payload;
    },
  },
});

export default filterSlice.reducer;
export const { searchJob, sortJob, tagJob } = filterSlice.actions;
