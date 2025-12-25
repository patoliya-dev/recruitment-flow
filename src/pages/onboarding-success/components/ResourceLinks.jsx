import React from 'react';
import Icon from '../../../components/AppIcon';

const ResourceLinks = () => {
  const resources = [
    {
      icon: 'BookOpen',
      title: 'Help Documentation',
      description: 'Comprehensive guides and tutorials',
      link: '#'
    },
    {
      icon: 'Video',
      title: 'Video Tutorials',
      description: 'Learn through step-by-step videos',
      link: '#'
    },
    {
      icon: 'MessageCircle',
      title: 'Customer Support',
      description: 'Get help from our support team',
      link: '#'
    },
    {
      icon: 'Users',
      title: 'Community Forum',
      description: 'Connect with other recruiters',
      link: '#'
    }
  ];

  return (
    <div className="bg-card rounded-lg border border-border p-6 md:p-8 mb-8">
      <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
        <Icon name="HelpCircle" size={24} className="text-primary" />
        Need Help?
      </h2>
      
      <p className="text-sm text-muted-foreground mb-6">
        Access helpful resources to get the most out of RecruitFlow:
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {resources?.map((resource, index) => (
          <a
            key={index}
            href={resource?.link}
            className="flex flex-col items-center text-center p-4 border border-border rounded-lg hover:bg-muted/50 hover:border-primary/30 transition-smooth group"
          >
            <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 mb-3 group-hover:bg-primary/20 transition-smooth">
              <Icon name={resource?.icon} size={24} className="text-primary" />
            </div>
            <h3 className="text-sm font-semibold text-foreground mb-1">{resource?.title}</h3>
            <p className="text-xs text-muted-foreground">{resource?.description}</p>
          </a>
        ))}
      </div>
    </div>
  );
};

export default ResourceLinks;