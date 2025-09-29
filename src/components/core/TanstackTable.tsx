import { TanStackTableProps } from "@/lib/interfaces/core";
import NoDataDisplay from "@/components/core/NoDataBlock";
import { useLocation, useRouter } from "@tanstack/react-router";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  Header,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { FC, useCallback, useState } from "react";
import TableSortAscIcon from "../icons/sort-asc";
import TableSortDscIcon from "../icons/sort-dsc";
import TableSortNormIcon from "../icons/sort-norm";
import { Skeleton } from "../ui/skeleton";
import PaginationComponent from "./Pagination";

const TanStackTable: FC<TanStackTableProps> = ({
  columns,
  data,
  loading = false,
  getData,
  paginationDetails,
  removeSortingForColumnIds,
  heightClass,
  noDataLabel,
  noDataDescription,
  showNoDataIcon = true,
  noDataHeight,
}) => {
  const router = useRouter();
  const location = useLocation();
  const searchParams = new URLSearchParams(location?.search);
  const [sorting, setSorting] = useState<SortingState>([]);

  // Check if we need sticky last column (more than 6 columns)
  const shouldStickyLastColumn = columns.length > 6;
  const lastColumnIndex = columns.length - 1;

  const table = useReactTable({
    columns,
    data: data?.length ? data : [],
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const capturePageNum = useCallback(
    (value: number) => {
      getData({
        ...searchParams,
        page_size: searchParams.get("page_size")
          ? Number(searchParams.get("page_size"))
          : 15,
        page: value,
        order_by: searchParams.get("order_by"),
        order_type: searchParams.get("order_type"),
      });
    },
    [getData, searchParams]
  );

  const captureRowPerItems = useCallback(
    (value: number) => {
      getData({
        ...searchParams,
        page_size: value,
        page: 1,
        order_by: searchParams.get("order_by"),
        order_type: searchParams.get("order_type"),
      });
    },
    [getData, searchParams]
  );

  const sortAndGetData = useCallback(
    (header: any) => {
      if (
        removeSortingForColumnIds &&
        removeSortingForColumnIds.length &&
        removeSortingForColumnIds.includes(header.id)
      ) {
        return;
      }
      let sortBy = header.id;
      let sortDirection = "asc";
      let orderBy = `${sortBy}:asc`;
      if (searchParams.get("order_by")?.startsWith(header.id)) {
        if (searchParams.get("order_by") === `${header.id}:asc`) {
          sortDirection = "desc";
          orderBy = `${sortBy}:desc`;
        } else {
          sortBy = "";
          sortDirection = "";
          orderBy = "";
        }
      }
      getData({
        ...searchParams,
        page: 1,
        page_size:
          searchParams.get("page_size") || paginationDetails?.page_size || 15,
        order_by: orderBy,
      });
    },
    [
      getData,
      searchParams,
      removeSortingForColumnIds,
      paginationDetails?.page_size,
    ]
  );

  const getWidth = useCallback(
    (id: string) => {
      const widthObj = columns.find((col) => col.id === id);
      return widthObj ? widthObj?.width || widthObj?.size || "100px" : "100px";
    },
    [columns]
  );

  const isLastColumn = useCallback(
    (index: number) => {
      return shouldStickyLastColumn && index === lastColumnIndex;
    },
    [shouldStickyLastColumn, lastColumnIndex]
  );

  const getColumnStyle = useCallback(
    (headerId: string, index: number) => {
      const baseStyle = {
        minWidth: getWidth(headerId),
        width: getWidth(headerId),
      };

      if (isLastColumn(index)) {
        return {
          ...baseStyle,
          position: "sticky" as const,
          right: 0,
          backgroundColor: "black",
          zIndex: 11,
          // borderLeft: "1px solid #374151",
        };
      }

      return {
        ...baseStyle,
        position: "sticky" as const,
        top: 0,
        backgroundColor: "black",
        zIndex: 10,
      };
    },
    [getWidth, isLastColumn]
  );

  const getCellStyle = useCallback(
    (index: number, isEven: boolean) => {
      if (isLastColumn(index)) {
        return {
          position: "sticky" as const,
          right: 0,
          backgroundColor: isEven ? "white" : "#f9fafb",
          zIndex: 5,
          // borderLeft: "1px solid #e5e7eb",
        };
      }
      return {};
    },
    [isLastColumn]
  );

  return (
    <div className="w-full rounded-md bg-white">
      <div
        className={`w-full relative bg-white ${heightClass || "h-96"} overflow-auto custom-scrollbar`}
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        {loading ? (
          <div className="w-full h-full flex flex-col">
            <table className="w-full border-collapse bg-white min-w-full table-fixed">
              <thead className="bg-black border-b">
                {table?.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id} className="border-b">
                    {headerGroup.headers.map(
                      (header: Header<any, unknown>, index: number) => (
                        <th
                          key={`${header.id}-${index}`}
                          colSpan={header.colSpan}
                          className="bg-black text-left px-3 py-2 text-sm font-normal text-white sticky top-0 z-10"
                          style={getColumnStyle(header.id, index)}
                        >
                          {header.isPlaceholder ? null : (
                            <div
                              onClick={() => sortAndGetData(header)}
                              className="flex items-center gap-2 cursor-pointer"
                            >
                              {flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                              <SortItems
                                header={header}
                                removeSortingForColumnIds={
                                  removeSortingForColumnIds
                                }
                              />
                            </div>
                          )}
                        </th>
                      )
                    )}
                  </tr>
                ))}
              </thead>
              <tbody className="divide-y divide-gray-200">
                {[...Array(paginationDetails?.page_size || 15)].map((_, i) => (
                  <tr
                    key={`loading-row-${i}`}
                    className={`border-b border-b-gray-100 ${
                      i % 2 === 0 ? "bg-white" : "bg-gray-50"
                    }`}
                  >
                    {[...Array(columns.length)].map((_, j) => (
                      <td
                        key={`loading-cell-${i}-${j}`}
                        className="px-4 py-3 text-sm text-gray-900 whitespace-nowrap"
                        style={getCellStyle(j, i % 2 === 0)}
                      >
                        {j === 1 ? (
                          <div className="p-2 flex gap-2 items-center">
                            <Skeleton className="h-7 w-7 rounded-full bg-gray-200" />
                            <Skeleton className="h-3 w-3/5 bg-gray-200 rounded-none" />
                          </div>
                        ) : (
                          <div className="p-2">
                            <Skeleton className="h-3 w-3/5 bg-gray-200 rounded-none" />
                          </div>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : !data.length ? (
          <NoDataDisplay
            title={noDataLabel || "No Data Available"}
            description={noDataDescription}
            showIcon={showNoDataIcon}
            height={noDataHeight || heightClass || "h-96"}
          />
        ) : (
          <div className="w-full h-full flex flex-col">
            <div className="w-full overflow-auto custom-scrollbar">
              <table className="w-full border border-gray-200 border-collapse bg-white min-w-full table-fixed">
                <thead className="bg-black border-b">
                  {table?.getHeaderGroups().map((headerGroup) => (
                    <tr key={headerGroup.id} className="border-b">
                      {headerGroup.headers.map(
                        (header: Header<any, unknown>, index: number) => (
                          <th
                            key={`${header.id}-${index}`}
                            colSpan={header.colSpan}
                            className="bg-black text-left px-3 py-2 text-sm font-normal text-white/90 sticky top-0 z-10"
                            style={getColumnStyle(header.id, index)}
                          >
                            {header.isPlaceholder ? null : (
                              <div
                                onClick={() => sortAndGetData(header)}
                                className="flex items-center gap-2 cursor-pointer"
                              >
                                {flexRender(
                                  header.column.columnDef.header,
                                  header.getContext()
                                )}
                                <SortItems
                                  header={header}
                                  removeSortingForColumnIds={
                                    removeSortingForColumnIds
                                  }
                                />
                              </div>
                            )}
                          </th>
                        )
                      )}
                    </tr>
                  ))}
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {data?.length ? (
                    table?.getRowModel().rows.map((row, index) => (
                      <tr
                        key={row.id}
                        className={`transition-colors duration-200 border-b border-b-gray-100 cursor-pointer ${
                          index % 2 === 0
                            ? "bg-white hover:bg-gray-100"
                            : "bg-gray-50 hover:bg-gray-100"
                        }`}
                        {...(row?.original.issue_id && row?.original.id
                          ? {
                              onClick: () =>
                                router.navigate({
                                  to: `/cases/${row.original.id}/case-history`,
                                }),
                            }
                          : {})}
                      >
                        {row.getVisibleCells().map((cell, cellIndex) => (
                          <td
                            className="px-4 py-2 text-sm text-gray-900 whitespace-nowrap"
                            key={cell.id}
                            style={getCellStyle(cellIndex, index % 2 === 0)}
                          >
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </td>
                        ))}
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={columns.length} className="text-center py-8">
                        <NoDataDisplay
                          title={noDataLabel || "No Data Available"}
                          description={noDataDescription}
                          showIcon={showNoDataIcon}
                          height={noDataHeight || heightClass || "h-96"}
                        />
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
      {!loading && data?.length && paginationDetails ? (
        <div className=" border-gray-200">
          <PaginationComponent
            paginationDetails={paginationDetails}
            capturePageNum={capturePageNum}
            captureRowPerItems={captureRowPerItems}
            initialPage={paginationDetails?.current_page || 1}
          />
        </div>
      ) : null}
    </div>
  );
};

const SortItems = ({
  header,
  removeSortingForColumnIds,
}: {
  header: any;
  removeSortingForColumnIds?: string[];
}) => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location?.search);
  const sortBy = searchParams.get("order_by")?.split(":")[0];
  const sortDirection = searchParams.get("order_by")?.split(":")[1];

  if (removeSortingForColumnIds?.includes(header.id)) {
    return null;
  }

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      {sortBy === header.id ? (
        sortDirection === "asc" ? (
          <TableSortAscIcon className="size-4" />
        ) : (
          <TableSortDscIcon className="size-4" />
        )
      ) : (
        <TableSortNormIcon className="size-4" />
      )}
    </div>
  );
};

export default TanStackTable;
