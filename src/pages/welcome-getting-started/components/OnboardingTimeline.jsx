import React from 'react';
import Icon from '../../../components/AppIcon';

const OnboardingTimeline = () => {
  const steps = [
    {
      id: 1,
      icon: "Building2",
      title: "Company Information",
      description: "Tell us about your organization and what makes it unique",
      duration: "2 minutes",
      status: "upcoming"
    },
    {
      id: 2,
      icon: "Palette",
      title: "Branding & Logo",
      description: "Upload your company logo and customize your brand presence",
      duration: "1 minute",
      status: "upcoming"
    },
    {
      id: 3,
      icon: "FileText",
      title: "Create Job Posting",
      description: "Post your first job opening with detailed role information",
      duration: "3 minutes",
      status: "upcoming"
    },
    {
      id: 4,
      icon: "CheckSquare",
      title: "Job Requirements",
      description: "Define skills, experience, and qualifications needed",
      duration: "2 minutes",
      status: "upcoming"
    },
    {
      id: 5,
      icon: "Rocket",
      title: "Launch Dashboard",
      description: "Access your complete recruitment management platform",
      duration: "Ready to go",
      status: "upcoming"
    }
  ];

  return (
    <div className="bg-card rounded-lg md:rounded-xl lg:rounded-2xl border border-border p-4 md:p-6 lg:p-8 mb-6 md:mb-8 lg:mb-12">
      <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6 lg:mb-8">
        <Icon name="Map" size={20} color="var(--color-primary)" className="md:w-6 md:h-6" />
        <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-foreground">Your Setup Journey</h2>
      </div>
      <div className="space-y-4 md:space-y-6 lg:space-y-8">
        {steps?.map((step, index) => (
          <div key={step?.id} className="relative">
            {index < steps?.length - 1 && (
              <div className="absolute left-5 md:left-6 lg:left-7 top-12 md:top-14 lg:top-16 bottom-0 w-0.5 bg-border -mb-4 md:-mb-6 lg:-mb-8" />
            )}
            
            <div className="flex gap-3 md:gap-4 lg:gap-6">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 bg-primary/10 rounded-full border-2 border-primary/20">
                  <Icon name={step?.icon} size={20} color="var(--color-primary)" className="md:w-6 md:h-6" />
                </div>
              </div>
              
              <div className="flex-1 pt-1 md:pt-2">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-4 mb-1 md:mb-2">
                  <h3 className="text-base md:text-lg lg:text-xl font-medium text-foreground">
                    {step?.title}
                  </h3>
                  <span className="text-xs md:text-sm text-caption text-muted-foreground whitespace-nowrap">
                    {step?.duration}
                  </span>
                </div>
                <p className="text-xs md:text-sm lg:text-base text-muted-foreground">
                  {step?.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 md:mt-8 lg:mt-10 pt-6 md:pt-8 border-t border-border">
        <div className="flex items-center justify-between text-xs md:text-sm text-caption">
          <span className="text-muted-foreground">Total estimated time</span>
          <span className="font-medium text-foreground">8-10 minutes</span>
        </div>
      </div>
    </div>
  );
};

export default OnboardingTimeline;