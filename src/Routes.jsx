import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import WelcomeGettingStarted from './pages/welcome-getting-started';
import JobRequirementsDetails from './pages/job-requirements-details';
import CompanyInformationSetup from './pages/company-information-setup';
import JobPostingCreation from './pages/job-posting-creation';
import EmailVerification from './pages/email-verification';
import CompanyLogoAndBranding from './pages/company-logo-and-branding';
import JobPreviewConfirmation from './pages/job-preview-confirmation';
import OnboardingSuccess from './pages/onboarding-success';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<EmailVerification />} />
        <Route path="/welcome-getting-started" element={<WelcomeGettingStarted />} />
        <Route path="/job-requirements-details" element={<JobRequirementsDetails />} />
        <Route path="/company-information-setup" element={<CompanyInformationSetup />} />
        <Route path="/job-posting-creation" element={<JobPostingCreation />} />
        <Route path="/email-verification" element={<EmailVerification />} />
        <Route path="/company-logo-and-branding" element={<CompanyLogoAndBranding />} />
        <Route path="/job-preview-confirmation" element={<JobPreviewConfirmation />} />
        <Route path="/onboarding-success" element={<OnboardingSuccess />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
