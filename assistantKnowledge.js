export const ASSISTANT_KNOWLEDGE_BASE = [
  {
    id: "phishing-definition",
    keywords: ["phishing", "spot phishing", "fake email", "fake link", "scam link", "suspicious email", "phish"],
    title: "How to Identify & Avoid Phishing Attacks",
    response: `**Phishing** is a deceptive social engineering attack where cybercriminals pose as trusted institutions (banks, delivery companies, schools, tech giants) to trick you into revealing passwords, credit card numbers, or downloading malware.

### 🚩 Key Red Flags to Watch For:
1. **Artificial Urgency:** Phrases like *"Account will be suspended in 24 hours!"* or *"Immediate action required!"*
2. **Suspicious Sender Email:** The display name says "Netflix Support", but the real address is \`support@netfIix-verify24.com\` (note the uppercase 'I' or hyphen).
3. **Requests for Sensitive Data:** Legitimate companies will **never** ask you for your password, PIN, or OTP via email or text.
4. **Deceptive Links:** Hover over links before clicking to inspect the real destination domain.
5. **Generic Salutations:** Starting with *"Dear Customer"* instead of your actual registered name.

💡 **Quick Rule:** If an unexpected message makes your heart race, pause! Close the message and open the official website or app directly.`,
    relatedPrompts: ["What is an OTP?", "How do I check if a link is safe?", "What is spear phishing?"]
  },
  {
    id: "password-manager",
    keywords: ["password manager", "bitwarden", "keepass", "remember passwords", "best password manager", "save password"],
    title: "Why You Need a Password Manager",
    response: `A **Password Manager** is an encrypted digital vault that generates, stores, and automatically fills long, complex, and unique passwords for every website you use.

### 🔒 Why You Should Use One:
- **No More Reusing Passwords:** You can give every service a random 20-character password like \`v#7P$mK9!wZ2@xL4\` without having to memorize it.
- **You Only Memorize ONE Key:** You only need to remember one strong Master Passphrase.
- **Phishing Protection:** Password managers match the exact website domain; if you accidentally visit a fake clone website, the manager will refuse to autofill your credentials!

### 🌟 Free & Trusted Options for Beginners:
- **Bitwarden:** Free, open-source, cloud-synced across phone and PC, audited security.
- **KeePassXC:** 100% offline, open-source local database for maximum control.
- **Apple Keychain / Google Password Manager:** Built-in convenient browser options.`,
    relatedPrompts: ["How do I create a strong passphrase?", "What is credential stuffing?", "What is 2FA?"]
  },
  {
    id: "two-factor-auth",
    keywords: ["2fa", "mfa", "two factor", "multi factor", "authenticator", "authenticator app", "google authenticator"],
    title: "Understanding Two-Factor Authentication (2FA)",
    response: `**Two-Factor Authentication (2FA)** adds a crucial second layer of security to your accounts. Instead of relying only on something you know (your password), you also need something you have (your phone or hardware key).

### 🛡️ Why 2FA is Essential:
Even if an attacker steals your password from a dark web breach, **they cannot get into your account** without physical access to your 2FA authentication device.

### 📱 Common Types of 2FA (Ranked from Best to Good):
1. **Hardware Security Keys (FIDO2 / YubiKey):** The gold standard; physically immune to phishing.
2. **Authenticator Apps (TOTP):** Apps like *Google Authenticator*, *Aegis*, or *2FAS* generate a new 6-digit code every 30 seconds offline.
3. **SMS / Text Message:** Convenient, but vulnerable to SIM swapping and phone interception. Still much better than no 2FA at all!

💡 **Action Tip:** Always save and store your **emergency backup codes** in a safe physical place in case your phone is lost or damaged.`,
    relatedPrompts: ["What is an OTP?", "What should I do if my phone is lost?", "Is SMS 2FA safe?"]
  },
  {
    id: "vpn-basics",
    keywords: ["vpn", "virtual private network", "public wifi", "hotel wifi", "cafe wifi", "wifi safety", "encrypt traffic"],
    title: "What is a VPN & Do You Really Need One?",
    response: `A **VPN (Virtual Private Network)** creates a private, encrypted digital tunnel between your device and a secure server managed by the VPN provider.

### 🛡️ What a VPN Actually Does:
- **Hides your real IP Address:** Websites see the VPN server's location rather than your physical home address or city.
- **Encrypts your connection:** Protects unencrypted network packets from eavesdroppers on public Wi-Fi networks (hotels, airports, cafes).
- **Bypasses geographical firewalls:** Helps bypass regional censorship.

### ⚠️ What a VPN Does NOT Do:
- It **does not** protect you from malware downloads.
- It **does not** prevent you from typing your password into a phishing site.
- It **does not** make you completely anonymous if you stay logged into Google or social media accounts.

💡 **Advice for Beginners:** Avoid shady "100% free unlimited VPNs"—they often sell your browsing traffic to third-party advertisers. Use audited, transparent providers.`,
    relatedPrompts: ["Is public Wi-Fi safe?", "What is HTTPS?", "How to protect my privacy online?"]
  },
  {
    id: "ransomware-recovery",
    keywords: ["ransomware", "hacked", "account hacked", "compromised", "locked out", "files encrypted", "virus locked"],
    title: "What to Do If You Get Hacked or Encounter Ransomware",
    response: `Don't panic! Taking calm, immediate steps can prevent an incident from spreading further:

### 🚨 Emergency Response Checklist:
1. **Disconnect from the Network:** Immediately unplug the Ethernet cable and turn off Wi-Fi/Bluetooth on the affected device to stop malware from spreading to other home devices.
2. **Change Passwords from a Clean Device:** Use a different phone or laptop to reset passwords on your email, banking, and primary accounts.
3. **Revoke Active Sessions:** Go into account security settings (Google, Instagram, Microsoft) and select *"Sign out of all other devices"*.
4. **Never Pay the Ransom:** Security authorities and the FBI strongly advise against paying ransomware demands. Payment does not guarantee decryption and funds criminal syndicates.
5. **Restore from Offline Backups:** Format and reinstall your OS cleanly, then restore your files from your offline external drive.

💡 Check **HaveIBeenPwned.com** to see if your email address has appeared in public corporate data breaches.`,
    relatedPrompts: ["How do I create a backup?", "What is malware?", "How to spot phishing?"]
  },
  {
    id: "otp-safety",
    keywords: ["otp", "one time password", "verification code", "sms code", "bank code", "share otp"],
    title: "Why You Must NEVER Share an OTP",
    response: `An **OTP (One-Time Password)** is a temporary authentication code sent directly to your verified phone number or email to confirm a high-risk action, such as logging into a new device, resetting a password, or transferring money.

### 🚫 The Golden Rule:
**NEVER share an OTP with anyone, under ANY circumstances.**

### 🎭 Common Scammer Excuses:
- *"I'm from your bank's fraud department; please verify the code to cancel a fraudulent transfer."*
- *"I sent an OTP to your phone by accident; can you read it back to me?"*
- *"We are upgrading your SIM card; read the confirmation digits to avoid service interruption."*

**Reality:** The scammer is actively sitting on your login screen. They know your password and are waiting for you to provide the final key that bypasses your security!`,
    relatedPrompts: ["What is two-factor authentication?", "How to identify phishing?", "What is social engineering?"]
  },
  {
    id: "ethical-hacking-learn",
    keywords: ["ethical hacking", "learn hacking", "become a hacker", "white hat", "bug bounty", "pentesting", "cyber career"],
    title: "How to Start Learning Ethical Hacking Legally",
    response: `Ethical hacking is one of the most rewarding and in-demand fields in technology! Here is the beginner roadmap to start learning safely and legally:

### 🗺️ The Beginner Learning Roadmap:
1. **Master the Basics:**
   - **Networking:** Understand IP addresses, TCP/UDP, DNS, Subnets, and HTTP/HTTPS.
   - **Operating Systems:** Learn basic Linux command line (Ubuntu, Debian, or Kali in a virtual machine).
   - **Scripting:** Basic Python or Bash scripting.
2. **Hands-On Practice Labs (100% Legal):**
   - **TryHackMe:** The best interactive platform for total beginners with guided game-like rooms.
   - **HackTheBox:** Great for intermediate challenge labs.
   - **OverTheWire Bandit:** Excellent for practicing Linux terminal skills.
3. **Certifications & Next Steps:**
   - CompTIA Security+, Network+, and eJPT (Junior Penetration Tester).
   - Participate in legal bug bounty programs on *HackerOne* and *Bugcrowd*.

⚠️ **Crucial Warning:** Never point scanning tools or exploit scripts at systems without explicit written permission!`,
    relatedPrompts: ["What is a firewall?", "What is a zero-day vulnerability?", "What is social engineering?"]
  },
  {
    id: "social-engineering",
    keywords: ["social engineering", "manipulation", "pretexting", "baiting", "human hacking", "scam call"],
    title: "What is Social Engineering & How Does It Work?",
    response: `**Social Engineering** is the psychological manipulation of people into performing actions or divulging confidential information. Instead of hacking software code, attackers "hack" human emotions.

### 🎭 The 4 Most Common Techniques:
1. **Pretexting:** Creating an invented scenario (e.g., impersonating an HR manager or hospital worker) to establish trust.
2. **Baiting:** Leaving infected USB drives labeled *"Executive Salaries 2024"* in public areas, hoping curiosity will cause someone to plug it into their computer.
3. **Quid Pro Quo:** Promising a benefit or service in exchange for information (e.g., *"Free Wi-Fi access if you enter your work email and password"*).
4. **Urgency & Authority:** Pretending to be the CEO or legal counsel demanding immediate wire transfers without following normal verification steps.

💡 **Defense:** Always verify requests through independent, out-of-band channels!`,
    relatedPrompts: ["What is phishing?", "How to spot phishing?", "Why is shoulder surfing dangerous?"]
  },
  {
    id: "public-wifi-safety",
    keywords: ["public wifi", "airport wifi", "hotel wifi", "free wifi", "cafe wifi", "open wifi"],
    title: "Is Public Wi-Fi Safe to Use?",
    response: `Unencrypted or open public Wi-Fi networks in airports, hotels, and cafes pose notable security risks because anyone nearby can connect to the exact same local radio broadcast.

### ⚠️ Potential Risks:
- **Evil Twin Hotspots:** Attackers deploy rogue routers with identical names (e.g. \`CoffeeShop_Guest_Free\`) to intercept your data.
- **Packet Sniffing:** Malicious users on the network can analyze unencrypted data broadcasts.
- **Man-in-the-Middle (MITM):** An attacker intercepts the communication between your device and the router.

### 🛡️ Safe Habits for Public Wi-Fi:
- Avoid accessing bank accounts, credit cards, or confidential school/work portals.
- Turn on a trusted **Virtual Private Network (VPN)** before opening your browser.
- Verify websites load over **HTTPS** (look for the padlock in the address bar).
- Turn off **File Sharing** and **AirDrop / Nearby Share** when connected to public networks.`,
    relatedPrompts: ["What is a VPN?", "What is HTTPS?", "What is an OTP?"]
  },
  {
    id: "browser-privacy",
    keywords: ["privacy", "digital footprint", "cookies", "tracking", "incognito", "private browsing", "ad blocker"],
    title: "How to Protect Your Privacy & Limit Tracking",
    response: `Every website you visit and app you download attempts to track your identity, browsing habits, and physical location through cookies, device fingerprinting, and data brokers.

### 🛡️ Essential Privacy Steps:
1. **Install an Open-Source Content Blocker:** Use **uBlock Origin** on Firefox or Chromium browsers to block tracking scripts, intrusive telemetry, and deceptive ads.
2. **Understand Incognito Mode:** Incognito only prevents your browser from saving local history and cookies on *your* device. It **does not** hide your activity from your Internet Provider, school Wi-Fi, or websites you log into.
3. **Audit App Permissions:** Periodically check your smartphone settings and revoke location, microphone, and contacts access from non-essential apps.
4. **Use Privacy-Respecting Search Engines:** Try *DuckDuckGo* or *Brave Search* to avoid personalized search tracking.`,
    relatedPrompts: ["What is a digital footprint?", "What is a VPN?", "Why are passwords reused?"]
  }
];

export const SUGGESTED_QUESTIONS = [
  "How do I spot a phishing email?",
  "Why should I never share an OTP?",
  "What is a password manager and is it safe?",
  "What is Two-Factor Authentication (2FA)?",
  "Is public Wi-Fi safe to use?",
  "What should I do if my account gets hacked?",
  "How can I start learning ethical hacking?",
  "Do I really need a VPN?"
];
