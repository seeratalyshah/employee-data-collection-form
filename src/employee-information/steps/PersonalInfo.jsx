import Card from "../../common/custom-card";
import { RHFUploadFile } from "../../common/custom-upload-file";
import { RHFInputField } from "../../common/rhf-input";
import { RHFDatePicker } from "../../common/rhf-date-picker";
import { RHFSelect } from "../../common/rhf-multi-select";
import { RHFTextArea } from "../../common/rhf-text-area";
import { RHFCheckBox } from "../../common/rhf-checkbox";
import { countries, personalInfoDocuments } from "../data";
import { useEI } from "../EIContext";
import { AlertCircle } from "lucide-react";
import profilePic from "../../images/profile-pic.webp";
import { IoAddCircle, IoCloseCircle } from "react-icons/io5";

export default function PersonalInfo({ onNext, onPrev, isFirst, isLast }) {
  const {
    preview,
    sameAsCurrent,
    submitErrorMessage,
    personalAttachments,
    appendPersonalAttachments,
    removePersonalAttachments,
  } = useEI();

  return (
    <Card title="Personal Information">
      <div className="flex flex-col items-center gap-4 my-10">
        {submitErrorMessage && (
          <div className="flex items-start gap-3 p-4 bg-red-100 border-l-4 border-red-500 rounded-lg text-red-600 mb-10">
            <AlertCircle className="mt-1 w-5 h-5 text-red-600" />
            <div>
              <p className="font-semibold">Missing Required Information</p>
              {submitErrorMessage}
            </div>
          </div>
        )}
        {profilePic && (
          <img
            src={preview ? preview : profilePic}
            alt="Profile Preview"
            width={150}
            height={100}
            className="rounded-full border border-slate-300 h-[150px] p-3"
          />
        )}
        <RHFUploadFile
          label="Upload Profile Picture"
          name="profilePic"
          accept="image/*"
          padding="2px"
          required
        />
      </div>
      <div className="flex flex-col gap-4 px-1 pr-4">
        <div className="flex flex-row xs:flex-col gap-6">
          <div className="w-full">
            <RHFInputField
              outerLabel="Full Name"
              name="fullName"
              placeholder="Enter Full Name"
              required
            />
          </div>
          <div className="w-full">
            <RHFInputField
              outerLabel="Prefered Name"
              name="preferedName"
              placeholder="Prefered name here"
              required
            />
          </div>
        </div>
        <div className="flex flex-row xs:flex-col gap-6">
          <div className="w-full">
            <RHFDatePicker
              asSingle={true}
              name="dateOfBirth"
              placeholder="From ~ To"
              outerLabel="Date of Birth"
              required
            />
          </div>
          <div className="w-full">
            <RHFSelect
              outerLabel="Gender"
              name="gender"
              placeholder="Gender"
              options={[
                { label: "Male", value: "male" },
                { label: "Female", value: "female" },
              ]}
              required
            />
          </div>
        </div>
        <div className="flex flex-row xs:flex-col gap-6">
          <div className="w-full">
            <RHFInputField
              outerLabel="National ID"
              name="nationalID"
              placeholder="National ID"
              required
            />
          </div>
          <div className="w-full">
            <RHFDatePicker
              name="IDExpiryDate"
              placeholder="From ~ To"
              outerLabel="Expiry Date (National ID)"
              required
            />
          </div>
        </div>
        <div className="flex flex-row xs:flex-col gap-6">
          <div className="w-full">
            <RHFInputField
              outerLabel="Passport Number"
              name="passportNumber"
              placeholder="Passport Number"
            />
          </div>
          <div className="w-full">
            <RHFDatePicker
              name="passportExpiryDate"
              placeholder="From ~ To"
              outerLabel="Expiry Date (Passport)"
            />
          </div>
        </div>
        <div className="flex flex-row xs:flex-col gap-6">
          <div className="w-full">
            <RHFSelect
              outerLabel="Nationality"
              name="nationality"
              placeholder="Nationality"
              options={countries}
              required
            />
          </div>
          <div className="w-full">
            <RHFSelect
              outerLabel="Marital Status"
              name="maritalStatus"
              placeholder="Marital Status"
              options={[
                { label: "Single ", value: "Single " },
                { label: "Married ", value: "Married " },
                {
                  label: "Prefer not to say",
                  value: "Prefer not to say",
                },
              ]}
              required
            />
          </div>
        </div>

        <div className="flex flex-row xs:flex-col gap-6">
          <div className="w-full">
            <RHFSelect
              outerLabel="Country of Issue"
              name="countryofIssue"
              placeholder="Country of Issue"
              options={countries}
              required
            />
          </div>
          <div className="w-full"></div>
        </div>
        <div className="flex flex-row xs:flex-col gap-6">
          <div className="w-full">
            <RHFTextArea
              name="currentAddress"
              placeholder="Current Address"
              outerLabel="Current Address"
              required
            />
          </div>
          <div className="w-full relative">
            <RHFTextArea
              name="permanentAddress"
              placeholder="Permanent Address"
              outerLabel="Permanent Address"
              disabled={sameAsCurrent}
              required
            />
            <div className="absolute right-0 top-0 flex items-center">
              <RHFCheckBox name="sameAsCurrent" className="text-[16px]" />
              <span className="text-sm text-slate-500">
                Check if same as current address
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-row xs:flex-col gap-6">
          <div className="w-full">
            <RHFInputField
              outerLabel="Mobile Number"
              name="mobileNumber"
              placeholder="Mobile Number"
              required
              type="number"
            />
          </div>
          <div className="w-full">
            <RHFInputField
              outerLabel="WhatsApp Number"
              name="whatsAppNumber"
              placeholder="WhatsApp Number"
              required
              type="number"
            />
          </div>
        </div>
        <div className="flex flex-row xs:flex-col gap-6">
          <div className="w-full">
            <RHFInputField
              outerLabel="Personal Email"
              name="personalEmail"
              placeholder="Personal Email"
              type="email"
              required
            />
          </div>
          <div className="w-full">
            <RHFInputField
              type="email"
              outerLabel="Official Email"
              name="officialEmail"
              placeholder="Official Email"
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
              appendPersonalAttachments({
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
        {personalAttachments.map((field, index) => {
          return (
            <div className="flex items-start gap-2 w-full">
              <div
                key={field.id}
                className="w-full bg-gray-50 flex items-center gap-3 p-3 border border-gray-300 rounded shadow-sm mb-4"
              >
                <RHFSelect
                  name={`personalAttachments[${index}].file`}
                  placeholder="Select Document Type"
                  options={personalInfoDocuments.map((doc) => ({
                    label: doc.label,
                    value: doc.id,
                  }))}
                  required
                />
                <RHFUploadFile
                  name={`personalAttachments[${index}].fileUpload`}
                  accept="*"
                  required
                />
                <button
                  onClick={() => {
                    removePersonalAttachments(index);
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
        {!isFirst && (
          <button
            type="button"
            onClick={onPrev}
            className="px-4 py-2 text-sm text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none font-medium flex items-center gap-2"
          >
            Previous
          </button>
        )}
        <button
          type="button"
          onClick={() => onNext()}
          className="px-4 py-2 text-sm text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none font-medium flex items-center gap-2"
        >
          {isLast ? "Submit" : "Next"}
        </button>
      </div>
    </Card>
  );
}
