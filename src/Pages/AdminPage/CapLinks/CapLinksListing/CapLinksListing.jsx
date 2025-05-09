import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";
import axios from "axios";
import Copyright from "../../../../Components/Copyright/Copyright";
import Pagination from "../../../../Components/Pagination/Pagination";

const CapLinksListing = () => {
  const [search, setSearch] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [capLinksData, setCapLinksData] = useState([]);
  const [shippingInfortionData, setShippingInformationData] = useState([]);
  const [consigneeData, setConsigneeData] = useState([]);
  const [productInformationData, setProductInformationData] = useState([]);

  const [productInformation, setProductInformation] = useState("");
  const [consignee, setConsignee] = useState("");
  const [shippingInformation, setShippingInformation] = useState("");

  const fetchCapLinks = async () => {
    try {
      const res = await axios.get("https://jpcorporation01-production.up.railway.app/api/cap/get");
      const data = await res.data.data;

      setCapLinksData(data);
    } catch (error) {
      console.log("error", error.message);
    }
  };

  useEffect(() => {
    fetchCapLinks();
  }, []);

  const fetchProductData = async () => {
    try {
      const res = await axios.get(
        "https://jpcorporation01-production.up.railway.app/api/productInformation/get"
      );
      const data = await res.data.data;
      console.log(data);

      setProductInformationData(data);
    } catch (error) {
      console.log("error", error.message);
    }
  };

  useEffect(() => {
    fetchProductData();
  }, []);

  const fetchConsigneeData = async () => {
    try {
      const res = await axios.get(
        "https://jpcorporation01-production.up.railway.app/api/consigneeNotifyPartyInformation/get"
      );
      const data = await res.data.data;

      setConsigneeData(data);
    } catch (error) {
      console.log("error", error.message);
    }
  };

  useEffect(() => {
    fetchConsigneeData();
  }, []);

  const fetchShippingInformation = async () => {
    try {
      const res = await axios.get(
        "https://jpcorporation01-production.up.railway.app/api/shippingInformation/get"
      );
      const data = await res.data.data;
      console.log("shipping Data", data);

      setShippingInformationData(data);
    } catch (error) {
      console.log("error", error.message);
    }
  };

  useEffect(() => {
    fetchShippingInformation();
  }, []);

  let allCapLinks;
  if (capLinksData) {
    // allCapLinks array
    allCapLinks = capLinksData;
  }

  let image = productInformationData.map(
    (product) =>
      product.cap_id === parseInt(allCapLinks.map((capLink) => capLink.md5_id))
  )?.featured_image;
  console.log(image);

  let myCapLinkData = {
    company_name: capLinksData.map((capLink) => capLink.company_name),
    forwarder_name: capLinksData.map((capLink) => capLink.forwarder_name),
  };
  console.log(myCapLinkData.company_name);

  // Filter search
  const filteredCapLinks = allCapLinks.map((capLinks) => {
    capLinks?.capLinksName?.toLowerCase()?.includes(search?.toLowerCase());
  });

  // Pagination Logic
  const indexOfLastCapLinks = currentPage * entriesPerPage;
  const indexOfFirstCapLinks = indexOfLastCapLinks - entriesPerPage;
  const currentCapLinks = filteredCapLinks.slice(
    indexOfFirstCapLinks,
    indexOfLastCapLinks
  );
  const totalPages = Math.ceil(filteredCapLinks.length / entriesPerPage);

  // Delete data on mount
  const handleDelete = async (id) => {
    let del_id = parseInt(id);
    console.log(del_id);
    try {
      // setLoading(true);

      // Fetch all data in parallel
      const [
        capResponse,
        productInformationResponse,
        consigneeResponse,
        documentInformationResponse,
        shippingResponse,
        productImageResponse,
      ] = await Promise.all([
        axios.delete(`https://jpcorporation01-production.up.railway.app/api/productImage/delete/${del_id}`),
        axios.delete(
          `https://jpcorporation01-production.up.railway.app/api/shippingInformation/delete/${del_id}`
        ),
        axios.delete(
          `https://jpcorporation01-production.up.railway.app/api/consigneeNotifyPartyInformation/delete/${del_id}`
        ),
        axios.delete(
          `https://jpcorporation01-production.up.railway.app/api/productInformation/delete/${del_id}`
        ),
        axios.delete(`https://jpcorporation01-production.up.railway.app/api/cap/delete/${del_id}`),
        axios.delete(
          `https://jpcorporation01-production.up.railway.app/api/documentInformation/delete/${del_id}`
        ),
      ]);

      if (
        shippingResponse.status === 200 &&
        capResponse.status === 200 &&
        productInformationResponse.status === 200 &&
        documentInformationResponse.status === 200 &&
        consigneeResponse.status === 200 &&
        productImageResponse.status === 200
      ) {
        alert(`deleted`);
        fetchCapLinks();
        fetchConsigneeData();
        fetchConsigneeData();
        fetchProductData();
        fetchShippingInformation();
      }

      // setLoading(false);
    } catch (err) {
      console.error("Error fetching data:", err);
      // setLoading(false);
    }
  };
  

  const handleEdit = async (id) => {
    localStorage.setItem("EditCapLinksId", id);
    window.location.replace(
      `/cap-links-listing/edit-cap-links-listing/get/${id}`
    );
  };

  const handleEntriesChange = (e) => {
    setEntriesPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to page 1
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const ShowCapLinksListingForm = () => {
    window.location.href = "/cap-links-listing/add-cap-links-listing";
  };

  const goToPage = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const goToNextPage = () => {
    goToPage(currentPage + 1);
  };

  const goToPreviousPage = () => {
    goToPage(currentPage - 1);
  };

  return (
    <div className="w-full max-h-auto min-h-screen rounded-tr-[50px] flex flex-col overflow-y-auto ">
      <div className="w-full flex flex-col gap-4 p-5 mb-4 max-sm:p-3 items-start">
        <div className="w-[95%] mx-auto border rounded-md py-3">
          <div className="flex justify-between items-center border-b max-sm:p-3 p-6 mb-4">
            <h1 className="text-3xl font-bold max-sm:text-2xl max-xs:text-xl">
              Cap Links
            </h1>
            <button
              className="bg-orange-400 text-white px-4 max-sm:text-sm max-sm:px-3 py-2 rounded-lg cursor-pointer"
              onClick={ShowCapLinksListingForm}
            >
              Generate Cap Links
            </button>
          </div>

          {/* Controls */}
          <div className=" flex flex-col md:flex-row max-md:gap-6 justify-between max-md:items-start max-md:w-full items-center max-md:px-3  px-6 py-2 mb-4 gap-4">
            <div className="max-md:text-[14px] max-sm:text-[12px]">
              Show
              <select
                value={entriesPerPage}
                onChange={handleEntriesChange}
                className="border p-1 px-2 mx-2 border-gray-400 text-gray-500 rounded"
              >
                <option value={10}>10</option>
                <option value={30}>30</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
              entries
            </div>

            <input
              type="text"
              placeholder="Search..."
              className="p-2 max-md:pt-1 border rounded w-full md:w-64 max-md:text-md max-sm:text-sm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="overflow-x-auto whitespace-nowrap">
            <table className="min-w-full p-3 bg-white  rounded-lg shadow-md">
              <thead className="p-3 border-b">
                <tr>
                  <th className="p-3 text-sm">S.No</th>
                  <th className="p-3 text-sm">Image</th>
                  <th className="p-3 text-sm">Name</th>
                  <th className="p-3 text-sm">Comp Name</th>
                  <th className="p-3 text-sm">Forwarder Name</th>
                  <th className="p-3 text-sm">Manufacture Year/Month</th>
                  <th className="p-3 text-sm">Uploaded At</th>
                  <th className="p-3 text-sm">Actions</th>
                </tr>
              </thead>
              <tbody>
                {capLinksData &&
                  capLinksData
                    // .filter((capLink) => capLink?.departure?.carrierNameRef ? capLink?.departure?.carrierNameRef.toLowerCase().includes(search.toLowerCase()) : "")
                    .slice(0, entriesPerPage)
                    .map((capLink, index) => (
                      <tr key={capLink._id} className="border-b text-sm">
                        {console.log(capLink)}
                        <td className="p-2 text-center">
                          {indexOfFirstCapLinks + index + 1}
                        </td>
                        <td className="p-2 ">
                          <img
                            src={`https://jpcorporation01-production.up.railway.app/uploads/${
                              productInformationData.find(
                                (product) =>
                                  parseInt(product.cap_id) ===
                                  parseInt(capLink.md5_id)
                              )?.featured_image
                            }`}
                            alt="capLinks"
                            className="w-10 h-10 object-cover"
                          />
                        </td>
                        {console.log(
                          productInformationData.find((ship) => ship)
                        )}
                        <td className="p-2 text-start ">
                          {
                            shippingInfortionData.find(
                              (ship) =>
                                parseInt(ship.cap_id) ===
                                parseInt(capLink.md5_id)
                            )?.carrier
                          }
                        </td>
                        <td className="p-2 text-center">
                          {capLink.company_name}
                        </td>
                        <td className="p-2 text-center">
                          {capLink.forwarder_name}
                        </td>
                        <td className="p-2 text-center">
                          {
                            productInformationData.find(
                              (product) =>
                                parseInt(product.cap_id) ===
                                parseInt(capLink.md5_id)
                            )?.manufacture_year_month
                          }
                        </td>
                        <td className="p-2 text-center">
                          {capLink.created_at.slice(0, 10)}
                        </td>
                        <td className="p-2 justify-center flex space-x-2">
                          <button
                            className="text-white p-1 rounded bg-emerald-500 "
                            onClick={() => handleEdit(parseInt(capLink.md5_id))}
                          >
                            <FaEye size={15} />
                          </button>
                          <button
                            className="text-white p-1 rounded bg-orange-400"
                            onClick={() => handleEdit(parseInt(capLink.md5_id))}
                          >
                            <FaEdit size={15} />
                          </button>
                          <button
                            className="text-white p-1 rounded bg-red-500 cursor-pointer"
                            onClick={() => handleDelete(capLink.md5_id)}
                          >
                            <FaTrash size={15} />
                          </button>
                        </td>
                      </tr>
                    ))}
              </tbody>
            </table>
          </div>

          <div className=" flex w-full max-md:flex-col max-md:gap-3 max-md:p-3 p-6 justify-between items-center">
            <div className="dataNumber w-auto text-sm max-sm:text-xs text-neutral-600 flex justify-start font-semibold ">
              <p>{`Showing ${indexOfFirstCapLinks} to ${indexOfLastCapLinks} of ${allCapLinks.length} entries`}</p>
            </div>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              goToPage={goToPage}
              goToPreviousPage={goToPreviousPage}
              goToNextPage={goToNextPage}
            />
          </div>
        </div>

        <div className="w-full h-[150px] ">
          <Copyright />
        </div>
      </div>
    </div>
  );
};

export default CapLinksListing;
