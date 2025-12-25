import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import OnboardingHeader from '../../components/ui/OnboardingHeader';
import OnboardingProgressBar from '../../components/ui/OnboardingProgressBar';
import StepNavigationControls from '../../components/ui/StepNavigationControls';
import AutoSaveIndicator from '../../components/ui/AutoSaveIndicator';
import LogoUploadZone from './components/LogoUploadZone';
import BrandColorPicker from './components/BrandColorPicker';
import TaglineInput from './components/TaglineInput';
import BrandPreview from './components/BrandPreview';
import BrandingGuidelines from './components/BrandingGuidelines';
import Icon from '../../components/AppIcon';

const CompanyLogoAndBranding = () => {
  const navigate = useNavigate();
  const [saveStatus, setSaveStatus] = useState('saved');
  const [lastSaved, setLastSaved] = useState(new Date());

  const [brandingData, setBrandingData] = useState({
    logo: '',
    logoName: '',
    brandColor: '#2C5F41',
    tagline: '',
    companyName: 'TechVision Solutions'
  });

  const [showGuidelines, setShowGuidelines] = useState(false);

  useEffect(() => {
    const savedData = localStorage.getItem('onboarding_branding');
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        setBrandingData(parsed);
      } catch (error) {
        console.error('Error loading saved branding data:', error);
      }
    }

    const savedCompanyName = localStorage.getItem('onboarding_company_name');
    if (savedCompanyName) {
      setBrandingData(prev => ({ ...prev, companyName: savedCompanyName }));
    }
  }, []);

  useEffect(() => {
    const autoSave = setTimeout(() => {
      setSaveStatus('saving');
      localStorage.setItem('onboarding_branding', JSON.stringify(brandingData));
      setTimeout(() => {
        setSaveStatus('saved');
        setLastSaved(new Date());
      }, 500);
    }, 1000);

    return () => clearTimeout(autoSave);
  }, [brandingData]);

  const handleLogoUpload = (logoUrl, fileName) => {
    setBrandingData(prev => ({
      ...prev,
      logo: logoUrl,
      logoName: fileName
    }));
  };

  const handleRemoveLogo = () => {
    setBrandingData(prev => ({
      ...prev,
      logo: '',
      logoName: ''
    }));
  };

  const handleColorChange = (color) => {
    setBrandingData(prev => ({
      ...prev,
      brandColor: color
    }));
  };

  const handleTaglineChange = (tagline) => {
    setBrandingData(prev => ({
      ...prev,
      tagline: tagline
    }));
  };

  const handleNext = () => {
    navigate('/job-posting-creation');
  };

  const handleSkip = () => {
    navigate('/job-posting-creation');
  };

  const canProceed = true;

  return (
    <div className="min-h-screen bg-background">
      <OnboardingHeader currentStep={4} totalSteps={6} />
      <div className="pt-[72px]">
        <OnboardingProgressBar currentStep={4} />
      </div>
      <main className="max-w-screen-xl mx-auto px-4 lg:px-6 py-8 md:py-12 pb-32">
        <div className="mb-8 md:mb-12">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div className="flex-1">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-foreground mb-2">
                Company Logo & Branding
              </h1>
              <p className="text-sm md:text-base text-muted-foreground text-caption">
                Create a professional brand presence that attracts top talent. Upload your logo, choose brand colors, and add a memorable tagline.
              </p>
            </div>
            <button
              onClick={() => setShowGuidelines(!showGuidelines)}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-primary border border-primary rounded-md hover:bg-primary/5 transition-smooth flex-shrink-0"
            >
              <Icon name="BookOpen" size={16} />
              <span className="hidden sm:inline">Guidelines</span>
            </button>
          </div>
          <AutoSaveIndicator saveStatus={saveStatus} lastSaved={lastSaved} />
        </div>

        {showGuidelines && (
          <div className="mb-8 animate-in fade-in slide-in-from-top-4 duration-300">
            <BrandingGuidelines />
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          <div className="space-y-6 md:space-y-8">
            <div className="bg-card border border-border rounded-lg p-6 md:p-8 shadow-warm-md">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon name="Image" size={20} color="var(--color-primary)" />
                </div>
                <div>
                  <h2 className="text-lg md:text-xl font-semibold text-foreground">
                    Company Logo
                  </h2>
                  <p className="text-sm text-caption text-muted-foreground">
                    Upload your company logo
                  </p>
                </div>
              </div>
              <LogoUploadZone
                onLogoUpload={handleLogoUpload}
                currentLogo={brandingData?.logo}
                onRemoveLogo={handleRemoveLogo}
              />
            </div>

            <div className="bg-card border border-border rounded-lg p-6 md:p-8 shadow-warm-md">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon name="Palette" size={20} color="var(--color-primary)" />
                </div>
                <div>
                  <h2 className="text-lg md:text-xl font-semibold text-foreground">
                    Brand Color
                  </h2>
                  <p className="text-sm text-caption text-muted-foreground">
                    Choose your primary brand color
                  </p>
                </div>
              </div>
              <BrandColorPicker
                selectedColor={brandingData?.brandColor}
                onColorChange={handleColorChange}
              />
            </div>

            <div className="bg-card border border-border rounded-lg p-6 md:p-8 shadow-warm-md">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon name="Type" size={20} color="var(--color-primary)" />
                </div>
                <div>
                  <h2 className="text-lg md:text-xl font-semibold text-foreground">
                    Company Tagline
                  </h2>
                  <p className="text-sm text-caption text-muted-foreground">
                    Add a memorable tagline (optional)
                  </p>
                </div>
              </div>
              <TaglineInput
                value={brandingData?.tagline}
                onChange={handleTaglineChange}
              />
            </div>
          </div>

          <div className="lg:sticky lg:top-24 lg:self-start">
            <div className="bg-card border border-border rounded-lg p-6 md:p-8 shadow-warm-md">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon name="Eye" size={20} color="var(--color-primary)" />
                </div>
                <div>
                  <h2 className="text-lg md:text-xl font-semibold text-foreground">
                    Brand Preview
                  </h2>
                  <p className="text-sm text-caption text-muted-foreground">
                    See how your brand looks
                  </p>
                </div>
              </div>
              <BrandPreview
                logo={brandingData?.logo}
                brandColor={brandingData?.brandColor}
                tagline={brandingData?.tagline}
                companyName={brandingData?.companyName}
              />
            </div>
          </div>
        </div>

        <div className="mt-8 p-4 md:p-6 bg-primary/5 border border-primary/20 rounded-lg">
          <div className="flex items-start gap-3">
            <Icon name="Info" size={20} color="var(--color-primary)" className="flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm md:text-base font-medium text-foreground mb-1">
                Optional Step
              </p>
              <p className="text-sm text-muted-foreground text-caption">
                You can skip this step and add your branding later from your company settings. However, a professional brand presence increases candidate engagement by up to 45%.
              </p>
            </div>
          </div>
        </div>
      </main>
      <StepNavigationControls
        currentStep={4}
        canProceed={canProceed}
        onNext={handleNext}
        onPrevious={() => navigate('/team-structure')}
        nextLabel="Continue"
        previousLabel="Back"
        showSkip={true}
        onSkip={handleSkip}
      />
    </div>
  );
};

export default CompanyLogoAndBranding;