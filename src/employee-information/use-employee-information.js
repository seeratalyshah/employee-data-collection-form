import { animateScroll as scroller } from "react-scroll";
import { yupResolver } from "@hookform/resolvers/yup";
import { useFieldArray, useForm } from "react-hook-form";
import { schema, defaultValues } from "./employee-information-schema";
import { useEffect, useState } from "react";

export function useEmployeeInformation() {
  const [preview, setPreview] = useState(null);

  // Initialize useForm with default values
  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });
  const { handleSubmit, control, watch } = methods;
  const profilePic = watch("profilePic");
  const fullName = watch("fullName");
  const sameAsCurrent = watch("sameAsCurrent");
  const currentAddress = watch("currentAddress");
  const values = watch();

  // Scroll to form error
  const scrollToField = (fieldName) => {
    scroller.scrollTo(fieldName, {
      duration: 800,
      delay: 0,
      smooth: "easeInOutQuart",
    });
  };

  // Scroll when there is error
  const onError = (errors) => {
    const errorFields = Object.keys(errors);
    if (errorFields.length > 0) {
      const firstErrorField = errorFields[0];
      scrollToField(firstErrorField);
    }
  };

  // Effect to generate preview URL for profile picture
  useEffect(() => {
    if (profilePic instanceof File) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setPreview(reader.result);
      };

      reader.readAsDataURL(profilePic);
    } else {
      setPreview(null);
    }
  }, [profilePic]);

  // Beneficiaries Array
  const {
    fields: qualifications,
    append: appendQualification,
    remove: removeQualification,
  } = useFieldArray({
    control,
    name: "qualifications",
  });

  const {
    fields: workExperiences,
    append: appendWorkExperience,
    remove: removeWorkExperience,
  } = useFieldArray({
    control,
    name: "workExperiences",
  });

  const {
    fields: attachments,
    append: appendAttachments,
    remove: removeAttachments,
  } = useFieldArray({
    control,
    name: "attachments",
  });

  // Extract the keys from the data object
  const departmentKeys = Object.keys(values).filter((key) =>
    key.startsWith("department")
  );

  // Get the SOP values dynamically
  const departmentValues = departmentKeys.map((key) => values[key]);

  // Check if any department is true
  const hasValidDepartment = departmentValues.some((dep) => dep === true);

  // Handle form submission
  const onSubmit = (data) => {
    const jsonData = {
      personal_information: {
        profile_image: data.profilePic,
        full_name: data.fullName,
        prefered_name: data.preferedName,
        date_Of_birth: data.dateOfBirth,
        gender: data.gender,
        nationality: data.nationality,
        national_id: data.nationalID,
        marital_status: data.maritalStatus,
        current_address: data.permanentAddress,
        permanent_address: data.sameAsCurrent
          ? data.currentAddress
          : data.permanentAddress,
        same_as_current: data.sameAsCurrent,
        id_expiry_date: data.IDExpiryDate,
        country_of_issue: data.countryofIssue,
        mobile_number: data.mobileNumber,
        whatsapp_number: data.whatsAppNumber,
        personal_email: data.personalEmail,
        official_email: data.officialEmail,
      },
      employement_details: {
        job_title: data.jobTitle,
        department_name: data.departmentName,
        date_Of_joining: data.dateOfJoining,
        employee_type: data.employeeType,
        work_country: data.workCountry,
        work_office: data.workOffice,
        employee_id: data.employeeID,
        contract_expiry_date: data.contractExpiryDate,
        super_visors_name: data.superVisorsName,
        supervisors_designation: data.supervisorsDesignation,
      },
      educational_qualification: data.qualifications,
      work_experiences: data.workExperiences,
      core_areas_of_expertise: data.department,
      other_area: data.otherArea,
      soft_skills: data.skillCategories,
      additional_skills: data.additionalSkills,
      research_background: {
        any_research_projects: data.anyResearchProjects,
        any_articles: data.anyArticles,
        research_areas: data.researchAreas,
        links: data.links,
      },
      emergency_contact_details: {
        contact_name: data.contactName,
        relationship: data.relationship,
        emergency_mobile_number: data.emergencyMobileNumber,
        alternate_number: data.alternateNumber,
        email_address: data.emailAddress,
        emergency_permanent_address: data.emergencyPermanentAddress,
      },
      banking_Salary_information: {
        bank_name: data.bankName,
        branch: data.branch,
        account_title: data.accountTitle,
        account_number: data.accountNumber,
        swif_code: data.swifCode,
        bank_address: data.bankAddress,
      },
      additional_information: {
        langauge_spoken: data.langaugeSpoken,
        special_skills: data.specialSkills,
        any_medical_conditions: data.anyMedicalConditions,
      },
      file_uploads: {
        documents_status: data.documents,
        documents_uploaded: data.attachments,
      },
      employee_signature: data.signature,
    };
    console.log("JSON format data", jsonData);
  };

  return {
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
    attachments,
    appendAttachments,
    removeAttachments,
    preview, // Return the preview URL to be used in the component
    fullName,
    sameAsCurrent,
    currentAddress,
    hasValidDepartment,
  };
}
