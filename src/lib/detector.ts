// ============================================================
// ScamShield NG — Detection Engine
// Layer 1: Whitelist  →  Layer 2: Heuristics  →  Layer 3: Gemini
// ============================================================

export type Verdict = 'safe' | 'suspicious' | 'scam';

export interface DetectionResult {
  verdict: Verdict;
  explanation: string;
  detectedBy: 'whitelist' | 'blacklist' | 'heuristic' | 'ai';
}

// ── Layer 1a: Trusted Nigerian & global domains (whitelist) ──────────────────
const WHITELIST_DOMAINS = new Set([
  // Nigerian Government
  'gov.ng', 'jamb.gov.ng', 'jamb.org.ng', 'nitda.gov.ng', 'npower.gov.ng',
  'fmf.gov.ng', 'cbn.gov.ng', 'efcc.gov.ng', 'inec.gov.ng', 'nimc.gov.ng',
  'firs.gov.ng', 'ncc.gov.ng', 'nafdac.gov.ng', 'noun.edu.ng', 'unilag.edu.ng',
  'ui.edu.ng', 'oau.edu.ng', 'unical.edu.ng', 'abiastate.gov.ng',

  // Nigerian Education
  'edu.ng', 'waec.org.ng', 'waecdirect.org', 'neco.gov.ng',

  // Nigerian Fintech & Banks
  'paystack.com', 'flutterwave.com', 'cowrywise.com', 'piggyvest.com',
  'kuda.com', 'opay.com', 'palmpay.com', 'gtbank.com', 'accessbankplc.com',
  'zenithbank.com', 'firstbanknigeria.com', 'ubagroup.com', 'stanbicibtc.com',
  'moniepoint.com', 'teamapt.com', 'providusbank.com',

  // Nigerian Tech & Programs
  '3mtt.nitda.gov.ng', 'gebeya.com', 'mydala.app', 'dala.gebeya.com',
  'naijalearn.com', 'scholarshipng.com',

  // ScamShield itself — never flag yourself
  'scamshield-ng.vercel.app', 'scamshieldng.com', 'scamshield.ng',
  'scamshield-ng-sentinel.vercel.app',

  // Global trusted
  'google.com', 'gmail.com', 'youtube.com', 'facebook.com', 'instagram.com',
  'twitter.com', 'x.com', 'linkedin.com', 'microsoft.com', 'apple.com',
  'amazon.com', 'github.com', 'vercel.app', 'netlify.app', 'anthropic.com',
  'whatsapp.com', 'telegram.org', 'wikipedia.org',
]);

// ── Layer 1b: Known scam domains/patterns (blacklist) ───────────────────────
const BLACKLIST_PATTERNS = [
  /free.*money.*naira/i,
  /win.*\d+.*million/i,
  /cbn.*grant/i,
  /npower.*alert.*click/i,
  /verify.*bvn.*link/i,
  /bit\.ly\/.*ng/i,
  /tinyurl\.com\/.*ng/i,
  /ngscam/i,
  /nigeriascam/i,
  /419/i,
];

// ── Layer 2: Heuristic checks ────────────────────────────────────────────────
const URL_SHORTENERS = [
  'bit.ly', 'tinyurl.com', 'ow.ly', 't.co', 'goo.gl',
  'shorte.st', 'adf.ly', 'cur.lv', 'is.gd', 'buff.ly',
];

const DANGER_KEYWORDS = [
  'enter your bvn', 'send your bvn', 'your bvn is required',
  'enter your nin', 'send your nin',
  'enter your atm pin', 'send your pin', 'your pin',
  'enter your otp', 'send your otp', 'your otp',
  'click to claim', 'you have won', 'congratulations you won',
  'you are selected', 'urgent response required', 'act now',
  'limited time offer', 'wire transfer', 'western union',
  'send airtime', 'recharge card', 'your account will be suspended',
  'verify your account now', 'your bank account is at risk',
  'double your investment', 'guaranteed returns',
  'central bank of nigeria grant', 'cbn palliative',
  'npower payment', 'trader moni', 'conditional cash transfer',
];

const SUSPICIOUS_KEYWORDS = [
  'click here', 'click the link', 'follow this link',
  'free money', 'earn from home', 'work from home earn',
  'investment opportunity', 'forex signal', 'crypto signal',
  'whatsapp us now', 'dm us now', 'call us now for your prize',
];

function extractDomain(input: string): string | null {
  try {
    const withProtocol = input.startsWith('http') ? input : `https://${input}`;
    const url = new URL(withProtocol);
    return url.hostname.replace(/^www\./, '');
  } catch {
    return null;
  }
}

function isWhitelisted(domain: string): boolean {
  if (WHITELIST_DOMAINS.has(domain)) return true;
  // Check if domain ends with a whitelisted TLD pattern
  for (const trusted of WHITELIST_DOMAINS) {
    if (domain.endsWith(`.${trusted}`) || domain === trusted) return true;
  }
  // Nigerian government and education TLDs — always safe
  if (domain.endsWith('.gov.ng') || domain.endsWith('.edu.ng') ||
      domain.endsWith('.org.ng') || domain.endsWith('.mil.ng')) return true;
  return false;
}

function isBlacklisted(input: string): boolean {
  return BLACKLIST_PATTERNS.some(pattern => pattern.test(input));
}

function hasDangerKeywords(text: string): boolean {
  const lower = text.toLowerCase();
  return DANGER_KEYWORDS.some(kw => lower.includes(kw));
}

function hasSuspiciousKeywords(text: string): boolean {
  const lower = text.toLowerCase();
  return SUSPICIOUS_KEYWORDS.some(kw => lower.includes(kw));
}

function isURLShortener(domain: string): boolean {
  return URL_SHORTENERS.includes(domain);
}

// ── Layer 3: Gemini AI ───────────────────────────────────────────────────────
async function analyzeWithGemini(input: string): Promise<DetectionResult> {
  const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`;

  const prompt = `You are ScamShield NG, a cybersecurity AI trained specifically on Nigerian internet scams, fraud patterns, and digital threats.

Your job: analyze the following content and determine if it is SAFE, SUSPICIOUS, or SCAM.

IMPORTANT CONTEXT FOR NIGERIA:
- Nigerian government sites use .gov.ng, .edu.ng, .org.ng domains — these are SAFE
- Nigerian fintechs like Paystack, Flutterwave, Kuda, OPay, PalmPay, Cowrywise are SAFE
- 3MTT, NITDA, JAMB, WAEC, NECO, CBN official communications are SAFE
- Vercel (.vercel.app) and Netlify (.netlify.app) are developer hosting platforms — do NOT flag as scam by default
- Unknown .com domains are NOT automatically scams — check content and context
- Unfamiliar domains alone are NOT enough reason to flag as suspicious

COMMON NIGERIAN SCAM PATTERNS to watch for:
- Requests for BVN, NIN, ATM PIN, or OTP via link or message
- Fake CBN grants, Npower payments, Trader Moni schemes
- "You have won" messages with links
- Fake bank alerts asking you to "verify" your account
- URL shorteners hiding destination
- Urgency language: "Act now", "Limited time", "Your account will be suspended"
- Requests to send airtime or recharge cards as payment
- Investment schemes promising guaranteed returns or "double your money"

Content to analyze:
"""
${input}
"""

Respond in this EXACT JSON format with no extra text:
{
  "verdict": "safe" | "suspicious" | "scam",
  "explanation": "One clear sentence in plain English explaining why, written for a non-technical Nigerian. Maximum 30 words."
}`;

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { temperature: 0.1, maxOutputTokens: 200 },
    }),
  });

  if (!response.ok) throw new Error('Gemini API error');

  const data = await response.json();
  const raw = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
  const clean = raw.replace(/```json|```/g, '').trim();
  const parsed = JSON.parse(clean);

  return {
    verdict: parsed.verdict,
    explanation: parsed.explanation,
    detectedBy: 'ai',
  };
}

// ── Main detection function ──────────────────────────────────────────────────
export async function detectScam(input: string): Promise<DetectionResult> {
  const trimmed = input.trim();
  const domain = extractDomain(trimmed);

  // Layer 1a — Whitelist check
  if (domain && isWhitelisted(domain)) {
    return {
      verdict: 'safe',
      explanation: `${domain} is a verified, trusted Nigerian platform or government site.`,
      detectedBy: 'whitelist',
    };
  }

  // Layer 1b — Blacklist check
  if (isBlacklisted(trimmed)) {
    return {
      verdict: 'scam',
      explanation: 'This matches a known Nigerian scam pattern. Do not click or share any details.',
      detectedBy: 'blacklist',
    };
  }

  // Layer 2 — Heuristic checks
  if (domain && isURLShortener(domain)) {
    return {
      verdict: 'suspicious',
      explanation: 'This is a shortened link hiding the real destination. Be careful — scammers often use these.',
      detectedBy: 'heuristic',
    };
  }

  if (hasDangerKeywords(trimmed)) {
    return {
      verdict: 'scam',
      explanation: 'This message is asking for sensitive information like your BVN, PIN, or OTP — a classic scam tactic.',
      detectedBy: 'heuristic',
    };
  }

  if (hasSuspiciousKeywords(trimmed)) {
    return {
      verdict: 'suspicious',
      explanation: 'This message uses language commonly found in Nigerian scam attempts. Verify before clicking anything.',
      detectedBy: 'heuristic',
    };
  }

  // Layer 3 — Gemini AI (only for ambiguous cases)
  try {
    return await analyzeWithGemini(trimmed);
  } catch {
    // Fallback if Gemini fails
    return {
      verdict: 'suspicious',
      explanation: 'We could not fully analyze this right now. Proceed with caution.',
      detectedBy: 'ai',
    };
  }
  }
  
