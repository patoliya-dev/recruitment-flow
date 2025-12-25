import React from 'react';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const ApplicationRequirementsSection = ({ formData, onChange, errors }) => {
  const requiredDocuments = [
    { id: 'resume', label: 'Resume/CV', icon: 'FileText' },
    { id: 'cover_letter', label: 'Cover Letter', icon: 'Mail' },
    { id: 'portfolio', label: 'Portfolio', icon: 'Briefcase' },
    { id: 'references', label: 'References', icon: 'Users' },
    { id: 'certifications', label: 'Certifications', icon: 'Award' },
    { id: 'writing_sample', label: 'Writing Sample', icon: 'PenTool' }
  ];

  const screeningQuestions = [
    "Are you authorized to work in the United States?",
    "Do you have the required years of experience for this role?",
    "Are you willing to relocate if necessary?",
    "What is your expected salary range?",
    "When is your earliest available start date?"
  ];

  const handleDocumentToggle = (docId) => {
    const currentDocs = formData?.requiredDocuments || [];
    const updatedDocs = currentDocs?.includes(docId)
      ? currentDocs?.filter(id => id !== docId)
      : [...currentDocs, docId];
    onChange('requiredDocuments', updatedDocs);
  };

  const handleScreeningQuestionToggle = (question) => {
    const currentQuestions = formData?.screeningQuestions || [];
    const updatedQuestions = currentQuestions?.includes(question)
      ? currentQuestions?.filter(q => q !== question)
      : [...currentQuestions, question];
    onChange('screeningQuestions', updatedQuestions);
  };

  return (
    <div className="bg-card rounded-lg border border-border p-4 md:p-6 lg:p-8">
      <div className="flex items-start gap-3 mb-4 md:mb-6">
        <div className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 bg-accent/10 rounded-md flex-shrink-0">
          <Icon name="ClipboardCheck" size={20} color="var(--color-accent)" />
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-foreground mb-1">
            Application Requirements
          </h2>
          <p className="text-sm md:text-base text-muted-foreground">
            Specify documents and screening questions for applicants
          </p>
        </div>
      </div>
      <div className="space-y-6 md:space-y-8">
        <div>
          <h3 className="text-base md:text-lg font-medium text-foreground mb-3 md:mb-4">
            Required Documents
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
            {requiredDocuments?.map((doc) => (
              <div
                key={doc?.id}
                className="flex items-center gap-3 p-3 md:p-4 bg-muted/50 rounded-md hover:bg-muted transition-smooth cursor-pointer"
                onClick={() => handleDocumentToggle(doc?.id)}
              >
                <Checkbox
                  checked={(formData?.requiredDocuments || [])?.includes(doc?.id)}
                  onChange={() => handleDocumentToggle(doc?.id)}
                />
                <Icon name={doc?.icon} size={18} color="var(--color-primary)" className="flex-shrink-0" />
                <span className="text-sm md:text-base text-foreground">{doc?.label}</span>
              </div>
            ))}
          </div>
          {errors?.requiredDocuments && (
            <p className="text-sm text-error mt-2">{errors?.requiredDocuments}</p>
          )}
        </div>

        <div>
          <h3 className="text-base md:text-lg font-medium text-foreground mb-3 md:mb-4">
            Screening Questions
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Select pre-screening questions to help filter candidates
          </p>
          <div className="space-y-3">
            {screeningQuestions?.map((question, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-3 md:p-4 bg-muted/50 rounded-md hover:bg-muted transition-smooth cursor-pointer"
                onClick={() => handleScreeningQuestionToggle(question)}
              >
                <Checkbox
                  checked={(formData?.screeningQuestions || [])?.includes(question)}
                  onChange={() => handleScreeningQuestionToggle(question)}
                  className="mt-0.5"
                />
                <span className="text-sm md:text-base text-foreground flex-1">{question}</span>
              </div>
            ))}
          </div>
        </div>

        <Input
          label="Custom Screening Question"
          type="text"
          placeholder="Add your own screening question"
          value={formData?.customScreeningQuestion}
          onChange={(e) => onChange('customScreeningQuestion', e?.target?.value)}
          description="Optional - add a role-specific question"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <Input
            label="Application Deadline"
            type="date"
            value={formData?.applicationDeadline}
            onChange={(e) => onChange('applicationDeadline', e?.target?.value)}
            error={errors?.applicationDeadline}
            description="Last date to accept applications"
            min={new Date()?.toISOString()?.split('T')?.[0]}
          />

          <Input
            label="Expected Start Date"
            type="date"
            value={formData?.expectedStartDate}
            onChange={(e) => onChange('expectedStartDate', e?.target?.value)}
            description="When should the candidate start?"
            min={new Date()?.toISOString()?.split('T')?.[0]}
          />
        </div>

        <div className="bg-warning/10 rounded-md p-3 md:p-4 flex items-start gap-3">
          <Icon name="AlertTriangle" size={18} color="var(--color-warning)" className="flex-shrink-0 mt-0.5" />
          <p className="text-xs md:text-sm text-muted-foreground">
            <strong className="text-foreground">Note:</strong> Requiring too many documents or screening questions may reduce application rates. We recommend selecting 2-3 essential items.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ApplicationRequirementsSection;