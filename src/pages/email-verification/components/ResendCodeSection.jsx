import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ResendCodeSection = ({ onResend, disabled = false }) => {
  const [countdown, setCountdown] = useState(0);
  const [canResend, setCanResend] = useState(true);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [countdown]);

  const handleResend = () => {
    if (!canResend || disabled) return;
    
    setCanResend(false);
    setCountdown(60);
    onResend();
  };

  return (
    <div className="w-full">
      <div className="flex flex-col items-center gap-4 p-4 md:p-6 rounded-md bg-muted/30 border border-border">
        <div className="flex items-start gap-3 text-left w-full">
          <div className="flex-shrink-0 mt-1">
            <Icon name="Mail" size={20} color="var(--color-primary)" />
          </div>
          <div className="flex-1">
            <h3 className="text-sm md:text-base font-semibold text-foreground mb-2">
              Didn't receive the code?
            </h3>
            <p className="text-xs md:text-sm text-muted-foreground text-caption mb-3">
              Check your spam folder or request a new verification code. Codes are typically delivered within 1-2 minutes.
            </p>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={handleResend}
                disabled={!canResend || disabled}
                iconName="RefreshCw"
                iconPosition="left"
                className="flex-1 sm:flex-none"
              >
                {countdown > 0 ? `Resend in ${countdown}s` : 'Resend Code'}
              </Button>
              {countdown > 0 && (
                <span className="text-xs text-muted-foreground text-caption text-center sm:text-left">
                  You can request a new code in {countdown} seconds
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResendCodeSection;