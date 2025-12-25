import React, { useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const VerificationSuccessModal = ({ isOpen, onContinue }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
      <div className="w-full max-w-md bg-card rounded-lg shadow-warm-xl border border-border p-6 md:p-8 animate-in fade-in zoom-in duration-300">
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full bg-success/10 mb-4 md:mb-6">
            <Icon name="CheckCircle2" size={40} color="var(--color-success)" />
          </div>
          
          <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-foreground mb-3">
            Email Verified Successfully!
          </h2>
          
          <p className="text-sm md:text-base text-muted-foreground text-caption mb-6 md:mb-8">
            Your email has been verified. You can now access all features of RecruitFlow and start building your recruitment pipeline.
          </p>

          <div className="w-full space-y-3">
            <Button
              variant="default"
              size="lg"
              onClick={onContinue}
              iconName="ArrowRight"
              iconPosition="right"
              fullWidth
            >
              Continue to Getting Started
            </Button>
            
            <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground text-caption">
              <Icon name="Clock" size={14} />
              <span>Redirecting automatically in 3 seconds...</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerificationSuccessModal;