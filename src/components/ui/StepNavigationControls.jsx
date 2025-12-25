import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from './Button';


const StepNavigationControls = ({
  currentStep = 1,
  canProceed = true,
  onNext,
  onPrevious,
  nextLabel,
  previousLabel,
  showSkip = false,
  onSkip
}) => {
  const navigate = useNavigate();

  const stepRoutes = [
    '/email-verification',
    '/welcome-getting-started',
    '/company-information-setup',
    '/company-logo-and-branding',
    '/job-posting-creation',
    '/job-requirements-details'
  ];

  const stepLabels = {
    1: { next: 'Continue to Getting Started', prev: null },
    2: { next: 'Continue to Company Info', prev: 'Back to Verification' },
    3: { next: 'Continue to Branding', prev: 'Back to Getting Started' },
    4: { next: 'Continue to Job Posting', prev: 'Back to Company Info' },
    5: { next: 'Continue to Requirements', prev: 'Back to Branding' },
    6: { next: 'Complete Setup', prev: 'Back to Job Posting' }
  };

  const defaultNextLabel = nextLabel || stepLabels?.[currentStep]?.next || 'Continue';
  const defaultPreviousLabel = previousLabel || stepLabels?.[currentStep]?.prev || 'Back';
  const canGoBack = currentStep > 1;

  const handleNext = () => {
    if (onNext) {
      onNext();
    } else if (currentStep < stepRoutes?.length) {
      navigate(stepRoutes?.[currentStep]);
    }
  };

  const handlePrevious = () => {
    if (onPrevious) {
      onPrevious();
    } else if (currentStep > 1) {
      navigate(stepRoutes?.[currentStep - 2]);
    }
  };

  const handleSkip = () => {
    if (onSkip) {
      onSkip();
    } else if (currentStep < stepRoutes?.length) {
      navigate(stepRoutes?.[currentStep]);
    }
  };

  return (
    <div className="sticky bottom-0 left-0 right-0 bg-card border-t border-border z-50">
      <div className="max-w-screen-xl mx-auto px-4 lg:px-6 py-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3 order-2 sm:order-1">
            {canGoBack && (
              <Button
                variant="outline"
                onClick={handlePrevious}
                iconName="ArrowLeft"
                iconPosition="left"
                className="flex-1 sm:flex-none"
              >
                <span className="hidden sm:inline">{defaultPreviousLabel}</span>
                <span className="sm:hidden">Back</span>
              </Button>
            )}
            {showSkip && (
              <Button
                variant="ghost"
                onClick={handleSkip}
                className="flex-1 sm:flex-none"
              >
                Skip for now
              </Button>
            )}
          </div>

          <Button
            variant="default"
            onClick={handleNext}
            disabled={!canProceed}
            iconName="ArrowRight"
            iconPosition="right"
            className="flex-1 sm:flex-none order-1 sm:order-2"
          >
            <span className="hidden sm:inline">{defaultNextLabel}</span>
            <span className="sm:hidden">
              {currentStep === 6 ? 'Complete' : 'Continue'}
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StepNavigationControls;