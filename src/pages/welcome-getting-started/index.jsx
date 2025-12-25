import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import OnboardingHeader from '../../components/ui/OnboardingHeader';
import OnboardingProgressBar from '../../components/ui/OnboardingProgressBar';
import StepNavigationControls from '../../components/ui/StepNavigationControls';
import WelcomeHero from './components/WelcomeHero';
import OnboardingTimeline from './components/OnboardingTimeline';
import PlatformBenefits from './components/PlatformBenefits';
import TrustSignals from './components/TrustSignals';
import QuickStartActions from './components/QuickStartActions';

const WelcomeGettingStarted = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Welcome to RecruitFlow - Getting Started</title>
        <meta name="description" content="Welcome to RecruitFlow. Complete your setup in under 10 minutes and start hiring smarter with AI-powered recruitment tools." />
      </Helmet>

      <div className="min-h-screen bg-background">
        <OnboardingHeader currentStep={2} totalSteps={6} />
        
        <div className="pt-20 md:pt-24">
          <OnboardingProgressBar currentStep={2} />
          
          <main className="max-w-screen-xl mx-auto px-4 lg:px-6 py-8 md:py-12 lg:py-16 pb-32">
            <WelcomeHero />
            <OnboardingTimeline />
            <PlatformBenefits />
            <TrustSignals />
            <QuickStartActions />
          </main>

          <StepNavigationControls
            currentStep={2}
            canProceed={true}
            showSkip={true}
            onNext={() => {}}
            onPrevious={() => {}}
            nextLabel="Continue"
            previousLabel="Back"
            onSkip={() => {}}
          />
        </div>
      </div>
    </>
  );
};

export default WelcomeGettingStarted;