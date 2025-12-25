import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import OnboardingHeader from '../../components/ui/OnboardingHeader';
import VerificationCodeInput from './components/VerificationCodeInput';
import SecurityBadges from './components/SecurityBadges';
import ResendCodeSection from './components/ResendCodeSection';
import VerificationSuccessModal from './components/VerificationSuccessModal';

const EmailVerification = () => {
  const navigate = useNavigate();
  const [verificationCode, setVerificationCode] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [userEmail] = useState('recruiter@company.com');

  const MOCK_VALID_CODE = '123456';

  useEffect(() => {
    const code = verificationCode?.join('');
    if (code?.length === 6 && error) {
      setError('');
    }
  }, [verificationCode, error]);

  useEffect(() => {
    if (showSuccessModal) {
      const timer = setTimeout(() => {
        navigate('/welcome-getting-started');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showSuccessModal, navigate]);

  const handleVerificationCodeChange = (newCode) => {
    setVerificationCode(newCode);
    setError('');
  };

  const handleVerify = () => {
    const code = verificationCode?.join('');

    if (code?.length !== 6) {
      setError('Please enter the complete 6-digit verification code');
      return;
    }

    if (code !== MOCK_VALID_CODE) {
      setError('Invalid verification code. Please check your email and try again.');
      return;
    }

    setIsVerifying(true);
    setError('');

    setTimeout(() => {
      setIsVerifying(false);
      setShowSuccessModal(true);
    }, 1500);
  };

  const handleResendCode = () => {
    setVerificationCode(['', '', '', '', '', '']);
    setError('');
    console.log('Verification code resent to:', userEmail);
  };

  const handleContinue = () => {
    navigate('/welcome-getting-started');
  };

  const isCodeComplete = verificationCode?.every(digit => digit !== '');

  return (
    <div className="min-h-screen bg-background">
      <OnboardingHeader currentStep={1} totalSteps={6} />

      <main className="pt-20 pb-8 px-4 md:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-card rounded-lg shadow-warm-lg border border-border p-6 md:p-8 lg:p-10">
            <div className="flex flex-col items-center text-center mb-8 md:mb-10">
              <div className="flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-primary/10 rounded-full mb-4 md:mb-6">
                <Icon name="Mail" size={32} color="var(--color-primary)" />
              </div>

              <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-foreground mb-3 md:mb-4">
                Verify Your Email
              </h1>

              <p className="text-sm md:text-base text-muted-foreground text-caption max-w-md">
                We've sent a 6-digit verification code to{' '}
                <span className="font-semibold text-foreground">{userEmail}</span>
              </p>
            </div>

            <div className="space-y-6 md:space-y-8">
              <div>
                <label className="block text-sm font-medium text-foreground mb-4 text-center">
                  Enter Verification Code
                </label>
                <VerificationCodeInput
                  value={verificationCode}
                  onChange={handleVerificationCodeChange}
                  error={error}
                  disabled={isVerifying}
                />
              </div>

              <div className="flex flex-col gap-3">
                <Button
                  variant="default"
                  size="lg"
                  onClick={handleVerify}
                  disabled={!isCodeComplete || isVerifying}
                  loading={isVerifying}
                  iconName="CheckCircle2"
                  iconPosition="right"
                  fullWidth
                >
                  {isVerifying ? 'Verifying...' : 'Verify Email'}
                </Button>

                <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground text-caption">
                  <Icon name="Clock" size={14} />
                  <span>Code expires in 10 minutes</span>
                </div>
              </div>

              <ResendCodeSection
                onResend={handleResendCode}
                disabled={isVerifying}
              />

              <div className="pt-6 md:pt-8 border-t border-border">
                <SecurityBadges />
              </div>

              <div className="flex items-start gap-3 p-4 rounded-md bg-primary/5 border border-primary/20">
                <Icon name="Info" size={20} color="var(--color-primary)" className="flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-xs md:text-sm text-foreground text-caption">
                    <span className="font-semibold">Mock Credentials:</span> Use verification code{' '}
                    <span className="font-mono font-semibold text-primary">123456</span> to proceed with the onboarding process.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-xs md:text-sm text-muted-foreground text-caption">
              Need help?{' '}
              <button className="text-primary hover:underline font-medium transition-smooth">
                Contact Support
              </button>
            </p>
          </div>
        </div>
      </main>

      <VerificationSuccessModal
        isOpen={showSuccessModal}
        onContinue={handleContinue}
      />
    </div>
  );
};

export default EmailVerification;