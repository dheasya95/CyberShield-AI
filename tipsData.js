export const TIPS_CATEGORIES = [
  { id: "all", label: "All Tips", icon: "Sparkles" },
  { id: "password", label: "Password Safety", icon: "KeyRound" },
  { id: "social", label: "Social Media", icon: "Share2" },
  { id: "email", label: "Email Security", icon: "Mail" },
  { id: "mobile", label: "Mobile Security", icon: "Smartphone" },
  { id: "wifi", label: "Public Wi-Fi", icon: "Wifi" }
];

export const SECURITY_TIPS = [
  // Password Safety
  {
    id: "tip-pw-1",
    category: "password",
    title: "Switch to 4-Word Passphrases",
    summary: "Combine four random, unrelated words into a long passphrase. It is much easier to remember and orders of magnitude harder for computers to crack than short scrambled symbols.",
    example: "Instead of 'Tr0ub4dor&3', use 'Velvet-Giraffe-Quantum-Pancake!'.",
    impact: "Essential",
    tag: "Passwords"
  },
  {
    id: "tip-pw-2",
    category: "password",
    title: "Never Reuse Your Primary Master Password",
    summary: "Your primary email password and password manager master key must be 100% unique. If one obscure service suffers a data leak, hackers will try that exact key on your email.",
    example: "If an attacker controls your primary email, they can reset every other account you own.",
    impact: "Critical",
    tag: "Passwords"
  },
  {
    id: "tip-pw-3",
    category: "password",
    title: "Adopt an Open-Source Password Manager",
    summary: "Tools like Bitwarden or KeePassXC generate cryptographically strong 20+ character passwords for every website and auto-fill them, eliminating typos and credential reuse.",
    example: "You only need to memorize one strong master passphrase; the vault handles the rest.",
    impact: "High",
    tag: "Tools"
  },

  // Social Media
  {
    id: "tip-sm-1",
    category: "social",
    title: "Delay Real-Time Vacation Check-ins",
    summary: "Never post live location tags or announce that your home is vacant while you are away traveling. Share your vacation memories after you have safely returned home.",
    example: "Broadcasting 'Away in Hawaii for 2 weeks!' alerts local burglars that your residence is unattended.",
    impact: "Essential",
    tag: "Privacy"
  },
  {
    id: "tip-sm-2",
    category: "social",
    title: "Audit Social Media Privacy Settings Annually",
    summary: "Social platforms frequently update privacy defaults. Switch your personal profile from 'Public' to 'Friends / Contacts Only' and restrict who can look you up by phone number.",
    example: "Keep your friend lists, hometown, and birth year hidden from public search engines.",
    impact: "High",
    tag: "Privacy"
  },
  {
    id: "tip-sm-3",
    category: "social",
    title: "Beware of Friend Impersonation Clones",
    summary: "If a friend sends you an urgent DM asking for emergency cash or gift cards because they 'lost their wallet', always call or message them on a separate known channel before reacting.",
    example: "Scammers frequently duplicate public profiles and target mutual followers with financial emergencies.",
    impact: "Critical",
    tag: "Social Eng"
  },

  // Email Security
  {
    id: "tip-em-1",
    category: "email",
    title: "Inspect the Real Header Address Behind Display Names",
    summary: "Attackers can set their display name to 'Bank Customer Support' or 'Netflix Billing', while the actual email address is 'xyz123@compromised-server.biz'. Always expand the sender details.",
    example: "Look for the characters inside < > brackets to verify the authentic sending domain.",
    impact: "Critical",
    tag: "Phishing"
  },
  {
    id: "tip-em-2",
    category: "email",
    title: "Never Open Unsolicited Macro-Enabled Attachments",
    summary: "Be suspicious of attachments with extensions like .docm, .xlsm, .vbs, .iso, or .zip from unknown senders. Office macros can execute remote PowerShell scripts to download spyware.",
    example: "Legitimate invoices are almost universally sent as clean, standard PDF files.",
    impact: "High",
    tag: "Malware"
  },
  {
    id: "tip-em-3",
    category: "email",
    title: "Hover Before You Click",
    summary: "On desktop, hover your mouse over any embedded link or button to preview the real destination URL in the bottom status bar before clicking.",
    example: "A button labeled 'Reset PayPal Password' might secretly point to a deceptive phishing domain.",
    impact: "Essential",
    tag: "Phishing"
  },

  // Mobile Security
  {
    id: "tip-mb-1",
    category: "mobile",
    title: "Hide Sensitive Notification Previews on Lockscreen",
    summary: "Configure your phone settings so notifications hide message contents until your face or fingerprint unlocks the screen. This stops passersby from seeing incoming 2FA verification codes.",
    example: "Settings > Notifications > Show Previews > When Unlocked.",
    impact: "High",
    tag: "Mobile"
  },
  {
    id: "tip-mb-2",
    category: "mobile",
    title: "Revoke Unnecessary App Permissions",
    summary: "Check which installed apps have continuous access to your microphone, camera, contacts, and precise location. Remove permissions from apps that have no legitimate need for them.",
    example: "A flashlight or wallpaper app never needs access to your contacts or microphone.",
    impact: "Essential",
    tag: "Permissions"
  },
  {
    id: "tip-mb-3",
    category: "mobile",
    title: "Avoid Sideloading Apps from Third-Party Repositories",
    summary: "Stick strictly to official app repositories (Google Play, Apple App Store). Third-party APK repositories frequently package popular apps with hidden adware or banking trojans.",
    example: "Modded or cracked versions of Spotify and WhatsApp often leak user sessions.",
    impact: "Critical",
    tag: "Malware"
  },

  // Public Wi-Fi
  {
    id: "tip-wf-1",
    category: "wifi",
    title: "Disable Automatic Wi-Fi Network Joining",
    summary: "Your device constantly broadcasts probe requests searching for networks it previously connected to (like 'Starbucks_Guest'). Attackers can set up rogue devices mimicking those names.",
    example: "Turn off 'Ask to Join Networks' or disable Wi-Fi when moving around in transit.",
    impact: "High",
    tag: "Network"
  },
  {
    id: "tip-wf-2",
    category: "wifi",
    title: "Avoid Banking & Shopping on Open Wi-Fi",
    summary: "If you must make online purchases, enter banking credentials, or submit tax forms while away from home, switch Wi-Fi off and use your phone's cellular data hotspot instead.",
    example: "Cellular data connections are encrypted end-to-end between your device and cell carrier towers.",
    impact: "Critical",
    tag: "Network"
  },
  {
    id: "tip-wf-3",
    category: "wifi",
    title: "Always Use a Trustworthy VPN on Public Hotspots",
    summary: "A Virtual Private Network creates a strongly encrypted tunnel between your device and the VPN server, preventing anyone else on the coffee shop or hotel network from snooping.",
    example: "Look for audited, no-logs VPN services rather than shady '100% free' mobile VPN utilities.",
    impact: "Essential",
    tag: "Tools"
  }
];
