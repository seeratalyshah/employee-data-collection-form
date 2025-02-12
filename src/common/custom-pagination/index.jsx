import ReactPaginate from "react-paginate";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import { useEffect, useState } from "react";

export function CustomPagination({
  isLoading = false,
  isSuccess = false,
  totalPages = 1,
  currentPage = 1,
  onPageChange,
  paginationProps,
}) {
  const [current, setCurrent] = useState(currentPage);

  useEffect(() => {
    if (!isLoading && isSuccess) {
      setCurrent(currentPage);
    }
  }, [isLoading, isSuccess, currentPage]);

  return (
    <div className={`relative`}>
      {isSuccess && (
        <div className="flex items-center mt-4">
          <div className="ml-auto">
            <ReactPaginate
              pageCount={totalPages}
              pageRangeDisplayed={2}
              marginPagesDisplayed={2}
              onPageChange={({ selected }) => {
                setCurrent(selected + 1);
                onPageChange(selected + 1);
              }}
              forcePage={current - 1}
              containerClassName="flex space-x-2"
              pageClassName="border rounded px-3 py-1.5 cursor-pointer text-sm"
              activeClassName="bg-blue-500 text-white"
              previousClassName="border hover:text-white rounded px-1 py-1.5 cursor-pointer bg-gray-200 hover:bg-blue-500 text-sm"
              nextClassName="border hover:text-white rounded px-1 py-1.5 cursor-pointer bg-gray-200 hover:bg-blue-500 text-sm"
              previousLinkClassName="hover:text-white"
              nextLinkClassName="hover:text-white"
              previousLabel={
                <MdArrowBackIos className="mt-0.5 ml-1.5" size={17} />
              }
              nextLabel={
                <MdArrowForwardIos className="mt-0.5 ml-1" size={17} />
              }
              {...paginationProps}
            />
          </div>
        </div>
      )}
    </div>
  );
}
