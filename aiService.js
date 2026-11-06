// Cyber Learning Assistant Service
// Clean architecture with built-in client-side simulated AI responder
// and pluggable hook for live AI APIs (e.g. Gemini, OpenAI) without hardcoded keys.

import { ASSISTANT_KNOWLEDGE_BASE } from "../data/assistantKnowledge.js";

export async function askCyberAssistant(userQuestion, options = {}) {
  const query = (userQuestion || "").trim().toLowerCase();

  if (!query) {
    return {
      text: "Please type a cybersecurity question or select one of the suggested topics above!",
      relatedPrompts: ["How do I spot phishing?", "What is 2FA?", "Is public Wi-Fi safe?"]
    };
  }

  // Simulated thinking delay for realistic UX (can be bypassed)
  if (options.simulateDelay !== false) {
    await new Promise(r => setTimeout(r, 650));
  }

  // If user provided a custom API key in client settings in the future:
  if (options.apiKey && options.provider === "gemini") {
    try {
      return await callLiveGeminiApi(userQuestion, options.apiKey);
    } catch {
      // Fallback cleanly to curated knowledge base on API error
    }
  }

  // 1. Calculate best match score across curated topics
  let bestTopic = null;
  let highestScore = 0;

  for (const item of ASSISTANT_KNOWLEDGE_BASE) {
    let score = 0;

    // Check title similarity
    if (query.includes(item.title.toLowerCase())) {
      score += 20;
    }

    // Check keywords
    for (const kw of item.keywords) {
      const kwLower = kw.toLowerCase();
      if (query === kwLower) {
        score += 30;
      } else if (query.includes(kwLower)) {
        score += 15;
      } else {
        // Individual word matches
        const kwWords = kwLower.split(/\s+/);
        for (const w of kwWords) {
          if (w.length > 3 && query.includes(w)) {
            score += 4;
          }
        }
      }
    }

    if (score > highestScore) {
      highestScore = score;
      bestTopic = item;
    }
  }

  // If we found a confident match
  if (bestTopic && highestScore >= 10) {
    return {
      text: bestTopic.response,
      title: bestTopic.title,
      relatedPrompts: bestTopic.relatedPrompts || [],
      isDemo: true
    };
  }

  // 2. Fallback smart conversational response for general cyber queries
  return generateIntelligentFallback(query);
}

function generateIntelligentFallback(query) {
  // Common greetings
  if (/^(hi|hello|hey|greetings|help|sup|howdy)\b/i.test(query)) {
    return {
      text: `Hello! 👋 I am your **CyberShield AI Learning Assistant**.

I am here to help you learn personal cybersecurity, safe browsing habits, password hygiene, and digital privacy.

Try asking me questions like:
- *"How do I spot a phishing email?"*
- *"Why is public Wi-Fi dangerous?"*
- *"What should I do if my account was hacked?"*
- *"What is a password manager?"*
- *"Why should I never share an OTP?"*`,
      relatedPrompts: ["How do I spot phishing?", "What is an OTP?", "Why use a password manager?"]
    };
  }

  if (query.includes("thank") || query.includes("awesome") || query.includes("cool")) {
    return {
      text: "You're very welcome! Stay curious, stay vigilant, and remember: **Stay Safe. Stay Smart. Stay Protected!** 🛡️",
      relatedPrompts: ["Test my password strength", "Check a suspicious link", "Take the Cyber Quiz"]
    };
  }

  // General fallback guidance
  return {
    text: `That is an interesting question regarding **"${query}"**!

While my built-in offline educational knowledge base doesn't have an exact pre-curated article for that exact phrasing, here are the **Core Golden Rules of Cybersecurity** that apply to almost every digital situation:

1. **Verify Before Trusting:** Always confirm requests through independent channels (e.g., call the official phone number or navigate to the real website yourself).
2. **Never Share Secrets:** Never share One-Time Passwords (OTPs), PINs, or private keys with anyone.
3. **Use Defense in Depth:** Combine strong, unique 16+ character passwords with Two-Factor Authentication (2FA) and regular software updates.
4. **Assume Unencrypted Wi-Fi is Public:** Use a VPN on coffee shop or airport networks.

*💡 Tip: Try clicking one of the suggested topics below or rephrasing your question with keywords like "phishing", "passwords", "malware", or "VPN".*`,
    relatedPrompts: [
      "How do I spot phishing?",
      "Why should I never share an OTP?",
      "What is a password manager?",
      "Is public Wi-Fi safe?"
    ]
  };
}

// Optional live AI connector stub for users who want to bring their own Gemini API key
async function callLiveGeminiApi(prompt, apiKey) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{
        parts: [{
          text: `You are CyberShield AI, an encouraging and expert cybersecurity educator for students and beginners. Answer clearly, accurately, with bullet points and safety tips. Question: ${prompt}`
        }]
      }]
    })
  });
  const data = await res.json();
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || "Unable to reach AI service.";
  return {
    text,
    isDemo: false
  };
}
