import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const CompanyDescription = ({ value, onChange, error }) => {
  const [charCount, setCharCount] = useState(0);
  const minChars = 100;
  const maxChars = 1000;

  useEffect(() => {
    setCharCount(value?.length);
  }, [value]);

  const handleChange = (e) => {
    const newValue = e?.target?.value;
    if (newValue?.length <= maxChars) {
      onChange(newValue);
    }
  };

  const getCharCountColor = () => {
    if (charCount < minChars) return 'text-muted-foreground';
    if (charCount >= maxChars) return 'text-error';
    return 'text-success';
  };

  const isValid = charCount >= minChars && charCount <= maxChars;

  return (
    <div className="space-y-2">
      <label className="block text-sm md:text-base font-medium text-foreground">
        Company Description
        <span className="text-error ml-1">*</span>
      </label>
      <p className="text-xs md:text-sm text-muted-foreground text-caption">
        Provide a brief overview of your company, its mission, and what makes it unique
      </p>
      
      <div className="relative">
        <textarea
          value={value}
          onChange={handleChange}
          rows={6}
          className={`w-full px-3 md:px-4 py-2 md:py-3 text-sm md:text-base text-foreground bg-background border rounded-md transition-smooth resize-none focus:outline-none focus:ring-2 focus:ring-ring ${
            error ? 'border-error' : 'border-input'
          }`}
          placeholder="Tell us about your company, its culture, values, and what makes it a great place to work..."
        />
        
        <div className="absolute bottom-2 right-2 flex items-center gap-2 bg-background/80 backdrop-blur-sm px-2 py-1 rounded">
          {isValid && (
            <Icon name="Check" size={14} color="var(--color-success)" />
          )}
          <span className={`text-xs text-caption ${getCharCountColor()}`}>
            {charCount}/{maxChars}
          </span>
        </div>
      </div>

      {charCount < minChars && (
        <p className="text-xs md:text-sm text-muted-foreground text-caption flex items-center gap-1">
          <Icon name="Info" size={14} />
          <span>Minimum {minChars} characters required ({minChars - charCount} more needed)</span>
        </p>
      )}

      {error && (
        <p className="text-xs md:text-sm text-error text-caption flex items-center gap-1">
          <Icon name="AlertCircle" size={14} />
          <span>{error}</span>
        </p>
      )}
    </div>
  );
};

export default CompanyDescription;