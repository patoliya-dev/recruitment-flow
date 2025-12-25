import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import OnboardingHeader from '../../components/ui/OnboardingHeader';
import OnboardingProgressBar from '../../components/ui/OnboardingProgressBar';
import StepNavigationControls from '../../components/ui/StepNavigationControls';
import AutoSaveIndicator from '../../components/ui/AutoSaveIndicator';
import JobTitleSection from './components/JobTitleSection';
import JobDescriptionSection from './components/JobDescriptionSection';
import LocationSection from './components/LocationSection';
import CompensationSection from './components/CompensationSection';
import JobPreviewPanel from './components/JobPreviewPanel';
import Icon from '../../components/AppIcon';

const JobPostingCreation = () => {
  const navigate = useNavigate();
  const [saveStatus, setSaveStatus] = useState('saved');
  const [lastSaved, setLastSaved] = useState(new Date());
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    jobTitle: '',
    department: '',
    employmentType: '',
    experienceLevel: '',
    jobDescription: '',
    workLocationType: '',
    remoteWorldwide: false,
    timezoneRequired: false,
    timezone: '',
    city: '',
    state: '',
    country: '',
    officeAddress: '',
    daysInOffice: '',
    salaryType: '',
    currency: 'usd',
    payPeriod: 'year',
    salaryMin: '',
    salaryMax: '',
    salaryFixed: '',
    benefits: {
      healthInsurance: false,
      dentalVision: false,
      retirement: false,
      paidTimeOff: false,
      professionalDev: false,
      equity: false,
      flexibleSchedule: false,
      remoteStipend: false
    }
  });

  useEffect(() => {
    const savedData = localStorage.getItem('jobPostingDraft');
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        setFormData(parsed);
      } catch (error) {
        console.error('Error loading draft:', error);
      }
    }
  }, []);

  useEffect(() => {
    const autoSaveTimer = setTimeout(() => {
      setSaveStatus('saving');
      localStorage.setItem('jobPostingDraft', JSON.stringify(formData));
      setTimeout(() => {
        setSaveStatus('saved');
        setLastSaved(new Date());
      }, 500);
    }, 2000);

    return () => clearTimeout(autoSaveTimer);
  }, [formData]);

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    if (errors?.[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.jobTitle?.trim()) {
      newErrors.jobTitle = 'Job title is required';
    }

    if (!formData?.department) {
      newErrors.department = 'Department is required';
    }

    if (!formData?.employmentType) {
      newErrors.employmentType = 'Employment type is required';
    }

    if (!formData?.experienceLevel) {
      newErrors.experienceLevel = 'Experience level is required';
    }

    if (!formData?.jobDescription?.trim()) {
      newErrors.jobDescription = 'Job description is required';
    } else if (formData?.jobDescription?.length < 200) {
      newErrors.jobDescription = 'Job description should be at least 200 characters';
    }

    if (!formData?.workLocationType) {
      newErrors.workLocationType = 'Work location type is required';
    }

    if (formData?.workLocationType === 'onsite' || formData?.workLocationType === 'hybrid') {
      if (!formData?.city?.trim()) {
        newErrors.city = 'City is required';
      }
      if (!formData?.state?.trim()) {
        newErrors.state = 'State/Province is required';
      }
      if (!formData?.country) {
        newErrors.country = 'Country is required';
      }
    }

    if (!formData?.salaryType) {
      newErrors.salaryType = 'Salary type is required';
    }

    if (formData?.salaryType === 'range') {
      if (!formData?.salaryMin) {
        newErrors.salaryMin = 'Minimum salary is required';
      }
      if (!formData?.salaryMax) {
        newErrors.salaryMax = 'Maximum salary is required';
      }
      if (formData?.salaryMin && formData?.salaryMax && parseInt(formData?.salaryMin) >= parseInt(formData?.salaryMax)) {
        newErrors.salaryMax = 'Maximum salary must be greater than minimum';
      }
    }

    if (formData?.salaryType === 'fixed' && !formData?.salaryFixed) {
      newErrors.salaryFixed = 'Salary amount is required';
    }

    if (formData?.salaryType !== 'negotiable') {
      if (!formData?.currency) {
        newErrors.currency = 'Currency is required';
      }
      if (!formData?.payPeriod) {
        newErrors.payPeriod = 'Pay period is required';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
      navigate('/job-requirements-details');
    } else {
      const firstErrorElement = document.querySelector('[class*="border-error"]');
      if (firstErrorElement) {
        firstErrorElement?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  };

  const handleSaveDraft = () => {
    setSaveStatus('saving');
    localStorage.setItem('jobPostingDraft', JSON.stringify(formData));
    setTimeout(() => {
      setSaveStatus('saved');
      setLastSaved(new Date());
    }, 500);
  };

  const canProceed = formData?.jobTitle && formData?.department && formData?.jobDescription?.length >= 200;

  return (
    <div className="min-h-screen bg-background">
      <OnboardingHeader currentStep={5} totalSteps={6} />

      <div className="pt-[72px]">
        <OnboardingProgressBar currentStep={5} />
      </div>

      <main className="max-w-screen-xl mx-auto px-4 lg:px-6 py-6 md:py-8 lg:py-12 pb-32">
        <div className="mb-6 md:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground font-heading mb-2">
                Create Your Job Posting
              </h1>
              <p className="text-sm md:text-base text-muted-foreground text-caption">
                Provide detailed information to attract the right candidates
              </p>
            </div>
            <div className="flex items-center gap-3">
              <AutoSaveIndicator saveStatus={saveStatus} lastSaved={lastSaved} />
              <button
                onClick={handleSaveDraft}
                className="flex items-center gap-2 px-4 py-2 text-sm text-primary hover:bg-primary/10 rounded-md transition-smooth border border-primary/20"
              >
                <Icon name="Save" size={16} />
                <span className="hidden sm:inline">Save Draft</span>
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          <div className="lg:col-span-2 space-y-6 md:space-y-8">
            <JobTitleSection
              formData={formData}
              errors={errors}
              onChange={handleChange}
            />

            <JobDescriptionSection
              formData={formData}
              errors={errors}
              onChange={handleChange}
            />

            <LocationSection
              formData={formData}
              errors={errors}
              onChange={handleChange}
            />

            <CompensationSection
              formData={formData}
              errors={errors}
              onChange={handleChange}
            />
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <JobPreviewPanel formData={formData} />
            </div>
          </div>
        </div>
      </main>

      <StepNavigationControls
        currentStep={5}
        canProceed={canProceed}
        onNext={handleNext}
        onPrevious={() => navigate('/company-branding')}
        onSkip={() => navigate('/job-requirements-details')}
        nextLabel="Continue to Requirements"
        previousLabel="Back to Branding"
      />
    </div>
  );
};

export default JobPostingCreation;