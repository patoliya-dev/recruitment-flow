import React from 'react';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const CompensationSection = ({ formData, errors, onChange }) => {
  const salaryTypeOptions = [
    { value: 'range', label: 'Salary Range' },
    { value: 'fixed', label: 'Fixed Salary' },
    { value: 'negotiable', label: 'Negotiable' }
  ];

  const currencyOptions = [
    { value: 'usd', label: 'USD ($)' },
    { value: 'eur', label: 'EUR (€)' },
    { value: 'gbp', label: 'GBP (£)' },
    { value: 'cad', label: 'CAD ($)' },
    { value: 'aud', label: 'AUD ($)' },
    { value: 'inr', label: 'INR (₹)' }
  ];

  const periodOptions = [
    { value: 'year', label: 'Per Year' },
    { value: 'month', label: 'Per Month' },
    { value: 'hour', label: 'Per Hour' }
  ];

  const formatNumber = (value) => {
    if (!value) return '';
    return value?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const handleNumberInput = (field, value) => {
    const numericValue = value?.replace(/,/g, '');
    if (/^\d*$/?.test(numericValue)) {
      onChange(field, numericValue);
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border p-4 md:p-6 lg:p-8">
      <div className="flex items-start gap-3 mb-4 md:mb-6">
        <div className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 bg-primary/10 rounded-lg flex-shrink-0">
          <span className="text-lg md:text-xl font-semibold text-primary">4</span>
        </div>
        <div>
          <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-foreground font-heading">
            Compensation & Benefits
          </h2>
          <p className="text-sm md:text-base text-muted-foreground mt-1 text-caption">
            Transparent compensation attracts quality candidates
          </p>
        </div>
      </div>
      <div className="space-y-4 md:space-y-5">
        <Select
          label="Salary Information"
          placeholder="Select salary type"
          required
          options={salaryTypeOptions}
          value={formData?.salaryType}
          onChange={(value) => onChange('salaryType', value)}
          error={errors?.salaryType}
        />

        {formData?.salaryType !== 'negotiable' && (
          <div className="space-y-4 md:space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
              <Select
                label="Currency"
                placeholder="Select currency"
                required
                options={currencyOptions}
                value={formData?.currency}
                onChange={(value) => onChange('currency', value)}
                error={errors?.currency}
              />

              <Select
                label="Pay Period"
                placeholder="Select period"
                required
                options={periodOptions}
                value={formData?.payPeriod}
                onChange={(value) => onChange('payPeriod', value)}
                error={errors?.payPeriod}
              />
            </div>

            {formData?.salaryType === 'range' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
                <Input
                  label="Minimum Salary"
                  type="text"
                  placeholder="e.g., 80,000"
                  required
                  value={formatNumber(formData?.salaryMin)}
                  onChange={(e) => handleNumberInput('salaryMin', e?.target?.value)}
                  error={errors?.salaryMin}
                />

                <Input
                  label="Maximum Salary"
                  type="text"
                  placeholder="e.g., 120,000"
                  required
                  value={formatNumber(formData?.salaryMax)}
                  onChange={(e) => handleNumberInput('salaryMax', e?.target?.value)}
                  error={errors?.salaryMax}
                />
              </div>
            )}

            {formData?.salaryType === 'fixed' && (
              <Input
                label="Salary Amount"
                type="text"
                placeholder="e.g., 100,000"
                required
                value={formatNumber(formData?.salaryFixed)}
                onChange={(e) => handleNumberInput('salaryFixed', e?.target?.value)}
                error={errors?.salaryFixed}
              />
            )}
          </div>
        )}

        <div className="space-y-3">
          <label className="text-sm font-medium text-foreground">
            Additional Benefits
          </label>
          <div className="bg-muted/50 rounded-lg p-4 space-y-3">
            <Checkbox
              label="Health Insurance"
              checked={formData?.benefits?.healthInsurance || false}
              onChange={(e) => onChange('benefits', { ...formData?.benefits, healthInsurance: e?.target?.checked })}
            />
            <Checkbox
              label="Dental & Vision"
              checked={formData?.benefits?.dentalVision || false}
              onChange={(e) => onChange('benefits', { ...formData?.benefits, dentalVision: e?.target?.checked })}
            />
            <Checkbox
              label="401(k) / Retirement Plan"
              checked={formData?.benefits?.retirement || false}
              onChange={(e) => onChange('benefits', { ...formData?.benefits, retirement: e?.target?.checked })}
            />
            <Checkbox
              label="Paid Time Off"
              checked={formData?.benefits?.paidTimeOff || false}
              onChange={(e) => onChange('benefits', { ...formData?.benefits, paidTimeOff: e?.target?.checked })}
            />
            <Checkbox
              label="Professional Development"
              checked={formData?.benefits?.professionalDev || false}
              onChange={(e) => onChange('benefits', { ...formData?.benefits, professionalDev: e?.target?.checked })}
            />
            <Checkbox
              label="Stock Options / Equity"
              checked={formData?.benefits?.equity || false}
              onChange={(e) => onChange('benefits', { ...formData?.benefits, equity: e?.target?.checked })}
            />
            <Checkbox
              label="Flexible Schedule"
              checked={formData?.benefits?.flexibleSchedule || false}
              onChange={(e) => onChange('benefits', { ...formData?.benefits, flexibleSchedule: e?.target?.checked })}
            />
            <Checkbox
              label="Remote Work Stipend"
              checked={formData?.benefits?.remoteStipend || false}
              onChange={(e) => onChange('benefits', { ...formData?.benefits, remoteStipend: e?.target?.checked })}
            />
          </div>
        </div>

        <div className="bg-primary/5 border border-primary/20 rounded-lg p-3 md:p-4">
          <div className="flex items-start gap-2">
            <Icon name="TrendingUp" size={18} className="text-primary flex-shrink-0 mt-0.5" />
            <div className="text-xs md:text-sm">
              <p className="font-medium text-foreground mb-1">Salary Transparency Tip</p>
              <p className="text-muted-foreground">
                Job postings with clear salary information receive 30% more applications and attract more qualified candidates.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompensationSection;