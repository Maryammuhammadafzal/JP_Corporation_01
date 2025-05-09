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


useEffect(() => {
  const fetchAllData = async () => {
    try {
      const [capRes, productRes, shippingRes] = await Promise.all([
        axios.get("https://jpcorporation01-production.up.railway.app/api/cap/get"),
        axios.get("https://jpcorporation01-production.up.railway.app/api/productInformation/get"),
        axios.get("https://jpcorporation01-production.up.railway.app/api/shippingInformation/get")
      ]);

      const caps = capRes.data.data;
      const products = productRes.data.data;
      const shippings = shippingRes.data.data;

      console.log("Cap Data", caps);
      console.log("Product Data", products);
      console.log("Shipping Data", shippings);

      // 🔁 Merge by cap_id
      const merged = caps.map(cap => {
        const product = products.find(p => p.cap_id === parseInt(cap.md5_id)); // assuming md5_id === cap_id
        const shipping = shippings.find(s => s.cap_id === parseInt(cap.md5_id));

        return {
          cap_id: parseInt(cap.md5_id),
          company_name: cap.company_name,
          forwarder_name: cap.forwarder_name,
          created_at: cap.created_at,
          product: product ? {
            featured_image: product.featured_image,
            manufacture_year_month: product.manufacture_year_month,
          } : null,
          shipping: shipping ? {
            carrier: shipping.carrier,
          } : null,
        };
      });

      setCapLinksData(merged);
    } catch (error) {
      console.log("Error:", error.message);
    }
  };

  fetchAllData();
}, []);

  let allCapLinks;
  if (capLinksData) {
    // allCapLinks array
    allCapLinks = capLinksData;
  }

  console.log(allCapLinks);
  
  let image = productInformationData.map(
    (product) =>
      product.cap_id === parseInt(allCapLinks.map((capLink) => capLink.md5_id))
  )?.featured_image;

  let myCapLinkData = {
    company_name: capLinksData.map((capLink) => capLink.company_name),
    forwarder_name: capLinksData.map((capLink) => capLink.forwarder_name),
  };
  

    // Filter search
    const filteredCapLinks = allCapLinks.filter((capLinks) => 
      capLinks?.shipping?.carrier?.toLowerCase()?.includes(search?.toLowerCase())
    );

  // Pagination Logic
  const indexOfLastCapLinks = currentPage * entriesPerPage;
  const indexOfFirstCapLinks = indexOfLastCapLinks - entriesPerPage;
  const currentCapLinks = search.trim() !== "" 
  ?  filteredCapLinks.slice( indexOfFirstCapLinks, indexOfLastCapLinks )
  : allCapLinks.slice(indexOfFirstCapLinks , indexOfLastCapLinks);
  const totalPages = Math.ceil(filteredCapLinks.length / entriesPerPage);

  
  // Delete data on mount
  const handleDelete = async (id) => {
    let del_id = parseInt(id);
   
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
console.log(capLinksData);

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
                  <th className="p-3 text-sm text-center">S.No</th>
                  <th className="p-3 text-sm text-center">Image</th>
                  <th className="p-3 text-sm text-center">Name</th>
                  <th className="p-3 text-sm text-center">Comp Name</th>
                  <th className="p-3 text-sm text-center">Forwarder Name</th>
                  <th className="p-3 text-sm text-center">Manufacture Year/Month</th>
                  <th className="p-3 text-sm text-center">Uploaded At</th>
                  <th className="p-3 text-sm text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentCapLinks &&
                  currentCapLinks.map((capLink, index) => (
                      <tr key={capLink.cap_id} className="border-b text-sm ">
                        <td className="p-3 text-center">
                          {indexOfFirstCapLinks + index + 1}
                        </td>
                        <td className="p-2 flex justify-center">
                          <img
                            src={`https://jpcorporation01-production.up.railway.app/uploads/${capLink.product.featured_image}`}
                            alt="capLinks"
                            className="w-16 h-12 rounded-lg object-cover"
                          />
                        </td>
                       
                        <td className="p-3 text-center text-[12px] ">
                          {
                            capLink.shipping.carrier
                          }
                        </td>
                        <td className="p-3 text-center text-[12px]">
                          {capLink.company_name}
                        </td>
                        <td className="p-3 text-center text-[12px]">
                          {capLink.forwarder_name}
                        </td>
                        <td className="p-3 text-center text-[12px]">
                          {
                            capLink.product.manufacture_year_month
                          }
                        </td>
                        <td className="p-3 text-center text-[12px]">
                          {capLink.created_at.slice(0, 10)}
                        </td>
                        <td className=" px-3 justify-center  flex space-x-2">
                          <button
                            className="text-white py-1 px-[5px] w-[25px] h-[25px] rounded text-center bg-emerald-500 cursor-pointer"
                            onClick={() => handleEdit(parseInt(capLink.md5_id))}
                          >
                            <FaEye size={15} />
                          </button>
                          <button
                            className="text-white py-1 px-[5px] w-[25px] h-[25px] rounded text-center text-[10px] bg-orange-400 cursor-pointer"
                            onClick={() => handleEdit(parseInt(capLink.md5_id))}
                          >
                            <FaEdit size={15} />
                          </button>
                          <button
                            className="text-white py-1 px-[5px] w-[25px] h-[25px] rounded text-center text-[10px] bg-red-500 cursor-pointer"
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
