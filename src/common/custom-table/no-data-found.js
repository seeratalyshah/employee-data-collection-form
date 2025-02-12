import NoContentFound from "src/assets/no-data-found.png";

const NoDataFound = () => {
  return (
    <>
      <div className="flex justify-center items-center mt-5">
        <img
          src={NoContentFound}
          alt="no content found"
          width={180}
          height={180}
          className="ms-[-25px]"
        />
      </div>
      <p className="text-center text-sm text-gray-600 mb-5 font-medium">
        No Data Found
      </p>
    </>
  );
};

export default NoDataFound;
