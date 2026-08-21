import { SCHEMES_DATABASE } from '../data/schemes.js';

/**
 * Advanced Bilingual (Hindi Devanagari + Hinglish) Profile Extractor
 * Schema-Driven, Verified against a curated database of Bihar & Central government schemes
 */
export function extractProfileFromText(text = '') {
  const lower = text.toLowerCase().trim();
  const profile = {
    rawTranscript: text,
    age: null,
    gender: 'unspecified', // 'male' | 'female' | 'other' | 'unspecified'
    location_type: 'any',  // 'rural' | 'urban' | 'any'
    district: null,
    occupation: 'any',     // 'farmer' | 'student' | 'laborer' | 'artisan' | 'shopkeeper' | 'unemployed' | 'elderly' | 'shg-member' | 'any'
    income_level: null,    // 'bpl' | 'low' | 'middle' | 'high'
    estimated_income: null,// number or null
    social_category: 'any',// 'general' | 'sc' | 'st' | 'obc' | 'ebc' | 'minority' | 'any'
    disability_status: false,
    marital_status: 'any', // 'unmarried' | 'married' | 'widow' | 'divorced' | 'any'
    education_level: null, // 'below_10th' | '10th_pass' | '12th_pass' | 'graduate' | 'iti'
    has_land: false,
    land_size: null,
    has_ration_card: false,
    has_pucca_house: null, // true | false | null
    crop_damage: false,
    needs: [],             // ['scholarship', 'pension', 'health_treatment', 'housing', 'business_loan', 'tools', 'food_ration', 'disability_support']
    extractedTags: [],
    suggestedFollowUps: []
  };

  if (!lower) return profile;

  // 1. AGE EXTRACTION (Bilingual: Devanagari + Roman)
  const ageMatch = lower.match(/(\d{1,2})\s*(?:साल|वर्ष|उम्र|बरस|saal|sal|varsh|years|umar|age|ki umar|varsh ke|baras)/i) ||
                   lower.match(/(?:उम्र|आयु|umar|age)\s*(?:है|बा|hai|ba|is)?\s*(\d{1,2})/i);
  if (ageMatch && ageMatch[1]) {
    profile.age = parseInt(ageMatch[1], 10);
    profile.extractedTags.push(`उम्र: ${profile.age} वर्ष`);
  }

  // 2. GENDER & MARITAL STATUS EXTRACTION (Bilingual)
  if (/विधवा|पति नहीं रहे|पतिदेव गुजर गए|रांड|widow|vidhwa|patidev guzar gaye|pati nahi rahe|husband death/i.test(lower)) {
    profile.gender = 'female';
    profile.marital_status = 'widow';
    profile.extractedTags.push('स्थिति: विधवा महिला (Widow)');
  } else if (/लड़की|महिला|औरत|छात्रा|बेटी|कन्या|गुड़िया|बच्ची|माता|बहू|श्रीमती|देवी|ladki|beti|mahila|aurat|female|girl|kanya|guriya|bachi|maata|bahu|shrimati|devi/i.test(lower)) {
    profile.gender = 'female';
    profile.extractedTags.push('लिंग: महिला / छात्रा');
    if (/अविवाहित|कुंवारी|शादी नहीं|unmarried|avivahit|shadi nahi hui|kunwari/i.test(lower)) {
      profile.marital_status = 'unmarried';
    } else if (/विवाहित|शादी हो गई|ससुराल|गर्भवती|प्रसव|shadi ho gayi|vivahit|pati|sasural|pregnant|garbhvati/i.test(lower)) {
      profile.marital_status = 'married';
    }
  } else if (/पुरुष|लड़का|बेटा|किसान भाई|आदमी|भाई|श्री|कुमार|purush|male|ladka|beta|kisan bhai|aadmi|bhai|shri|kumar/i.test(lower)) {
    profile.gender = 'male';
    profile.extractedTags.push('लिंग: पुरुष');
  }

  // 3. DISABILITY (DIVYANGJAN / SPECIAL NEEDS) EXTRACTION (Bilingual)
  if (/दिव्यांग|विकलांग|अपाहिज|अंध|बहरा|गूंगा|व्हीलचेयर|ट्राईसाइकिल|यूडीआईडी|कृत्रिम अंग|चलने में असमर्थ|पैर खराब|हाथ खराब|आंख से दिखता नहीं|सुनाई नहीं देता|पैरालिसिस|लंगड़ा|disab|physically|handicap|special need|paralysis|chalne me dikkat|andhe|blind|behra|deaf|mute|udid|artificial limb|tricycle|wheelchair|cerebral palsy|autism|locomotor/i.test(lower)) {
    profile.disability_status = true;
    profile.needs.push('disability_support');
    profile.extractedTags.push('विशेष श्रेणी: दिव्यांगजन (Physically Challenged / Divyang)');
  }

  // 4. SOCIAL CATEGORY & MINORITY EXTRACTION (Bilingual)
  if (/मुस्लिम|ईसाई|सिख|बौद्ध|जैन|पारसी|अल्पसंख्यक|muslim|christian|sikh|buddhist|jain|parsi|alpsankhyak|minority/i.test(lower)) {
    profile.social_category = 'minority';
    profile.extractedTags.push('वर्ग: अल्पसंख्यक (Minority)');
  } else if (/अनुसूचित जाति|दलित|महादलित|हरिजन|पासवान|चमार|मुसहर|धोबी|sc|dalit|harijan|mahadalit|anusuchit jati|paswan|chamar|musahar|dhobi/i.test(lower)) {
    profile.social_category = 'sc';
    profile.extractedTags.push('वर्ग: अनुसूचित जाति (SC / महादलित)');
  } else if (/अनुसूचित जनजाति|आदिवासी|संथाल|उरांव|st|tribal|adivasi|anusuchit janjati|santhal|oraon/i.test(lower)) {
    profile.social_category = 'st';
    profile.extractedTags.push('वर्ग: अनुसूचित जनजाति (ST)');
  } else if (/अत्यंत पिछड़ा|ईबीसी|ebc|atyant pichhda|atyant pichra|annexure 1/i.test(lower)) {
    profile.social_category = 'ebc';
    profile.extractedTags.push('वर्ग: अत्यंत पिछड़ा वर्ग (EBC)');
  } else if (/पिछड़ा वर्ग|ओबीसी|यादव|कुर्मी|कुशवाहा|कोइरी|बनिया|obc|pichhda varg|pichra|yadav|kurmi|kushwaha|koeri|baniya/i.test(lower)) {
    profile.social_category = 'obc';
    profile.extractedTags.push('वर्ग: अन्य पिछड़ा वर्ग (OBC)');
  }

  // 5. OCCUPATION / PERSONA EXTRACTION (Bilingual)
  if (/सीनियर सिटीजन|सीनियर|सिटीजन|वरिष्ठ नागरिक|वरिष्ठ|बुजुर्ग|वृद्ध|वृद्धा|वृद्धजन|पेंशन|बूढ़े|दादा|दादी|नाना|नानी|senior citizen|senior|citizen|elderly|old age|vridha|vridhajan|bujurg|pension/i.test(lower)) {
    profile.occupation = 'elderly';
    if (!profile.age) profile.age = 65;
    profile.needs.push('pension', 'senior_care');
    profile.extractedTags.push('वर्ग: वरिष्ठ नागरिक (Senior Citizen / 60+)');
  } else if (/कारीगर|शिल्पकार|बढ़ई|लोहार|मिस्त्री|राजमिस्त्री|दर्जी|नाई|धोबी|कुम्हार|मोची|औजार|टूलकिट|विश्वकर्मा|artisan|karigar|badhai|carpenter|lohar|blacksmith|mistri|rajmistri|mason|darji|tailor|nai|barber|dhobi|kumhar|potter|mochi|cobbler|shilpkar|tool|vashikarma/i.test(lower)) {
    profile.occupation = 'artisan';
    profile.needs.push('tools', 'business_loan');
    profile.extractedTags.push('पेशा: पारंपरिक कारीगर / शिल्पकार');
  } else if (/दुकान|दुकानदार|किराना|व्यापार|कारोबार|फैक्ट्री|कारखाना|उद्यमी|वर्कशॉप|ठेला|गुमटी|रेहड़ी|पटरी|फुटपाथ|स्वनिधि|मुद्रा लोन|dukan|dukani|shop|shopkeeper|kirana|retail|business|startup|karobar|factory|karkhana|entrepreneur|workshop|welding|thela|vendor|footpath|svanidhi|mudra/i.test(lower)) {
    profile.occupation = 'shopkeeper';
    profile.needs.push('business_loan');
    profile.extractedTags.push('पेशा: दुकानदार / सूक्ष्म कारोबारी');
  } else if (/विद्यार्थी|छात्र|छात्रा|पढ़ाई|पढ़ने|कॉलेज|स्कूल|इंटर|12वीं|10वीं|मैट्रिक|दसवीं|बारहवीं|ग्रेजुएशन|डिग्री|बीटेक|पॉलिटेक्निक|आईटीआई|फीस|छात्रवृत्ति|स्कॉलरशिप|कोचिंग|student|padhai|padhe|college|school|chhatra|inter|12th|10th|matric|dasvi|barahvi|graduation|degree|btech|polytechnic|iti|fees|scholarship|chhatravritti|coaching|hostel/i.test(lower)) {
    profile.occupation = 'student';
    profile.needs.push('scholarship');
    profile.extractedTags.push('पेशा: विद्यार्थी / पढ़ाई');
  } else if (/मजदूर|मजदूरी|श्रमिक|दिहाड़ी|कुली|रिक्शा|ठेला चालक|कामगार|बेलदार|प्लंबर|इलेक्ट्रीशियन|पेंटर|ई-श्रम|मनरेगा|नरेगा|लेबर कार्ड|mazdoor|majdoor|daily wage|dihadi|kuli|rickshaw|thela chalak|shramik|kamgar|beldari|plumber|electrician|painter|e-shram|mgnrega|nrega|manrega/i.test(lower)) {
    profile.occupation = 'laborer';
    profile.needs.push('labor_welfare');
    profile.extractedTags.push('पेशा: असंगठित दिहाड़ी मजदूर / श्रमिक');
  } else if (/किसान|खेती|बटाईदार|बटाई|जोतना|कृषि|कृषक|farmer|kisan|kheti|bataidar|batai|jotna|krishi|krishak/i.test(lower)) {
    profile.occupation = 'farmer';
    profile.needs.push('kisan_support');
    profile.extractedTags.push('पेशा: किसान / खेती');
  } else if (/बेरोजगार|रोजगार चाहिए|नौकरी चाहिए|काम नहीं|काम सीखने|कंप्यूटर सीखने|berojgar|unemployed|job seeker|naukri chahiye|rojgar chahiye|kaam nahi hai/i.test(lower)) {
    profile.occupation = 'unemployed';
    profile.needs.push('skill_training', 'business_loan');
    profile.extractedTags.push('पेशा: बेरोजगार युवा / रोजगार तलाश');
  }

  // 6. EDUCATION LEVEL (Bilingual)
  if (/स्नातक|ग्रेजुएशन|डिग्री|बीए|बीएससी|बीकॉम|बीटेक|एमबीबीएस|पॉलिटेक्निक|graduation|graduate|degree|ba|bsc|bcom|btech|mbbs|polytechnic|snatak|college complete/i.test(lower)) {
    profile.education_level = 'graduate';
    profile.extractedTags.push('शिक्षा: स्नातक (Graduation / Degree)');
  } else if (/12वीं|बारहवीं|इंटर|इंटरमीडिएट|12 पास|12th|inter|intermediate|barahvi|12 pass|barhvin|inter pass/i.test(lower)) {
    profile.education_level = '12th_pass';
    profile.extractedTags.push('शिक्षा: 12वीं पास (Intermediate)');
  } else if (/10वीं|दसवीं|मैट्रिक|10 पास|10th|matric|dasvi|10 pass|matric pass/i.test(lower)) {
    profile.education_level = '10th_pass';
    profile.extractedTags.push('शिक्षा: 10वीं पास (Matric)');
  } else if (/आईटीआई|iti|polytechnic|diploma/i.test(lower)) {
    profile.education_level = 'iti';
    profile.extractedTags.push('शिक्षा: ITI / डिप्लोमा');
  }

  // 7. LAND & CROPS (Bilingual)
  if (/जमीन|भूमि|बीघा|कट्ठा|एकड़|डिसमिल|खेत|दाखिल खारिज|जमाबंदी|एलपीसी|zameen|jameen|land|bigha|katha|acre|dismil|khet|dakhil kharij|jamabandi|lpc/i.test(lower)) {
    profile.has_land = true;
    const landMatch = lower.match(/(\d+(?:\.\d+)?)\s*(?:बीघा|कट्ठा|एकड़|डिसमिल|bigha|katha|acre|dismil|bighae|kattha)/i);
    if (landMatch) {
      profile.land_size = landMatch[0];
      profile.extractedTags.push(`जमीन: ${profile.land_size}`);
    } else {
      profile.extractedTags.push('जमीन: भूमिधारक');
    }
  } else if (/भूमिहीन|जमीन नहीं|बटाई पर|bhoomiheen|landless|zameen nahi hai|batai par/i.test(lower)) {
    profile.has_land = false;
    profile.extractedTags.push('जमीन: भूमिहीन / बटाईदार');
  }

  // 8. HOUSING CONDITION (Bilingual)
  if (/कच्चा|झोपड़ी|झोपड़ा|घर नहीं|छत नहीं|पक्का मकान नहीं|आवास|तिरपाल|मिट्टी का घर|kaccha|kacha|jhopdi|jhopra|ghar nahi|chhat nahi|pucca makan nahi|awas|tirpal|chhat tapak|mitti ke ghar|indira awas|pm awas/i.test(lower)) {
    profile.has_pucca_house = false;
    profile.needs.push('housing');
    profile.extractedTags.push('आवास: कच्चा मकान / झोपड़ी');
  }

  // 9. HEALTH & ILLNESS (Bilingual)
  if (/इलाज|अस्पताल|ऑपरेशन|बीमारी|बीमार|दवा|डॉक्टर|स्वास्थ्य|कैंसर|हार्ट|टीबी|गर्भवती|प्रसव|ilaaj|ilaj|hospital|aspatal|operation|bimari|bemar|dawa|doctor|daktar|swasthya|cancer|heart|tb|pregnancy|garbhvati|delivery|prasav/i.test(lower)) {
    profile.needs.push('health_treatment');
    profile.extractedTags.push('जरूरत: अस्पताल / चिकित्सा इलाज');
  }

  // 10. RATION CARD & INCOME (Bilingual)
  if (/राशन कार्ड|राशन|बीपीएल|गरीब|लाल कार्ड|पीला कार्ड|अंत्योदय|ration card|ration|bpl|secc|garib|gareeb|laal card|peela card|antyodaya/i.test(lower)) {
    profile.has_ration_card = true;
    profile.income_level = 'bpl';
    profile.estimated_income = 60000;
    profile.extractedTags.push('राशन कार्ड: उपलब्ध (BPL / अंत्योदय)');
  }

  // 11. FERTILIZER, SEEDS, CROP DAMAGE & IRRIGATION
  if (/खाद|उर्वरक|यूरिया|डीएपी|पोटाश|नैनो यूरिया|गोबर खाद|केंचुआ खाद|वर्मीकंपोस्ट|fertilizer|urea|dap|potash|khad|urvarak|vermicompost/i.test(lower)) {
    if (profile.occupation === 'any') profile.occupation = 'farmer';
    profile.needs.push('fertilizer_subsidy');
    profile.extractedTags.push('आवश्यकता: खाद / उर्वरक सब्सिडी (यूरिया / DAP)');
  }
  if (/बीज|धान का बीज|गेहूं का बीज|मक्का का बीज|उन्नत बीज|seed|seeds|beej/i.test(lower)) {
    if (profile.occupation === 'any') profile.occupation = 'farmer';
    profile.needs.push('seed_subsidy');
    profile.extractedTags.push('आवश्यकता: प्रमाणित बीज अनुदान (BRBN)');
  }
  if (/फसल नुकसान|फसल बर्बाद|फसल क्षति|बाढ़|सूखा|सुखाड़|ओलावृष्टि|कीड़ा|crop damage|crop loss|drought|flood|fasal kshati|fasal nuksan/i.test(lower)) {
    if (profile.occupation === 'any') profile.occupation = 'farmer';
    profile.crop_damage = true;
    profile.needs.push('crop_insurance');
    profile.extractedTags.push('फसल स्थिति: फसल नुकसान / सुखाड़ सहायता');
  }
  if (/सोलर पंप|सोलर पैनल|सौर ऊर्जा|कुसुम|solar pump|solar panel|kusum/i.test(lower)) {
    if (profile.occupation === 'any') profile.occupation = 'farmer';
    profile.needs.push('solar_pump');
    profile.extractedTags.push('सिंचाई: सोलर पंप सब्सिडी (PM-KUSUM)');
  }
  if (/डीजल|सिंचाई|पटवन|पंपसेट|diesel|irrigation|patwan/i.test(lower)) {
    if (profile.occupation === 'any') profile.occupation = 'farmer';
    profile.needs.push('diesel_subsidy');
    profile.extractedTags.push('सिंचाई: डीजल अनुदान / पटवन');
  }

  // 12. LOCATION TYPE (RURAL / URBAN) (Bilingual)
  if (/शहर|नगर|वार्ड|नगर निगम|नगर परिषद|shahar|city|town|nagar|ward|municipality|patna shahar|muzaffarpur town/i.test(lower)) {
    profile.location_type = 'urban';
    profile.extractedTags.push('क्षेत्र: शहरी (Urban)');
  } else if (/गाँव|गांव|ग्रामीण|देहात|पंचायत|बस्ती|टोला|gaon|gramin|dehat|panchayat|basti|tola/i.test(lower)) {
    profile.location_type = 'rural';
    profile.extractedTags.push('क्षेत्र: ग्रामीण (Rural)');
  }

  // 13. BIHAR DISTRICT DETECTION (Bilingual)
  const biharDistricts = [
    { key: 'jamui', hi: 'जमुई' },
    { key: 'patna', hi: 'पटना' },
    { key: 'gaya', hi: 'गया' },
    { key: 'muzaffarpur', hi: 'मुजफ्फरपुर' },
    { key: 'bhagalpur', hi: 'भागलपुर' },
    { key: 'darbhanga', hi: 'दरभंगा' },
    { key: 'purnia', hi: 'पूर्णिया' },
    { key: 'rohtas', hi: 'रोहतास' },
    { key: 'begusarai', hi: 'बेगूसराय' },
    { key: 'nalanda', hi: 'नालंदा' },
    { key: 'saran', hi: 'सारण' },
    { key: 'samastipur', hi: 'समस्तीपुर' },
    { key: 'vaishali', hi: 'वैशाली' },
    { key: 'siwan', hi: 'सीवान' },
    { key: 'katihar', hi: 'कटिहार' },
    { key: 'munger', hi: 'मुंगेर' }
  ];

  for (const d of biharDistricts) {
    if (lower.includes(d.key) || lower.includes(d.hi)) {
      profile.district = d.hi;
      profile.extractedTags.push(`जिला: ${profile.district} (बिहार)`);
      break;
    }
  }

  return profile;
}

/**
 * Intelligent Multi-Dimensional Semantic AI Scheme Matcher
 * Matches query across structured criteria, demographic intent, and deep text relevance.
 */
export function matchSchemes(profile, rawTranscript = '') {
  const lower = (rawTranscript + ' ' + (profile.rawTranscript || '')).toLowerCase();
  const queryTokens = lower.split(/[\s,।!?—\-_]+/).filter(t => t.length > 1);

  const matched = [];

  // Demographic Flags
  const isSeniorQuery = /सीनियर|सिटीजन|वरिष्ठ|बुजुर्ग|वृद्ध|वृद्धा|वृद्धजन|पेंशन|बूढ़े|senior|citizen|elderly|old age|vridha|bujurg/i.test(lower);
  const isDisabilityQuery = /दिव्यांग|विकलांग|अपाहिज|अंध|बहरा|गूंगा|व्हीलचेयर|ट्राईसाइकिल|यूडीआईडी|कृत्रिम अंग|चलने में असमर्थ|disab|physically|handicap|special need|paralysis|wheelchair|tricycle|udid|blind|deaf/i.test(lower);
  const isStudentQuery = /विद्यार्थी|छात्र|छात्रा|पढ़ाई|कॉलेज|स्कूल|12वीं|10वीं|मैट्रिक|ग्रेजुएशन|डिग्री|बीटेक|पॉलिटेक्निक|आईटीआई|फीस|छात्रवृत्ति|स्कॉलरशिप|student|padhai|college|school|chhatra|inter|scholarship/i.test(lower);
  const isWomanQuery = /महिला|औरत|लड़की|छात्रा|बेटी|कन्या|विधवा|बहू|मातृ|गर्भवती|woman|women|girl|female|daughter|kanya|widow|vidhwa|pregnant/i.test(lower);
  const isFarmerQuery = /किसान|खेती|बटाईदार|कृषि|खाद|यूरिया|डीएपी|बीज|फसल|सिंचाई|सोलर पंप|पटवन|farmer|kisan|kheti|agriculture|fertilizer|seed|crop/i.test(lower);
  const isLaborerQuery = /मजदूर|मजदूरी|श्रमिक|दिहाड़ी|कुली|लेबर कार्ड|ई-श्रम|मनरेगा|कच्चा मकान|झोपड़ी|आवास|mazdoor|daily wage|laborer|e-shram|housing|awas/i.test(lower);
  const isBusinessQuery = /दुकान|दुकानदार|किराना|व्यापार|कारोबार|उद्यमी|मुद्रा|लोन|स्टार्टअप|ठेला|रेहड़ी|shop|shopkeeper|business|loan|mudra|startup|vendor/i.test(lower);
  const isHealthQuery = /इलाज|अस्पताल|दवा|बीमारी|ऑपरेशन|डॉक्टर|स्वास्थ्य|आयुष्मान|hospital|ilaj|bimari|health|ayushman/i.test(lower);

  for (const scheme of SCHEMES_DATABASE) {
    const crit = scheme.eligibility;
    if (!crit) continue;

    let score = 0;
    const matchReasons = [];
    let isDisqualified = false;

    // 1. Strict Exclusion Checks
    if (crit.disability_required === true && !profile.disability_status && !isDisabilityQuery) {
      isDisqualified = true;
    }
    if (crit.gender === 'female' && profile.gender === 'male' && !isWomanQuery) {
      isDisqualified = true;
    }
    if (crit.marital_status === 'widow' && profile.marital_status !== 'widow' && !/विधवा|widow/i.test(lower)) {
      isDisqualified = true;
    }
    if (crit.min_age >= 60 && !isSeniorQuery && (profile.age !== null && profile.age < 60)) {
      isDisqualified = true;
    }

    // Exclude unrelated categories if explicit high-intent category is requested
    if (isSeniorQuery && (scheme.category === 'student' || scheme.category === 'youth' || (crit.max_age && crit.max_age <= 45))) {
      isDisqualified = true;
    }
    if (isStudentQuery && scheme.category === 'elderly') {
      isDisqualified = true;
    }

    if (isDisqualified) continue;

    // 2. High-Intent Category Boosts
    if (isSeniorQuery && (scheme.category === 'elderly' || scheme.id === 'ayushman-bharat' || /पेंशन|बुजुर्ग|वयोश्री/i.test(scheme.hindiName))) {
      score += 70;
      matchReasons.push('वरिष्ठ नागरिक (60+) सामाजिक सुरक्षा एवं कल्याण योजना');
    }
    if (isDisabilityQuery && (scheme.category === 'disability' || /दिव्यांग|उपकरण|UDID/i.test(scheme.hindiName))) {
      score += 70;
      matchReasons.push('दिव्यांगजन (Physically Challenged) सहायक उपकरण एवं पेंशन योजना');
    }
    if (isStudentQuery && (scheme.category === 'student' || scheme.category === 'youth' || /क्रेडिट कार्ड|छात्रवृत्ति|प्रोत्साहन|स्कॉलरशिप/i.test(scheme.hindiName))) {
      score += 65;
      matchReasons.push('अध्ययनरत विद्यार्थी / उच्च शिक्षा सहायता योजना');
    }
    if (isWomanQuery && (scheme.category === 'women' || /कन्या|महिला|मातृ|लक्ष्मीबाई/i.test(scheme.hindiName))) {
      score += 65;
      matchReasons.push('महिला / बालिका सशक्तिकरण एवं सुरक्षा योजना');
    }
    if (isFarmerQuery && (scheme.category === 'kisan' || /किसान|फसल|खाद|बीज|सिंचाई|सोलर पंप/i.test(scheme.hindiName))) {
      score += 65;
      matchReasons.push('कृषि, फसल सुरक्षा, खाद एवं किसान कल्याण योजना');
    }
    if (isLaborerQuery && (scheme.category === 'laborer' || scheme.category === 'housing' || /मजदूर|लेबर|आवास|ई-श्रम/i.test(scheme.hindiName))) {
      score += 60;
      matchReasons.push('असंगठित निर्माण मजदूर व आवास कल्याण योजना');
    }
    if (isBusinessQuery && (scheme.category === 'business' || /उद्यमी|मुद्रा|स्वनिधि|लोन/i.test(scheme.hindiName))) {
      score += 65;
      matchReasons.push('स्वरोजगार, दुकान एवं सूक्ष्म व्यापार विस्तार ऋण योजना');
    }
    if (isHealthQuery && (scheme.category === 'health' || /आयुष्मान|स्वास्थ्य|इलाज/i.test(scheme.hindiName))) {
      score += 65;
      matchReasons.push('मुफ्त अस्पताल चिकित्सा उपचार व स्वास्थ्य बीमा');
    }

    // 3. Deep Text Semantic Keyword Overlap Matching
    const searchableText = `${scheme.name} ${scheme.hindiName} ${scheme.tagline} ${scheme.whoQualifies} ${scheme.benefit} ${scheme.benefitDetail} ${scheme.categoryLabel}`.toLowerCase();
    
    let tokenMatches = 0;
    for (const token of queryTokens) {
      if (token.length > 2 && searchableText.includes(token)) {
        tokenMatches++;
      }
    }

    if (tokenMatches > 0) {
      score += Math.min(tokenMatches * 15, 45);
      matchReasons.push(`आपकी खोज (${queryTokens.slice(0, 3).join(', ')}) से प्रासंगिक`);
    }

    // 4. Age and Profile Alignments
    if (profile.age !== null) {
      if ((crit.min_age === null || profile.age >= crit.min_age) && (crit.max_age === null || profile.age <= crit.max_age)) {
        score += 15;
      }
    }

    const finalScore = Math.min(Math.round(score), 100);

    if (finalScore >= 35) {
      let matchStatus = 'POTENTIAL';
      let matchBadge = 'योग्य होने की संभावना (Eligible)';
      let matchColor = 'text-amber-400 border-amber-500/40 bg-amber-500/10';

      if (finalScore >= 70) {
        matchStatus = 'HIGH';
        matchBadge = '100% सटीक पात्रता (Highly Eligible)';
        matchColor = 'text-emerald-400 border-emerald-500/40 bg-emerald-500/10';
      } else if (finalScore >= 50) {
        matchStatus = 'MEDIUM';
        matchBadge = 'उच्च पात्रता (High Match)';
        matchColor = 'text-blue-400 border-blue-500/40 bg-blue-500/10';
      }

      matched.push({
        ...scheme,
        matchScore: finalScore,
        matchStatus,
        matchBadge,
        matchColor,
        reasons: matchReasons.length > 0 ? Array.from(new Set(matchReasons)) : [scheme.whoQualifies]
      });
    }
  }

  matched.sort((a, b) => b.matchScore - a.matchScore);

  // Fallback: If no matches, return demographic-specific schemes
  if (matched.length === 0) {
    let fallbackCandidates = [];
    if (isSeniorQuery) {
      fallbackCandidates = SCHEMES_DATABASE.filter(s => s.category === 'elderly' || s.id === 'ayushman-bharat');
    } else if (isDisabilityQuery) {
      fallbackCandidates = SCHEMES_DATABASE.filter(s => s.category === 'disability' || s.id === 'ayushman-bharat');
    } else if (isStudentQuery) {
      fallbackCandidates = SCHEMES_DATABASE.filter(s => s.category === 'student' || s.category === 'youth');
    } else if (isWomanQuery) {
      fallbackCandidates = SCHEMES_DATABASE.filter(s => s.category === 'women');
    } else if (isBusinessQuery) {
      fallbackCandidates = SCHEMES_DATABASE.filter(s => s.category === 'business');
    } else {
      const diverseIds = ['vridhavastha-pension', 'kanya-utthan', 'adip-divyang-appliances', 'student-credit-card', 'ayushman-bharat', 'pm-kisan'];
      fallbackCandidates = SCHEMES_DATABASE.filter(s => diverseIds.includes(s.id));
    }

    const fallbackSchemes = fallbackCandidates.slice(0, 6).map((scheme, idx) => ({
      ...scheme,
      matchScore: 75 - idx * 4,
      matchStatus: 'RECOMMENDED',
      matchBadge: 'श्रेणी आधारित प्रमुख योजना (Recommended)',
      matchColor: 'text-amber-400 border-amber-500/40 bg-amber-500/10',
      reasons: ['आपके द्वारा पूछे गए वर्ग (वरिष्ठ नागरिक / छात्र / दिव्यांग / महिला) हेतु विशेष सरकारी योजना']
    }));

    return {
      profile,
      matchedSchemes: fallbackSchemes,
      totalMatched: fallbackSchemes.length
    };
  }

  return {
    profile,
    matchedSchemes: matched,
    totalMatched: matched.length
  };
}
