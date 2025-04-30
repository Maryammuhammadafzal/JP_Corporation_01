import React from "react";

const Table = () => {
  return (
    <table className="w-[70%] max-[850px]:w-full  m-3">
      <thead className="bg-emerald-400 w-full h-[60px] text-white">
        <tr>
          <th colSpan={2} className="font-bold text-3xl border-collapse">
            Bank Details
          </th>
        </tr>
      </thead>
      <tbody className="w-full ">
        <tr className=" bg-blue-800 text-start text-white">
          <th className="w-[30%] text-start px-3 py-2 border-r border-b border-gray-400">
            Feilds
          </th>
          <th className="w-[70%] text-start px-3 py-2">Details</th>
        </tr>
        <tr className="border-r border-b border-gray-400">
          <td className="p-3 max-[360px]:text-[12px] max-[500px]:text-[14px] hover:bg-neutral-300 bg-neutral-200 border-r border-b border-gray-400">
            Company Name
          </td>
          <td className="p-3 max-[360px]:text-[12px] max-[500px]:text-[14px] hover:bg-neutral-300 bg-neutral-200">
            {" "}
            JP Corporation
          </td>
        </tr>
        <tr className="border-r border-b border-gray-400">
          <td className="p-3 max-[360px]:text-[12px] max-[500px]:text-[14px] hover:bg-neutral-300  border-r border-b border-gray-400">
            Address
          </td>
          <td className="p-3 max-[360px]:text-[12px] max-[500px]:text-[14px] hover:bg-neutral-300">
            {" "}
            Ibaraki Prefecture, Omitama City, Hatori 2614-17, Postal Code
            319-0123
          </td>
        </tr>
        <tr className="border-r border-b border-gray-400">
          <td className="p-3 max-[360px]:text-[12px] max-[500px]:text-[14px] hover:bg-neutral-300 bg-neutral-200 border-r border-b border-gray-400">
            Bank Name
          </td>
          <td className="p-3 max-[360px]:text-[12px] max-[500px]:text-[14px] hover:bg-neutral-300 bg-neutral-200">
            Mizuho Bank
          </td>
        </tr>
        <tr className="border-r border-b border-gray-400">
          <td className="p-3 max-[360px]:text-[12px] max-[500px]:text-[14px] hover:bg-neutral-300 border-r border-b border-gray-400">
            Branch Name
          </td>
          <td className="p-3 max-[360px]:text-[12px] max-[500px]:text-[14px] hover:bg-neutral-300">
            {" "}
            Mito Branch/316
          </td>
        </tr>
        <tr className="border-r border-b border-gray-400">
          <td className="p-3 max-[360px]:text-[12px] max-[500px]:text-[14px] hover:bg-neutral-300 bg-neutral-200 border-r border-b border-gray-400">
            Account Type
          </td>
          <td className="p-3 max-[360px]:text-[12px] max-[500px]:text-[14px] hover:bg-neutral-300 bg-neutral-200">
            Ordinary
          </td>
        </tr>
        <tr className="border-r border-b border-gray-400">
          <td className="p-3 max-[360px]:text-[12px] max-[500px]:text-[14px] hover:bg-neutral-300  border-r border-b border-gray-400">
            Account Name
          </td>
          <td className="p-3 max-[360px]:text-[12px] max-[500px]:text-[14px] hover:bg-neutral-300 ">
            J.P Corporation
          </td>
        </tr>
        <tr className="border-r border-b border-gray-400">
          <td className="p-3 max-[360px]:text-[12px] max-[500px]:text-[14px] hover:bg-neutral-300 bg-neutral-200 border-r border-b border-gray-400">
            Account Number
          </td>
          <td className="p-3 max-[360px]:text-[12px] max-[500px]:text-[14px] hover:bg-neutral-300 bg-neutral-200">
            3050233
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default Table;
