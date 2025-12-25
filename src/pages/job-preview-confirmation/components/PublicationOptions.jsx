import React from 'react';
import Icon from '../../../components/AppIcon';

const PublicationOptions = ({ publicationOption, setPublicationOption, scheduledDate, setScheduledDate }) => {
  return (
    <div className="bg-card rounded-lg border border-border p-6 md:p-8">
      <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
        <Icon name="Calendar" size={20} />
        Publication Options
      </h3>
      <div className="space-y-3">
        <label className="flex items-start gap-3 p-4 border border-border rounded-lg cursor-pointer hover:bg-muted/50 transition-smooth">
          <input
            type="radio"
            name="publicationOption"
            value="immediate"
            checked={publicationOption === 'immediate'}
            onChange={(e) => setPublicationOption(e?.target?.value)}
            className="mt-1 w-4 h-4 text-primary focus:ring-primary"
          />
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <Icon name="Zap" size={16} className="text-primary" />
              <span className="font-medium text-foreground">Publish Immediately</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Your job posting will go live as soon as you click publish
            </p>
          </div>
        </label>

        <label className="flex items-start gap-3 p-4 border border-border rounded-lg cursor-pointer hover:bg-muted/50 transition-smooth">
          <input
            type="radio"
            name="publicationOption"
            value="scheduled"
            checked={publicationOption === 'scheduled'}
            onChange={(e) => setPublicationOption(e?.target?.value)}
            className="mt-1 w-4 h-4 text-primary focus:ring-primary"
          />
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <Icon name="Clock" size={16} className="text-primary" />
              <span className="font-medium text-foreground">Schedule for Later</span>
            </div>
            <p className="text-sm text-muted-foreground mb-3">
              Choose a specific date and time to publish your job posting
            </p>
            {publicationOption === 'scheduled' && (
              <input
                type="datetime-local"
                value={scheduledDate}
                onChange={(e) => setScheduledDate(e?.target?.value)}
                className="w-full px-3 py-2 border border-border rounded-md text-sm focus:ring-2 focus:ring-primary focus:border-primary"
                min={new Date()?.toISOString()?.slice(0, 16)}
              />
            )}
          </div>
        </label>

        <label className="flex items-start gap-3 p-4 border border-border rounded-lg cursor-pointer hover:bg-muted/50 transition-smooth">
          <input
            type="radio"
            name="publicationOption"
            value="draft"
            checked={publicationOption === 'draft'}
            onChange={(e) => setPublicationOption(e?.target?.value)}
            className="mt-1 w-4 h-4 text-primary focus:ring-primary"
          />
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <Icon name="Save" size={16} className="text-primary" />
              <span className="font-medium text-foreground">Save as Draft</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Keep this job posting private and publish it later
            </p>
          </div>
        </label>
      </div>
    </div>
  );
};

export default PublicationOptions;