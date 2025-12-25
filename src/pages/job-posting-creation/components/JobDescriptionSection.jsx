import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const JobDescriptionSection = ({ formData, errors, onChange }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [selectedText, setSelectedText] = useState('');
  const textareaRef = useRef(null);
  const [charCount, setCharCount] = useState(0);

  useEffect(() => {
    setCharCount(formData?.jobDescription?.length || 0);
  }, [formData?.jobDescription]);

  const formatText = (format) => {
    const textarea = textareaRef?.current;
    if (!textarea) return;

    const start = textarea?.selectionStart;
    const end = textarea?.selectionEnd;
    const text = formData?.jobDescription || '';
    const selectedText = text?.substring(start, end);

    if (!selectedText) return;

    let formattedText = '';
    switch (format) {
      case 'bold':
        formattedText = `**${selectedText}**`;
        break;
      case 'italic':
        formattedText = `*${selectedText}*`;
        break;
      case 'bullet':
        formattedText = `\n• ${selectedText}`;
        break;
      case 'number':
        formattedText = `\n1. ${selectedText}`;
        break;
      default:
        formattedText = selectedText;
    }

    const newText = text?.substring(0, start) + formattedText + text?.substring(end);
    onChange('jobDescription', newText);

    setTimeout(() => {
      textarea?.focus();
      textarea?.setSelectionRange(start, start + formattedText?.length);
    }, 0);
  };

  const handleTextSelection = () => {
    const textarea = textareaRef?.current;
    if (!textarea) return;

    const start = textarea?.selectionStart;
    const end = textarea?.selectionEnd;
    const text = formData?.jobDescription || '';
    setSelectedText(text?.substring(start, end));
  };

  const insertTemplate = () => {
    const template = `About the Role:\n\nWe are looking for a talented professional to join our team. In this role, you will:\n\n• Collaborate with cross-functional teams\n• Drive key initiatives and projects\n• Contribute to our company's growth\n\nWhat You'll Do:\n\n• [Responsibility 1]\n• [Responsibility 2]\n• [Responsibility 3]\n\nWhat We're Looking For:\n\n• [Requirement 1]\n• [Requirement 2]\n• [Requirement 3]`;
    onChange('jobDescription', template);
  };

  return (
    <div className="bg-card rounded-lg border border-border p-4 md:p-6 lg:p-8">
      <div className="flex items-start gap-3 mb-4 md:mb-6">
        <div className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 bg-primary/10 rounded-lg flex-shrink-0">
          <span className="text-lg md:text-xl font-semibold text-primary">2</span>
        </div>
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4">
            <div>
              <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-foreground font-heading">
                Job Description
              </h2>
              <p className="text-sm md:text-base text-muted-foreground mt-1 text-caption">
                Describe the role, responsibilities, and what makes it exciting
              </p>
            </div>
            <button
              type="button"
              onClick={insertTemplate}
              className="flex items-center gap-2 px-3 py-2 text-sm text-primary hover:bg-primary/10 rounded-md transition-smooth whitespace-nowrap"
            >
              <Icon name="FileText" size={16} />
              <span>Use Template</span>
            </button>
          </div>
        </div>
      </div>
      <div className="space-y-4">
        <div className={`border rounded-lg transition-smooth ${
          isFocused ? 'border-primary ring-2 ring-primary/20' : 'border-border'
        } ${errors?.jobDescription ? 'border-error' : ''}`}>
          <div className="flex items-center gap-1 p-2 border-b border-border bg-muted/30">
            <button
              type="button"
              onClick={() => formatText('bold')}
              className="p-2 hover:bg-background rounded transition-smooth"
              title="Bold"
            >
              <Icon name="Bold" size={18} />
            </button>
            <button
              type="button"
              onClick={() => formatText('italic')}
              className="p-2 hover:bg-background rounded transition-smooth"
              title="Italic"
            >
              <Icon name="Italic" size={18} />
            </button>
            <div className="w-px h-6 bg-border mx-1" />
            <button
              type="button"
              onClick={() => formatText('bullet')}
              className="p-2 hover:bg-background rounded transition-smooth"
              title="Bullet List"
            >
              <Icon name="List" size={18} />
            </button>
            <button
              type="button"
              onClick={() => formatText('number')}
              className="p-2 hover:bg-background rounded transition-smooth"
              title="Numbered List"
            >
              <Icon name="ListOrdered" size={18} />
            </button>
          </div>

          <textarea
            ref={textareaRef}
            value={formData?.jobDescription || ''}
            onChange={(e) => onChange('jobDescription', e?.target?.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onSelect={handleTextSelection}
            placeholder="Describe the role in detail. Include key responsibilities, day-to-day activities, team structure, and what makes this opportunity unique..."
            className="w-full min-h-[300px] md:min-h-[400px] p-4 bg-background text-foreground resize-none focus:outline-none text-sm md:text-base"
            style={{ fontFamily: 'inherit' }}
          />
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs md:text-sm text-caption">
          <div className="flex items-center gap-4">
            <span className={`${charCount < 200 ? 'text-warning' : charCount > 2000 ? 'text-error' : 'text-muted-foreground'}`}>
              {charCount} characters
            </span>
            <span className="text-muted-foreground">
              {charCount < 200 ? 'Add more details for better results' : charCount > 2000 ? 'Consider shortening for readability' : 'Good length'}
            </span>
          </div>
          {errors?.jobDescription && (
            <span className="text-error">{errors?.jobDescription}</span>
          )}
        </div>

        <div className="bg-muted/50 rounded-lg p-3 md:p-4">
          <div className="flex items-start gap-2">
            <Icon name="Lightbulb" size={18} className="text-primary flex-shrink-0 mt-0.5" />
            <div className="text-xs md:text-sm text-muted-foreground">
              <p className="font-medium text-foreground mb-1">Writing Tips:</p>
              <ul className="space-y-1 list-disc list-inside">
                <li>Start with an engaging overview of the role</li>
                <li>Use bullet points for responsibilities and requirements</li>
                <li>Highlight unique benefits and growth opportunities</li>
                <li>Keep paragraphs short and scannable</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDescriptionSection;