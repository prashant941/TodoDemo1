import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import {
  createOrganizationAction,
  createTodoForOrgAction,
  deleteOrganizationAction,
  getMyOrganizationAction,
  invitastionAllOrgAction,
  invitationAction,
  orgAccepteAction,
  pendingOrgAction,
  updateOrgAction,
} from "../store/actions/orgnizastion.action";
import {
  addAcceptedOrg,
  clearMessageAction,
  orgName,
} from "../store/reducers/org.reducer";
import { IorgInterface } from "../types/org.types";
import type { AppDispatch, RootState } from "../store/index";
const useOrganizastion = () => {
  const dispatch: AppDispatch = useDispatch();
  const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
  const { message, orgName: orgname } = useTypedSelector((state) => state.org);
  const { myOrgs } = useTypedSelector((state) => state.org);
  const { user } = useTypedSelector((state) => state.auth);
  const { orgs } = useTypedSelector((state) => state.org);
  const createOrganizastion = (body: IorgInterface) => {
    return dispatch(createOrganizationAction(body));
  };
  const getMyOrganizastion = () => {
    return dispatch(getMyOrganizationAction());
  };

  const deleteOrg = (body: string) => {
    return dispatch(deleteOrganizationAction(body));
  };
  const orgInvitation = ({ id, email }: { id: string; email: string }) => {
    return dispatch(invitationAction({ id, email }));
  };
  const invitastionAll = () => {
    return dispatch(invitastionAllOrgAction());
  };
  const pendingOrg = () => {
    return dispatch(pendingOrgAction());
  };
  const orgAccepte = (body: { orgId: string; action: string }) => {
    return dispatch(orgAccepteAction(body));
  };
  const setOrgname = (body: string) => {
    dispatch(orgName(body));
  };
  const createTodoForOrg = ({ id, title }: IorgInterface) => {
    return dispatch(createTodoForOrgAction({ id, title: title! }));
  };
  const orgsHandle = (id: string, name: string) => {
    return dispatch(addAcceptedOrg({ id, name }));
  };
  const updateOrg = ({ id, name }: { id: string; name: string }) => {
    return dispatch(updateOrgAction({ id, name }));
  };
  const clearMessage = () => {
    return dispatch(clearMessageAction());
  };
  return {
    createOrganizastion,
    message,
    getMyOrganizastion,
    deleteOrg,
    orgInvitation,
    invitastionAll,
    pendingOrg,
    orgAccepte,
    user,
    setOrgname,
    orgname,
    createTodoForOrg,
    orgsHandle,
    orgs,
    myOrgs,
    updateOrg,
    clearMessage,
  };
};

export default useOrganizastion;
