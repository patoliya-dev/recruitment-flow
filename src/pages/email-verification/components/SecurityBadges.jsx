import React from 'react';
import Icon from '../../../components/AppIcon';

const SecurityBadges = () => {
  const badges = [
    {
      id: 1,
      icon: 'Shield',
      label: 'SSL Encrypted',
      description: 'Your data is protected with 256-bit encryption'
    },
    {
      id: 2,
      icon: 'Lock',
      label: 'Secure Verification',
      description: 'Industry-standard authentication protocols'
    },
    {
      id: 3,
      icon: 'CheckCircle2',
      label: 'GDPR Compliant',
      description: 'Full compliance with data protection regulations'
    }
  ];

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        {badges?.map((badge) => (
          <div
            key={badge?.id}
            className="flex flex-col items-center text-center p-4 rounded-md bg-muted/50 transition-smooth hover:bg-muted"
          >
            <div className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary/10 mb-3">
              <Icon name={badge?.icon} size={20} color="var(--color-primary)" />
            </div>
            <h3 className="text-sm md:text-base font-semibold text-foreground mb-1">
              {badge?.label}
            </h3>
            <p className="text-xs md:text-sm text-muted-foreground text-caption">
              {badge?.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SecurityBadges;