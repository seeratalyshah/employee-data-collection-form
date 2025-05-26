import Card from "../../common/custom-card";
import { RHFInputField } from "../../common/rhf-input";
import { RHFDatePicker } from "../../common/rhf-date-picker";
import { RHFSelect } from "../../common/rhf-multi-select";
import { countries } from "../data";
import { useEI } from "../EIContext";
import { AlertCircle } from "lucide-react";

export default function EmploymentDetails({ onNext, onPrev }) {
  const { submitErrorMessage } = useEI();
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
