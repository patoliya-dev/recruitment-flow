import React, { useState } from 'react';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const SkillsSection = ({ formData, onChange, errors }) => {
  const [newSkill, setNewSkill] = useState('');
  const [newSkillLevel, setNewSkillLevel] = useState('intermediate');

  const technicalSkillsOptions = [
    { value: 'javascript', label: 'JavaScript' },
    { value: 'react', label: 'React' },
    { value: 'nodejs', label: 'Node.js' },
    { value: 'python', label: 'Python' },
    { value: 'java', label: 'Java' },
    { value: 'sql', label: 'SQL' },
    { value: 'aws', label: 'AWS' },
    { value: 'docker', label: 'Docker' },
    { value: 'kubernetes', label: 'Kubernetes' },
    { value: 'git', label: 'Git' }
  ];

  const proficiencyLevelOptions = [
    { value: 'beginner', label: 'Beginner' },
    { value: 'intermediate', label: 'Intermediate' },
    { value: 'advanced', label: 'Advanced' },
    { value: 'expert', label: 'Expert' }
  ];

  const softSkillsOptions = [
    { value: 'communication', label: 'Communication' },
    { value: 'leadership', label: 'Leadership' },
    { value: 'teamwork', label: 'Teamwork' },
    { value: 'problem_solving', label: 'Problem Solving' },
    { value: 'time_management', label: 'Time Management' },
    { value: 'adaptability', label: 'Adaptability' },
    { value: 'critical_thinking', label: 'Critical Thinking' },
    { value: 'creativity', label: 'Creativity' }
  ];

  const handleAddSkill = () => {
    if (newSkill && newSkillLevel) {
      const updatedSkills = [
        ...(formData?.technicalSkills || []),
        { skill: newSkill, level: newSkillLevel }
      ];
      onChange('technicalSkills', updatedSkills);
      setNewSkill('');
      setNewSkillLevel('intermediate');
    }
  };

  const handleRemoveSkill = (index) => {
    const updatedSkills = formData?.technicalSkills?.filter((_, i) => i !== index);
    onChange('technicalSkills', updatedSkills);
  };

  const handleUpdateSkillLevel = (index, level) => {
    const updatedSkills = [...formData?.technicalSkills];
    updatedSkills[index].level = level;
    onChange('technicalSkills', updatedSkills);
  };

  return (
    <div className="bg-card rounded-lg border border-border p-4 md:p-6 lg:p-8">
      <div className="flex items-start gap-3 mb-4 md:mb-6">
        <div className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 bg-secondary/10 rounded-md flex-shrink-0">
          <Icon name="Code2" size={20} color="var(--color-secondary)" />
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-foreground mb-1">
            Required Skills
          </h2>
          <p className="text-sm md:text-base text-muted-foreground">
            Specify technical and soft skills needed for success in this role
          </p>
        </div>
      </div>
      <div className="space-y-6 md:space-y-8">
        <div>
          <h3 className="text-base md:text-lg font-medium text-foreground mb-3 md:mb-4">
            Technical Skills
          </h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 md:gap-4 mb-4">
            <div className="lg:col-span-6">
              <Select
                label="Select Skill"
                options={technicalSkillsOptions}
                value={newSkill}
                onChange={setNewSkill}
                placeholder="Choose a technical skill"
                searchable
              />
            </div>
            <div className="lg:col-span-4">
              <Select
                label="Proficiency Level"
                options={proficiencyLevelOptions}
                value={newSkillLevel}
                onChange={setNewSkillLevel}
              />
            </div>
            <div className="lg:col-span-2 flex items-end">
              <Button
                variant="outline"
                onClick={handleAddSkill}
                disabled={!newSkill}
                iconName="Plus"
                iconPosition="left"
                fullWidth
              >
                Add
              </Button>
            </div>
          </div>

          {formData?.technicalSkills && formData?.technicalSkills?.length > 0 ? (
            <div className="space-y-2">
              {formData?.technicalSkills?.map((skill, index) => (
                <div
                  key={index}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 md:p-4 bg-muted/50 rounded-md"
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <Icon name="CheckCircle2" size={18} color="var(--color-success)" className="flex-shrink-0" />
                    <span className="text-sm md:text-base text-foreground font-medium truncate">
                      {technicalSkillsOptions?.find(opt => opt?.value === skill?.skill)?.label || skill?.skill}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Select
                      options={proficiencyLevelOptions}
                      value={skill?.level}
                      onChange={(value) => handleUpdateSkillLevel(index, value)}
                      className="w-full sm:w-40"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveSkill(index)}
                      iconName="X"
                      className="flex-shrink-0"
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-6 md:py-8 border-2 border-dashed border-border rounded-md">
              <Icon name="Code2" size={32} color="var(--color-muted-foreground)" className="mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">No technical skills added yet</p>
            </div>
          )}

          {errors?.technicalSkills && (
            <p className="text-sm text-error mt-2">{errors?.technicalSkills}</p>
          )}
        </div>

        <div>
          <h3 className="text-base md:text-lg font-medium text-foreground mb-3 md:mb-4">
            Soft Skills
          </h3>
          <Select
            label="Select Soft Skills"
            description="Choose the interpersonal skills important for this role"
            options={softSkillsOptions}
            value={formData?.softSkills}
            onChange={(value) => onChange('softSkills', value)}
            multiple
            searchable
            placeholder="Select soft skills"
          />
        </div>

        <div className="bg-accent/10 rounded-md p-3 md:p-4 flex items-start gap-3">
          <Icon name="Lightbulb" size={18} color="var(--color-accent)" className="flex-shrink-0 mt-0.5" />
          <p className="text-xs md:text-sm text-muted-foreground">
            <strong className="text-foreground">Tip:</strong> Adding 5-7 technical skills with clear proficiency levels helps candidates self-assess their fit and improves application quality by 42%.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SkillsSection;