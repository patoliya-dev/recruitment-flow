import React from 'react';
import Icon from '../../../components/AppIcon';

const MetricsPanel = ({ jobData }) => {
  const calculateEstimatedReach = () => {
    if (!jobData) return 0;
    let reach = 1000;

    if (jobData?.workLocationType === 'remote') reach += 500;
    if (jobData?.salaryType !== 'negotiable') reach += 300;
    if (jobData?.jobDescription?.length > 500) reach += 200;

    return reach;
  };

  const calculateDifficultyScore = () => {
    if (!jobData) return 50;
    let score = 50;

    if (jobData?.experienceLevel === 'entry') score -= 10;
    if (jobData?.experienceLevel === 'senior' || jobData?.experienceLevel === 'lead') score += 15;
    if (jobData?.technicalSkills?.length > 5) score += 10;
    if (jobData?.educationLevel === 'master' || jobData?.educationLevel === 'phd') score += 10;

    return Math.min(Math.max(score, 0), 100);
  };

  const calculateSEOScore = () => {
    if (!jobData) return 0;
    let score = 0;

    if (jobData?.jobTitle?.length >= 10) score += 25;
    if (jobData?.jobDescription?.length >= 200) score += 25;
    if (jobData?.department) score += 15;
    if (jobData?.workLocationType) score += 15;
    if (jobData?.minSalary && jobData?.maxSalary) score += 20;

    return score;
  };

  const estimatedReach = calculateEstimatedReach();
  const difficultyScore = calculateDifficultyScore();
  const seoScore = calculateSEOScore();

  const getDifficultyLabel = (score) => {
    if (score < 40) return { label: 'Easy to Fill', color: 'text-success' };
    if (score < 70) return { label: 'Moderate', color: 'text-warning' };
    return { label: 'Challenging', color: 'text-error' };
  };

  const getSEOLabel = (score) => {
    if (score >= 80) return { label: 'Excellent', color: 'text-success' };
    if (score >= 60) return { label: 'Good', color: 'text-primary' };
    if (score >= 40) return { label: 'Fair', color: 'text-warning' };
    return { label: 'Needs Improvement', color: 'text-error' };
  };

  const difficultyInfo = getDifficultyLabel(difficultyScore);
  const seoInfo = getSEOLabel(seoScore);

  return (
    <div className="bg-card rounded-lg border border-border p-4 md:p-6">
      <h3 className="text-base md:text-lg font-semibold text-foreground font-heading mb-4">
        Posting Metrics
      </h3>

      <div className="space-y-4">
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Icon name="Users" size={16} className="text-primary" />
              <span className="text-sm font-medium text-foreground">Estimated Reach</span>
            </div>
            <span className="text-sm font-semibold text-primary">{estimatedReach?.toLocaleString()}+</span>
          </div>
          <p className="text-xs text-muted-foreground">
            Potential candidates who may see this posting
          </p>
        </div>

        <div className="border-t border-border pt-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Icon name="Target" size={16} className="text-primary" />
              <span className="text-sm font-medium text-foreground">Application Difficulty</span>
            </div>
            <span className={`text-sm font-semibold ${difficultyInfo?.color}`}>
              {difficultyInfo?.label}
            </span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden mb-2">
            <div
              className={`h-full transition-smooth ${
                difficultyScore < 40 ? 'bg-success' : difficultyScore < 70 ? 'bg-warning' : 'bg-error'
              }`}
              style={{ width: `${difficultyScore}%` }}
            />
          </div>
          <p className="text-xs text-muted-foreground">
            Based on experience requirements and skill complexity
          </p>
        </div>

        <div className="border-t border-border pt-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Icon name="TrendingUp" size={16} className="text-primary" />
              <span className="text-sm font-medium text-foreground">SEO Optimization</span>
            </div>
            <span className={`text-sm font-semibold ${seoInfo?.color}`}>
              {seoScore}/100
            </span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden mb-2">
            <div
              className={`h-full transition-smooth ${
                seoScore >= 80 ? 'bg-success' : seoScore >= 60 ? 'bg-primary' : seoScore >= 40 ? 'bg-warning' : 'bg-error'
              }`}
              style={{ width: `${seoScore}%` }}
            />
          </div>
          <p className="text-xs text-muted-foreground">
            {seoInfo?.label} - {seoScore >= 80 ? 'Great job!' : 'Consider adding more details'}
          </p>
        </div>

        {seoScore < 80 && (
          <div className="bg-primary/5 border border-primary/20 rounded-lg p-3">
            <div className="flex items-start gap-2">
              <Icon name="Lightbulb" size={14} className="text-primary flex-shrink-0 mt-0.5" />
              <div className="text-xs">
                <p className="font-medium text-foreground mb-1">Improvement Tips</p>
                <ul className="space-y-1 text-muted-foreground">
                  {jobData?.jobDescription?.length < 200 && (
                    <li>• Add more detailed job description</li>
                  )}
                  {(!jobData?.minSalary || !jobData?.maxSalary) && (
                    <li>• Include salary range for transparency</li>
                  )}
                  {!jobData?.department && (
                    <li>• Specify department for better categorization</li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MetricsPanel;