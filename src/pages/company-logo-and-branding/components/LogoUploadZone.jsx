import React, { useState, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const LogoUploadZone = ({ onLogoUpload, currentLogo, onRemoveLogo }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  const allowedFormats = ['image/png', 'image/jpeg', 'image/jpg', 'image/svg+xml'];
  const maxFileSize = 5 * 1024 * 1024; // 5MB

  const validateFile = (file) => {
    if (!allowedFormats?.includes(file?.type)) {
      setError('Please upload PNG, JPG, or SVG format only');
      return false;
    }
    if (file?.size > maxFileSize) {
      setError('File size must be less than 5MB');
      return false;
    }
    setError('');
    return true;
  };

  const simulateUpload = (file) => {
    setIsUploading(true);
    setUploadProgress(0);

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          const reader = new FileReader();
          reader.onloadend = () => {
            onLogoUpload(reader?.result, file?.name);
          };
          reader?.readAsDataURL(file);
          return 100;
        }
        return prev + 10;
      });
    }, 100);
  };

  const handleFileSelect = (file) => {
    if (file && validateFile(file)) {
      simulateUpload(file);
    }
  };

  const handleDragOver = (e) => {
    e?.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e?.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e?.preventDefault();
    setIsDragging(false);
    const file = e?.dataTransfer?.files?.[0];
    handleFileSelect(file);
  };

  const handleFileInputChange = (e) => {
    const file = e?.target?.files?.[0];
    handleFileSelect(file);
  };

  const handleBrowseClick = () => {
    fileInputRef?.current?.click();
  };

  return (
    <div className="space-y-4">
      {!currentLogo ? (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`relative border-2 border-dashed rounded-lg transition-smooth ${
            isDragging
              ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
          } ${isUploading ? 'pointer-events-none' : 'cursor-pointer'}`}
          onClick={!isUploading ? handleBrowseClick : undefined}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".png,.jpg,.jpeg,.svg"
            onChange={handleFileInputChange}
            className="hidden"
            aria-label="Upload company logo"
          />

          <div className="p-8 md:p-12 lg:p-16 text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 bg-primary/10 rounded-full flex items-center justify-center">
                <Icon
                  name={isUploading ? 'Loader2' : 'Upload'}
                  size={32}
                  color="var(--color-primary)"
                  className={isUploading ? 'animate-spin' : ''}
                />
              </div>
            </div>

            {isUploading ? (
              <div className="space-y-3">
                <p className="text-sm md:text-base text-foreground font-medium">
                  Uploading logo...
                </p>
                <div className="max-w-xs mx-auto">
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary transition-smooth"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-2 text-caption">
                    {uploadProgress}% complete
                  </p>
                </div>
              </div>
            ) : (
              <>
                <h3 className="text-base md:text-lg lg:text-xl font-semibold text-foreground mb-2">
                  Drop your logo here
                </h3>
                <p className="text-sm md:text-base text-muted-foreground mb-4">
                  or click to browse from your device
                </p>
                <div className="flex flex-wrap justify-center gap-2 text-xs md:text-sm text-caption text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Icon name="FileImage" size={14} />
                    PNG, JPG, SVG
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Icon name="HardDrive" size={14} />
                    Max 5MB
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Icon name="Maximize2" size={14} />
                    Recommended: 512x512px
                  </span>
                </div>
              </>
            )}
          </div>
        </div>
      ) : (
        <div className="border-2 border-border rounded-lg p-6 md:p-8">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-32 h-32 md:w-40 md:h-40 bg-muted rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0">
              <Image
                src={currentLogo}
                alt="Uploaded company logo preview showing brand identity"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h4 className="text-base md:text-lg font-semibold text-foreground mb-2">
                Logo uploaded successfully
              </h4>
              <p className="text-sm text-muted-foreground text-caption mb-4">
                Your logo will appear on job postings and company profile
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleBrowseClick}
                  className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-primary border border-primary rounded-md hover:bg-primary/5 transition-smooth"
                >
                  <Icon name="RefreshCw" size={16} />
                  Replace Logo
                </button>
                <button
                  onClick={onRemoveLogo}
                  className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-error border border-error rounded-md hover:bg-error/5 transition-smooth"
                >
                  <Icon name="Trash2" size={16} />
                  Remove Logo
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {error && (
        <div className="flex items-start gap-2 p-4 bg-error/10 border border-error/20 rounded-md">
          <Icon name="AlertCircle" size={18} color="var(--color-error)" className="flex-shrink-0 mt-0.5" />
          <p className="text-sm text-error">{error}</p>
        </div>
      )}
    </div>
  );
};

export default LogoUploadZone;