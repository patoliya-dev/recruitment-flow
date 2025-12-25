import React from 'react';
import Select from '../../../components/ui/Select';

const IndustrySelector = ({ value, onChange, error }) => {
  const industryOptions = [
    { value: 'technology', label: 'Technology & Software' },
    { value: 'healthcare', label: 'Healthcare & Medical' },
    { value: 'finance', label: 'Finance & Banking' },
    { value: 'retail', label: 'Retail & E-commerce' },
    { value: 'manufacturing', label: 'Manufacturing & Production' },
    { value: 'education', label: 'Education & Training' },
    { value: 'consulting', label: 'Consulting & Professional Services' },
    { value: 'hospitality', label: 'Hospitality & Tourism' },
    { value: 'real-estate', label: 'Real Estate & Construction' },
    { value: 'media', label: 'Media & Entertainment' },
    { value: 'transportation', label: 'Transportation & Logistics' },
    { value: 'energy', label: 'Energy & Utilities' },
    { value: 'agriculture', label: 'Agriculture & Food Production' },
    { value: 'telecommunications', label: 'Telecommunications' },
    { value: 'automotive', label: 'Automotive' },
    { value: 'aerospace', label: 'Aerospace & Defense' },
    { value: 'pharmaceutical', label: 'Pharmaceutical & Biotechnology' },
    { value: 'insurance', label: 'Insurance' },
    { value: 'legal', label: 'Legal Services' },
    { value: 'nonprofit', label: 'Non-profit & NGO' },
    { value: 'government', label: 'Government & Public Sector' },
    { value: 'other', label: 'Other' }
  ];

  return (
    <Select
      label="Industry"
      description="Select the primary industry your company operates in"
      options={industryOptions}
      value={value}
      onChange={onChange}
      error={error}
      required
      searchable
      placeholder="Choose your industry"
    />
  );
};

export default IndustrySelector;