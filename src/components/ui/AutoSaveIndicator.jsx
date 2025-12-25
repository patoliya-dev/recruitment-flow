import React, { useEffect, useState } from 'react';
import Icon from '../AppIcon';

const AutoSaveIndicator = ({ 
  saveStatus = 'saved',
  lastSaved = null,
  className = ''
}) => {
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    if (saveStatus === 'saving') {
      setDisplayText('Saving...');
    } else if (saveStatus === 'saved' && lastSaved) {
      const now = new Date();
      const savedTime = new Date(lastSaved);
      const diffInSeconds = Math.floor((now - savedTime) / 1000);

      if (diffInSeconds < 60) {
        setDisplayText('Saved just now');
      } else if (diffInSeconds < 3600) {
        const minutes = Math.floor(diffInSeconds / 60);
        setDisplayText(`Saved ${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`);
      } else {
        const hours = Math.floor(diffInSeconds / 3600);
        setDisplayText(`Saved ${hours} ${hours === 1 ? 'hour' : 'hours'} ago`);
      }
    } else if (saveStatus === 'error') {
      setDisplayText('Save failed');
    } else {
      setDisplayText('');
    }
  }, [saveStatus, lastSaved]);

  if (!displayText) return null;

  const getStatusColor = () => {
    switch (saveStatus) {
      case 'saving':
        return 'text-muted-foreground';
      case 'saved':
        return 'text-success';
      case 'error':
        return 'text-error';
      default:
        return 'text-muted-foreground';
    }
  };

  const getStatusIcon = () => {
    switch (saveStatus) {
      case 'saving':
        return 'Loader2';
      case 'saved':
        return 'Check';
      case 'error':
        return 'AlertCircle';
      default:
        return 'Check';
    }
  };

  return (
    <div className={`flex items-center gap-2 text-xs text-caption ${getStatusColor()} ${className}`}>
      <Icon 
        name={getStatusIcon()} 
        size={14} 
        className={saveStatus === 'saving' ? 'animate-spin' : ''}
      />
      <span>{displayText}</span>
    </div>
  );
};

export default AutoSaveIndicator;