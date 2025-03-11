import * as Yup from "yup";
import { documents, skillCategories } from "./data";

export const schema = Yup.object().shape({
  // Personal Information
  profilePic: Yup.mixed().required("Profile picture is required"),
  fullName: Yup.string().required("Field Required"),
  preferedName: Yup.string().required("Field Required"),
  nationalID: Yup.string().required("Field Required"),
  currentAddress: Yup.string().required("Field Required"),
  permanentAddress: Yup.string().required("Field Required"),
  mobileNumber: Yup.string().required("Field Required"),
  whatsAppNumber: Yup.string().required("Field Required"),
  personalEmail: Yup.string().required("Field Required"),
  officialEmail: Yup.string().required("Field Required"),
  IDExpiryDate: Yup.object()
    .shape({
      startDate: Yup.date().required("Field required"),
    })
    .required("Field required"),
  dateOfBirth: Yup.object()
    .shape({
      startDate: Yup.date().required("Field required"),
    })
    .required("Field required"),
  countryofIssue: Yup.object()
    .shape({
      value: Yup.string().required("Field Required"),
    })
    .required("Field required"),
  nationality: Yup.object()
    .shape({
      value: Yup.string().required("Field Required"),
    })
    .required("Field required"),
  gender: Yup.object()
    .shape({
      value: Yup.string().required("Field Required"),
    })
    .required("Field required"),
  maritalStatus: Yup.object()
    .shape({
      value: Yup.string().required("Field Required"),
    })
    .required("Field required"),

  // Employment Details
  jobTitle: Yup.string().required("Field Required"),
  departmentName: Yup.string().required("Field Required"),
  workOffice: Yup.string().required("Field Required"),
  employeeID: Yup.string().required("Field Required"),
  superVisorsName: Yup.string().required("Field Required"),
  supervisorsDesignation: Yup.string().required("Field Required"),
  dateOfJoining: Yup.object()
    .shape({
      startDate: Yup.date().required("Field required"),
    })
    .required("Field required"),
  contractExpiryDate: Yup.object()
    .shape({
      startDate: Yup.date().required("Field required"),
    })
    .required("Field required"),
  employeeType: Yup.object()
    .shape({
      value: Yup.string().required("Field Required"),
    })
    .required("Field required"),
  workCountry: Yup.object()
    .shape({
      value: Yup.string().required("Field Required"),
    })
    .required("Field required"),

  // Educational Qualifications
  qualifications: Yup.array()
    .of(
      Yup.object().shape({
        degree: Yup.string().required("Field required"),
        yearCompleted: Yup.number().required("Field required"),
        intituteName: Yup.string().required("Field required"),
        country: Yup.object()
          .shape({
            value: Yup.string().required("Field required"),
            label: Yup.string(),
          })
          .required("Field required"),
      })
    )
    .required("Field Required"),

  // Work Experience
  workExperiences: Yup.array()
    .of(
      Yup.object().shape({
        organization: Yup.string().required("Field required"),

        jobTitle: Yup.string().required("Field required"),
        duration: Yup.object()
          .shape({
            startDate: Yup.date().required("Field required"),
            endDate: Yup.date(),
          })
          .required("Field Required"),
        responsibilities: Yup.string().required("Field required"),
      })
    )
    .required("Field Required"),

  // Skills, Expertise & Incubation Potential
  skills: Yup.object().shape(
    skillCategories.reduce((acc, category) => {
      category.skills.forEach((skill) => {
        acc[skill.value] = Yup.string().required("Field Required");
      });
      return acc;
    }, {})
  ),
  anyResearchProjects: Yup.string().required("Field Required"),
  anyArticles: Yup.string().required("Field Required"),
  researchAreas: Yup.string().when("anyResearchProjects", {
    is: "yes",
    then: (schema) => schema.required("Research area is required"),
    otherwise: (schema) => schema.notRequired(),
  }),
  links: Yup.string().when("anyArticles", {
    is: "yes",
    then: (schema) => schema.required("Links are required"),
    otherwise: (schema) => schema.notRequired(),
  }),
  departments: Yup.array()
    .min(1, "At least one department must be selected")
    .of(
      Yup.object().shape({
        id: Yup.number().required(),
        label: Yup.string().required(),
      })
    ),

  // Emergency Contact Details
  contactName: Yup.string().required("Field Required"),
  relationship: Yup.string().required("Field Required"),
  emergencyMobileNumber: Yup.string().required("Field Required"),
  alternateNumber: Yup.string().required("Field Required"),
  emailAddress: Yup.string()
    .email("Invalid email format")
    .required("Field Required"),
  emergencyPermanentAddress: Yup.string().required("Field Required"),

  // Banking & Salary Information
  bankName: Yup.string().required("Field Required"),
  branch: Yup.string().required("Field Required"),
  accountTitle: Yup.string().required("Field Required"),
  accountNumber: Yup.string().required("Field Required"),
  swifCode: Yup.string().required("Field Required"),
  bankAddress: Yup.string().required("Field Required"),

  // Additional Information
  langaugeSpoken: Yup.string().required("Field Required"),
  specialSkills: Yup.string().required("Field Required"),
  anyMedicalConditions: Yup.string().required("Field Required"),

  // Documents Upload
  documents: Yup.array()
    .of(
      Yup.object().shape({
        id: Yup.number().required(),
        label: Yup.string().required(),
        status: Yup.string()
          .oneOf(
            ["uploaded", "pending"],
            "Status must be 'uploaded' or 'pending'"
          )
          .required("Upload status is required"),
      })
    )
    .min(1, "At least one document must be selected"),
  attachments: Yup.array()
    .of(
      Yup.object().shape({
        fileUpload: Yup.mixed().nullable(), // File can be null
        file: Yup.object()
          .shape({
            value: Yup.number().required("Document type is required"),
            label: Yup.string().required(),
          })
          .required("File name is required"),
      })
    )
    .required("Attachments are required"),

  // Signature
  signature: Yup.string().required("Signature is required"),
});

export const defaultValues = {
  // Personal Information
  profilePic: null,
  fullName: "",
  preferedName: "",
  nationalID: "",
  currentAddress: "",
  permanentAddress: "",
  mobileNumber: "",
  whatsAppNumber: "",
  personalEmail: "",
  officialEmail: "",
  IDExpiryDate: null,
  dateOfBirth: null,
  countryofIssue: null,
  nationality: null,
  gender: null,
  maritalStatus: null,

  // Employment Details
  jobTitle: "",
  departmentName: "",
  workOffice: "",
  employeeID: "",
  superVisorsName: "",
  supervisorsDesignation: "",
  dateOfJoining: null,
  contractExpiryDate: null,
  employeeType: null,
  workCountry: null,

  // Educational Qualifications
  qualifications: [],

  // Work Experience
  workExperiences: [],

  // Skills, Expertise & Incubation Potential
  skills: skillCategories.reduce((acc, category) => {
    category.skills.forEach((skill) => {
      acc[skill.value] = "";
    });
    return acc;
  }, {}),
  additionalSkills: "",
  anyResearchProjects: "",
  anyArticles: "",
  researchAreas: "",
  links: "",

  // Emergency Contact Details
  contactName: "",
  relationship: "",
  emergencyMobileNumber: "",
  alternateNumber: "",
  emailAddress: "",
  emergencyPermanentAddress: "",

  // Banking & Salary Information
  bankName: "",
  branch: "",
  accountTitle: "",
  accountNumber: "",
  swifCode: "",
  bankAddress: "",

  // Additional Information
  langaugeSpoken: "",
  specialSkills: "",
  anyMedicalConditions: "",

  // Documents upload
  documents: documents.map((doc) => ({
    id: doc.id,
    label: doc.label,
    status: "", // Empty initially, will be filled by radio buttons
  })),
};
