import React from "react";
import { Controller, useFormContext } from "react-hook-form";

export function RHFTextArea({
  name,
  type = "text",
  readOnly = false,
  startIcon: StartIcon,
  endIcon: EndIcon,
  outerLabel,
  rows = 3,
  required = false,
  helperText,
  defaultValue,
  ...other
}) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div>
          {outerLabel && (
            <label className="text-sm font-medium text-[#252525]">
              {outerLabel}{" "}
              <span className="text-sm text-red-500">{required && "*"}</span>
            </label>
          )}
          <div className="relative mt-1">
            <textarea
              rows={rows}
              className={`flex rounded border focus:border-[1px] focus:border-blue-500 ${
                error ? "border-2 border-red-400" : "border-gray-300"
              } bg-transparent disabled:font-medium disabled:bg-gray-100 w-full px-3 py-3 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none  disabled:cursor-not-allowed disabled:opacity-50`}
              {...field}
              type={type}
              defaultValue={defaultValue}
              readOnly={readOnly}
              {...other}
            />
          </div>
          {error?.message && (
            <label className="text-red-500 text-sm mr-1">
              {error?.message}
            </label>
          )}
          {helperText && (
            <div className="text-[13px] text-gray-500">{helperText}</div>
          )}
        </div>
      )}
    />
  );
}
