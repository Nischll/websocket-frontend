// import {
//   LinearProgress,
//   Typography,
//   Box,
//   Tooltip,
//   tooltipClasses,
// } from '@mui/material';
// import { useEffect, useState } from 'react';
// import {
//   MultipleProgressBarsProps,
//   ProgressBarProps,
// } from './ProgressBarTypes';

// const ProgressBar = ({
//   label,
//   value,
//   progress,
//   color = '#2196F3',
// }: ProgressBarProps) => {
//   const [animatedProgress, setAnimatedProgress] = useState(0);

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setAnimatedProgress(Math.min(progress, 100));
//     }, 100);

//     return () => clearTimeout(timer);
//   }, [progress]);

//   return (
//     <Box sx={{ mb: 2, width: '100%' }}>
//       <Box
//         sx={{
//           display: 'flex',
//           justifyContent: 'space-between',
//           alignItems: 'center',
//           width: '100%',
//           gap: 1,
//         }}
//       >
//         <Typography variant="subtitle1" sx={{ mb: 0.5, fontWeight: 500 }}>
//           {label}
//         </Typography>
//         <Typography variant="body2" sx={{ color: '#746C6C', fontWeight: 500 }}>
//           {value}
//         </Typography>
//       </Box>
//       <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//         <Tooltip
//           title={`${value}`} // show actual value in tooltip
//           followCursor
//           slotProps={{
//             tooltip: {
//               sx: {
//                 bgcolor: color,
//                 color: '#fff',
//                 fontWeight: 'bold',
//                 fontSize: '12px',
//                 boxShadow: 8,
//                 [`&.${tooltipClasses.tooltip}`]: {
//                   maxWidth: 'none',
//                 },
//               },
//             },
//           }}
//         >
//           <LinearProgress
//             variant="determinate"
//             value={animatedProgress}
//             sx={{
//               height: 10,
//               width: '100%',
//               borderRadius: 2,
//               transition: 'all 1s ease-in-out',
//               backgroundColor: '#e0e0e0',
//               '& .MuiLinearProgress-bar': {
//                 backgroundColor: color,
//                 transition: 'all 1s ease-in-out',
//                 borderRadius: 8,
//               },
//             }}
//           />
//         </Tooltip>
//       </Box>
//     </Box>
//   );
// };

// const MultipleProgressBars = ({ data, colors }: MultipleProgressBarsProps) => {
//   return (
//     <Box>
//       {data.map((item, index) => (
//         <ProgressBar
//           key={index}
//           label={item.label}
//           value={item.value} 
//           progress={item.progress}
//           color={colors?.[index % colors.length]}
//         />
//       ))}
//     </Box>
//   );
// };

// export default MultipleProgressBars;
