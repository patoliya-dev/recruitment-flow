import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const QuickActions = ({ onGoToDashboard, onPostAnotherJob, onInviteTeam }) => {
  return (
    <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-lg border border-border p-6 md:p-8 mb-8">
      <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
        <Icon name="Rocket" size={24} className="text-primary" />
        Quick Actions
      </h2>
      
      <p className="text-sm text-muted-foreground mb-6">
        Get started with these common tasks:
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-card rounded-lg border border-border p-4 hover:shadow-warm-md transition-smooth">
          <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 mb-3">
            <Icon name="LayoutDashboard" size={24} className="text-primary" />
          </div>
          <h3 className="text-sm font-semibold text-foreground mb-2">View Dashboard</h3>
          <p className="text-xs text-muted-foreground mb-4">
            Access your recruitment command center
          </p>
          <Button
            variant="default"
            size="sm"
            fullWidth
            onClick={onGoToDashboard}
            iconName="ArrowRight"
            iconPosition="right"
          >
            Go to Dashboard
          </Button>
        </div>

        <div className="bg-card rounded-lg border border-border p-4 hover:shadow-warm-md transition-smooth">
          <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-accent/10 mb-3">
            <Icon name="PlusCircle" size={24} className="text-accent" />
          </div>
          <h3 className="text-sm font-semibold text-foreground mb-2">Post Another Job</h3>
          <p className="text-xs text-muted-foreground mb-4">
            Create additional job postings
          </p>
          <Button
            variant="outline"
            size="sm"
            fullWidth
            onClick={onPostAnotherJob}
            iconName="Plus"
            iconPosition="left"
          >
            New Job Posting
          </Button>
        </div>

        <div className="bg-card rounded-lg border border-border p-4 hover:shadow-warm-md transition-smooth">
          <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-success/10 mb-3">
            <Icon name="UserPlus" size={24} className="text-success" />
          </div>
          <h3 className="text-sm font-semibold text-foreground mb-2">Invite Team</h3>
          <p className="text-xs text-muted-foreground mb-4">
            Collaborate with your hiring team
          </p>
          <Button
            variant="outline"
            size="sm"
            fullWidth
            onClick={onInviteTeam}
            iconName="Mail"
            iconPosition="left"
          >
            Invite Members
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuickActions;