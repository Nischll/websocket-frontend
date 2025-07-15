import { ActiveRolesProvider } from '@/core/private/UserManagement/StaffManagement/ActiveRolesContext';
import { lazy } from 'react';
import { Navigate, RouteObject } from 'react-router-dom';
import { GetParentsProvider } from '@/core/private/MasterSetup/Treatment/GetParentContext';
import { GlobalDataProvider } from '@/components/functional/ContextApi/UserProvider';
import { CopyValuesProvider } from '@/core/private/Notifications/FollowUp/CopyValuesContext';
import Notifications from '@/core/private/Notifications/Notifications';
import { ProductProvider } from '@/core/private/ProductSetup/ProductContext/ProductContext';
import ErrorPage from '@/helper/errorPage';
import { PaymentModalProvider } from '@/components/functional/ContextApi/PaymentModalContext';
import { DynamicRedirect } from './dynamicRedirect';

const PrivateLayout = lazy(() => import('../../private/PrivateLayout'));
const Dashboard = lazy(() => import('../../private/Dashboard/Dashboard'));
const DashboardDetailPage = lazy(
  () =>
    import(
      '../../private/Dashboard/DashboardLayout/PatientDataContainer/DashboardDetailPage'
    )
);
const StaffManagement = lazy(
  () => import('../../private/UserManagement/StaffManagement/StaffManagement')
);
const RoleManagement = lazy(
  () => import('../../private/UserManagement/RoleManagement/RoleManagement')
);
const BranchManagement = lazy(
  () => import('../../private/UserManagement/BranchManagement/BranchManagement')
);
const AttendanceManagement = lazy(
  () =>
    import(
      '../../private/UserManagement/AttendanceManagement/AttendanceManagement'
    )
);
const PermissionTable = lazy(
  () =>
    import(
      '../../private/UserManagement/RoleManagement/PermissionTable/PermissionTable'
    )
);
const Treatment = lazy(
  () => import('../../private/MasterSetup/Treatment/Treatment')
);
const Laboratory = lazy(
  () => import('../../private/MasterSetup/Laboratory/Laboratory')
);
const ClientManagement = lazy(
  () =>
    import('../../private/AppointmentSetup/ClientManagement/ClientManagement')
);
const History = lazy(
  () =>
    import('../../private/AppointmentSetup/ClientManagement/History/History')
);
const Refund = lazy(
  () =>
    import(
      '../../private/AppointmentSetup/ClientManagement/History/Refund/Refund'
    )
);
const AppointmentHistory = lazy(
  () =>
    import(
      '../../private/AppointmentSetup/AppointmentHistory/AppointmentHistory'
    )
);
const SpecialTreatment = lazy(
  () => import('../../private/MasterSetup/SpecialTreatment/SpecialTreatment')
);
const TestimonialManagement = lazy(
  () =>
    import(
      '../../private/MasterSetup/TestimonialManagement/TestimonialManagement'
    )
);
const AppointmentLayout = lazy(
  () =>
    import(
      '../../private/AppointmentSetup/AppointmentManagement/AppointmentLayout'
    )
);
const SubscriptionSetup = lazy(
  () => import('../../private/SubscriptionSetup/SubscriptionSetup')
);
const FollowUp = lazy(
  () => import('../../private/AppointmentSetup/FollowUp/FollowUp')
);
const PaymentHistory = lazy(
  () => import('../../private/PaymentHistory/PaymentTabs')
);
const ProductManagement = lazy(
  () => import('../../private/ProductSetup/ProductManagement/ProductManagement')
);
const ProductCategory = lazy(
  () => import('../../private/ProductSetup/ProductCategory/Category')
);
const SalesManagement = lazy(
  () => import('../../private/ProductSetup/SalesManagement/SalesManagement')
);
const SalesHistory = lazy(
  () => import('../../private/ProductSetup/SalesHistory/SalesHistory')
);

export const privateRoutes: RouteObject[] = [
  {
    path: '/',
    element: (
      <GlobalDataProvider>
        <PrivateLayout />
      </GlobalDataProvider>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <DynamicRedirect />,
      },
      {
        path: 'home',
        element: <Dashboard />,
      },
      {
        path: 'dashboard-details/:type',
        element: <DashboardDetailPage />,
      },
      {
        path: 'staff-management',
        element: (
          <ActiveRolesProvider>
            <StaffManagement />
          </ActiveRolesProvider>
        ),
      },
      {
        path: 'role-management',
        element: (
          <ActiveRolesProvider>
            <RoleManagement />
          </ActiveRolesProvider>
        ),
      },
      {
        path: 'branch-management',
        element: (
          // <ActiveRolesProvider>
          <BranchManagement />
          // </ActiveRolesProvider>
        ),
      },
      {
        path: 'attendance-management',
        element: <AttendanceManagement />,
      },
      {
        path: 'permission/:id',
        element: <PermissionTable />,
      },
      {
        path: 'treatment',
        element: (
          <GetParentsProvider>
            <Treatment />
          </GetParentsProvider>
        ),
      },
      {
        path: 'laboratory',
        element: <Laboratory />,
      },
      {
        path: 'testimonial-management',
        element: <TestimonialManagement />,
      },
      {
        path: 'offer-treatment',
        element: <SpecialTreatment />,
      },
      {
        path: 'client-management',
        element: <ClientManagement />,
      },
      {
        path: 'history/:id',
        element: (
          <PaymentModalProvider>
            <History />
          </PaymentModalProvider>
        ),
      },
      {
        path: 'refund/:id',
        element: <Refund />,
      },
      {
        path: 'appointment-history',
        element: (
          <PaymentModalProvider>
            <AppointmentHistory />
          </PaymentModalProvider>
        ),
      },
      {
        path: 'appointment-management',
        element: (
          <PaymentModalProvider>
            <AppointmentLayout />
          </PaymentModalProvider>
        ),
      },
      {
        path: 'message-notifications',
        element: (
          <CopyValuesProvider>
            <Notifications />
          </CopyValuesProvider>
        ),
      },
      {
        path: 'subscription-setup',
        element: <SubscriptionSetup />,
      },
      {
        path: 'follow-up',
        element: <FollowUp />,
      },
      {
        path: 'payment-history',
        element: <PaymentHistory />,
      },
      {
        path: 'product-management',
        element: (
          <ProductProvider>
            <ProductManagement />
          </ProductProvider>
        ),
      },
      {
        path: 'product-category',
        element: (
          <ProductProvider>
            <ProductCategory />
          </ProductProvider>
        ),
      },
      {
        path: 'sales-management',
        element: (
          <ProductProvider>
            <PaymentModalProvider>
              <SalesManagement />
            </PaymentModalProvider>
          </ProductProvider>
        ),
      },
      {
        path: 'sales-history',
        element: (
          <PaymentModalProvider>
            <SalesHistory />
          </PaymentModalProvider>
        ),
      },
    ],
  },
  {
    path: '/unauthorized',
    element: <ErrorPage />,
  },
  {
    path: '*',
    element: <Navigate to="/unauthorized" replace />,
  },
];
