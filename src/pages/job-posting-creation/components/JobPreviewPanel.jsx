import React from 'react';
import Icon from '../../../components/AppIcon';

const JobPreviewPanel = ({ formData }) => {
  const getCompletionPercentage = () => {
    const fields = [
      formData?.jobTitle,
      formData?.department,
      formData?.employmentType,
      formData?.experienceLevel,
      formData?.jobDescription,
      formData?.workLocationType,
      formData?.salaryType
    ];

    const completed = fields?.filter(field => field && field?.length > 0)?.length;
    return Math.round((completed / fields?.length) * 100);
  };

  const completionPercentage = getCompletionPercentage();

  const getSEOScore = () => {
    let score = 0;
    const descLength = formData?.jobDescription?.length || 0;

    if (formData?.jobTitle?.length >= 10) score += 20;
    if (descLength >= 200 && descLength <= 2000) score += 30;
    if (formData?.department) score += 15;
    if (formData?.workLocationType) score += 15;
    if (formData?.salaryType && formData?.salaryType !== 'negotiable') score += 20;

    return score;
  };

  const seoScore = getSEOScore();

  const formatSalary = () => {
    if (formData?.salaryType === 'negotiable') return 'Negotiable';
    if (!formData?.currency || !formData?.payPeriod) return 'Not specified';

    const currencySymbol = {
      usd: '$',
      eur: '€',
      gbp: '£',
      cad: 'C$',
      aud: 'A$',
      inr: '₹'
    }?.[formData?.currency] || '$';

    const period = {
      year: '/year',
      month: '/month',
      hour: '/hour'
    }?.[formData?.payPeriod] || '';

    if (formData?.salaryType === 'range' && formData?.salaryMin && formData?.salaryMax) {
      return `${currencySymbol}${parseInt(formData?.salaryMin)?.toLocaleString()} - ${currencySymbol}${parseInt(formData?.salaryMax)?.toLocaleString()}${period}`;
    }

    if (formData?.salaryType === 'fixed' && formData?.salaryFixed) {
      return `${currencySymbol}${parseInt(formData?.salaryFixed)?.toLocaleString()}${period}`;
    }

    return 'Not specified';
  };

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="bg-card rounded-lg border border-border p-4 md:p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base md:text-lg font-semibold text-foreground font-heading">
            Completion Progress
          </h3>
          <span className="text-lg md:text-xl font-bold text-primary">
            {completionPercentage}%
          </span>
        </div>

        <div className="h-2 bg-muted rounded-full overflow-hidden mb-4">
          <div
            className="h-full bg-primary transition-smooth"
            style={{ width: `${completionPercentage}%` }}
          />
        </div>

        <div className="space-y-2 text-xs md:text-sm">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Basic Information</span>
            <Icon
              name={formData?.jobTitle && formData?.department ? 'CheckCircle2' : 'Circle'}
              size={16}
              color={formData?.jobTitle && formData?.department ? 'var(--color-success)' : 'var(--color-muted-foreground)'}
            />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Job Description</span>
            <Icon
              name={formData?.jobDescription?.length >= 200 ? 'CheckCircle2' : 'Circle'}
              size={16}
              color={formData?.jobDescription?.length >= 200 ? 'var(--color-success)' : 'var(--color-muted-foreground)'}
            />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Location Details</span>
            <Icon
              name={formData?.workLocationType ? 'CheckCircle2' : 'Circle'}
              size={16}
              color={formData?.workLocationType ? 'var(--color-success)' : 'var(--color-muted-foreground)'}
            />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Compensation</span>
            <Icon
              name={formData?.salaryType ? 'CheckCircle2' : 'Circle'}
              size={16}
              color={formData?.salaryType ? 'var(--color-success)' : 'var(--color-muted-foreground)'}
            />
          </div>
        </div>
      </div>
      <div className="bg-card rounded-lg border border-border p-4 md:p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base md:text-lg font-semibold text-foreground font-heading">
            SEO Score
          </h3>
          <span className={`text-lg md:text-xl font-bold ${
            seoScore >= 80 ? 'text-success' : seoScore >= 50 ? 'text-warning' : 'text-error'
          }`}>
            {seoScore}/100
          </span>
        </div>

        <div className="h-2 bg-muted rounded-full overflow-hidden mb-4">
          <div
            className={`h-full transition-smooth ${
              seoScore >= 80 ? 'bg-success' : seoScore >= 50 ? 'bg-warning' : 'bg-error'
            }`}
            style={{ width: `${seoScore}%` }}
          />
        </div>

        <div className="space-y-2 text-xs md:text-sm text-muted-foreground">
          <div className="flex items-start gap-2">
            <Icon name="CheckCircle2" size={14} className="flex-shrink-0 mt-0.5 text-success" />
            <span>Clear job title improves searchability</span>
          </div>
          <div className="flex items-start gap-2">
            <Icon name="CheckCircle2" size={14} className="flex-shrink-0 mt-0.5 text-success" />
            <span>Department categorization helps filtering</span>
          </div>
          {formData?.jobDescription?.length < 200 && (
            <div className="flex items-start gap-2">
              <Icon name="AlertCircle" size={14} className="flex-shrink-0 mt-0.5 text-warning" />
              <span>Add more description details (min 200 chars)</span>
            </div>
          )}
          {formData?.salaryType === 'negotiable' && (
            <div className="flex items-start gap-2">
              <Icon name="AlertCircle" size={14} className="flex-shrink-0 mt-0.5 text-warning" />
              <span>Salary transparency increases visibility</span>
            </div>
          )}
        </div>
      </div>
      <div className="bg-card rounded-lg border border-border p-4 md:p-6">
        <h3 className="text-base md:text-lg font-semibold text-foreground font-heading mb-4">
          Quick Preview
        </h3>

        <div className="space-y-3 text-sm">
          <div>
            <p className="text-xs text-muted-foreground text-caption mb-1">Job Title</p>
            <p className="text-foreground font-medium">
              {formData?.jobTitle || 'Not specified'}
            </p>
          </div>

          <div>
            <p className="text-xs text-muted-foreground text-caption mb-1">Department</p>
            <p className="text-foreground">
              {formData?.department ? formData?.department?.charAt(0)?.toUpperCase() + formData?.department?.slice(1) : 'Not specified'}
            </p>
          </div>

          <div>
            <p className="text-xs text-muted-foreground text-caption mb-1">Location</p>
            <p className="text-foreground">
              {formData?.workLocationType === 'remote' ? 'Remote' :
               formData?.workLocationType === 'hybrid' ? 'Hybrid' :
               formData?.city && formData?.state ? `${formData?.city}, ${formData?.state}` : 'Not specified'}
            </p>
          </div>

          <div>
            <p className="text-xs text-muted-foreground text-caption mb-1">Salary</p>
            <p className="text-foreground font-medium">
              {formatSalary()}
            </p>
          </div>

          <div>
            <p className="text-xs text-muted-foreground text-caption mb-1">Description Length</p>
            <p className="text-foreground">
              {formData?.jobDescription?.length || 0} characters
            </p>
          </div>
        </div>
      </div>
      <div className="bg-primary/5 border border-primary/20 rounded-lg p-3 md:p-4">
        <div className="flex items-start gap-2">
          <Icon name="Sparkles" size={16} className="text-primary flex-shrink-0 mt-0.5" />
          <div className="text-xs md:text-sm">
            <p className="font-medium text-foreground mb-1">AI Enhancement Available</p>
            <p className="text-muted-foreground">
              Our AI can help optimize your job description for better candidate matching after you complete the basic details.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobPreviewPanel;