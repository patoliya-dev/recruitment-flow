import React from 'react';
import Icon from '../../../components/AppIcon';

const JobPostingPreview = ({ jobData }) => {
  if (!jobData) {
    return (
      <div className="bg-card rounded-lg border border-border p-6 md:p-8">
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <Icon name="FileText" size={48} className="text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No job posting data available</p>
          </div>
        </div>
      </div>
    );
  }

  const formatSalary = () => {
    if (!jobData?.minSalary || !jobData?.maxSalary) return 'Not specified';
    const currency = jobData?.currency?.toUpperCase() || 'USD';
    return `${currency} $${parseInt(jobData?.minSalary)?.toLocaleString()} - $${parseInt(jobData?.maxSalary)?.toLocaleString()}`;
  };

  const formatLocation = () => {
    if (jobData?.workLocationType === 'remote') return 'Remote';
    if (jobData?.workLocationType === 'hybrid') return `Hybrid - ${jobData?.city || 'Location'}, ${jobData?.state || ''}`;
    return `${jobData?.city || 'Location'}, ${jobData?.state || ''}`;
  };

  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden">
      <div className="bg-primary/5 border-b border-border px-6 py-4">
        <div className="flex items-center gap-2 text-sm text-primary">
          <Icon name="Eye" size={16} />
          <span className="font-medium">Candidate View Preview</span>
        </div>
      </div>

      <div className="p-6 md:p-8">
        <div className="flex items-start justify-between mb-6">
          <div className="flex-1">
            <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-2">
              {jobData?.jobTitle || 'Job Title'}
            </h2>
            <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Icon name="Building2" size={14} />
                <span>{jobData?.company?.companyName || 'Company Name'}</span>
              </div>
              <div className="flex items-center gap-1">
                <Icon name="MapPin" size={14} />
                <span>{formatLocation()}</span>
              </div>
              <div className="flex items-center gap-1">
                <Icon name="Briefcase" size={14} />
                <span className="capitalize">{jobData?.employmentType || 'Full-time'}</span>
              </div>
            </div>
          </div>

          {jobData?.branding?.logoUrl && (
            <div className="w-16 h-16 rounded-lg border border-border overflow-hidden flex-shrink-0">
              <img src={jobData?.branding?.logoUrl} alt="Company logo" className="w-full h-full object-cover" />
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
            {jobData?.experienceLevel || 'Mid-level'}
          </span>
          <span className="px-3 py-1 bg-success/10 text-success text-xs font-medium rounded-full">
            {jobData?.department || 'Department'}
          </span>
          {jobData?.workLocationType === 'remote' && (
            <span className="px-3 py-1 bg-accent/10 text-accent text-xs font-medium rounded-full">
              Remote
            </span>
          )}
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
              <Icon name="FileText" size={18} />
              Job Description
            </h3>
            <p className="text-sm md:text-base text-muted-foreground whitespace-pre-wrap">
              {jobData?.jobDescription || 'No description provided'}
            </p>
          </div>

          <div className="border-t border-border pt-6">
            <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
              <Icon name="Award" size={18} />
              Requirements
            </h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium text-foreground mb-2">Experience Level</p>
                <p className="text-sm text-muted-foreground capitalize">
                  {jobData?.experienceLevel || 'Not specified'} ({jobData?.minYearsExperience || '0'}+ years)
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-foreground mb-2">Education</p>
                <p className="text-sm text-muted-foreground capitalize">
                  {jobData?.educationLevel?.replace('_', ' ') || 'Not specified'}
                </p>
              </div>
              {jobData?.technicalSkills && jobData?.technicalSkills?.length > 0 && (
                <div>
                  <p className="text-sm font-medium text-foreground mb-2">Technical Skills</p>
                  <div className="flex flex-wrap gap-2">
                    {jobData?.technicalSkills?.map((skill, index) => (
                      <span key={index} className="px-2 py-1 bg-muted text-foreground text-xs rounded">
                        {skill?.skill || skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="border-t border-border pt-6">
            <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
              <Icon name="DollarSign" size={18} />
              Compensation & Benefits
            </h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium text-foreground mb-1">Salary Range</p>
                <p className="text-lg font-semibold text-primary">{formatSalary()}</p>
              </div>
              {jobData?.benefits && jobData?.benefits?.length > 0 && (
                <div>
                  <p className="text-sm font-medium text-foreground mb-2">Benefits</p>
                  <ul className="space-y-1">
                    {jobData?.benefits?.map((benefit, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Icon name="CheckCircle2" size={14} className="text-success" />
                        <span className="capitalize">{benefit?.replace('_', ' ')}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          <div className="border-t border-border pt-6">
            <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
              <Icon name="Send" size={18} />
              Application Requirements
            </h3>
            <div className="space-y-2">
              {jobData?.requiredDocuments && jobData?.requiredDocuments?.length > 0 && (
                <div>
                  <p className="text-sm font-medium text-foreground mb-2">Required Documents</p>
                  <ul className="space-y-1">
                    {jobData?.requiredDocuments?.map((doc, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Icon name="FileText" size={14} />
                        <span className="capitalize">{doc?.replace('_', ' ')}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {jobData?.applicationDeadline && (
                <div className="mt-3">
                  <p className="text-sm font-medium text-foreground mb-1">Application Deadline</p>
                  <p className="text-sm text-muted-foreground">{jobData?.applicationDeadline}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobPostingPreview;