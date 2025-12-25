import React from 'react';
import Icon from '../../../components/AppIcon';

const PlatformFeatures = () => {
  const features = [
    {
      icon: 'LayoutDashboard',
      title: 'Dashboard',
      description: 'Track all your recruitment activities in one place',
      color: 'text-primary'
    },
    {
      icon: 'Users',
      title: 'Candidate Management',
      description: 'Organize and review applications efficiently',
      color: 'text-accent'
    },
    {
      icon: 'BarChart3',
      title: 'Analytics',
      description: 'Get insights into your hiring performance',
      color: 'text-success'
    },
    {
      icon: 'Zap',
      title: 'AI-Powered Tools',
      description: 'Smart matching and automated screening',
      color: 'text-warning'
    }
  ];

  return (
    <div className="bg-card rounded-lg border border-border p-6 md:p-8">
      <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
        <Icon name="Sparkles" size={24} className="text-primary" />
        Explore Features
      </h2>
      
      <p className="text-sm text-muted-foreground mb-6">
        Discover powerful tools to streamline your recruitment:
      </p>

      <div className="space-y-3">
        {features?.map((feature, index) => (
          <div key={index} className="flex items-start gap-3 p-3 hover:bg-muted/50 rounded-lg transition-smooth cursor-pointer">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 flex-shrink-0">
              <Icon name={feature?.icon} size={20} className={feature?.color} />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">{feature?.title}</p>
              <p className="text-xs text-muted-foreground">{feature?.description}</p>
            </div>
            <Icon name="ChevronRight" size={18} className="text-muted-foreground flex-shrink-0" />
          </div>
        ))}
      </div>

      <div className="mt-6 pt-6 border-t border-border">
        <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <Icon name="Lightbulb" size={18} className="text-primary flex-shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="font-medium text-foreground mb-1">Pro Tip</p>
              <p className="text-muted-foreground">
                Start by exploring your dashboard to familiarize yourself with all available features.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlatformFeatures;