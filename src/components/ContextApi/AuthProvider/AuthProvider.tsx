import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import {
  getToken,
  setToken as saveToken,
  removeToken,
} from "../../../utility/authService";

interface AuthContextType {
  user: any;
  setUser: (userData: any) => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUserState] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const token = getToken();
    if (token) {
      setUserState(token);
    }
    setIsLoading(false);
    console.log("authprovider", token);
  }, []);

  const setUser = (userData: any) => {
    setUserState(userData);
    saveToken(userData);
  };

  const logout = () => {
    setUserState(null);
    removeToken();
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// import {
//   createContext,
//   useContext,
//   useState,
//   useEffect,
//   ReactNode,
// } from 'react';
// import { Loader } from '@/helper/loader';
// import { useApiGet } from '../ApiCall/ApiGet';
// import { QUERY_KEYS } from '@/constants/queryKeys';

// type OptionType = {
//   label: string;
//   value: number;
// };

// interface AuthContextType {
//   isAuthenticated: any;
//   moduleList: any;
//   setIsAuthenticated: React.Dispatch<React.SetStateAction<any>>;
//   setModuleList: React.Dispatch<React.SetStateAction<any>>;
//   loading: boolean;
//   setLoading: React.Dispatch<React.SetStateAction<boolean>>;
//   expanded: boolean;
//   setExpanded: React.Dispatch<React.SetStateAction<boolean>>;
//   branchOptions: OptionType[];
//   setBranchOptions: React.Dispatch<React.SetStateAction<OptionType[]>>;
//   hasBranches: boolean;
//   setHasBranches: React.Dispatch<React.SetStateAction<boolean>>;
//   refetchInit: () => Promise<any>;
//   setLoginSuccess: React.Dispatch<React.SetStateAction<boolean>>;
//   loginSuccess: boolean;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const AuthProvider = ({ children }: { children: ReactNode }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState<any>(null);
//   const [moduleList, setModuleList] = useState<any>(null);
//   const [branchOptions, setBranchOptions] = useState<OptionType[]>([]);
//   const [hasBranches, setHasBranches] = useState(false);
//   const [expanded, setExpanded] = useState(true);
//   const [loading, setLoading] = useState(true);
//   const [loginSuccess, setLoginSuccess] = useState(false);

//   const {
//     data,
//     refetch: refetchInit,
//     isLoading,
//     isRefetching,
//   } = useApiGet<{ data: any }>(QUERY_KEYS.INIT, {
//     retry: 0,
//   });

//   useEffect(() => {
//     if (data?.data) {
//       const authData = data.data;
//       setIsAuthenticated(authData);
//       setModuleList(authData.moduleList || []);
//       const branches = (authData.branchList || []).map((branch: any) => ({
//         value: Number(branch.value),
//         label: branch.label,
//       }));
//       setBranchOptions(branches);
//     }
//     setLoading(isLoading);
//   }, [data, isLoading, loginSuccess]);

//   useEffect(() => {
//     setHasBranches(branchOptions.length > 0);
//   }, [branchOptions]);

//   if (loading || isRefetching) {
//     return <Loader />;
//   }

//   return (
//     <AuthContext.Provider
//       value={{
//         isAuthenticated,
//         setIsAuthenticated,
//         moduleList,
//         setModuleList,
//         loading,
//         setLoading,
//         expanded,
//         setExpanded,
//         branchOptions,
//         setBranchOptions,
//         hasBranches,
//         setHasBranches,
//         refetchInit,
//         setLoginSuccess,
//         loginSuccess,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = (): AuthContextType => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };
