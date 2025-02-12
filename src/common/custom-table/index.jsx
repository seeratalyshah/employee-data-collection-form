import { useEffect, useRef, useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import ReactPaginate from "react-paginate";
import { IsFetching } from "./fetching-component";
import LoadingSkelton from "./loading-component";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import NoDataFound from "./no-data-found";

const EMPTY_ARRAY = [];

const cellFunction = (info) => {
  return <div>{Number(info?.row?.id) + 1}</div>;
};

const headerFunction = () => <div>Sr</div>;

export function CustomTable({
  columns,
  data,
  isFetching = false,
  isLoading = false,
  isError = false,
  isSuccess = false,
  totalPages = 1,
  currentPage = 1,
  onPageChange,
  onSortByChange,
  isPagination = true,
  showSerialNo = false,
  onSelected = () => {
    return null;
  },
  paginationProps,
}) {
  const [rowSelection, setRowSelection] = useState({});
  const [current, setCurrent] = useState(currentPage);

  useEffect(() => {
    if (!isLoading && isSuccess) {
      setCurrent(currentPage);
    }
  }, [isLoading, isSuccess, currentPage]);

  let columnsData = columns;

  const refSortData = (() => {
    const sortDataMap = {};
    for (const colData of columns) {
      if (colData.isSortable) sortDataMap[colData.id] = 0;
    }
    return sortDataMap;
  })();

  const sortRef = useRef(refSortData);

  const handleSortBy = (colId) => {
    sortRef.current[colId]++;
    if (sortRef.current[colId] % 2 === 1)
      onSortByChange({ id: colId, sortOrder: 1 });
    else onSortByChange({ id: colId, sortOrder: -1 });
  };

  const isSorted = (colId) => {
    return sortRef.current[colId] % 2 === 1;
  };

  if (showSerialNo) {
    columnsData = [
      {
        accessorFn: (row) => row,
        id: "srNo",
        cell: (info) => cellFunction(info),
        header: () => headerFunction(),
        isSortable: false,
      },
      ...columns,
    ];
  }

  const table = useReactTable({
    data: data ?? EMPTY_ARRAY,
    columns: columnsData,
    state: {
      rowSelection,
    },
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
  });

  onSelected(table.getSelectedRowModel().flatRows);

  if (isLoading) return <LoadingSkelton />;

  return (
    <div className={`relative`}>
      <div className="overflow-x-auto">
        <div className="max-h-[65vh] overflow-y-auto custom-scroll-bar pr-2 md:pr-3">
          <table className="min-w-full text-center">
            <thead className="bg-blue-500 text-white rounded-sm text-sm sticky top-0 z-5">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header, index) => (
                    <th
                      key={header.id}
                      className={`p-3 text-left whitespace-nowrap ${
                        index === 0 ? "rounded-l-sm" : ""
                      } ${
                        index === headerGroup.headers.length - 1
                          ? "rounded-r-sm"
                          : ""
                      }`}
                    >
                      <div
                        className="text-md font-medium text-center py-1"
                        onClick={() =>
                          header.column.columnDef.isSortable &&
                          handleSortBy(header.id)
                        }
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                        {header.column.columnDef.isSortable &&
                          !isSorted(header.id) && <span>&#9660;</span>}
                        {header.column.columnDef.isSortable &&
                          isSorted(header.id) && <span>&#9650;</span>}
                      </div>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            {isSuccess && table.getRowModel().rows.length > 0 && (
              <tbody>
                {isFetching && <IsFetching isFetching={isFetching} />}
                {table.getRowModel().rows.map((row, index) => (
                  <tr
                    key={row.id}
                    className={`${index % 2 === 0 ? "" : "bg-gray-100"} `}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="border-b py-3 text-sm">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            )}
          </table>
          {(isError || table.getRowModel().rows.length === 0) && (
            <NoDataFound />
          )}
        </div>
      </div>
      {isSuccess && Boolean(table.getRowModel().rows.length) && (
        <div className="flex items-center mt-4">
          {isPagination && (
            <div className="text-sm">
              Showing {current} of {totalPages}
            </div>
          )}
          {isPagination && (
            <div className="ml-auto">
              <ReactPaginate
                pageCount={totalPages}
                pageRangeDisplayed={3}
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
          )}
        </div>
      )}
    </div>
  );
}
