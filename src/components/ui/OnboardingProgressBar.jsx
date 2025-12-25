import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

const OnboardingProgressBar = ({ currentStep = 1 }) => {
  const navigate = useNavigate();

  const steps = [
    { id: 1, label: 'Email Verification', path: '/email-verification', icon: 'Mail' },
    { id: 2, label: 'Getting Started', path: '/welcome-getting-started', icon: 'Sparkles' },
    { id: 3, label: 'Company Info', path: '/company-information-setup', icon: 'Building2' },
    { id: 4, label: 'Branding', path: '/company-logo-and-branding', icon: 'Palette' },
    { id: 5, label: 'Job Posting', path: '/job-posting-creation', icon: 'FileText' },
    { id: 6, label: 'Requirements', path: '/job-requirements-details', icon: 'CheckSquare' }
  ];

  const handleStepClick = (step) => {
    if (step?.id < currentStep) {
      navigate(step?.path);
    }
  };

  const progressPercentage = ((currentStep - 1) / (steps?.length - 1)) * 100;

  return (
    <div className="bg-card border-b border-border">
      <div className="max-w-screen-xl mx-auto px-4 lg:px-6 py-6">
        <div className="hidden md:block">
          <div className="relative">
            <div className="absolute top-5 left-0 right-0 h-0.5 bg-muted">
              <div 
                className="h-full bg-primary transition-smooth"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>

            <div className="relative flex justify-between">
              {steps?.map((step) => {
                const isCompleted = step?.id < currentStep;
                const isCurrent = step?.id === currentStep;
                const isAccessible = step?.id <= currentStep;

                return (
                  <button
                    key={step?.id}
                    onClick={() => handleStepClick(step)}
                    disabled={!isAccessible}
                    className={`flex flex-col items-center gap-2 transition-smooth ${
                      isAccessible ? 'cursor-pointer' : 'cursor-not-allowed opacity-50'
                    }`}
                    aria-label={`Step ${step?.id}: ${step?.label}`}
                    aria-current={isCurrent ? 'step' : undefined}
                  >
                    <div
                      className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-smooth ${
                        isCompleted
                          ? 'bg-primary border-primary'
                          : isCurrent
                          ? 'bg-card border-primary' :'bg-card border-muted'
                      }`}
                    >
                      {isCompleted ? (
                        <Icon name="Check" size={20} color="var(--color-primary-foreground)" />
                      ) : (
                        <Icon
                          name={step?.icon}
                          size={20}
                          color={isCurrent ? 'var(--color-primary)' : 'var(--color-muted-foreground)'}
                        />
                      )}
                    </div>
                    <span
                      className={`text-xs text-caption ${
                        isCurrent ? 'text-foreground font-medium' : 'text-muted-foreground'
                      }`}
                    >
                      {step?.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="md:hidden">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-foreground">
              Step {currentStep} of {steps?.length}
            </span>
            <span className="text-xs text-muted-foreground text-caption">
              {Math.round(progressPercentage)}% Complete
            </span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-smooth"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <div className="mt-3">
            <div className="flex items-center gap-2">
              <Icon name={steps?.[currentStep - 1]?.icon} size={18} color="var(--color-primary)" />
              <span className="text-sm font-medium text-foreground">
                {steps?.[currentStep - 1]?.label}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingProgressBar;