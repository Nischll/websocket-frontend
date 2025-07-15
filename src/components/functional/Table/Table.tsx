// import {
//   flexRender,
//   getCoreRowModel,
//   getFilteredRowModel,
//   getPaginationRowModel,
//   getSortedRowModel,
//   useReactTable,
//   SortingState,
// } from '@tanstack/react-table';
// import { useEffect, useState } from 'react';
// import { PageSizeOptions, TableProps } from './TableProps';
// import {
//   ChevronFirst,
//   ChevronLast,
//   ChevronLeft,
//   ChevronRight,
//   Search,
// } from 'lucide-react';
// import { LoadingData } from '@/helper/loadingData';
// import Select from 'react-select';

// const Table = <T extends {}>({
//   getData,
//   columns,
//   pageSize: pageSizeProp = 10,
//   enablePagination = true,
//   manualPagination = false,
//   search = true,
//   height = '',
//   width = '',
//   selectPageSize = true,
// }: TableProps<T>) => {
//   const isServerSide = manualPagination;
//   const [data, setData] = useState<T[]>([]);
//   const [pageIndex, setPageIndex] = useState(0);
//   const [pageSize, setPageSize] = useState(pageSizeProp);
//   const [totalItems, setTotalItems] = useState(0);
//   const [globalFilter, setGlobalFilter] = useState('');
//   const [sorting, setSorting] = useState<SortingState>([]);
//   const [loading, setLoading] = useState(true);

//   const effectiveDeps = isServerSide
//     ? [pageIndex, pageSize, globalFilter, getData, isServerSide]
//     : [getData, isServerSide];

//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       try {
//         if (isServerSide) {
//           const result = await (getData as any)(
//             pageIndex,
//             pageSize,
//             globalFilter
//           );
//           setData(result.rows);
//           setTotalItems(result.total);
//         } else {
//           const result = await (getData as any)();
//           setData(result);
//           setTotalItems(result.length);
//         }
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, effectiveDeps);

//   const table = useReactTable({
//     data,
//     columns,
//     manualPagination: isServerSide,
//     pageCount: isServerSide ? Math.ceil(totalItems / pageSize) : undefined,
//     getCoreRowModel: getCoreRowModel(),
//     getFilteredRowModel: isServerSide ? undefined : getFilteredRowModel(),
//     getSortedRowModel: getSortedRowModel(),
//     getPaginationRowModel: isServerSide ? undefined : getPaginationRowModel(),
//     state: {
//       sorting,
//       globalFilter,
//       pagination: {
//         pageIndex,
//         pageSize,
//       },
//     },
//     onPaginationChange: (updater) => {
//       const next =
//         typeof updater === 'function'
//           ? updater({ pageIndex, pageSize })
//           : updater;
//       setPageIndex(next.pageIndex ?? 0);
//     },
//     onGlobalFilterChange: setGlobalFilter,
//     onSortingChange: setSorting,
//   });

//   const totalFilteredItems = isServerSide
//     ? totalItems
//     : table.getFilteredRowModel().rows.length;
//   const totalPages = Math.max(Math.ceil(totalFilteredItems / pageSize), 1);

//   return (
//     <>
//       <main className="relative flex flex-col justify-center">
//         {/* Global Filter */}
//         <div className="flex justify-start gap-3 mb-1">
//           {search && (
//             <div className="relative w-full sm:w-[300px] md:w-[400px] lg:w-[500px]">
//               <input
//                 type="text"
//                 value={globalFilter}
//                 onChange={(e) => {
//                   setGlobalFilter(e.target.value);
//                   setPageIndex(0);
//                 }}
//                 placeholder="Search..."
//                 className="border border-gray-400 rounded-md pl-10 pr-3 py-1 text-sm focus:outline-none focus:ring-0 w-full"
//               />
//               <Search
//                 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
//                 size={18}
//               />
//             </div>
//           )}
//         </div>

//         <div
//           className={`relative w-${width || 'full'} overflow-x-auto overflow-y-auto h-${height || 'full'}`}
//         >
//           <table className="min-w-full table-auto border-collapse ">
//             <thead className="bg-transparent">
//               {table.getHeaderGroups().map((headerGroup) => (
//                 <tr key={headerGroup.id} className="border-b border-gray-500">
//                   {headerGroup.headers.map((header) => (
//                     <th
//                       key={header.id}
//                       className="text-[17px] leading-[20px] text-gray-800 text-left font-medium h-[35px] px-[15px] py-[12px] whitespace-nowrap"
//                     >
//                       <div
//                         className="flex gap-2 items-center cursor-pointer"
//                         onClick={header.column.getToggleSortingHandler()}
//                       >
//                         {flexRender(
//                           header.column.columnDef.header,
//                           header.getContext()
//                         )}
//                         {header.column.getIsSorted() &&
//                           { asc: '🔼', desc: '🔽' }[
//                             header.column.getIsSorted() as 'asc' | 'desc'
//                           ]}
//                       </div>
//                     </th>
//                   ))}
//                 </tr>
//               ))}
//             </thead>
//             <tbody>
//               {loading ? (
//                 <tr>
//                   <td
//                     colSpan={columns.length}
//                     className="text-center text-gray-500 py-4"
//                   >
//                     <LoadingData />
//                   </td>
//                 </tr>
//               ) : data.length === 0 ? (
//                 <tr>
//                   <td
//                     colSpan={columns.length}
//                     className="text-center text-gray-500 py-4"
//                   >
//                     No data available.
//                   </td>
//                 </tr>
//               ) : (
//                 table.getRowModel().rows.map((row) => (
//                   <tr
//                     key={row.id}
//                     className="border-b-[0.5px] border-[#D0D3D9] bg-white even:bg-gray-100"
//                   >
//                     {row.getVisibleCells().map((cell) => (
//                       <td
//                         key={cell.id}
//                         className="font-medium text-[15px] text-[#767272] text-left px-[15px] py-[12px] whitespace-nowrap"
//                       >
//                         {flexRender(
//                           cell.column.columnDef.cell,
//                           cell.getContext()
//                         )}
//                       </td>
//                     ))}
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>

//         {/* Pagination */}
//         {enablePagination && (
//           <footer className="flex flex-wrap justify-center items-center gap-4">
//             <div className="flex justify-center items-center py-2 gap-2">
//               <button
//                 onClick={() => {
//                   table.setPageIndex(0);
//                   setPageIndex(0);
//                 }}
//                 className="text-[#48505E] text-[15px] font-medium bg-white px-1 py-[3px] hover:bg-slate-100 active:bg-slate-200 rounded-full cursor-default"
//               >
//                 <ChevronFirst size={20} />
//               </button>
//               <button
//                 onClick={() => {
//                   setPageIndex((old) => Math.max(old - 1, 0));
//                   table.previousPage();
//                 }}
//                 disabled={!table.getCanPreviousPage()}
//                 className="text-[#48505E] text-[15px] font-medium bg-white px-1 py-[3px] hover:bg-slate-100 active:bg-slate-200 rounded-full"
//               >
//                 <ChevronLeft size={20} />
//               </button>
//             </div>
//             <span className="py-2 text-[15px] text-[#48505E] font-medium">
//               Page {pageIndex + 1} of {totalPages}
//             </span>
//             <div className="flex justify-center items-center py-2 gap-2">
//               <button
//                 onClick={() => {
//                   setPageIndex((old) => old + 1);
//                   table.nextPage();
//                 }}
//                 disabled={!table.getCanNextPage()}
//                 className="text-[#48505E] text-[15px] font-medium bg-white px-1 py-[3px] hover:bg-slate-100 active:bg-slate-200 rounded-full"
//               >
//                 <ChevronRight size={20} />
//               </button>
//               <button
//                 onClick={() => {
//                   const lastPage = Math.max(
//                     Math.ceil(totalFilteredItems / pageSize) - 1,
//                     0
//                   );
//                   table.setPageIndex(lastPage);
//                   setPageIndex(lastPage);
//                 }}
//                 className="text-[#48505E] text-[15px] font-medium bg-white px-1 py-[3px] hover:bg-slate-100 active:bg-slate-200 rounded-full cursor-default"
//               >
//                 <ChevronLast size={20} />
//               </button>
//             </div>
//             {selectPageSize && (
//               <div className="flex items-center gap-2">
//                 <label className="text-sm text-gray-700 font-medium">
//                   Page Size:
//                 </label>
//                 <div className="w-20">
//                   <Select
//                     options={PageSizeOptions}
//                     isSearchable={false}
//                     defaultValue={PageSizeOptions.find(
//                       (o) => o.value === pageSize
//                     )}
//                     onChange={(selectedOption) => {
//                       setPageSize(selectedOption?.value ?? 10);
//                       setPageIndex(0);
//                     }}
//                     menuPlacement="top"
//                     styles={{
//                       control: (base) => ({
//                         ...base,
//                         minHeight: '28px',
//                         height: '28px',
//                         fontSize: '0.875rem',
//                       }),
//                       dropdownIndicator: (base) => ({
//                         ...base,
//                         padding: 2,
//                       }),
//                       indicatorsContainer: (base) => ({
//                         ...base,
//                         height: '28px',
//                       }),
//                     }}
//                   />
//                 </div>
//               </div>
//             )}
//           </footer>
//         )}
//       </main>
//     </>
//   );
// };

// export default Table;
