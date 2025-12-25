import React from 'react';

const FormSection = ({ title, description, children, className = '' }) => {
  return (
    <div className={`space-y-4 ${className}`}>
      <div className="space-y-1">
        <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-foreground font-heading">
          {title}
        </h2>
        {description && (
          <p className="text-sm md:text-base text-muted-foreground text-caption">
            {description}
          </p>
        )}
      </div>
      <div className="space-y-4 md:space-y-5 lg:space-y-6">
        {children}
      </div>
    </div>
  );
};

export default FormSection;