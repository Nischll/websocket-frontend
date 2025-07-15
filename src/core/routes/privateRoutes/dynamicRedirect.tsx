import { Navigate } from 'react-router-dom';
import { useAuth } from '@/components/functional/ContextApi/AuthProvider';

const findFirstValidPath = (modules: any[]): string | null => {
  for (const module of modules) {
    if (module.path) return module.path;
    if (module.moduleList && module.moduleList.length > 0) {
      const nestedPath = findFirstValidPath(module.moduleList);
      if (nestedPath) return nestedPath;
    }
  }
  return null;
};

export const DynamicRedirect = () => {
  const { moduleList } = useAuth();

  if (!moduleList || moduleList.length === 0) {
    return <Navigate to="/unauthorized" replace />;
  }

  const firstPath = findFirstValidPath(moduleList);

  return <Navigate to={firstPath || '/unauthorized'} replace />;
};
