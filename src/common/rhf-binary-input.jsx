import React, { useEffect } from "react";
import { Controller, useFormContext } from "react-hook-form";

export const RHFCurrencyInput = ({
  name,
  outerLabel,
  currencies = ["GBP", "USD", "EUR", "TRY", "ZAR", "CAD"],
  required = false,
  selectDisabled,
  helperText,
  ...other
}) => {
  const {
    control,
    setValue,
    formState: { errors },
  } = useFormContext();

  const hasError = errors?.[name]?.amount;

  // Set default currency value when the component mounts
  useEffect(() => {
    if (!selectDisabled) {
      setValue(`${name}.currency`, currencies[0]); // Set the first currency as default
    }
  }, [currencies, name, selectDisabled, setValue]);

  // Event handler to prevent entering negative values or "0"
  const handleAmountChange = (e) => {
    let value = e.target.value;

    // Prevent entering negative values or "0"
    if (value === "0" || Number(value) < 0) {
      value = ""; // Reset the input if it's 0 or negative
    }

    e.target.value = value;
    // Update the field value in react-hook-form
    setValue(`${name}.amount`, value);
  };

  return (
    <div>
      {outerLabel && (
        <label className="block text-sm font-medium text-gray-700 mb-1 mt-1">
          {outerLabel}{" "}
          {required && <span className="text-sm text-red-500">*</span>}
        </label>
      )}
      <div className="flex">
        {/* Currency select dropdown */}
        <Controller
          name={`${name}.currency`}
          control={control}
          render={({ field }) => (
            <select
              disabled={selectDisabled}
              {...field}
              className={`block border focus:border-[#26BBDD] bg-gray-100 disabled:bg-gray-100  ${
                hasError ? "border-red-400" : "border-gray-300"
              } px-4 py-2 rounded-l focus:outline-none`}
              aria-invalid={hasError}
            >
              {currencies.map((currency) => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
            </select>
          )}
        />
        {/* Amount input */}
        <Controller
          name={`${name}.amount`}
          control={control}
          render={({ field }) => (
            <div className="flex-1 relative">
              <input
                {...field}
                {...other}
                type="number"
                onInput={handleAmountChange} // Call the custom handler
                className={`block w-full border focus:border-[#26BBDD] disabled:bg-gray-100 disabled:text-gray-600 ${
                  hasError ? "border-red-400" : "border-gray-300"
                } px-4 py-2 rounded-r focus:outline-none`}
                style={{ fontSize: "14px" }}
                aria-invalid={hasError}
              />
            </div>
          )}
        />
      </div>
      {/* Error and helper text */}
      {hasError && (
        <div className="text-red-500 text-sm">
          {errors[name]?.amount?.message}
        </div>
      )}
      {helperText && (
        <div className={`text-[13px] text-gray-500`}>{helperText}</div>
      )}
    </div>
  );
};
