import { motion, AnimatePresence } from 'framer-motion';
import './ContactModal.css';
import githubIcon from '../../assets/github_icon.webp';
import emailIcon from '../../assets/email_icon.png';
import discordIcon from '../../assets/discord.svg';
import bilibiliIcon from '../../assets/bilibili_icon.png';

// 社交媒体和联系方式
const links = [
  { label: 'GitHub: fengxin02',    url: 'https://github.com/fengxin02',     icon: githubIcon },
  { label: 'Email: jijinyan0201@gmail.com',     url: 'mailto:jijinyan0201@gmail.com',             icon: emailIcon },
  { label: 'Bilibili:風馨',  url: 'https://space.bilibili.com/365515435?spm_id_from=333.1007.0.0',   icon: bilibiliIcon },
  { label: 'Discord: fengxin02',   url: 'https://discord.com/users/fengxin02',            icon: discordIcon },
];

const backdrop = { hidden: { opacity: 0 }, visible: { opacity: 1 } };
const panel = {
  hidden: { opacity: 0, scale: 0.9, y: 20 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', stiffness: 200, damping: 22 } },
  exit:    { opacity: 0, scale: 0.9, y: 20, transition: { duration: 0.15 } },
};

export default function ContactModal({ open, onClose }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="modal-backdrop"
          variants={backdrop}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onClick={onClose}
        >
          <motion.div
            className="modal-panel"
            variants={panel}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="modal-close" onClick={onClose}>✕</button>

            <h2 className="modal-title">Get in Touch</h2>
            <p className="modal-subtitle">Feel free to reach out anytime!</p>

            <div className="modal-links">
              {links.map((l) => (
                <a
                  key={l.label}
                  href={l.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="modal-link"
                >
                  <span className="modal-link-icon"><img src={l.icon} alt={l.label} className="contact-icon" /></span>
                  <span className="modal-link-label">{l.label}</span>
                </a>
              ))}
            </div>

            <p className="modal-footer">
              Or find me elsewhere on the internet — I&apos;m usually @fengxin02
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
