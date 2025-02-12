import React from "react";
import { FiClock } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { getStatusBgColor } from "src/utils/functions";
import { MdScoreboard } from "react-icons/md";
import { MdCreateNewFolder } from "react-icons/md";
import { FaFileSignature } from "react-icons/fa6";

const ProjectCard = ({ details, projectType }) => {
  const ongoing = projectType === "on going" ? true : false;
  const navigate = useNavigate();

  return (
    <div className="border border-silver-600 rounded-lg shadow-sm">
      <div
        onClick={() => {
          const searchParams = new URLSearchParams({ id: details?.id });
          navigate({
            pathname: "/pmt-dashboard/proposal-discussion",
            search: `?${searchParams.toString()}`,
          });
        }}
        className={`cursor-pointer relative p-6 flex flex-col items-start gap-2 lg:flex-row lg:justify-between ${
          ongoing ? "lg:items-start" : "lg:items-center"
        } max-w-full`}
      >
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-1">
            <div className="flex gap-4 items-center">
              <p className="text-md font-semibold mt-3 lg:mt-0 p-0 m-0">
                {details?.title}
              </p>
              <p
                className={`xs:hidden sm:hidden md:hidden lg:block text-white font-normal text-sm p-1.5 rounded-full bg-${getStatusBgColor(
                  details.status
                )} bg-blue-500 px-4`}
              >
                {details?.status}
              </p>
            </div>
            <p className="text-sm py-2">{details?.desc}</p>
          </div>
          <div className="flex lg:flex-row lg:gap-4 md:flex-col md:gap-1 sm:flex-col sm:gap-1 xs:flex-col xs:gap-1 gap-4">
            <div className="flex gap-2">
              <p className="text-sm text-gray-700 font-semibold">Created By:</p>
              <p className="text-sm text-gray-700">{details?.createdBy}</p>
            </div>
            <div className="flex gap-2">
              <p className="text-sm text-gray-700 font-semibold">
                Last Edited By:
              </p>
              <p className="text-sm text-gray-700">{details?.lastEditedBy}</p>
            </div>
          </div>
        </div>
        {ongoing ? (
          <div className="flex lg:flex-row lg:gap-4 md:flex-col md:gap-1 sm:flex-col sm:gap-1 xs:flex-col xs:gap-1 gap-4">
            <div className="flex items-center gap-2 text-sm">
              <p>4</p>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <FiClock />
              <p>3 days ago</p>
            </div>
          </div>
        ) : (
          <div className="flex flex-row gap-4 lg:flex-col items-center">
            <p className="text-md font-semibold">Proposal Submissions</p>
            <h2 className="text-4xl font-bold">{details?.totalSubmissions}</h2>
          </div>
        )}
        <p
          className={`absolute right-0 top-0 lg:hidden text-white font-normal text-sm p-1 rounded-tr-lg bg-${getStatusBgColor(
            details.status
          )} bg-blue-500 px-4`}
        >
          {details?.status}
        </p>
      </div>
      <div className="border border-b mt-3" />
      <div className="ps-6 py-3 flex gap-3 flex-col items-start md:items-center md:flex-row bg-gray-50">
        <button
          className="p-2.5 bg-blue-500 no-underline  text-white rounded-md text-sm flex items-center gap-1"
          onClick={() => navigate("/pmt-dashboard/scoring-template")}
        >
          <MdScoreboard size="20px" />
          Score This Proposal
        </button>
        <button
          className="p-2.5 bg-lime-500 no-underline text-white rounded-md text-sm flex items-center gap-1"
          onClick={() => navigate("/pmt-dashboard/change-request-form")}
        >
          <FaFileSignature size="20px" />
          Change Request Form
        </button>
        <button
          className="p-2.5 bg-green-500 no-underline text-white rounded-md text-sm flex items-center gap-1"
          onClick={() => {
            const searchParams = new URLSearchParams({ id: details?.id });
            navigate({
              pathname: "/pmt-dashboard/create-proposal",
              search: `?${searchParams.toString()}`,
            });
          }}
        >
          <MdCreateNewFolder size="20px" />
          Create a Proposal
        </button>
      </div>
    </div>
  );
};

export default ProjectCard;
