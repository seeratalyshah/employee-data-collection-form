import { animateScroll as scroller } from "react-scroll";
import { yupResolver } from "@hookform/resolvers/yup";
import { useFieldArray, useForm } from "react-hook-form";
import { schema, defaultValues } from "./employee-information-schema";
import { useEffect, useState } from "react";
import { areasOfExperties, skillCategories, documents } from "./data";
import axios from "axios";

export function useEmployeeInformation() {
  const [preview, setPreview] = useState(null);

  // Initialize useForm with default values
  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });
  const { handleSubmit, control, watch, setValue } = methods;
  const profilePic = watch("profilePic");
  const fullName = watch("fullName");
  const sameAsCurrent = watch("sameAsCurrent");
  const currentAddress = watch("currentAddress");
  const anyResearchProjects = watch("anyResearchProjects");
  const anyArticles = watch("anyArticles");
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

  // Automatically update permanentAddress when sameAsCurrent is checked
  useEffect(() => {
    if (sameAsCurrent) {
      setValue("permanentAddress", currentAddress, { shouldValidate: true });
    }
  }, [sameAsCurrent, currentAddress, setValue]);

  // Effect to generate preview URL for profile picture
  useEffect(() => {
    if (profilePic && profilePic instanceof File) {
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

  // Extract departments as an array
  const departmentKeys = Object.keys(values).filter((key) =>
    key.startsWith("department")
  );

  const departments = departmentKeys
    .filter((key) => values[key] === true) // Only include selected departments
    .map((key) => {
      const id = parseInt(key.replace("department", ""), 10);
      return { id, label: areasOfExperties.find((d) => d.id === id)?.label };
    });

  const hasValidDepartment = departments.length > 0;

  // Handle form submission
  const onSubmit = async (data) => {
    // Convert soft skills into an array of objects
    const soft_skills = skillCategories.flatMap((category) =>
      category.skills.map((skill) => ({
        category_id: category.id,
        skill_id: skill.value,
        skill_name: skill.name,
        rating: data.skills[skill.value] || null, // Rating from form data
      }))
    );
  
    const documentsStatus = data.documents.map((doc) => ({
      id: doc.id,
      name: doc.label,
      status: doc.status,
    }));
  
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
        current_address: data.currentAddress,
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
      skills_areas_expertise: {
        core_areas: {
          core_areas_of_expertise: departments,
          other_area: data.otherArea,
        },
        soft_skills: { soft_skills, additional_skills: data.additionalSkills },
      },
      research_background: {
        any_research_projects: data.anyResearchProjects,
        any_articles: data.anyArticles,
        research_areas: data.researchAreas || null,
        links: data.links || null,
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
        documents_status: documentsStatus,
        documents_uploaded: data.attachments.map((attachment) => ({
          fileName: attachment.fileUpload[0]?.name || "", // Ensure fileName is set
          fileUpload: attachment.fileUpload,
          documentType: documents.find(doc => doc.id === attachment.file)?.label // Set document type
        })),
      },
      employee_signature: data.signature,
    };
  
    if (hasValidDepartment) {
      try {
        console.log("Submitting form data:", jsonData);
        const formData = new FormData();
        formData.append("data", JSON.stringify(jsonData));
  
        // Debugging: Check if attachments are correctly set
        console.log("Attachments:", data.attachments);
  
        data.attachments.forEach((attachment, index) => {
          if (attachment.fileUpload) { // Check if fileUpload exists
            console.log(`Appending file${index}:`, attachment.fileUpload);
           

            formData.append(`file${index}`, attachment.fileUpload); // Directly append the file

            attachment.fileName = attachment.fileUpload.name;
          } else {
            console.warn(`File at index ${index} is undefined or null`);
          }
        });
  
        const response = await axios.post(
          "http://127.0.0.1:5000/employees",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
  
        console.log("Response:", response.data);
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    }
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
    anyResearchProjects,
    anyArticles,
  };
}
