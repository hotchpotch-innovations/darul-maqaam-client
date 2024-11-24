import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  user: any;
  isLoading: boolean;
}

const initialState: UserState = {
  user: null,
  isLoading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<any>) {
      state.user = action.payload;
      state.isLoading = false;
    },

    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    clearUser(state) {
      state.user = null;
      state.isLoading = false;
    },
  },
});

export const { setUser, setLoading, clearUser } = userSlice.actions;
export default userSlice.reducer;
