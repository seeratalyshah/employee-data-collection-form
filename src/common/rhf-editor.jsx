import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import Editor from "../text-editor/editor"; // Ensure this is the correct path to your editor component

export function RHFEditor({
  name,
  outerLabel,
  maxLength,
  required = false,
  disableVideo,
  disableImage,
  valuee,
  ...other
}) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <div>
          {outerLabel && (
            <label className="text-sm font-medium text-[#252525]">
              {outerLabel}{" "}
              <span className="text-sm text-red-500">{required && "*"}</span>
            </label>
          )}
          <div
            className={`mt-1 ${
              error ? "border border-red-500 rounded shadow-none" : ""
            }`}
          >
            <Editor
              disableImage={disableImage}
              disableVideo={disableVideo}
              className={`${
                error ? "border border-red-500 rounded-b shadow-none" : ""
              }`}
              value={valuee || value}
              onChange={onChange}
              error={Boolean(error)}
              toolbarId={`${name}-toolbar`} // Use unique toolbarId
              maxLength={maxLength}
              {...other}
            />
          </div>
          {error && (
            <label className="text-red-500 text-sm">{error.message}</label>
          )}
        </div>
      )}
    />
  );
}
