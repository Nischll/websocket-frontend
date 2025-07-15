// import { ReactNode } from 'react';
// import { NavLink } from 'react-router-dom';
// import { ChevronRight } from 'lucide-react';
// import { useSidebar } from './SidebarContext';

// interface SidebarField {
//   name: string;
//   path: string;
//   icon: ReactNode;
// }

// interface SidebarItemProps {
//   icon: ReactNode;
//   name: string;
//   path?: string;
//   fields?: SidebarField[];
// }

// const SidebarItem = ({ icon, name, path, fields }: SidebarItemProps) =>   {
//   const { expanded, setExpanded, openItem, setOpenItem, searchQuery } =
//     useSidebar();

//   const fieldMatches =
//     fields?.filter((field) =>
//       field.name.toLowerCase().includes(searchQuery.toLowerCase())
//     ) || [];

//   const isNameMatch = name.toLowerCase().includes(searchQuery.toLowerCase());

//   const isDropdownOpen = searchQuery
//     ? fieldMatches.length > 0
//     : openItem === name;

//   const matchesSearch = isNameMatch || fieldMatches.length > 0;

//   if (!matchesSearch) {
//     return null;
//   }

//   const highlightText = (text: string, query: string) => {
//     if (!query) return text;

//     const parts = text.split(new RegExp(`(${query})`, 'gi'));
//     return parts.map((part, index) =>
//       part.toLowerCase() === query.toLowerCase() ? (
//         <span key={index} className="text-blue-600">
//           {part}
//         </span>
//       ) : (
//         part
//       )
//     );
//   };

//   if (!fields) {
//     return (
//       <NavLink
//         to={path || '#'}
//         className={({ isActive }) =>
//           `flex items-center text-sm font-medium font-sans rounded-md my-1 ${
//             isActive
//               ? 'bg-gray-100 text-gray-700 cursor-default'
//               : 'hover:bg-gray-100 text-gray-800'
//           }`
//         }
//       >
//         <li className="relative flex items-center px-2 my-1 font-medium rounded-md cursor-pointer transition-colors group">
//           {icon && <span className="py-1 text-sm">{icon}</span>}
//           <span
//             className={`overflow-hidden transition-all ${expanded ? 'ml-3' : 'w-0'}`}
//           >
//             {highlightText(name, searchQuery)}
//           </span>

//           {!expanded && (
//             <div className="absolute left-full rounded-md px-2 py-1 ml-2 bg-indigo-100 text-indigo-800 text-xs invisible opacity-20 translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0 z-50">
//               {highlightText(name, searchQuery)}
//             </div>
//           )}
//         </li>
//       </NavLink>
//     );
//   }

//   return (
//     <li className="relative flex flex-col space-x-2 my-1 text-sm font-medium font-sans rounded-md cursor-pointer transition-colors group">
//       <div
//         className="flex items-center w-full cursor-pointer rounded-md hover:bg-gray-100"
//         onClick={() => {
//           if (!expanded) {
//             setExpanded(true);
//             setOpenItem(name);
//           } else {
//             setOpenItem(openItem === name ? null : name);
//           }
//         }}
//       >
//         {icon && <span className="text-lg p-2">{icon}</span>}
//         <span
//           className={`overflow-hidden transition-all text-gray-800 ${expanded ? 'ml-1' : 'w-0'}`}
//         >
//           {highlightText(name, searchQuery)}
//         </span>
//         <span
//           className={`absolute transition-transform ${isDropdownOpen ? 'rotate-90' : 'rotate-0'} ${expanded ? 'block right-0' : 'right-[-13px]'}`}
//         >
//           <ChevronRight size={15} />
//         </span>
//       </div>

//       {isDropdownOpen && (
//         <ul className={`mt-1 pl-3 space-y-1 ${expanded ? 'block' : 'hidden'}`}>
//           {fieldMatches.map((field) => (
//             <NavLink
//               key={field.path}
//               to={field.path}
//               className={({ isActive }) =>
//                 `flex items-center space-x-2 p-1 text-[13px] rounded-md ${
//                   isActive
//                     ? 'bg-gray-100 text-gray-700 cursor-default'
//                     : 'hover:bg-gray-100 text-gray-800'
//                 }`
//               }
//             >
//               <li className="flex items-center p-1 rounded-md">
//                 <span>{field.icon}</span>
//                 <span
//                   className={`overflow-hidden transition-all ${expanded ? 'ml-3' : 'w-0'}`}
//                 >
//                   {highlightText(field.name, searchQuery)}
//                 </span>
//               </li>
//             </NavLink>
//           ))}
//         </ul>
//       )}

//       {!expanded && (
//         <div className="absolute left-full top-0 rounded-md px-2 py-1 bg-indigo-100 text-indigo-800 text-xs invisible opacity-20 translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0 z-50">
//           {highlightText(name, searchQuery)}
//         </div>
//       )}
//     </li>
//   );
// };

// export default SidebarItem;
