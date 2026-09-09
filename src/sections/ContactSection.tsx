import { ArrowUpRight, Mail, Phone } from 'lucide-react';
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';

export function ContactSection() {
  return (
    <footer id="contact" className="contact-section" aria-labelledby="contact-title">
      <div className="contact-grid" aria-hidden="true" />
      <p className="eyebrow">06 / OPEN CONNECTION</p>
      <h2 id="contact-title">
        Have a system
        <br />
        that needs to <em>scale?</em>
      </h2>
      <p className="contact-intro">
        I build the infrastructure behind products — from API design and databases to authentication
        and real-time features.
      </p>
      <div className="contact-links">
        <a href="mailto:omar.azzam.eng@gmail.com" data-cursor="SEND EMAIL">
          <Mail aria-hidden="true" />
          <span>omar.azzam.eng@gmail.com</span>
          <ArrowUpRight aria-hidden="true" />
        </a>
        <a href="tel:+963959984200" data-cursor="CALL OMAR">
          <Phone aria-hidden="true" />
          <span>+963 959 984 200</span>
          <ArrowUpRight aria-hidden="true" />
        </a>
        <a
          href="https://github.com/omar-azzam-eng"
          target="_blank"
          rel="noreferrer"
          data-cursor="OPEN SITE"
        >
          <FaGithub className="github" aria-hidden="true" />
          <span>Github</span>
          <ArrowUpRight aria-hidden="true" />
        </a>
        <a
          href="https://www.linkedin.com/in/omar-azzam-83824536b/"
          target="_blank"
          rel="noreferrer"
          data-cursor="OPEN SITE"
        >
          <FaLinkedin className="github" aria-hidden="true" />
          <span>LinkedIn</span>
          <ArrowUpRight aria-hidden="true" />
        </a>
        <a
          href="https://www.instagram.com/omar.azzam.eng/"
          target="_blank"
          rel="noreferrer"
          data-cursor="OPEN SITE"
        >
          <FaInstagram className="github" aria-hidden="true" />
          <span>Instagram</span>
          <ArrowUpRight aria-hidden="true" />
        </a>
      </div>
      <div className="footer-bottom">
        <span>OMAR AZZAM © {new Date().getFullYear()}</span>
        <a href="#top">
          BACK TO TOP <ArrowUpRight size={16} aria-hidden="true" />
        </a>
      </div>
    </footer>
  );
}
