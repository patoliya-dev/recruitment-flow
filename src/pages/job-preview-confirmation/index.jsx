import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import OnboardingHeader from '../../components/ui/OnboardingHeader';
import OnboardingProgressBar from '../../components/ui/OnboardingProgressBar';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import JobPostingPreview from './components/JobPostingPreview';
import PublicationOptions from './components/PublicationOptions';
import ValidationPanel from './components/ValidationPanel';
import MetricsPanel from './components/MetricsPanel';

const JobPreviewConfirmation = () => {
  const navigate = useNavigate();
  const [jobData, setJobData] = useState(null);
  const [publicationOption, setPublicationOption] = useState('immediate');
  const [scheduledDate, setScheduledDate] = useState('');
  const [isPublishing, setIsPublishing] = useState(false);
  const [validationIssues, setValidationIssues] = useState([]);

  useEffect(() => {
    const jobPostingData = localStorage.getItem('jobPostingDraft');
    const requirementsData = localStorage.getItem('jobRequirementsData');
    const companyData = localStorage.getItem('companyInformation');
    const brandingData = localStorage.getItem('companyBranding');

    if (jobPostingData && requirementsData) {
      const combinedData = {
        ...JSON.parse(jobPostingData),
        ...JSON.parse(requirementsData),
        company: companyData ? JSON.parse(companyData) : null,
        branding: brandingData ? JSON.parse(brandingData) : null
      };
      setJobData(combinedData);
      validateJobPosting(combinedData);
    }
  }, []);

  const validateJobPosting = (data) => {
    const issues = [];

    if (!data?.jobTitle) issues?.push({ field: 'Job Title', message: 'Job title is required' });
    if (!data?.jobDescription || data?.jobDescription?.length < 200) {
      issues?.push({ field: 'Job Description', message: 'Description should be at least 200 characters' });
    }
    if (!data?.experienceLevel) issues?.push({ field: 'Experience Level', message: 'Experience level is required' });
    if (!data?.minSalary || !data?.maxSalary) {
      issues?.push({ field: 'Compensation', message: 'Salary range is required' });
    }

    setValidationIssues(issues);
  };

  const handlePublish = async () => {
    if (validationIssues?.length > 0) {
      alert('Please fix all validation issues before publishing');
      return;
    }

    setIsPublishing(true);

    setTimeout(() => {
      localStorage.setItem('jobPublished', 'true');
      localStorage.setItem('publishedJobData', JSON.stringify(jobData));
      navigate('/onboarding-success');
    }, 2000);
  };

  const handleSaveDraft = () => {
    localStorage.setItem('jobDraftSaved', 'true');
    alert('Job posting saved as draft');
    navigate('/dashboard');
  };

  const handleEditDetails = () => {
    navigate('/job-requirements-details');
  };

  const canPublish = validationIssues?.length === 0 && jobData;

  return (
    <>
      <Helmet>
        <title>Preview & Confirm Job Posting - RecruitFlow</title>
        <meta name="description" content="Review your complete job posting before publication" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <OnboardingHeader currentStep={6} totalSteps={6} />
        
        <div className="pt-20">
          <OnboardingProgressBar currentStep={6} />
        </div>

        <main className="max-w-screen-xl mx-auto px-4 lg:px-6 py-6 md:py-8 lg:py-12 pb-32">
          <div className="mb-6 md:mb-8">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-foreground mb-2">
              Preview & Confirm Job Posting
            </h1>
            <p className="text-sm md:text-base text-muted-foreground">
              Review your complete job posting before publishing to candidates
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
            <div className="lg:col-span-2 space-y-6">
              <JobPostingPreview jobData={jobData} />
              <PublicationOptions
                publicationOption={publicationOption}
                setPublicationOption={setPublicationOption}
                scheduledDate={scheduledDate}
                setScheduledDate={setScheduledDate}
              />
            </div>

            <div className="space-y-6">
              <ValidationPanel validationIssues={validationIssues} />
              <MetricsPanel jobData={jobData} />

              <div className="bg-card rounded-lg border border-border p-4 md:p-6 space-y-3">
                <h3 className="text-base md:text-lg font-semibold text-foreground font-heading mb-4">
                  Publication Actions
                </h3>

                <Button
                  variant="default"
                  size="lg"
                  fullWidth
                  onClick={handlePublish}
                  disabled={!canPublish || isPublishing}
                  loading={isPublishing}
                  iconName="Send"
                  iconPosition="right"
                >
                  {isPublishing ? 'Publishing...' : 'Publish Job Posting'}
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  fullWidth
                  onClick={handleSaveDraft}
                  disabled={isPublishing}
                  iconName="Save"
                  iconPosition="left"
                >
                  Save as Draft
                </Button>

                <Button
                  variant="ghost"
                  size="lg"
                  fullWidth
                  onClick={handleEditDetails}
                  disabled={isPublishing}
                  iconName="Edit"
                  iconPosition="left"
                >
                  Edit Details
                </Button>
              </div>

              {!canPublish && (
                <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
                  <div className="flex items-start gap-2">
                    <Icon name="AlertCircle" size={18} className="text-warning flex-shrink-0 mt-0.5" />
                    <div className="text-sm">
                      <p className="font-medium text-foreground mb-1">Action Required</p>
                      <p className="text-muted-foreground">
                        Please fix all validation issues before publishing your job posting.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default JobPreviewConfirmation;