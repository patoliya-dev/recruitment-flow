import React from 'react';
import Icon from '../../../components/AppIcon';

const BrandingGuidelines = () => {
  const guidelines = [
    {
      icon: 'Image',
      title: 'Logo Requirements',
      items: [
        'Use PNG, JPG, or SVG format',
        'Recommended size: 512x512 pixels',
        'Maximum file size: 5MB',
        'Square or circular logos work best'
      ]
    },
    {
      icon: 'Palette',
      title: 'Color Selection',
      items: [
        'Choose colors that represent your brand',
        'Ensure good contrast for accessibility',
        'Consider how colors appear on light/dark backgrounds',
        'Test colors across different devices'
      ]
    },
    {
      icon: 'Type',
      title: 'Tagline Tips',
      items: [
        'Keep it under 80 characters',
        'Make it memorable and unique',
        'Reflect your company values',
        'Avoid jargon and buzzwords'
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
          <Icon name="BookOpen" size={20} color="var(--color-primary)" />
        </div>
        <div>
          <h4 className="text-base md:text-lg font-semibold text-foreground">
            Branding Guidelines
          </h4>
          <p className="text-sm text-caption text-muted-foreground">
            Best practices for creating a strong brand presence
          </p>
        </div>
      </div>
      <div className="space-y-4">
        {guidelines?.map((guideline, index) => (
          <div
            key={index}
            className="p-4 md:p-6 bg-card border border-border rounded-lg hover:border-primary/50 transition-smooth"
          >
            <div className="flex items-start gap-3 mb-3">
              <div className="w-8 h-8 bg-primary/10 rounded-md flex items-center justify-center flex-shrink-0">
                <Icon name={guideline?.icon} size={18} color="var(--color-primary)" />
              </div>
              <h5 className="text-sm md:text-base font-semibold text-foreground">
                {guideline?.title}
              </h5>
            </div>
            <ul className="space-y-2 ml-11">
              {guideline?.items?.map((item, itemIndex) => (
                <li key={itemIndex} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <Icon
                    name="Check"
                    size={16}
                    color="var(--color-success)"
                    className="flex-shrink-0 mt-0.5"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="p-4 md:p-6 bg-gradient-to-br from-primary/5 to-secondary/5 border border-primary/20 rounded-lg">
        <div className="flex items-start gap-3">
          <Icon name="Lightbulb" size={20} color="var(--color-primary)" className="flex-shrink-0 mt-0.5" />
          <div>
            <h5 className="text-sm md:text-base font-semibold text-foreground mb-2">
              Pro Tip
            </h5>
            <p className="text-sm text-muted-foreground mb-3">
              A strong brand identity increases candidate trust by 67% and improves application rates by 45%. Take time to create a professional, consistent brand presence.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 text-xs text-caption bg-card rounded-full border border-border">
                Professional
              </span>
              <span className="px-3 py-1 text-xs text-caption bg-card rounded-full border border-border">
                Consistent
              </span>
              <span className="px-3 py-1 text-xs text-caption bg-card rounded-full border border-border">
                Memorable
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandingGuidelines;