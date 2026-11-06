// Educational Phishing & URL Heuristics Analyzer
// Completely local in-browser heuristics engine.
// Never connects to or opens suspicious URLs.

export const SAMPLE_PHISHING_CASES = [
  {
    id: "sample-sms-bank",
    title: "Urgent Bank Suspension SMS",
    type: "SMS",
    text: "URGENT ALERT: Your Chase account #4829 has been temporarily locked due to suspicious login attempts. Verify your identity within 24 hours at http://chase-security-verify.xyz/login to prevent permanent termination. Enter your OTP code on the page."
  },
  {
    id: "sample-email-netflix",
    title: "Netflix Payment Failure Email",
    type: "Email",
    text: "Dear Customer,\n\nWe were unable to process your Netflix monthly membership renewal. Your streaming service has been paused. Please update your billing information and credit card CVV immediately by clicking here: https://netflix-update-billing.support/reactivate. If you do not update within 12 hours, your account will be deleted."
  },
  {
    id: "sample-url-typo",
    title: "Suspicious Lookalike Login URL",
    type: "URL",
    text: "https://paypa1-account-verification.login-alert.top/signin?token=92847291"
  },
  {
    id: "sample-gift-scam",
    title: "Cryptocurrency / Gift Card Prize Scam",
    type: "Social / DM",
    text: "Congratulations! You have been selected as the random winner of 0.25 Bitcoin ($15,000)! Claim your reward now before the countdown timer expires: http://192.168.1.105:8080/claim-reward. Enter your private wallet key or seed phrase to receive instant deposit."
  },
  {
    id: "sample-safe-order",
    title: "Legitimate Order Confirmation (Safe Baseline)",
    type: "Email",
    text: "Hi Alex,\n\nThanks for your purchase! Your order #112-9842104-3982910 has shipped and will arrive on Friday. You can track your package directly inside the official Amazon app or by visiting https://www.amazon.com/orders. We will never ask for your password or OTP."
  }
];

const URGENT_WORDS = [
  "urgent", "immediately", "immediate action", "within 24 hours", "within 12 hours",
  "account suspended", "temporarily locked", "permanent termination", "act now",
  "final notice", "last warning", "critical security alert", "unauthorized access",
  "suspended immediately", "don't delay", "freeze your account"
];

const CREDENTIAL_HARVEST_WORDS = [
  "otp", "one-time password", "verification code", "enter your password",
  "confirm your pin", "social security", "ssn", "credit card", "cvv",
  "security code", "seed phrase", "private key", "bank details",
  "verify your identity", "update billing"
];

const GREED_LOTTERY_WORDS = [
  "congratulations", "you won", "lottery winner", "free gift",
  "claim reward", "0.25 bitcoin", "selected as the winner", "cash prize",
  "free iphone", "giveaway bonus", "exclusive bonus"
];

const SUSPICIOUS_TLDS = [
  ".xyz", ".top", ".buzz", ".work", ".cfd", ".click", ".surf",
  ".support", ".gq", ".cf", ".ml", ".tk", ".ga", ".rest", ".monster"
];

const POPULAR_BRANDS = [
  "paypal", "chase", "bankofamerica", "wells fargo", "apple", "google",
  "microsoft", "netflix", "amazon", "instagram", "facebook", "coinbase", "binance"
];

export function analyzePhishing(input) {
  if (!input || !input.trim()) {
    return null;
  }

  const rawText = input.trim();
  const lower = rawText.toLowerCase();

  const flags = [];
  let riskScore = 0; // 0 - 100

  // 1. Check for Urgency & Coercion
  const matchedUrgent = URGENT_WORDS.filter(w => lower.includes(w));
  if (matchedUrgent.length > 0) {
    const points = Math.min(30, matchedUrgent.length * 15);
    riskScore += points;
    flags.push({
      category: "Psychological Urgency",
      severity: "high",
      title: "Aggressive or Urgent Language Detected",
      description: `Detected high-pressure trigger phrases: "${matchedUrgent.slice(0, 3).join('", "')}". Scammers manufacture artificial panic to stop you from thinking critically.`,
      icon: "AlertTriangle"
    });
  }

  // 2. Check for OTP / Credential Harvesting
  const matchedCreds = CREDENTIAL_HARVEST_WORDS.filter(w => lower.includes(w));
  if (matchedCreds.length > 0) {
    const points = Math.min(35, matchedCreds.length * 18);
    riskScore += points;
    flags.push({
      category: "Credential Request",
      severity: "high",
      title: "Sensitive Credential or OTP Solicitation",
      description: `The message asks for or mentions sensitive credentials: "${matchedCreds.slice(0, 3).join('", "')}". Authentic institutions never ask you to submit OTPs or PINs via email/SMS links.`,
      icon: "KeyRound"
    });
  }

  // 3. Check for Financial / Lottery / Prize bait
  const matchedPrizes = GREED_LOTTERY_WORDS.filter(w => lower.includes(w));
  if (matchedPrizes.length > 0) {
    riskScore += 25;
    flags.push({
      category: "Financial / Prize Bait",
      severity: "medium",
      title: "Unsolicited Reward or Lottery Lure",
      description: `Contains tempting reward promises: "${matchedPrizes.join('", "')}". If you didn't enter a contest, you cannot win one.`,
      icon: "Gift"
    });
  }

  // 4. URL & Domain Deep Heuristics
  // Extract URLs
  const foundUrls = rawText.match(urlRegex) || [];
  foundUrls.forEach(urlStr => {
    let cleanUrl = urlStr.toLowerCase();
    if (!cleanUrl.startsWith("http://") && !cleanUrl.startsWith("https://")) {
      cleanUrl = "http://" + cleanUrl;
    }

    try {
      // Basic URL parsing
      const urlObj = new URL(cleanUrl);
      const hostname = urlObj.hostname;

      // Check HTTP (Insecure protocol)
      if (cleanUrl.startsWith("http://")) {
        riskScore += 15;
        flags.push({
          category: "Insecure Link",
          severity: "medium",
          title: "Unencrypted HTTP Protocol",
          description: `The link (${hostname}) uses unencrypted 'http://' instead of secure 'https://', meaning transmitted data is vulnerable to packet interception.`,
          icon: "ShieldAlert"
        });
      }

      // Check IP address as hostname (e.g. http://192.168.1.1/...)
      if (/^(\d{1,3}\.){3}\d{1,3}$/.test(hostname)) {
        riskScore += 40;
        flags.push({
          category: "Suspicious Host",
          severity: "high",
          title: "Direct IP Address Used as Hostname",
          description: `The link routes directly to a numeric IP address (${hostname}) instead of a registered domain name. Legitimate companies almost never use raw IPs in consumer emails.`,
          icon: "Server"
        });
      }

      // Check Suspicious TLDs
      for (const tld of SUSPICIOUS_TLDS) {
        if (hostname.endsWith(tld)) {
          riskScore += 25;
          flags.push({
            category: "High-Risk Domain Extension",
            severity: "high",
            title: `Suspicious Top-Level Domain (${tld})`,
            description: `The domain uses '${tld}', an inexpensive top-level domain frequently utilized in automated phishing campaigns and botnet infrastructure.`,
            icon: "Globe"
          });
          break;
        }
      }

      // Check Brand Impersonation / Typosquatting in Hostname
      POPULAR_BRANDS.forEach(brand => {
        // e.g. chase-security-verify.xyz, netfIix, paypa1
        const brandInHost = hostname.includes(brand) ||
          (brand === "paypal" && hostname.includes("paypa1")) ||
          (brand === "netflix" && hostname.includes("netfIix"));

        const officialDomain = `${brand}.com`;

        if (brandInHost && !hostname.endsWith(officialDomain)) {
          riskScore += 35;
          flags.push({
            category: "Brand Impersonation / Typosquatting",
            severity: "high",
            title: `Apparent Impersonation of ${brand.toUpperCase()}`,
            description: `The hostname contains "${brand}" but is NOT the official ${officialDomain} domain. This is a classic lookalike phishing technique.`,
            icon: "Copy"
          });
        }
      });

      // Check excessive subdomains or hyphens
      const hyphenCount = (hostname.match(/-/g) || []).length;
      if (hyphenCount >= 2) {
        riskScore += 15;
        flags.push({
          category: "Domain Pattern",
          severity: "medium",
          title: "Multiple Hyphens in Domain Name",
          description: `The hostname "${hostname}" contains multiple hyphens, commonly used to craft deceptive strings like "account-update-security-login".`,
          icon: "Link"
        });
      }

    } catch {
      // Invalid URL string
    }
  });

  // 5. Generic Salutations check
  if (lower.includes("dear customer") || lower.includes("valued customer") || lower.includes("dear user") || lower.includes("dear member")) {
    riskScore += 10;
    flags.push({
      category: "Generic Greeting",
      severity: "low",
      title: "Impersonal or Generic Salutation",
      description: "Uses a generic greeting ('Dear Customer') rather than your verified account name. Companies with whom you hold an account address you by your real name.",
      icon: "UserX"
    });
  }

  // Final score clamping
  riskScore = Math.min(100, Math.max(0, riskScore));

  // Determine Level
  let level = "low";
  let label = "Low Risk / Likely Safe";
  let color = "emerald";
  let verdict = "No prominent phishing heuristics were detected. However, always exercise regular caution.";

  if (riskScore >= 55) {
    level = "high";
    label = "High Risk / Probable Scam";
    color = "rose";
    verdict = "Multiple high-severity phishing indicators were detected! Do NOT click links, download files, or respond with personal data.";
  } else if (riskScore >= 25) {
    level = "medium";
    label = "Medium Risk / Suspicious";
    color = "amber";
    verdict = "Warning signs detected. Verify this message through an official, independent channel before taking any action.";
  }

  return {
    riskScore,
    level,
    label,
    color,
    verdict,
    flagsCount: flags.length,
    flags,
    urlsDetected: foundUrls,
    inputLength: rawText.length
  };
}
