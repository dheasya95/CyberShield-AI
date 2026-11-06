// Comprehensive client-side password analyzer
// 100% evaluated locally in browser - never saved, transmitted, or logged.

const COMMON_PATTERNS = [
  "password", "123456", "12345678", "qwerty", "admin", "welcome",
  "iloveyou", "monkey", "dragon", "master", "football", "baseball",
  "superman", "starwars", "secret", "pass123", "letmein", "sunshine"
];

export function analyzePassword(password) {
  if (!password || typeof password !== "string") {
    return {
      length: 0,
      score: 0,
      level: "empty",
      label: "Enter a password",
      color: "gray",
      entropy: 0,
      crackTime: "0 seconds",
      checks: {
        length: { passed: false, label: "At least 12 characters", count: 0 },
        lowercase: { passed: false, label: "Lowercase letters (a-z)", count: 0 },
        uppercase: { passed: false, label: "Uppercase letters (A-Z)", count: 0 },
        numbers: { passed: false, label: "Numbers (0-9)", count: 0 },
        symbols: { passed: false, label: "Special symbols (!@#$)", count: 0 }
      },
      suggestions: [
        "Use at least 12-16 characters or 4 random words.",
        "Mix uppercase and lowercase letters, numbers, and symbols.",
        "Avoid common dictionary words, names, or birth years."
      ],
      warnings: []
    };
  }

  const length = password.length;
  const hasLower = /[a-z]/.test(password);
  const hasUpper = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSymbol = /[^A-Za-z0-9]/.test(password);

  const lowerCount = (password.match(/[a-z]/g) || []).length;
  const upperCount = (password.match(/[A-Z]/g) || []).length;
  const numberCount = (password.match(/[0-9]/g) || []).length;
  const symbolCount = (password.match(/[^A-Za-z0-9]/g) || []).length;

  // Character pool size calculation for Shannon Entropy
  let poolSize = 0;
  if (hasLower) poolSize += 26;
  if (hasUpper) poolSize += 26;
  if (hasNumber) poolSize += 10;
  if (hasSymbol) poolSize += 33;

  // Entropy: H = L * log2(poolSize)
  const entropy = poolSize > 0 ? Math.round(length * Math.log2(poolSize)) : 0;

  // Warnings detection
  const warnings = [];
  const lowerPass = password.toLowerCase();

  for (const common of COMMON_PATTERNS) {
    if (lowerPass.includes(common)) {
      warnings.push(`Contains easily guessed sequence or common word: "${common}".`);
      break;
    }
  }

  if (/^(.)\1+$/.test(password)) {
    warnings.push("Contains repeated identical characters.");
  } else if (/0123|1234|2345|3456|4567|5678|6789|7890|abcd|bcde|cdef/.test(lowerPass)) {
    warnings.push("Contains predictable sequential characters.");
  }

  // Scoring (0 - 100)
  let score = 0;

  // Length weight
  if (length >= 16) score += 35;
  else if (length >= 12) score += 25;
  else if (length >= 8) score += 15;
  else score += length * 1.5;

  // Diversity weight
  if (hasLower) score += 15;
  if (hasUpper) score += 15;
  if (hasNumber) score += 15;
  if (hasSymbol) score += 20;

  // Bonus for balanced distribution
  if (hasLower && hasUpper && hasNumber && hasSymbol && length >= 12) {
    score += 10;
  }

  // Deductions for warnings
  if (warnings.length > 0) {
    score = Math.max(10, score - warnings.length * 20);
  }

  // Clamp 0 - 100
  score = Math.min(100, Math.max(5, Math.round(score)));

  // Categorization
  let level = "weak";
  let label = "Weak";
  let color = "rose";

  if (score >= 80 && length >= 12) {
    level = "very-strong";
    label = "Very Strong";
    color = "emerald";
  } else if (score >= 60 && length >= 8) {
    level = "strong";
    label = "Strong";
    color = "cyan";
  } else if (score >= 40 && length >= 6) {
    level = "medium";
    label = "Medium";
    color = "amber";
  } else {
    level = "weak";
    label = "Weak";
    color = "rose";
  }

  // Crack time estimation based on 10 billion guesses/sec (modern GPU rig)
  const crackTime = estimateCrackTime(entropy);

  // Dynamic suggestions
  const suggestions = [];
  if (length < 12) {
    suggestions.push(`Make it longer (currently ${length} characters; aim for 12-16+ characters).`);
  }
  if (!hasUpper) {
    suggestions.push("Add at least one uppercase letter (A-Z).");
  }
  if (!hasLower) {
    suggestions.push("Add lowercase letters (a-z).");
  }
  if (!hasNumber) {
    suggestions.push("Include numeric digits (0-9).");
  }
  if (!hasSymbol) {
    suggestions.push("Add special characters or symbols (e.g., !@#$%^&*).");
  }
  if (warnings.length > 0) {
    suggestions.push("Avoid consecutive sequences, repeated characters, or popular dictionary words.");
  }
  if (suggestions.length === 0) {
    suggestions.push("Excellent work! This password meets all modern cybersecurity benchmarks.");
    suggestions.push("Remember: never reuse this password across other accounts.");
  }

  return {
    length,
    score,
    level,
    label,
    color,
    entropy,
    crackTime,
    checks: {
      length: { passed: length >= 12, label: "At least 12 characters", count: length },
      lowercase: { passed: hasLower, label: "Lowercase letters (a-z)", count: lowerCount },
      uppercase: { passed: hasUpper, label: "Uppercase letters (A-Z)", count: upperCount },
      numbers: { passed: hasNumber, label: "Numbers (0-9)", count: numberCount },
      symbols: { passed: hasSymbol, label: "Special symbols (!@#$)", count: symbolCount }
    },
    suggestions,
    warnings
  };
}

function estimateCrackTime(entropy) {
  if (entropy <= 0) return "Instantly";
  // Assuming 10^10 guesses per second (GPU cluster)
  // Total combinations = 2^entropy
  // Average attempts to crack = 2^(entropy - 1)
  const seconds = Math.pow(2, entropy - 1) / 1e10;

  if (seconds < 1) return "Instantly (< 1 sec)";
  if (seconds < 60) return `${Math.round(seconds)} seconds`;
  if (seconds < 3600) return `${Math.round(seconds / 60)} minutes`;
  if (seconds < 86400) return `${Math.round(seconds / 3600)} hours`;
  if (seconds < 86400 * 30) return `${Math.round(seconds / 86400)} days`;
  if (seconds < 86400 * 365) return `${Math.round(seconds / (86400 * 30))} months`;
  if (seconds < 86400 * 365 * 100) return `${Math.round(seconds / (86400 * 365))} years`;
  if (seconds < 86400 * 365 * 10000) return `${Math.round(seconds / (86400 * 365 * 100))} centuries`;
  return "Trillions of years (Uncrackable)";
}

// Client-side cryptographically secure password generator
export function generateSecurePassword(length = 16, { includeUpper = true, includeNumbers = true, includeSymbols = true } = {}) {
  const lowers = "abcdefghjkmnpqrstuvwxyz"; // removed easily confused l, o, i
  const uppers = "ABCDEFGHJKLMNPQRSTUVWXYZ";
  const numbers = "23456789";
  const symbols = "!@#$%^&*()-_=+[]{}";

  let charset = lowers;
  let guaranteed = [lowers[Math.floor(Math.random() * lowers.length)]];

  if (includeUpper) {
    charset += uppers;
    guaranteed.push(uppers[Math.floor(Math.random() * uppers.length)]);
  }
  if (includeNumbers) {
    charset += numbers;
    guaranteed.push(numbers[Math.floor(Math.random() * numbers.length)]);
  }
  if (includeSymbols) {
    charset += symbols;
    guaranteed.push(symbols[Math.floor(Math.random() * symbols.length)]);
  }

  const array = new Uint32Array(length);
  window.crypto.getRandomValues(array);

  const passwordChars = [...guaranteed];
  for (let i = guaranteed.length; i < length; i++) {
    passwordChars.push(charset[array[i] % charset.length]);
  }

  // Shuffle Fisher-Yates
  for (let i = passwordChars.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [passwordChars[i], passwordChars[j]] = [passwordChars[j], passwordChars[i]];
  }

  return passwordChars.join("");
}
