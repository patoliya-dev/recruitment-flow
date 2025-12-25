import React from 'react';
import Icon from '../../../components/AppIcon';

const RequirementsPreview = ({ formData }) => {
  const calculateClarityScore = () => {
    let score = 0;
    const maxScore = 100;

    if (formData?.experienceLevel) score += 15;
    if (formData?.minYearsExperience) score += 10;
    if (formData?.educationLevel) score += 15;
    if (formData?.technicalSkills && formData?.technicalSkills?.length > 0) score += 20;
    if (formData?.softSkills && formData?.softSkills?.length > 0) score += 10;
    if (formData?.minSalary && formData?.maxSalary) score += 20;
    if (formData?.benefits && formData?.benefits?.length > 0) score += 10;

    return Math.min(score, maxScore);
  };

  const clarityScore = calculateClarityScore();

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-success';
    if (score >= 60) return 'text-warning';
    return 'text-error';
  };

  const getScoreBgColor = (score) => {
    if (score >= 80) return 'bg-success';
    if (score >= 60) return 'bg-warning';
    return 'bg-error';
  };

  const technicalSkillsOptions = [
    { value: 'javascript', label: 'JavaScript' },
    { value: 'react', label: 'React' },
    { value: 'nodejs', label: 'Node.js' },
    { value: 'python', label: 'Python' },
    { value: 'java', label: 'Java' },
    { value: 'sql', label: 'SQL' },
    { value: 'aws', label: 'AWS' },
    { value: 'docker', label: 'Docker' },
    { value: 'kubernetes', label: 'Kubernetes' },
    { value: 'git', label: 'Git' }
  ];

  return (
    <div className="bg-card rounded-lg border border-border p-4 md:p-6 lg:p-8 sticky top-24">
      <div className="flex items-start gap-3 mb-4 md:mb-6">
        <div className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 bg-primary/10 rounded-md flex-shrink-0">
          <Icon name="Eye" size={20} color="var(--color-primary)" />
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="text-lg md:text-xl font-semibold text-foreground mb-1">
            Requirements Preview
          </h2>
          <p className="text-sm text-muted-foreground">
            How candidates will see your requirements
          </p>
        </div>
      </div>
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-foreground">Clarity Score</span>
          <span className={`text-lg font-bold ${getScoreColor(clarityScore)}`}>
            {clarityScore}%
          </span>
        </div>
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div
            className={`h-full ${getScoreBgColor(clarityScore)} transition-smooth`}
            style={{ width: `${clarityScore}%` }}
          />
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          {clarityScore >= 80 && "Excellent! Your requirements are clear and comprehensive."}
          {clarityScore >= 60 && clarityScore < 80 && "Good, but consider adding more details."}
          {clarityScore < 60 && "Add more information to help candidates understand the role."}
        </p>
      </div>
      <div className="space-y-4 md:space-y-6">
        {formData?.experienceLevel && (
          <div>
            <h3 className="text-sm font-medium text-foreground mb-2 flex items-center gap-2">
              <Icon name="Briefcase" size={16} color="var(--color-primary)" />
              Experience
            </h3>
            <p className="text-sm text-muted-foreground">
              {formData?.minYearsExperience && `${formData?.minYearsExperience}+ years`}
              {formData?.minYearsExperience && formData?.preferredYearsExperience && ' • '}
              {formData?.preferredYearsExperience && `${formData?.preferredYearsExperience} years preferred`}
            </p>
          </div>
        )}

        {formData?.educationLevel && (
          <div>
            <h3 className="text-sm font-medium text-foreground mb-2 flex items-center gap-2">
              <Icon name="GraduationCap" size={16} color="var(--color-primary)" />
              Education
            </h3>
            <p className="text-sm text-muted-foreground capitalize">
              {formData?.educationLevel?.replace('_', ' ')}
              {formData?.fieldOfStudy && ` in ${formData?.fieldOfStudy?.replace('_', ' ')}`}
            </p>
          </div>
        )}

        {formData?.technicalSkills && formData?.technicalSkills?.length > 0 && (
          <div>
            <h3 className="text-sm font-medium text-foreground mb-2 flex items-center gap-2">
              <Icon name="Code2" size={16} color="var(--color-primary)" />
              Technical Skills
            </h3>
            <div className="flex flex-wrap gap-2">
              {formData?.technicalSkills?.map((skill, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary text-xs rounded-md"
                >
                  {technicalSkillsOptions?.find(opt => opt?.value === skill?.skill)?.label || skill?.skill}
                  <span className="text-muted-foreground">• {skill?.level}</span>
                </span>
              ))}
            </div>
          </div>
        )}

        {formData?.minSalary && formData?.maxSalary && (
          <div>
            <h3 className="text-sm font-medium text-foreground mb-2 flex items-center gap-2">
              <Icon name="DollarSign" size={16} color="var(--color-success)" />
              Compensation
            </h3>
            <p className="text-sm text-muted-foreground">
              {formData?.currency} {parseInt(formData?.minSalary)?.toLocaleString()} - {parseInt(formData?.maxSalary)?.toLocaleString()}
              {formData?.salaryType && ` (${formData?.salaryType})`}
            </p>
          </div>
        )}

        {formData?.benefits && formData?.benefits?.length > 0 && (
          <div>
            <h3 className="text-sm font-medium text-foreground mb-2 flex items-center gap-2">
              <Icon name="Gift" size={16} color="var(--color-success)" />
              Benefits
            </h3>
            <p className="text-sm text-muted-foreground">
              {formData?.benefits?.length} benefits included
            </p>
          </div>
        )}
      </div>
      <div className="mt-6 pt-6 border-t border-border">
        <h3 className="text-sm font-medium text-foreground mb-3">Optimization Tips</h3>
        <div className="space-y-2">
          {clarityScore < 80 && (
            <div className="flex items-start gap-2 text-xs text-muted-foreground">
              <Icon name="ArrowRight" size={14} className="flex-shrink-0 mt-0.5" />
              <span>Add more technical skills to improve clarity</span>
            </div>
          )}
          {(!formData?.benefits || formData?.benefits?.length === 0) && (
            <div className="flex items-start gap-2 text-xs text-muted-foreground">
              <Icon name="ArrowRight" size={14} className="flex-shrink-0 mt-0.5" />
              <span>Include benefits to attract more candidates</span>
            </div>
          )}
          {(!formData?.softSkills || formData?.softSkills?.length === 0) && (
            <div className="flex items-start gap-2 text-xs text-muted-foreground">
              <Icon name="ArrowRight" size={14} className="flex-shrink-0 mt-0.5" />
              <span>Add soft skills for better candidate matching</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RequirementsPreview;