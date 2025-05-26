import { AlertCircle } from "lucide-react";
import Card from "../../common/custom-card";
import { RHFDatePicker } from "../../common/rhf-date-picker";
import { RHFInputField } from "../../common/rhf-input";
import { useEI } from "../EIContext";
import { IoMdCloseCircle } from "react-icons/io";
import { IoAddCircle, IoCloseCircle } from "react-icons/io5";
import { RHFSelect } from "../../common/rhf-multi-select";
import { experienceDocuments } from "../data";
import { RHFUploadFile } from "../../common/custom-upload-file";

export default function WorkExperience({ onNext, onPrev }) {
  const {
    workExperiences,
    appendWorkExperience,
    removeWorkExperience,
    submitErrorMessage,
    experienceAttachments,
    appendExperienceAttachments,
    removeExperienceAttachments,
  } = useEI();

  return (
    <Card
      title="Work Experience"
      extras
      buttonTitle="Add Work Experience"
      onClick={() =>
        appendWorkExperience({
          organization: "",
          jobTitle: "",
          duration: null,
          responsibilities: "",
        })
      }
    >
      {submitErrorMessage && (
        <div className="flex items-start gap-3 p-4 bg-red-100 border-l-4 border-red-500 rounded-lg text-red-600 mb-10">
          <AlertCircle className="mt-1 w-5 h-5 text-red-600" />
          <div>
            <p className="font-semibold">Missing Required Information</p>
            {submitErrorMessage}
          </div>
        </div>
      )}
      <div className="border border-slate-300 flex items-center gap-4 mt-2 rounded-md">
        <div className="text-black w-[95%] flex flex-grid grid-cols-3 xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 xs:gap-2">
          <div className="w-full pl-2 py-2">
            <span>Organisation</span>
          </div>
          <div className="w-full pl-2 py-2">
            <span>Job Title</span>
          </div>
          <div className="w-full pl-2 py-2">
            <span>Duration (From - To)</span>
          </div>
          <div className="w-full pl-2 py-2">
            <span>Key Responsibilities</span>
          </div>
        </div>
        <div className="w-[5%]"></div>
      </div>
      {workExperiences?.map((field, index) => (
        <>
          <div className="flex items-center gap-4 mt-2" key={index}>
            <div className="w-[100%] flex flex-grid grid-cols-3 xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 xs:gap-2">
              <div className="w-full">
                <RHFInputField
                  name={`workExperiences[${index}].organization`}
                  placeholder="Organization Name"
                  required
                />
              </div>
              <div className="w-full">
                <RHFInputField
                  name={`workExperiences[${index}].jobTitle`}
                  placeholder="Job Title"
                  required
                />
              </div>
              <div className="w-full">
                <RHFDatePicker
                  asSingle={false}
                  name={`workExperiences[${index}].duration`}
                  placeholder="From ~ To"
                  required
                />
              </div>
              <div className="w-full">
                <RHFInputField
                  name={`workExperiences[${index}].responsibilities`}
                  placeholder="Key Responsibilities"
                  required
                />
              </div>
            </div>
            <button
              onClick={() => {
                removeWorkExperience(index);
              }}
            >
              <IoMdCloseCircle
                size={24}
                className={`cursor-pointer text-red-500 hover:text-red-600`}
              />
            </button>
          </div>
        </>
      ))}
      <div className="flex flex-col mb-2 text-white mt-3">
        <div className="flex items-center mb-2">
          <span className="text-gray-700 mr-4 font-medium text-lg">
            Attachments
          </span>
          <div className="border-b border-gray-300 flex-grow"></div>
        </div>
        <div className="flex items-center mt-3">
          <button
            className="bg-blue-500 px-4 py-2.5 rounded text-sm flex items-center gap-3"
            type="button"
            onClick={() => {
              appendExperienceAttachments({
                file: null,
                fileUpload: "",
              });
            }}
          >
            <IoAddCircle className="text-white" size="22px" />
            Add Single or Multiple Files
          </button>
        </div>
      </div>
      <div className="w-full">
        {experienceAttachments.map((field, index) => {
          return (
            <div className="flex items-start gap-2 w-full">
              <div
                key={field.id}
                className="w-full bg-gray-50 flex items-center gap-3 p-3 border border-gray-300 rounded shadow-sm mb-4"
              >
                <RHFSelect
                  name={`experienceAttachments[${index}].file`}
                  placeholder="Select Document Type"
                  options={experienceDocuments.map((doc) => ({
                    label: doc.label,
                    value: doc.id,
                  }))}
                  required
                />
                <RHFUploadFile
                  name={`experienceAttachments[${index}].fileUpload`}
                  accept="*"
                  required
                />
                <button
                  onClick={() => {
                    removeExperienceAttachments(index);
                  }}
                >
                  <IoCloseCircle size="24px" className="text-red-500" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <div className="ei-nav">
        <button
          type="button"
          onClick={onPrev}
          className="px-4 py-2 text-sm text-white bg-gray-500 rounded hover:bg-gray-600 focus:outline-none font-medium flex items-center gap-2"
        >
          Previous
        </button>
        <button
          type="button"
          onClick={() => onNext()}
          className="px-4 py-2 text-sm text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none font-medium flex items-center gap-2"
        >
          Next
        </button>
      </div>
    </Card>
  );
}
