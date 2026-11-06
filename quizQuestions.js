export const QUIZ_QUESTIONS = [
  {
    id: 1,
    category: "Phishing",
    difficulty: "Beginner",
    question: "You receive an urgent SMS stating: 'Your bank account is suspended! Click http://my-secure-bank-support.xyz/verify immediately to avoid permanent closure.' What should you do?",
    options: [
      "Click the link right away to see if your funds are safe",
      "Reply with 'STOP' to verify if the number is legitimate",
      "Ignore and delete the SMS, or verify directly by calling the official phone number on your bank card",
      "Forward the SMS along with your account number to customer support"
    ],
    correctIndex: 2,
    explanation: "Banks never send urgent messages with suspicious non-official domains (.xyz) threatening instant account closure. Never click links in unexpected messages. Always verify directly through official channels like the phone number on the back of your card."
  },
  {
    id: 2,
    category: "Passwords",
    difficulty: "Beginner",
    question: "Which of the following is generally considered the STRONGEST password?",
    options: [
      "P@ssw0rd2024!",
      "correct-horse-battery-staple-92",
      "qwertyuiop123456",
      "MyNameIsJohnDoe1!"
    ],
    correctIndex: 1,
    explanation: "Length combined with unpredictable entropy makes passphrases extremely resilient. While 'P@ssw0rd2024!' uses symbols, it follows common predictable substitution patterns easily guessed by modern GPU dictionary attacks. A long 31-character passphrase would take centuries to brute-force."
  },
  {
    id: 3,
    category: "OTP Safety",
    difficulty: "Beginner",
    question: "A friendly caller claims to be from your mobile network provider offering a 50% discount on your monthly bill. They say: 'I just sent a 6-digit confirmation code to your phone, please read it back to confirm.' What should you do?",
    options: [
      "Read the code quickly before it expires to secure the discount",
      "Refuse and hang up immediately; never share One-Time Passwords (OTPs) with anyone",
      "Ask them to confirm your full name and address first before giving the code",
      "Send the code via text message instead of speaking it out loud"
    ],
    correctIndex: 1,
    explanation: "Legitimate company representatives will NEVER ask for a One-Time Password (OTP) or authentication code. The caller is triggering a password reset or unauthorized charge on your account and needs that OTP to bypass your two-factor security!"
  },
  {
    id: 4,
    category: "Wi-Fi Security",
    difficulty: "Intermediate",
    question: "You are at an airport and notice an open Wi-Fi network called 'Airport_Free_HighSpeed_WiFi' requiring no password. What is the safest way to use the internet?",
    options: [
      "Log into your mobile banking app to check your balance since it is a trusted airport",
      "Turn off your firewall so the connection runs faster",
      "Use cellular data or connect through a reputable Virtual Private Network (VPN)",
      "Browse unencrypted HTTP sites because they load quicker"
    ],
    correctIndex: 2,
    explanation: "Unencrypted public Wi-Fi networks can easily be spoofed by attackers using 'Evil Twin' rogue access points. If you must use public Wi-Fi, always route your connection through a trusted VPN or use your cellular mobile hotspot for sensitive transactions."
  },
  {
    id: 5,
    category: "Malware",
    difficulty: "Beginner",
    question: "You want to play a popular $60 video game for free. A website offers a 'free cracked version' packaged as an executable file 'GameSetup_Crack.exe'. What is the most likely risk?",
    options: [
      "The game will simply crash due to low graphics settings",
      "It will secretly install an info-stealer or trojan to compromise your passwords and system",
      "Your monitor might get physically damaged",
      "Windows will automatically convert the file into an open-source license"
    ],
    correctIndex: 1,
    explanation: "Pirated software and cracks are the single most common distribution mechanism for trojans, info-stealers, and ransomware aimed at consumers. Cybercriminals use high-demand games and software as bait."
  },
  {
    id: 6,
    category: "Social Engineering",
    difficulty: "Intermediate",
    question: "An email arrives appearing to be from your school or company IT department titled 'Mandatory Server Upgrade'. It asks you to reply with your current username and password to keep your email mailbox active. What is this an example of?",
    options: [
      "A standard annual security audit",
      "A spear phishing / credential harvesting attack",
      "A distributed denial of service attack",
      "A benign system diagnostic test"
    ],
    correctIndex: 1,
    explanation: "No legitimate IT department will ever ask you to send your password via email. This is a classic credential harvesting tactic that leverages authority and fear of losing account access."
  },
  {
    id: 7,
    category: "Privacy",
    difficulty: "Beginner",
    question: "Why is it dangerous to answer viral social media posts like 'What was your first car + your mother's maiden name = your rockstar name'?",
    options: [
      "It consumes too much mobile data",
      "It tricks you into answering common account security recovery questions",
      "It automatically subscribes your phone to premium SMS services",
      "It sends your browser history to advertising firms"
    ],
    correctIndex: 1,
    explanation: "Social media 'get-to-know-you' memes and quizzes are often crafted by social engineers to harvest answers to common password recovery questions (e.g., mother's maiden name, pet's name, first school, hometown)."
  },
  {
    id: 8,
    category: "Authentication",
    difficulty: "Intermediate",
    question: "Which form of Two-Factor Authentication (2FA) is generally considered the MOST secure against interception?",
    options: [
      "SMS text message codes",
      "Voice call automated codes",
      "Hardware security keys (such as FIDO2 / YubiKey) or authenticator apps",
      "Email verification codes"
    ],
    correctIndex: 2,
    explanation: "Hardware security keys (FIDO2/WebAuthn) and authenticator apps (TOTP) are immune to SIM-swapping attacks. SMS and voice codes can be intercepted if an attacker tricks your carrier into transferring your phone number to their SIM card."
  },
  {
    id: 9,
    category: "Malware",
    difficulty: "Intermediate",
    question: "What is 'Ransomware'?",
    options: [
      "Software that constantly displays popup advertisements",
      "Malware that encrypts your personal files and demands payment to restore access",
      "A utility tool that tracks network bandwidth",
      "A legal software subscription service"
    ],
    correctIndex: 1,
    explanation: "Ransomware uses strong cryptographic algorithms to lock victims' files and demands ransom payments (often in cryptocurrency) in exchange for the decryption key. Maintaining regular offline backups is the best defense."
  },
  {
    id: 10,
    category: "Phishing",
    difficulty: "Intermediate",
    question: "Look at this URL carefully: https://accounts.google.com.security-verify.net/login. What is the actual primary domain you are visiting?",
    options: [
      "google.com",
      "accounts.google.com",
      "security-verify.net",
      "com.security-verify.net"
    ],
    correctIndex: 2,
    explanation: "In a URL, the actual destination domain is the portion immediately preceding the top-level domain and the first single slash (path). Here, 'accounts.google.com' is merely a deceptive subdomain created on the malicious attacker-owned domain 'security-verify.net'."
  },
  {
    id: 11,
    category: "Privacy",
    difficulty: "Beginner",
    question: "What is the primary privacy risk of leaving 'Location Services' always enabled for all mobile apps?",
    options: [
      "Your battery will explode",
      "Apps can continuously track and profile your real-world movements and habits",
      "Your phone will automatically connect to paid satellite networks",
      "It prevents your phone from receiving incoming phone calls"
    ],
    correctIndex: 1,
    explanation: "Continuous background location tracking allows advertising networks and data brokers to construct detailed daily movement profiles, showing where you live, work, attend school, and spend time."
  },
  {
    id: 12,
    category: "Software Safety",
    difficulty: "Beginner",
    question: "Why should you regularly install software, operating system, and browser updates as soon as they become available?",
    options: [
      "Only to get the newest icons and design themes",
      "They patch known security vulnerabilities that cybercriminals actively exploit",
      "To automatically delete your old photos and save storage space",
      "Because older software is legally required to stop running"
    ],
    correctIndex: 1,
    explanation: "Software updates frequently include critical security patches. When developers discover a flaw, attackers also learn about it. Delaying updates leaves your system exposed to automated exploit kits targeting known vulnerabilities."
  },
  {
    id: 13,
    category: "Passwords",
    difficulty: "Intermediate",
    question: "What is 'Credential Stuffing'?",
    options: [
      "Memorizing multiple passwords by repeating them out loud",
      "An automated cyberattack where stolen username/password lists are tested across hundreds of other popular websites",
      "Saving your passwords in a notebook inside your desk drawer",
      "Creating passwords that contain food or grocery words"
    ],
    correctIndex: 1,
    explanation: "Credential stuffing relies on the human habit of password reuse. Attackers take billions of leaked credentials from breaches and use automated scripts to try logging into Amazon, PayPal, social media, and banking portals."
  },
  {
    id: 14,
    category: "Social Engineering",
    difficulty: "Advanced",
    question: "What does 'Shoulder Surfing' mean in physical cybersecurity?",
    options: [
      "Looking over someone's shoulder while they type their PIN, password, or sensitive details",
      "Carrying a laptop bag over your shoulder on public transportation",
      "Using a wireless mouse with shoulder gestures",
      "Hacking into a company's CCTV cameras"
    ],
    correctIndex: 0,
    explanation: "Shoulder surfing is a direct observation technique where an attacker observes personal data, keystrokes, or screen contents over your shoulder in public spaces like ATMs, cafes, or public transit."
  },
  {
    id: 15,
    category: "Wi-Fi Security",
    difficulty: "Intermediate",
    question: "What does the 'HTTPS' lock icon in your browser address bar guarantee?",
    options: [
      "That the website is 100% trustworthy and could not possibly be a phishing scam",
      "That the communication between your browser and that server is encrypted and protected from eavesdroppers",
      "That the website has been vetted and approved by law enforcement",
      "That your computer is protected from all viruses"
    ],
    correctIndex: 1,
    explanation: "HTTPS confirms your connection to the server is encrypted and cannot be tampered with in transit. However, phishing websites can and do use valid HTTPS certificates! Always check the domain name itself."
  },
  {
    id: 16,
    category: "Malware",
    difficulty: "Intermediate",
    question: "What is a 'Zero-Day Vulnerability'?",
    options: [
      "A software bug that takes zero days to fix",
      "A security flaw known to attackers or researchers before the software developer has released a patch",
      "A computer virus that deletes itself at midnight",
      "A trial version of an antivirus program that lasts zero days"
    ],
    correctIndex: 1,
    explanation: "A Zero-Day is a vulnerability that is unknown to the software vendor or for which zero days of patching protection exist. Once publicly discovered or exploited, developers race against time to deploy an emergency update."
  },
  {
    id: 17,
    category: "Privacy",
    difficulty: "Beginner",
    question: "What does using your browser's 'Incognito' or 'Private Browsing' mode actually do?",
    options: [
      "It makes you 100% invisible to your Internet Service Provider, school, and government",
      "It prevents your local browser from saving your history, cookies, and form data after you close the window",
      "It completely hides your IP address and encrypts all network traffic",
      "It protects you from any malware downloads"
    ],
    correctIndex: 1,
    explanation: "Incognito mode only wipes your local browsing history, cache, and cookies on your device once the window is closed. Your internet service provider, network administrators (like school or work Wi-Fi), and the websites you visit can still see your IP and traffic."
  },
  {
    id: 18,
    category: "OTP Safety",
    difficulty: "Intermediate",
    question: "You receive an unexpected password reset email with a verification code for an account you didn't touch today. What does this mean?",
    options: [
      "Your computer must be completely infected with a rootkit",
      "Someone may be trying to access your account or mistyped your username; do not click any link or approve the request",
      "You should immediately reply to the email with your current password to prove ownership",
      "Your account has already been permanently deleted"
    ],
    correctIndex: 1,
    explanation: "An unexpected reset code usually indicates someone is attempting to log in with your email or username. Because 2FA/verification was triggered, they were blocked! Never approve the request, and consider updating your password directly on the official site if you suspect credential leakage."
  }
];
