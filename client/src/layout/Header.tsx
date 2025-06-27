import React, { useEffect } from "react";
import { Dialog, DialogTrigger } from "../components/ui/dialog";
import LoginForm from "../view/auth/LoginForm";
import Registrastion from "../view/auth/Registrastion";

import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { toast } from "sonner";
import { FaBell } from "react-icons/fa";

import useOrganizastion from "../hooks/useOrganizastion";
import { addAcceptedOrg } from "../store/reducers/org.reducer";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "../components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { FaArrowRight } from "react-icons/fa";
const Header = () => {
  const NavList = ["Home", "About", "Service"];
  const { isAuthenticated: isUser, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const [bellCount, setBellCount] = React.useState<
    { organization: { id: string; name: string } }[]
  >([]);
  const { pendingOrg, orgAccepte, orgsHandle, myOrgs } = useOrganizastion();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const data = await pendingOrg().unwrap();

        setBellCount(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  const Logout = async () => {
    const { payload } = await logout();
    toast.success(typeof payload === "string" ? payload : "Logout successful");
    return navigate("/");
  };

  const accepteRequest = async (id: string, name: string) => {
    orgsHandle(id, name);
    await orgAccepte({ orgId: id, action: "accept" });
    setBellCount((prev) =>
      prev.filter((items, i) => items?.organization?.id !== id)
    );
    toast.success("invitation accepted");
  };
  const changingOrg = () => {
    navigate("/switch");
    localStorage.removeItem("orgId");
    setDropdownOpen(false);
  };
  const manageHandle = () => {
    navigate("/manage-organization");
    setDropdownOpen(false);
  };
  // const orgName = localStorage.getItem("orgName");
  // useEffect(() => {
  //   if (!isUser) {
  //     localStorage.removeItem("orgId");
  //     localStorage.removeItem("orgName");
  //   }
  // }, [isUser]);
  return (
    <>
      <header className="bg-sky-500 flex justify-between items-center text-white">
        <div className="w-32">
          <img className="w-full" src="logo.png" alt="" />
        </div>
        <nav>
          <ul className="flex gap-7 mr-16 text-[20px] items-center">
            {NavList.map((items, i) => (
              <Link
                key={i}
                to={`${
                  items.toLowerCase() === "home"
                    ? "/"
                    : `/${items.toLowerCase()}`
                }`}
              >
                <li key={i} className="cursor-pointer">
                  {items}
                </li>
              </Link>
            ))}
            {!isUser ? (
              <>
                <Dialog>
                  <DialogTrigger asChild>
                    <button className="px-6 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors">
                      Register
                    </button>
                  </DialogTrigger>
                  <Registrastion />
                </Dialog>

                <Dialog>
                  <DialogTrigger asChild>
                    <button className="px-6 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors">
                      Login
                    </button>
                  </DialogTrigger>
                  <LoginForm />
                </Dialog>
              </>
            ) : (
              <>
                <DropdownMenu>
                  <DropdownMenuTrigger className="outline-none border-none">
                    <Avatar>
                      <AvatarImage
                        src="https://github.com/shadcn.png"
                        alt="@shadcn"
                      />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                    <DropdownMenuItem>Billing</DropdownMenuItem>
                    {myOrgs.length > 0 && (
                      <DropdownMenuItem onClick={manageHandle}>
                        {" "}
                        manage organizations
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem onClick={() => changingOrg()}>
                      Change Organization
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="cursor-pointer"
                      onClick={Logout}
                    >
                      <div className="flex justify-between  items-center  w-full">
                        <span>Logout</span>
                        <FaArrowRight color="red" />
                      </div>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            )}
            {isUser && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    className="border-none outline-none"
                    onClick={() => setDropdownOpen(true)}
                  >
                    <FaBell className="cursor-pointer" />
                    <div className="w-4 h-4 text-[15px] text-white bg-red-500 rounded-full relative -top-3 -right-4 flex items-center justify-center">
                      {bellCount?.length}
                    </div>
                  </button>
                </DropdownMenuTrigger>
                {dropdownOpen && (
                  <DropdownMenuContent
                    className="w-96 p-4 bg-white shadow-lg rounded-md"
                    align="start"
                  >
                    {bellCount?.length > 0 ? (
                      bellCount?.map((item, i) => {
                        return (
                          <div
                            key={i}
                            className="flex items-center justify-between  mb-6"
                          >
                            <div className="text-sm text-gray-700">
                              🔔 You have a new organization request from{" "}
                              <span className="font-semibold">
                                {item?.organization?.name}
                              </span>
                              .
                            </div>
                            <div className="flex space-x-2 ml-4">
                              <button
                                className="text-sm px-3 py-1 bg-gray-100 rounded hover:bg-gray-200"
                                onClick={() => setDropdownOpen(false)}
                              >
                                Ignore
                              </button>
                              <button
                                onClick={() =>
                                  accepteRequest(
                                    item?.organization?.id,
                                    item?.organization?.name
                                  )
                                }
                                className="text-sm px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                              >
                                Accept
                              </button>
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <div className="text-center">No Request</div>
                    )}
                  </DropdownMenuContent>
                )}
              </DropdownMenu>
            )}
          </ul>
        </nav>
      </header>
    </>
  );
};

export default Header;
