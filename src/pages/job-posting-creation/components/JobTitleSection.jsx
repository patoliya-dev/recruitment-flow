import React from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const JobTitleSection = ({ formData, errors, onChange }) => {
  const departmentOptions = [
    { value: 'engineering', label: 'Engineering' },
    { value: 'product', label: 'Product Management' },
    { value: 'design', label: 'Design' },
    { value: 'marketing', label: 'Marketing' },
    { value: 'sales', label: 'Sales' },
    { value: 'customer-success', label: 'Customer Success' },
    { value: 'operations', label: 'Operations' },
    { value: 'finance', label: 'Finance' },
    { value: 'hr', label: 'Human Resources' },
    { value: 'legal', label: 'Legal' }
  ];

  const employmentTypeOptions = [
    { value: 'full-time', label: 'Full-time' },
    { value: 'part-time', label: 'Part-time' },
    { value: 'contract', label: 'Contract' },
    { value: 'temporary', label: 'Temporary' },
    { value: 'internship', label: 'Internship' }
  ];

  const experienceLevelOptions = [
    { value: 'entry', label: 'Entry Level (0-2 years)' },
    { value: 'mid', label: 'Mid Level (2-5 years)' },
    { value: 'senior', label: 'Senior Level (5-8 years)' },
    { value: 'lead', label: 'Lead (8+ years)' },
    { value: 'executive', label: 'Executive' }
  ];

  return (
    <div className="bg-card rounded-lg border border-border p-4 md:p-6 lg:p-8">
      <div className="flex items-start gap-3 mb-4 md:mb-6">
        <div className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 bg-primary/10 rounded-lg flex-shrink-0">
          <span className="text-lg md:text-xl font-semibold text-primary">1</span>
        </div>
        <div>
          <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-foreground font-heading">
            Job Title & Basic Information
          </h2>
          <p className="text-sm md:text-base text-muted-foreground mt-1 text-caption">
            Start with the essential details about the position
          </p>
        </div>
      </div>
      <div className="space-y-4 md:space-y-5">
        <Input
          label="Job Title"
          type="text"
          placeholder="e.g., Senior Software Engineer"
          description="Use a clear, specific title that candidates will search for"
          required
          value={formData?.jobTitle}
          onChange={(e) => onChange('jobTitle', e?.target?.value)}
          error={errors?.jobTitle}
          className="w-full"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
          <Select
            label="Department"
            placeholder="Select department"
            required
            options={departmentOptions}
            value={formData?.department}
            onChange={(value) => onChange('department', value)}
            error={errors?.department}
          />

          <Select
            label="Employment Type"
            placeholder="Select type"
            required
            options={employmentTypeOptions}
            value={formData?.employmentType}
            onChange={(value) => onChange('employmentType', value)}
            error={errors?.employmentType}
          />
        </div>

        <Select
          label="Experience Level"
          placeholder="Select experience level"
          description="This helps candidates understand if they're qualified"
          required
          options={experienceLevelOptions}
          value={formData?.experienceLevel}
          onChange={(value) => onChange('experienceLevel', value)}
          error={errors?.experienceLevel}
        />
      </div>
    </div>
  );
};

export default JobTitleSection;