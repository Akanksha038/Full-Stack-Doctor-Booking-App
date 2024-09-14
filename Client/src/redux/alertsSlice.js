import { createSlice } from '@reduxjs/toolkit'; // Add this import

//loading and hiding , it's a process of alert

export const alertsSlice = createSlice({
  name: "alerts",
  initialState: {
    loading: false
  },
  reducers: {
    showLoading: (state) => {
      state.loading = true;
    },
    hideLoading: (state) => {
      state.loading = false;
    }
  }
});

export const { showLoading, hideLoading } = alertsSlice.actions;