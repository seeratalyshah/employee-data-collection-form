import { LoaderCircle } from "lucide-react";

export function IsFetching({ isFetching }) {
  if (!isFetching) return <></>;
  return (
    <div className="absolute inset-0 bg-white bg-opacity-75 flex justify-center items-center">
      <LoaderCircle className="animate-spin text-blue-500 w-12 h-12" />
    </div>
  );
}
