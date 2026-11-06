# 🛡️ CyberShield AI — Personal Cybersecurity Awareness & Safety Platform

> **"Stay Safe. Stay Smart. Stay Protected."**

**CyberShield AI** is a modern, responsive, and gamified cybersecurity education and personal defense platform built for students, educators, and everyday internet users. Designed with a high-tech dark navy cyber aesthetic and electric neon gradients, the platform provides practical, interactive tools to cultivate digital hygiene, spot deceptive scams, and strengthen online defenses without exposing personal data.

---

## ✨ Features & Modules

### 1. 📊 Home Security Dashboard
- **Security Readiness Score**: Dynamic 0–100 composite defense score calculated from your checklist hygiene (45%), completed learning hub lessons (30%), and best quiz performance (25%).
- **Defense Tier Hierarchy**: Progress from *Cyber Recruit (Level 1)* to *Security Defender*, *Shield Sentinel*, and ultimately *Cyber Shield Master (Level 4 - Fortified)*.
- **Activity & Milestone Trackers**: Real-time progress bars for learning modules, checklist milestones, and streak counters.
- **Quick-Access Command Cards**: One-click navigation to all cybersecurity tools.

### 2. 🔑 Password Strength Analyzer
- **Real-Time Client-Side Entropy**: Analyzes password length, uppercase letters, lowercase letters, numbers, and special symbols using Shannon Entropy ($H = L \times \log_2(\text{poolSize})$).
- **Brute-Force Crack Time Estimation**: Demonstrates how GPU clusters tackle weak vs. passphrase-length secrets.
- **Vulnerability & Common Pattern Detection**: Detects dictionary sequences (`password`, `qwerty`), repeated characters, and predictable sequential numbers.
- **Cryptographic Password Generator**: Generates 8–32 character cryptographically randomized passwords in your browser.
- **100% Zero-Transmission Privacy**: Passwords are never sent across the network, never logged, and never stored.

### 3. 🎣 Phishing & URL Awareness Scanner
- **Heuristic Pattern Engine**: Evaluates pasted messages, emails, and links against common phishing indicators:
  - High-urgency manipulative language (*"Account suspended within 24 hours"*).
  - Credential harvesting triggers (*"Enter your OTP"*, *"Verify CVV / seed phrase"*).
  - Suspicious top-level domains (`.xyz`, `.top`, `.buzz`, `.cfd`, `.click`, `.surf`).
  - Raw numeric IP addresses used as web hosts.
  - Typo-squatted and brand-impersonating hostnames (e.g. `paypa1`, `netfIix-verify`).
- **Preloaded Real-World Scenarios**: Test instant simulations of fake bank SMS alerts, streaming subscription payment failures, crypto giveaways, and legitimate order baselines.
- **Safe Evaluation Protocol**: Heuristics are computed completely offline; links are **never opened or queried** over the network.
- **Educational Notice**: Explicitly labeled as a learning heuristic, not an infallible malware scanner.

### 4. 🧠 Cybersecurity Knowledge Quiz
- **18 Comprehensive Questions**: Spanning phishing psychology, password management, OTP confidentiality, malware & ransomware, public Wi-Fi security, online privacy, and social engineering.
- **Immediate Educational Feedback**: Displays instant explanations for both correct and incorrect options, reinforcing why the safe behavior matters.
- **Category Filter Tabs**: Focus on specific topics or take the full 18-question comprehensive challenge.
- **Streak Tracker & Confetti**: Fire celebration confetti when achieving a 70%+ score.
- **Attempt History**: Locally logs past quiz attempts with timestamps and score percentages.

### 5. 📚 Cybersecurity Learning Hub
- **6 Beginner-Friendly Guided Lessons**:
  1. **Ethical Hacking Basics**: White Hat vs. Black Hat vs. Gray Hat, penetration testing ethics, and responsible disclosure.
  2. **Network Security & Safe Browsing**: Packet transmission, HTTPS encryption, firewalls, and rogue Wi-Fi hotspots.
  3. **Phishing & Social Engineering**: Deceptive psychology, spear phishing, smishing (SMS), and vishing (voice).
  4. **Malware, Ransomware & Viruses**: Trojans, spyware keyloggers, ransomware defense, and the 3-2-1 backup strategy.
  5. **Password & Authentication Security**: Dictionary attacks, credential stuffing, password managers, and multi-factor authentication (MFA).
  6. **Online Privacy & Digital Footprint**: Data brokers, browser fingerprinting, EXIF photo metadata, and permission audits.
- **Structured Pedagogy**: Every lesson includes a **Core Definition**, **Intuitive Analogy**, **Key Terminology**, **Real-World Case Study**, **Common Attack Vectors**, **Actionable Safety Tips**, and **Key Takeaways**.
- **Lesson Completion Tracking**: Mark lessons complete or resume your curriculum at any time.

### 6. 💡 Daily Security Tips
- **Categorized Defense Tips**: Filter actionable recommendations across:
  - 🔑 Password Safety
  - 🌐 Social Media Privacy
  - ✉️ Email Security
  - 📱 Mobile Device Hygiene
  - 📶 Public Wi-Fi Defense
- **Tip of the Day Spotlight**: Automatically highlighted daily habit with practical examples.
- **Copy & Bookmark System**: Bookmark favorite tips to your personal vault or copy advice to clipboard for sharing with friends and family.

### 7. ✅ Personal Security Checklist
- **Interactive Hardening Items**:
  - *Use Strong, Unique Passwords for Every Account*
  - *Enable Two-Factor Authentication (2FA) Everywhere*
  - *Keep OTPs Strictly Private (Never share codes)*
  - *Keep Operating Systems, Apps & Browsers Updated*
  - *Avoid Suspicious Links & Unknown Attachments*
  - *Review Account Privacy Settings & App Permissions*
  - *Maintain Offline & Cloud Backups of Crucial Data*
- **Expandable Step-by-Step Guides**: Deep dive into *Why This Safeguard Matters*, numbered action instructions, and recommended free/open-source tools (Bitwarden, KeePassXC, 2FAS, HaveIBeenPwned).
- **Completion Percentage**: Directly updates your overall defense readiness score.

### 8. 🤖 Cyber Learning Assistant
- **Conversational Tutor**: Ask questions in plain English to receive beginner-friendly guidance.
- **Curated Knowledge Base**: Fast, offline responses covering phishing, 2FA, password managers, public Wi-Fi, VPNs, OTPs, malware types, and social engineering.
- **Transparent Demo Labeling**: Clearly identified as a built-in educational demo that operates 100% offline without mandatory API keys.
- **Pluggable AI Key Configuration**: Provides an optional settings modal where users can safely input a Google Gemini API key into client-side LocalStorage without exposing keys to a third party.

### 9. ℹ️ About & Transparency
- **Platform Mission**: Demystifying cyber hygiene for non-technical users.
- **Architectural Specs**: Complete technical breakdown and capability matrix.
- **Ethical Disclaimer**: Educational guardrails ensuring no offensive hacking tools or false security guarantees.
- **Data Management**: Clean button to reset local state for demonstrations or workshops.

---

## 🛠️ Technology Stack

| Layer | Technology |
|---|---|
| **Framework** | [React 19](https://react.dev/) |
| **Bundler & Dev Server** | [Vite 8](https://vite.dev/) |
| **Styling** | Custom Cyber Glassmorphism CSS with CSS Variables |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **Animation & Effects** | [Canvas Confetti](https://www.npmjs.com/package/canvas-confetti) |
| **State & Storage** | React Context API + Browser LocalStorage |
| **Linting & Code Quality** | [Oxlint](https://oxc.rs/) |

---

## 🔒 Security & Privacy Guarantees

CyberShield AI adheres to strict privacy-by-design standards:
1. **Zero External Data Exfiltration**: Entered passwords, pasted message snippets, and progress states never leave the user's browser.
2. **No Analytics or Telemetry Trackers**: No third-party ad pixels, session recording, or analytics libraries.
3. **Purely Defensive Scope**: Contains no exploit payloads, network scanners, password crackers, or offensive tools.
4. **Offline Resilience**: Default features, quizzes, and the learning assistant function seamlessly without an active internet connection after initial asset caching.

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (version 18.0.0 or higher recommended)
- `npm` (bundled with Node.js)

### Installation
1. Clone the repository or navigate to the project directory:
   ```bash
   cd CyberShield-AI
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Running Locally in Development
Start the Vite development server with Hot Module Replacement (HMR):
```bash
npm run dev
```
Open your browser and navigate to the local URL (typically `http://localhost:5173/`).

### Building for Production
Create an optimized production build:
```bash
npm run build
```
The compiled output will be generated inside the `dist/` directory.

### Previewing the Production Build
Preview the generated production build locally:
```bash
npm run preview
```

### Running Code Quality Checks
Run Oxlint across all JavaScript and JSX source files:
```bash
npm run lint
```

---

## 🌐 Deployment to Vercel

The application is pre-configured for one-click deployment on [Vercel](https://vercel.com):

1. **Push your code to GitHub, GitLab, or Bitbucket**.
2. **Log into Vercel** and click **"Add New Project"**.
3. **Import your repository**.
4. Vercel will automatically detect the Vite build settings:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
5. The included [`vercel.json`](./vercel.json) automatically handles single-page application (SPA) rewrites to `/index.html`.
6. Click **Deploy**!

---

## 📱 Responsive Layout & Breakpoints
- **Desktop (1024px+)**: Sidebar navigation with fixed command panel, multi-column metric grids, and spacious glassmorphism cards.
- **Tablet (840px–1023px)**: Compact padding, fluid card grids, and responsive charts.
- **Mobile (< 840px)**: Collapsible slide-out drawer menu, full-width touch-friendly tap targets, and streamlined vertical stacks.

---

## 📄 License & Disclaimer

CyberShield AI is an open educational resource created for educational and cyber awareness purposes. It does not replace professional enterprise security consulting or commercial endpoint protection.

Licensed under the [MIT License](./LICENSE). Stay safe and secure online!
