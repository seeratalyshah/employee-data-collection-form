import { useRef } from "react";
import { useFormContext } from "react-hook-form";

export function RHFUploadFile({
  name,
  label = "Upload File",
  accept,
  required = false,
  disabled,
  placeholder,
  padding,
}) {
  const {
    register,
    setValue,
    watch,
    trigger,
    formState: { errors },
  } = useFormContext();
  const fileInputRef = useRef(null);

  const file = watch(name);

  const handleClickAttachFile = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={`space-y-2 flex ${padding ? "flex-col" : "flex-row"} items-center gap-2`}>
      <button
        type="button"
        onClick={handleClickAttachFile}
        className={` bg-blue-500 hover:bg-blue-600 rounded text-white disabled:text-gray-500 text-sm px-4 ${
          padding ? "py-[6px]" : "py-3"
        }`}
        disabled={disabled}
      >
        <span className="text-sm font-medium">
          {label} {required && <span className="text-red-500">*</span>}
        </span>
      </button>

      {file && (
        <div className="space-y-1 ">
          {file?.name && (
            <span className="text-sm font-medium">{file.name}</span>
          )}
          {file?.size && (
            <span className="text-xs text-gray-500 ml-2">
              {`${(file.size / 1024).toFixed(2)} KB`}
            </span>
          )}
        </div>
      )}
      <input
        placeholder={placeholder}
        disabled={disabled}
        {...register(name)}
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={(event) => {
          const selectedFile = event.target.files?.[0];
          setValue(name, selectedFile);
          trigger(name);
        }}
        className="hidden"
      />
      {errors[name] && (
        <p className="text-red-500 text-sm">{errors[name].message}</p>
      )}
    </div>
  );
}
