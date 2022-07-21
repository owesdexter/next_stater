import { createSlice } from "@reduxjs/toolkit";
import { CUserInfo } from '../constants/neuip';

const initialState = {
  user: new CUserInfo({})
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    storeUser(state, action){
      state.user = action.payload;
    },
    logoutUser(state){
      state.user = initialState.user;
    }
  }
})

export const userActions = userSlice.actions;
export default userSlice.reducer;