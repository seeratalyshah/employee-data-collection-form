import * as Yup from "yup";
import { documents, skillCategories } from "./data";

export const schema = Yup.object().shape({
  // fullName: Yup.string().required("Field Required"),
  // preferedName: Yup.string().required("Field Required"),
  // nationalID: Yup.string().required("Field Required"),
  // currentAddress: Yup.string().required("Field Required"),
  // permanentAddress: Yup.string().required("Field Required"),
  // mobileNumber: Yup.string().required("Field Required"),
  // whatsAppNumber: Yup.string().required("Field Required"),
  // personalEmail: Yup.string().required("Field Required"),
  // officialEmail: Yup.string().required("Field Required"),
  // IDExpiryDate: Yup.object()
  //   .shape({
  //     startDate: Yup.date().required("Field required"),
  //   })
  //   .required("Field required"),
  // dateOfBirth: Yup.object()
  //   .shape({
  //     startDate: Yup.date().required("Field required"),
  //   })
  //   .required("Field required"),
  // countryofIssue: Yup.object()
  //   .shape({
  //     value: Yup.string().required("Field Required"),
  //   })
  //   .required("Field required"),
  // nationality: Yup.object()
  //   .shape({
  //     value: Yup.string().required("Field Required"),
  //   })
  //   .required("Field required"),
  // gender: Yup.object()
  //   .shape({
  //     value: Yup.string().required("Field Required"),
  //   })
  //   .required("Field required"),
  // maritalStatus: Yup.object()
  //   .shape({
  //     value: Yup.string().required("Field Required"),
  //   })
  //   .required("Field required"),

  // jobTitle: Yup.string().required("Field Required"),
  // departmentName: Yup.string().required("Field Required"),
  // workOffice: Yup.string().required("Field Required"),
  // employeeID: Yup.string().required("Field Required"),
  // superVisorsName: Yup.string().required("Field Required"),
  // supervisorsDesignation: Yup.string().required("Field Required"),
  // dateOfJoining: Yup.object()
  //   .shape({
  //     startDate: Yup.date().required("Field required"),
  //   })
  //   .required("Field required"),
  // contractExpiryDate: Yup.object()
  //   .shape({
  //     startDate: Yup.date().required("Field required"),
  //   })
  //   .required("Field required"),
  // employeeType: Yup.object()
  //   .shape({
  //     value: Yup.string().required("Field Required"),
  //   })
  //   .required("Field required"),
  // workCountry: Yup.object()
  //   .shape({
  //     value: Yup.string().required("Field Required"),
  //   })
  //   .required("Field required"),

  // qualifications: Yup.array()
  //   .of(
  //     Yup.object().shape({
  //       degree: Yup.object()
  //         .shape({
  //           value: Yup.string().required("Field required"),
  //           label: Yup.string(),
  //         })
  //         .required("Field required"),
  //       yearCompleted: Yup.object()
  //         .shape({
  //           value: Yup.number().required("Field required"),
  //         })
  //         .required("Field required"),
  //       intituteName: Yup.string().required("Field required"),
  //       country: Yup.object()
  //         .shape({
  //           value: Yup.string().required("Field required"),
  //           label: Yup.string(),
  //         })
  //         .required("Field required"),
  //     })
  //   )
  //   .required("Field Required"),

  // workExperiences: Yup.array()
  //   .of(
  //     Yup.object().shape({
  //       organization: Yup.string().required("Field required"),

  //       jobTitle: Yup.string().required("Field required"),
  //       duration: Yup.object()
  //         .shape({
  //           startDate: Yup.date().required("Field required"),
  //           endDate: Yup.date(),
  //         })
  //         .required("Field Required"),
  //       responsibilities: Yup.string().required("Field required"),
  //     })
  //   )
  //   .required("Field Required"),

  // skills: Yup.object().shape({
  //   ...skillCategories.reduce((acc, category) => {
  //     category.skills.forEach((skill) => {
  //       acc[skill.value] = Yup.string().required("Field Required");
  //     });
  //     return acc;
  //   }, {}),
  // }),

  // additionalSkills: Yup.string().required("Field Required"),

  // anyResearchProjects: Yup.string().required("Field Required"),
  // anyArticles: Yup.string().required("Field Required"),
  // researchAreas: Yup.string().required("Field Required"),
  // links: Yup.string().required("Field Required"),

  // contactName: Yup.string().required("Field Required"),
  // relationship: Yup.string().required("Field Required"),
  // emergencyMobileNumber: Yup.string().required("Field Required"),
  // alternateNumber: Yup.string().required("Field Required"),
  // emailAddress: Yup.string()
  //   .email("Invalid email format")
  //   .required("Field Required"),
  // emergencyPermanentAddress: Yup.string().required("Field Required"),

  // bankName: Yup.string().required("Field Required"),
  // branch: Yup.string().required("Field Required"),
  // accountTitle: Yup.string().required("Field Required"),
  // accountNumber: Yup.string().required("Field Required"),
  // swifCode: Yup.string().required("Field Required"),
  // bankAddress: Yup.string().required("Field Required"),

  // langaugeSpoken: Yup.string().required("Field Required"),
  // specialSkills: Yup.string().required("Field Required"),
  // anyMedicalConditions: Yup.string().required("Field Required"),

  // documents: Yup.array()
  //   .of(
  //     Yup.object().shape({
  //       status: Yup.string()
  //         .oneOf(["uploaded", "pending"], "Status must be 'uploaded' or 'pending'")
  //         .required("Field Required"),
  //     })
  //   )
  //   .required("Field Required"),
});

export const defaultValues = {
  // Personal Information
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

  // Research Background
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

  // Documents Section
  documents: documents.map(() => ({
    status: "pending", // Default status for each document
  })),
};
