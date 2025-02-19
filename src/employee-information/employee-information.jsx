import { useEmployeeInformation } from "./use-employee-information";
import { RHFInputField } from "../common/rhf-input";
import { RHFDatePicker } from "../common/rhf-date-picker";
import { RHFSelect } from "../common/rhf-multi-select";
import { FormProvider } from "../common/form-provider";
import { RHFTextArea } from "../common/rhf-text-area";
import { RHFCheckBox } from "../common/rhf-checkbox";
import { RHFRadioGroup } from "../common/rhf-grouped-radio";
import { RHFUploadFile } from "../common/custom-upload-file";
import { RhfSignaturePad } from "../common/rhf-signature-pad";
import { IoMdCloseCircle } from "react-icons/io";
import {
  areasOfExperties,
  documents,
  radioOptions,
  skillCategories,
} from "./data";
import { IoAddCircle, IoCloseCircle } from "react-icons/io5";
import Card from "../common/custom-card";
import Header from "../common/header";
import profilePic from "../images/profile-pic.webp";

const EmployeeInformation = () => {
  const {
    handleSubmit,
    onSubmit,
    methods,
    onError,
    qualifications,
    appendQualification,
    removeQualification,
    workExperiences,
    appendWorkExperience,
    removeWorkExperience,
    appendAttachments,
    removeAttachments,
    attachments,
    preview,
    fullName,
    sameAsCurrent,
    hasValidDepartment,
    anyResearchProjects,
    anyArticles,
  } = useEmployeeInformation();

  return (
    <>
      <Header />
      <div className="container border border-slate-300 shadow-sm my-10 p-4 rounded-md mt-36">
        <FormProvider
          methods={methods}
          onSubmit={handleSubmit(onSubmit, onError)}
        >
          <Card title="Personal Information">
            <div className="flex flex-col items-center gap-4 my-10">
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
                  <RHFSelect
                    outerLabel="Nationality"
                    name="nationality"
                    placeholder="Nationality"
                    options={[
                      { label: "India", value: "India" },
                      { label: "Pakistan", value: "Pakistan" },
                    ]}
                    required
                  />
                </div>
                <div className="w-full">
                  <RHFInputField
                    outerLabel="National ID / Passport Number"
                    name="nationalID"
                    placeholder="National ID / Passport Number"
                    required
                    type="number"
                  />
                </div>
              </div>
              <div className="flex flex-row xs:flex-col gap-6">
                <div className="w-full">
                  <RHFSelect
                    outerLabel="Marital Status"
                    name="maritalStatus"
                    placeholder="Marital Status"
                    options={[
                      { label: "Single ", value: "Single " },
                      { label: "Married ", value: "Married " },
                      { label: "Other ", value: "Other " },
                    ]}
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
                  <RHFDatePicker
                    name="IDExpiryDate"
                    placeholder="From ~ To"
                    outerLabel="Expiry Date (Passport/ID)"
                    required
                  />
                </div>
                <div className="w-full">
                  <RHFSelect
                    outerLabel="Country of Issue"
                    name="countryofIssue"
                    placeholder="Country of Issue"
                    options={[
                      { label: "India", value: "India" },
                      { label: "Pakistan", value: "Pakistan" },
                    ]}
                    required
                  />
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
                    outerLabel="Official Email (if applicable)"
                    name="officialEmail"
                    placeholder="Official Email (if applicable)"
                    required
                  />
                </div>
              </div>
            </div>
          </Card>
          <br />
          <Card title="Employment Details">
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
                    options={[
                      { label: "Pakistan", value: "Pakistan" },
                      { label: "India", value: "India" },
                    ]}
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
                    type="number"
                  />
                </div>
                <div className="w-full">
                  <RHFDatePicker
                    asSingle={true}
                    name="contractExpiryDate"
                    placeholder="From ~ To"
                    outerLabel="Contract Expiry Date (if applicable)"
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
          </Card>
          <br />
          <Card
            title="Educational Qualifications"
            onClick={() => {
              appendQualification({
                degree: null,
                intituteName: "",
                yearCompleted: null,
                country: null,
              });
            }}
            extras
            buttonTitle="Add Qualification"
          >
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
                      <RHFSelect
                        name={`qualifications[${index}].degree`}
                        placeholder="Select Degree"
                        options={[
                          { value: "HSSC", label: "HSSC" },
                          { value: "BS", label: "BS" },
                        ]}
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
                      <RHFSelect
                        name={`qualifications[${index}].yearCompleted`}
                        placeholder="Select Year of Completion"
                        options={[
                          { value: "2022", label: "2022" },
                          { value: "2023", label: "2023" },
                        ]}
                      />
                    </div>
                    <div className="w-full">
                      <RHFSelect
                        name={`qualifications[${index}].country`}
                        placeholder="Select Country"
                        options={[
                          { value: "India", label: "India" },
                          { value: "Pakistan", label: "Pakistan" },
                        ]}
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
          </Card>
          <br />
          <Card
            title="Work Experience"
            onClick={() => {
              appendWorkExperience({
                organization: "",
                jobTitle: "",
                duration: null,
                responsibilities: "",
              });
            }}
            extras
            buttonTitle="Add Work Experience"
          >
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
          </Card>
          <br />
          <Card title="Skills, Expertise & Incubation Potential">
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
                  <span>Info!</span> This section helps in identifying employees
                  across different countries for incubating projects based on
                  their skills & expertise.
                </div>
              </div>
            </div>
            {!hasValidDepartment && (
              <p className="text-red-600 my-2 bg-red-100 inline-block p-2 rounded w-full">
                Please ensure at least one core area of expertise is checked
                before proceeding
              </p>
            )}
            <div className="my-10">
              <p className="font-semibold mb-4">
                A. Core Areas of Expertise (Tick all that apply)
              </p>
              <div className="ml-6">
                {areasOfExperties?.map((item) => (
                  <RHFCheckBox
                    key={item.id}
                    name={`department${item.id}`}
                    label={item.label}
                  />
                ))}
                <div className="w-1/2 mt-4">
                  <RHFInputField
                    outerLabel="Other (Specify if not listed above)"
                    name="otherArea"
                    placeholder="Enter Other (Specify if not listed above)"
                  />
                </div>
              </div>
            </div>
            <div className="my-10">
              <p className="font-semibold mb-4">B. Technical & Soft Skills</p>
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
                    <span>Info!</span> Rate your proficiency in the following
                    skills (1 = Beginner, 5 = Expert)
                  </div>
                </div>
              </div>
              <div>
                <div className="grid grid-cols-3 mb-4">
                  <p className="font-semibold">Skill Category</p>
                  <p className="font-semibold">Specific Skill</p>
                  <p className="font-semibold">Rating (1-5)</p>
                </div>
                {skillCategories.map((category) => (
                  <div
                    key={category.category}
                    className="grid grid-cols-3 mb-6"
                  >
                    <div>
                      <p>{category.category}</p>
                    </div>
                    <div className="flex flex-col gap-2">
                      {category.skills.map((skill) => (
                        <p key={skill.value}>{skill.name}</p>
                      ))}
                    </div>
                    <div className="flex flex-col gap-2">
                      {category.skills.map((skill) => (
                        <div key={skill.value}>
                          <RHFRadioGroup
                            options={radioOptions}
                            name={`skills.${skill.value}`} // Unique name for each skill
                            required
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <div className="w-full">
                <RHFTextArea
                  name="additionalSkills"
                  placeholder="Additional Skills"
                  outerLabel="Additional Skills"
                />
              </div>
            </div>
            <div className="my-10">
              <p className="font-semibold mb-4">C. Research Background</p>
              <div className="flex flex-col gap-4 px-1 pr-4">
                <div className="flex flex-row xs:flex-col gap-6">
                  <div className="w-full">
                    <RHFRadioGroup
                      options={[
                        { label: "Yes", value: "yes" },
                        { label: "No", value: "no" },
                      ]}
                      name="anyResearchProjects"
                      outerLabel="Have you been involved in any research projects?"
                      required
                    />
                  </div>
                  <div className="w-full">
                    <RHFRadioGroup
                      options={[
                        { label: "Yes", value: "yes" },
                        { label: "No", value: "no" },
                      ]}
                      name="anyArticles"
                      outerLabel="Have you published any papers, reports, or articles?"
                      required
                    />
                  </div>
                </div>
                <div className="flex flex-row xs:flex-col gap-6">
                  <div className="w-full">
                    {anyResearchProjects === "yes" && (
                      <RHFTextArea
                        name="researchAreas"
                        placeholder="If yes, specify topics/research areas"
                        outerLabel="If yes, specify topics/research areas"
                        required
                      />
                    )}
                  </div>

                  <div className="w-full">
                    {anyArticles === "yes" && (
                      <RHFTextArea
                        name="links"
                        placeholder="If yes, provide details or links"
                        outerLabel="If yes, provide details or links"
                        required
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </Card>
          <br />
          <Card title="Emergency Contact Details">
            <div className="flex flex-col gap-4 px-1 pr-4">
              <div className="flex flex-row xs:flex-col gap-6">
                <div className="w-full">
                  <RHFInputField
                    outerLabel="Primary Contact Name"
                    name="contactName"
                    placeholder="Primary Contact Name"
                    required
                  />
                </div>
                <div className="w-full">
                  <RHFInputField
                    outerLabel="Relationship"
                    name="relationship"
                    placeholder="Relationship"
                    required
                  />
                </div>
              </div>
              <div className="flex flex-row xs:flex-col gap-6">
                <div className="w-full">
                  <RHFInputField
                    type="number"
                    outerLabel="Mobile Number"
                    name="emergencyMobileNumber"
                    placeholder="Mobile Number"
                    required
                  />
                </div>
                <div className="w-full">
                  <RHFInputField
                    type="number"
                    outerLabel="Alternate Number"
                    name="alternateNumber"
                    placeholder="Alternate Number"
                    required
                  />
                </div>
              </div>
              <div className="flex flex-row xs:flex-col gap-6">
                <div className="w-full">
                  <RHFInputField
                    type="email"
                    outerLabel="Email Address"
                    name="emailAddress"
                    placeholder="Email Address"
                    required
                  />
                </div>
                <div className="w-full">
                  <RHFTextArea
                    outerLabel="Permanent Address"
                    name="emergencyPermanentAddress"
                    placeholder="Permanent Address"
                    required
                  />
                </div>
              </div>
            </div>
          </Card>
          <br />
          <Card title="Banking & Salary Information">
            <div className="flex flex-col gap-4 px-1 pr-4">
              <div className="flex flex-row xs:flex-col gap-6">
                <div className="w-full">
                  <RHFInputField
                    outerLabel="Bank Name"
                    name="bankName"
                    placeholder="Bank Name"
                    required
                  />
                </div>
                <div className="w-full">
                  <RHFInputField
                    outerLabel="Branch"
                    name="branch"
                    placeholder="Branch"
                    required
                  />
                </div>
              </div>
              <div className="flex flex-row xs:flex-col gap-6">
                <div className="w-full">
                  <RHFInputField
                    outerLabel="Account Holder’s Name"
                    name="accountTitle"
                    placeholder="Account Holder’s Name"
                    required
                  />
                </div>
                <div className="w-full">
                  <RHFInputField
                    type="number"
                    outerLabel="IBAN / Account Number"
                    name="accountNumber"
                    placeholder="IBAN / Account Number"
                    required
                  />
                </div>
              </div>
              <div className="flex flex-row xs:flex-col gap-6">
                <div className="w-full">
                  <RHFInputField
                    outerLabel="Swift Code (if applicable)"
                    name="swifCode"
                    placeholder="Swift Code (if applicable)"
                    required
                  />
                </div>
                <div className="w-full">
                  <RHFTextArea
                    outerLabel="Bank Address"
                    name="bankAddress"
                    placeholder="Bank Address"
                    required
                  />
                </div>
              </div>
            </div>
          </Card>
          <br />
          <Card title="Additional Information">
            <div className="flex flex-col gap-4 px-1 pr-4">
              <div className="flex flex-row xs:flex-col gap-6">
                <div className="w-full">
                  <RHFInputField
                    outerLabel="Languages Spoken"
                    name="langaugeSpoken"
                    placeholder="Languages Spoken"
                    required
                  />
                </div>
                <div className="w-full"></div>
              </div>
              <div className="flex flex-row xs:flex-col gap-6">
                <div className="w-full">
                  <RHFTextArea
                    outerLabel="Special Skills or Training"
                    name="specialSkills"
                    placeholder="Special Skills or Training"
                    required
                  />
                </div>
                <div className="w-full">
                  <RHFTextArea
                    outerLabel="Any Medical Conditions or Allergies"
                    name="anyMedicalConditions"
                    placeholder="Any Medical Conditions or Allergies"
                    required
                  />
                </div>
              </div>
            </div>
          </Card>
          <br />
          <Card title="HR & Compliance Documents (File Uploads)">
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
                  following documents and must check the box if is pending or
                  uploaded
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
                      file: "",
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
            <br />
          </Card>
          <br />
          <Card title="Employee Declaration & Signature">
            <p className="text-[16px] w-full max-w-[800px] my-4">
              I, <strong>{fullName ? fullName : "[Employee Name]"}</strong>,
              confirm that the information provided above is true and correct to
              the best of my knowledge. I understand that falsifying information
              may lead to disciplinary consequences.
            </p>
            {/* Signature */}
            <div className="w-full md:w-[50%]">
              <RhfSignaturePad name="signature" label="Signature" required />
            </div>
          </Card>
          <div className="w-full flex justify-end mt-4">
            <button
              type="submit"
              className={`px-4 py-2 text-sm text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none font-medium`}
            >
              Submit
            </button>
          </div>
        </FormProvider>
      </div>
    </>
  );
};

export default EmployeeInformation;
