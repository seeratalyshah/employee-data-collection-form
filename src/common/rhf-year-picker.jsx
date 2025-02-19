import { Controller, useFormContext } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export function RHFYearPicker({
  name,
  readOnly = false,
  outerLabel,
  required = false,
  helperText,
  placeholder,
  ...other
}) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <div className="w-full">
          {outerLabel && (
            <label className="text-sm font-medium text-[#252525]">
              {outerLabel}{" "}
              <span className="text-sm text-red-500">{required && "*"}</span>
            </label>
          )}
          <div className="relative w-full">
            <DatePicker
              selected={value ? new Date(value, 0, 1) : null} // Convert year to Date object
              onChange={(date) => onChange(date?.getFullYear())} // Extract year only
              showYearPicker // Enables year selection only
              dateFormat="yyyy" // Display only the year
              placeholderText={placeholder}
              className={`w-full border ${
                error ? "border-2 border-red-400" : "border-gray-300"
              } focus:border-blue-500 rounded p-2 focus:outline-none mt-1 placeholder:text-[14px] disabled:bg-gray-100`}
              disabled={readOnly}
              {...other}
            />
          </div>
          {error?.message && (
            <label className="text-red-500 text-sm">{error?.message}</label>
          )}
          {helperText && (
            <div className="text-[13px] text-gray-500">{helperText}</div>
          )}
        </div>
      )}
    />
  );
}
