import { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { InformationCircleIcon } from "@heroicons/react/24/outline";

const company = [
  {
    imoNo: 9529463,
    companyName: "BERNHARD SCHULTE SHIPMANAGEMENT (CYPRUS) LIMITED",
    docExpiry: "23-JAN-2023",
    totalVessels: "10",
    status: "Active",
  },
  {
    imoNo: 9718064,
    companyName: "CL YINGDU LIMITED",
    docExpiry: "9-JUN-2023",
    totalVessels: "20",
    status: "Active",
  },
  {
    imoNo: 9448827,
    companyName: "THOMAS SCHULTE SHIP MANAGEMENT GMBH & CO. KG",
    docExpiry: "8-OCT-2023",
    totalVessels: "10",
    status: "Active",
  },
  {
    imoNo: 9319686,
    companyName: "SYNERGY DENMARK A/S",
    docExpiry: "2-DEC-2023",
    totalVessels: "40",
    status: "Active",
  },
  {
    imoNo: 9337028,
    companyName: "BERNHARD SCHULTE SHIPMANAGEMENT (CYPRUS) LIMITED",
    docExpiry: "5-FEB-2024",
    totalVessels: "5",
    status: "In Active",
  },
  {
    imoNo: 9337041,
    companyName: "BERNHARD SCHULTE SHIPMANAGEMENT (CYPRUS) LIMITED",
    docExpiry: "5-FEB-2024",
    totalVessels: "5",
    status: "In Active",
  },
  {
    imoNo: 9337016,
    companyName: "BERNHARD SCHULTE SHIPMANAGEMENT (CYPRUS) LIMITED",
    docExpiry: "5-FEB-2024",
    totalVessels: "5",
    status: "In Active",
  },
];
var filteredCompanyList;
export function Vessel() {
  const [activeStatus, setActiveStatus] = useState(true);
  const [searchArray, setSearchArray] = useState("");

  const toggleActiveStatus = () => {
    setActiveStatus(true);
  };

  filteredCompanyList = company.filter(
    (companyDetails) => companyDetails.status === "Active"
  );

  if (activeStatus === true) {
    filteredCompanyList = company.filter(
      (companyDetails) => companyDetails.status === "Active"
    );
  } else {
    filteredCompanyList = company.filter(
      (companyDetails) => companyDetails.status !== "Active"
    );
  }

  if (searchArray !== "") {
    filteredCompanyList = filteredCompanyList.filter((searchData) => {
      return (
        searchData.companyName
          .toLowerCase()
          .includes(searchArray.toLowerCase()) ||
        searchData.imoNo.toString().includes(searchArray) ||
        searchData.totalVessels.toString().includes(searchArray) ||
        searchData.docExpiry
          .toString()
          .toLowerCase()
          .includes(searchArray.toLowerCase())
      );
    });
  }

  const toggleInActiveStatus = () => {
    setActiveStatus(false);
  };

  const searchBarText = (event) => {
    setSearchArray(event.target.value);
  };

  return (
    <>
      <div className="bg-white px-6 py-1 ">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-xl font-bold tracking-tight text-[#467199]">
            Company List
          </h1>
        </div>
      </div>
      <div className="px-4 sm:px-6 lg:px-8 py-3">
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:text-[12px] text-[8px] ">
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 sm:text-[12px] text-[8px]">
            <div className=" [word-wrap: break-word] flex h-[30px] sm:h-[32px] justify-center rounded-[15px] sm:rounded-[16px] border border-[#467199] bg-[#eceff1] text-[#FFCA28] font-semibold items-center">
              180 Days
            </div>
            <div className=" [word-wrap: break-word] flex h-[30px] sm:h-[32px] justify-center rounded-[15px] sm:rounded-[16px] border border-[#467199] bg-[#eceff1] text-[#EE8250] font-semibold items-center">
              90 Days
            </div>
            <div className="[word-wrap: break-word] flex h-[30px] sm:h-[32px]  justify-center rounded-[15px] sm:rounded-[16px] border border-[#467199] bg-[#eceff1] text-[#D43E3F] font-semibold items-center">
              Expired
            </div>
          </div>
          <div>
            {activeStatus ? (
              <button
                type="button"
                className="py-2 px-2 sm:text-[12px] text-[8px] inline-flex h-[32px] items-center gap-2 first:rounded-l-lg  last:rounded-r-lg border font-medium  align-middle border-[#467199]  z-10 outline-none text-white bg-[#467199] sm:bg-[#467199] transition-all text-sm"
                value={activeStatus}
                onClick={toggleActiveStatus}
              >
                Active
              </button>
            ) : (
              <button
                type="button"
                className="py-2 px-2 sm:text-[12px] text-[8px] inline-flex  h-[32px] items-center gap-2  first:rounded-l-lg last:rounded-r-lg border font-medium bg-white sm:bg-white text-gray-700 align-middle border-[#467199]  focus:z-10 focus:outline-none focus:text-white  transition-all text-sm"
                value={activeStatus}
                onClick={toggleActiveStatus}
              >
                Active
              </button>
            )}

            {!activeStatus ? (
              <button
                type="button"
                className="py-2 px-2 sm:text-[12px]  text-[8px] inline-flex  h-[32px] items-center gap-2  first:rounded-l-lg  last:rounded-r-lg border font-medium  align-middle border-[#467199]  z-10 outline-none text-white bg-[#467199] sm:bg-[#467199] transition-all text-sm"
                onClick={toggleInActiveStatus}
              >
                In Active
              </button>
            ) : (
              <button
                type="button"
                className="py-2 px-2 sm:text-[12px] text-[8px] inline-flex  h-[32px] items-center gap-2 first:rounded-l-lg  last:rounded-r-lg border font-medium bg-white sm:bg-white text-gray-700 align-middle border-[#467199]  focus:z-10 focus:outline-none focus:text-white  transition-all text-sm"
                onClick={toggleInActiveStatus}
              >
                In Active
              </button>
            )}
          </div>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-2 sm:text-[12px] text-[8px]">
            <div>
              <button
                type="button"
                className="bg-[#467199] block rounded-lg px-3 py-2 sm:float-right font-semibold h-[30px] sm:h-[32px] text-white shadow-sm"
              >
                Refresh
              </button>
            </div>
            <div className="relative">
              <input
                type="text"
                placeholder=" Search..."
                className="float-center sm:float-right relative rounded-md border h-[30px] sm:h-[32px] border-[#9fa6b2] sm:text-[12px] text-[8px] text-gray-500"
                onChange={searchBarText}
              />
              <button className="absolute inset-y-0 sm:right-0 -right-12 px-2 text-gray-400">
                <MagnifyingGlassIcon className="h-5 w-5 float-right "></MagnifyingGlassIcon>
              </button>
            </div>
          </div>
        </div>

        <div className="mt-2 flow-root">
          <div className="-mx-4 -my-1 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-[#467199] text-white">
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left sm:text-[12px] text-[8px] font-semibold sm:pl-6"
                      >
                        IMO No.
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left sm:text-[12px] text-[8px] font-semibold "
                      >
                        Company Name
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left sm:text-[12px] text-[8px] font-semibold "
                      >
                        DOC Expiry
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left sm:text-[12px] text-[8px] font-semibold "
                      >
                        Total Vessels
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left sm:text-[12px] text-[8px] font-semibold "
                      >
                        Status
                      </th>
                      <th
                        scope="col"
                        className="relative py-3.5 pl-3 pr-4 sm:text-[12px] text-[8px]  font-semibold"
                      >
                        More Info
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {filteredCompanyList.map((companyData) => (
                      <tr key={companyData.email}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 sm:text-[12px] text-[8px] font-medium text-gray-900 sm:pl-6">
                          {companyData.imoNo}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 sm:text-[12px] text-[8px] text-gray-500">
                          {companyData.companyName}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 sm:text-[12px] text-[8px] text-gray-500">
                          {companyData.docExpiry}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 sm:text-[12px] text-[8px] text-gray-500">
                          {companyData.totalVessels}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 sm:text-[12px] text-[8px] text-gray-500">
                          {companyData.status}
                        </td>
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right sm:text-[12px] text-[8px] font-medium sm:pr-6">
                          <a
                            href="/home/FleetOverview/dpaCompanyInfo"
                            className="text-[#467199]"
                          >
                            <InformationCircleIcon className="h-5 w-5"></InformationCircleIcon>
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
                  <div className="flex flex-1 justify-between sm:hidden">
                    <a
                      href="#"
                      className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 sm:text-[12px] text-[8px] font-medium text-gray-700 hover:bg-gray-50"
                    >
                      Previous
                    </a>
                    <a
                      href="#"
                      className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 sm:text-[12px] text-[8px] font-medium text-gray-700 hover:bg-gray-50"
                    >
                      Next
                    </a>
                  </div>
                  <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between ">
                    <div>
                      <p className="text-sm text-gray-700">
                        Showing <span className="font-medium">1</span> to{" "}
                        <span className="font-medium">10</span> of{" "}
                        <span className="font-medium">
                          {filteredCompanyList.length}
                        </span>{" "}
                        results
                      </p>
                    </div>
                    <div>
                      <nav
                        className="isolate inline-flex -space-x-px rounded-md shadow-sm"
                        aria-label="Pagination"
                      >
                        <a
                          href="#"
                          className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                        >
                          <span className="sr-only">Previous</span>
                          <ChevronLeftIcon
                            className="h-5 w-5"
                            aria-hidden="true"
                          />
                        </a>

                        <a
                          href="#"
                          aria-current="page"
                          className="relative bg-[#467199] z-10 inline-flex items-center  px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                          1
                        </a>

                        <a
                          href="#"
                          className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                        >
                          <span className="sr-only">Next</span>
                          <ChevronRightIcon
                            className="h-5 w-5"
                            aria-hidden="true"
                          />
                        </a>
                      </nav>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex mt-10 justify-between border border-gray-300 sm:text-[12px] text-[8px] font-medium text-gray-700">
                <div>
                  <p>DOC is going to expire in 180 Days</p>
                </div>
                <div>
                  <p>DOC is going to expire in 90 Days</p>
                </div>
                <div>
                  <p>DOC has Expired</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Vessel;
