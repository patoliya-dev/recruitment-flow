import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import OnboardingHeader from '../../components/ui/OnboardingHeader';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import CelebrationHeader from './components/CelebrationHeader';
import SetupSummary from './components/SetupSummary';
import PlatformFeatures from './components/PlatformFeatures';
import QuickActions from './components/QuickActions';
import ResourceLinks from './components/ResourceLinks';

const OnboardingSuccess = () => {
  const navigate = useNavigate();
  const [showConfetti, setShowConfetti] = useState(true);
  const [autoRedirectCountdown, setAutoRedirectCountdown] = useState(10);

  useEffect(() => {
    const confettiTimer = setTimeout(() => {
      setShowConfetti(false);
    }, 5000);

    return () => clearTimeout(confettiTimer);
  }, []);

  useEffect(() => {
    const countdownInterval = setInterval(() => {
      setAutoRedirectCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(countdownInterval);
          navigate('/dashboard');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(countdownInterval);
  }, [navigate]);

  const handleGoToDashboard = () => {
    navigate('/dashboard');
  };

  const handlePostAnotherJob = () => {
    localStorage.removeItem('jobPostingDraft');
    localStorage.removeItem('jobRequirementsData');
    navigate('/job-posting-creation');
  };

  const handleInviteTeam = () => {
    console.log('Invite team members');
  };

  return (
    <>
      <Helmet>
        <title>Welcome to RecruitFlow - Setup Complete!</title>
        <meta name="description" content="Congratulations! Your RecruitFlow account is ready. Start hiring smarter today." />
      </Helmet>

      <div className="min-h-screen bg-background relative overflow-hidden">
        {showConfetti && (
          <div className="fixed inset-0 pointer-events-none z-50">
            <div className="absolute top-0 left-1/4 animate-bounce" style={{ animationDelay: '0s', animationDuration: '3s' }}>
              <Icon name="Sparkles" size={24} className="text-accent" />
            </div>
            <div className="absolute top-10 right-1/4 animate-bounce" style={{ animationDelay: '0.5s', animationDuration: '2.5s' }}>
              <Icon name="Star" size={20} className="text-primary" />
            </div>
            <div className="absolute top-20 left-1/3 animate-bounce" style={{ animationDelay: '1s', animationDuration: '3.5s' }}>
              <Icon name="Zap" size={18} className="text-warning" />
            </div>
            <div className="absolute top-5 right-1/3 animate-bounce" style={{ animationDelay: '1.5s', animationDuration: '2s' }}>
              <Icon name="Heart" size={22} className="text-error" />
            </div>
          </div>
        )}

        <OnboardingHeader currentStep={6} totalSteps={6} />
        
        <main className="max-w-screen-lg mx-auto px-4 lg:px-6 py-6 md:py-8 lg:py-12 pt-24 md:pt-28">
          <CelebrationHeader />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <SetupSummary />
            <PlatformFeatures />
          </div>

          <QuickActions
            onGoToDashboard={handleGoToDashboard}
            onPostAnotherJob={handlePostAnotherJob}
            onInviteTeam={handleInviteTeam}
          />

          <ResourceLinks />

          <div className="mt-8 bg-card rounded-lg border border-border p-6 text-center">
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-4">
              <Icon name="Clock" size={16} />
              <span>Redirecting to dashboard in {autoRedirectCountdown} seconds...</span>
            </div>
            <Button
              variant="default"
              size="lg"
              onClick={handleGoToDashboard}
              iconName="ArrowRight"
              iconPosition="right"
              className="mx-auto"
            >
              Go to Dashboard Now
            </Button>
          </div>
        </main>
      </div>
    </>
  );
};

export default OnboardingSuccess;