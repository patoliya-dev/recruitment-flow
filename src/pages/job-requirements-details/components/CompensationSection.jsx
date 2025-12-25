import React from 'react';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const CompensationSection = ({ formData, onChange, errors }) => {
  const currencyOptions = [
    { value: 'USD', label: 'USD ($)' },
    { value: 'EUR', label: 'EUR (€)' },
    { value: 'GBP', label: 'GBP (£)' },
    { value: 'INR', label: 'INR (₹)' }
  ];

  const salaryTypeOptions = [
    { value: 'annual', label: 'Annual Salary' },
    { value: 'hourly', label: 'Hourly Rate' },
    { value: 'monthly', label: 'Monthly Salary' }
  ];

  const benefitsList = [
    { id: 'health_insurance', label: 'Health Insurance', icon: 'Heart' },
    { id: 'dental_vision', label: 'Dental & Vision', icon: 'Eye' },
    { id: 'retirement_401k', label: '401(k) / Retirement Plan', icon: 'PiggyBank' },
    { id: 'paid_time_off', label: 'Paid Time Off', icon: 'Calendar' },
    { id: 'remote_work', label: 'Remote Work Options', icon: 'Home' },
    { id: 'professional_development', label: 'Professional Development', icon: 'GraduationCap' },
    { id: 'gym_membership', label: 'Gym Membership', icon: 'Dumbbell' },
    { id: 'stock_options', label: 'Stock Options / Equity', icon: 'TrendingUp' }
  ];

  const handleBenefitToggle = (benefitId) => {
    const currentBenefits = formData?.benefits || [];
    const updatedBenefits = currentBenefits?.includes(benefitId)
      ? currentBenefits?.filter(id => id !== benefitId)
      : [...currentBenefits, benefitId];
    onChange('benefits', updatedBenefits);
  };

  return (
    <div className="bg-card rounded-lg border border-border p-4 md:p-6 lg:p-8">
      <div className="flex items-start gap-3 mb-4 md:mb-6">
        <div className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 bg-success/10 rounded-md flex-shrink-0">
          <Icon name="DollarSign" size={20} color="var(--color-success)" />
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-foreground mb-1">
            Compensation & Benefits
          </h2>
          <p className="text-sm md:text-base text-muted-foreground">
            Define salary range and benefits package for this position
          </p>
        </div>
      </div>
      <div className="space-y-6 md:space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <Select
            label="Currency"
            options={currencyOptions}
            value={formData?.currency}
            onChange={(value) => onChange('currency', value)}
            required
          />

          <Select
            label="Salary Type"
            options={salaryTypeOptions}
            value={formData?.salaryType}
            onChange={(value) => onChange('salaryType', value)}
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <Input
            label="Minimum Salary"
            type="number"
            placeholder="e.g., 80000"
            value={formData?.minSalary}
            onChange={(e) => onChange('minSalary', e?.target?.value)}
            error={errors?.minSalary}
            required
            min="0"
          />

          <Input
            label="Maximum Salary"
            type="number"
            placeholder="e.g., 120000"
            value={formData?.maxSalary}
            onChange={(e) => onChange('maxSalary', e?.target?.value)}
            error={errors?.maxSalary}
            required
            min="0"
          />
        </div>

        <div className="bg-primary/5 rounded-md p-3 md:p-4 flex items-start gap-3">
          <Icon name="TrendingUp" size={18} color="var(--color-primary)" className="flex-shrink-0 mt-0.5" />
          <div className="flex-1 min-w-0">
            <p className="text-xs md:text-sm text-foreground font-medium mb-1">
              Market Benchmark
            </p>
            <p className="text-xs md:text-sm text-muted-foreground">
              Similar roles in your location typically offer $85,000 - $115,000 annually. Your range is competitive.
            </p>
          </div>
        </div>

        <div>
          <Checkbox
            label="Include equity/stock options"
            checked={formData?.includeEquity}
            onChange={(e) => onChange('includeEquity', e?.target?.checked)}
            description="Offer company equity as part of compensation"
          />
        </div>

        {formData?.includeEquity && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 pl-0 md:pl-8">
            <Input
              label="Equity Percentage"
              type="number"
              placeholder="e.g., 0.5"
              value={formData?.equityPercentage}
              onChange={(e) => onChange('equityPercentage', e?.target?.value)}
              description="Percentage of company equity"
              min="0"
              max="100"
              step="0.01"
            />

            <Input
              label="Vesting Period (years)"
              type="number"
              placeholder="e.g., 4"
              value={formData?.vestingPeriod}
              onChange={(e) => onChange('vestingPeriod', e?.target?.value)}
              description="Standard vesting schedule"
              min="0"
              max="10"
            />
          </div>
        )}

        <div>
          <h3 className="text-base md:text-lg font-medium text-foreground mb-3 md:mb-4">
            Benefits Package
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
            {benefitsList?.map((benefit) => (
              <div
                key={benefit?.id}
                className="flex items-center gap-3 p-3 md:p-4 bg-muted/50 rounded-md hover:bg-muted transition-smooth cursor-pointer"
                onClick={() => handleBenefitToggle(benefit?.id)}
              >
                <Checkbox
                  checked={(formData?.benefits || [])?.includes(benefit?.id)}
                  onChange={() => handleBenefitToggle(benefit?.id)}
                />
                <Icon name={benefit?.icon} size={18} color="var(--color-primary)" className="flex-shrink-0" />
                <span className="text-sm md:text-base text-foreground">{benefit?.label}</span>
              </div>
            ))}
          </div>
        </div>

        <Input
          label="Additional Benefits Description"
          type="text"
          placeholder="e.g., Flexible hours, unlimited PTO, learning budget"
          value={formData?.additionalBenefits}
          onChange={(e) => onChange('additionalBenefits', e?.target?.value)}
          description="Describe any other perks or benefits"
        />
      </div>
    </div>
  );
};

export default CompensationSection;