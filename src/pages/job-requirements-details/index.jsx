import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import OnboardingHeader from '../../components/ui/OnboardingHeader';
import OnboardingProgressBar from '../../components/ui/OnboardingProgressBar';
import StepNavigationControls from '../../components/ui/StepNavigationControls';
import AutoSaveIndicator from '../../components/ui/AutoSaveIndicator';
import ExperienceSection from './components/ExperienceSection';
import SkillsSection from './components/SkillsSection';
import CompensationSection from './components/CompensationSection';
import ApplicationRequirementsSection from './components/ApplicationRequirementsSection';
import RequirementsPreview from './components/RequirementsPreview';

const JobRequirementsDetails = () => {
  const navigate = useNavigate();
  const [saveStatus, setSaveStatus] = useState('saved');
  const [lastSaved, setLastSaved] = useState(new Date());
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    experienceLevel: 'mid',
    minYearsExperience: '3',
    preferredYearsExperience: '5',
    educationLevel: 'bachelor',
    fieldOfStudy: 'computer_science',
    technicalSkills: [
      { skill: 'react', level: 'advanced' },
      { skill: 'javascript', level: 'expert' },
      { skill: 'nodejs', level: 'intermediate' }
    ],
    softSkills: ['communication', 'teamwork', 'problem_solving'],
    currency: 'USD',
    salaryType: 'annual',
    minSalary: '80000',
    maxSalary: '120000',
    includeEquity: true,
    equityPercentage: '0.5',
    vestingPeriod: '4',
    benefits: ['health_insurance', 'retirement_401k', 'paid_time_off', 'remote_work'],
    additionalBenefits: 'Flexible hours, unlimited PTO, learning budget',
    requiredDocuments: ['resume', 'cover_letter'],
    screeningQuestions: [
      'Are you authorized to work in the United States?',
      'Do you have the required years of experience for this role?'
    ],
    customScreeningQuestion: '',
    applicationDeadline: '2025-02-28',
    expectedStartDate: '2025-03-15'
  });

  useEffect(() => {
    const savedData = localStorage.getItem('jobRequirementsData');
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  useEffect(() => {
    const autoSaveTimer = setTimeout(() => {
      setSaveStatus('saving');
      localStorage.setItem('jobRequirementsData', JSON.stringify(formData));
      setTimeout(() => {
        setSaveStatus('saved');
        setLastSaved(new Date());
      }, 500);
    }, 1000);

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

    if (!formData?.experienceLevel) {
      newErrors.experienceLevel = 'Experience level is required';
    }

    if (!formData?.educationLevel) {
      newErrors.educationLevel = 'Education level is required';
    }

    if (!formData?.technicalSkills || formData?.technicalSkills?.length === 0) {
      newErrors.technicalSkills = 'At least one technical skill is required';
    }

    if (!formData?.minSalary || !formData?.maxSalary) {
      newErrors.minSalary = 'Salary range is required';
      newErrors.maxSalary = 'Salary range is required';
    } else if (parseInt(formData?.minSalary) >= parseInt(formData?.maxSalary)) {
      newErrors.maxSalary = 'Maximum salary must be greater than minimum salary';
    }

    if (!formData?.requiredDocuments || formData?.requiredDocuments?.length === 0) {
      newErrors.requiredDocuments = 'At least one required document must be selected';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
      localStorage.setItem('jobRequirementsData', JSON.stringify(formData));
      navigate('/job-preview-confirmation');
    }
  };

  const handlePreview = () => {
    if (validateForm()) {
      console.log('Preview job posting with requirements:', formData);
    }
  };

  const canProceed = formData?.experienceLevel && 
                     formData?.educationLevel && 
                     formData?.technicalSkills?.length > 0 &&
                     formData?.minSalary && 
                     formData?.maxSalary &&
                     formData?.requiredDocuments?.length > 0;

  return (
    <div className="min-h-screen bg-background">
      <OnboardingHeader currentStep={6} totalSteps={6} />
      
      <div className="pt-20">
        <OnboardingProgressBar currentStep={6} />
      </div>

      <main className="max-w-screen-xl mx-auto px-4 lg:px-6 py-6 md:py-8 lg:py-12 pb-32">
        <div className="mb-6 md:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-2">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-foreground">
              Job Requirements & Details
            </h1>
            <AutoSaveIndicator saveStatus={saveStatus} lastSaved={lastSaved} />
          </div>
          <p className="text-sm md:text-base text-muted-foreground">
            Define the qualifications, compensation, and application requirements for your job posting
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          <div className="lg:col-span-2 space-y-6 md:space-y-8">
            <ExperienceSection 
              formData={formData} 
              onChange={handleChange} 
              errors={errors} 
            />

            <SkillsSection 
              formData={formData} 
              onChange={handleChange} 
              errors={errors} 
            />

            <CompensationSection 
              formData={formData} 
              onChange={handleChange} 
              errors={errors} 
            />

            <ApplicationRequirementsSection 
              formData={formData} 
              onChange={handleChange} 
              errors={errors} 
            />
          </div>

          <div className="lg:col-span-1">
            <RequirementsPreview formData={formData} />
          </div>
        </div>
      </main>

      <StepNavigationControls
        currentStep={6}
        canProceed={canProceed}
        onNext={handleNext}
        onPrevious={() => navigate('/job-posting-content')}
        onSkip={() => navigate('/dashboard')}
        nextLabel="Complete Setup"
        previousLabel="Back to Job Posting"
      />
    </div>
  );
};

export default JobRequirementsDetails;