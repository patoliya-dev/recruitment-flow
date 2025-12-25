import React from 'react';
import Input from '../../../components/ui/Input';

const FoundingYearInput = ({ value, onChange, error }) => {
  const currentYear = new Date()?.getFullYear();

  const handleChange = (e) => {
    const year = e?.target?.value;
    if (year === '' || (parseInt(year) >= 1800 && parseInt(year) <= currentYear)) {
      onChange(year);
    }
  };

  return (
    <Input
      label="Founding Year"
      type="number"
      value={value}
      onChange={handleChange}
      error={error}
      placeholder={currentYear?.toString()}
      description="Year your company was established"
      min="1800"
      max={currentYear?.toString()}
    />
  );
};

export default FoundingYearInput;