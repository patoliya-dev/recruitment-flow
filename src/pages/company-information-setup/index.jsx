import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import OnboardingHeader from '../../components/ui/OnboardingHeader';
import OnboardingProgressBar from '../../components/ui/OnboardingProgressBar';
import StepNavigationControls from '../../components/ui/StepNavigationControls';
import AutoSaveIndicator from '../../components/ui/AutoSaveIndicator';
import Input from '../../components/ui/Input';
import FormSection from './components/FormSection';
import IndustrySelector from './components/IndustrySelector';
import CompanySizeSelector from './components/CompanySizeSelector';
import LocationFields from './components/LocationFields';
import ContactInformation from './components/ContactInformation';
import CompanyDescription from './components/CompanyDescription';
import FoundingYearInput from './components/FoundingYearInput';
import Icon from '../../components/AppIcon';

const CompanyInformationSetup = () => {
  const navigate = useNavigate();
  const currentStep = 3;

  const [formData, setFormData] = useState({
    companyName: '',
    industry: '',
    companySize: '',
    foundingYear: '',
    country: '',
    state: '',
    city: '',
    zipCode: '',
    email: '',
    phone: '',
    website: '',
    description: ''
  });

  const [errors, setErrors] = useState({});
  const [saveStatus, setSaveStatus] = useState('saved');
  const [lastSaved, setLastSaved] = useState(new Date());
  const [touched, setTouched] = useState({});

  useEffect(() => {
    const savedData = localStorage.getItem('companyInformationData');
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  useEffect(() => {
    const autoSaveTimer = setTimeout(() => {
      if (Object.keys(touched)?.length > 0) {
        setSaveStatus('saving');
        setTimeout(() => {
          localStorage.setItem('companyInformationData', JSON.stringify(formData));
          setSaveStatus('saved');
          setLastSaved(new Date());
        }, 500);
      }
    }, 1000);

    return () => clearTimeout(autoSaveTimer);
  }, [formData, touched]);

  const validateField = (name, value) => {
    let error = '';

    switch (name) {
      case 'companyName':
        if (!value?.trim()) {
          error = 'Company name is required';
        } else if (value?.trim()?.length < 2) {
          error = 'Company name must be at least 2 characters';
        }
        break;
      case 'industry':
        if (!value) {
          error = 'Please select an industry';
        }
        break;
      case 'companySize':
        if (!value) {
          error = 'Please select company size';
        }
        break;
      case 'country':
        if (!value) {
          error = 'Country is required';
        }
        break;
      case 'state':
        if (!value) {
          error = 'State/Province is required';
        }
        break;
      case 'city':
        if (!value?.trim()) {
          error = 'City is required';
        }
        break;
      case 'email':
        if (!value?.trim()) {
          error = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/?.test(value)) {
          error = 'Please enter a valid email address';
        }
        break;
      case 'phone':
        if (!value?.trim()) {
          error = 'Phone number is required';
        } else if (value?.replace(/\D/g, '')?.length < 10) {
          error = 'Please enter a valid phone number';
        }
        break;
      case 'website':
        if (value && !/^https?:\/\/.+\..+/?.test(value)) {
          error = 'Please enter a valid URL (e.g., https://example.com)';
        }
        break;
      case 'description':
        if (!value?.trim()) {
          error = 'Company description is required';
        } else if (value?.trim()?.length < 100) {
          error = 'Description must be at least 100 characters';
        } else if (value?.trim()?.length > 1000) {
          error = 'Description must not exceed 1000 characters';
        }
        break;
      default:
        break;
    }

    return error;
  };

  const handleFieldChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    setTouched(prev => ({ ...prev, [name]: true }));

    if (touched?.[name]) {
      let error = validateField(name, value);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (name) => {
    setTouched(prev => ({ ...prev, [name]: true }));
    let error = validateField(name, formData?.[name]);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const validateForm = () => {
    const newErrors = {};
    const requiredFields = [
      'companyName',
      'industry',
      'companySize',
      'country',
      'state',
      'city',
      'email',
      'phone',
      'description'
    ];

    requiredFields?.forEach(field => {
      let error = validateField(field, formData?.[field]);
      if (error) {
        newErrors[field] = error;
      }
    });

    if (formData?.website) {
      const websiteError = validateField('website', formData?.website);
      if (websiteError) {
        newErrors.website = websiteError;
      }
    }

    setErrors(newErrors);
    setTouched(
      requiredFields?.reduce((acc, field) => ({ ...acc, [field]: true }), {})
    );

    return Object.keys(newErrors)?.length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
      localStorage.setItem('companyInformationData', JSON.stringify(formData));
      navigate('/company-logo-and-branding');
    } else {
      const firstErrorField = document.querySelector('[aria-invalid="true"]');
      if (firstErrorField) {
        firstErrorField?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        firstErrorField?.focus();
      }
    }
  };

  const handlePrevious = () => {
    localStorage.setItem('companyInformationData', JSON.stringify(formData));
    navigate('/welcome-getting-started');
  };

  const canProceed = formData?.companyName?.trim() && 
                     formData?.industry && 
                     formData?.companySize && 
                     formData?.description?.trim()?.length >= 100;

  return (
    <div className="min-h-screen bg-background">
      <OnboardingHeader currentStep={currentStep} totalSteps={6} />
      <div className="pt-20 md:pt-24">
        <OnboardingProgressBar currentStep={currentStep} />
      </div>
      <main className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-8 lg:py-12 pb-32">
        <div className="mb-6 md:mb-8 lg:mb-10">
          <div className="flex items-start justify-between gap-4 mb-3 md:mb-4">
            <div className="flex-1">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground font-heading mb-2">
                Tell us about your company
              </h1>
              <p className="text-sm md:text-base lg:text-lg text-muted-foreground">
                Help candidates learn more about your organization and what makes it unique
              </p>
            </div>
            <AutoSaveIndicator saveStatus={saveStatus} lastSaved={lastSaved} />
          </div>

          <div className="flex items-center gap-2 p-3 md:p-4 bg-primary/5 border border-primary/20 rounded-md md:rounded-lg">
            <Icon name="Info" size={18} color="var(--color-primary)" className="flex-shrink-0" />
            <p className="text-xs md:text-sm text-foreground text-caption">
              This information will be visible to job seekers on your company profile and job postings
            </p>
          </div>
        </div>

        <div className="space-y-6 md:space-y-8 lg:space-y-10">
          <FormSection
            title="Basic Information"
            description="Essential details about your organization"
          >
            <Input
              label="Company Name"
              type="text"
              value={formData?.companyName}
              onChange={(e) => handleFieldChange('companyName', e?.target?.value)}
              onBlur={() => handleBlur('companyName')}
              error={errors?.companyName}
              required
              placeholder="Enter your company name"
              description="Legal or trading name of your organization"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 lg:gap-6">
              <IndustrySelector
                value={formData?.industry}
                onChange={(value) => handleFieldChange('industry', value)}
                error={errors?.industry}
              />

              <CompanySizeSelector
                value={formData?.companySize}
                onChange={(value) => handleFieldChange('companySize', value)}
                error={errors?.companySize}
              />
            </div>

            <FoundingYearInput
              value={formData?.foundingYear}
              onChange={(value) => handleFieldChange('foundingYear', value)}
              error={errors?.foundingYear}
            />
          </FormSection>

          <FormSection
            title="Company Location"
            description="Where is your company headquartered?"
          >
            <LocationFields
              country={formData?.country}
              onCountryChange={(value) => handleFieldChange('country', value)}
              state={formData?.state}
              onStateChange={(value) => handleFieldChange('state', value)}
              city={formData?.city}
              onCityChange={(value) => handleFieldChange('city', value)}
              zipCode={formData?.zipCode}
              onZipCodeChange={(value) => handleFieldChange('zipCode', value)}
              errors={errors}
            />
          </FormSection>

          <FormSection
            title="Contact Information"
            description="How can candidates reach your company?"
          >
            <ContactInformation
              email={formData?.email}
              onEmailChange={(value) => handleFieldChange('email', value)}
              phone={formData?.phone}
              onPhoneChange={(value) => handleFieldChange('phone', value)}
              website={formData?.website}
              onWebsiteChange={(value) => handleFieldChange('website', value)}
              errors={errors}
            />
          </FormSection>

          <FormSection
            title="About Your Company"
            description="Share what makes your company special"
          >
            <CompanyDescription
              value={formData?.description}
              onChange={(value) => handleFieldChange('description', value)}
              error={errors?.description}
            />
          </FormSection>
        </div>
      </main>
      <StepNavigationControls
        currentStep={currentStep}
        canProceed={canProceed}
        onNext={handleNext}
        onPrevious={handlePrevious}
        onSkip={() => navigate('/company-logo-and-branding')}
        nextLabel="Continue to Branding"
        previousLabel="Back to Getting Started"
      />
    </div>
  );
};

export default CompanyInformationSetup;