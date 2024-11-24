import { baseApi } from "./api/baseApi";
import userReducer from "./features/userSlice";

export const reducer = {
  [baseApi.reducerPath]: baseApi.reducer,
  user: userReducer,
};
