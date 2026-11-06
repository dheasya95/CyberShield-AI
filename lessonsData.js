export const LESSONS_DATA = [
  {
    id: "ethical-hacking",
    title: "Ethical Hacking Basics",
    category: "Fundamentals",
    readTime: "6 min read",
    iconName: "Terminal",
    summary: "Discover how security researchers find and patch vulnerabilities before malicious hackers exploit them.",
    badge: "Essential",
    definition: "Ethical hacking (also called 'white hat hacking') involves authorized testing of computer systems, networks, and applications to discover security flaws so they can be fixed before cybercriminals exploit them.",
    explanation: "Think of an ethical hacker like a professional building security inspector. A bank hires an inspector to try picking their locks, bypassing the alarm system, and checking if back windows were left open. When the inspector finds a weakness, they don't steal anything—they write a comprehensive report detailing how to fix it before real burglars arrive. Ethical hackers use the exact same tools and techniques as malicious attackers, but with strict written permission, legal authorization, and the sole goal of defensive protection.",
    hackerTypes: [
      { name: "White Hat", desc: "Authorized security researchers, defensive engineers, and penetration testers who follow strict codes of ethics.", color: "emerald" },
      { name: "Black Hat", desc: "Criminals who break into systems without authorization for financial gain, espionage, or malicious vandalism.", color: "rose" },
      { name: "Gray Hat", desc: "Individuals who discover vulnerabilities without permission but report them without malicious intent, often demanding a bounty.", color: "amber" }
    ],
    realWorldExample: "In 2021, an ethical researcher found a flaw in a major airline booking system that could allow anyone to view another traveler's boarding pass by simply changing the ticket reference number in the URL. By practicing responsible disclosure, the researcher notified the airline directly, and the bug was patched within 48 hours without any passenger data being stolen.",
    attackVectors: [
      "Reconnaissance (gathering public domain & infrastructure details)",
      "Vulnerability Scanning (using tools like Nmap and OpenVAS)",
      "Penetration Testing (safely attempting controlled exploitation)",
      "Reporting & Remediation (documenting steps to reproduce and remediate)"
    ],
    safetyTips: [
      "Never run penetration testing or scanning tools against any network, website, or device you do not personally own or have written permission to test.",
      "Participate in legal bug bounty programs (HackerOne, Bugcrowd) to practice your skills responsibly.",
      "Use legal practice labs like TryHackMe, HackTheBox, and OverTheWire for hands-on learning.",
      "Understand the computer crime laws in your jurisdiction (such as CFAA or Computer Misuse Acts)."
    ],
    keyTakeaways: [
      "Authorization is the single legal dividing line between ethical hacking and cybercrime.",
      "Responsible disclosure protects regular users by giving organizations time to patch flaws.",
      "Defense in depth (multiple layers of security) is always stronger than relying on a single wall."
    ]
  },
  {
    id: "network-security",
    title: "Network Security & Safe Browsing",
    category: "Infrastructure",
    readTime: "7 min read",
    iconName: "Network",
    summary: "Understand how data travels across the Internet, what firewalls do, and how to stay safe on public Wi-Fi networks.",
    definition: "Network security comprises policies, processes, and technologies designed to protect the integrity, confidentiality, and accessibility of computer networks and data in transit.",
    explanation: "When you browse a website, send a message, or stream a video, your device chops data into thousands of tiny digital packets and sends them bouncing across routers and cables worldwide. Without network security, anyone eavesdropping on that wire or radio frequency could inspect your raw data. Network security creates encrypted tunnels (like HTTPS and VPNs), establishes digital gatekeepers (firewalls), and screens traffic to ensure malicious intruders cannot intercept or alter your communications.",
    hackerTypes: [
      { name: "HTTPS / TLS", desc: "Encrypts the session between your browser and the website, preventing wiretapping and packet tampering.", color: "cyan" },
      { name: "Firewall", desc: "A barrier that monitors incoming and outgoing traffic, blocking unauthorized ports and malicious connections.", color: "purple" },
      { name: "VPN (Virtual Private Network)", desc: "Creates an encrypted tunnel from your device to a secure gateway server, masking your public IP address.", color: "blue" }
    ],
    realWorldExample: "While sitting in a busy coffee shop, an attacker sets up a fake Wi-Fi hotspot named 'Free_Cafe_WiFi'. Unsuspecting customers connect. Because the network lacks encryption and the attacker controls the gateway router, they attempt a Man-in-the-Middle (MITM) attack to capture unencrypted credentials and redirect traffic to fake banking pages.",
    attackVectors: [
      "Man-in-the-Middle (MITM) attacks on unencrypted or spoofed Wi-Fi networks",
      "DNS Spoofing & Cache Poisoning (directing you to a fake IP when typing a real URL)",
      "Port scanning to find open, unpatched network services",
      "DDoS (Distributed Denial of Service) overloading servers with junk traffic"
    ],
    safetyTips: [
      "Always ensure websites use HTTPS (look for https:// in the address bar) before entering any sensitive data.",
      "Never perform financial transactions or login to sensitive portals on open, passwordless public Wi-Fi without a trusted VPN.",
      "Turn off 'Auto-Connect to Open Wi-Fi' on your smartphone and laptop.",
      "Change default admin passwords on your home Wi-Fi router and enable WPA3 or WPA2-AES encryption."
    ],
    keyTakeaways: [
      "Public Wi-Fi is inherently shared; without encryption, your network broadcast is visible to nearby listeners.",
      "HTTPS protects content in transit, but does not guarantee the destination website itself is legitimate.",
      "Keep home router firmware up-to-date to prevent routers from being co-opted into botnets."
    ]
  },
  {
    id: "phishing-attacks",
    title: "Phishing & Social Engineering",
    category: "Human Defense",
    readTime: "8 min read",
    iconName: "Fish",
    summary: "Master the psychology behind deceptive emails, urgent SMS messages, and fake login pages designed to steal credentials.",
    badge: "Critical",
    definition: "Phishing is a form of social engineering where attackers impersonate trustworthy entities (banks, schools, colleagues, popular brands) to trick victims into revealing sensitive information, clicking malicious links, or executing dangerous downloads.",
    explanation: "Technology security controls like firewalls and antivirus have become remarkably resilient. Attackers know it is much harder to break 256-bit AES encryption than it is to trick a stressed or distracted human into voluntarily typing their password. Phishing hacks the human mind using cognitive biases: artificial urgency ('Act within 24 hours!'), fear ('Account suspended!'), authority ('From your Dean / CEO'), or excitement ('You won a free gift card!').",
    hackerTypes: [
      { name: "Spear Phishing", desc: "Highly tailored attacks targeting a specific person or organization using gathered background information.", color: "purple" },
      { name: "Smishing (SMS)", desc: "Phishing carried out via text messages, often pretending to be delivery notifications or bank alerts.", color: "amber" },
      { name: "Vishing (Voice)", desc: "Phone calls using urgency or AI voice clones pretending to be tech support, government agents, or family.", color: "rose" }
    ],
    realWorldExample: "A student receives an SMS saying: 'FedEx: Your package delivery has been put on hold due to unpaid customs fee of $1.50. Click tracking-fedx-support.xyz/pay to avoid return.' Clicking the link opens a page that looks identical to FedEx, asking for full credit card details and OTP.",
    attackVectors: [
      "Lookalike domains (typosquatting like netfIix.com with an uppercase 'i' instead of 'l')",
      "Urgent countdown timers and threatening account suspension language",
      "Requests for One-Time Passwords (OTPs) under the guise of 'account security'",
      "Spoofed sender display names that mask the real sender address"
    ],
    safetyTips: [
      "Never click links in unexpected emails or text messages; navigate directly to official websites or apps yourself.",
      "Check the full domain name in links: look at what comes right before the first single slash (e.g., support.apple.com vs apple-support.com).",
      "Remember that legitimate companies and banks will NEVER ask for your password, PIN, or OTP over chat or email.",
      "When in doubt, contact the organization using a verified phone number from their official website."
    ],
    keyTakeaways: [
      "Urgency is the number one psychological indicator of a phishing scam.",
      "Always inspect the actual sender email address, not just the display name.",
      "A One-Time Password (OTP) is strictly for your eyes only; anyone asking for it is trying to compromise your account."
    ]
  },
  {
    id: "malware-awareness",
    title: "Malware, Ransomware & Viruses",
    category: "Software Safety",
    readTime: "7 min read",
    iconName: "Bug",
    summary: "Learn how malicious software operates, how ransomware holds files hostage, and how to defend your devices.",
    definition: "Malware (short for 'malicious software') is any software intentionally designed to cause damage to a computer, server, client, or computer network, or to covertly steal information.",
    explanation: "Malware is an umbrella term covering many different digital threats. Just as biological viruses need host cells to replicate, computer viruses attach to legitimate software. Trojans pose as harmless utilities (like cracked games or PDF converters) while silently installing backdoors. Ransomware acts like a digital kidnapper, encrypting all your photos and documents so you cannot open them until you pay an untraceable ransom.",
    hackerTypes: [
      { name: "Ransomware", desc: "Encrypts user files with military-grade keys and demands cryptocurrency payments to restore access.", color: "rose" },
      { name: "Spyware / Keylogger", desc: "Silently monitors keyboard presses, takes screen captures, and logs webcam feeds without notification.", color: "amber" },
      { name: "Trojans & Worms", desc: "Trojans disguise as benign software; worms self-replicate across local networks without user interaction.", color: "purple" }
    ],
    realWorldExample: "A user searches online for a free activation crack for expensive video editing software. They download a zip file containing 'setup.exe'. Upon running the installer, an error message pops up saying 'Installation Failed'. In the background, an info-stealer malware extracts all saved Chrome passwords, crypto wallets, and browser cookies and uploads them to a remote server.",
    attackVectors: [
      "Pirated software, game torrents, and fake media player codec downloads",
      "Malicious email attachments disguised as invoices (.exe, .scr, .vbs, or macro-enabled .docm)",
      "Drive-by downloads from compromised websites exploiting browser vulnerabilities",
      "Unpatched software vulnerabilities (Zero-Day vulnerabilities)"
    ],
    safetyTips: [
      "Never download cracked games, pirated software, or key generators—they are the leading source of consumer malware.",
      "Enable automatic operating system (Windows/macOS) and browser updates to patch known security vulnerabilities.",
      "Keep Windows Defender or a reputable antivirus enabled and active.",
      "Maintain offline backups (e.g., on an external drive disconnected after backup) to safeguard against ransomware."
    ],
    keyTakeaways: [
      "If a digital product normally costs $100 and a website offers it for 'free', your device and data are the product.",
      "Antivirus is vital, but safe digital habits remain your most reliable defense.",
      "Offline, disconnected backups make ransomware attacks completely ineffective against you."
    ]
  },
  {
    id: "password-security",
    title: "Password & Authentication Security",
    category: "Identity Defense",
    readTime: "6 min read",
    iconName: "KeyRound",
    summary: "Discover why password reuse is devastating, how hackers crack passwords, and how password managers & 2FA protect you.",
    badge: "Essential",
    definition: "Authentication security refers to the mechanisms used to verify that an individual or system is who they claim to be, primarily through passwords, multi-factor authentication (MFA), and passkeys.",
    explanation: "Imagine having a single physical key that unlocks your front door, your car, your school locker, your bank vault, and your office. If someone makes an unauthorized copy of that one key, every single aspect of your life is compromised simultaneously. This is exactly what happens when you reuse passwords. In credential stuffing attacks, hackers take leaked password lists from obscure, breached websites and feed them into automated bots testing thousands of popular sites (Gmail, Instagram, PayPal) within seconds.",
    hackerTypes: [
      { name: "Brute Force Attack", desc: "Automated software testing trillions of character combinations until finding the match.", color: "amber" },
      { name: "Dictionary Attack", desc: "Testing word lists containing millions of commonly used words, substitutions (P@ssw0rd), and names.", color: "blue" },
      { name: "Credential Stuffing", desc: "Using leaked username/password combos from one breached company against hundreds of other websites.", color: "rose" }
    ],
    realWorldExample: "A minor gaming forum suffered a data leak in 2022 where 100,000 user passwords were stolen in plain text. An attacker downloaded the leak and programmed a bot to test those email and password combinations against Spotify, Netflix, and Amazon. Because 40% of users reused the same password, thousands of accounts were taken over without any direct hack of Spotify or Amazon.",
    attackVectors: [
      "Password reuse across multiple web services",
      "Using short passwords (< 12 characters) susceptible to rapid GPU cracking",
      "Predictable patterns (e.g., Capital letter first + Word + 2 digits + exclamation mark: 'Summer2024!')",
      "Falling victim to fake login portals that intercept authentication tokens"
    ],
    safetyTips: [
      "Use long passphrases made of 4+ unrelated words (e.g., 'CorrectHorseBatteryStaple' or 'PurpleKangarooDancingGalaxy!').",
      "Never reuse the same password across more than one website or service.",
      "Use a reputable free, open-source or trusted password manager (Bitwarden, 1Password, KeePassXC).",
      "Enable Two-Factor Authentication (2FA) with an authenticator app (Google Authenticator, Aegis, 2FAS) instead of SMS whenever possible."
    ],
    keyTakeaways: [
      "Length beats complexity: 16 simple random characters take centuries longer to crack than 8 complex ones.",
      "A password manager allows you to have a unique 20-character password for every site while only remembering one master password.",
      "Two-Factor Authentication prevents over 99% of automated credential stuffing attacks."
    ]
  },
  {
    id: "online-privacy",
    title: "Online Privacy & Digital Footprint",
    category: "Privacy Defense",
    readTime: "7 min read",
    iconName: "ShieldAlert",
    summary: "Take control of your personal data, understand web trackers, manage app permissions, and minimize your exposure.",
    definition: "Online privacy is the level of privacy and protection an individual has regarding their personal, financial, and behavioral data while interacting with the Internet.",
    explanation: "Whenever you navigate the web, install smartphone apps, or post on social media, you leave behind an invisible trail called a 'digital footprint'. Commercial data brokers and advertising networks collect your IP address, device specs, location history, browsing habits, and purchase patterns to create an intricate psychological profile of you. This data is not just used for targeted advertising—it can be sold, exposed in data breaches, or exploited by malicious actors for spear phishing and identity theft.",
    hackerTypes: [
      { name: "Data Brokers", desc: "Companies that aggregate public records, purchase histories, and online activity into sellable dossiers.", color: "amber" },
      { name: "Browser Fingerprinting", desc: "Identifying your unique device using screen resolution, installed fonts, GPU, and browser plugins.", color: "purple" },
      { name: "EXIF Metadata", desc: "Hidden information embedded inside photos (GPS coordinates, camera model, exact timestamp).", color: "cyan" }
    ],
    realWorldExample: "A user posts an innocent photo of their new puppy on social media while sitting on their front porch. Unknown to them, the photo file contains EXIF metadata with exact GPS coordinates down to 2 meters. An online stalker downloads the photo, reads the location data, and discovers the user's home address within minutes.",
    attackVectors: [
      "Third-party tracking cookies following you across the web",
      "Smartphone apps requesting excessive permissions (e.g., calculator asking for contacts and microphone)",
      "Oversharing on social media (birthdays, pet names, family members, location tags)",
      "Unsecured public profiles indexing your personal details on search engines"
    ],
    safetyTips: [
      "Audit your smartphone app permissions: revoke microphone, camera, contacts, and precise location access from apps that do not require them.",
      "Use privacy-focused browsers or ad/tracker blockers (uBlock Origin, Brave, Firefox with Enhanced Tracking Protection).",
      "Strip EXIF metadata from photos before uploading to public forums or use social apps that strip them automatically.",
      "Never post answers to common security questions (first school, mother's maiden name, childhood street) on public social media quizzes."
    ],
    keyTakeaways: [
      "Once information is published to the Internet, it is virtually impossible to permanently delete.",
      "Free online services monetize by turning your behavioral data into their product.",
      "Limiting what you share online dramatically reduces the risk of targeted social engineering."
    ]
  }
];
