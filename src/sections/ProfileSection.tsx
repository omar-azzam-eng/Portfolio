import { Database, Network, Radio, ShieldCheck } from 'lucide-react';
import { Reveal } from '../ui/Reveal';
import { SectionTitle } from '../ui/SectionTitle';

const TITLE_ID = 'profile-title';

const IDENTITY_PILLARS = [
  { icon: Network, label: 'Architecture', text: 'Modular systems with clean boundaries and maintainable service design.' },
  { icon: ShieldCheck, label: 'API Engineering', text: 'Secure REST APIs, validation, authentication, and authorization flows.' },
  { icon: Database, label: 'Data Layer', text: 'Relational modeling with PostgreSQL and TypeORM, plus MongoDB experience.' },
  { icon: Radio, label: 'Real-time', text: 'WebSocket-driven updates for responsive, event-aware backend systems.' },
] as const;

export function ProfileSection() {
  return (
    <section id="profile" className="section profile-section" aria-labelledby={TITLE_ID}>
      <div className="identity-title-wrap">
        <SectionTitle id={TITLE_ID} number="02" eyebrow="Backend Identity" title="Designed for the part users never see." />
      </div>

      <div className="profile-layout">
        <Reveal className="statement">
          <p>Backend developer with <strong>2+ years</strong> of hands-on experience building scalable, secure, production-ready systems.</p>
        </Reveal>
        <Reveal className="profile-copy" delay={0.08}>
          <p>Experienced with Node.js, Express, TypeScript, PostgreSQL, RESTful APIs, relational database design, authentication, authorization, and real-time WebSocket features.</p>
          <p>Comfortable taking backend features from system design and database modeling through implementation, integration, optimization, and deployment.</p>
        </Reveal>
      </div>

      <div className="identity-pillars" aria-label="Backend engineering focus areas">
        {IDENTITY_PILLARS.map(({ icon: Icon, label, text }, index) => (
          <Reveal key={label} className="identity-pillar" delay={index * 0.045}>
            <div className="identity-pillar-icon" aria-hidden="true"><Icon size={18} /></div>
            <span>{String(index + 1).padStart(2, '0')}</span>
            <h3>{label}</h3>
            <p>{text}</p>
          </Reveal>
        ))}
      </div>

    </section>
  );
}
