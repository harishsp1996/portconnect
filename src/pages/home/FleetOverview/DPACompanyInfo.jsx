import { useState } from "react";
import IRIlogo from "../../../assets/img/IRI-logo.jpg";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { ChevronUpIcon } from "@heroicons/react/24/outline";
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

const accordionData = [
  {
    title: "DPA MR. LEONARD RODRIGUEZ",
    content: [
      {
        vesselName: "NORDIC ORION",
        vesselImoNumber: 9529463,
        officialNo: 9529463,
        solasCategory: "BULK CARRIER",
      },
      {
        vesselName: "NORDIC ORION",
        vesselImoNumber: 9529463,
        officialNo: 9529463,
        solasCategory: "BULK CARRIER",
      },
    ],
  },
  {
    title: "DPA MR. PETER HAWKIN",
    content: [
      {
        vesselName: "CL YINGDU",
        vesselImoNumber: 9529463,
        officialNo: 9529463,
        solasCategory: "BULK CARRIER",
      },
      {
        vesselName: "CL YINGDU",
        vesselImoNumber: 9529463,
        officialNo: 9529463,
        solasCategory: "BULK CARRIER",
      },
    ],
  },
  {
    title: "DPA MR. ALASTAIR FLEMING",
    content: [
      {
        vesselName: "CL YINGDU",
        vesselImoNumber: 9529463,
        officialNo: 9529463,
        solasCategory: "BULK CARRIER",
      },
      {
        vesselName: "CL YINGDU",
        vesselImoNumber: 9529463,
        officialNo: 9529463,
        solasCategory: "BULK CARRIER",
      },
    ],
  },
  {
    title: "CAPTION",
    content: [
      {
        vesselName: "CL YINGDU",
        vesselImoNumber: 9529463,
        officialNo: 9529463,
        solasCategory: "BULK CARRIER",
      },
      {
        vesselName: "CL YINGDU",
        vesselImoNumber: 9529463,
        officialNo: 9529463,
        solasCategory: "BULK CARRIER",
      },
    ],
  },
  {
    title: "CLIENT",
    content: [
      {
        vesselName: "CL YINGDU",
        vesselImoNumber: 9529463,
        officialNo: 9529463,
        solasCategory: "BULK CARRIER",
      },
      {
        vesselName: "CL YINGDU",
        vesselImoNumber: 9529463,
        officialNo: 9529463,
        solasCategory: "BULK CARRIER",
      },
    ],
  },
];

export function DPACompanyInfo() {
  const [toggle, setToggle] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleToggleSetIsActive = (id) => {
    if (toggle === id) {
      setToggle(null);
      return false;
    }
    setToggle(id);
  };

  const handleMoreInfo = (modalState) => {
    setShowModal(modalState);
  };

  return (
    <>
      <div className="bg-white px-6 py-0 ">
        <div className="mx-auto  max-w-2xl text-center">
          <h1 className="text-xl font-bold tracking-tight text-[#467199]">
            Company Information
          </h1>
        </div>
      </div>

      <div className="flex border border-[#467199] mt-1">
        <div className="p-2 flex">
          <div className="flex shrink-0 items-center m-4">
            <img className="h-28 w-28 " src={IRIlogo} alt="Your Company" />
          </div>

          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 sm:text-[12px] text-[8px] ">
            <div className="font-semibold text-[#467199]">
              NAME
              <div className="font-normal text-[#000000]">Archana</div>
            </div>
            <div className="font-semibold text-[#467199]">
              IMO NUMBER
              <div className="font-normal  text-[#000000]">9123456</div>
            </div>

            <div className="font-semibold text-[#467199]">
              DOC NUMBER
              <div className="font-normal  text-[#000000]">456235</div>
            </div>
            <div className="font-semibold text-[#467199]">
              ADDRESS
              <div className="font-normal  text-[#000000]">
                "BERNHARD SCHULTE SHIPMANAGEMENT (CYPRUS) LIMITED"
              </div>
            </div>
            <div className="font-semibold text-[#467199]">
              DOC EXPIRY
              <div className="font-normal  text-[#000000]">23-JAN-2020</div>
            </div>
            <div className="font-semibold text-[#467199]">
              DOC ISSUE
              <div className="font-normal  text-[#000000]">23-FEB-2020</div>
            </div>
            <div className="font-semibold text-[#467199]">
              STATUS
              <div className="font-normal  text-[#000000]">ACTIVE</div>
            </div>
          </div>
        </div>
      </div>

      <hr className="mt-2 border-1 border-gray-500 cursor-pointer hover:border-red-500 duration-500 " />
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-2 sm:text-[12px] text-[8px] py-2 ">
        <div className="font-semibold text-[#467199]">
          <h1 className="text-[12px]  p-1 sm:text-[14px] font-bold tracking-tight text-[#467199]">
            User List
          </h1>
        </div>

        <div className="font-semibold text-[#467199]">
          <button className="text-[12px] bg-[#467199] p-1 rounded-lg text-white sm:text-[14px] font-bold tracking-tight text-[#467199] float-right">
            Total Vessels 20
          </button>
        </div>
      </div>

      <div>
        {accordionData.map((Data, index) => (
          <div
            className="rounded-t-lg border border-[#467199] sm:border-[#467199] bg-white  sm:bg-white"
            key={index}
          >
            <h2 className="mb-0" id="headingOne">
              <button
                className="group  relative font-semibold flex w-full items-center rounded-t-lg border-0 text-[#467199] sm:text-[#467199] sm:bg-white bg-white px-3 py-2 text-left text-[13px] p-1 sm:text-xm  transition [overflow-anchor:none] hover:z-[2] focus:z-[3] focus:outline-none "
                type="button"
                data-te-collapse-init
                data-te-target="#flush-collapseOne"
                aria-expanded="false"
                aria-controls="flush-collapseOne"
                onClick={() => handleToggleSetIsActive(index)}
                toggle={toggle}
              >
                {Data.title}
                <span className="-mr-1 ml-auto h-5 w-5 shrink-0 fill-[#336dec] transition-transform duration-200 ease-in-out group-[[data-te-collapse-collapsed]]:mr-0 group-[[data-te-collapse-collapsed]]:rotate-0 group-[[data-te-collapse-collapsed]]:fill-[#212529] motion-reduce:transition-none dark:fill-blue-300 dark:group-[[data-te-collapse-collapsed]]:fill-white">
                  {index === toggle ? (
                    <ChevronUpIcon className="h-5 w-5 float-right "></ChevronUpIcon>
                  ) : (
                    <ChevronDownIcon className="h-5 w-5 float-right "></ChevronDownIcon>
                  )}
                </span>
              </button>
            </h2>

            {index === toggle ? (
              <div
                id="flush-collapseOne"
                className="!visible border-0 bg-white text-[8px] p-1 sm:text-[12px] sm:bg-white"
                data-te-collapse-item
                data-te-collapse-show
                aria-labelledby="flush-headingOne"
              >
                <div className="px-5 py-4 bg-white sm:bg-white">
                  <div className="-mx-4 -my-1 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-1 align-middle sm:px-6 lg:px-8">
                      <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
                        <table className="min-w-full divide-y divide-gray-300">
                          <thead className="bg-[#467199] text-white">
                            <tr>
                              <th
                                scope="col"
                                className="py-3 pl-4 pr-3 text-left text-sm font-semibold sm:pl-6"
                              >
                                Vessel Name
                              </th>

                              <th
                                scope="col"
                                className="px-3 py-3 text-left text-sm font-semibold "
                              >
                                IMO No.
                              </th>

                              <th
                                scope="col"
                                className="px-3 py-3 text-left text-sm font-semibold "
                              >
                                Official No.
                              </th>

                              <th
                                scope="col"
                                className="px-3 py-3 text-left text-sm font-semibold "
                              >
                                SOLAS category
                              </th>

                              <th
                                scope="col"
                                className="relative py-3 text-left text-sm  font-semibold"
                              >
                                More Info
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200 bg-white text-[#467199]">
                            {Data.content.map((companyData) => (
                              <tr key={companyData.email}>
                                <td className="whitespace-nowrap py-2 pl-4 pr-3 text-sm font-medium sm:pl-6">
                                  {companyData.vesselName}
                                </td>

                                <td className="whitespace-nowrap px-2 py-2 text-sm">
                                  {companyData.vesselImoNumber}
                                </td>

                                <td className="whitespace-nowrap px-2 py-2 text-sm">
                                  {companyData.officialNo}
                                </td>

                                <td className="whitespace-nowrap px-2 py-2 text-sm">
                                  {companyData.solasCategory}
                                </td>

                                <td className="relative whitespace-nowrap text-sm font-medium sm:pr-6 ">
                                  <a
                                    href="#"
                                    className="relative text-[#467199] "
                                  >
                                    <InformationCircleIcon
                                      className="h-5 w-5"
                                      onClick={() => handleMoreInfo(true)}
                                    ></InformationCircleIcon>
                                  </a>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        ))}
      </div>

      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-center p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-[12px] font-semibold justify-center text-[#467199]">
                    DPA INFORMATION
                  </h3>
                </div>
                <div className="relative p-6 flex-auto">
                  <table className="w-[250px] sm:w-[250px] divide-y divide-gray-300 justify-center">
                    <tbody className="divide-y divide-gray-200 bg-white sm:text-[12px] text-[10px] text-[#467199]">
                      {company.map((companyData) => (
                        <tr>
                          <td>{companyData.imoNo}</td>
                          <td>:</td>
                          <td>{companyData.status}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="flex items-center justify-end p-2 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="background-transparent rounded-lg bg-[#467199] text-white font-bold uppercase px-2 py-2 sm:text-[12px] text-[8px] outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
export default DPACompanyInfo;
