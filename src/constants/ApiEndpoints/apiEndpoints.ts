export const API_ENDPOINTS = {
  INIT: 'api/auth/init',
  AUTH: {
    LOGIN: 'api/auth/login',
    FORGOT_PASSWORD: 'api/auth/forgot-password',
    POST_OTP: 'api/auth/verify-otp-forget-password',
    RESEND_OTP: 'api/auth/resend-otp',
    RESET_PASSWORD: 'api/auth/reset-password',
    LOGOUT: 'api/auth/logout',
  },
  BATCH_RUNNER: {
    POST: 'http://localhost:3000/run',
  },
  BRANCH: {
    GET: 'api/branch/get-all',
  },
  DASHBOARD: {
    GET_TOP_PRODUCT: (timeFrame: string) =>
      `/api/dashboard/get-top-product/${timeFrame}`,
    GET_TOP_TREATMENT: (timeFrame: string) =>
      `/api/dashboard/get-top-treatment/${timeFrame}`,
    GET_DASHBOARD_DETAILS: 'api/dashboard/details',
    GET_ALL_APPOINTMENTS: 'api/dashboard/get-today-appointment',
  },
  STAFF_MANAGEMENT: {
    GET_USERS: 'api/auth/get-user',
    ADD_USER: 'api/auth/add-user',
    UPDATE_USER: (id: number) => `api/auth/update-user/${id}`,
  },
  ROLES_MANAGEMENT: {
    ACTIVE_ROLES: 'api/auth/get-active-roles',
    ADD_ROLE: 'api/role',
    GET_ROLES: 'api/role',
  },
  ATTENDANCE_MANAGEMENT: {
    GET: 'api/attendance/get',
  },
  CLIENT_MANAGEMENT: {
    GET: 'api/patient',
    ADD_CLIENT: 'api/patient',
    UPDATE_CLIENT_CARD: (paymentMethod: string, id: number, amount: string) =>
      `api/patient/status/${paymentMethod}/${id}/${amount}`,
    UPDATE_CLIENT: (id: number) => `api/patient/${id}`,
  },
  CLIENT_HISTORY: {
    GET: (id: any) => `api/history/get/${id}`,
  },
  SUBSCRIPTION: {
    GET: 'api/subscription',
    UPDATE_SUBSCRIPTION_STATUS: (id: number) => `api/subscription/status/${id}`,
    UPDATE_SUBSCRIPTION: (id: number) => `api/subscription/${id}`,
  },
  FOLLOWUP: {
    GET: (days: number, branch: number | undefined) => [
      'api/appointment/get/follow-up',
      days,
      branch,
    ],
  },
  SALES_MANAGEMENT: {
    ADD_SALES: 'api/product/sale/save',
    GET: 'api/product/sale/get',
    UPDATE: (id: number) => `api/product/sale/update/${id}`,
    DELETE_SALES: `api/product/sale/delete`,
    DELETE_SALES_ITEM: `api/product/sale/delete-items`,
  },
  PRODUCT_HISTORY: {
    GET: '/api/history/product/payment', //METHOD: POST
  },
  PRODUCT_MANAGEMENT: {
    CATEGORY: 'api/product/category',
    GET_PRODUCT: (id: number) => `api/product/by-category/${id}`,
    ADD_PRODUCT: 'api/product/save',
    UPDATE_PRODUCT: (id: number | undefined) => `api/product/update/${id}`,
    DELETE_PRODUCT: 'api/product/delete',
    ADD_PRODUCT_QUANTITY: (id: number | undefined) =>
      `api/product/add-quantity/${id}`,
    REMOVE_PRODUCT_QUANTITY: (
      branchId: number | undefined,
      productId: number | undefined
    ) => `api/product/update-quantity/${branchId}/${productId}`,
    GET_ALL_PRODUCT: 'api/product/get-all',
    ADD_OFFER_PRICE: (id: number | undefined) => `api/product/add-offer/${id}`,
    REMOVE_OFFER_PRICE: (id: number | undefined) =>
      `api/product/delete-offer/${id}`,
    ADD_TREATMENT_PRODUCT: 'api/product/sale/office-used',
  },
  APPOINTMENT_MANAGEMENT: {
    COMPLETE_APPOINTMENT: (id: number | undefined) =>
      `api/appointment/all-complete/${id}`,
  },
  COMMENT: {
    UPDATE_INDIVIDUAL_COMMENT: (id: number | undefined) =>
      `api/appointment/treatment/comment/${id}`,
    UPDATE_COMMENT: (id: number | undefined) => `api/appointment/comment/${id}`,
  },
  MANAGE_FOLLOW_UP: {
    UPDATE_FOLLOW_UP: (id: number | undefined, days: number | null) =>
      `api/appointment/follow-up/${id}/${days}`,
  },
  APPOINTMENT_PAYMENT_HISTORY: {
    FETCH_APPOINTMENT_PAYMENT_HISTORY: 'api/history/payment', //POST
    DELETE_EXPENSE_PAYMENT: 'api/expense',
  },
};
