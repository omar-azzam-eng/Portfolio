import { PageLayout } from './layout/PageLayout';
import { ContactSection } from './sections/ContactSection';
import { EducationSection } from './sections/EducationSection';
import { ExperienceSection } from './sections/ExperienceSection';
import { HeroSection } from './sections/HeroSection';
import { ProfileSection } from './sections/ProfileSection';
import { SkillsSection } from './sections/SkillsSection';
import { WorkSection } from './sections/WorkSection';
import './styles.css';

export default function App() {
  return (
    <PageLayout>
      <HeroSection />
      <WorkSection />
      <ProfileSection />
      <ExperienceSection />
      <SkillsSection />
      <EducationSection />
      <ContactSection />
    </PageLayout>
  );
}
