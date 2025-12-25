import React from 'react';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const LocationSection = ({ formData, errors, onChange }) => {
  const workLocationOptions = [
    { value: 'remote', label: 'Fully Remote' },
    { value: 'onsite', label: 'On-site' },
    { value: 'hybrid', label: 'Hybrid' }
  ];

  const countryOptions = [
    { value: 'us', label: 'United States' },
    { value: 'uk', label: 'United Kingdom' },
    { value: 'ca', label: 'Canada' },
    { value: 'au', label: 'Australia' },
    { value: 'de', label: 'Germany' },
    { value: 'fr', label: 'France' },
    { value: 'in', label: 'India' },
    { value: 'sg', label: 'Singapore' },
    { value: 'ae', label: 'United Arab Emirates' },
    { value: 'other', label: 'Other' }
  ];

  const timezoneOptions = [
    { value: 'pst', label: 'Pacific Time (PST/PDT)' },
    { value: 'mst', label: 'Mountain Time (MST/MDT)' },
    { value: 'cst', label: 'Central Time (CST/CDT)' },
    { value: 'est', label: 'Eastern Time (EST/EDT)' },
    { value: 'gmt', label: 'Greenwich Mean Time (GMT)' },
    { value: 'cet', label: 'Central European Time (CET)' },
    { value: 'ist', label: 'India Standard Time (IST)' },
    { value: 'aest', label: 'Australian Eastern Time (AEST)' }
  ];

  return (
    <div className="bg-card rounded-lg border border-border p-4 md:p-6 lg:p-8">
      <div className="flex items-start gap-3 mb-4 md:mb-6">
        <div className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 bg-primary/10 rounded-lg flex-shrink-0">
          <span className="text-lg md:text-xl font-semibold text-primary">3</span>
        </div>
        <div>
          <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-foreground font-heading">
            Work Location
          </h2>
          <p className="text-sm md:text-base text-muted-foreground mt-1 text-caption">
            Specify where the work will be performed
          </p>
        </div>
      </div>
      <div className="space-y-4 md:space-y-5">
        <Select
          label="Work Location Type"
          placeholder="Select work location"
          required
          options={workLocationOptions}
          value={formData?.workLocationType}
          onChange={(value) => onChange('workLocationType', value)}
          error={errors?.workLocationType}
        />

        {formData?.workLocationType === 'remote' && (
          <div className="bg-muted/50 rounded-lg p-4 space-y-4">
            <div className="flex items-start gap-2">
              <Icon name="Globe" size={20} className="text-primary flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-foreground mb-2">Remote Work Options</p>
                <div className="space-y-3">
                  <Checkbox
                    label="Open to candidates worldwide"
                    checked={formData?.remoteWorldwide || false}
                    onChange={(e) => onChange('remoteWorldwide', e?.target?.checked)}
                  />
                  <Checkbox
                    label="Specific timezone requirements"
                    checked={formData?.timezoneRequired || false}
                    onChange={(e) => onChange('timezoneRequired', e?.target?.checked)}
                  />
                </div>
              </div>
            </div>

            {formData?.timezoneRequired && (
              <Select
                label="Required Timezone"
                placeholder="Select timezone"
                options={timezoneOptions}
                value={formData?.timezone}
                onChange={(value) => onChange('timezone', value)}
              />
            )}
          </div>
        )}

        {(formData?.workLocationType === 'onsite' || formData?.workLocationType === 'hybrid') && (
          <div className="space-y-4 md:space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
              <Input
                label="City"
                type="text"
                placeholder="e.g., San Francisco"
                required
                value={formData?.city}
                onChange={(e) => onChange('city', e?.target?.value)}
                error={errors?.city}
              />

              <Input
                label="State/Province"
                type="text"
                placeholder="e.g., California"
                required
                value={formData?.state}
                onChange={(e) => onChange('state', e?.target?.value)}
                error={errors?.state}
              />
            </div>

            <Select
              label="Country"
              placeholder="Select country"
              required
              searchable
              options={countryOptions}
              value={formData?.country}
              onChange={(value) => onChange('country', value)}
              error={errors?.country}
            />

            <Input
              label="Office Address (Optional)"
              type="text"
              placeholder="123 Main Street, Suite 100"
              description="Full address will be shared with candidates after initial screening"
              value={formData?.officeAddress}
              onChange={(e) => onChange('officeAddress', e?.target?.value)}
            />

            {formData?.workLocationType === 'hybrid' && (
              <div className="bg-muted/50 rounded-lg p-4">
                <div className="flex items-start gap-2">
                  <Icon name="Calendar" size={20} className="text-primary flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground mb-3">Hybrid Schedule</p>
                    <Input
                      label="Days in Office per Week"
                      type="number"
                      placeholder="e.g., 3"
                      min="1"
                      max="5"
                      description="How many days per week should the employee be in office?"
                      value={formData?.daysInOffice}
                      onChange={(e) => onChange('daysInOffice', e?.target?.value)}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        <div className="bg-muted/50 rounded-lg p-3 md:p-4">
          <div className="flex items-start gap-2">
            <Icon name="Info" size={18} className="text-primary flex-shrink-0 mt-0.5" />
            <p className="text-xs md:text-sm text-muted-foreground">
              Clear location information helps candidates determine if they can apply and improves your job posting's visibility in location-based searches.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationSection;