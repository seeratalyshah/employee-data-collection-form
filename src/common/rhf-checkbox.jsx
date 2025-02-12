import { useFormContext, Controller } from "react-hook-form";

export function RHFCheckBox({
  outerLabel,
  name,
  label,
  required = false,
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
            <label className="block text-sm font-medium text-gray-700">
              {outerLabel}{" "}
              <span className="text-sm text-red-500">{required && "*"}</span>
            </label>
          )}

          <div className="flex items-start space-x-2">
            <input
              type="checkbox"
              id={name}
              {...field}
              checked={field.value}
              disabled={other.disabled}
              className={`h-4 w-4 border-2 mt-1 ${
                error ? "border-red-500" : "border-gray-300 "
              } rounded custom-checkbox`}
              {...other}
            />
            <label htmlFor={name} className="text-gray-700">
              {label}
            </label>
          </div>
          {error && <div className="text-red-500 text-sm">{error.message}</div>}
        </div>
      )}
    />
  );
}
