// import React, { createContext, useContext, useEffect, useState } from 'react';
// import { useAuth } from '../ContextApi/AuthProvider';
// import { Search, X } from 'lucide-react';
// import logo from '../../../assets/images/kccs-png-logo-removebg-preview.png';

// interface SidebarContextType {
//   expanded: boolean;
//   setExpanded: (expanded: boolean) => void;
//   openItem: string | null;
//   setOpenItem: (name: string | null) => void;
//   searchQuery: string;
// }

// const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

// export const useSidebar = (): SidebarContextType => {
//   const context = useContext(SidebarContext);
//   if (!context) {
//     throw new Error('useSidebar must be used within a SidebarProvider');
//   }
//   return context;
// };

// export default function Sidebar({ children }: { children: React.ReactNode }) {
//   const { isAuthenticated, expanded, setExpanded } = useAuth();
//   const [openItem, setOpenItem] = useState<string | null>(null);
//   const [searchQuery, setSearchQuery] = useState<string>('');

//   useEffect(() => {
//     const handleResize = () => {
//       if (window.innerWidth < 768) {
//         setExpanded(false);
//       } else if (window.innerWidth >= 768) {
//         setExpanded(true);
//       }
//     };

//     handleResize();
//     window.addEventListener('resize', handleResize);
//     // console.log("resize");
//     return () => window.removeEventListener('resize', handleResize);
//   }, [setExpanded]);

//   return (
//     <SidebarContext.Provider
//       value={{ expanded, setExpanded, openItem, setOpenItem, searchQuery }}
//     >
//       <aside className="pb-1 justify-between">
//         <nav
//           className={`h-full flex flex-col bg-white shadow-sm ${expanded ? 'w-56' : 'w-16'}`}
//         >
//           <div className="flex items-center p-3">
//             <div className="relative px-2 group">
//               <input
//                 type="text"
//                 onChange={(e) => {
//                   setSearchQuery(e.target.value);
//                 }}
//                 value={searchQuery}
//                 placeholder="Search..."
//                 className={`border border-gray-400 rounded-md pr-6 py-1 text-sm focus:outline-none focus:ring-0 w-full ${expanded ? 'block' : 'hidden'}`}
//               />
//               {!searchQuery ? (
//                 <>
//                   <Search
//                     color="blue"
//                     className={`absolute transform -translate-y-1/2 text-gray-500 ${expanded ? 'right-3 top-1/2' : 'top-2 cursor-pointer hover:text-blue-400'}`}
//                     size={18}
//                     onClick={() => setExpanded(true)}
//                   />
//                 </>
//               ) : (
//                 <>
//                   <X
//                     color="red"
//                     className={`absolute transform -translate-y-1/2  ${expanded ? 'right-3 top-1/2' : 'top-2 cursor-pointer'}`}
//                     size={16}
//                     onClick={() => setSearchQuery('')}
//                   />
//                 </>
//               )}
//               {!expanded && (
//                 <div className="absolute left-10 rounded-md px-2 py-1 bg-indigo-100 text-indigo-800 text-xs font-medium invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0 z-10">
//                   Search
//                 </div>
//               )}
//             </div>
//           </div>

//           <ul
//             className={`flex-1 ${expanded ? 'px-3 overflow-y-auto scrollbar ' : 'mt-3 px-3'}`}
//           >
//             {children}
//           </ul>

//           <div className="border-t flex px-3 py-1">
//             <img src={logo} alt="User" className="w-10 h-10 rounded-md" />
//             <div
//               className={`flex justify-between items-center overflow-hidden transition-all ${expanded ? 'w-full h-full object-contain ml-3' : 'w-0'}`}
//             >
//               <div className="leading-4">
//                 <h4 className="font-semibold">{isAuthenticated.username}</h4>
//                 <span className="text-xs text-gray-600">
//                   {isAuthenticated.email}
//                 </span>
//               </div>
//             </div>
//           </div>
//         </nav>
//       </aside>
//     </SidebarContext.Provider>
//   );
// }
