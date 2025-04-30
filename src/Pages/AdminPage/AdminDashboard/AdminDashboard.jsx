import React, { useEffect, useState } from "react";
import { BsList } from "react-icons/bs";
import { BsLink } from "react-icons/bs";
import { BsCarFrontFill } from "react-icons/bs";
import Logo from "../../../assets/Images/jplogo.png";
import { Link, useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import CapLinksListing from "../CapLinks/CapLinksListing/CapLinksListing";
import ManageListing from "../ManageModal/ManageListing/ManageListing";
import CarListings from "../CarListing/CarListing";
import AddListingForm from "../CarListing/AddListingForm/AddListingForm";
import EditListingForm from "../CarListing/EditListingForm/EditListingForm";
import GenerateCapLinksForm from "../CapLinks/GenerateCapLinksForm/GenerateCapLinksForm";
import EditCapLinksForm from "../CapLinks/EditCapLinksForm/EditCapLinksForm";
import ModalForm from "../ManageModal/ModalForm/ModalForm";
import EditModalForm from "../ManageModal/EditModalForm/EditModalForm";


const AdminDashboard = () => {
  const {id} = useParams()
  const [isOpen, setIsOpen] = useState(true);
  const toggleAdminMenu = () => {
    console.log("clicked");

    setIsOpen((prev) => !prev);
  };

  // Resize the menu According to width
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsOpen(false);
      } else {
        setIsOpen(true);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    alert("admin Logout Successfully");
    window.location.href = "/admin";
  };

  return (
    <div className="w-full h-auto">
      {/* Navbar */}
      <div className="navbar  w-full h-[100px] relative flex">
        <div className="w-full h-[100px] flex bg-orange-400 justify-between  fixed items-center">
          <div className="w-[30%] h-auto max-md:w-[40%] flex justify-between items-center">
            {/* Logo */}
            <div className="logo w-[150px] mt-3 ml-3 h-[80px] ">
              <img
                src={Logo}
                alt="jp logo"
                className="w-[80px] max-md:w-[60px] max-md:h-[60px] h-[80px]"
              />
            </div>

            {/* MENU ICON */}
            <div className="max-[1300px]:hidden tabs w-auto h-auto text-white flex items-center">
              <div
                className="menuIcon cursor-pointer"
                onClick={toggleAdminMenu}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="20"
                  viewBox="0 0 28 21"
                  className="vehica-menu-icon max-md:p-[3px]"
                >
                  <g id="vehica-menu-svg" transform="translate(-11925 99)">
                    <rect
                      width="28"
                      height="3.2"
                      rx="1.5"
                      transform="translate(11925 -99)"
                      fill="#ffffff"
                    ></rect>
                    <rect
                      width="19.6"
                      height="3.2"
                      rx="1.5"
                      transform="translate(11925 -90.6)"
                      fill="#ffffff"
                    ></rect>
                    <rect
                      width="14"
                      height="3.2"
                      rx="1.5"
                      transform="translate(11925 -82.2)"
                      fill="#ffffff"
                    ></rect>
                  </g>
                </svg>
              </div>
            </div>
          </div>

          {/* Logout Button */}
          <div className="w-auto p-3 h-auto flex justify-center items-center">
            <button
              className="w-fit max-[600px]:w-full max-md:text-[14px] h-fit py-3 px-5 font-semibold text-lg text-white bg-orange-600 rounded-xl cursor-pointer"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main Body */}
      <div className="body gap-3 w-full fixed h-screen flex">
        <div className="w-full fixed rounded-tl-4xl bg-white rounded-tr-4xl h-screen  flex justify-between">
          <div className="left w-auto h-auto">
            <div className="side w-fit bg-white fixed block max-[1300px]:hidden">
              {isOpen ? (
                <div
                  id="sideNav"
                  className="left bg-white w-[220px] p-3 rounded-2xl h-screen  shadow-xl"
                >
                  <div className="w-full bg-white h-auto p-3">
                    <p className="text-orange-400 text-xl">Main Menu </p>
                  </div>
                  <div className="tabs w-full h-auto flex p-3 gap-3 flex-col ">
                    <div className="tab w-full h-auto hover:text-white p-3 rounded-xl hover:bg-orange-400">
                      <Link to="/dashboard" className="flex gap-3 items-center">
                        <BsList />
                        <p className="hover:text-white text-md">Listings</p>
                      </Link>
                    </div>
                    <div className="tab w-full h-auto hover:text-white p-3 rounded-xl hover:bg-orange-400">
                      <Link
                        to="/dashboard/cap-links"
                        className="flex gap-3 items-center"
                      >
                        <BsLink />
                        <p className="hover:text-white text-md">
                          Cap Links List
                        </p>
                      </Link>
                    </div>
                    <div className="tab w-full h-auto hover:text-white p-3 rounded-xl hover:bg-orange-400">
                      <Link
                        to="/dashboard/manage-modal"
                        className="flex gap-3 items-center"
                      >
                        <BsCarFrontFill />
                        <p className="hover:text-white text-md">Manage Model</p>
                      </Link>
                    </div>
                  </div>
                </div>
              ) : (
                <div
                  id="sideNavIcon"
                  className="left  bg-white w-[80px] rounded-tl-[10rem] p-3 rounded-2xl h-screen  shadow-xl"
                >
                  <div className="tabs bg-white w-full h-auto flex p-1 gap-3 flex-col ">
                    <div className="tab w-full h-auto hover:text-white p-3 rounded-xl hover:bg-orange-400">
                      <Link
                        to="/dashboard"
                        className="flex gap-3 items-center font-bold"
                      >
                        <BsList size={30} />
                      </Link>
                    </div>
                    <div className="tab w-full h-auto hover:text-white p-3 rounded-xl hover:bg-orange-400">
                      <Link
                        to="/dashboard/cap-links"
                        className="flex gap-3 items-center"
                      >
                        <BsLink size={30} />
                      </Link>
                    </div>
                    <div className="tab w-full h-auto hover:text-white p-3 rounded-xl hover:bg-orange-400">
                      <Link
                        to="/dashboard/manage-modal"
                        className="flex gap-3 items-center"
                      >
                        <BsCarFrontFill size={30} />
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div
              id="sideNavIcon"
              className=" w-[100px]  max-[750px]:w-[10%] max-[500px]:w-[15%] bg-white p-3  rounded-tl-4xl min-[1300px]:hidden block rounded-2xl h-screen fixed  shadow-md"
            >
              <div className="tabs w-full bg-white h-auto space-y-4 flex p-3 gap-3 max-[750px]:p-0 max-[750px]:pt-2 max-[750px]:items-center flex-col ">
                <div className="tab w-fit hover:bg-orange-400 h-auto mx-auto p-2 rounded-xl hover:text-white">
                  <Link
                    to="/dashboard"
                    className="flex gap-3 items-center max-[750px]:w-[20px] font-bold"
                  >
                    <BsList size={25} />
                  </Link>
                </div>
                <div className="tab w-fit hover:bg-orange-400 h-auto mx-auto p-2 rounded-xl hover:text-white">
                  <Link
                    to="/dashboard/cap-links"
                    className="flex gap-3 items-center max-[750px]:w-[20px] font-bold"
                  >
                    <BsLink size={25} />
                  </Link>
                </div>
                <div className="tab w-fit hover:bg-orange-400 h-auto mx-auto p-2 rounded-xl hover:text-white">
                  <Link
                    to="/dashboard/manage-modal"
                    className="flex gap-3 items-center max-[750px]:w-[20px] font-bold"
                  >
                    <BsCarFrontFill size={25} />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="right min-[1300px]:w-[85%] max-[1300px]:w-[93%] max-[1000px]:w-[90%] max-[500px]:w-[85%] h-screen flex gap-3 overflow-hidden justify-end ">
            {(location.pathname === "/dashboard" && <CarListings />) ||
              (location.pathname === "/dashboard/cap-links" && (
                <CapLinksListing />
              )) ||
              (location.pathname === "/dashboard/manage-modal" && (
                <ManageListing />
              )) ||
              (location.pathname === "/listing/add-listing" && (
                <AddListingForm />
              )) ||
              (location.pathname === `/listing/edit-listing/get/${id}` && (
                <EditListingForm  />
              )) ||
              (location.pathname ===
                `/cap-links-listing/add-cap-links-listing` && (
                <GenerateCapLinksForm />
              )) ||
              (location.pathname ===
                `/cap-links-listing/edit-cap-links-listing/get/${id}` && (
                <EditCapLinksForm  />
              )) ||
              (location.pathname === `/model-listing/add-model-listing` && (
                <ModalForm />
              )) ||
              (location.pathname ===
                `/modal-listing/edit-modal-listing/get/${id}` && (
                <EditModalForm />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
