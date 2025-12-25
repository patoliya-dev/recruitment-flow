import React from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const LocationFields = ({ 
  country, 
  onCountryChange, 
  state, 
  onStateChange, 
  city, 
  onCityChange,
  zipCode,
  onZipCodeChange,
  errors 
}) => {
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
    { value: 'nl', label: 'Netherlands' },
    { value: 'se', label: 'Sweden' },
    { value: 'ch', label: 'Switzerland' },
    { value: 'jp', label: 'Japan' },
    { value: 'br', label: 'Brazil' },
    { value: 'mx', label: 'Mexico' }
  ];

  const usStateOptions = [
    { value: 'AL', label: 'Alabama' },
    { value: 'AK', label: 'Alaska' },
    { value: 'AZ', label: 'Arizona' },
    { value: 'AR', label: 'Arkansas' },
    { value: 'CA', label: 'California' },
    { value: 'CO', label: 'Colorado' },
    { value: 'CT', label: 'Connecticut' },
    { value: 'DE', label: 'Delaware' },
    { value: 'FL', label: 'Florida' },
    { value: 'GA', label: 'Georgia' },
    { value: 'HI', label: 'Hawaii' },
    { value: 'ID', label: 'Idaho' },
    { value: 'IL', label: 'Illinois' },
    { value: 'IN', label: 'Indiana' },
    { value: 'IA', label: 'Iowa' },
    { value: 'KS', label: 'Kansas' },
    { value: 'KY', label: 'Kentucky' },
    { value: 'LA', label: 'Louisiana' },
    { value: 'ME', label: 'Maine' },
    { value: 'MD', label: 'Maryland' },
    { value: 'MA', label: 'Massachusetts' },
    { value: 'MI', label: 'Michigan' },
    { value: 'MN', label: 'Minnesota' },
    { value: 'MS', label: 'Mississippi' },
    { value: 'MO', label: 'Missouri' },
    { value: 'MT', label: 'Montana' },
    { value: 'NE', label: 'Nebraska' },
    { value: 'NV', label: 'Nevada' },
    { value: 'NH', label: 'New Hampshire' },
    { value: 'NJ', label: 'New Jersey' },
    { value: 'NM', label: 'New Mexico' },
    { value: 'NY', label: 'New York' },
    { value: 'NC', label: 'North Carolina' },
    { value: 'ND', label: 'North Dakota' },
    { value: 'OH', label: 'Ohio' },
    { value: 'OK', label: 'Oklahoma' },
    { value: 'OR', label: 'Oregon' },
    { value: 'PA', label: 'Pennsylvania' },
    { value: 'RI', label: 'Rhode Island' },
    { value: 'SC', label: 'South Carolina' },
    { value: 'SD', label: 'South Dakota' },
    { value: 'TN', label: 'Tennessee' },
    { value: 'TX', label: 'Texas' },
    { value: 'UT', label: 'Utah' },
    { value: 'VT', label: 'Vermont' },
    { value: 'VA', label: 'Virginia' },
    { value: 'WA', label: 'Washington' },
    { value: 'WV', label: 'West Virginia' },
    { value: 'WI', label: 'Wisconsin' },
    { value: 'WY', label: 'Wyoming' }
  ];

  return (
    <div className="space-y-4 md:space-y-5 lg:space-y-6">
      <Select
        label="Country"
        description="Primary country where your company is headquartered"
        options={countryOptions}
        value={country}
        onChange={onCountryChange}
        error={errors?.country}
        required
        searchable
        placeholder="Select country"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 lg:gap-6">
        {country === 'us' ? (
          <Select
            label="State"
            options={usStateOptions}
            value={state}
            onChange={onStateChange}
            error={errors?.state}
            required
            searchable
            placeholder="Select state"
          />
        ) : (
          <Input
            label="State/Province"
            type="text"
            value={state}
            onChange={(e) => onStateChange(e?.target?.value)}
            error={errors?.state}
            required
            placeholder="Enter state or province"
          />
        )}

        <Input
          label="City"
          type="text"
          value={city}
          onChange={(e) => onCityChange(e?.target?.value)}
          error={errors?.city}
          required
          placeholder="Enter city"
        />
      </div>
      <Input
        label="ZIP/Postal Code"
        type="text"
        value={zipCode}
        onChange={(e) => onZipCodeChange(e?.target?.value)}
        error={errors?.zipCode}
        placeholder="Enter ZIP or postal code"
      />
    </div>
  );
};

export default LocationFields;