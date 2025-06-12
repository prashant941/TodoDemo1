import { createSlice } from "@reduxjs/toolkit";
import {
  createOrganizationAction,
  invitastionAllOrgAction,
} from "../actions/orgnizastion.action";
const initialState = {
  loding: "",
  message: "",
  orgName: "",
  orgs: [],
};
const orgSlice = createSlice({
  name: "org",
  initialState,
  reducers: {
    orgName: (state, action) => {
      state.orgName = action.payload;
    },
    addAcceptedOrg: (state, action) => {


      state.orgs.push(action.payload);
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

    builder.addCase(invitastionAllOrgAction.pending, (state) => {
      state.loding = "fetchingOrg";
    });
    builder.addCase(invitastionAllOrgAction.fulfilled, (state, action) => {
      state.orgs = action.payload;
      state.loding = "";
    });
    builder.addCase(invitastionAllOrgAction.rejected, (state, action) => {
      state.message = action.payload;
      state.loding = "";
    });
  },
});

export default orgSlice.reducer;
export const { orgName, addAcceptedOrg } = orgSlice.actions;
