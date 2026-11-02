/**
 * Central Feature Definitions & In-Depth Interactive Guides
 * FitKarma - India's AI-powered Fitness and Wellness Ecosystem
 * Extracted from FitKarma Master Documentation (v1.0)
 */

export type FeatureKey =
  | 'meal_sandbox'
  | 'whatsapp_logging'
  | 'ai_photo_scanner'
  | 'tadka_slider'
  | 'family_recipe_splitter'
  | 'dip'
  | 'dynamic_tdee'
  | 'festival_fasting'
  | 'family_care'
  | 'data_vault'
  | 'health_os_sync'
  | 'womens_health';

export type FeatureCategory = 'nutrition' | 'logging' | 'metabolic' | 'family' | 'privacy';

export interface GuideStep {
  stepNumber: number;
  titleEn: string;
  titleHi: string;
  descEn: string;
  descHi: string;
}

export interface FeatureGuide {
  id: FeatureKey;
  category: FeatureCategory;
  status: 'p0' | 'p1' | 'p2';
  titleEn: string;
  titleHi: string;
  tagEn: string;
  tagHi: string;
  badgeEn: string;
  badgeHi: string;
  overviewEn: string;
  overviewHi: string;
  whyIndiaFirstEn: string;
  whyIndiaFirstHi: string;
  steps: GuideStep[];
}

export const FEATURE_GUIDES: Record<FeatureKey, FeatureGuide> = {
  meal_sandbox: {
    id: 'meal_sandbox',
    category: 'nutrition',
    status: 'p0',
    titleEn: 'Indian Household Nutrition & Portions',
    titleHi: 'भारतीय घरेलू पोषण व कटोरी माप',
    tagEn: 'Household Portions',
    tagHi: 'घरेलू माप',
    badgeEn: 'Core Differentiator',
    badgeHi: 'प्रमुख विशिष्टता',
    overviewEn:
      'Log home cooking with real Indian kitchen units: phulka counts, 150ml standard katoris, and desi ghee toggles instead of impractical gram scales.',
    overviewHi:
      'भारतीय रसोई के वास्तविक माप के साथ भोजन दर्ज करें: रोटी की संख्या, 150 मिली मानक कटोरी और बिना किसी तराजू के देसी घी टॉगल।',
    whyIndiaFirstEn:
      'Generic Western fitness apps ask for grams, completely failing when an Indian mother serves homemade dal and rotis. FitKarma calculates authentic culinary yield multipliers.',
    whyIndiaFirstHi:
      'विदेशी ऐप्स ग्राम में माप मांगते हैं जो भारतीय घरों में अव्यावहारिक है। FitKarma भारतीय पकाने की विधि के अनुसार सटीक गणना करता है।',
    steps: [
      {
        stepNumber: 1,
        titleEn: 'Select Regional Preset',
        titleHi: 'क्षेत्रीय थाली चुनें',
        descEn: 'Pick between North, South, Bengali, or Western Indian thali templates to load traditional default items.',
        descHi: 'पारंपरिक व्यंजन लोड करने के लिए उत्तर, दक्षिण, बंगाली या पश्चिमी भारतीय थाली में से चुनें।',
      },
      {
        stepNumber: 2,
        titleEn: 'Adjust Roti & Katori Sliders',
        titleHi: 'रोटी और कटोरी स्लाइडर समायोजित करें',
        descEn: 'Slide roti count (0–6), toggle Desi Ghee coating (+45 kcal), and adjust dal/rice katori volumes.',
        descHi: 'रोटी की संख्या चुनें, देसी घी (+45 कैलोरी) टॉगल करें और दाल/चावल की कटोरी मात्रा तय करें।',
      },
      {
        stepNumber: 3,
        titleEn: 'View Live Macro Breakdown',
        titleHi: 'लाइव पोषण विश्लेषण देखें',
        descEn: 'Observe instant protein, net carbs, and healthy lipid recalculations on the live visual thali.',
        descHi: 'लाइव थाली पर प्रोटीन, कार्बोहाइड्रेट और शुद्ध वसा का तात्कालिक विश्लेषण देखें।',
      },
    ],
  },
  whatsapp_logging: {
    id: 'whatsapp_logging',
    category: 'logging',
    status: 'p0',
    titleEn: 'WhatsApp Voice & Hinglish AI Logging',
    titleHi: 'व्हाट्सएप वॉइस व हिंग्लिश AI लॉगिंग',
    tagEn: 'Conversational AI',
    tagHi: 'संवादात्मक AI',
    badgeEn: 'Zero-Friction Interface',
    badgeHi: 'शून्य-रुकावट इंटरफ़ेस',
    overviewEn:
      'Log your meals directly in WhatsApp where you already spend your day. Send a voice note or natural Hinglish message, and let AI do the rest.',
    overviewHi:
      'सीधे व्हाट्सएप पर भोजन दर्ज करें। केवल एक वॉइस नोट या साधारण हिंग्लिश संदेश भेजें और AI को बाकी काम करने दें।',
    whyIndiaFirstEn:
      'Typing out every ingredient into a complex app leads to abandonment in 3 days. WhatsApp voice logging removes all friction for busy Indian users.',
    whyIndiaFirstHi:
      'जटिल ऐप्स में बार-बार लिखना 3 दिन में छूट जाता है। व्हाट्सएप वॉइस लॉगिंग व्यस्त भारतीयों के लिए सबसे आसान तरीका है।',
    steps: [
      {
        stepNumber: 1,
        titleEn: 'Send Voice Note or Text',
        titleHi: 'वॉइस नोट या टेक्स्ट भेजें',
        descEn: 'Speak in natural Hinglish or Hindi: "Aaj lunch me 2 roti with ghee, yellow dal aur bhindi khayi".',
        descHi: 'स्वाभाविक भाषा में बोलें: "आज दोपहर में 2 रोटी देसी घी के साथ, पीली दाल और भिंडी खाई"।',
      },
      {
        stepNumber: 2,
        titleEn: 'Multi-Model AI Parsing',
        titleHi: 'AI द्वारा स्वचालित विश्लेषण',
        descEn: 'FitKarma maps dishes to its 500+ Indian food database, estimating portions and lipids with confidence scores.',
        descHi: 'FitKarma 500+ भारतीय खाद्य डेटाबेस के साथ व्यंजनों का मिलान कर सटीक मात्रा निकालता है।',
      },
      {
        stepNumber: 3,
        titleEn: '1-Tap Confirmation',
        titleHi: 'एक टैप में पुष्टि',
        descEn: 'Review the formatted nutrition card in your chat and tap confirm to lock it into your Daily Intelligence record.',
        descHi: 'चैट में बने पोषण कार्ड की समीक्षा करें और पुष्टि करके इसे दैनिक रिकॉर्ड में जोड़ें।',
      },
    ],
  },
  ai_photo_scanner: {
    id: 'ai_photo_scanner',
    category: 'logging',
    status: 'p1',
    titleEn: '3D AI Food Scanner & Camera Vision',
    titleHi: '3D AI भोजन स्कैनर व कैमरा विज़न',
    tagEn: 'Computer Vision',
    tagHi: 'कंप्यूटर विज़न',
    badgeEn: 'Multi-Dish Segmentation',
    badgeHi: 'मल्टी-डिश विभाजन',
    overviewEn:
      'Point your camera at mixed Indian thalis, dosas, or home-cooked platters for instantaneous multi-component bounding box recognition.',
    overviewHi:
      'थाली या घरेलू भोजन पर कैमरा रखें और एक साथ थाली के सभी घटकों की त्वरित पहचान प्राप्त करें।',
    whyIndiaFirstEn:
      'Barcode scanners only work on packaged Western foods. Indian home-cooked meals have composite curries and gravies that require custom trained vision models.',
    whyIndiaFirstHi:
      'बारकोड स्कैनर केवल पैकेट वाले खाने पर काम करते हैं। भारतीय घर के बने खाने के लिए विशेष कंप्यूटर विज़न की आवश्यकता होती है।',
    steps: [
      {
        stepNumber: 1,
        titleEn: 'Frame Your Indian Plate',
        titleHi: 'थाली को फ्रेम में लाएं',
        descEn: 'Hold camera over the plate so all bowls, breads, and gravies are visible in the viewfinder.',
        descHi: 'कैमरे को थाली के ऊपर रखें ताकि सभी कटोरियाँ और रोटियाँ स्क्रीन में दिखाई दें।',
      },
      {
        stepNumber: 2,
        titleEn: 'Trigger AI Scan',
        titleHi: 'AI स्कैन शुरू करें',
        descEn: 'Tap the shutter button to initiate the multi-component laser sweep across the dishes.',
        descHi: 'शटर बटन दबाकर लेज़र स्कैन शुरू करें जो थाली के सभी व्यंजनों का विश्लेषण करता है।',
      },
      {
        stepNumber: 3,
        titleEn: 'Review AR Bounding Boxes',
        titleHi: 'AR बॉक्स व मात्रा जांचें',
        descEn: 'Inspect component bounding boxes with confidence scores (e.g., "98% • Dal Tadka 1.5 Katori") and tap Log.',
        descHi: 'व्यंजनों के ऊपर बने बॉक्स और सटीकता प्रतिशत की समीक्षा करें और लॉग करें।',
      },
    ],
  },
  tadka_slider: {
    id: 'tadka_slider',
    category: 'nutrition',
    status: 'p0',
    titleEn: 'Tadka / Tempering Fat Multiplier',
    titleHi: 'तड़का फैट गुणक स्लाइडर',
    tagEn: 'Cooking Realities',
    tagHi: 'वास्तविक कुकिंग',
    badgeEn: 'Lipid Variable Engine',
    badgeHi: 'वसा विश्लेषण इंजन',
    overviewEn:
      'Accurately model cooking oil and ghee variations across Minimal (1/2 tsp oil), Home-Style (1 tsp ghee), and Festive Dhaba (2 tbsp ghee) tempering.',
    overviewHi:
      'न्यूनतम तेल (1/2 चम्मच), घरेलू घी (1 चम्मच) और ढाबा तड़का (2 चम्मच) के अनुसार वसा का सही हिसाब रखें।',
    whyIndiaFirstEn:
      'A bowl of yellow dal can range from 120 kcal to 260 kcal entirely depending on how heavily it was tempered. FitKarma solves this hidden calorie trap.',
    whyIndiaFirstHi:
      'एक कटोरी दाल में तड़के के आधार पर 120 से 260 कैलोरी तक का अंतर हो सकता है। FitKarma इस छिपी हुई कैलोरी का समाधान करता है।',
    steps: [
      {
        stepNumber: 1,
        titleEn: 'Identify Tempering Style',
        titleHi: 'तड़के का प्रकार चुनें',
        descEn: 'Select whether the dish was prepared with diet tempering, standard home ghee, or rich festive oil.',
        descHi: 'चुनें कि भोजन डाइट तड़के, सामान्य घरेलू घी या उत्सव/ढाबा शैली में बना है।',
      },
      {
        stepNumber: 2,
        titleEn: 'See Lipid Recalculation',
        titleHi: 'वसा का तात्कालिक प्रभाव देखें',
        descEn: 'Watch how fats shift from +2.8g to +14.5g without altering proteins or carbs.',
        descHi: 'देखें कि प्रोटीन और कार्ब्स बदले बिना वसा कैसे +2.8 ग्राम से +14.5 ग्राम तक बदलती है।',
      },
      {
        stepNumber: 3,
        titleEn: 'Refine Household Habits',
        titleHi: 'घरेलू आदतों में सुधार',
        descEn: 'Understand where invisible cooking calories come from without sacrificing authentic Indian flavor.',
        descHi: 'स्वाद से समझौता किए बिना समझें कि भोजन में अतिरिक्त कैलोरी कहाँ से आ रही है।',
      },
    ],
  },
  family_recipe_splitter: {
    id: 'family_recipe_splitter',
    category: 'nutrition',
    status: 'p1',
    titleEn: 'Family Recipe Splitter',
    titleHi: 'फैमिली रेसिपी स्प्लिटर',
    tagEn: 'Shared Pot Logic',
    tagHi: 'साझा हांडी लॉजिक',
    badgeEn: 'Household Meal Management',
    badgeHi: 'घरेलू भोजन प्रबंधन',
    overviewEn:
      'Enter total raw ingredients for the entire family pot, then slide to allocate your individual plate percentage ("I ate 25% of the Sabzi").',
    overviewHi:
      'पूरे परिवार के लिए हांडी में डाली गई कुल सामग्री दर्ज करें, और अपनी खाई हुई मात्रा प्रतिशत में चुनें।',
    whyIndiaFirstEn:
      'Nobody in India cooks a single chicken breast or 40g of dal in isolation. Food is cooked for the whole family in one pot. This feature respects that reality.',
    whyIndiaFirstHi:
      'भारत में कोई अकेले अपने लिए 40 ग्राम दाल नहीं पकाता। खाना पूरे परिवार के लिए एक साथ बनता है।',
    steps: [
      {
        stepNumber: 1,
        titleEn: 'Log Total Raw Ingredients',
        titleHi: 'कुल कच्ची सामग्री दर्ज करें',
        descEn: 'Input the raw ingredients used for the whole family pot (e.g. 500g paneer + 3 tbsp ghee).',
        descHi: 'पूरे परिवार के लिए इस्तेमाल कच्ची सामग्री दर्ज करें (जैसे 500 ग्राम पनीर + 3 चम्मच घी)।',
      },
      {
        stepNumber: 2,
        titleEn: 'Slide Your Percentage',
        titleHi: 'अपना प्रतिशत स्लाइड करें',
        descEn: 'Use the intuitive slider to estimate how much of the pot you consumed (e.g. 25% or 30%).',
        descHi: 'स्लाइडर से चुनें कि आपने पूरी हांडी का कितना हिस्सा खाया (जैसे 25% या 30%)।',
      },
      {
        stepNumber: 3,
        titleEn: 'Instant Personal Macros',
        titleHi: 'व्यक्तिगत पोषण प्राप्त करें',
        descEn: 'FitKarma automatically apportions exact calories and protein to your personal daily log.',
        descHi: 'FitKarma स्वतः आपके हिस्से की सही कैलोरी और प्रोटीन आपके खाते में जोड़ देता है।',
      },
    ],
  },
  dip: {
    id: 'dip',
    category: 'metabolic',
    status: 'p0',
    titleEn: 'Daily Intelligence Package (DIP)',
    titleHi: 'दैनिक इंटेलिजेंस पैकेज (DIP)',
    tagEn: 'Circadian Health',
    tagHi: 'सर्कैडियन स्वास्थ्य',
    badgeEn: 'Contextual Pulses',
    badgeHi: 'समयोचित स्वास्थ्य संकेत',
    overviewEn:
      'Instead of guilt-inducing calorie alerts, receive 3 contextual metabolic pulses: Morning Readiness (07:00), Midday Glucose Nudge (13:30), and Evening Debrief (21:00).',
    overviewHi:
      'दिन भर कैलोरी गिनने के तनाव के बजाय दिन में 3 मुख्य वैज्ञानिक संकेत प्राप्त करें: सुबह की तैयारी, दोपहर का ग्लूकोज संकेत और रात की समीक्षा।',
    whyIndiaFirstEn:
      'Post-prandial glycemic spikes from carbohydrate-rich Indian lunches cause acute afternoon lethargy. The DIP gives actionable timing advice like a 10-minute walk.',
    whyIndiaFirstHi:
      'दोपहर के भारतीय भोजन के बाद सुस्ती आती है। DIP 10 मिनट की हल्की सैर जैसे तुरंत लागू करने योग्य सुझाव देता है।',
    steps: [
      {
        stepNumber: 1,
        titleEn: '07:00 AM Morning Readiness',
        titleHi: 'सुबह 07:00: शारीरिक तैयारी',
        descEn: 'Review sleep architecture score and optimal circadian cognitive focus windows with breakfast suggestions.',
        descHi: 'नींद की गुणवत्ता का स्कोर और नाश्ते के सुझाव के साथ दिन की शुरुआत करें।',
      },
      {
        stepNumber: 2,
        titleEn: '01:30 PM Midday Nudge',
        titleHi: 'दोपहर 01:30: ग्लूकोज संकेत',
        descEn: 'Track hydration and take a 10-minute post-lunch walk to flatten glucose spikes by ~22%.',
        descHi: 'हाइड्रेशन ट्रैक करें और भोजन के बाद रक्त शर्करा को स्थिर रखने के लिए 10 मिनट टहलें।',
      },
      {
        stepNumber: 3,
        titleEn: '09:00 PM Evening Debrief',
        titleHi: 'रात 09:00: विश्राम व समीक्षा',
        descEn: 'Assess daily Karma score, macro achievement, and initiate screen wind-down with warm turmeric milk.',
        descHi: 'दैनिक स्कोर देखें और गहरी नींद के लिए स्क्रीन की रोशनी धीमी करने की तैयारी करें।',
      },
    ],
  },
  dynamic_tdee: {
    id: 'dynamic_tdee',
    category: 'metabolic',
    status: 'p1',
    titleEn: 'Dynamic & Adaptive TDEE Calculator',
    titleHi: 'डायनेमिक व एडेप्टिव TDEE कैलकुलेटर',
    tagEn: 'Metabolic Adaptation',
    tagHi: 'मेटाबोलिक अनुकूलन',
    badgeEn: 'Adaptive Expenditure',
    badgeHi: 'अनुकूलन योग्य ऊर्जा खपत',
    overviewEn:
      'Continuous metabolic expenditure recalculation combining 7-day smoothed weight trends, logged intake, and wearable step counts to bypass static BMR formulas.',
    overviewHi:
      'स्थिर फॉर्मूले के बजाय वजन के रुझान, भोजन और दैनिक कदमों के आधार पर वास्तविक ऊर्जा खपत का निरंतर समायोजन।',
    whyIndiaFirstEn:
      'Indian metabolic phenotypes often adapt quickly to calorie restriction, causing weight-loss plateaus. Adaptive TDEE updates weekly to keep progress consistent.',
    whyIndiaFirstHi:
      'भारतीय मेटाबोलिज्म कम कैलोरी पर जल्दी सुस्त हो जाता है। एडेप्टिव TDEE वजन घटाने की रुकावट को दूर करता है।',
    steps: [
      {
        stepNumber: 1,
        titleEn: 'Passive Biometric Sync',
        titleHi: 'बायोमेट्रिक्स सिंक',
        descEn: 'Connect wearable steps and log weight a few times a week without rigid daily weigh-in stress.',
        descHi: 'स्मार्टवॉच को कनेक्ट करें और बिना तनाव के सप्ताह में कुछ बार वजन दर्ज करें।',
      },
      {
        stepNumber: 2,
        titleEn: 'Smoothed Velocity Analysis',
        titleHi: 'रुझान विश्लेषण',
        descEn: 'Algorithm filters out water retention and sodium swings to calculate true fat loss velocity.',
        descHi: 'एल्गोरिद्म पानी के वजन के उतार-चढ़ाव को हटाकर वास्तविक फैट लॉस की गणना करता है।',
      },
      {
        stepNumber: 3,
        titleEn: 'Personalized Calorie Target',
        titleHi: 'व्यक्तिगत कैलोरी लक्ष्य',
        descEn: 'Receive updated weekly caloric targets tuned to your exact biological adaptation rate.',
        descHi: 'अपनी शारीरिक अनुकूलन दर के अनुसार अद्यतन साप्ताहिक कैलोरी लक्ष्य प्राप्त करें।',
      },
    ],
  },
  festival_fasting: {
    id: 'festival_fasting',
    category: 'nutrition',
    status: 'p1',
    titleEn: 'Festival & Fasting Mode (Vrat / Roza)',
    titleHi: 'त्यौहार व उपवास मोड (व्रत / रोज़ा)',
    tagEn: 'Cultural Fasting',
    tagHi: 'सांस्कृतिक उपवास',
    badgeEn: 'Satvik & Fasting Logic',
    badgeHi: 'सात्विक पोषण लॉजिक',
    overviewEn:
      'Adaptive tracking for Navratri, Ramzan, Karwa Chauth, and Ekadashi fasting schedules with satvik ingredient checks and hydration pacing.',
    overviewHi:
      'नवरात्रि, रमज़ान, करवा चौथ और एकादशी उपवास के दौरान सात्विक सामग्री और जल संतुलन का अनुकूलित प्रबंधन।',
    whyIndiaFirstEn:
      'Western apps flag fasting days as "under-eating" or starvation. FitKarma celebrates cultural fasting with tailored satvik macros and safe hydration prompts.',
    whyIndiaFirstHi:
      'विदेशी ऐप्स उपवास के दिनों को भुखमरी मान लेते हैं। FitKarma सांस्कृतिक उपवास का सम्मान करते हुए सही पोषण बताता है।',
    steps: [
      {
        stepNumber: 1,
        titleEn: 'Activate Fasting Schedule',
        titleHi: 'उपवास का प्रकार चुनें',
        descEn: 'Select your active fast (Navratri, Roza, Karwa Chauth, Ekadashi) to adapt tracking parameters.',
        descHi: 'अपने उपवास का चयन करें ताकि ऐप उसके अनुसार समय और नियम लागू कर सके।',
      },
      {
        stepNumber: 2,
        titleEn: 'Log Satvik Ingredients',
        titleHi: 'सात्विक सामग्री दर्ज करें',
        descEn: 'Track vrat-compliant ingredients like Kuttu atta, Sabudana, Makhana, sendha namak, and seasonal fruits.',
        descHi: 'कुट्टू का आटा, साबूदाना, मखाना, सेंधा नमक और फल जैसी स्वीकृत सामग्री दर्ज करें।',
      },
      {
        stepNumber: 3,
        titleEn: 'Paced Hydration Reminders',
        titleHi: 'संतुलित जल अनुस्मारक',
        descEn: 'Receive timed hydration pulses during permitted drinking windows to avoid dehydration fatigue.',
        descHi: 'स्वीकृत समय के दौरान समय पर पानी पीने के संकेत प्राप्त करें ताकि कमजोरी न आए।',
      },
    ],
  },
  family_care: {
    id: 'family_care',
    category: 'family',
    status: 'p1',
    titleEn: 'Family Care Dashboard',
    titleHi: 'पारिवारिक देखभाल डैशबोर्ड',
    tagEn: 'Parental Telemetry',
    tagHi: 'माता-पिता टेलीमेट्री',
    badgeEn: 'Household Responsibility',
    badgeHi: 'पारिवारिक दायित्व',
    overviewEn:
      'Monitor elderly parents’ daily steps, blood pressure, glucose, and medication adherence with affirmative consent and emergency crisis alert triggers.',
    overviewHi:
      'बुजुर्ग माता-पिता की सहमति से उनके कदम, बीपी, शुगर और दवाइयों की निगरानी करें और आपातकालीन अलर्ट पाएं।',
    whyIndiaFirstEn:
      'Health in India is a shared family commitment. Adult children caring for aging parents need remote peace of mind without invading privacy.',
    whyIndiaFirstHi:
      'भारत में माता-पिता की सेहत का ख्याल पूरा परिवार रखता है। यह सुविधा गोपनीयता बनाए रखते हुए चिंतामुक्त करती है।',
    steps: [
      {
        stepNumber: 1,
        titleEn: 'Send Family Consent Invite',
        titleHi: 'सहमति आमंत्रण भेजें',
        descEn: 'Parent affirms consent via SMS or WhatsApp, selecting which health metrics they choose to share.',
        descHi: 'माता-पिता अपनी पसंद के अनुसार डेटा साझा करने की स्पष्ट सहमति देते हैं।',
      },
      {
        stepNumber: 2,
        titleEn: 'Monitor Daily Adherence',
        titleHi: 'दैनिक निगरानी रखें',
        descEn: 'Check steps, recorded blood pressure, and medication confirmation in a unified household dashboard.',
        descHi: 'एक ही स्क्रीन पर उनके कदम, बीपी और दवा लेने की स्थिति की समीक्षा करें।',
      },
      {
        stepNumber: 3,
        titleEn: 'Emergency Crisis Triggers',
        titleHi: 'आपातकालीन अलर्ट',
        descEn: 'Receive instant automated WhatsApp alerts if a parent’s vitals show severe spikes or inactivity.',
        descHi: 'असामान्य स्थिति या अचानक अत्यधिक शुगर/बीपी बढ़ने पर व्हाट्सएप पर तुरंत अलर्ट पाएं।',
      },
    ],
  },
  data_vault: {
    id: 'data_vault',
    category: 'privacy',
    status: 'p0',
    titleEn: 'Encrypted Data Vault & 1-Click Erasure',
    titleHi: 'एन्क्रिप्टेड डेटा वॉल्ट व 1-क्लिक विलोपन',
    tagEn: 'DPDP Act 2023',
    tagHi: 'DPDP अधिनियम 2023',
    badgeEn: 'Zero Health Monetization',
    badgeHi: 'शून्य डेटा मुद्रीकरण',
    overviewEn:
      'SQLCipher 256-bit on-device encryption, PostgreSQL Row-Level Security, and a cascading "Erase My Existence" button that purges all records with verifiable receipts.',
    overviewHi:
      '256-बिट सुरक्षित स्थानीय एन्क्रिप्शन, शून्य डेटा बिक्री और "Erase My Existence" बटन जिससे एक क्लिक में सारा डेटा मिट जाता है।',
    whyIndiaFirstEn:
      'India’s DPDP Act 2023 demands genuine data minimization. FitKarma guarantees your health biometrics and diet logs are never sold to ad brokers or insurers.',
    whyIndiaFirstHi:
      'भारत के डेटा संरक्षण कानून के अनुसार आपकी सेहत का डेटा कभी किसी विज्ञापनदाता या बीमा कंपनी को नहीं बेचा जाता।',
    steps: [
      {
        stepNumber: 1,
        titleEn: 'Review Storage Breakdown',
        titleHi: 'डेटा भंडारण देखें',
        descEn: 'Inspect the transparent Data Vault showing what telemetry resides locally vs encrypted in the private cloud.',
        descHi: 'पारदर्शी रूप से देखें कि कौन सा डेटा केवल फोन पर है और कौन सा प्राइवेट क्लाउड में है।',
      },
      {
        stepNumber: 2,
        titleEn: 'Verify Encryption Integrity',
        titleHi: 'एन्क्रिप्शन की पुष्टि',
        descEn: 'Confirm that all local SQLite tables are sealed with 256-bit SQLCipher hardware-level encryption.',
        descHi: 'सुनिश्चित करें कि सारा व्यक्तिगत डेटा हार्डवेयर स्तर पर पूरी तरह सुरक्षित है।',
      },
      {
        stepNumber: 3,
        titleEn: 'Execute 1-Click Purge',
        titleHi: '1-क्लिक में सब मिटाएं',
        descEn: 'Tap "Erase My Existence" anytime to trigger an auditable cryptographic purge of all records across devices and servers.',
        descHi: '"Erase My Existence" दबाकर डिजिटल रसीद के साथ अपना सारा रिकॉर्ड हमेशा के लिए मिटाएं।',
      },
    ],
  },
  health_os_sync: {
    id: 'health_os_sync',
    category: 'metabolic',
    status: 'p0',
    titleEn: 'Health Connect & Apple HealthKit Sync',
    titleHi: 'हेल्थ कनेक्ट व ऐपल हेल्थकिट सिंक',
    tagEn: 'Wearables Integration',
    tagHi: 'स्मार्टवॉच एकीकरण',
    badgeEn: 'Native OS Telemetry',
    badgeHi: 'नेटिव OS टेलीमेट्री',
    overviewEn:
      'Seamless bidirectional sync with Google Health Connect (Android) and Apple HealthKit (iOS) to ingest steps, sleep stages, resting HR, and active workouts.',
    overviewHi:
      'ऐंड्रॉयड हेल्थ कनेक्ट और ऐपल हेल्थकिट के साथ सहज सिंक जो कदम, नींद, हृदय गति और कसरत का डेटा स्वतः एकत्र करता है।',
    whyIndiaFirstEn:
      'Indian consumers wear smartwatches from diverse brands (Noise, Fire-Boltt, Boat, Apple, Garmin). OS-level sync aggregates all of them cleanly without proprietary vendor lock-in.',
    whyIndiaFirstHi:
      'भारतीय उपभोक्ता कई तरह की स्मार्टवॉच पहनते हैं। OS-स्तरीय सिंक बिना किसी रुकावट के सभी ब्रांड्स का डेटा मिलाता है।',
    steps: [
      {
        stepNumber: 1,
        titleEn: 'Grant OS Permission',
        titleHi: 'अनुमति प्रदान करें',
        descEn: 'Tap one button to grant read/write permissions via Google Health Connect or Apple Health.',
        descHi: 'हेल्थ कनेक्ट या ऐपल हेल्थ के माध्यम से केवल एक क्लिक में सुरक्षित अनुमति दें।',
      },
      {
        stepNumber: 2,
        titleEn: 'Passive Continuous Stream',
        titleHi: 'स्वचालित डेटा प्रवाह',
        descEn: 'Steps, resting heart rate, and sleep architecture stream in passively in the background.',
        descHi: 'कदम, हृदय गति और नींद का डेटा बिना ऐप खोले बैकग्राउंड में स्वतः सिंक होता रहता है।',
      },
      {
        stepNumber: 3,
        titleEn: 'Unified Intelligence',
        titleHi: 'एकीकृत बुद्धिमत्ता',
        descEn: 'FitKarma synthesizes your biometric burn directly into the Indian Meal Sandbox and Daily Intelligence Package.',
        descHi: 'FitKarma इस बायोमेट्रिक डेटा का उपयोग आपके दैनिक भोजन और पोषण सुझावों को अनुकूलित करने में करता है।',
      },
    ],
  },
  womens_health: {
    id: 'womens_health',
    category: 'family',
    status: 'p1',
    titleEn: 'Women’s Cycle & PCOS Lifestyle Support',
    titleHi: 'महिला चक्र व PCOS जीवनशैली समर्थन',
    tagEn: 'Cycle-Aware Health',
    tagHi: 'हार्मोनल लय ट्रैकिंग',
    badgeEn: 'Hormonal Rhythm',
    badgeHi: 'हार्मोनल लय',
    overviewEn:
      'Track menstrual phases, cycle-aware strength training, symptom logging, and insulin-resistant PCOS nutritional support with elevated security rails.',
    overviewHi:
      'मासिक धर्म चक्र, हार्मोनल लय के अनुसार शक्ति प्रशिक्षण और इंसुलिन प्रतिरोधी PCOS पोषण का सुरक्षित प्रबंधन।',
    whyIndiaFirstEn:
      'PCOS affects over 20% of Indian women due to genetic insulin resistance and refined carbohydrate intake. FitKarma delivers culturally attuned low-glycemic Indian meal strategies.',
    whyIndiaFirstHi:
      'भारत में 20% से अधिक महिलाएं PCOS से प्रभावित हैं। FitKarma इसके लिए विशेष रूप से कम ग्लाइसेमिक भारतीय आहार रणनीति देता है।',
    steps: [
      {
        stepNumber: 1,
        titleEn: 'Select Cycle Phase',
        titleHi: 'चक्र का चरण चुनें',
        descEn: 'Identify Follicular, Ovulatory, Luteal, or Menstrual phase for personalized metabolic guidance.',
        descHi: 'व्यक्तिगत मार्गदर्शन के लिए चक्र के वर्तमान चरण का चयन करें।',
      },
      {
        stepNumber: 2,
        titleEn: 'Align Training & Energy',
        titleHi: 'कसरत व ऊर्जा का तालमेल',
        descEn: 'Shift between progressive overload strength training during follicular peak vs active recovery during luteal phase.',
        descHi: 'हार्मोनल स्तर के अनुसार भारी वजन उठाने या हल्की कसरत का सही समय जानें।',
      },
      {
        stepNumber: 3,
        titleEn: 'PCOS Nutritional Adaptations',
        titleHi: 'PCOS पोषण अनुकूलन',
        descEn: 'Receive Indian recipes rich in spearmint, inositol, healthy fats, and plant fiber to naturally steady insulin.',
        descHi: 'इंसुलिन को स्थिर रखने के लिए विशेष भारतीय व्यंजन और फाइबर युक्त पोषण सुझाव प्राप्त करें।',
      },
    ],
  },
};
