import Card from "../../common/custom-card";
import { useEI } from "../EIContext";
import { IoAddCircle, IoCloseCircle } from "react-icons/io5";
import { RHFSelect } from "../../common/rhf-multi-select";
import { RHFUploadFile } from "../../common/custom-upload-file";
import { RHFRadioGroup } from "../../common/rhf-grouped-radio";
import { documents } from "../data";
import { AlertCircle } from "lucide-react";

export default function DocumentsUpload({ onNext, onPrev }) {
  const {
    attachments,
    appendAttachments,
    removeAttachments,
    submitErrorMessage,
  } = useEI();

  return (
    <Card title="HR & Compliance Documents">
      {submitErrorMessage && (
        <div className="flex items-start gap-3 p-4 bg-red-100 border-l-4 border-red-500 rounded-lg text-red-600 my-10">
          <AlertCircle className="mt-1 w-5 h-5 text-red-600" />
          <div>
            <p className="font-semibold">Missing Required Information</p>
            {submitErrorMessage}
          </div>
        </div>
      )}
      <div
        className="flex flex-col p-4 my-4 text-blue-600 border border-blue-300 rounded-lg bg-blue-100 "
        role="alert"
      >
        <div className="flex items-center text-[15]" role="alert">
          <svg
            className="flex-shrink-0 inline w-4 h-4 me-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
          </svg>
          <span className="sr-only">Info</span>
          <div className="font-medium">
            <span>Info!</span> Employees must upload scanned copies of the
            following documents and must check the box if is pending or uploaded
          </div>
        </div>
      </div>
      <div className="max-w-2xl p-6 bg-white rounded-lg border border-slate-200">
        <div className="grid grid-cols-2 border-b pb-2 font-semibold">
          <div>Document Type</div>
          <div>Upload Status</div>
        </div>
        {documents.map((doc, index) => (
          <div
            key={doc.id}
            className="grid grid-cols-2 items-center border-b py-2 text-sm"
          >
            <span className="font-medium">{doc.label}</span>
            <div className="flex items-center space-x-4">
              <RHFRadioGroup
                options={[
                  { label: "Uploaded", value: "uploaded" },
                  { label: "Pending", value: "pending" },
                ]}
                name={`documents.${index}.status`} // Reference status correctly
                required
              />
            </div>
          </div>
        ))}
      </div>
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
              appendAttachments({
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
        {attachments.map((field, index) => {
          return (
            <div className="flex items-start gap-2 w-full">
              <div
                key={field.id}
                className="w-full bg-gray-50 flex items-center gap-3 p-3 border border-gray-300 rounded shadow-sm mb-4"
              >
                <RHFSelect
                  name={`attachments[${index}].file`}
                  placeholder="Select Document Type"
                  options={documents.map((doc) => ({
                    label: doc.label,
                    value: doc.id,
                  }))}
                  required
                />
                <RHFUploadFile
                  name={`attachments[${index}].fileUpload`}
                  accept="*"
                  required
                />
                <button
                  onClick={() => {
                    removeAttachments(index);
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
