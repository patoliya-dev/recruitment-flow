import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const TrustSignals = () => {
  const testimonials = [
  {
    id: 1,
    name: "Sarah Mitchell",
    role: "Head of Talent Acquisition",
    company: "TechVentures Inc.",
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_16e75c406-1763294340369.png",
    avatarAlt: "Professional headshot of Caucasian woman with blonde hair in navy blazer smiling warmly at camera",
    quote: "RecruitFlow reduced our time-to-hire by 40%. The AI matching is incredibly accurate and saves us countless hours of screening.",
    rating: 5
  },
  {
    id: 2,
    name: "Marcus Johnson",
    role: "Recruitment Manager",
    company: "Global Solutions Ltd.",
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1f23d9c3d-1763295425663.png",
    avatarAlt: "Professional headshot of African American man with short hair in gray suit with confident smile",
    quote: "The collaborative features make it easy for our entire hiring team to stay aligned. Best recruitment platform we\'ve used.",
    rating: 5
  },
  {
    id: 3,
    name: "Emily Chen",
    role: "HR Director",
    company: "StartupHub",
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1357da4d7-1763295904234.png",
    avatarAlt: "Professional headshot of Asian woman with long dark hair in white blouse with friendly expression",
    quote: "Setup was incredibly smooth. We posted our first job within 10 minutes and had qualified candidates applying within hours.",
    rating: 5
  }];


  const stats = [
  { value: "50K+", label: "Active Recruiters" },
  { value: "2M+", label: "Jobs Posted" },
  { value: "98%", label: "Satisfaction Rate" },
  { value: "40%", label: "Faster Hiring" }];


  const certifications = [
  { icon: "Shield", label: "SOC 2 Certified" },
  { icon: "Lock", label: "GDPR Compliant" },
  { icon: "CheckCircle2", label: "ISO 27001" },
  { icon: "Award", label: "Best HR Tech 2024" }];


  return (
    <div className="space-y-8 md:space-y-12 lg:space-y-16 mb-8 md:mb-12 lg:mb-16">
      <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-lg md:rounded-xl lg:rounded-2xl p-6 md:p-8 lg:p-12">
        <div className="text-center mb-6 md:mb-8 lg:mb-10">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-foreground mb-2 md:mb-3">
            Trusted by Leading Companies
          </h2>
          <p className="text-sm md:text-base lg:text-lg text-muted-foreground">
            Join thousands of recruiters who have transformed their hiring process
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 lg:gap-8 mb-8 md:mb-10 lg:mb-12">
          {stats?.map((stat, index) =>
          <div key={index} className="text-center">
              <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary mb-1 md:mb-2">
                {stat?.value}
              </div>
              <div className="text-xs md:text-sm lg:text-base text-muted-foreground text-caption">
                {stat?.label}
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
          {testimonials?.map((testimonial) =>
          <div
            key={testimonial?.id}
            className="bg-card rounded-lg md:rounded-xl border border-border p-4 md:p-6 lg:p-8">

              <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-4">
                <Image
                src={testimonial?.avatar}
                alt={testimonial?.avatarAlt}
                className="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-full object-cover" />

                <div className="flex-1 min-w-0">
                  <h4 className="text-sm md:text-base lg:text-lg font-medium text-foreground truncate">
                    {testimonial?.name}
                  </h4>
                  <p className="text-xs md:text-sm text-caption text-muted-foreground truncate">
                    {testimonial?.role}
                  </p>
                  <p className="text-xs text-caption text-muted-foreground truncate">
                    {testimonial?.company}
                  </p>
                </div>
              </div>
              
              <div className="flex gap-1 mb-3 md:mb-4">
                {[...Array(testimonial?.rating)]?.map((_, i) =>
              <Icon key={i} name="Star" size={14} color="var(--color-warning)" className="fill-current" />
              )}
              </div>
              
              <p className="text-xs md:text-sm lg:text-base text-muted-foreground leading-relaxed">
                "{testimonial?.quote}"
              </p>
            </div>
          )}
        </div>
      </div>
      <div className="bg-card rounded-lg md:rounded-xl border border-border p-4 md:p-6 lg:p-8">
        <div className="text-center mb-4 md:mb-6 lg:mb-8">
          <h3 className="text-lg md:text-xl lg:text-2xl font-semibold text-foreground mb-2">
            Enterprise-Grade Security & Compliance
          </h3>
          <p className="text-xs md:text-sm lg:text-base text-muted-foreground">
            Your data is protected with industry-leading security standards
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
          {certifications?.map((cert, index) =>
          <div key={index} className="flex flex-col items-center text-center gap-2 md:gap-3">
              <div className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 bg-success/10 rounded-lg md:rounded-xl">
                <Icon name={cert?.icon} size={20} color="var(--color-success)" className="md:w-6 md:h-6" />
              </div>
              <span className="text-xs md:text-sm lg:text-base font-medium text-foreground">
                {cert?.label}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>);

};

export default TrustSignals;