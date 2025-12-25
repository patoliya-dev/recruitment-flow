import React, { useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const VerificationCodeInput = ({ 
  value = ['', '', '', '', '', ''], 
  onChange, 
  error = '',
  disabled = false 
}) => {
  const inputRefs = useRef([]);

  useEffect(() => {
    if (inputRefs?.current?.[0]) {
      inputRefs?.current?.[0]?.focus();
    }
  }, []);

  const handleChange = (index, newValue) => {
    if (disabled) return;

    const sanitizedValue = newValue?.replace(/[^0-9]/g, '');
    
    if (sanitizedValue?.length > 1) {
      const digits = sanitizedValue?.split('')?.slice(0, 6);
      const newCode = [...value];
      digits?.forEach((digit, i) => {
        if (index + i < 6) {
          newCode[index + i] = digit;
        }
      });
      onChange(newCode);
      
      const nextIndex = Math.min(index + digits?.length, 5);
      if (inputRefs?.current?.[nextIndex]) {
        inputRefs?.current?.[nextIndex]?.focus();
      }
      return;
    }

    const newCode = [...value];
    newCode[index] = sanitizedValue;
    onChange(newCode);

    if (sanitizedValue && index < 5) {
      inputRefs?.current?.[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (disabled) return;

    if (e?.key === 'Backspace') {
      e?.preventDefault();
      const newCode = [...value];
      
      if (value?.[index]) {
        newCode[index] = '';
        onChange(newCode);
      } else if (index > 0) {
        newCode[index - 1] = '';
        onChange(newCode);
        inputRefs?.current?.[index - 1]?.focus();
      }
    } else if (e?.key === 'ArrowLeft' && index > 0) {
      inputRefs?.current?.[index - 1]?.focus();
    } else if (e?.key === 'ArrowRight' && index < 5) {
      inputRefs?.current?.[index + 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    if (disabled) return;
    
    e?.preventDefault();
    const pastedData = e?.clipboardData?.getData('text')?.replace(/[^0-9]/g, '');
    const digits = pastedData?.split('')?.slice(0, 6);
    
    const newCode = [...value];
    digits?.forEach((digit, i) => {
      newCode[i] = digit;
    });
    onChange(newCode);

    const nextIndex = Math.min(digits?.length, 5);
    inputRefs?.current?.[nextIndex]?.focus();
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-center gap-2 md:gap-3 lg:gap-4">
        {value?.map((digit, index) => (
          <input
            key={index}
            ref={(el) => (inputRefs.current[index] = el)}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(index, e?.target?.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onPaste={handlePaste}
            disabled={disabled}
            className={`w-12 h-14 md:w-14 md:h-16 lg:w-16 lg:h-18 text-center text-xl md:text-2xl lg:text-3xl font-semibold rounded-md border-2 transition-smooth focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary ${
              error
                ? 'border-error bg-error/5'
                : digit
                ? 'border-primary bg-primary/5' :'border-input bg-background'
            } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-text'}`}
            aria-label={`Verification code digit ${index + 1}`}
          />
        ))}
      </div>
      {error && (
        <div className="flex items-center justify-center gap-2 mt-3 text-error text-sm text-caption">
          <Icon name="AlertCircle" size={16} />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};

export default VerificationCodeInput;