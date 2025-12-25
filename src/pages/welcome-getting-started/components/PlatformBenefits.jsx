import React from 'react';
import Icon from '../../../components/AppIcon';

const PlatformBenefits = () => {
  const benefits = [
    {
      icon: "Brain",
      title: "AI-Powered Matching",
      description: "Our intelligent algorithms automatically match candidates to your job requirements, saving hours of manual screening time"
    },
    {
      icon: "Zap",
      title: "Instant Job Distribution",
      description: "Post once and reach candidates across multiple job boards and social platforms simultaneously"
    },
    {
      icon: "Users",
      title: "Collaborative Hiring",
      description: "Invite team members, share feedback, and make hiring decisions together in real-time"
    },
    {
      icon: "BarChart3",
      title: "Analytics Dashboard",
      description: "Track application metrics, candidate pipeline, and hiring performance with detailed insights"
    },
    {
      icon: "MessageSquare",
      title: "Automated Communication",
      description: "Send personalized emails and updates to candidates automatically at every stage"
    },
    {
      icon: "Shield",
      title: "Secure & Compliant",
      description: "Enterprise-grade security with GDPR compliance and data protection built-in"
    }
  ];

  return (
    <div className="mb-8 md:mb-12 lg:mb-16">
      <div className="text-center mb-6 md:mb-8 lg:mb-10">
        <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-foreground mb-2 md:mb-3 lg:mb-4">
          Everything You Need to Hire Smarter
        </h2>
        <p className="text-sm md:text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
          Powerful features designed to streamline your recruitment process from start to finish
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
        {benefits?.map((benefit, index) => (
          <div 
            key={index}
            className="bg-card rounded-lg md:rounded-xl border border-border p-4 md:p-6 lg:p-8 hover:border-primary/30 hover:shadow-warm-md transition-smooth"
          >
            <div className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 bg-primary/10 rounded-lg md:rounded-xl mb-3 md:mb-4 lg:mb-6">
              <Icon name={benefit?.icon} size={20} color="var(--color-primary)" className="md:w-6 md:h-6" />
            </div>
            <h3 className="text-base md:text-lg lg:text-xl font-medium text-foreground mb-2 md:mb-3">
              {benefit?.title}
            </h3>
            <p className="text-xs md:text-sm lg:text-base text-muted-foreground leading-relaxed">
              {benefit?.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlatformBenefits;