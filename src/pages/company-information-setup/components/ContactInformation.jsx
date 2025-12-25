import React from 'react';
import Input from '../../../components/ui/Input';

const ContactInformation = ({ 
  email, 
  onEmailChange, 
  phone, 
  onPhoneChange, 
  website, 
  onWebsiteChange,
  errors 
}) => {
  const formatPhoneNumber = (value) => {
    const cleaned = value?.replace(/\D/g, '');
    
    if (cleaned?.length <= 3) {
      return cleaned;
    } else if (cleaned?.length <= 6) {
      return `(${cleaned?.slice(0, 3)}) ${cleaned?.slice(3)}`;
    } else {
      return `(${cleaned?.slice(0, 3)}) ${cleaned?.slice(3, 6)}-${cleaned?.slice(6, 10)}`;
    }
  };

  const handlePhoneChange = (e) => {
    const formatted = formatPhoneNumber(e?.target?.value);
    onPhoneChange(formatted);
  };

  return (
    <div className="space-y-4 md:space-y-5 lg:space-y-6">
      <Input
        label="Company Email"
        type="email"
        value={email}
        onChange={(e) => onEmailChange(e?.target?.value)}
        error={errors?.email}
        required
        placeholder="contact@company.com"
        description="Primary contact email for your organization"
      />
      <Input
        label="Phone Number"
        type="tel"
        value={phone}
        onChange={handlePhoneChange}
        error={errors?.phone}
        required
        placeholder="(555) 123-4567"
        description="Main business phone number"
      />
      <Input
        label="Company Website"
        type="url"
        value={website}
        onChange={(e) => onWebsiteChange(e?.target?.value)}
        error={errors?.website}
        placeholder="https://www.company.com"
        description="Your company's official website (optional)"
      />
    </div>
  );
};

export default ContactInformation;