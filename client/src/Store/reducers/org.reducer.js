import { createSlice } from "@reduxjs/toolkit";
import { createOrganizationAction } from "../actions/orgnizastion.action";
const initialState = {
  loding: "",
  message: "",
  orgName: "",
};
const orgSlice = createSlice({
  name: "org",
  initialState,
  reducers: {
    orgName: (state, action) => {
      state.orgName = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createOrganizationAction.pending, (state) => {
      state.loding = "creatingOrg";
    });
    builder.addCase(createOrganizationAction.fulfilled, (state, action) => {
      state.message = "Created";
      state.loding = "";
    });
    builder.addCase(createOrganizationAction.rejected, (state, action) => {
      state.message = action.payload;
      state.loding = "";
    });
  },
});

export default orgSlice.reducer;
export const { orgName } = orgSlice.actions;
