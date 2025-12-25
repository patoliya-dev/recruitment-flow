import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const SetupSummary = () => {
  const [completedTasks, setCompletedTasks] = useState([]);

  useEffect(() => {
    const tasks = [];

    const companyInfo = localStorage.getItem('companyInformation');
    if (companyInfo) {
      tasks?.push({
        icon: 'Building2',
        title: 'Company Profile',
        description: 'Company information and details configured'
      });
    }

    const branding = localStorage.getItem('companyBranding');
    if (branding) {
      tasks?.push({
        icon: 'Palette',
        title: 'Brand Identity',
        description: 'Logo and branding elements set up'
      });
    }

    const jobPosting = localStorage.getItem('jobPostingDraft');
    if (jobPosting) {
      tasks?.push({
        icon: 'Briefcase',
        title: 'First Job Posting',
        description: 'Job posting created and ready to publish'
      });
    }

    const requirements = localStorage.getItem('jobRequirementsData');
    if (requirements) {
      tasks?.push({
        icon: 'CheckSquare',
        title: 'Job Requirements',
        description: 'Qualifications and requirements defined'
      });
    }

    const emailVerified = localStorage.getItem('emailVerified');
    if (emailVerified) {
      tasks?.push({
        icon: 'Mail',
        title: 'Email Verified',
        description: 'Your email address has been confirmed'
      });
    }

    setCompletedTasks(tasks);
  }, []);

  return (
    <div className="bg-card rounded-lg border border-border p-6 md:p-8">
      <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
        <Icon name="CheckCircle2" size={24} className="text-success" />
        Setup Complete
      </h2>
      
      <p className="text-sm text-muted-foreground mb-6">
        Here's what you've accomplished during onboarding:
      </p>

      <div className="space-y-3">
        {completedTasks?.length > 0 ? (
          completedTasks?.map((task, index) => (
            <div key={index} className="flex items-start gap-3 p-3 bg-success/5 border border-success/20 rounded-lg">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-success/10 flex-shrink-0">
                <Icon name={task?.icon} size={20} className="text-success" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">{task?.title}</p>
                <p className="text-xs text-muted-foreground">{task?.description}</p>
              </div>
              <Icon name="Check" size={18} className="text-success flex-shrink-0" />
            </div>
          ))
        ) : (
          <div className="text-center py-4">
            <Icon name="CheckCircle2" size={32} className="text-success mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">All setup tasks completed!</p>
          </div>
        )}
      </div>

      <div className="mt-6 pt-6 border-t border-border">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-foreground">Onboarding Progress</span>
          <span className="text-sm font-semibold text-success">100%</span>
        </div>
        <div className="h-2 bg-muted rounded-full overflow-hidden mt-2">
          <div className="h-full bg-success transition-smooth" style={{ width: '100%' }} />
        </div>
      </div>
    </div>
  );
};

export default SetupSummary;