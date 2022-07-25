import { createSlice } from "@reduxjs/toolkit";
import { CUserInfo } from '../../../constants/neuip';

const initialState = {
  ...new CUserInfo({})
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    storeUser: (state, action)=>({...new CUserInfo(action.payload)}),
    logoutUser: (state, action)=>({...initialState})
  }
})

export const userActions = userSlice.actions;
export default userSlice.reducer;