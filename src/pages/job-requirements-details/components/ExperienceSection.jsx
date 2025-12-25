import React from 'react';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const ExperienceSection = ({ formData, onChange, errors }) => {
  const experienceLevelOptions = [
    { value: 'entry', label: 'Entry Level (0-2 years)' },
    { value: 'mid', label: 'Mid Level (3-5 years)' },
    { value: 'senior', label: 'Senior Level (6-10 years)' },
    { value: 'lead', label: 'Lead/Principal (10+ years)' },
    { value: 'executive', label: 'Executive Level' }
  ];

  const educationOptions = [
    { value: 'high_school', label: 'High School Diploma' },
    { value: 'associate', label: 'Associate Degree' },
    { value: 'bachelor', label: 'Bachelor\'s Degree' },
    { value: 'master', label: 'Master\'s Degree' },
    { value: 'phd', label: 'Doctoral Degree (PhD)' },
    { value: 'certification', label: 'Professional Certification' }
  ];

  const fieldOfStudyOptions = [
    { value: 'computer_science', label: 'Computer Science' },
    { value: 'engineering', label: 'Engineering' },
    { value: 'business', label: 'Business Administration' },
    { value: 'marketing', label: 'Marketing' },
    { value: 'design', label: 'Design' },
    { value: 'data_science', label: 'Data Science' },
    { value: 'any', label: 'Any Field' }
  ];

  return (
    <div className="bg-card rounded-lg border border-border p-4 md:p-6 lg:p-8">
      <div className="flex items-start gap-3 mb-4 md:mb-6">
        <div className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 bg-primary/10 rounded-md flex-shrink-0">
          <Icon name="Briefcase" size={20} color="var(--color-primary)" />
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-foreground mb-1">
            Experience & Education
          </h2>
          <p className="text-sm md:text-base text-muted-foreground">
            Define the experience level and educational qualifications required for this role
          </p>
        </div>
      </div>
      <div className="space-y-4 md:space-y-6">
        <Select
          label="Experience Level"
          description="Select the minimum experience level required"
          options={experienceLevelOptions}
          value={formData?.experienceLevel}
          onChange={(value) => onChange('experienceLevel', value)}
          error={errors?.experienceLevel}
          required
          placeholder="Choose experience level"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <Input
            label="Minimum Years of Experience"
            type="number"
            placeholder="e.g., 3"
            value={formData?.minYearsExperience}
            onChange={(e) => onChange('minYearsExperience', e?.target?.value)}
            error={errors?.minYearsExperience}
            min="0"
            max="50"
          />

          <Input
            label="Preferred Years of Experience"
            type="number"
            placeholder="e.g., 5"
            value={formData?.preferredYearsExperience}
            onChange={(e) => onChange('preferredYearsExperience', e?.target?.value)}
            description="Optional - ideal experience level"
            min="0"
            max="50"
          />
        </div>

        <Select
          label="Minimum Education Level"
          description="Select the minimum educational qualification required"
          options={educationOptions}
          value={formData?.educationLevel}
          onChange={(value) => onChange('educationLevel', value)}
          error={errors?.educationLevel}
          required
          placeholder="Choose education level"
        />

        <Select
          label="Field of Study"
          description="Specify the preferred field of study"
          options={fieldOfStudyOptions}
          value={formData?.fieldOfStudy}
          onChange={(value) => onChange('fieldOfStudy', value)}
          placeholder="Select field of study"
          searchable
        />

        <div className="bg-muted/50 rounded-md p-3 md:p-4 flex items-start gap-3">
          <Icon name="Info" size={18} color="var(--color-primary)" className="flex-shrink-0 mt-0.5" />
          <p className="text-xs md:text-sm text-muted-foreground">
            <strong className="text-foreground">Industry Benchmark:</strong> For this role level, 68% of similar positions require 3-5 years of experience with a Bachelor's degree.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ExperienceSection;