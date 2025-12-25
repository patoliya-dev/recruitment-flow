import React from 'react';
import Select from '../../../components/ui/Select';

const CompanySizeSelector = ({ value, onChange, error }) => {
  const sizeOptions = [
    { value: '1-10', label: '1-10 employees', description: 'Startup or small team' },
    { value: '11-50', label: '11-50 employees', description: 'Growing small business' },
    { value: '51-200', label: '51-200 employees', description: 'Medium-sized company' },
    { value: '201-500', label: '201-500 employees', description: 'Large organization' },
    { value: '501-1000', label: '501-1,000 employees', description: 'Enterprise company' },
    { value: '1001-5000', label: '1,001-5,000 employees', description: 'Large enterprise' },
    { value: '5001+', label: '5,001+ employees', description: 'Global corporation' }
  ];

  return (
    <Select
      label="Company Size"
      description="Approximate number of employees in your organization"
      options={sizeOptions}
      value={value}
      onChange={onChange}
      error={error}
      required
      placeholder="Select company size"
    />
  );
};

export default CompanySizeSelector;