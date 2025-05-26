import Card from "../../common/custom-card";
import { RHFInputField } from "../../common/rhf-input";
import { RHFSelect } from "../../common/rhf-multi-select";
import { RHFYearPicker } from "../../common/rhf-year-picker";
import { countries, educationalDocuments } from "../data";
import { useEI } from "../EIContext";
import { IoMdCloseCircle } from "react-icons/io";
import { AlertCircle } from "lucide-react";
import { IoAddCircle, IoCloseCircle } from "react-icons/io5";
import { RHFUploadFile } from "../../common/custom-upload-file";

export default function Qualifications({ onNext, onPrev, isLast }) {
  const {
    qualifications,
    appendQualification,
    removeQualification,
    submitErrorMessage,
    educationalAttachments,
    appendEducationalAttachments,
    removeEducationalAttachments,
  } = useEI();

  return (
    <Card
      title="Educational Qualifications"
      extras
      buttonTitle="Add Qualification"
      onClick={() =>
        appendQualification({
          degree: "",
          intituteName: "",
          yearCompleted: null,
          country: null,
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
      {/* —— info banner appears **only** when the list is empty —— */}
      {qualifications.length === 0 && (
        <p className="text-red-600 my-4 bg-red-100 border border-red-300 rounded-md p-3">
          <strong>No qualification added.</strong> <br />
          Please add <em>at least one</em> educational qualification before you
          proceed to the next step.
        </p>
      )}
      <div className="border border-slate-300 flex items-center gap-4 mt-2 rounded-md">
        <div className="text-black w-[95%] flex flex-grid grid-cols-3 xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 xs:gap-2">
          <div className="w-full pl-2 py-2">
            <span>Degree</span>
          </div>
          <div className="w-full pl-2 py-2">
            <span>Institute Name</span>
          </div>
          <div className="w-full pl-2 py-2">
            <span>Year Completed</span>
          </div>
          <div className="w-full pl-2 py-2">
            <span>Country</span>
          </div>
        </div>
        <div className="w-[5%]"></div>
      </div>
      {qualifications?.map((field, index) => (
        <>
          <div className="flex items-center gap-4 mt-2" key={index}>
            <div className="w-[100%] flex flex-grid grid-cols-3 xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 xs:gap-2">
              <div className="w-full">
                <RHFInputField
                  name={`qualifications[${index}].degree`}
                  placeholder="Enter Degree Name"
                  required
                />
              </div>
              <div className="w-full">
                <RHFInputField
                  name={`qualifications[${index}].intituteName`}
                  placeholder="Enter Institution Name"
                  required
                />
              </div>
              <div className="w-full">
                <RHFYearPicker
                  name={`qualifications[${index}].yearCompleted`}
                  placeholder="Select Year"
                  required
                />
              </div>
              <div className="w-full">
                <RHFSelect
                  name={`qualifications[${index}].country`}
                  placeholder="Select Country"
                  options={countries}
                />
              </div>
            </div>
            <button
              onClick={() => {
                removeQualification(index);
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
              appendEducationalAttachments({
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
        {educationalAttachments.map((field, index) => {
          return (
            <div className="flex items-start gap-2 w-full">
              <div
                key={field.id}
                className="w-full bg-gray-50 flex items-center gap-3 p-3 border border-gray-300 rounded shadow-sm mb-4"
              >
                <RHFSelect
                  name={`educationalAttachments[${index}].file`}
                  placeholder="Select Document Type"
                  options={educationalDocuments.map((doc) => ({
                    label: doc.label,
                    value: doc.id,
                  }))}
                  required
                />
                <RHFUploadFile
                  name={`educationalAttachments[${index}].fileUpload`}
                  accept="*"
                  required
                />
                <button
                  onClick={() => {
                    removeEducationalAttachments(index);
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
