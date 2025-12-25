import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const BrandPreview = ({ logo, brandColor, tagline, companyName }) => {
  const previewContexts = [
    {
      id: 'job-card',
      title: 'Job Posting Card',
      description: 'How your brand appears in job listings'
    },
    {
      id: 'company-profile',
      title: 'Company Profile Header',
      description: 'Your brand on the company page'
    }
  ];

  const [activeContext, setActiveContext] = React.useState('job-card');

  return (
    <div className="space-y-6">
      <div>
        <h4 className="text-sm md:text-base font-medium text-foreground mb-3">
          Preview your branding
        </h4>
        <div className="flex flex-wrap gap-2 mb-4">
          {previewContexts?.map((context) => (
            <button
              key={context?.id}
              onClick={() => setActiveContext(context?.id)}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-smooth ${
                activeContext === context?.id
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              {context?.title}
            </button>
          ))}
        </div>
      </div>
      <div className="border-2 border-border rounded-lg p-6 md:p-8 bg-muted/30">
        {activeContext === 'job-card' && (
          <div className="max-w-md mx-auto bg-card rounded-lg shadow-warm-lg overflow-hidden">
            <div className="p-6">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0">
                  {logo ? (
                    <Image
                      src={logo}
                      alt="Company logo preview in job posting card context"
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <Icon name="Building2" size={32} color="var(--color-muted-foreground)" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h5 className="text-lg font-semibold text-foreground mb-1">
                    {companyName || 'Your Company Name'}
                  </h5>
                  {tagline && (
                    <p className="text-sm text-muted-foreground text-caption line-clamp-2">
                      {tagline}
                    </p>
                  )}
                </div>
              </div>
              <h6 className="text-base font-semibold text-foreground mb-2">
                Senior Software Engineer
              </h6>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-3 py-1 text-xs text-caption bg-muted rounded-full">
                  Full-time
                </span>
                <span className="px-3 py-1 text-xs text-caption bg-muted rounded-full">
                  Remote
                </span>
                <span className="px-3 py-1 text-xs text-caption bg-muted rounded-full">
                  $120k - $180k
                </span>
              </div>
              <button
                className="w-full py-2.5 text-sm font-medium rounded-md transition-smooth"
                style={{
                  backgroundColor: brandColor || 'var(--color-primary)',
                  color: 'white'
                }}
              >
                Apply Now
              </button>
            </div>
          </div>
        )}

        {activeContext === 'company-profile' && (
          <div className="max-w-2xl mx-auto bg-card rounded-lg shadow-warm-lg overflow-hidden">
            <div
              className="h-32 md:h-40"
              style={{
                background: `linear-gradient(135deg, ${brandColor || 'var(--color-primary)'} 0%, ${brandColor || 'var(--color-primary)'}dd 100%)`
              }}
            />
            <div className="px-6 pb-6">
              <div className="flex flex-col sm:flex-row items-center sm:items-end gap-4 -mt-12 sm:-mt-16 mb-6">
                <div className="w-24 h-24 sm:w-32 sm:h-32 bg-card rounded-lg border-4 border-card shadow-warm-lg flex items-center justify-center overflow-hidden flex-shrink-0">
                  {logo ? (
                    <Image
                      src={logo}
                      alt="Company logo preview in company profile header context"
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <Icon name="Building2" size={48} color="var(--color-muted-foreground)" />
                  )}
                </div>
                <div className="flex-1 text-center sm:text-left">
                  <h5 className="text-xl md:text-2xl font-semibold text-foreground mb-1">
                    {companyName || 'Your Company Name'}
                  </h5>
                  {tagline && (
                    <p className="text-sm md:text-base text-muted-foreground text-caption">
                      {tagline}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Icon name="MapPin" size={16} />
                  <span>San Francisco, CA</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="Users" size={16} />
                  <span>50-200 employees</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="Briefcase" size={16} />
                  <span>12 open positions</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="flex items-start gap-2 p-4 bg-primary/5 border border-primary/20 rounded-lg">
        <Icon name="Eye" size={18} color="var(--color-primary)" className="flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-medium text-foreground mb-1">
            Live Preview
          </p>
          <p className="text-xs text-caption text-muted-foreground">
            This is how candidates will see your brand across the platform
          </p>
        </div>
      </div>
    </div>
  );
};

export default BrandPreview;