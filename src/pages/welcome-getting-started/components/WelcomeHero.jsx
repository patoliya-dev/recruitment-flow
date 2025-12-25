import React from 'react';
import Icon from '../../../components/AppIcon';

const WelcomeHero = () => {
  return (
    <div className="text-center mb-8 md:mb-12 lg:mb-16">
      <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 bg-primary/10 rounded-full mb-4 md:mb-6 lg:mb-8">
        <Icon name="Sparkles" size={32} color="var(--color-primary)" className="md:w-10 md:h-10 lg:w-12 lg:h-12" />
      </div>
      
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-3 md:mb-4 lg:mb-6">
        Welcome to RecruitFlow
      </h1>
      
      <p className="text-sm md:text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
        Let's get your recruitment platform set up in just a few minutes. We'll guide you through creating your company profile and posting your first job opening.
      </p>
    </div>
  );
};

export default WelcomeHero;