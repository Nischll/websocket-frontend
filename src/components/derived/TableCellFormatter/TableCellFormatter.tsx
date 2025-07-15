import React from 'react';

const TableCellFormatter = ({ value }: { value: React.ReactNode }) => {
  const isEmpty =
    value === undefined ||
    value === null ||
    value === '' ||
    (typeof value === 'number' && value < 0);
  return (
    <span className={isEmpty ? 'text-gray-400 font-semibold' : ''}>
      {isEmpty ? 'N/A' : value}
    </span>
  );
};

export default TableCellFormatter;

export const getOrdinal = (num: number) => {
  const suffixes = ['th', 'st', 'nd', 'rd'];
  const v = num % 100;
  return num + (suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0]);
};
