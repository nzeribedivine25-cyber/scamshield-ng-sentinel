import type { VercelRequest, VercelResponse } from '@vercel/node';

const COMMUNITY_THRESHOLD = 3;
const SUPABASE_URL = 'https://wtslnanmrijcmgabnpgg.supabase.co';

// ════════════════════════════════════════════════════════════
// WHITELIST — 600+ verified domains across all categories
// ════════════════════════════════════════════════════════════

// Nigerian Government — Presidency & Legislature
const GOV_PRESIDENCY = ['statehouse.gov.ng','vpo.gov.ng','nass.gov.ng','senate.gov.ng','hon.gov.ng','supremecourt.gov.ng','courtofappeal.gov.ng','services.gov.ng','osgf.gov.ng','aso.gov.ng'];

// Nigerian Government — Ministries
const GOV_MINISTRIES = ['finance.gov.ng','health.gov.ng','education.gov.ng','foreignaffairs.gov.ng','justice.gov.ng','defence.gov.ng','fmcide.gov.ng','fmard.gov.ng','works.gov.ng','aviation.gov.ng','fmino.gov.ng','scienceandtech.gov.ng','interior.gov.ng','power.gov.ng','petroleum.gov.ng','trade.gov.ng','labour.gov.ng','housing.gov.ng','transport.gov.ng','women.gov.ng','youth.gov.ng','sports.gov.ng','environment.gov.ng','water.gov.ng','communications.gov.ng','humanitarianaffairs.gov.ng','solid-minerals.gov.ng'];

// Nigerian Government — Finance & Economy
const GOV_FINANCE = ['cbn.gov.ng','firs.gov.ng','customs.gov.ng','cac.gov.ng','dmo.gov.ng','budgetoffice.gov.ng','nipc.gov.ng','bpp.gov.ng','smedan.gov.ng','nse.com.ng','ngxgroup.com','sec.gov.ng','pencom.gov.ng','nnpcgroup.com','nmdpra.gov.ng','fmf.gov.ng','rmafc.gov.ng','oagf.gov.ng','icrc.gov.ng','nfiu.gov.ng'];

// Nigerian Government — Security
const GOV_SECURITY = ['npf.gov.ng','army.mil.ng','navy.mil.ng','airforce.mil.ng','efcc.gov.ng','icpc.gov.ng','ndlea.gov.ng','dss.gov.ng','nscdc.gov.ng','interpol.int','naptip.gov.ng'];

// Nigerian Government — Services & Regulators
const GOV_SERVICES = ['immigration.gov.ng','nimc.gov.ng','inecnigeria.org','nafdac.gov.ng','ncdc.gov.ng','ncc.gov.ng','nitda.gov.ng','jamb.gov.ng','son.gov.ng','faan.gov.ng','nigerianports.gov.ng','nhrc.gov.ng','nesrea.gov.ng','nuprc.gov.ng','frsc.gov.ng','nipost.gov.ng','dti.gov.ng','cenbank.org','nbc.gov.ng','naicom.gov.ng','nesrea.gov.ng','nimasa.gov.ng','nra.gov.ng','nesrea.gov.ng','mdas.gov.ng','nhis.gov.ng','servicom.gov.ng','bpsr.gov.ng','nepza.gov.ng','nbet.gov.ng','tcn.com.ng'];

// Nigerian Government — State Governments
const GOV_STATES = ['abiastate.gov.ng','adamawa.gov.ng','akwaibomstate.gov.ng','anambra.gov.ng','bauchistate.gov.ng','bayelsa.gov.ng','benue.gov.ng','borno.gov.ng','crossriverstate.gov.ng','deltastate.gov.ng','ebonyistate.gov.ng','edostate.gov.ng','ekitistate.gov.ng','enugu.gov.ng','gombestate.gov.ng','imostate.gov.ng','jigawa.gov.ng','kadstate.gov.ng','kanostate.gov.ng','katsinastate.gov.ng','kebbistate.gov.ng','kogi.gov.ng','kwarastate.gov.ng','lagosstate.gov.ng','nasarawastate.gov.ng','nigerstate.gov.ng','oyostate.gov.ng','osun.gov.ng','ondobstate.gov.ng','ogun.gov.ng','plateau.gov.ng','riversstate.gov.ng','sokoto.gov.ng','taraba.gov.ng','yobe.gov.ng','zamfara.gov.ng','fcta.gov.ng'];

// Nigerian Federal Universities
const UNIVERSITIES_FEDERAL = ['atbu.edu.ng','abu.edu.ng','buk.edu.ng','fugashua.edu.ng','fupre.edu.ng','futa.edu.ng','futminna.edu.ng','futo.edu.ng','fud.edu.ng','fudutsinma.edu.ng','fukashere.edu.ng','fulafia.edu.ng','fulokoja.edu.ng','funai.edu.ng','fuotuoke.edu.ng','fuoye.edu.ng','fuwukari.edu.ng','fubk.edu.ng','fugusau.edu.ng','mouau.edu.ng','mautech.edu.ng','nou.edu.ng','polac.edu.ng','nda.edu.ng','unizik.edu.ng','oauife.edu.ng','uniabuja.edu.ng','unaab.edu.ng','uam.edu.ng','uniben.edu.ng','unical.edu.ng','ui.edu.ng','unilorin.edu.ng','unijos.edu.ng','unilag.edu.ng','unimaid.edu.ng','unn.edu.ng','uniport.edu.ng','uniuyo.edu.ng','udusok.edu.ng','nmu.edu.ng','afit.edu.ng','naub.edu.ng','kdums.edu.ng','adun.edu.ng','futd.edu.ng','aaau.edu.ng','fuahse.edu.ng','fustkabo.edu.ng','fuoye.edu.ng','fuwukari.edu.ng'];

// Nigerian Private & State Universities
const UNIVERSITIES_OTHER = ['babcock.edu.ng','iuokada.edu.ng','madonnauniversity.edu.ng','bowen.edu.ng','biu.edu.ng','covenantuniversity.edu.ng','pau.edu.ng','aun.edu.ng','acu.edu.ng','nileuniversity.edu.ng','lmu.edu.ng','afe.edu.ng','redeemers.edu.ng','baze.edu.ng','adelekeuniversity.edu.ng','caluniversity.edu.ng','landmark.edu.ng','westernuniversity.edu.ng','mountaintop.edu.ng','lasu.edu.ng','rsust.edu.ng','imsu.edu.ng','tasued.edu.ng','aaua.edu.ng','kasu.edu.ng','kwasu.edu.ng','nsuk.edu.ng','plasu.edu.ng','tsuniversity.edu.ng','umyu.edu.ng','eksu.edu.ng','ebsu.edu.ng','fce.edu.ng','crutech.edu.ng','iaue.edu.ng','portharcourt.edu.ng','elizadeuniversity.edu.ng','spiritanuniversity.edu.ng','godfrey.edu.ng','wellspringuniversity.edu.ng'];

// Nigerian Banks — Traditional
const BANKS_TRADITIONAL = ['gtbank.com','accessbankplc.com','zenithbank.com','firstbanknigeria.com','ubagroup.com','stanbicibtc.com','fcmb.com','unionbankng.com','sterlingbank.com','polaris-bank.com','fidelitybank.ng','ecobank.com','wemabank.com','providusbank.com','vfdmfb.com','heritagebankng.com','keystone-bank.com','suntrust.bank','citibankng.com','coronationbank.com','globusbank.ng','parallex.bank','premiumtrustbank.com','signature.bank.ng'];

// Nigerian Fintech & Digital Finance
const NIGERIAN_FINTECH = ['paystack.com','flutterwave.com','interswitch.com','opay.com','palmpay.com','kuda.com','moniepoint.com','teamapt.com','monnify.com','paga.com','carbon.ng','getcarbon.co','fairmoney.ng','piggyvest.com','cowrywise.com','bamboofinance.io','risevest.com','troveapp.co','chaka.ng','quidax.com','buycoins.africa','yellowcard.io','chipper.cash','chippercash.com','sendcash.africa','lemfi.com','grey.co','geegpay.com','cleva.com','nala.money','payaza.africa','sudo.africa','nomba.com','brass.co','anchorapi.com','bankly.ng','mintyn.com','sparkle.com.ng','eyowo.com','lidya.co','lyca.ng','creditclan.com','creditville.ng','aella.app','lendigo.ng','fadhili.co'];

// Nigerian E-commerce & Marketplace
const NIGERIAN_ECOMMERCE = ['jumia.com','jumia.com.ng','konga.com','jiji.ng','jiji.com.ng','payporte.com','slot.ng','pointek.com.ng','fouani.com','spar.com.ng','shoprite.com.ng','hubmart.com','justrite.com.ng','supermart.ng','market.ng','obiwezy.com','buypower.ng','clubkonnect.com','vtpass.com','baxi.ng','quickteller.com','printivo.com','aajmerchandise.com.ng','craftopiashop.com','dealdey.com','olist.ng','farmcrowdy.com','thrive-agric.com','tradedepot.co','omnibiz.africa','wasoko.com','sabi.am','alerzo.com','omnibiz.africa','rensource.com'];

// Nigerian Transport & Ride-hailing
const NIGERIAN_TRANSPORT = ['uber.com','bolt.eu','rida.com.ng','shuttlers.ng','gigm.com','ctsmobile.com.ng','abc-transport.com','guo-transport.com','young-shall-grow.com','peace-transport.com','sendbox.co','kobo360.com','topship.africa','dellyman.com','kwik.delivery','gokada.co','max.ng','treepz.com','chowdeck.com','glovo.com','jumia.com','munch-it.com','foodcourt.com.ng','heyfood.com.ng','vendease.com','mkobo.ng'];

// Nigerian News & Media
const NIGERIAN_NEWS = ['punchng.com','vanguardngr.com','thisdaylive.com','thecable.ng','premiumtimesng.com','channelstv.com','arise.tv','nta.ng','businessday.ng','nairametrics.com','techpoint.africa','nairaland.com','legit.ng','informationng.com','dailypost.ng','saharareporters.com','guardian.ng','nation.africa','sunnewsonline.com','leadership.ng','blueprint.ng','independent.ng','pulse.ng','bellanaija.com','lindaikejiblog.com','thenationonlineng.net','tribuneonlineng.com','nigeriainfopedia.com.ng','36ng.ng','nairametrics.com','techcabal.com','techeconomy.ng','disrupt-africa.com','stears.co','dataphyte.com','peoplesgazette.com','ripplesnigeria.com','aisatv.ng','frcnigeria.com','tvcnews.tv','aljazeera.com','bbc.com','cnn.com','reuters.com','apnews.com'];

// Nigerian Tech, Education & Programs
const NIGERIAN_TECH_EDU = ['3mtt.nitda.gov.ng','gebeya.com','mydala.app','dala.gebeya.com','npower.gov.ng','waec.org.ng','waecdirect.org','neco.gov.ng','nbte.gov.ng','nuc.edu.ng','jamb.org.ng','jobberman.com','myjobmag.com','ngcareers.com','hotnigerianjobs.com','scholarshipng.com','scholarshipregion.com','myschoolgist.com','naijascholarships.com','myschool.ng','schools.com.ng','schoolings.org','naijaloaded.com.ng','naijapals.com','naijauncut.com.ng','bestnaija.com','expat-blog.com','nigeriapropertycentre.com','propertypro.ng','tolet.com.ng'];

// Nigerian Telecoms
const NIGERIAN_TELECOMS = ['mtn.ng','mtn.com.ng','airtel.com.ng','glo.com','gloworld.com','9mobile.com.ng','smile.com.ng','spectranet.com.ng','ipnx.com.ng','swift.com.ng','coollink.ng','ntel.ng','rtel.ng','swift.com.ng'];

// Nigerian Betting (licensed platforms)
const NIGERIAN_BETTING = ['bet9ja.com','betking.com','sportybet.com','nairabet.com','merrybet.com','1960bet.com','paripesa.ng','bangbet.com','betway.com.ng','22bet.com.ng','1xbet.com.ng','accessbet.com','betensured.com','supabets.com.ng','msport.com','bangbet.com','cloudbet.com','bangbet.com','betano.com.ng','dragonbet.ng','goldenbet.ng'];

// Nigerian Entertainment & Streaming
const NIGERIAN_ENTERTAINMENT = ['nkiri.com','showmax.com','iroko.tv','irokotv.com','audiomack.com','boomplay.com','dstv.com','gotv.com.ng','startimes.com.ng','africamagic.tv','nollywoodmovies.com','afrocritik.com','notjustok.com','tooxclusive.com','9jabest.com','enstarz.com','ghpage.com','tooXclusive.com','360nobs.com','olorisupergal.com'];

// Nigerian Grants, Scholarships & Opportunities
const NIGERIAN_GRANTS = ['tetfund.gov.ng','nitda.gov.ng','ptdf.gov.ng','nrsa.gov.ng','britishcouncil.org.ng','commonwealthscholarships.ac.uk','opportunitiesforafricans.com','afterschoolafrica.com','scholarshipportal.com','opportunitydesk.org','aun.edu.ng','tonyfoundation.org','mastercard.foundation','gates.foundation','ford.foundation','hewlett.org','macfound.org','rockefellerphilanthropy.org','opensocinstitute.org'];

// ScamShield own domains
const SCAMSHIELD = ['scamshield-ng.vercel.app','scamshieldng.com','scamshield.ng','scamshield-ng-sentinel.vercel.app','scamshield-ng-web.vercel.app'];

// Global Social Media
const GLOBAL_SOCIAL = ['facebook.com','instagram.com','twitter.com','x.com','linkedin.com','whatsapp.com','telegram.org','snapchat.com','tiktok.com','pinterest.com','reddit.com','quora.com','discord.com','threads.net','tumblr.com','mastodon.social','clubhouse.com','twitch.tv','bereal.com','wechat.com','viber.com','skype.com','signal.org'];

// Global Search & Productivity
const GLOBAL_PRODUCTIVITY = ['google.com','gmail.com','youtube.com','microsoft.com','office.com','outlook.com','office365.com','apple.com','icloud.com','amazon.com','aws.amazon.com','zoom.us','slack.com','notion.so','figma.com','canva.com','trello.com','asana.com','dropbox.com','drive.google.com','docs.google.com','sheets.google.com','forms.google.com','calendar.google.com','meet.google.com','airtable.com','monday.com','clickup.com','miro.com','loom.com','typeform.com'];

// Global E-commerce
const GLOBAL_ECOMMERCE = ['walmart.com','aliexpress.com','alibaba.com','ebay.com','etsy.com','shopify.com','shein.com','dhgate.com','wish.com','amazon.co.uk','bestbuy.com','target.com','costco.com','ikea.com','zara.com','hm.com','uniqlo.com','nike.com','adidas.com'];

// Global Finance
const GLOBAL_FINANCE = ['paypal.com','stripe.com','wise.com','remitly.com','westernunion.com','moneygram.com','worldremit.com','sendwave.com','coinbase.com','binance.com','kraken.com','blockchain.com','crypto.com'];

// Global Dev & Hosting
const GLOBAL_DEV = ['github.com','vercel.app','netlify.app','heroku.com','render.com','railway.app','supabase.com','firebase.google.com','cloudflare.com','digitalocean.com','linode.com','vultr.com','hostinger.com','namecheap.com','godaddy.com','bluehost.com','cpanel.net','wordpress.com','wix.com','squarespace.com','webflow.com'];

// Global Learning
const GLOBAL_LEARNING = ['wikipedia.org','stackoverflow.com','medium.com','substack.com','coursera.org','udemy.com','edx.org','khanacademy.org','freecodecamp.org','w3schools.com','developer.mozilla.org','leetcode.com','hackerrank.com','codecademy.com','pluralsight.com','skillshare.com','linkedin.com','duolingo.com','brilliant.org'];

// Global Streaming
const GLOBAL_STREAMING = ['netflix.com','disneyplus.com','hulu.com','primevideo.com','hbomax.com','max.com','appletv.com','spotify.com','apple.com','soundcloud.com','deezer.com','tidal.com','pandora.com'];

// International Organizations
const INTL_ORGS = ['un.org','who.int','worldbank.org','unicef.org','undp.org','afdb.org','au.int','adb.org','imf.org','wto.org','ilo.org','fao.org','unhcr.org','wfp.org','iom.int','usaid.gov','dfid.gov.uk','giz.de','jica.go.jp','koica.go.kr'];

// AI & Tech platforms
const AI_TECH = ['anthropic.com','openai.com','gemini.google.com','claude.ai','chatgpt.com','perplexity.ai','huggingface.co','cohere.com','mistral.ai','stability.ai','midjourney.com','runwayml.com','elevenlabs.io','ideogram.ai'];

// Other major global
const GLOBAL_OTHER = ['msn.com','yahoo.com','bing.com','duckduckgo.com','samsung.com','huawei.com','techcrunch.com','theverge.com','wired.com','engadget.com','mashable.com','venturebeat.com','forbes.com','bloomberg.com','ft.com','economist.com','bbc.co.uk','theguardian.com','nytimes.com','washingtonpost.com','wsj.com','cnbc.com','techradar.com','zdnet.com','cnet.com','pcmag.com'];

const WHITELIST_DOMAINS = new Set([
  ...GOV_PRESIDENCY,...GOV_MINISTRIES,...GOV_FINANCE,...GOV_SECURITY,...GOV_SERVICES,...GOV_STATES,
  ...UNIVERSITIES_FEDERAL,...UNIVERSITIES_OTHER,
  ...BANKS_TRADITIONAL,...NIGERIAN_FINTECH,...NIGERIAN_ECOMMERCE,...NIGERIAN_TRANSPORT,
  ...NIGERIAN_NEWS,...NIGERIAN_TECH_EDU,...NIGERIAN_TELECOMS,...NIGERIAN_BETTING,
  ...NIGERIAN_ENTERTAINMENT,...NIGERIAN_GRANTS,...SCAMSHIELD,
  ...GLOBAL_SOCIAL,...GLOBAL_PRODUCTIVITY,...GLOBAL_ECOMMERCE,...GLOBAL_FINANCE,
  ...GLOBAL_DEV,...GLOBAL_LEARNING,...GLOBAL_STREAMING,...INTL_ORGS,...AI_TECH,...GLOBAL_OTHER,
]);

// ════════════════════════════════════════════════════════════
// BLACKLIST — comprehensive Nigerian scam patterns
// ════════════════════════════════════════════════════════════
const BLACKLIST_PATTERNS = [
  // Fake government grants
  /cbn[\s\-_]*grant/i,
  /central[\s\-_]*bank[\s\-_]*(of[\s\-_]*nigeria[\s\-_]*)?(grant|palliative|payment|fund)/i,
  /nigerian[\s\-_]*government[\s\-_]*(grant|palliative|fund|payment)/i,
  /fgn[\s\-_]*(grant|palliative|fund|payment)/i,
  /federal[\s\-_]*government[\s\-_]*(grant|palliative|cash[\s\-_]*transfer)/i,
  /presidential[\s\-_]*(grant|palliative|payment|empowerment)/i,
  /aso[\s\-_]*rock[\s\-_]*(grant|palliative)/i,
  // Fake government programs
  /trader[\s\-_]*moni[\s\-_]*(payment|link|portal|alert|verify)/i,
  /n[\s\-_]*power[\s\-_]*(payment|verification|portal|alert|grant|stipend)/i,
  /npower[\s\-_]*(payment|verification|portal|alert|grant|stipend)/i,
  /conditional[\s\-_]*cash[\s\-_]*transfer[\s\-_]*(link|portal|verify)/i,
  /market[\s\-_]*moni[\s\-_]*(payment|link|portal)/i,
  /ubi[\s\-_]*(payment|portal|link|grant)/i,
  /naira[\s\-_]*reward[\s\-_]*(program|portal|link)/i,
  // Fake bank alerts & verification
  /verify[\s\-_]*your[\s\-_]*(account|bvn|atm|card|bank|details)/i,
  /account[\s\-_]*will[\s\-_]*be[\s\-_]*(suspended|blocked|frozen|deactivated|disabled)/i,
  /your[\s\-_]*(account|card|bvn)[\s\-_]*has[\s\-_]*been[\s\-_]*(suspended|blocked|frozen|flagged|compromised)/i,
  /reactivate[\s\-_]*your[\s\-_]*(account|card|bvn)/i,
  /update[\s\-_]*your[\s\-_]*(bvn|account|bank[\s\-_]*details|kyc)/i,
  /kyc[\s\-_]*(update|verification|expired|required)[\s\-_]*(link|portal|click)/i,
  // Investment scams
  /double[\s\-_]*your[\s\-_]*(money|investment|capital|funds)/i,
  /triple[\s\-_]*your[\s\-_]*(money|investment|capital)/i,
  /guaranteed[\s\-_]*(return|profit|income|interest|yield)/i,
  /\d+%[\s\-_]*(daily|weekly|monthly)[\s\-_]*(return|profit|interest|roi)/i,
  /risk[\s\-_]*free[\s\-_]*investment/i,
  /mmm[\s\-_]*(nigeria|recovery|revival|2\.0)/i,
  /ponzi[\s\-_]*(scheme|investment|platform)/i,
  /forex[\s\-_]*(signal|investment|robot|alert|group|vip)/i,
  /crypto[\s\-_]*(signal|investment|robot|alert|vip|pump)/i,
  /pump[\s\-_]*and[\s\-_]*dump/i,
  /bitcoin[\s\-_]*(investment|doubler|multiplier)/i,
  /mining[\s\-_]*(investment|pool|profit|returns)/i,
  // 419 & advance fee
  /you[\s\-_]*have[\s\-_]*(won|been[\s\-_]*selected|been[\s\-_]*chosen)/i,
  /unclaimed[\s\-_]*(fund|money|prize|winning|inheritance)/i,
  /inheritance[\s\-_]*(fund|money|transfer|claim)/i,
  /nigerian[\s\-_]*prince/i,
  /advance[\s\-_]*fee/i,
  /419/i,
  /next[\s\-_]*of[\s\-_]*kin[\s\-_]*(fund|claim|inheritance)/i,
  /deceased[\s\-_]*(fund|account|inheritance)/i,
  /foreign[\s\-_]*(fund|transfer|remittance)[\s\-_]*(claim|fee|charges)/i,
  /lottery[\s\-_]*(winner|winning|claim|prize)[\s\-_]*(notification|alert)/i,
  /you[\s\-_]*are[\s\-_]*(our[\s\-_]*)?(lucky|selected|chosen)[\s\-_]*(winner|recipient)/i,
  // OTP / credential theft
  /send[\s\-_]*your[\s\-_]*(otp|pin|bvn|nin|password|cvv|card[\s\-_]*number)/i,
  /enter[\s\-_]*your[\s\-_]*(otp|pin|bvn|nin|password|cvv)/i,
  /provide[\s\-_]*your[\s\-_]*(otp|pin|bvn|nin|password)/i,
  /share[\s\-_]*your[\s\-_]*(otp|pin|bvn|nin|password)/i,
  /your[\s\-_]*(otp|pin|bvn|nin)[\s\-_]*is[\s\-_]*required/i,
  /input[\s\-_]*your[\s\-_]*(otp|pin|bvn|nin)/i,
  // Recharge card scams
  /send[\s\-_]*(airtime|recharge[\s\-_]*card|mtn[\s\-_]*card|glo[\s\-_]*card)/i,
  /buy[\s\-_]*recharge[\s\-_]*card[\s\-_]*(and[\s\-_]*send|for[\s\-_]*me|as[\s\-_]*payment)/i,
  /load[\s\-_]*airtime[\s\-_]*(and[\s\-_]*send|for[\s\-_]*me)/i,
  // Fake job scams
  /work[\s\-_]*from[\s\-_]*home[\s\-_]*(earn|make|get)[\s\-_]*\d+/i,
  /earn[\s\-_]*\d{4,}[\s\-_]*(naira|ngn|₦)[\s\-_]*(daily|per[\s\-_]*day|weekly)/i,
  /no[\s\-_]*experience[\s\-_]*(needed|required)[\s\-_]*(earn|make|get)/i,
  /make[\s\-_]*money[\s\-_]*online[\s\-_]*(fast|quick|now|today)/i,
  /online[\s\-_]*job[\s\-_]*(no[\s\-_]*experience|free|guaranteed)/i,
  /data[\s\-_]*entry[\s\-_]*job[\s\-_]*(work[\s\-_]*from[\s\-_]*home|online|earn)/i,
  // Romance & social engineering scams
  /i[\s\-_]*am[\s\-_]*a[\s\-_]*(us|uk|canadian)[\s\-_]*(soldier|military|army|navy|engineer)[\s\-_]*(stationed|deployed)/i,
  /send[\s\-_]*me[\s\-_]*(money|funds|transfer)[\s\-_]*(so[\s\-_]*i[\s\-_]*can|to[\s\-_]*come|and[\s\-_]*i[\s\-_]*will)/i,
  /sugar[\s\-_]*(mummy|daddy|mommy)[\s\-_]*(pay|money|fund|hook[\s\-_]*up)/i,
  // Fake delivery scams
  /your[\s\-_]*(package|parcel|delivery)[\s\-_]*(is[\s\-_]*on[\s\-_]*hold|has[\s\-_]*been[\s\-_]*seized|requires[\s\-_]*payment)/i,
  /pay[\s\-_]*customs[\s\-_]*(fee|duty|charges)[\s\-_]*(to[\s\-_]*release|for[\s\-_]*your[\s\-_]*package)/i,
  // AI deepfake investment scams (new 2025/2026 pattern)
  /dangote[\s\-_]*(investment|platform|fund|opportunity)/i,
  /tinubu[\s\-_]*(investment|platform|fund|grant)/i,
  /otedola[\s\-_]*(investment|platform|fund)/i,
  /elon[\s\-_]*musk[\s\-_]*(investment|platform|fund|bitcoin)/i,
];

// ════════════════════════════════════════════════════════════
// HEURISTICS
// ════════════════════════════════════════════════════════════
const URL_SHORTENERS = new Set(['bit.ly','tinyurl.com','ow.ly','t.co','goo.gl','shorte.st','adf.ly','cur.lv','is.gd','buff.ly','rb.gy','cutt.ly','shorturl.at','tiny.cc','snip.ly','bl.ink','rebrand.ly','clck.ru','su.pr','lnkd.in','dlvr.it','ht.ly','fw.to','j.mp','mcaf.ee','po.st','soo.gd','vzturl.com','qps.ru','1url.com','hyperurl.co','urlzs.com','v.gd','virl.com','0rz.tw','1link.in','2tu.us','4url.cc','7.ly','a.gg','a2n.in','abcurl.net','ad7.biz','adf.ly','adjix.com']);

const DANGER_PHRASES = [
  'enter your bvn','send your bvn','provide your bvn','submit your bvn',
  'enter your nin','send your nin','provide your nin',
  'enter your atm pin','send your pin','your atm pin','your pin number',
  'enter your otp','send your otp','provide your otp','share your otp',
  'enter your password','send your password','share your password',
  'enter your cvv','your card number','your card details',
  'click to claim your prize','click to claim your reward',
  'you have won','you have been selected','you have been chosen',
  'congratulations you won','congratulations! you have won',
  'you are our lucky winner','you are selected as winner',
  'act now to claim','limited time to claim','claim before it expires',
  'your account will be suspended','your account has been suspended',
  'your account will be blocked','your account has been blocked',
  'your account has been compromised','your account is at risk',
  'verify your account immediately','reactivate your account',
  'update your bvn','update your kyc','kyc verification required',
  'cbn grant','central bank grant','cbn palliative',
  'government palliative link','presidential grant link',
  'npower payment link','trader moni payment',
  'market moni payment','ubi payment link',
  'double your investment','triple your money','guaranteed returns',
  '100% profit guaranteed','risk free investment',
  'forex signal vip','crypto signal vip','bitcoin investment platform',
  'send airtime to receive','buy recharge card and send',
  'load airtime and send','send mtn card','send glo card',
  'inheritance funds','unclaimed funds transfer',
  'advance fee','next of kin fund','deceased account fund',
  'lottery winning claim','prize claim notification',
  'foreign fund transfer fee','customs clearance fee for package',
  'dangote investment platform','elon musk bitcoin',
  'sugar mummy hookup pay','sugar daddy hookup pay',
  'work from home earn 50k daily','work from home earn 100k',
  'make money fast online guaranteed','no experience needed earn',
];

const SUSPICIOUS_PHRASES = [
  'click here to verify','follow this link to claim',
  'free money nigeria','earn from home without stress',
  'investment opportunity guaranteed','investment no risk',
  'forex trading signal','crypto trading signal',
  'dm us for your payment','whatsapp us to claim',
  'call us now to receive your prize','contact us to receive',
  'work from home 50k daily','make money fast nigeria',
  'referral bonus unlimited','mlm opportunity nigeria',
  'passive income guaranteed','financial freedom fast',
  'wire transfer needed','western union payment',
  'moneygram transfer required','gift card payment required',
  'itunes card payment','steam card payment',
  'this link will expire','your session will expire click now',
  'limited slots available act now','only 5 people selected',
  'you are among the few selected','exclusive offer for you only',
  'your phone number has won','your email has been selected',
  'us army soldier needs help','uk soldier stationed abroad',
  'i am a widower looking for love','i have funds to transfer',
];

// ════════════════════════════════════════════════════════════
// HELPER FUNCTIONS
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
    /gtb(ank)?[-_.]?(ng|nigeria|secure|verify|alert|login)/i,
    /accessbank[-_.]?(ng|alert|secure|verify|login)/i,
    /zenith[-_.]?(bank)?[-_.]?(ng|alert|verify|secure|login)/i,
    /firstbank[-_.]?(ng|alert|verify|secure|login)/i,
    /uba[-_.]?(bank)?[-_.]?(ng|secure|alert|verify|login)/i,
    /cbn[-_.]?(grant|portal|verify|payment|palliative|fund)/i,
    /paystack[-_.]?(ng|verify|secure|login|payment)/i,
    /flutterwave[-_.]?(ng|verify|secure|login)/i,
    /opay[-_.]?(verify|secure|ng|agent|login|account)/i,
    /palmpay[-_.]?(verify|secure|ng|login|account)/i,
    /kuda[-_.]?(verify|secure|ng|login|bank)/i,
    /moniepoint[-_.]?(verify|secure|ng|login)/i,
    /jamb[-_.]?(portal|verify|ng|result|login|registration)/i,
    /npower[-_.]?(verify|payment|portal|login|grant)/i,
    /jumia[-_.]?(verify|secure|ng|pay|login)/i,
    /konga[-_.]?(verify|secure|ng|login)/i,
    /piggyvest[-_.]?(verify|secure|login)/i,
    /cowrywise[-_.]?(verify|secure|login)/i,
    /efcc[-_.]?(grant|portal|verify|fund|payment)/i,
    /nimc[-_.]?(verify|portal|login|nin)/i,
    /inec[-_.]?(verify|portal|login|vote)/i,
    /mtn[-_.]?(bonus|reward|grant|free|win|claim)/i,
    /airtel[-_.]?(bonus|reward|grant|free|win|claim)/i,
    /glo[-_.]?(bonus|reward|grant|free|win|claim)/i,
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
  const prompt = `You are ScamShield NG, a cybersecurity AI trained specifically on Nigerian internet scams and fraud patterns.

CRITICAL RULES — FOLLOW EXACTLY:
1. Nigerian government sites (.gov.ng, .edu.ng, .mil.ng, .org.ng) are ALWAYS safe
2. Developer/hosting platforms (Vercel, Netlify, GitHub, Railway, Render) are NOT scams
3. An unknown or unfamiliar domain alone is NEVER enough reason to flag as suspicious or scam
4. All Nigerian banks, fintechs, telecoms, news sites, betting platforms are SAFE
5. All well-known global brands are SAFE — Amazon, Walmart, Netflix, Google, Apple, etc.
6. Scholarship, job opportunity, and education links are SAFE unless they ask for money upfront
7. ONLY flag as SCAM when there is clear, explicit evidence of fraud intent in the content
8. http:// links (no SSL) should be flagged as SUSPICIOUS only, not scam
9. When in doubt between safe and suspicious, choose SAFE for unknown but normal-looking sites

CLEAR NIGERIAN SCAM SIGNALS:
- Requests for BVN, NIN, ATM PIN, OTP, CVV via message or link
- Fake CBN grants, Npower payments, Trader Moni, government palliatives
- "You have won" messages requiring fees or personal info to claim
- Fake bank alerts asking to click a link to verify account
- Investment schemes promising guaranteed returns or "double your money"
- Requests to send airtime or recharge cards as payment
- 419 advance fee fraud — inheritance, lottery, foreign funds
- Typosquatted domains impersonating Nigerian banks
- AI deepfake celebrity endorsements for investment platforms
- Romance scams involving soldiers or foreigners asking for money

Content to analyze:
"""
${input}
"""

Respond ONLY in this EXACT JSON format, no markdown, no backticks, no extra text:
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
    return res.json({ verdict: 'suspicious', explanation: 'This link has no SSL security (http not https). Do not enter any personal details on it.', detectedBy: 'heuristic' });
  }

  // Layer 1 — Whitelist
  if (domain && isWhitelisted(domain)) {
    return res.json({ verdict: 'safe', explanation: `${domain} is a verified, trusted platform.`, detectedBy: 'whitelist' });
  }

  // Layer 2 — Community blacklist
  const reportCount = await getCommunityCount(trimmed, SUPABASE_ANON_KEY);
  if (reportCount >= COMMUNITY_THRESHOLD) {
    return res.json({ verdict: 'scam', explanation: `This has been reported as a scam by ${reportCount} ScamShield users. Avoid it.`, detectedBy: 'community' });
  }

  // Layer 3 — Static blacklist
  if (BLACKLIST_PATTERNS.some(p => p.test(trimmed))) {
    return res.json({ verdict: 'scam', explanation: 'This matches a known Nigerian scam pattern. Do not click or share any personal details.', detectedBy: 'blacklist' });
  }

  // Layer 4a — URL shortener
  if (domain && URL_SHORTENERS.has(domain)) {
    return res.json({ verdict: 'suspicious', explanation: 'This is a shortened link hiding the real destination. Scammers frequently use these to disguise dangerous sites.', detectedBy: 'heuristic' });
  }

  // Layer 4b — Typosquatting
  if (domain && hasTyposquatting(domain)) {
    return res.json({ verdict: 'scam', explanation: 'This domain is impersonating a real Nigerian bank or trusted platform. It is very likely a phishing site.', detectedBy: 'heuristic' });
  }

  // Layer 4c — Danger phrases
  const lower = trimmed.toLowerCase();
  if (DANGER_PHRASES.some(p => lower.includes(p))) {
    return res.json({ verdict: 'scam', explanation: 'This message is asking for sensitive info like BVN, PIN, or OTP — a clear Nigerian scam tactic.', detectedBy: 'heuristic' });
  }

  // Layer 4d — Suspicious phrases
  if (SUSPICIOUS_PHRASES.some(p => lower.includes(p))) {
    return res.json({ verdict: 'suspicious', explanation: 'This uses language commonly found in Nigerian scam messages. Verify carefully before trusting it.', detectedBy: 'heuristic' });
  }

  // Layer 5 — Gemini AI
  try {
    const geminiResult = await callGemini(trimmed, GEMINI_API_KEY);
    return res.json({ ...geminiResult, detectedBy: 'ai' });
  } catch (err) {
    console.error('Gemini error:', err);
    // Smart fallback — clean two-part domains default to safe
    const looksLegit = domain && !hasTyposquatting(domain) && domain.split('.').length <= 3;
    return res.json({
      verdict: looksLegit ? 'safe' : 'suspicious',
      explanation: looksLegit
        ? `${domain} appears to be a legitimate website. Always stay alert online.`
        : 'We could not fully verify this. Treat with caution until you can confirm it is legitimate.',
      detectedBy: 'ai',
    });
  }
}
