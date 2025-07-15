// import React, { ReactNode } from 'react';
// import {
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   Button,
// } from '@mui/material';

// interface ConfirmDialogProps {
//   children?: ReactNode;
//   open: boolean;
//   onClose: () => void;
//   onConfirm: (data: any) => void;
//   title: string;
//   description: string;
//   confirmationText: string;
//   cancellationText: string;
//   showDialogActions?: boolean;
//   confirmTextColor?: string;
//   cancelTextColor?: string;
//   confirmationLoading?: boolean;
//   cancellationLoading?: boolean;
// }

// const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
//   children,
//   open,
//   onClose,
//   onConfirm,
//   title,
//   description,
//   confirmationText,
//   cancellationText,
//   showDialogActions = true,
//   confirmTextColor,
//   cancelTextColor,
//   confirmationLoading = false,
//   cancellationLoading = false,
// }) => {
//   return (
//     <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
//       <DialogTitle>{title}</DialogTitle>
//       <DialogContent>
//         <p>{description}</p>
//         {children ?? children}
//       </DialogContent>
//       {showDialogActions && (
//         <DialogActions>
//           <Button
//             onClick={onConfirm}
//             variant="outlined"
//             color={
//               (confirmTextColor as
//                 | 'error'
//                 | 'inherit'
//                 | 'primary'
//                 | 'secondary'
//                 | 'success'
//                 | 'info'
//                 | 'warning') || 'error'
//             }
//             loading={confirmationLoading}
//           >
//             {confirmationText}
//           </Button>
//           <Button
//             onClick={onClose}
//             variant="outlined"
//             color={
//               (cancelTextColor as
//                 | 'error'
//                 | 'inherit'
//                 | 'primary'
//                 | 'secondary'
//                 | 'success'
//                 | 'info'
//                 | 'warning') || 'success'
//             }
//             loading={cancellationLoading}
//           >
//             {cancellationText}
//           </Button>
//         </DialogActions>
//       )}
//     </Dialog>
//   );
// };

// export default ConfirmDialog;
