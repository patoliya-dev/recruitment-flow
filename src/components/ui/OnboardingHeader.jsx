import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

const OnboardingHeader = ({ currentStep = 1, totalSteps = 6 }) => {
  const navigate = useNavigate();

  const handleHelpClick = () => {
    console.log('Help clicked');
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-card shadow-warm-md z-100">
      <div className="max-w-screen-xl mx-auto px-4 lg:px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-md transition-smooth">
              <Icon name="Briefcase" size={24} color="var(--color-primary)" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-foreground font-heading">RecruitFlow</h1>
              <p className="text-xs text-muted-foreground text-caption">Setup Your Account</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={handleHelpClick}
              className="flex items-center gap-2 px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-smooth rounded-md hover:bg-muted"
              aria-label="Get help"
            >
              <Icon name="HelpCircle" size={18} />
              <span className="hidden sm:inline">Help</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default OnboardingHeader;