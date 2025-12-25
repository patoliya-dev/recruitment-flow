import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';

const TaglineInput = ({ value, onChange }) => {
  const maxLength = 80;
  const [charCount, setCharCount] = useState(value?.length || 0);

  const handleChange = (e) => {
    const newValue = e?.target?.value;
    setCharCount(newValue?.length);
    onChange(newValue);
  };

  const exampleTaglines = [
    "Building tomorrow\'s workforce today",
    "Where talent meets opportunity",
    "Connecting great people with great companies",
    "Your partner in talent acquisition"
  ];

  return (
    <div className="space-y-4">
      <div className="relative">
        <Input
          label="Company Tagline"
          type="text"
          placeholder="Enter a memorable tagline for your company"
          value={value}
          onChange={handleChange}
          maxLength={maxLength}
          description={`${charCount}/${maxLength} characters`}
        />
      </div>
      <div className="p-4 bg-muted rounded-lg">
        <div className="flex items-start gap-3 mb-3">
          <Icon name="Sparkles" size={18} color="var(--color-primary)" className="flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-foreground mb-1">
              Tagline Examples
            </p>
            <p className="text-xs text-caption text-muted-foreground">
              Get inspired by these effective taglines
            </p>
          </div>
        </div>
        <div className="space-y-2">
          {exampleTaglines?.map((tagline, index) => (
            <button
              key={index}
              onClick={() => {
                onChange(tagline);
                setCharCount(tagline?.length);
              }}
              className="w-full text-left p-3 bg-card border border-border rounded-md hover:border-primary hover:bg-primary/5 transition-smooth group"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm text-foreground">{tagline}</span>
                <Icon
                  name="ArrowRight"
                  size={16}
                  color="var(--color-muted-foreground)"
                  className="opacity-0 group-hover:opacity-100 transition-smooth"
                />
              </div>
            </button>
          ))}
        </div>
      </div>
      <div className="flex items-start gap-2 p-3 bg-primary/5 border border-primary/20 rounded-md">
        <Icon name="Info" size={16} color="var(--color-primary)" className="flex-shrink-0 mt-0.5" />
        <p className="text-xs text-caption text-muted-foreground">
          A great tagline is concise, memorable, and reflects your company's mission or values
        </p>
      </div>
    </div>
  );
};

export default TaglineInput;