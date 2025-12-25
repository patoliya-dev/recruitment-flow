import React from 'react';
import Icon from '../../../components/AppIcon';

const ValidationPanel = ({ validationIssues }) => {
  const hasIssues = validationIssues && validationIssues?.length > 0;

  return (
    <div className="bg-card rounded-lg border border-border p-4 md:p-6">
      <h3 className="text-base md:text-lg font-semibold text-foreground font-heading mb-4 flex items-center gap-2">
        {hasIssues ? (
          <Icon name="AlertCircle" size={20} className="text-warning" />
        ) : (
          <Icon name="CheckCircle2" size={20} className="text-success" />
        )}
        Validation Status
      </h3>

      {hasIssues ? (
        <div className="space-y-3">
          <div className="bg-warning/10 border border-warning/20 rounded-lg p-3">
            <p className="text-sm font-medium text-foreground mb-2">
              {validationIssues?.length} issue{validationIssues?.length !== 1 ? 's' : ''} found
            </p>
            <p className="text-xs text-muted-foreground">
              Please address these issues before publishing
            </p>
          </div>

          <div className="space-y-2">
            {validationIssues?.map((issue, index) => (
              <div key={index} className="flex items-start gap-2 p-3 bg-muted rounded-lg">
                <Icon name="AlertTriangle" size={14} className="text-warning flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{issue?.field}</p>
                  <p className="text-xs text-muted-foreground">{issue?.message}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-success/10 border border-success/20 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <Icon name="CheckCircle2" size={20} className="text-success flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-foreground mb-1">
                All Requirements Met
              </p>
              <p className="text-xs text-muted-foreground">
                Your job posting is ready to be published
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ValidationPanel;