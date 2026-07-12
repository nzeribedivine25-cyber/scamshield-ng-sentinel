import type { VercelRequest, VercelResponse } from '@vercel/node';

const COMMUNITY_THRESHOLD = 3;
const SUPABASE_URL = 'https://wtslnanmrijcmgabnpgg.supabase.co';

// ════════════════════════════════════════════════════════════
// WHITELIST — 700+ verified domains
// ════════════════════════════════════════════════════════════

const GOV_PRESIDENCY = ['statehouse.gov.ng','vpo.gov.ng','nass.gov.ng','senate.gov.ng','hon.gov.ng','supremecourt.gov.ng','courtofappeal.gov.ng','services.gov.ng','osgf.gov.ng','aso.gov.ng'];
const GOV_MINISTRIES = ['finance.gov.ng','health.gov.ng','education.gov.ng','foreignaffairs.gov.ng','justice.gov.ng','defence.gov.ng','fmcide.gov.ng','fmard.gov.ng','works.gov.ng','aviation.gov.ng','fmino.gov.ng','scienceandtech.gov.ng','interior.gov.ng','power.gov.ng','petroleum.gov.ng','trade.gov.ng','labour.gov.ng','housing.gov.ng','transport.gov.ng','women.gov.ng','youth.gov.ng','sports.gov.ng','environment.gov.ng','water.gov.ng','communications.gov.ng','humanitarianaffairs.gov.ng'];
const GOV_FINANCE = ['cbn.gov.ng','firs.gov.ng','customs.gov.ng','cac.gov.ng','dmo.gov.ng','budgetoffice.gov.ng','nipc.gov.ng','bpp.gov.ng','smedan.gov.ng','nse.com.ng','ngxgroup.com','sec.gov.ng','pencom.gov.ng','nnpcgroup.com','nmdpra.gov.ng','fmf.gov.ng','rmafc.gov.ng','oagf.gov.ng','icrc.gov.ng','nfiu.gov.ng','ndic.gov.ng'];
const GOV_SECURITY = ['npf.gov.ng','army.mil.ng','navy.mil.ng','airforce.mil.ng','efcc.gov.ng','icpc.gov.ng','ndlea.gov.ng','dss.gov.ng','nscdc.gov.ng','naptip.gov.ng'];
const GOV_SERVICES = ['immigration.gov.ng','nimc.gov.ng','inecnigeria.org','nafdac.gov.ng','ncdc.gov.ng','ncc.gov.ng','nitda.gov.ng','jamb.gov.ng','son.gov.ng','faan.gov.ng','nigerianports.gov.ng','nhrc.gov.ng','nesrea.gov.ng','nuprc.gov.ng','frsc.gov.ng','nipost.gov.ng','cenbank.org','nbc.gov.ng','naicom.gov.ng','nimasa.gov.ng','nhis.gov.ng','servicom.gov.ng','nepza.gov.ng','nbet.gov.ng','tcn.com.ng','ndlea.gov.ng'];
const GOV_STATES = ['abiastate.gov.ng','adamawa.gov.ng','akwaibomstate.gov.ng','anambra.gov.ng','bauchistate.gov.ng','bayelsa.gov.ng','benue.gov.ng','borno.gov.ng','crossriverstate.gov.ng','deltastate.gov.ng','ebonyistate.gov.ng','edostate.gov.ng','ekitistate.gov.ng','enugu.gov.ng','gombestate.gov.ng','imostate.gov.ng','jigawa.gov.ng','kadstate.gov.ng','kanostate.gov.ng','katsinastate.gov.ng','kebbistate.gov.ng','kogi.gov.ng','kwarastate.gov.ng','lagosstate.gov.ng','nasarawastate.gov.ng','nigerstate.gov.ng','oyostate.gov.ng','osun.gov.ng','ondobstate.gov.ng','ogun.gov.ng','plateau.gov.ng','riversstate.gov.ng','sokoto.gov.ng','taraba.gov.ng','yobe.gov.ng','zamfara.gov.ng','fcta.gov.ng'];
const UNIVERSITIES_FEDERAL = ['atbu.edu.ng','abu.edu.ng','buk.edu.ng','fugashua.edu.ng','fupre.edu.ng','futa.edu.ng','futminna.edu.ng','futo.edu.ng','fud.edu.ng','fudutsinma.edu.ng','fukashere.edu.ng','fulafia.edu.ng','fulokoja.edu.ng','funai.edu.ng','fuotuoke.edu.ng','fuoye.edu.ng','fuwukari.edu.ng','fubk.edu.ng','fugusau.edu.ng','mouau.edu.ng','mautech.edu.ng','nou.edu.ng','polac.edu.ng','nda.edu.ng','unizik.edu.ng','oauife.edu.ng','uniabuja.edu.ng','unaab.edu.ng','uam.edu.ng','uniben.edu.ng','unical.edu.ng','ui.edu.ng','unilorin.edu.ng','unijos.edu.ng','unilag.edu.ng','unimaid.edu.ng','unn.edu.ng','uniport.edu.ng','uniuyo.edu.ng','udusok.edu.ng','nmu.edu.ng','afit.edu.ng','naub.edu.ng','kdums.edu.ng','adun.edu.ng','futd.edu.ng','aaau.edu.ng','fuahse.edu.ng','fustkabo.edu.ng'];
const UNIVERSITIES_OTHER = ['babcock.edu.ng','iuokada.edu.ng','madonnauniversity.edu.ng','bowen.edu.ng','biu.edu.ng','covenantuniversity.edu.ng','pau.edu.ng','aun.edu.ng','acu.edu.ng','nileuniversity.edu.ng','lmu.edu.ng','afe.edu.ng','redeemers.edu.ng','baze.edu.ng','adelekeuniversity.edu.ng','caluniversity.edu.ng','landmark.edu.ng','westernuniversity.edu.ng','mountaintop.edu.ng','lasu.edu.ng','rsust.edu.ng','imsu.edu.ng','tasued.edu.ng','aaua.edu.ng','kasu.edu.ng','kwasu.edu.ng','nsuk.edu.ng','plasu.edu.ng','tsuniversity.edu.ng','umyu.edu.ng','eksu.edu.ng','ebsu.edu.ng','crutech.edu.ng','elizadeuniversity.edu.ng','spiritanuniversity.edu.ng','godfrey.edu.ng'];
const BANKS_TRADITIONAL = ['gtbank.com','accessbankplc.com','zenithbank.com','firstbanknigeria.com','ubagroup.com','stanbicibtc.com','fcmb.com','unionbankng.com','sterlingbank.com','polaris-bank.com','fidelitybank.ng','ecobank.com','wemabank.com','providusbank.com','vfdmfb.com','heritagebankng.com','keystone-bank.com','coronationbank.com','globusbank.ng','parallex.bank','premiumtrustbank.com','citibankng.com'];
const NIGERIAN_FINTECH = ['paystack.com','flutterwave.com','interswitch.com','opay.com','palmpay.com','kuda.com','moniepoint.com','teamapt.com','monnify.com','paga.com','carbon.ng','getcarbon.co','fairmoney.ng','piggyvest.com','cowrywise.com','bamboofinance.io','risevest.com','troveapp.co','chaka.ng','quidax.com','buycoins.africa','yellowcard.io','chippercash.com','sendcash.africa','lemfi.com','grey.co','geegpay.com','cleva.com','nala.money','payaza.africa','nomba.com','brass.co','mintyn.com','sparkle.com.ng','eyowo.com','aella.app','lendigo.ng','creditclan.com','sudo.africa','bankly.ng'];
const NIGERIAN_ECOMMERCE = ['jumia.com','jumia.com.ng','konga.com','jiji.ng','jiji.com.ng','payporte.com','slot.ng','pointek.com.ng','fouani.com','spar.com.ng','shoprite.com.ng','hubmart.com','justrite.com.ng','supermart.ng','buypower.ng','clubkonnect.com','vtpass.com','baxi.ng','quickteller.com','printivo.com','olist.ng','farmcrowdy.com','tradedepot.co','omnibiz.africa','wasoko.com','alerzo.com','rensource.com','dealdey.com'];
const NIGERIAN_TRANSPORT = ['uber.com','bolt.eu','rida.com.ng','shuttlers.ng','gigm.com','abc-transport.com','guo-transport.com','sendbox.co','kobo360.com','topship.africa','kwik.delivery','gokada.co','max.ng','treepz.com','chowdeck.com','glovo.com','heyfood.com.ng','vendease.com'];
const NIGERIAN_NEWS = ['punchng.com','vanguardngr.com','thisdaylive.com','thecable.ng','premiumtimesng.com','channelstv.com','arise.tv','nta.ng','businessday.ng','nairametrics.com','techpoint.africa','nairaland.com','legit.ng','informationng.com','dailypost.ng','saharareporters.com','guardian.ng','nation.africa','sunnewsonline.com','leadership.ng','blueprint.ng','independent.ng','pulse.ng','bellanaija.com','lindaikejiblog.com','thenationonlineng.net','tribuneonlineng.com','techcabal.com','stears.co','dataphyte.com','peoplesgazette.com','ripplesnigeria.com','tvcnews.tv','aljazeera.com','bbc.com','cnn.com','reuters.com','apnews.com','afp.com'];
const NIGERIAN_TECH_EDU = ['3mtt.nitda.gov.ng','gebeya.com','mydala.app','dala.gebeya.com','npower.gov.ng','waec.org.ng','waecdirect.org','neco.gov.ng','nbte.gov.ng','nuc.edu.ng','jamb.org.ng','jobberman.com','myjobmag.com','ngcareers.com','hotnigerianjobs.com','scholarshipng.com','scholarshipregion.com','myschoolgist.com','naijascholarships.com','myschool.ng','schools.com.ng','schoolings.org','naijaloaded.com.ng','propertypro.ng','tolet.com.ng','nigeriapropertycentre.com'];
const NIGERIAN_TELECOMS = ['mtn.ng','mtn.com.ng','airtel.com.ng','glo.com','gloworld.com','9mobile.com.ng','smile.com.ng','spectranet.com.ng','ipnx.com.ng','ntel.ng'];
const NIGERIAN_BETTING = ['bet9ja.com','betking.com','sportybet.com','nairabet.com','merrybet.com','1960bet.com','paripesa.ng','bangbet.com','betway.com.ng','1xbet.com.ng','accessbet.com','supabets.com.ng','msport.com','betano.com.ng'];
const NIGERIAN_ENTERTAINMENT = ['nkiri.com','showmax.com','iroko.tv','irokotv.com','audiomack.com','boomplay.com','dstv.com','gotv.com.ng','startimes.com.ng','africamagic.tv','notjustok.com','tooxclusive.com','360nobs.com','bellanaija.com'];
const NIGERIAN_GRANTS = ['tetfund.gov.ng','ptdf.gov.ng','britishcouncil.org.ng','opportunitiesforafricans.com','afterschoolafrica.com','scholarshipportal.com','opportunitydesk.org','tonyfoundation.org'];
const SCAMSHIELD = ['scamshield-ng.vercel.app','scamshieldng.com','scamshield.ng','scamshield-ng-sentinel.vercel.app','scamshield-ng-web.vercel.app'];
const GLOBAL_SOCIAL = ['facebook.com','instagram.com','twitter.com','x.com','linkedin.com','whatsapp.com','telegram.org','snapchat.com','tiktok.com','pinterest.com','reddit.com','quora.com','discord.com','threads.net','tumblr.com','twitch.tv','signal.org','viber.com','skype.com','wechat.com','clubhouse.com','bereal.com'];
const GLOBAL_PRODUCTIVITY = ['google.com','gmail.com','youtube.com','microsoft.com','office.com','outlook.com','apple.com','icloud.com','amazon.com','aws.amazon.com','zoom.us','slack.com','notion.so','figma.com','canva.com','trello.com','asana.com','dropbox.com','drive.google.com','docs.google.com','airtable.com','monday.com','clickup.com','miro.com','loom.com','typeform.com','hubspot.com','salesforce.com','zendesk.com','intercom.com','mailchimp.com','sendgrid.com'];
const GLOBAL_ECOMMERCE = ['walmart.com','aliexpress.com','alibaba.com','ebay.com','etsy.com','shopify.com','shein.com','dhgate.com','amazon.co.uk','bestbuy.com','target.com','nike.com','adidas.com','zara.com','hm.com','ikea.com','booking.com','airbnb.com','tripadvisor.com','expedia.com','hotels.com'];
const GLOBAL_FINANCE = ['paypal.com','stripe.com','wise.com','remitly.com','westernunion.com','moneygram.com','worldremit.com','sendwave.com','coinbase.com','binance.com','kraken.com','blockchain.com','crypto.com','ledger.com','trezor.io'];
const GLOBAL_DEV = ['github.com','vercel.app','netlify.app','heroku.com','render.com','railway.app','supabase.com','firebase.google.com','cloudflare.com','digitalocean.com','vultr.com','hostinger.com','namecheap.com','godaddy.com','wordpress.com','wix.com','squarespace.com','webflow.com','bluehost.com','siteground.com'];
const GLOBAL_LEARNING = ['wikipedia.org','stackoverflow.com','medium.com','substack.com','coursera.org','udemy.com','edx.org','khanacademy.org','freecodecamp.org','w3schools.com','developer.mozilla.org','leetcode.com','hackerrank.com','codecademy.com','pluralsight.com','skillshare.com','duolingo.com','brilliant.org','udacity.com','datacamp.com','futurelearn.com'];
const GLOBAL_STREAMING = ['netflix.com','disneyplus.com','hulu.com','primevideo.com','max.com','spotify.com','soundcloud.com','deezer.com','tidal.com','apple.com','youtube.com','twitch.tv'];
const INTL_ORGS = ['un.org','who.int','worldbank.org','unicef.org','undp.org','afdb.org','au.int','adb.org','imf.org','wto.org','ilo.org','fao.org','unhcr.org','wfp.org','iom.int','usaid.gov','britishcouncil.org','giz.de','interpol.int'];
const AI_TECH = ['anthropic.com','openai.com','gemini.google.com','claude.ai','chatgpt.com','perplexity.ai','huggingface.co','cohere.com','mistral.ai','stability.ai','ideogram.ai','runwayml.com','elevenlabs.io','pika.art','suno.ai','udio.com','jasper.ai','copy.ai','writesonic.com','grammarly.com'];
const GLOBAL_OTHER = ['msn.com','yahoo.com','bing.com','duckduckgo.com','samsung.com','techcrunch.com','theverge.com','wired.com','forbes.com','bloomberg.com','ft.com','economist.com','bbc.co.uk','theguardian.com','nytimes.com','washingtonpost.com','cnbc.com','zdnet.com','cnet.com','pcmag.com','adobe.com','autodesk.com','atlassian.com','jetbrains.com','vmware.com','oracle.com','ibm.com','cisco.com','dell.com','hp.com','lenovo.com','asus.com','acer.com'];

const WHITELIST_DOMAINS = new Set([
  ...GOV_PRESIDENCY,...GOV_MINISTRIES,...GOV_FINANCE,...GOV_SECURITY,...GOV_SERVICES,...GOV_STATES,
  ...UNIVERSITIES_FEDERAL,...UNIVERSITIES_OTHER,...BANKS_TRADITIONAL,...NIGERIAN_FINTECH,
  ...NIGERIAN_ECOMMERCE,...NIGERIAN_TRANSPORT,...NIGERIAN_NEWS,...NIGERIAN_TECH_EDU,
  ...NIGERIAN_TELECOMS,...NIGERIAN_BETTING,...NIGERIAN_ENTERTAINMENT,...NIGERIAN_GRANTS,...SCAMSHIELD,
  ...GLOBAL_SOCIAL,...GLOBAL_PRODUCTIVITY,...GLOBAL_ECOMMERCE,...GLOBAL_FINANCE,...GLOBAL_DEV,
  ...GLOBAL_LEARNING,...GLOBAL_STREAMING,...INTL_ORGS,...AI_TECH,...GLOBAL_OTHER,
]);

// ════════════════════════════════════════════════════════════
// BLACKLIST — research-backed patterns covering:
// Nigerian Ponzi schemes, fake grants, global scam patterns,
// AI investment scams, romance scams, phishing, crypto fraud
// ════════════════════════════════════════════════════════════
const BLACKLIST_PATTERNS = [
  // ── Known crashed Nigerian Ponzi schemes (by name) ──────────
  /\bmmm[\s\-_]*(nigeria|recovery|revival|2\.0|cooperation)?\b/i,
  /\bnnn[\s\-_]*nigeria\b/i,
  /\brevoMoney\b/i,
  /\bgcch[\s\-_]*(investment|platform)\b/i,
  /\bbitclub[\s\-_]*advantage\b/i,
  /\bmillion[\s\-_]*money[\s\-_]*(investment|platform)\b/i,
  /\bhelping[\s\-_]*hands[\s\-_]*international[\s\-_]*(investment|donate)\b/i,
  /\bloom[\s\-_]*(money|investment|circle)\b/i,
  /\bcrowd[\s\-_]*1[\s\-_]*(investment|platform|network)\b/i,
  /\bultimate[\s\-_]*cycler\b/i,
  /\btwinkas\b/i,
  /\bicharity[\s\-_]*club\b/i,
  /\bloopers[\s\-_]*club\b/i,
  /\bgivers[\s\-_]*forum\b/i,
  /\bracksterli\b/i,
  /\beagle[\s\-_]*cooperative\b/i,
  /\b86fb\b/i,
  /\b86z\b/i,
  /\bmba[\s\-_]*forex\b/i,
  /\bbrisk[\s\-_]*capital\b/i,
  /\binksnation\b/i,
  /\binknation\b/i,
  /\blion[\s\-_]*s[\s\-_]*share[\s\-_]*(investment|platform)\b/i,
  /\bbaraza[\s\-_]*multipurpose\b/i,
  /\bfinafrica\b/i,
  /\bovaioza[\s\-_]*(farm|storage|investment)\b/i,
  /\bchinmark[\s\-_]*(group|investment|homes)\b/i,
  /\bred[\s\-_]*king[\s\-_]*chinmark\b/i,
  /\binksledger\b/i,
  /\baxim[\s\-_]*exchange\b/i,
  /\bcala[\s\-_]*finance\b/i,
  /\b6dollars[\s\-_]*investment\b/i,
  /\bwealthbuddy[\s\-_]*(investment|platform)\b/i,
  /\bcompoundly[\s\-_]*(investment|platform)\b/i,
  /\bbitfinance[\s\-_]*global\b/i,
  /\bcbex[\s\-_]*(investment|platform|trading|crypto)?\b/i,
  /\bqz[\s\-_]*asset[\s\-_]*management\b/i,
  /\bnrc[\s\-_]*(reading|investment|task|earn)\b/i,
  /\bnational[\s\-_]*reading[\s\-_]*culture[\s\-_]*(invest|earn|task)\b/i,
  /\bfarm4me\b/i,
  /\bwales[\s\-_]*kingdom[\s\-_]*capital\b/i,
  /\bcrowdyvest[\s\-_]*(scam|crash|invest)\b/i,
  /\bqnet[\s\-_]*nigeria\b/i,
  /\bafriq[\s\-_]*arbitrage\b/i,
  /\baas[\s\-_]*(invest|platform|arbitrage)\b/i,
  /\broyal[\s\-_]*q[\s\-_]*(nigeria|scam|bot)\b/i,
  /\bxm[\s\-_]*future[\s\-_]*music\b/i,
  /\bmetamax[\s\-_]*(invest|trade|crypto)\b/i,

  // ── Fake Nigerian government grants & programs ───────────────
  /cbn[\s\-_]*(grant|palliative|payment|fund|portal|empowerment)/i,
  /central[\s\-_]*bank[\s\-_]*(of[\s\-_]*nigeria[\s\-_]*)?(grant|palliative|payment|fund)/i,
  /nigerian[\s\-_]*government[\s\-_]*(grant|palliative|fund|payment|empowerment)/i,
  /fgn[\s\-_]*(grant|palliative|fund|payment|empowerment)/i,
  /federal[\s\-_]*government[\s\-_]*(grant|palliative|cash[\s\-_]*transfer|empowerment)/i,
  /presidential[\s\-_]*(grant|palliative|payment|empowerment|initiative)/i,
  /trader[\s\-_]*moni[\s\-_]*(payment|link|portal|alert|verify|claim)/i,
  /npower[\s\-_]*(payment|verification|portal|alert|grant|stipend|claim)/i,
  /market[\s\-_]*moni[\s\-_]*(payment|link|portal|claim)/i,
  /ubi[\s\-_]*(payment|portal|link|grant|claim)/i,
  /naira[\s\-_]*reward[\s\-_]*(program|portal|link|claim)/i,
  /conditional[\s\-_]*cash[\s\-_]*transfer[\s\-_]*(link|portal|verify|claim)/i,
  /tinubu[\s\-_]*(grant|palliative|empowerment|payment|investment)/i,
  /buhari[\s\-_]*(grant|palliative|empowerment|payment)/i,

  // ── Fake bank alerts & account verification ──────────────────
  /verify[\s\-_]*your[\s\-_]*(account|bvn|atm|card|bank|details|identity)/i,
  /account[\s\-_]*will[\s\-_]*be[\s\-_]*(suspended|blocked|frozen|deactivated|disabled)/i,
  /account[\s\-_]*has[\s\-_]*been[\s\-_]*(suspended|blocked|frozen|flagged|compromised|hacked)/i,
  /reactivate[\s\-_]*your[\s\-_]*(account|card|bvn|access)/i,
  /update[\s\-_]*your[\s\-_]*(bvn|account|bank[\s\-_]*details|kyc|nin)/i,
  /kyc[\s\-_]*(update|verification|expired|required|upgrade)[\s\-_]*(link|portal|click|now)/i,
  /your[\s\-_]*(bvn|nin|account|card)[\s\-_]*(has[\s\-_]*expired|is[\s\-_]*expired|expired)/i,

  // ── Investment & Ponzi patterns ──────────────────────────────
  /double[\s\-_]*your[\s\-_]*(money|investment|capital|funds|bitcoin)/i,
  /triple[\s\-_]*your[\s\-_]*(money|investment|capital)/i,
  /guaranteed[\s\-_]*(return|profit|income|interest|yield|roi)/i,
  /\d+%[\s\-_]*(daily|weekly|monthly)[\s\-_]*(return|profit|interest|roi|income)/i,
  /risk[\s\-_]*free[\s\-_]*(investment|trading|profit)/i,
  /\b100%[\s\-_]*(return|profit|roi|guaranteed)\b/i,
  /passive[\s\-_]*income[\s\-_]*(guaranteed|no[\s\-_]*risk|daily)/i,
  /financial[\s\-_]*freedom[\s\-_]*(fast|quick|now|guaranteed|secret)/i,
  /ponzi/i,
  /pyramid[\s\-_]*scheme/i,
  /multi[\s\-_]*level[\s\-_]*marketing[\s\-_]*(scam|fraud)/i,
  /mlm[\s\-_]*(scam|fraud|scheme|opportunity)/i,
  /pump[\s\-_]*and[\s\-_]*dump/i,
  /pig[\s\-_]*butchering[\s\-_]*(scam|investment)/i,
  /mmm[\s\-_]*(nigeria|recovery|revival)/i,

  // ── Crypto & AI investment scams ────────────────────────────
  /bitcoin[\s\-_]*(doubler|multiplier|investment[\s\-_]*platform|mining[\s\-_]*pool)/i,
  /crypto[\s\-_]*(signal[\s\-_]*vip|robot|bot[\s\-_]*profit|mining[\s\-_]*investment)/i,
  /forex[\s\-_]*(signal[\s\-_]*vip|robot|guaranteed|no[\s\-_]*loss)/i,
  /ai[\s\-_]*(trading[\s\-_]*bot|investment[\s\-_]*platform|profit[\s\-_]*guaranteed|crypto[\s\-_]*bot)/i,
  /automated[\s\-_]*(trading[\s\-_]*profit|crypto[\s\-_]*profit|investment[\s\-_]*returns)/i,
  /nft[\s\-_]*(staking[\s\-_]*profit|investment[\s\-_]*guaranteed|passive[\s\-_]*income)/i,
  /defi[\s\-_]*(guaranteed|no[\s\-_]*risk|passive[\s\-_]*income[\s\-_]*daily)/i,
  /connect[\s\-_]*your[\s\-_]*wallet[\s\-_]*(to[\s\-_]*claim|for[\s\-_]*free[\s\-_]*token|airdrop)/i,
  /free[\s\-_]*(token[\s\-_]*claim|nft[\s\-_]*mint[\s\-_]*free|airdrop[\s\-_]*claim[\s\-_]*now)/i,
  /wallet[\s\-_]*(drainer|drain|connect[\s\-_]*to[\s\-_]*earn)/i,

  // ── Celebrity deepfake investment scams ─────────────────────
  /dangote[\s\-_]*(investment|platform|fund|opportunity|trading)/i,
  /otedola[\s\-_]*(investment|platform|fund|trading)/i,
  /elon[\s\-_]*musk[\s\-_]*(investment|bitcoin|crypto|fund|trading|platform)/i,
  /jeff[\s\-_]*bezos[\s\-_]*(investment|crypto|fund|trading)/i,
  /warren[\s\-_]*buffett[\s\-_]*(investment|crypto|secret|platform)/i,
  /bill[\s\-_]*gates[\s\-_]*(investment|crypto|fund|platform)/i,
  /mark[\s\-_]*zuckerberg[\s\-_]*(investment|crypto|fund|platform)/i,
  /davido[\s\-_]*(investment|crypto|fund|platform|endorse)/i,
  /wizkid[\s\-_]*(investment|crypto|fund|platform|endorse)/i,
  /burna[\s\-_]*boy[\s\-_]*(investment|crypto|fund|platform)/i,

  // ── 419 & advance fee fraud ──────────────────────────────────
  /you[\s\-_]*have[\s\-_]*(won|been[\s\-_]*selected|been[\s\-_]*chosen|been[\s\-_]*awarded)/i,
  /unclaimed[\s\-_]*(fund|money|prize|winning|inheritance|asset)/i,
  /inheritance[\s\-_]*(fund|money|transfer|claim|release)/i,
  /nigerian[\s\-_]*prince/i,
  /advance[\s\-_]*fee/i,
  /419/i,
  /next[\s\-_]*of[\s\-_]*kin[\s\-_]*(fund|claim|inheritance|beneficiary)/i,
  /deceased[\s\-_]*(fund|account|inheritance|estate)/i,
  /foreign[\s\-_]*(fund|transfer|remittance)[\s\-_]*(claim|fee|charges|release)/i,
  /lottery[\s\-_]*(winner|winning|claim|prize)[\s\-_]*(notification|alert|selected)/i,
  /you[\s\-_]*are[\s\-_]*(our[\s\-_]*)?(lucky|selected|chosen|awarded)[\s\-_]*(winner|recipient|beneficiary)/i,
  /beneficiary[\s\-_]*(of[\s\-_]*)?(fund|payment|transfer|inheritance)/i,
  /secret[\s\-_]*(fund|money|transfer|government[\s\-_]*money)/i,

  // ── Credential & OTP theft ───────────────────────────────────
  /send[\s\-_]*your[\s\-_]*(otp|pin|bvn|nin|password|cvv|card[\s\-_]*number|login)/i,
  /enter[\s\-_]*your[\s\-_]*(otp|pin|bvn|nin|password|cvv|card[\s\-_]*details)/i,
  /provide[\s\-_]*your[\s\-_]*(otp|pin|bvn|nin|password|cvv)/i,
  /share[\s\-_]*your[\s\-_]*(otp|pin|bvn|nin|password|login[\s\-_]*details)/i,
  /input[\s\-_]*your[\s\-_]*(otp|pin|bvn|nin|password)/i,
  /your[\s\-_]*(otp|bvn|nin|pin)[\s\-_]*(is[\s\-_]*required|required[\s\-_]*to|needed[\s\-_]*to)/i,

  // ── Recharge card & airtime scams ────────────────────────────
  /send[\s\-_]*(airtime|recharge[\s\-_]*card|mtn[\s\-_]*card|glo[\s\-_]*card|airtel[\s\-_]*card)/i,
  /buy[\s\-_]*recharge[\s\-_]*card[\s\-_]*(and[\s\-_]*send|for[\s\-_]*me|as[\s\-_]*payment)/i,
  /load[\s\-_]*airtime[\s\-_]*(and[\s\-_]*send|to[\s\-_]*this[\s\-_]*number)/i,
  /gift[\s\-_]*card[\s\-_]*(payment|required|send|buy[\s\-_]*and[\s\-_]*send)/i,
  /itunes[\s\-_]*card[\s\-_]*(payment|required|send)/i,
  /steam[\s\-_]*card[\s\-_]*(payment|required|send)/i,
  /google[\s\-_]*play[\s\-_]*card[\s\-_]*(payment|required|send)/i,
  /amazon[\s\-_]*gift[\s\-_]*card[\s\-_]*(payment|required|send)/i,

  // ── Fake job scams ───────────────────────────────────────────
  /work[\s\-_]*from[\s\-_]*home[\s\-_]*(earn|make|get)[\s\-_]*[\d,]+/i,
  /earn[\s\-_]*[\d,]+(k|,000)[\s\-_]*(naira|ngn|₦)[\s\-_]*(daily|per[\s\-_]*day|weekly)/i,
  /no[\s\-_]*experience[\s\-_]*(needed|required)[\s\-_]*(earn|make|get)[\s\-_]*[\d,]+/i,
  /make[\s\-_]*money[\s\-_]*online[\s\-_]*(fast|quick|now|today|guaranteed)/i,
  /data[\s\-_]*entry[\s\-_]*job[\s\-_]*(work[\s\-_]*from[\s\-_]*home|guaranteed|earn)/i,
  /earn[\s\-_]*while[\s\-_]*(watching|liking|commenting|sharing)[\s\-_]*(video|post)/i,
  /task[\s\-_]*based[\s\-_]*(earning|income|investment|platform)/i,
  /nrc[\s\-_]*(task|reading|earn|video|watch)/i,

  // ── Romance & military scams ─────────────────────────────────
  /i[\s\-_]*am[\s\-_]*a[\s\-_]*(us|uk|un|canadian|american)[\s\-_]*(soldier|military|army|navy|engineer|doctor|diplomat)/i,
  /stationed[\s\-_]*(in|at)[\s\-_]*(syria|iraq|afghanistan|nigeria|ghana|overseas)/i,
  /send[\s\-_]*me[\s\-_]*(money|funds|transfer|gift[\s\-_]*card)[\s\-_]*(so[\s\-_]*i[\s\-_]*can|to[\s\-_]*come|to[\s\-_]*help)/i,
  /sugar[\s\-_]*(mummy|daddy|mommy|mama)[\s\-_]*(pay|money|fund|hook[\s\-_]*up|hookup)/i,
  /i[\s\-_]*am[\s\-_]*a[\s\-_]*widow[\s\-_]*(with|looking|seeking)[\s\-_]*(funds|transfer|love)/i,
  /meet[\s\-_]*wealthy[\s\-_]*(man|woman|client)[\s\-_]*(online|now|today)/i,

  // ── Fake delivery & package scams ────────────────────────────
  /your[\s\-_]*(package|parcel|delivery|shipment)[\s\-_]*(is[\s\-_]*on[\s\-_]*hold|has[\s\-_]*been[\s\-_]*seized|requires[\s\-_]*payment|failed[\s\-_]*delivery)/i,
  /pay[\s\-_]*customs[\s\-_]*(fee|duty|charges|clearance)[\s\-_]*(to[\s\-_]*release|for[\s\-_]*your[\s\-_]*package)/i,
  /dhl[\s\-_]*(customs|clearance|fee|verification)[\s\-_]*(click|pay|link)/i,
  /fedex[\s\-_]*(customs|clearance|fee|verification)[\s\-_]*(click|pay|link)/i,
  /ups[\s\-_]*(customs|clearance|fee|verification)[\s\-_]*(click|pay|link)/i,

  // ── Phishing & social engineering (2025/2026 patterns) ──────
  /scan[\s\-_]*this[\s\-_]*qr[\s\-_]*code[\s\-_]*(to[\s\-_]*verify|to[\s\-_]*claim|to[\s\-_]*receive)/i,
  /click[\s\-_]*this[\s\-_]*link[\s\-_]*(before[\s\-_]*it[\s\-_]*expires|to[\s\-_]*avoid[\s\-_]*suspension)/i,
  /your[\s\-_]*(session|account[\s\-_]*access)[\s\-_]*will[\s\-_]*expire[\s\-_]*(click|act|verify)[\s\-_]*now/i,
  /limited[\s\-_]*(time|slots|offer)[\s\-_]*(act[\s\-_]*now|click[\s\-_]*now|expires[\s\-_]*soon)/i,
  /only[\s\-_]*\d+[\s\-_]*(people|slots|spots)[\s\-_]*(selected|left|remaining)/i,
  /top[\s\-_]*\d+[\s\-_]*users[\s\-_]*(get|receive|earn)[\s\-_]*(double|bonus|extra)/i,
  /fomo[\s\-_]*(investment|opportunity|offer)/i,
  /copy[\s\-_]*and[\s\-_]*paste[\s\-_]*this[\s\-_]*(code|command)[\s\-_]*(into[\s\-_]*terminal|into[\s\-_]*console)/i,

  // ── Fake tech support ────────────────────────────────────────
  /your[\s\-_]*(computer|phone|device)[\s\-_]*(has[\s\-_]*been[\s\-_]*hacked|is[\s\-_]*infected|has[\s\-_]*virus)/i,
  /call[\s\-_]*microsoft[\s\-_]*support[\s\-_]*(now|immediately|urgently)/i,
  /call[\s\-_]*apple[\s\-_]*support[\s\-_]*(now|immediately|urgently)/i,
  /remote[\s\-_]*access[\s\-_]*(required|needed)[\s\-_]*(to[\s\-_]*fix|to[\s\-_]*resolve)/i,
];

// ════════════════════════════════════════════════════════════
// HEURISTICS
// ════════════════════════════════════════════════════════════
const URL_SHORTENERS = new Set(['bit.ly','tinyurl.com','ow.ly','t.co','goo.gl','shorte.st','adf.ly','cur.lv','is.gd','buff.ly','rb.gy','cutt.ly','shorturl.at','tiny.cc','snip.ly','bl.ink','rebrand.ly','clck.ru','su.pr','lnkd.in','dlvr.it','ht.ly','fw.to','j.mp','po.st','soo.gd','vzturl.com','qps.ru','1url.com','hyperurl.co','urlzs.com','v.gd','0rz.tw','2tu.us','4url.cc','7.ly','a.gg','adjix.com','mcaf.ee','yourls.org']);

const DANGER_PHRASES = [
  'enter your bvn','send your bvn','provide your bvn','submit your bvn','share your bvn',
  'enter your nin','send your nin','provide your nin',
  'enter your atm pin','send your pin','your atm pin','your pin number',
  'enter your otp','send your otp','provide your otp','share your otp','input your otp',
  'enter your password','send your password','share your password','provide your password',
  'enter your cvv','your card number','your card details','enter card details',
  'click to claim your prize','click to claim your reward','claim your prize now',
  'you have won','you have been selected','you have been chosen','you have been awarded',
  'congratulations you won','congratulations! you have won','you are our lucky winner',
  'act now to claim','limited time to claim','claim before it expires','expires in 24 hours',
  'your account will be suspended','your account has been suspended',
  'your account will be blocked','your account has been compromised',
  'verify your account immediately','reactivate your account now',
  'update your bvn','update your kyc','kyc verification required','kyc has expired',
  'cbn grant','central bank grant','cbn palliative','presidential grant',
  'npower payment link','trader moni payment','market moni payment',
  'double your investment','triple your money','guaranteed returns',
  '100% profit guaranteed','risk free investment','guaranteed daily profit',
  'forex signal vip','crypto signal vip','bitcoin investment platform',
  'ai trading bot profit','automated trading profit guaranteed',
  'connect your wallet to claim','free token claim','nft airdrop claim',
  'send airtime to receive','buy recharge card and send',
  'gift card payment required','itunes card payment','steam card payment',
  'inheritance funds','unclaimed funds transfer','next of kin fund',
  'advance fee','beneficiary of fund','secret government fund',
  'lottery winning claim','prize claim notification',
  'customs fee to release package','dhl customs fee click',
  'dangote investment platform','elon musk bitcoin investment',
  'scan qr code to claim','copy and paste into terminal',
  'your computer has been hacked','call microsoft support now',
  'cbex investment','mmm nigeria','racksterli invest','brisk capital',
  'cala finance','bitfinance global','national reading culture invest',
  'nrc task earn','nrc reading investment',
];

const SUSPICIOUS_PHRASES = [
  'click here to verify','follow this link to claim',
  'free money nigeria','earn from home without stress',
  'investment opportunity guaranteed','investment no risk',
  'forex trading signal','crypto trading signal',
  'dm us for your payment','whatsapp us to claim',
  'call us now to receive your prize',
  'work from home 50k daily','make money fast nigeria',
  'passive income guaranteed','financial freedom secret',
  'referral bonus unlimited','earn while watching videos',
  'task based earning','earn liking posts',
  'wire transfer needed','western union payment required',
  'moneygram transfer required','gift card as payment',
  'this link will expire','your session will expire click now',
  'limited slots available act now','only 5 slots remaining',
  'you are among the few selected','exclusive offer for you only',
  'your phone number has won','your email has been selected',
  'us army soldier needs help','stationed overseas needs money',
  'i am a widow with funds to transfer','meet wealthy client online',
  'sugar mummy hookup','sugar daddy hookup',
  'pig butchering investment','deepfake investment',
  'ai powered guaranteed returns','bot trading guaranteed profit',
];

// ════════════════════════════════════════════════════════════
// HELPERS
// ════════════════════════════════════════════════════════════
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
  if (domain.endsWith('.gov.ng')||domain.endsWith('.edu.ng')||domain.endsWith('.mil.ng')||domain.endsWith('.sch.ng')||domain.endsWith('.ac.ng')||domain.endsWith('.org.ng')) return true;
  return false;
}

function hasTyposquatting(domain: string): boolean {
  const patterns = [
    /gtb(ank)?[-_.]?(ng|nigeria|secure|verify|alert|login|support)/i,
    /accessbank[-_.]?(ng|alert|secure|verify|login|support)/i,
    /zenith[-_.]?(bank)?[-_.]?(ng|alert|verify|secure|login)/i,
    /firstbank[-_.]?(ng|alert|verify|secure|login)/i,
    /uba[-_.]?(bank)?[-_.]?(ng|secure|alert|verify|login)/i,
    /cbn[-_.]?(grant|portal|verify|payment|palliative|fund|official)/i,
    /paystack[-_.]?(ng|verify|secure|login|payment|support)/i,
    /flutterwave[-_.]?(ng|verify|secure|login|support)/i,
    /opay[-_.]?(verify|secure|ng|agent|login|account|support)/i,
    /palmpay[-_.]?(verify|secure|ng|login|account|support)/i,
    /kuda[-_.]?(verify|secure|ng|login|bank|support)/i,
    /moniepoint[-_.]?(verify|secure|ng|login|support)/i,
    /piggyvest[-_.]?(verify|secure|login|support)/i,
    /cowrywise[-_.]?(verify|secure|login|support)/i,
    /jamb[-_.]?(portal|verify|ng|result|login|registration|support)/i,
    /npower[-_.]?(verify|payment|portal|login|grant|claim)/i,
    /jumia[-_.]?(verify|secure|ng|pay|login|support)/i,
    /konga[-_.]?(verify|secure|ng|login|support)/i,
    /efcc[-_.]?(grant|portal|verify|fund|payment|official)/i,
    /nimc[-_.]?(verify|portal|login|nin|official)/i,
    /inec[-_.]?(verify|portal|login|vote|official)/i,
    /mtn[-_.]?(bonus|reward|grant|free|win|claim|verify)/i,
    /airtel[-_.]?(bonus|reward|grant|free|win|claim|verify)/i,
    /glo[-_.]?(bonus|reward|grant|free|win|claim|verify)/i,
    /nitda[-_.]?(grant|portal|verify|fund|payment)/i,
    /sec[-_.]?(nigeria|ng)[-_.]?(verify|portal|invest)/i,
    /binance[-_.]?(verify|secure|login|support|ng)/i,
    /coinbase[-_.]?(verify|secure|login|support)/i,
    /paypal[-_.]?(verify|secure|ng|login|support)/i,
    /amazon[-_.]?(verify|secure|login|support|ng)/i,
    /microsoft[-_.]?(verify|secure|support|login|tech)/i,
    /apple[-_.]?(verify|secure|support|login|id)/i,
  ];
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
  const prompt = `You are ScamShield NG, a cybersecurity AI trained on Nigerian and global internet scams, fraud patterns, and phishing tactics.

CRITICAL RULES — FOLLOW EXACTLY:
1. Nigerian government sites (.gov.ng, .edu.ng, .mil.ng, .org.ng) are ALWAYS safe
2. Developer/hosting platforms (Vercel, Netlify, GitHub, Railway, Render, Cloudflare) are NEVER scams
3. An unknown or unfamiliar domain name alone is NEVER enough to flag as suspicious or scam
4. All Nigerian banks, fintechs, telecoms, news sites are SAFE
5. All well-known global brands (Amazon, Walmart, Netflix, Google, Apple, Microsoft, etc.) are SAFE
6. Scholarship, job opportunity, government program, and education links are SAFE unless they explicitly ask for money, BVN, PIN, or OTP upfront
7. ONLY flag as SCAM when there is clear, explicit, unambiguous evidence of fraud intent
8. http:// links (no SSL) should be flagged as SUSPICIOUS only
9. When genuinely uncertain, choose SAFE over SUSPICIOUS for normal-looking domains
10. Nigerian betting platforms (Bet9ja, SportyBet, BetKing) are legal — do NOT flag them as scam

KNOWN SCAM SIGNALS TO DETECT:
- Requests for BVN, NIN, ATM PIN, OTP, CVV, passwords via message or link
- Fake CBN/government grants, Npower payments, Trader Moni, presidential empowerment
- "You have won" messages requiring fees or personal info to claim
- Fake bank alerts asking to click a link to verify, reactivate, or update account
- Investment schemes promising guaranteed returns, doubling money, or daily profits
- Named Nigerian Ponzi schemes: MMM, CBEX, Racksterli, Brisk Capital, MBA Forex, CALA Finance, BitFinance Global, NRC task earning, Chinmark Group
- Requests to send airtime, recharge cards, gift cards, or iTunes cards as payment
- 419 advance fee fraud — inheritance, lottery, foreign funds, next of kin
- Typosquatted domains impersonating Nigerian banks or global platforms
- AI deepfake celebrity investment platforms featuring Dangote, Elon Musk, Davido
- Romance scams — soldiers/foreigners abroad asking for money transfers
- Pig butchering crypto scams — fake trading platforms draining wallets
- QR code phishing, fake package delivery fees, fake tech support calls
- "Copy and paste into terminal" commands — malware installation scam

Content to analyze:
"""
${input}
"""

Respond ONLY in this EXACT JSON format, no markdown, no backticks, no preamble:
{"verdict":"safe","explanation":"One plain sentence max 25 words for a non-technical Nigerian."}

The verdict must be exactly one of: safe, suspicious, scam`;

  const res = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { temperature: 0.1, maxOutputTokens: 200 },
    }),
  });
  if (!res.ok) throw new Error(`Gemini error: ${res.status}`);
  const data = await res.json();
  const raw = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
  const clean = raw.replace(/```json|```/g, '').trim();
  const jsonMatch = clean.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error('No JSON in Gemini response');
  return JSON.parse(jsonMatch[0]);
}

// ════════════════════════════════════════════════════════════
// MAIN HANDLER
// ════════════════════════════════════════════════════════════
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

  // HTTP no SSL
  if (trimmed.startsWith('http://')) {
    return res.json({ verdict: 'suspicious', explanation: 'This link has no SSL security (http not https). Never enter personal details on it.', detectedBy: 'heuristic' });
  }

  // Layer 1 — Whitelist
  if (domain && isWhitelisted(domain)) {
    return res.json({ verdict: 'safe', explanation: `${domain} is a verified, trusted platform.`, detectedBy: 'whitelist' });
  }

  // Layer 2 — Community blacklist
  const reportCount = await getCommunityCount(trimmed, SUPABASE_ANON_KEY);
  if (reportCount >= COMMUNITY_THRESHOLD) {
    return res.json({ verdict: 'scam', explanation: `This has been reported as a scam by ${reportCount} ScamShield users. Avoid it completely.`, detectedBy: 'community' });
  }

  // Layer 3 — Static blacklist
  if (BLACKLIST_PATTERNS.some(p => p.test(trimmed))) {
    return res.json({ verdict: 'scam', explanation: 'This matches a known scam pattern. Do not click, share, or provide any personal details.', detectedBy: 'blacklist' });
  }

  // Layer 4a — URL shortener
  if (domain && URL_SHORTENERS.has(domain)) {
    return res.json({ verdict: 'suspicious', explanation: 'This is a shortened link hiding its real destination. Scammers frequently use these to disguise dangerous sites.', detectedBy: 'heuristic' });
  }

  // Layer 4b — Typosquatting
  if (domain && hasTyposquatting(domain)) {
    return res.json({ verdict: 'scam', explanation: 'This domain is impersonating a real bank or trusted platform. It is very likely a phishing site — do not enter any details.', detectedBy: 'heuristic' });
  }

  // Layer 4c — Danger phrases
  const lower = trimmed.toLowerCase();
  if (DANGER_PHRASES.some(p => lower.includes(p))) {
    return res.json({ verdict: 'scam', explanation: 'This message contains clear scam signals — requests for sensitive info or known Nigerian fraud patterns.', detectedBy: 'heuristic' });
  }

  // Layer 4d — Suspicious phrases
  if (SUSPICIOUS_PHRASES.some(p => lower.includes(p))) {
    return res.json({ verdict: 'suspicious', explanation: 'This uses language commonly found in scam messages targeting Nigerians. Verify carefully before trusting it.', detectedBy: 'heuristic' });
  }

  // Layer 5 — Gemini AI
  try {
    const geminiResult = await callGemini(trimmed, GEMINI_API_KEY);
    return res.json({ ...geminiResult, detectedBy: 'ai' });
  } catch (err) {
    console.error('Gemini error:', err);
    const looksLegit = domain && !hasTyposquatting(domain) && domain.split('.').length <= 3 && !domain.includes('--');
    return res.json({
      verdict: looksLegit ? 'safe' : 'suspicious',
      explanation: looksLegit
        ? `${domain} appears to be a legitimate website. Always stay cautious online.`
        : 'We could not fully verify this. Treat with caution and confirm it is legitimate before interacting.',
      detectedBy: 'ai',
    });
  }
}
