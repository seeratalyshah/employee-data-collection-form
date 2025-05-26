import { animateScroll as scroller } from "react-scroll";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { useFieldArray, useForm } from "react-hook-form";
import { schema, defaultValues } from "./employee-information-schema";
import { useEffect, useState } from "react";
import { areasOfExperties, skillCategories } from "./data";
import toast from "react-hot-toast";
import axios from "axios";

export function useEmployeeInformation() {
  const [preview, setPreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitErrorMessage, setSubmitErrorMessage] = useState("");

  const navigate = useNavigate();

  // Initialize useForm with default values
  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues,
    mode: "onChange",
    reValidateMode: "onChange",
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
      setSubmitErrorMessage(
        "Some required information is missing. Please check the form and make sure all fields with a * are filled in. Once everything is complete, you’ll be able to submit the form."
      );
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

  const {
    fields: personalAttachments,
    append: appendPersonalAttachments,
    remove: removePersonalAttachments,
  } = useFieldArray({
    control,
    name: "personalAttachments",
  });

  const {
    fields: employmentAttachments,
    append: appendEmploymentAttachments,
    remove: removeEmploymentAttachments,
  } = useFieldArray({
    control,
    name: "employmentAttachments",
  });

  const {
    fields: educationalAttachments,
    append: appendEducationalAttachments,
    remove: removeEducationalAttachments,
  } = useFieldArray({
    control,
    name: "educationalAttachments",
  });

  const {
    fields: experienceAttachments,
    append: appendExperienceAttachments,
    remove: removeExperienceAttachments,
  } = useFieldArray({
    control,
    name: "experienceAttachments",
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
    setSubmitErrorMessage("");
    // Convert soft skills into an array of objects
    const soft_skills = skillCategories.flatMap((category) =>
      category.skills.map((skill) => ({
        category_id: category.id,
        skill_id: skill.value,
        skill_name: skill.name,
        rating: data.skills[skill.value] || null, // Rating from form data
      }))
    );

    /* ---------- collect every upload's meta --------------- */
    const addMeta = (list, section) =>
      list.map((a, idx) => ({
        section, // tells the API which group it belongs to
        index: idx, // matches the field name we’ll append in FormData
        fileName: a.fileUpload.name,
        documentType: a.file.label,
      }));

    const allUploadsMeta = [
      ...addMeta(data.personalAttachments, "personal"),
      ...addMeta(data.employmentAttachments, "employment"),
      ...addMeta(data.educationalAttachments, "education"),
      ...addMeta(data.experienceAttachments, "experience"),
    ];

    const jsonData = {
      personal_information: {
        profile_image: data.profilePic,
        full_name: data.fullName,
        prefered_name: data.preferedName,
        date_Of_birth: data.dateOfBirth,
        gender: data.gender,
        nationality: data.nationality,
        national_id: data.nationalID,
        passport_number: data.passportNumber,
        marital_status: data.maritalStatus,
        current_address: data.currentAddress,
        permanent_address: data.sameAsCurrent
          ? data.currentAddress
          : data.permanentAddress,
        same_as_current: data.sameAsCurrent,
        id_expiry_date: data.IDExpiryDate,
        passport_expiry_date: data.passportExpiryDate,
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
        documents_status: [],
        documents_uploaded: allUploadsMeta,
      },
      employee_signature: data.signature,
    };
    console.log("data", jsonData);

    setIsSubmitting(true);
    try {
      console.log("Submitting form data:", jsonData);
      const formData = new FormData();
      formData.append("data", JSON.stringify(jsonData));

      // Debugging: Check if attachments are correctly set
      console.log("Attachments:", data.attachments);

      formData.append("data", JSON.stringify(jsonData));
      if (data.profilePic) formData.append("profile_image", data.profilePic);

      const appendGroup = (list, prefix) =>
        list.forEach(
          (a, i) =>
            a.fileUpload && formData.append(`${prefix}_${i}`, a.fileUpload)
        );

      appendGroup(data.personalAttachments, "personal");
      appendGroup(data.employmentAttachments, "employment");
      appendGroup(data.educationalAttachments, "education");
      appendGroup(data.experienceAttachments, "experience");

      // formData.append("profile_image", data.profilePic);

      const response = await axios.post(
        "https://data-collection.strategytracker.net/employees",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Response:", response.data);
      toast.success("Form submitted successfully!");
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to submit form. Please try again.");
    } finally {
      setIsSubmitting(false); // Stop loading
      navigate("/thank-you");
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
    preview,
    fullName,
    sameAsCurrent,
    currentAddress,
    hasValidDepartment,
    anyResearchProjects,
    anyArticles,
    isSubmitting,
    submitErrorMessage,
    setSubmitErrorMessage,
    personalAttachments,
    appendPersonalAttachments,
    removePersonalAttachments,
    employmentAttachments,
    appendEmploymentAttachments,
    removeEmploymentAttachments,
    educationalAttachments,
    appendEducationalAttachments,
    removeEducationalAttachments,
    experienceAttachments,
    appendExperienceAttachments,
    removeExperienceAttachments,
  };
}
