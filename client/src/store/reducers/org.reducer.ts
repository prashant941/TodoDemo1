import { createSlice } from "@reduxjs/toolkit";
import {
  createOrganizationAction,
  getMyOrganizationAction,
  invitastionAllOrgAction,
  invitationAction,
} from "../actions/orgnizastion.action";
type initialStateType = {
  message: string;
  loding: string;
  orgName: string;
  orgs: object[];
  myOrgs: [];
};
const initialState: initialStateType = {
  loding: "",
  message: "",
  orgName: "",
  orgs: [],
  myOrgs: [],
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
    clearMessageAction: (state) => {
      state.message = "";
      state.loding = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createOrganizationAction.pending, (state) => {
      state.loding = "creatingOrg";
      state.message = "";
    });
    builder.addCase(createOrganizationAction.fulfilled, (state, action) => {
      state.message = "Created";
      state.loding = "";
    });
    builder.addCase(
      createOrganizationAction.rejected,
      (state, action: { payload: any }) => {
        state.message = action.payload;
        state.loding = "";
      }
    );
    builder.addCase(invitationAction.pending, (state) => {
      state.loding = "inviting";
      state.message = "";
    });
    builder.addCase(invitationAction.fulfilled, (state, action) => {
      state.message = action.payload;
      state.loding = "";
    });
    builder.addCase(
      invitationAction.rejected,
      (state, action: { payload: any }) => {
        state.message = action.payload;
        state.loding = "";
      }
    );
    builder.addCase(invitastionAllOrgAction.pending, (state) => {
      state.loding = "fetchingOrg";
      state.message = "";
    });
    builder.addCase(invitastionAllOrgAction.fulfilled, (state, action) => {
      state.orgs = action.payload;
      state.loding = "";
    });
    builder.addCase(
      invitastionAllOrgAction.rejected,
      (state, action: { payload: any }) => {
        state.message = action.payload;
        state.loding = "";
      }
    );
    builder.addCase(getMyOrganizationAction.pending, (state) => {
      state.loding = "fetchingMyOrg";
      state.message = "";
    });
    builder.addCase(getMyOrganizationAction.fulfilled, (state, action) => {
      state.myOrgs = action.payload;
      state.loding = "";
    });
    builder.addCase(
      getMyOrganizationAction.rejected,
      (state, action: { payload: any }) => {
        state.message = action.payload;
        state.loding = "";
      }
    );
  },
});

export default orgSlice.reducer;
export const { orgName, addAcceptedOrg, clearMessageAction } = orgSlice.actions;
