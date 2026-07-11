import type { VercelRequest, VercelResponse } from '@vercel/node';

const COMMUNITY_THRESHOLD = 3;
const SUPABASE_URL = 'https://wtslnanmrijcmgabnpgg.supabase.co';

// ── WHITELIST ────────────────────────────────────────────────────────────────
const GOV_PRESIDENCY = ['statehouse.gov.ng','vpo.gov.ng','nass.gov.ng','senate.gov.ng','hon.gov.ng','supremecourt.gov.ng','courtofappeal.gov.ng','services.gov.ng'];
const GOV_MINISTRIES = ['finance.gov.ng','health.gov.ng','education.gov.ng','foreignaffairs.gov.ng','justice.gov.ng','defence.gov.ng','fmcide.gov.ng','fmard.gov.ng','works.gov.ng','aviation.gov.ng','fmino.gov.ng','scienceandtech.gov.ng','interior.gov.ng','power.gov.ng','petroleum.gov.ng','trade.gov.ng','labour.gov.ng','housing.gov.ng','transport.gov.ng','women.gov.ng','youth.gov.ng','sports.gov.ng','environment.gov.ng','water.gov.ng'];
const GOV_FINANCE = ['cbn.gov.ng','firs.gov.ng','customs.gov.ng','cac.gov.ng','dmo.gov.ng','budgetoffice.gov.ng','nipc.gov.ng','bpp.gov.ng','smedan.gov.ng','nse.com.ng','ngxgroup.com','sec.gov.ng','pencom.gov.ng','nnpcgroup.com','nmdpra.gov.ng'];
const GOV_SECURITY = ['npf.gov.ng','army.mil.ng','navy.mil.ng','airforce.mil.ng','efcc.gov.ng','icpc.gov.ng','ndlea.gov.ng','dss.gov.ng','nscdc.gov.ng'];
const GOV_SERVICES = ['immigration.gov.ng','nimc.gov.ng','inecnigeria.org','nafdac.gov.ng','ncdc.gov.ng','ncc.gov.ng','nitda.gov.ng','jamb.gov.ng','son.gov.ng','faan.gov.ng','nigerianports.gov.ng','nhrc.gov.ng','naptip.gov.ng','nesrea.gov.ng','nuprc.gov.ng','mdas.gov.ng','frsc.gov.ng','nipost.gov.ng','dti.gov.ng','cenbank.org'];
const GOV_STATES = ['abiastate.gov.ng','adamawa.gov.ng','akwaibomstate.gov.ng','anambra.gov.ng','bauchistate.gov.ng','bayelsa.gov.ng','benue.gov.ng','borno.gov.ng','crossriverstate.gov.ng','deltastate.gov.ng','ebonyistate.gov.ng','edostate.gov.ng','ekitistate.gov.ng','enugu.gov.ng','gombestate.gov.ng','imostate.gov.ng','jigawa.gov.ng','kadstate.gov.ng','kanostate.gov.ng','katsinastate.gov.ng','kebbistate.gov.ng','kogi.gov.ng','kwarastate.gov.ng','lagosstate.gov.ng','nasarawastate.gov.ng','nigerstate.gov.ng','oyostate.gov.ng','osun.gov.ng','ondobstate.gov.ng','ogun.gov.ng','plateau.gov.ng','riversstate.gov.ng','sokoto.gov.ng','taraba.gov.ng','yobe.gov.ng','zamfara.gov.ng','fcta.gov.ng'];
const UNIVERSITIES_FEDERAL = ['atbu.edu.ng','abu.edu.ng','buk.edu.ng','fugashua.edu.ng','fupre.edu.ng','futa.edu.ng','futminna.edu.ng','futo.edu.ng','fud.edu.ng','fudutsinma.edu.ng','fukashere.edu.ng','fulafia.edu.ng','fulokoja.edu.ng','funai.edu.ng','fuotuoke.edu.ng','fuoye.edu.ng','fuwukari.edu.ng','fubk.edu.ng','fugusau.edu.ng','mouau.edu.ng','mautech.edu.ng','nou.edu.ng','polac.edu.ng','nda.edu.ng','unizik.edu.ng','oauife.edu.ng','uniabuja.edu.ng','unaab.edu.ng','uam.edu.ng','uniben.edu.ng','unical.edu.ng','ui.edu.ng','unilorin.edu.ng','unijos.edu.ng','unilag.edu.ng','unimaid.edu.ng','unn.edu.ng','uniport.edu.ng','uniuyo.edu.ng','udusok.edu.ng','nmu.edu.ng','afit.edu.ng','naub.edu.ng','kdums.edu.ng','adun.edu.ng','futd.edu.ng','aaau.edu.ng','fuahse.edu.ng','fustkabo.edu.ng'];
const UNIVERSITIES_OTHER = ['babcock.edu.ng','iuokada.edu.ng','madonnauniversity.edu.ng','bowen.edu.ng','biu.edu.ng','covenantuniversity.edu.ng','pau.edu.ng','aun.edu.ng','acu.edu.ng','nileuniversity.edu.ng','lmu.edu.ng','afe.edu.ng','redeemers.edu.ng','baze.edu.ng','adelekeuniversity.edu.ng','caluniversity.edu.ng','landmark.edu.ng','westernuniversity.edu.ng','mountaintop.edu.ng','lasu.edu.ng','rsust.edu.ng','imsu.edu.ng','tasued.edu.ng','aaua.edu.ng','kasu.edu.ng','kwasu.edu.ng','nsuk.edu.ng','plasu.edu.ng','tsuniversity.edu.ng','umyu.edu.ng','eksu.edu.ng','ebsu.edu.ng'];

// Nigerian Banks & Fintech
const NIGERIAN_FINTECH = ['paystack.com','flutterwave.com','interswitch.com','opay.com','palmpay.com','kuda.com','moniepoint.com','teamapt.com','monnify.com','paga.com','carbon.ng','getcarbon.co','fairmoney.ng','piggyvest.com','cowrywise.com','bamboofinance.io','risevest.com','troveapp.co','chaka.ng','gtbank.com','accessbankplc.com','zenithbank.com','firstbanknigeria.com','ubagroup.com','stanbicibtc.com','fcmb.com','unionbankng.com','sterlingbank.com','polaris-bank.com','fidelitybank.ng','ecobank.com','wemabank.com','providusbank.com','vfdmfb.com','quidax.com','buycoins.africa','yellowcard.io','chipper.cash','chippercash.com','sendcash.africa','lemfi.com','grey.co','geegpay.com','cleva.com','nala.money'];

// Nigerian E-commerce & Marketplace
const NIGERIAN_ECOMMERCE = ['jumia.com','jumia.com.ng','konga.com','jiji.ng','jiji.com.ng','payporte.com','slot.ng','pointek.com.ng','fouani.com','spar.com.ng','shoprite.com.ng','hubmart.com','justrite.com.ng','supermart.ng','market.ng','obiwezy.com','whogohost.com','buypower.ng','clubkonnect.com','vtpass.com','baxi.ng','quickteller.com','ogdams.com','aajmerchandise.com.ng','printivo.com','printmytee.com.ng'];

// Nigerian Transport & Logistics
const NIGERIAN_TRANSPORT = ['uber.com','bolt.eu','rida.com.ng','shuttlers.ng','gigm.com','ctsmobile.com.ng','abc-transport.com','guo-transport.com','young-shall-grow.com','peace-transport.com','firstmonie.com','sendbox.co','kobo360.com','topship.africa','dellyman.com','kwik.delivery','gokada.co','max.ng','treepz.com'];

// Nigerian News & Media
const NIGERIAN_NEWS = ['punchng.com','vanguardngr.com','thisdaylive.com','thecable.ng','premiumtimesng.com','channelstv.com','arise.tv','nta.ng','businessday.ng','nairametrics.com','techpoint.africa','nairaland.com','legit.ng','informationng.com','dailypost.ng','saharareporters.com','guardian.ng','nation.africa','sunnewsonline.com','leadership.ng','blueprint.ng','independent.ng','nationalhelm.com','36ng.ng','pulse.ng','bellanaija.com','lindaikejiblog.com','thenationonlineng.net','tribuneonlineng.com'];

// Nigerian Tech, Education & Programs
const NIGERIAN_TECH_EDU = ['3mtt.nitda.gov.ng','gebeya.com','mydala.app','dala.gebeya.com','npower.gov.ng','waec.org.ng','waecdirect.org','neco.gov.ng','nbte.gov.ng','nuc.edu.ng','jamb.org.ng','jobberman.com','myjobmag.com','ngcareers.com','hotnigerianjobs.com','scholarshipng.com','scholarshipregion.com','myschoolgist.com','naijascholarships.com','myschool.ng','schools.com.ng','schoolings.org','techcabal.com','techeconomy.ng','disrupt-africa.com','mtn.ng','mtn.com.ng','airtel.com.ng','glo.com','9mobile.com.ng','smile.com.ng','spectranet.com.ng','ipnx.com.ng','swift.com.ng','coollink.ng','ntel.ng'];

// Nigerian Betting (verified legitimate platforms)
const NIGERIAN_BETTING = ['bet9ja.com','betking.com','sportybet.com','nairabet.com','merrybet.com','1960bet.com','paripesa.ng','bangbet.com','betway.com.ng','22bet.com.ng','1xbet.com.ng','accessbet.com','betensured.com','supabets.com.ng'];

// Nigerian Entertainment & Streaming
const NIGERIAN_ENTERTAINMENT = ['nkiri.com','netflix.com','showmax.com','iroko.tv','irokotv.com','audiomack.com','boomplay.com','spotify.com','audiomack.com','youtube.com','tubi.tv','zee5.com','dstv.com','gotv.com.ng','startimes.com.ng','africamagic.tv','soundcloud.com'];

// Nigerian Grants, Scholarships & Opportunities
const NIGERIAN_GRANTS = ['tetfund.gov.ng','nitda.gov.ng','nrsa.gov.ng','ptdf.gov.ng','who.int','adb.org','worldbank.org','undp.org','usaid.gov','britishcouncil.org.ng','commonwealthscholarships.ac.uk','opportunitiesforafricans.com','afterschoolafrica.com','scholarshipportal.com','opportunitydesk.org'];

// ScamShield own domains
const SCAMSHIELD = ['scamshield-ng.vercel.app','scamshieldng.com','scamshield.ng','scamshield-ng-sentinel.vercel.app','scamshield-ng-web.vercel.app'];

// Global trusted platforms
const GLOBAL_TRUSTED = [
  // Search & productivity
  'google.com','gmail.com','youtube.com','microsoft.com','office.com','outlook.com','office365.com','teams.microsoft.com','apple.com','icloud.com','amazon.com','aws.amazon.com',
  // Social media
  'facebook.com','instagram.com','twitter.com','x.com','linkedin.com','whatsapp.com','telegram.org','snapchat.com','tiktok.com','pinterest.com','reddit.com','quora.com','discord.com','threads.net',
  // E-commerce global
  'walmart.com','aliexpress.com','alibaba.com','ebay.com','etsy.com','shopify.com','shein.com','alibaba.com','dhgate.com','wish.com',
  // Dev & hosting
  'github.com','vercel.app','netlify.app','heroku.com','render.com','railway.app','supabase.com','firebase.google.com','cloudflare.com','digitalocean.com','linode.com',
  // Info & learning
  'wikipedia.org','stackoverflow.com','medium.com','substack.com','coursera.org','udemy.com','edx.org','khan academy.org','freecodecamp.org','w3schools.com','mdn.mozilla.org',
  // Finance global
  'paypal.com','stripe.com','wise.com','remitly.com','westernunion.com','moneygram.com',
  // Communication & tools
  'zoom.us','slack.com','notion.so','figma.com','canva.com','trello.com','asana.com','dropbox.com','drive.google.com','docs.google.com',
  // International orgs
  'un.org','who.int','worldbank.org','unicef.org','undp.org','afdb.org','au.int',
  // AI platforms
  'anthropic.com','openai.com','gemini.google.com','claude.ai','chatgpt.com',
  // Streaming global
  'netflix.com','disneyplus.com','hulu.com','primevideo.com','hbomax.com',
  // Other major
  'msn.com','yahoo.com','bing.com','duckduckgo.com','samsung.com','huawei.com','techcrunch.com','theverge.com','wired.com',
];

const WHITELIST_DOMAINS = new Set([
  ...GOV_PRESIDENCY,...GOV_MINISTRIES,...GOV_FINANCE,...GOV_SECURITY,...GOV_SERVICES,...GOV_STATES,
  ...UNIVERSITIES_FEDERAL,...UNIVERSITIES_OTHER,
  ...NIGERIAN_FINTECH,...NIGERIAN_ECOMMERCE,...NIGERIAN_TRANSPORT,...NIGERIAN_NEWS,
  ...NIGERIAN_TECH_EDU,...NIGERIAN_BETTING,...NIGERIAN_ENTERTAINMENT,...NIGERIAN_GRANTS,
  ...SCAMSHIELD,...GLOBAL_TRUSTED,
]);

const BLACKLIST_PATTERNS = [/cbn[\s\-_]*grant/i,/central[\s\-_]*bank[\s\-_]*grant/i,/nigerian[\s\-_]*government[\s\-_]*grant/i,/fgn[\s\-_]*palliative/i,/trader[\s\-_]*moni[\s\-_]*(payment|link|portal)/i,/verify[\s\-_]*your[\s\-_]*(account|bvn|atm|card)/i,/account[\s\-_]*will[\s\-_]*be[\s\-_]*(suspended|blocked|frozen)/i,/double[\s\-_]*your[\s\-_]*(money|investment|capital)/i,/guaranteed[\s\-_]*(return|profit|income)/i,/\d+%[\s\-_]*daily[\s\-_]*(return|profit|interest)/i,/mmm[\s\-_]*(nigeria|recovery|revival)/i,/you[\s\-_]*have[\s\-_]*(won|been[\s\-_]*selected)/i,/unclaimed[\s\-_]*fund/i,/inheritance[\s\-_]*(fund|money|transfer)/i,/nigerian[\s\-_]*prince/i,/advance[\s\-_]*fee/i,/419/i,/send[\s\-_]*your[\s\-_]*(otp|pin|bvn|nin|password)/i,/enter[\s\-_]*your[\s\-_]*(otp|pin|bvn|nin)/i,/send[\s\-_]*(airtime|recharge[\s\-_]*card)/i,/work[\s\-_]*from[\s\-_]*home[\s\-_]*(earn|make)[\s\-_]*\d+/i,/earn[\s\-_]*\d{4,}[\s\-_]*(naira|ngn)[\s\-_]*(daily|per[\s\-_]*day)/i];
const URL_SHORTENERS = new Set(['bit.ly','tinyurl.com','ow.ly','t.co','goo.gl','shorte.st','adf.ly','cur.lv','is.gd','buff.ly','rb.gy','cutt.ly','shorturl.at','tiny.cc','snip.ly','bl.ink','rebrand.ly','clck.ru','su.pr']);
const DANGER_PHRASES = ['enter your bvn','send your bvn','provide your bvn','enter your nin','send your nin','enter your atm pin','send your pin','enter your otp','send your otp','provide your otp','click to claim your prize','you have won','you have been selected','congratulations you won','your account will be suspended','verify your account immediately','cbn grant','central bank grant','npower payment link','double your investment','guaranteed daily returns','send airtime to receive','buy recharge card and send','inheritance funds','unclaimed funds transfer','advance fee'];
const SUSPICIOUS_PHRASES = ['click here to verify','follow this link to claim','free money','investment opportunity guaranteed','forex signal group','crypto signal vip','dm us for your payment','whatsapp us to claim','call us now to receive your prize','work from home 50k daily','make money fast nigeria'];

function extractDomain(input: string): string | null {
  try {
    const withProtocol = input.startsWith('http') ? input : `https://${input}`;
    const url = new URL(withProtocol);
    return url.hostname.replace(/^www\./, '');
  } catch { return null; }
}

function isWhitelisted(domain: string): boolean {
  if (WHITELIST_DOMAINS.has(domain)) return true;
  for (const trusted of WHITELIST_DOMAINS) {
    if (domain.endsWith(`.${trusted}`)) return true;
  }
  if (domain.endsWith('.gov.ng')||domain.endsWith('.edu.ng')||domain.endsWith('.mil.ng')||domain.endsWith('.sch.ng')||domain.endsWith('.ac.ng')) return true;
  return false;
}

function hasTyposquatting(domain: string): boolean {
  const patterns = [/gtb(ank)?[-_]?(ng|nigeria|secure|verify)/i,/accessbank[-_]?(ng|alert|secure)/i,/zenith[-_]?(bank)?[-_]?(ng|alert|verify)/i,/firstbank[-_]?(ng|alert|verify)/i,/uba[-_]?(bank)?[-_]?(ng|secure|alert)/i,/cbn[-_]?(grant|portal|verify|payment)/i,/paystack[-_]?(ng|verify|secure)/i,/flutterwave[-_]?(ng|verify)/i,/opay[-_]?(verify|secure|ng|agent)/i,/palmpay[-_]?(verify|secure|ng)/i,/jamb[-_]?(portal|verify|ng|result)/i,/npower[-_]?(verify|payment|portal)/i,/jumia[-_]?(verify|secure|ng|pay)/i,/konga[-_]?(verify|secure|ng)/i];
  return patterns.some(p => p.test(domain));
}

async function getCommunityCount(url: string, anonKey: string): Promise<number> {
  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/reported_urls?url=eq.${encodeURIComponent(url)}&select=report_count`,
      { headers: { apikey: anonKey, Authorization: `Bearer ${anonKey}` } }
    );
    const data = await res.json();
    return data?.[0]?.report_count ?? 0;
  } catch { return 0; }
}

async function callGemini(input: string, apiKey: string) {
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
  const prompt = `You are ScamShield NG, a cybersecurity AI trained on Nigerian internet scams and fraud patterns.

CRITICAL RULES:
1. Nigerian government sites (.gov.ng, .edu.ng, .mil.ng) are ALWAYS safe
2. Vercel (.vercel.app), Netlify (.netlify.app), GitHub (.github.io) are developer platforms — NOT scams
3. An unknown domain alone is NOT enough to flag as suspicious or scam
4. Nigerian fintechs (Paystack, Flutterwave, Kuda, OPay, PalmPay, Cowrywise, PiggyVest) are SAFE
5. Well-known global brands (Walmart, Amazon, Netflix, Jumia, Konga, Jiji etc.) are SAFE
6. Only flag SCAM when there is clear evidence of fraud intent
7. http:// links with no SSL should be flagged as at least suspicious

NIGERIAN SCAM PATTERNS:
- Requests for BVN, NIN, ATM PIN, OTP via message or link
- Fake CBN grants, Npower payments, government palliatives
- "You have won" messages requiring fees
- Fake bank alerts asking to verify account
- Investment schemes promising guaranteed returns
- Requests to send airtime or recharge cards
- 419 advance fee fraud
- Typosquatted domains mimicking Nigerian banks

Content to analyze:
"""
${input}
"""

Respond ONLY in this exact JSON format, no other text, no markdown backticks:
{
  "verdict": "safe",
  "explanation": "One plain sentence max 25 words."
}

The verdict field must be exactly one of these three strings: safe, suspicious, scam`;

  const res = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { temperature: 0.1, maxOutputTokens: 150 },
    }),
  });
  if (!res.ok) throw new Error(`Gemini error: ${res.status}`);
  const data = await res.json();
  const raw = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
  const clean = raw.replace(/```json|```/g, '').trim();
  const jsonMatch = clean.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error('No JSON found in Gemini response');
  return JSON.parse(jsonMatch[0]);
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { input } = req.body;
  if (!input || typeof input !== 'string') return res.status(400).json({ error: 'Invalid input' });
  const trimmed = input.trim();
  if (trimmed.length === 0) return res.status(400).json({ error: 'Empty input' });
  if (trimmed.length > 2000) return res.status(400).json({ error: 'Input too long' });

  const GEMINI_API_KEY = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY || '';
  const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || '';
  const domain = extractDomain(trimmed);

  if (trimmed.startsWith('http://')) {
    return res.json({ verdict: 'suspicious', explanation: 'This link has no SSL security (http instead of https). Avoid entering any personal details.', detectedBy: 'heuristic' });
  }

  if (domain && isWhitelisted(domain)) {
    return res.json({ verdict: 'safe', explanation: `${domain} is a verified, trusted platform.`, detectedBy: 'whitelist' });
  }

  const reportCount = await getCommunityCount(trimmed, SUPABASE_ANON_KEY);
  if (reportCount >= COMMUNITY_THRESHOLD) {
    return res.json({ verdict: 'scam', explanation: `This has been reported as a scam by ${reportCount} ScamShield users. Avoid it.`, detectedBy: 'community' });
  }

  if (BLACKLIST_PATTERNS.some(p => p.test(trimmed))) {
    return res.json({ verdict: 'scam', explanation: 'This matches a known Nigerian scam pattern. Do not click or share any personal details.', detectedBy: 'blacklist' });
  }

  if (domain && URL_SHORTENERS.has(domain)) {
    return res.json({ verdict: 'suspicious', explanation: 'This is a shortened link hiding the real destination. Scammers often use these.', detectedBy: 'heuristic' });
  }

  if (domain && hasTyposquatting(domain)) {
    return res.json({ verdict: 'scam', explanation: 'This domain is impersonating a real Nigerian bank or platform. It is likely a phishing site.', detectedBy: 'heuristic' });
  }

  const lower = trimmed.toLowerCase();
  if (DANGER_PHRASES.some(p => lower.includes(p))) {
    return res.json({ verdict: 'scam', explanation: 'This message asks for sensitive info like BVN, PIN, or OTP — a clear Nigerian scam tactic.', detectedBy: 'heuristic' });
  }

  if (SUSPICIOUS_PHRASES.some(p => lower.includes(p))) {
    return res.json({ verdict: 'suspicious', explanation: 'This uses language commonly found in Nigerian scam attempts. Verify before trusting it.', detectedBy: 'heuristic' });
  }

  try {
    const geminiResult = await callGemini(trimmed, GEMINI_API_KEY);
    return res.json({ ...geminiResult, detectedBy: 'ai' });
  } catch (err) {
    console.error('Gemini error:', err);
    // Smart fallback — clean two-part domains default to safe, suspicious otherwise
    const looksLegit = domain && !domain.includes('-') && domain.split('.').length === 2;
    return res.json({
      verdict: looksLegit ? 'safe' : 'suspicious',
      explanation: looksLegit
        ? `${domain} appears to be a legitimate website. Always stay cautious online.`
        : 'We could not fully verify this right now. Treat with caution until you can confirm.',
      detectedBy: 'ai',
    });
  }
}
