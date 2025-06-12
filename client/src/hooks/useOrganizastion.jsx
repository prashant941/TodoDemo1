import { useDispatch, useSelector } from "react-redux";
import {
  createOrganizationAction,
  createTodoForOrgAction,
  deleteOrganizationAction,
  getMyOrganizationAction,
  invitastionAllOrgAction,
  invitationAction,
  orgAccepteAction,
  pendingOrgAction,
} from "../store/actions/orgnizastion.action";
import { addAcceptedOrg, orgName } from "../store/reducers/org.reducer";

const useOrganizastion = () => {
  const dispatch = useDispatch();
  const { message, orgName: orgname } = useSelector((state) => state.org);
  const { user } = useSelector((state) => state.auth);
  const { orgs } = useSelector((state) => state.org);
  const createOrganizastion = (body) => {
    return dispatch(createOrganizationAction(body));
  };
  const getMyOrganizastion = () => {
    return dispatch(getMyOrganizationAction());
  };
  const deleteOrg = (body) => {
    return dispatch(deleteOrganizationAction(body));
  };
  const orgInvitation = ({ id, email }) => {
    return dispatch(invitationAction({ id, email }));
  };
  const invitastionAll = () => {
    return dispatch(invitastionAllOrgAction());
  };
  const pendingOrg = () => {
    return dispatch(pendingOrgAction());
  };
  const orgAccepte = (body) => {
    return dispatch(orgAccepteAction(body));
  };
  const setOrgname = (body) => {
    dispatch(orgName(body));
  };
  const createTodoForOrg = ({ id, title }) => {
    return dispatch(createTodoForOrgAction({ id, title }));
  };
  const orgsHandle = (id, name) => {
    return dispatch(addAcceptedOrg({ id, name }));
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
    orgs
  };
};

export default useOrganizastion;
