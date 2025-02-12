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
    console.log("Data", data);
  };

  console.log("Preview", preview)

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
    hasValidDepartment
  };
}