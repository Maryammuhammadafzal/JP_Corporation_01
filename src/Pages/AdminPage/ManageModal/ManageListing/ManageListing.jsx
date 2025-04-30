import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import axios from "axios";
import Copyright from "../../../../Components/Copyright/Copyright";
import Pagination from "../../../../Components/Pagination/Pagination";

const ManageListing = () => {
  const [search, setSearch] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [modalData, setModalData] = useState([]);

  const fetchModalData = async () => {
    try {
      const res = await axios.get("/api/model");
      const data = await res.data;
      setModalData(data);
    } catch (error) {
      console.log("error", error.message);
    }
  };

  useEffect(() => {
    fetchModalData();
  }, []);

  // allModals array
  const allModals = modalData;

  // Filter search
  const filteredModals = allModals.map((car) => {
    car?.carTitle?.toLowerCase()?.includes(search?.toLowerCase());
  });

  // Pagination Logic
  const indexOfLastModal = currentPage * entriesPerPage;
  const indexOfFirstModal = indexOfLastModal - entriesPerPage;
  const currentModal = allModals.slice(indexOfFirstModal, indexOfLastModal);
  const totalPages = Math.ceil(filteredModals.length / entriesPerPage);

  const handleDelete = async (id, title) => {
    const response = await axios.delete(
      `/api/model/delete/${id}`
    );
    if (response.status === 200) {
      alert(`${title} deleted`);
      fetchModalData();
    } else {
      alert("error");
    }
  };
  const handleEdit = async (id) => {
    localStorage.setItem("EditId", id);
    window.location.href = `/modal-listing/edit-modal-listing/get/${id}`;
  };

  const handleEntriesChange = (e) => {
    setEntriesPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to page 1
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const showModelListingForm = () => {
    window.location.href = "/model-listing/add-model-listing";
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
    <div className="w-full h-full rounded-tr-[50px] flex flex-col overflow-y-auto ">
      <div className="w-full  max-h-[1450px] min-h-screen flex flex-col gap-4 max-sm:p-3 p-5 items-start">
        <div className="w-[95%] mx-auto border rounded-md py-3">
          <div className="flex justify-between items-center border-b max-sm:p-3 p-6 mb-4">
            <h1 className="text-3xl font-bold max-md:text-2xl max-sm:text-xl">
              Manage Modal
            </h1>
            <button
              type="button"
              className="bg-orange-400 text-white px-4 max-sm:text-xs max-sm:px-3 py-2 rounded-lg cursor-pointer"
              onClick={showModelListingForm}
            >
              Add Modal
            </button>
          </div>

          {/* Controls */}
          <div className=" flex flex-col md:flex-row max-md:gap-6 justify-between max-md:items-start max-md:w-full items-center max-md:px-3 px-6 py-2 mb-4 gap-4">
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

          <div className="overflow-x-auto">
            <table className="min-w-full p-3 bg-white max-sm:text-sm rounded-lg shadow-md">
              <thead className="p-3 border-b">
                <tr>
                  <th className="w-[10%] text-center p-5">S.No</th>
                  <th className="w-[20%] text-start p-5">Modal</th>
                  <th className="w-[20%] text-start p-5">Make</th>
                  <th className="w-[20%] text-center p-5">Actions</th>
                </tr>
              </thead>

  <tbody>
  {currentModal && currentModal
    .filter((modal) =>
      modal.modalTitle
        .toLowerCase()
        .includes(search.toLowerCase())
    )
    .slice(0, entriesPerPage)
    .map((modal, index) => (
      <tr key={modal._id} className="border-b ">
        <td className="p-4 text-center">
          {indexOfFirstModal + index + 1}
        </td>
        <td className="p-4 text-start">{modal.modalTitle}</td>
        <td className="p-4 text-start">{modal.modalMake}</td>
        <td className="p-4 justify-center flex space-x-2">
          <button
            className="text-white p-1 rounded bg-orange-400"
            onClick={() =>
              handleEdit(modal._id, modal.modalTitle)
            }
          >
            <FaEdit size={13} />
          </button>
          <button
            className="text-white p-1 rounded bg-red-500"
            onClick={() =>
              handleDelete(modal._id, modal.modalTitle)
            }
          >
            <FaTrash size={13} />
          </button>
        </td>
      </tr>
    ))}
     
</tbody>
             
            </table>
          </div>

          <div className=" flex w-full max-md:flex-col max-md:gap-3 max-md:p-3 p-6 justify-between items-center">
            <div className="dataNumber w-auto text-sm max-sm:text-xs text-neutral-600 flex justify-start font-semibold ">
              <p>{`Showing ${indexOfFirstModal} to ${indexOfLastModal} of ${allModals.length} entries`}</p>
            </div>
          <Pagination 
          currentPage={currentPage}
          totalPages={totalPages}
          goToPage={goToPage}
          goToPreviousPage={goToPreviousPage}
          goToNextPage={goToNextPage}/>
          </div>
        </div>
        <div className="w-full h-[150px] ">
          <Copyright />
        </div>
      </div>
    </div>
  );
};

export default ManageListing;
