import React, { useState } from "react";
import { FiPlus } from "react-icons/fi";
import { IoIosClose } from "react-icons/io";
import { useFormContext, Controller } from "react-hook-form";
import { GrAttachment } from "react-icons/gr";

export function RHFFileUpload({ name, outerLabel, ...other }) {
  const { control } = useFormContext();
  const [files, setFiles] = useState([]);

  const handleDeleteFile = (index) => {
    setFiles((prevFiles) => {
      const updatedFiles = [...prevFiles];
      updatedFiles.splice(index, 1);
      return updatedFiles;
    });
  };

  const handleChange = (e, onChange) => {
    const newFiles = Array.from(e.target.files);
    const updatedFiles = newFiles.map((file) => ({
      name: file.name,
      data: file,
    }));

    setFiles((prevFiles) => {
      const combinedFiles = [...prevFiles, ...updatedFiles];
      onChange(combinedFiles);
      return combinedFiles;
    });

    e.target.value = null;
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange }, fieldState: { error } }) => (
        <div className="align-start">
          <div className="flex gap-2 items-center">
            <div className="relative">
              <input
                {...other}
                type="file"
                multiple
                onChange={(e) => handleChange(e, onChange)}
                className="absolute top-0 left-0 w-full opacity-0 cursor-pointer"
              />
              <label className="w-5 h-5 flex items-center justify-center bg-blue-500 rounded-full cursor-pointer">
                <FiPlus className="text-white w-4 h-4" />
              </label>
            </div>
            <label className="text-sm font-medium text-[#252525]">
              {outerLabel}
            </label>
          </div>
          <ul className="ml-7 inline-block">
            {files.map((file, index) => (
              <li
                key={index}
                className="flex items-center border border-gray-300 shadow-sm p-2.5 rounded gap-2 mt-3"
              >
                <GrAttachment color="gray" />
                <span className="text-gray-700 text-sm">{file.name}</span>
                <button
                  type="button"
                  className="bg-red-500 rounded ms-2 text-white"
                  onClick={() => handleDeleteFile(index)}
                >
                  <IoIosClose size={20} />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    />
  );
}
