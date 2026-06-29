// ============================================================
// ScamShield NG — Detection Engine v2.0
// Research-backed whitelist of verified Nigerian domains
// Layer 1: Whitelist → Layer 2: Blacklist → Layer 3: Heuristics → Layer 4: Gemini
// ============================================================

export type Verdict = 'safe' | 'suspicious' | 'scam';

export interface DetectionResult {
  verdict: Verdict;
  explanation: string;
  detectedBy: 'whitelist' | 'blacklist' | 'heuristic' | 'ai';
}

// ── LAYER 1: WHITELIST ───────────────────────────────────────────────────────
// Nigerian Government — Presidency & Legislature
const GOV_PRESIDENCY = [
  'statehouse.gov.ng', 'vpo.gov.ng', 'nass.gov.ng', 'senate.gov.ng',
  'hon.gov.ng', 'supremecourt.gov.ng', 'courtofappeal.gov.ng',
  'services.gov.ng',
];

// Nigerian Government — Key Ministries
const GOV_MINISTRIES = [
  'finance.gov.ng', 'health.gov.ng', 'education.gov.ng',
  'foreignaffairs.gov.ng', 'justice.gov.ng', 'defence.gov.ng',
  'fmcide.gov.ng', 'fmard.gov.ng', 'works.gov.ng', 'aviation.gov.ng',
  'fmino.gov.ng', 'scienceandtech.gov.ng', 'interior.gov.ng',
  'power.gov.ng', 'petroleum.gov.ng', 'trade.gov.ng', 'labour.gov.ng',
  'housing.gov.ng', 'transport.gov.ng', 'women.gov.ng', 'youth.gov.ng',
  'sports.gov.ng', 'environment.gov.ng', 'water.gov.ng',
];

// Nigerian Government — Finance, Economy & Commerce
const GOV_FINANCE = [
  'cbn.gov.ng', 'firs.gov.ng', 'customs.gov.ng', 'cac.gov.ng',
  'dmo.gov.ng', 'budgetoffice.gov.ng', 'nipc.gov.ng', 'bpp.gov.ng',
  'smedan.gov.ng', 'nse.com.ng', 'ngxgroup.com', 'sec.gov.ng',
  'pencom.gov.ng', 'nnpcgroup.com', 'nmdpra.gov.ng',
];

// Nigerian Government — Security, Law Enforcement
const GOV_SECURITY = [
  'npf.gov.ng', 'army.mil.ng', 'navy.mil.ng', 'airforce.mil.ng',
  'efcc.gov.ng', 'icpc.gov.ng', 'ndlea.gov.ng', 'dss.gov.ng',
  'nscdc.gov.ng',
];

// Nigerian Government — Regulation & Services
const GOV_SERVICES = [
  'immigration.gov.ng', 'nimc.gov.ng', 'inecnigeria.org', 'nafdac.gov.ng',
  'ncdc.gov.ng', 'ncc.gov.ng', 'nitda.gov.ng', 'jamb.gov.ng',
  'son.gov.ng', 'faan.gov.ng', 'nigerianports.gov.ng', 'nhrc.gov.ng',
  'naptip.gov.ng', 'nesrea.gov.ng', 'nuprc.gov.ng', 'mdas.gov.ng',
  'frsc.gov.ng', 'nipost.gov.ng', 'dti.gov.ng', 'cenbank.org',
];

// Nigerian Government — State Governments
const GOV_STATES = [
  'abiastate.gov.ng', 'adamawa.gov.ng', 'akwaibomstate.gov.ng',
  'anambra.gov.ng', 'bauchistate.gov.ng', 'bayelsa.gov.ng',
  'benue.gov.ng', 'borno.gov.ng', 'crossriverstate.gov.ng',
  'deltastate.gov.ng', 'ebonyistate.gov.ng', 'edostate.gov.ng',
  'ekitistate.gov.ng', 'enugu.gov.ng', 'gombestate.gov.ng',
  'imostate.gov.ng', 'jigawa.gov.ng', 'kadstate.gov.ng',
  'kanostate.gov.ng', 'katsinastate.gov.ng', 'kebbistate.gov.ng',
  'kogi.gov.ng', 'kwarastate.gov.ng', 'lagosstate.gov.ng',
  'nasarawastate.gov.ng', 'nigerstate.gov.ng', 'oyostate.gov.ng',
  'osun.gov.ng', 'ondobstate.gov.ng', 'ogun.gov.ng',
  'plateau.gov.ng', 'riversstate.gov.ng', 'sokoto.gov.ng',
  'taraba.gov.ng', 'yobe.gov.ng', 'zamfara.gov.ng', 'fcta.gov.ng',
];

// Nigerian Federal Universities (NUC-accredited)
const UNIVERSITIES_FEDERAL = [
  'atbu.edu.ng', 'abu.edu.ng', 'buk.edu.ng', 'fugashua.edu.ng',
  'fupre.edu.ng', 'futa.edu.ng', 'futminna.edu.ng', 'futo.edu.ng',
  'fud.edu.ng', 'fudutsinma.edu.ng', 'fukashere.edu.ng', 'fulafia.edu.ng',
  'fulokoja.edu.ng', 'funai.edu.ng', 'fuotuoke.edu.ng', 'fuoye.edu.ng',
  'fuwukari.edu.ng', 'fubk.edu.ng', 'fugusau.edu.ng', 'mouau.edu.ng',
  'mautech.edu.ng', 'nou.edu.ng', 'polac.edu.ng', 'nda.edu.ng',
  'unizik.edu.ng', 'oauife.edu.ng', 'uniabuja.edu.ng', 'unaab.edu.ng',
  'uam.edu.ng', 'uniben.edu.ng', 'unical.edu.ng', 'ui.edu.ng',
  'unilorin.edu.ng', 'unijos.edu.ng', 'unilag.edu.ng', 'unimaid.edu.ng',
  'unn.edu.ng', 'uniport.edu.ng', 'uniuyo.edu.ng', 'udusok.edu.ng',
  'nmu.edu.ng', 'afit.edu.ng', 'naub.edu.ng', 'kdums.edu.ng',
  'adun.edu.ng', 'futd.edu.ng', 'aaau.edu.ng', 'fuahse.edu.ng',
  'fustkabo.edu.ng',
];

// Nigerian Private & State Universities (NUC-accredited)
const UNIVERSITIES_OTHER = [
  'babcock.edu.ng', 'iuokada.edu.ng', 'madonnauniversity.edu.ng',
  'bowen.edu.ng', 'biu.edu.ng', 'covenantuniversity.edu.ng',
  'pau.edu.ng', 'aun.edu.ng', 'acu.edu.ng', 'nileuniversity.edu.ng',
  'lmu.edu.ng', 'afe.edu.ng', 'redeemers.edu.ng', 'baze.edu.ng',
  'adelekeuniversity.edu.ng', 'caluniversity.edu.ng', 'landmark.edu.ng',
  'westernuniversity.edu.ng', 'mountaintop.edu.ng', 'fuwukari.edu.ng',
  'unilag.edu.ng', 'eksu.edu.ng', 'ebsu.edu.ng', 'fce.edu.ng',
  'lasu.edu.ng', 'rsust.edu.ng', 'imsu.edu.ng', 'tasued.edu.ng',
  'aaua.edu.ng', 'kasu.edu.ng', 'kwasu.edu.ng', 'nsuk.edu.ng',
  'plasu.edu.ng', 'tsuniversity.edu.ng', 'umyu.edu.ng',
];

// Nigerian Fintech & Banks
const NIGERIAN_FINTECH = [
  // Payment processors
  'paystack.com', 'flutterwave.com', 'interswitch.com',
  // Digital banks & wallets
  'opay.com', 'palmpay.com', 'kuda.com', 'moniepoint.com',
  'teamapt.com', 'monnify.com', 'paga.com', 'carbon.ng',
  'getcarbon.co', 'fairmoney.ng',
  // Savings & investment
  'piggyvest.com', 'cowrywise.com', 'bamboofinance.io',
  'risevest.com', 'troveapp.co', 'chaka.ng', 'investify.ng',
  // Traditional banks
  'gtbank.com', 'accessbankplc.com', 'zenithbank.com',
  'firstbanknigeria.com', 'ubagroup.com', 'stanbicibtc.com',
  'fcmb.com', 'unionbankng.com', 'sterlingbank.com',
  'polaris-bank.com', 'fidelitybank.ng', 'ecobank.com',
  'wemabank.com', 'heritagebankng.com', 'providusbank.com',
  'abcmfbng.com', 'vfdmfb.com',
  // Crypto & others
  'quidax.com', 'buycoins.africa', 'yellowcard.io',
];

// Nigerian Tech, Education & Job Platforms
const NIGERIAN_TECH_EDU = [
  // Programs & initiatives
  '3mtt.nitda.gov.ng', 'gebeya.com', 'mydala.app', 'dala.gebeya.com',
  'npower.gov.ng',
  // Education & exams
  'waec.org.ng', 'waecdirect.org', 'neco.gov.ng', 'nbte.gov.ng',
  'nuc.edu.ng', 'jamb.org.ng',
  // Job & scholarship portals
  'jobberman.com', 'myjobmag.com', 'ngcareers.com', 'hotnigerianjobs.com',
  'scholarshipng.com', 'scholarshipregion.com', 'myschoolgist.com',
  'naijascholarships.com',
  // Nigerian news & info (verified)
  'punchng.com', 'thisdaylive.com', 'vanguardngr.com', 'thecable.ng',
  'premiumtimesng.com', 'channelstv.com', 'arise.tv', 'nta.ng',
  'businessday.ng', 'nairametrics.com', 'techpoint.africa',
  // Telecom
  'mtn.ng', 'mtn.com.ng', 'airtel.com.ng', 'glo.com', 'gloworld.com',
  '9mobile.com.ng',
  // ScamShield itself
  'scamshield-ng.vercel.app', 'scamshieldng.com', 'scamshield.ng',
  'scamshield-ng-sentinel.vercel.app',
];

// Global trusted platforms
const GLOBAL_TRUSTED = [
  // Big tech
  'google.com', 'gmail.com', 'youtube.com', 'drive.google.com',
  'microsoft.com', 'office.com', 'outlook.com', 'apple.com',
  'amazon.com', 'aws.amazon.com',
  // Social & communication
  'facebook.com', 'instagram.com', 'twitter.com', 'x.com',
  'linkedin.com', 'whatsapp.com', 'telegram.org', 'snapchat.com',
  'tiktok.com', 'pinterest.com',
  // Dev & hosting
  'github.com', 'vercel.app', 'netlify.app', 'heroku.com',
  'render.com', 'railway.app', 'supabase.com', 'firebase.google.com',
  // Info & reference
  'wikipedia.org', 'stackoverflow.com', 'medium.com',
  // International orgs
  'un.org', 'who.int', 'worldbank.org', 'unicef.org', 'undp.org',
  'anthropic.com', 'openai.com', 'gemini.google.com',
];

// Build the full whitelist Set
const WHITELIST_DOMAINS = new Set([
  ...GOV_PRESIDENCY, ...GOV_MINISTRIES, ...GOV_FINANCE,
  ...GOV_SECURITY, ...GOV_SERVICES, ...GOV_STATES,
  ...UNIVERSITIES_FEDERAL, ...UNIVERSITIES_OTHER,
  ...NIGERIAN_FINTECH, ...NIGERIAN_TECH_EDU, ...GLOBAL_TRUSTED,
]);

// ── LAYER 2: BLACKLIST PATTERNS ──────────────────────────────────────────────
const BLACKLIST_PATTERNS = [
  // Fake CBN/government grant scams
  /cbn[\s\-_]*grant/i,
  /central[\s\-_]*bank[\s\-_]*grant/i,
  /nigerian[\s\-_]*government[\s\-_]*grant/i,
  /fgn[\s\-_]*palliative/i,
  /trader[\s\-_]*moni[\s\-_]*(payment|link|portal)/i,
  /n[\-power|power][\s\-_]*(payment|verification|portal|alert)/i,
  /conditional[\s\-_]*cash[\s\-_]*transfer[\s\-_]*link/i,
  // Fake bank scams
  /verify[\s\-_]*your[\s\-_]*(account|bvn|atm|card)/i,
  /account[\s\-_]*will[\s\-_]*be[\s\-_]*(suspended|blocked|frozen)/i,
  /your[\s\-_]*(gtbank|access|zenith|uba|first[\s\-]?bank)[\s\-_]*account[\s\-_]*(alert|warning)/i,
  // Investment scams
  /double[\s\-_]*your[\s\-_]*(money|investment|capital)/i,
  /guaranteed[\s\-_]*(return|profit|income)/i,
  /\d+%[\s\-_]*daily[\s\-_]*(return|profit|interest)/i,
  /ponzi/i,
  /mmm[\s\-_]*(nigeria|recovery|revival)/i,
  // 419 patterns
  /you[\s\-_]*have[\s\-_]*(won|been[\s\-_]*selected)/i,
  /unclaimed[\s\-_]*fund/i,
  /inheritance[\s\-_]*(fund|money|transfer)/i,
  /nigerian[\s\-_]*prince/i,
  /advance[\s\-_]*fee/i,
  /419/i,
  // OTP/PIN theft
  /send[\s\-_]*your[\s\-_]*(otp|pin|bvn|nin|password)/i,
  /enter[\s\-_]*your[\s\-_]*(otp|pin|bvn|nin)/i,
  /your[\s\-_]*(otp|pin|bvn)[\s\-_]*is[\s\-_]*required/i,
  // Recharge card scams
  /send[\s\-_]*(airtime|recharge[\s\-_]*card)/i,
  /buy[\s\-_]*recharge[\s\-_]*card[\s\-_]*for[\s\-_]*me/i,
  // Fake job scams
  /work[\s\-_]*from[\s\-_]*home[\s\-_]*(earn|make)[\s\-_]*\d+/i,
  /earn[\s\-_]*\d{4,}[\s\-_]*(naira|ngn)[\s\-_]*(daily|per[\s\-_]*day)/i,
  /no[\s\-_]*experience[\s\-_]*needed[\s\-_]*(earn|make)/i,
];

// ── LAYER 3: HEURISTIC CHECKS ────────────────────────────────────────────────
const URL_SHORTENERS = new Set([
  'bit.ly', 'tinyurl.com', 'ow.ly', 't.co', 'goo.gl',
  'shorte.st', 'adf.ly', 'cur.lv', 'is.gd', 'buff.ly',
  'rb.gy', 'cutt.ly', 'shorturl.at', 'tiny.cc', 'snip.ly',
  'bl.ink', 'rebrand.ly', 'clck.ru', 'su.pr',
]);

const DANGER_PHRASES = [
  'enter your bvn', 'send your bvn', 'provide your bvn',
  'enter your nin', 'send your nin', 'provide your nin',
  'enter your atm pin', 'send your pin', 'your pin number',
  'enter your otp', 'send your otp', 'provide your otp',
  'enter your password', 'send your password',
  'click to claim your prize', 'claim your reward',
  'you have won', 'you have been selected',
  'congratulations you won', 'congratulations! you have won',
  'act now to claim', 'limited time to claim',
  'your account will be suspended', 'your account has been compromised',
  'verify your account immediately', 'your bank account is at risk',
  'cbn grant', 'central bank grant', 'government palliative link',
  'npower payment link', 'trader moni payment',
  'double your investment', 'triple your money',
  'guaranteed daily returns', '100% return guaranteed',
  'wire transfer fee', 'processing fee required',
  'send airtime to receive', 'buy recharge card and send',
  'inheritance funds', 'unclaimed funds transfer',
  'advance fee', 'transfer charges upfront',
];

const SUSPICIOUS_PHRASES = [
  'click here to verify', 'follow this link to claim',
  'free money', 'earn from home without stress',
  'investment opportunity guaranteed', 'forex signal group',
  'crypto signal vip', 'pump and dump',
  'dm us for your payment', 'whatsapp us to claim',
  'call us now to receive your prize',
  'bitcoin investment platform', 'ponzi scheme',
  'referral bonus unlimited', 'mlm opportunity nigeria',
  'work from home 50k daily', 'make money fast nigeria',
];

// ── HELPER FUNCTIONS ─────────────────────────────────────────────────────────
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
  for (const trusted of WHITELIST_DOMAINS) {
    if (domain.endsWith(`.${trusted}`)) return true;
  }
  // All .gov.ng, .edu.ng, .mil.ng, .sch.ng are restricted Nigerian TLDs — always safe
  if (
    domain.endsWith('.gov.ng') ||
    domain.endsWith('.edu.ng') ||
    domain.endsWith('.mil.ng') ||
    domain.endsWith('.sch.ng') ||
    domain.endsWith('.ac.ng')
  ) return true;
  return false;
}

function isBlacklisted(input: string): boolean {
  return BLACKLIST_PATTERNS.some(p => p.test(input));
}

function hasDangerPhrases(text: string): boolean {
  const lower = text.toLowerCase();
  return DANGER_PHRASES.some(p => lower.includes(p));
}

function hasSuspiciousPhrases(text: string): boolean {
  const lower = text.toLowerCase();
  return SUSPICIOUS_PHRASES.some(p => lower.includes(p));
}

function isURLShortener(domain: string): boolean {
  return URL_SHORTENERS.has(domain);
}

function hasTyposquatting(domain: string): boolean {
  // Check for common typosquatting of Nigerian banks/fintechs
  const fakeBankPatterns = [
    /gtb(ank)?[-_]?(ng|nigeria|secure|verify)/i,
    /accessbank[-_]?(ng|alert|secure)/i,
    /zenith[-_]?(bank)?[-_]?(ng|alert|verify)/i,
    /firstbank[-_]?(ng|alert|verify)/i,
    /uba[-_]?(bank)?[-_]?(ng|secure|alert)/i,
    /cbn[-_]?(grant|portal|verify|payment)/i,
    /paystack[-_]?(ng|verify|secure)/i,
    /flutterwave[-_]?(ng|verify)/i,
    /opay[-_]?(verify|secure|ng|agent)/i,
    /palmpay[-_]?(verify|secure|ng)/i,
    /jamb[-_]?(portal|verify|ng|result)/i,
    /npower[-_]?(verify|payment|portal)/i,
  ];
  return fakeBankPatterns.some(p => p.test(domain));
}

// ── LAYER 4: GEMINI AI ───────────────────────────────────────────────────────
async function analyzeWithGemini(input: string): Promise<DetectionResult> {
  const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`;

  const prompt = `You are ScamShield NG, a cybersecurity AI trained specifically on Nigerian internet scams, fraud, and digital threats. Your job is to analyze content and return a verdict.

CRITICAL RULES — READ CAREFULLY:
1. Nigerian government sites (.gov.ng, .edu.ng, .mil.ng) are ALWAYS safe — never flag them
2. Vercel (.vercel.app), Netlify (.netlify.app), GitHub (.github.io) are developer platforms — NOT scams by default
3. An unknown domain alone is NOT enough to flag something as suspicious or scam
4. Nigerian fintech platforms (Paystack, Flutterwave, Kuda, OPay, PalmPay, Cowrywise, PiggyVest) are SAFE
5. Scholarship links, job opportunity links, and educational resources are usually SAFE unless they ask for money/BVN/PIN upfront
6. Only flag as SCAM when there is clear evidence of fraud intent

NIGERIAN SCAM PATTERNS TO DETECT:
- Requests for BVN, NIN, ATM PIN, OTP via message or suspicious link
- Fake CBN grants, Npower payments, Trader Moni, government palliatives with suspicious links
- "You have won" messages requiring fees to claim prize
- Fake bank alerts asking to "verify" account via link
- Investment schemes promising guaranteed returns or "double your money"
- Requests to send airtime/recharge cards as payment
- 419 advance fee fraud patterns
- Typosquatted domains mimicking real Nigerian banks

Content to analyze:
"""
${input}
"""

Respond ONLY in this exact JSON format, no other text:
{
  "verdict": "safe" | "suspicious" | "scam",
  "explanation": "One plain sentence (max 25 words) written for a non-technical Nigerian explaining the verdict."
}`;

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { temperature: 0.1, maxOutputTokens: 150 },
    }),
  });

  if (!response.ok) throw new Error('Gemini API error');
  const data = await response.json();
  const raw = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
  const clean = raw.replace(/```json|```/g, '').trim();
  const parsed = JSON.parse(clean);
  return { verdict: parsed.verdict, explanation: parsed.explanation, detectedBy: 'ai' };
}

// ── MAIN DETECTION FUNCTION ──────────────────────────────────────────────────
export async function detectScam(input: string): Promise<DetectionResult> {
  const trimmed = input.trim();
  const domain = extractDomain(trimmed);

  // Layer 1 — Whitelist
  if (domain && isWhitelisted(domain)) {
    return {
      verdict: 'safe',
      explanation: `${domain} is a verified, trusted Nigerian or global platform.`,
      detectedBy: 'whitelist',
    };
  }

  // Layer 2 — Blacklist
  if (isBlacklisted(trimmed)) {
    return {
      verdict: 'scam',
      explanation: 'This matches a known Nigerian scam pattern. Do not click or share any personal details.',
      detectedBy: 'blacklist',
    };
  }

  // Layer 3a — URL shortener check
  if (domain && isURLShortener(domain)) {
    return {
      verdict: 'suspicious',
      explanation: 'This is a shortened link hiding the real destination. Scammers often use these to disguise dangerous sites.',
      detectedBy: 'heuristic',
    };
  }

  // Layer 3b — Typosquatting check
  if (domain && hasTyposquatting(domain)) {
    return {
      verdict: 'scam',
      explanation: 'This domain is impersonating a real Nigerian bank or platform. It is likely a phishing site.',
      detectedBy: 'heuristic',
    };
  }

  // Layer 3c — Danger phrases
  if (hasDangerPhrases(trimmed)) {
    return {
      verdict: 'scam',
      explanation: 'This message asks for sensitive information like BVN, PIN, or OTP — a clear scam tactic used in Nigeria.',
      detectedBy: 'heuristic',
    };
  }

  // Layer 3d — Suspicious phrases
  if (hasSuspiciousPhrases(trimmed)) {
    return {
      verdict: 'suspicious',
      explanation: 'This message uses language commonly found in Nigerian scam attempts. Verify carefully before trusting it.',
      detectedBy: 'heuristic',
    };
  }

  // Layer 4 — Gemini AI for ambiguous cases
  try {
    return await analyzeWithGemini(trimmed);
  } catch {
    return {
      verdict: 'suspicious',
      explanation: 'We could not fully analyze this right now. Treat with caution until you can verify.',
      detectedBy: 'ai',
    };
  }
  }
