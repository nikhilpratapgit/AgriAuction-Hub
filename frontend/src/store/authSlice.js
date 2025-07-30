import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  user: null,
  loading: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthUser(state, action) {
      state.user = action.payload;
    },
    clearAuthUser(state) {
      state.user = null;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
  },
});

export const { setAuthUser, clearAuthUser, setLoading, setError } = authSlice.actions;
export default authSlice.reducer;
