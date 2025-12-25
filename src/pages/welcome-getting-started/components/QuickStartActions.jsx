import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const QuickStartActions = () => {
  const navigate = useNavigate();

  const handleStartSetup = () => {
    navigate('/company-information-setup');
  };

  const handleSkipTour = () => {
    navigate('/company-information-setup');
  };

  const handleWatchDemo = () => {
    console.log('Watch demo video');
  };

  return (
    <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg md:rounded-xl lg:rounded-2xl p-6 md:p-8 lg:p-12 mb-8 md:mb-12 lg:mb-16">
      <div className="text-center mb-6 md:mb-8 lg:mb-10">
        <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-foreground mb-2 md:mb-3 lg:mb-4">
          Ready to Get Started?
        </h2>
        <p className="text-sm md:text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto">
          Complete your setup in under 10 minutes and start receiving qualified candidates today
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 md:gap-4 lg:gap-6 mb-6 md:mb-8">
        <Button
          variant="default"
          size="lg"
          onClick={handleStartSetup}
          iconName="ArrowRight"
          iconPosition="right"
          className="w-full sm:w-auto"
        >
          Start Setup Now
        </Button>
        
        <Button
          variant="outline"
          size="lg"
          onClick={handleWatchDemo}
          iconName="Play"
          iconPosition="left"
          className="w-full sm:w-auto"
        >
          Watch Demo
        </Button>
      </div>

      <div className="text-center">
        <button
          onClick={handleSkipTour}
          className="text-sm md:text-base text-muted-foreground hover:text-foreground transition-smooth inline-flex items-center gap-2"
        >
          Skip tour and explore on my own
          <Icon name="ChevronRight" size={16} />
        </button>
      </div>

      <div className="mt-8 md:mt-10 lg:mt-12 pt-6 md:pt-8 border-t border-border">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 text-center">
          <div className="flex flex-col items-center gap-2">
            <Icon name="Clock" size={20} color="var(--color-primary)" className="md:w-6 md:h-6" />
            <span className="text-xs md:text-sm text-caption text-muted-foreground">
              8-10 minutes setup
            </span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Icon name="CreditCard" size={20} color="var(--color-primary)" className="md:w-6 md:h-6" />
            <span className="text-xs md:text-sm text-caption text-muted-foreground">
              No credit card required
            </span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Icon name="Headphones" size={20} color="var(--color-primary)" className="md:w-6 md:h-6" />
            <span className="text-xs md:text-sm text-caption text-muted-foreground">
              24/7 support available
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickStartActions;