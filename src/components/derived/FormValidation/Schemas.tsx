// import {
//   zod_amount,
//   zod_clientEmail,
//   zod_dateTime,
//   zod_email,
//   zod_firstName,
//   zod_image,
//   zod_lastName,
//   zod_middleName,
//   zod_multiSelectDropdown,
//   zod_multiSelectDropdownValueString,
//   zod_password,
//   zod_percentage,
//   zod_phoneNumber,
//   zod_quantity,
//   zod_radio,
//   zod_singleSelectDropdown,
//   zod_singleSelectDropdownValueString,
//   zod_textarea,
//   zod_time,
//   zod_treatmentName,
//   zod_username,
// } from '@/utility/validator';
// import * as z from 'zod';

// // const nameRegex =
// //   /^[A-Z][a-z]{2,29}(?: [A-Z][a-z]{2,29})(?: [A-Z][a-z]{2,29})?$/;

// // export const baseSchema = z.object({
// //   username: z
// //     .string()
// //     .min(4, 'username must be at least 4 characters')
// //     .max(20, 'uername must be less than 20 characters'),
// //   // .regex(emailRegex, {message:"email must end with '@ims.np'"}),

// //   password: z
// //     .string()
// //     // .regex(passwordRegex, {message:"Password must contain at least 8 characters, 1 uppercase letter, 1 number, and 1 special character."})
// //     .min(4, 'password must be at least 4 characters')
// //     .max(20, 'password must be less than 20 characters'),
// // });

// // export const signupSchema = baseSchema.extend({
// //   name: z
// //     .string()
// //     .regex(nameRegex, {
// //       message: 'must have at least two words, start with a capital letter',
// //     }),
// // });

// export const loginSchema = z.object({
//   username: z.string().min(3, { message: 'Enter valid username or email.' }),
//   password: zod_password(),
// });

// export const forgotPasswordSchema = z.object({
//   username: zod_email(),
// });

// export const resetPasswordSchema = z.object({
//   password: zod_password(),
// });

// export const staffSchema = z.object({
//   firstName: zod_firstName(),

//   middleName: zod_middleName(),

//   lastName: zod_lastName(),

//   username: zod_username(),

//   email: zod_email(),

//   gender: zod_radio(),

//   roleList: zod_multiSelectDropdown(),

//   branch: zod_singleSelectDropdown().optional(),

//   password: zod_password(),
// });

// export const editStaffSchema = z.object({
//   firstName: zod_firstName(),
//   middleName: zod_middleName().optional(),
//   lastName: zod_lastName(),
//   username: zod_username(),
//   email: zod_email(),
//   gender: zod_radio(),
//   roleList: zod_multiSelectDropdown(),
//   branch: zod_singleSelectDropdown().optional(),
//   allStaff: z.any().optional(),
//   allBranch: z.any().optional(),
// });

// export const roleSchema = z.object({
//   name: zod_lastName(),

//   code: z.string().min(5, 'at least 5 characters.'),

//   description: zod_textarea(),
// });

// export const treatmentSchema = z.object({
//   treatmentTypes: zod_radio(),
//   name: zod_treatmentName(),
//   image: z.any().optional(),
//   packageName: zod_treatmentName().optional(),
//   counts: zod_amount().optional(),
//   countPaid: zod_amount().optional(),
// });

// export const editTreatmentSchema = z.object({
//   name: zod_treatmentName(),
//   image: z.any().optional(),
//   treatmentTypes: z.string(),
// });

// export const packageFieldsSchema = z.object({
//   treatmentParent: zod_singleSelectDropdown(),
//   packageName: z.string().min(2, { message: 'Required' }),
//   counts: zod_amount(),
//   countPaid: zod_amount(),
// });

// export const subTreatmentSchema = z.object({
//   treatmentTypes: zod_radio(),
//   treatmentParent: zod_singleSelectDropdown(),
//   name: zod_treatmentName(),
//   treatmentPaymentTypes: zod_radio(),
//   amount: zod_amount(),
// });

// export const clientSchema = z.object({
//   firstName: z.string().min(2, { message: 'Required' }),
//   middleName: zod_middleName(),
//   lastName: zod_middleName(),
//   email: zod_clientEmail(),
//   gender: zod_radio(),
//   // dateOfBirth: zod_dateMax().optional(),
//   dateOfBirth: z.union([
//     z.string().optional(),
//     z
//       .date()
//       .transform((d) => d.toISOString().split('T')[0])
//       .optional(),
//   ]),
//   phoneNumber: zod_phoneNumber(),
//   city: z.string().optional(),
//   street: z.any().optional(),
//   maritalStatus: z.any().optional(),
//   bloodType: z.string().nullable().optional(),
//   subscriptionId: zod_singleSelectDropdown(),
//   card: z.any().optional(),
//   paymentMethod: z.any().optional(),
//   age: zod_amount().optional(),
// });

// export const editClientSchema = z.object({
//   firstName: z.string().min(2, { message: 'Required' }),
//   middleName: zod_middleName(),
//   lastName: zod_middleName(),
//   email: z.any().optional(),
//   gender: zod_radio(),
//   // dateOfBirth: zod_dateMax().optional(),
//   dateOfBirth: z.any().optional(),
//   phoneNumber: zod_phoneNumber(),
//   city: zod_firstName(),
//   street: z.any().optional(),
//   maritalStatus: z.any().optional(),
//   bloodType: z.string().nullable().optional(),
//   subscriptionId: zod_singleSelectDropdown(),
//   age: z.any().optional(),
// });

// export const subscriptionSchema = z.object({
//   subscriptionName: z.string(),
//   discountPercentage: zod_percentage(),
//   level: zod_percentage(),
//   appointmentCount: zod_amount(),
// });

// export const treatmentOfferSchema = z.object({
//   image: zod_image(),
//   title: zod_treatmentName(),
//   orderNumber: zod_singleSelectDropdown(),
// });

// export const editTreatmentOfferSchema = z.object({
//   image: z.any().optional(),
//   title: zod_treatmentName(),
//   orderNumber: zod_singleSelectDropdown(),
// });

// export const dashboardSliderSchema = z.object({
//   image: zod_image(),
// });

// export const editDashboardSliderSchema = z.object({
//   image: z.any().optional(),
//   file: z.any().optional(),
//   id: z.number().optional(),
//   fileType: z.literal('SLIDER').optional(),
// });

// export const messageNotificationsSchema = z.object({
//   followUpTypes: zod_singleSelectDropdownValueString(),
//   messageTypes: zod_singleSelectDropdownValueString(),
//   subject: z.any().optional(),
//   message: zod_textarea(),
//   timeIntervalTypes: zod_singleSelectDropdownValueString().optional(),
//   numberOfTimes: zod_amount().optional(),
//   startDate: zod_dateTime().optional(),
//   time: zod_time().optional(),
//   userList: zod_multiSelectDropdownValueString().optional(),
// });

// export const editMessageNotificationsSchema = z.object({
//   followUpTypes: z.string(),
//   messageTypes: z.string(),
//   subject: z.string().optional(),
//   message: z.any().optional(),
//   timeIntervalTypes: z.string().optional(),
//   numberOfTimes: z.number().optional(),
//   startDate: z.any().optional(),
//   time: z.string().optional(),
//   userList: z.array(z.string()).optional(),
// });

// export const manageFollowUpSchema = z.object({
//   followUpDays: zod_amount(),
//   branch: zod_singleSelectDropdown(),
// });

// export const productQuantitySchema = z.object({
//   quantity: zod_quantity(),
//   branchId: zod_singleSelectDropdown(),
// });

// export const addProductOfferPrice = z.object({
//   offerPrice: zod_quantity(),
// });

// // export const paymentHistorySchema = z
// //   .object({
// //     dateFrom: zod_dateFrom(),
// //     dateTo: zod_dateTo(),
// //     paymentMethod: zod_singleSelectDropdown(),
// //   })
// //   .superRefine((data, ctx) => {
// //     const { dateFrom, dateTo } = data;
// //     if (!dateTo) return;

// //     const today = new Date().toISOString().split("T")[0];

// //     if (dateFrom) {
// //       if (dateFrom > today) {
// //         ctx.addIssue({
// //           path: ["dateFrom"],
// //           code: z.ZodIssueCode.custom,
// //           message: "Start date cannot be in the future",
// //         });
// //       }
// //       if (dateTo < dateFrom) {
// //         ctx.addIssue({
// //           path: ["dateTo"],
// //           code: z.ZodIssueCode.custom,
// //           message: "End date must not be earlier than start date",
// //         });
// //       }
// //     }

// //     if (dateTo > today) {
// //       ctx.addIssue({
// //         path: ["dateTo"],
// //         code: z.ZodIssueCode.custom,
// //         message: "End date cannot be in the future",
// //       });
// //     }
// //   });
