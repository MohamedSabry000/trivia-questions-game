import { createSlice } from '@reduxjs/toolkit';

export const pageSlice = createSlice({
  name: 'page',
  initialState: {
    page: 'home',
  },
  reducers: {
    resetPage: (state) => {
      state.page = 'home';
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
  }
});

export const { resetPage, setPage } = pageSlice.actions;

export default pageSlice.reducer;