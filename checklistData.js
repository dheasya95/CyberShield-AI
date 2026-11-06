export const CHECKLIST_ITEMS = [
  {
    id: "check-passwords",
    title: "Use Strong, Unique Passwords for Every Account",
    shortTitle: "Strong & Unique Passwords",
    category: "Identity",
    difficulty: "Essential",
    points: 15,
    summary: "Ensure no two online accounts share the same password. Aim for 14+ characters or 4 random words.",
    whyItMatters: "When websites suffer data leaks, cybercriminals use automated bots to test those exact leaked credentials on thousands of other websites (credential stuffing). Reusing one password puts every account at risk.",
    actionSteps: [
      "Audit your most vital accounts (Primary Email, Bank, Social Media, School/Work).",
      "Adopt a reliable password manager (like Bitwarden or 1Password).",
      "Generate a unique 16+ character password or 4-word passphrase for each service.",
      "Never store passwords in plain text files, spreadsheets, or sticky notes."
    ],
    recommendedTools: ["Bitwarden (Free & Open Source)", "KeePassXC", "HaveIBeenPwned"]
  },
  {
    id: "check-2fa",
    title: "Enable Two-Factor Authentication (2FA) Everywhere",
    shortTitle: "Enable Two-Factor Authentication",
    category: "Identity",
    difficulty: "Critical",
    points: 20,
    summary: "Protect your accounts with a second layer of defense using an authenticator app or hardware security key.",
    whyItMatters: "Even if an attacker cracks or buys your password in a dark web dump, they cannot log into your account without physical access to your 2FA authenticator device.",
    actionSteps: [
      "Open your account settings on Google, Apple, Microsoft, GitHub, and banks.",
      "Navigate to Security > Two-Step Verification / 2FA.",
      "Prefer an Authenticator App (TOTP) or Hardware Key over SMS whenever available.",
      "Download and securely store your offline emergency backup recovery codes."
    ],
    recommendedTools: ["Google Authenticator", "Aegis Authenticator (Android)", "2FAS Authenticator", "YubiKey"]
  },
  {
    id: "check-otps",
    title: "Never Share OTPs or Verification Codes with Anyone",
    shortTitle: "Keep OTPs Strictly Private",
    category: "Social Defense",
    difficulty: "Critical",
    points: 15,
    summary: "Treat One-Time Passwords like the keys to your front door. Never read or text them to callers or chat bots.",
    whyItMatters: "Phone scammers use urgency and impersonate banks or utility providers to trick you into reading out the 6-digit code they just triggered to reset your password or transfer funds.",
    actionSteps: [
      "Remember the golden rule: Legitimate companies NEVER call to ask for your OTP.",
      "Read the full SMS accompanying the OTP (it often explicitly says 'Do not share this code with anyone').",
      "If someone asks for a code, hang up immediately and report the number."
    ],
    recommendedTools: ["Direct Bank Hotlines", "Spam Call Blockers (Truecaller)"]
  },
  {
    id: "check-updates",
    title: "Keep Operating Systems, Apps & Browsers Updated",
    shortTitle: "Regular Software Updates",
    category: "System Hygiene",
    difficulty: "Essential",
    points: 15,
    summary: "Enable automatic updates for Windows, macOS, iOS, Android, and your web browsers.",
    whyItMatters: "Over 80% of consumer cyberattacks exploit vulnerabilities that already have a released security patch. Delaying updates leaves known digital doors unlocked for exploit kits.",
    actionSteps: [
      "Turn on automatic updates on your laptop and smartphone.",
      "Check your browser (Chrome, Edge, Firefox, Safari) menu for pending restarts.",
      "Uninstall old apps and browser extensions you no longer use."
    ],
    recommendedTools: ["Windows Update", "macOS Software Update", "Google Play / App Store Auto-Update"]
  },
  {
    id: "check-links",
    title: "Avoid Clicking Suspicious Links & Unknown Attachments",
    shortTitle: "Avoid Suspicious Links",
    category: "Phishing Defense",
    difficulty: "Essential",
    points: 15,
    summary: "Practice zero trust with unexpected emails, texts, and social media DMs promising free gifts or urgent alerts.",
    whyItMatters: "Phishing remains the #1 initial attack vector worldwide. Clicking an infected link or downloading an attachment can silently install ransomware or harvest your credentials.",
    actionSteps: [
      "Inspect the sender's actual email address, not just their display name.",
      "Hover over links to inspect the destination domain before clicking.",
      "If an email warns of an urgent problem with your account, open the official app or website directly rather than using the email link.",
      "Never enable macros in Office documents sent by email."
    ],
    recommendedTools: ["CyberShield Phishing Checker", "VirusTotal.com", "URLScan.io"]
  },
  {
    id: "check-privacy",
    title: "Review Account Privacy Settings & App Permissions",
    shortTitle: "Review Account Privacy",
    category: "Privacy",
    difficulty: "Medium",
    points: 10,
    summary: "Lock down your public social media profiles and remove invasive device permissions.",
    whyItMatters: "Oversharing allows scammers to build detailed profiles on you to answer security questions, craft targeted spear-phishing messages, or track your physical movements.",
    actionSteps: [
      "Set your Instagram, TikTok, and Facebook profiles to private or friends-only.",
      "Remove your phone number and birth date from public visibility.",
      "Go to phone Settings > Privacy > Permission Manager and revoke camera/location access from unnecessary apps."
    ],
    recommendedTools: ["Google Privacy Checkup", "Apple Privacy Report", "DuckDuckGo App Tracking Protection"]
  },
  {
    id: "check-backups",
    title: "Maintain Offline & Cloud Backups of Crucial Data",
    shortTitle: "Data Backups Strategy",
    category: "System Hygiene",
    difficulty: "Medium",
    points: 10,
    summary: "Follow the 3-2-1 backup rule: 3 copies of data, on 2 different media types, with 1 copy stored offsite/offline.",
    whyItMatters: "If ransomware encrypts your device, or if your hard drive fails, having an uninfected offline backup allows you to recover without paying criminals a penny.",
    actionSteps: [
      "Backup personal photos, school projects, and documents to an external hard drive.",
      "Disconnect the external drive when backup finishes so ransomware cannot encrypt it.",
      "Enable encrypted cloud backup for smartphones (iCloud / Google Drive)."
    ],
    recommendedTools: ["External SSD/HDD", "Kopia / Duplicati", "Google Drive / iCloud"]
  }
];
