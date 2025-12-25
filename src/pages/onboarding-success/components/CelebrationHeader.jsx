import React from 'react';
import Icon from '../../../components/AppIcon';

const CelebrationHeader = () => {
  return (
    <div className="text-center mb-8 md:mb-12">
      <div className="flex items-center justify-center w-20 h-20 md:w-24 md:h-24 rounded-full bg-success/10 mx-auto mb-6 animate-in zoom-in duration-500">
        <Icon name="CheckCircle2" size={48} color="var(--color-success)" />
      </div>
      
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
        🎉 Congratulations!
      </h1>
      
      <p className="text-lg md:text-xl text-muted-foreground mb-2 animate-in fade-in slide-in-from-bottom-4 duration-700" style={{ animationDelay: '100ms' }}>
        Your RecruitFlow account is ready to go!
      </p>
      
      <p className="text-sm md:text-base text-muted-foreground animate-in fade-in slide-in-from-bottom-4 duration-700" style={{ animationDelay: '200ms' }}>
        You've successfully completed the setup process and can now start building your recruitment pipeline.
      </p>
    </div>
  );
};

export default CelebrationHeader;