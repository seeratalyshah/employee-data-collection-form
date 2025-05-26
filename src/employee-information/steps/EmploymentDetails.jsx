import Card from "../../common/custom-card";
import { RHFInputField } from "../../common/rhf-input";
import { RHFDatePicker } from "../../common/rhf-date-picker";
import { RHFSelect } from "../../common/rhf-multi-select";
import { countries, employmentDocuments } from "../data";
import { useEI } from "../EIContext";
import { AlertCircle } from "lucide-react";
import { IoAddCircle, IoCloseCircle } from "react-icons/io5";
import { RHFUploadFile } from "../../common/custom-upload-file";

export default function EmploymentDetails({ onNext, onPrev }) {
  const {
    submitErrorMessage,
    employmentAttachments,
    appendEmploymentAttachments,
    removeEmploymentAttachments,
  } = useEI();
  return (
    <Card title="Employment Details">
      {submitErrorMessage && (
        <div className="flex items-start gap-3 p-4 bg-red-100 border-l-4 border-red-500 rounded-lg text-red-600 my-10">
          <AlertCircle className="mt-1 w-5 h-5 text-red-600" />
          <div>
            <p className="font-semibold">Missing Required Information</p>
            {submitErrorMessage}
          </div>
        </div>
      )}
      <div className="flex flex-col gap-4 px-1 pr-4">
        <div className="flex flex-row xs:flex-col gap-6">
          <div className="w-full">
            <RHFInputField
              outerLabel="Job Title"
              name="jobTitle"
              placeholder="Job Title"
              required
            />
          </div>
          <div className="w-full">
            <RHFInputField
              outerLabel="Department / Project Name"
              name="departmentName"
              placeholder="Department / Project Name"
              required
            />
          </div>
        </div>
        <div className="flex flex-row xs:flex-col gap-6">
          <div className="w-full">
            <RHFDatePicker
              asSingle={true}
              name="dateOfJoining"
              placeholder="From ~ To"
              outerLabel="Date of Joining"
              required
            />
          </div>
          <div className="w-full">
            <RHFSelect
              outerLabel="Employment Type"
              name="employeeType"
              placeholder="Employment Type"
              options={[
                { label: "Part-time ", value: "Part-time " },
                { label: "Full-time", value: "Full-time" },
                { label: "Contractual", value: "Contractual" },
                { label: "Consultant", value: "Consultant" },
              ]}
              required
            />
          </div>
        </div>
        <div className="flex flex-row xs:flex-col gap-6">
          <div className="w-full">
            <RHFSelect
              outerLabel="Work Country"
              name="workCountry"
              placeholder="Work Country"
              options={countries}
              required
            />
          </div>
          <div className="w-full">
            <RHFInputField
              outerLabel="Work Office"
              name="workOffice"
              placeholder="Work Office"
              required
            />
          </div>
        </div>
        <div className="flex flex-row xs:flex-col gap-6">
          <div className="w-full">
            <RHFInputField
              outerLabel="Employee ID"
              name="employeeID"
              placeholder="Employee ID"
              required
            />
          </div>
          <div className="w-full">
            <RHFDatePicker
              asSingle={true}
              name="contractExpiryDate"
              placeholder="From ~ To"
              outerLabel="Contract Expiry Date"
              required
            />
          </div>
        </div>
        <div className="flex flex-row xs:flex-col gap-6">
          <div className="w-full">
            <RHFInputField
              outerLabel="Supervisor’s Name"
              name="superVisorsName"
              placeholder="Supervisor’s Name"
              required
            />
          </div>
          <div className="w-full">
            <RHFInputField
              outerLabel="Supervisor’s Designation"
              name="supervisorsDesignation"
              placeholder="Supervisor’s Designation"
              required
            />
          </div>
        </div>
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
              appendEmploymentAttachments({
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
        {employmentAttachments.map((field, index) => {
          return (
            <div className="flex items-start gap-2 w-full">
              <div
                key={field.id}
                className="w-full bg-gray-50 flex items-center gap-3 p-3 border border-gray-300 rounded shadow-sm mb-4"
              >
                <RHFSelect
                  name={`employmentAttachments[${index}].file`}
                  placeholder="Select Document Type"
                  options={employmentDocuments.map((doc) => ({
                    label: doc.label,
                    value: doc.id,
                  }))}
                  required
                />
                <RHFUploadFile
                  name={`employmentAttachments[${index}].fileUpload`}
                  accept="*"
                  required
                />
                <button
                  onClick={() => {
                    removeEmploymentAttachments(index);
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
