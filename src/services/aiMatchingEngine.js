import { SCHEMES_DATABASE } from '../data/schemes.js';

/**
 * Advanced Bilingual (Hindi Devanagari + Hinglish) Profile Extractor & Deterministic Eligibility Engine
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
    needs: [],             // ['scholarship', 'pension', 'health_treatment', 'housing', 'business_loan', 'tools', 'food_ration']
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
  } else if (/बुजुर्ग|बूढ़े|बुड्ढा|बुढ़िया|वृद्ध|वरिष्ठ नागरिक|दादा|दादी|बाबा|ससुर|bujurg|buddhe|buddha|budhiya|vridha|senior citizen|dada|dadi|baba|sasur|60 ke|budhapa/i.test(lower)) {
    profile.age = 65;
    profile.extractedTags.push('उम्र: 60+ (वरिष्ठ नागरिक)');
  } else if (/बच्चा|बच्ची|शिशु|नवजात|छोटा लड़का|छोटी लड़की|bacha|bachi|chhota ladka|chhoti ladki|infant|shishu|newborn/i.test(lower)) {
    profile.age = 5;
    profile.extractedTags.push('आयु: 10 वर्ष से कम');
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

  // 3. DISABILITY (DIVYANGJAN) EXTRACTION (Bilingual)
  if (/दिव्यांग|विकलांग|अपाहिज|अंधे|बहरा|गूंगा|व्हीलचेयर|ट्राईसाइकिल|यूडीआईडी|कृत्रिम अंग|divyang|viklang|handicapped|disability|chalne me dikkat|andhe|blind|behra|deaf|mute|udid|artificial limb|tricycle|wheelchair|cerebral palsy|autism/i.test(lower)) {
    profile.disability_status = true;
    profile.needs.push('disability_support');
    profile.extractedTags.push('विशेष श्रेणी: दिव्यांगजन (Divyangjan)');
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
  if (/कारीगर|शिल्पकार|बढ़ई|लोहार|मिस्त्री|राजमिस्त्री|दर्जी|नाई|धोबी|कुम्हार|मोची|औजार|टूलकिट|विश्वकर्मा|artisan|karigar|badhai|carpenter|lohar|blacksmith|mistri|rajmistri|mason|darji|tailor|nai|barber|dhobi|kumhar|potter|mochi|cobbler|shilpkar|tool|vashikarma/i.test(lower)) {
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
  } else if (profile.age >= 60 || /पेंशन|बुजुर्ग|pension|bujurg/i.test(lower)) {
    profile.occupation = 'elderly';
    profile.needs.push('pension');
    profile.extractedTags.push('वर्ग: वरिष्ठ नागरिक (60+)');
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

  // 11. LOCATION TYPE (RURAL / URBAN) (Bilingual)
  if (/शहर|नगर|वार्ड|नगर निगम|नगर परिषद|shahar|city|town|nagar|ward|municipality|patna shahar|muzaffarpur town/i.test(lower)) {
    profile.location_type = 'urban';
    profile.extractedTags.push('क्षेत्र: शहरी (Urban)');
  } else if (/गाँव|गांव|ग्रामीण|देहात|पंचायत|बस्ती|टोला|gaon|gramin|dehat|panchayat|basti|tola/i.test(lower)) {
    profile.location_type = 'rural';
    profile.extractedTags.push('क्षेत्र: ग्रामीण (Rural)');
  }

  // 12. BIHAR DISTRICT DETECTION (Bilingual)
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

  // 13. GENERATE SMART VOICE FOLLOW-UPS (If profile is under-specified)
  if (!profile.age && !profile.extractedTags.some(t => t.includes('उम्र'))) {
    profile.suggestedFollowUps.push({
      field: 'age',
      questionHindi: 'आपकी उम्र लगभग कितनी है? (उदा: 19 वर्ष, 45 वर्ष, 65 वर्ष)'
    });
  }
  if (profile.occupation === 'any' && !profile.extractedTags.some(t => t.includes('पेशा'))) {
    profile.suggestedFollowUps.push({
      field: 'occupation',
      questionHindi: 'आप मुख्य रूप से क्या काम करते हैं? (उदा: विद्यार्थी, किसान, मजदूर, दुकानदार या बेरोजगार)'
    });
  }
  if (profile.location_type === 'any') {
    profile.suggestedFollowUps.push({
      field: 'location',
      questionHindi: 'आप गाँव में रहते हैं या शहर में?'
    });
  }

  profile.suggestedFollowUps = profile.suggestedFollowUps.slice(0, 2);

  return profile;
}

/**
 * Deterministic Rule-Based Scheme Matcher
 * Evaluates each scheme against exact structured eligibility fields.
 */
export function matchSchemes(profile, rawTranscript = '') {
  const lower = (rawTranscript + ' ' + (profile.rawTranscript || '')).toLowerCase();
  const matched = [];

  for (const scheme of SCHEMES_DATABASE) {
    const crit = scheme.eligibility;
    if (!crit) continue;

    let isDisqualified = false;
    let score = 0;
    const matchReasons = [];

    // ==========================================
    // 1. DISABILITY CRITERION CHECK (Strict)
    // ==========================================
    if (crit.disability_required === true) {
      if (profile.disability_status === true || /दिव्यांग|विकलांग|अपाहिज|divyang|viklang|handicapped/i.test(lower)) {
        score += 55;
        matchReasons.push('दिव्यांगता श्रेणी (Disability Welfare) के अंतर्गत विशेष पात्र');
      } else {
        isDisqualified = true;
      }
    }

    if (isDisqualified) continue;

    // ==========================================
    // 2. GENDER CRITERION CHECK (Strict)
    // ==========================================
    if (crit.gender && crit.gender !== 'any') {
      if (profile.gender === crit.gender) {
        score += 35;
        matchReasons.push(`महिला/बालिका विशेष योजना (Female Specific) के तहत पात्र`);
      } else if (profile.gender === 'male' && crit.gender === 'female') {
        isDisqualified = true;
      } else if (profile.gender === 'unspecified') {
        if (/लड़की|महिला|औरत|छात्रा|बेटी|कन्या|ladki|beti|mahila|kanya/i.test(lower)) {
          score += 25;
          matchReasons.push('महिला कल्याण योजना हेतु पात्र');
        } else {
          if (scheme.id === 'kanya-utthan' || scheme.id === 'widow-pension-bihar' || scheme.id === 'pmmvy-matru-vandana' || scheme.id === 'janani-suraksha' || scheme.id === 'pm-ujjwala-yojana' || scheme.id === 'lakhpati-didi-jeevika' || scheme.id === 'begum-hazrat-mahal') {
            isDisqualified = true;
          }
        }
      }
    }

    if (isDisqualified) continue;

    // ==========================================
    // 3. MARITAL STATUS CHECK (Strict for Widow/Married)
    // ==========================================
    if (crit.marital_status && crit.marital_status !== 'any') {
      if (crit.marital_status === 'widow') {
        if (profile.marital_status === 'widow' || /विधवा|पति नहीं|vidhwa|widow/i.test(lower)) {
          score += 50;
          matchReasons.push('विधवा सामाजिक सुरक्षा पेंशन हेतु पूर्ण पात्र');
        } else {
          isDisqualified = true;
        }
      } else if (crit.marital_status === 'unmarried') {
        if (profile.marital_status === 'married') {
          isDisqualified = true;
        } else {
          score += 15;
        }
      }
    }

    if (isDisqualified) continue;

    // ==========================================
    // 4. AGE RANGE CHECK (Strict bounds)
    // ==========================================
    if (profile.age !== null) {
      if (crit.min_age !== null && profile.age < crit.min_age) {
        isDisqualified = true;
      } else if (crit.max_age !== null && profile.age > crit.max_age) {
        isDisqualified = true;
      } else {
        if (crit.min_age >= 60) {
          score += 45;
          matchReasons.push(`उम्र ${profile.age} वर्ष (वरिष्ठ नागरिक 60+ पात्रता पूरी)`);
        } else if (crit.min_age >= 18 && crit.max_age <= 50) {
          score += 20;
          matchReasons.push(`उम्र ${profile.age} वर्ष (18-50 वर्ष युवा पात्रता के अंतर्गत)`);
        } else if (crit.max_age <= 10) {
          score += 35;
          matchReasons.push(`बालिका की आयु 10 वर्ष से कम`);
        } else {
          score += 10;
        }
      }
    } else {
      if (crit.min_age >= 60 && !/पेंशन|बुजुर्ग|वृद्ध|बूढ़े|pension|bujurg|vridha|buddha|senior/i.test(lower)) {
        isDisqualified = true;
      }
      if (crit.max_age <= 10 && !/सुकन्या|बेटी|शिशु|बच्ची|sukanya|beti|shishu|bachi|newborn/i.test(lower)) {
        isDisqualified = true;
      }
    }

    if (isDisqualified) continue;

    // ==========================================
    // 5. OCCUPATION CRITERIA CHECK
    // ==========================================
    if (crit.occupations && !crit.occupations.includes('any')) {
      const occMatch = crit.occupations.some(o => o === profile.occupation || lower.includes(o));
      if (occMatch) {
        score += 45;
        if (profile.occupation === 'farmer') matchReasons.push('पेशा: कृषि एवं भूमिधारक किसान');
        if (profile.occupation === 'student') matchReasons.push('पेशा: अध्ययनरत विद्यार्थी / उच्च शिक्षा');
        if (profile.occupation === 'artisan') matchReasons.push('पेशा: पारंपरिक कारीगर (PM विश्वकर्मा 18 ट्रेड्स)');
        if (profile.occupation === 'shopkeeper') matchReasons.push('पेशा: दुकानदार / स्ट्रीट वेंडर / सूक्ष्म उद्यम');
        if (profile.occupation === 'laborer') matchReasons.push('पेशा: असंगठित निर्माण मजदूर / श्रमिक');
        if (profile.occupation === 'unemployed') matchReasons.push('पेशा: स्वरोजगार / नया उद्योग इच्छुक');
      } else {
        if (scheme.id === 'pm-kisan' && (profile.occupation === 'student' || profile.occupation === 'shopkeeper' || profile.occupation === 'artisan' || profile.occupation === 'unemployed' || profile.occupation === 'elderly')) {
          isDisqualified = true;
        }
        if ((scheme.id === 'student-credit-card' || scheme.id === 'nsp-scholarship') && (profile.occupation === 'elderly' || profile.occupation === 'farmer' || (profile.age && profile.age > 35))) {
          isDisqualified = true;
        }
        if (scheme.id === 'pm-vishwakarma' && (profile.occupation === 'farmer' || profile.occupation === 'student')) {
          isDisqualified = true;
        }
      }
    } else {
      score += 15;
    }

    if (isDisqualified) continue;

    // ==========================================
    // 6. LAND REQUIREMENT CHECK
    // ==========================================
    if (crit.land_required === true) {
      if (profile.has_land === true || /जमीन|भूमि|बीघा|खेत|zameen|jameen|land|bigha|katha/i.test(lower)) {
        score += 25;
        matchReasons.push('कृषि योग्य भूमि का स्वामित्व उपलब्ध');
      } else {
        isDisqualified = true;
      }
    }

    if (isDisqualified) continue;

    // ==========================================
    // 7. LOCATION TYPE CHECK (Rural / Urban)
    // ==========================================
    if (crit.location && !crit.location.includes('any')) {
      if (profile.location_type !== 'any') {
        if (crit.location.includes(profile.location_type)) {
          score += 15;
          matchReasons.push(profile.location_type === 'rural' ? 'ग्रामीण क्षेत्र निवास पात्रता' : 'शहरी क्षेत्र निवास पात्रता');
        } else {
          isDisqualified = true;
        }
      }
    }

    if (isDisqualified) continue;

    // ==========================================
    // 8. SOCIAL CATEGORY CHECK (SC/ST/OBC/Minority)
    // ==========================================
    if (crit.social_category && !crit.social_category.includes('any')) {
      if (crit.social_category.length === 1 && crit.social_category[0] === 'minority') {
        if (profile.social_category === 'minority' || /मुस्लिम|ईसाई|सिख|बौद्ध|जैन|अल्पसंख्यक|minority|muslim/i.test(lower)) {
          score += 30;
          matchReasons.push('अल्पसंख्यक समुदाय कल्याण योजना');
        } else {
          isDisqualified = true;
        }
      } else if (profile.social_category !== 'any') {
        if (crit.social_category.includes(profile.social_category)) {
          score += 25;
          matchReasons.push(`सामाजिक वर्ग: ${profile.social_category.toUpperCase()} श्रेणी प्राथमिकता`);
        }
      }
    }

    if (isDisqualified) continue;

    // ==========================================
    // 9. EDUCATION LEVEL ALIGNMENT
    // ==========================================
    if (crit.education_level && crit.education_level !== 'any') {
      if (crit.education_level === '12th_or_graduate' && (profile.education_level === '12th_pass' || profile.education_level === 'graduate' || /12वीं|इंटर|स्नातक|12th|inter|graduation/i.test(lower))) {
        score += 35;
        matchReasons.push('शैक्षणिक योग्यता: 12वीं / स्नातक उत्तीर्ण');
      } else if (crit.education_level === '12th_pass' && (profile.education_level === '12th_pass' || /12वीं|इंटर|12th|inter/i.test(lower))) {
        score += 35;
        matchReasons.push('शैक्षणिक योग्यता: 12वीं पास उच्च शिक्षा इच्छुक');
      } else if (crit.education_level === '10th_pass_or_higher' && (profile.education_level || /10वीं|12वीं|10th|12th/i.test(lower))) {
        score += 25;
        matchReasons.push('मैट्रिक / इंटरमीडिएट उत्तीर्ण');
      }
    }

    // ==========================================
    // 10. SPECIFIC NEED & KEYWORD BOOSTS
    // ==========================================
    if (scheme.id === 'ayushman-bharat' && (profile.needs.includes('health_treatment') || profile.has_ration_card || /इलाज|अस्पताल|दवा|hospital|ilaj/i.test(lower))) {
      score += 45;
      matchReasons.push('मुफ्त एवं कैशलेस अस्पताल चिकित्सा उपचार की आवश्यकता');
    }
    if (scheme.id === 'pm-awas-gramin' && (profile.has_pucca_house === false || profile.needs.includes('housing') || /कच्चा|मकान|घर|awas/i.test(lower))) {
      score += 45;
      matchReasons.push('पक्का मकान नहीं है (ग्रामीण आवास योजना हेतु प्राथमिकता)');
    }
    if (scheme.id === 'pm-mudra-yojana' && (profile.occupation === 'shopkeeper' || profile.needs.includes('business_loan') || /दुकान|मुद्रा लोन|लोन|shop|loan/i.test(lower))) {
      score += 45;
      matchReasons.push('दुकान / सूक्ष्म व्यवसाय विस्तार हेतु बिना गारंटी ऋण');
    }
    if (scheme.id === 'pm-svanidhi-street-vendor' && /ठेला|रेहड़ी|पटरी|गुमटी|thela|vendor|footpath|rehdi|gumti/i.test(lower)) {
      score += 50;
      matchReasons.push('स्ट्रीट वेंडर / ठेला विक्रेता कार्यशील पूंजी ऋण');
    }
    if (scheme.id === 'eshram-bocw-welfare' && (profile.occupation === 'laborer' || /मजदूर|श्रमिक|लेबर कार्ड|mazdoor|labor/i.test(lower))) {
      score += 50;
      matchReasons.push('भवन एवं अन्य सन्निर्माण मजदूर कल्याण बोर्ड सहायता');
    }
    if (scheme.id === 'pm-garib-kalyan-anna' && (profile.has_ration_card || profile.income_level === 'bpl' || /राशन|अनाज|ration/i.test(lower))) {
      score += 45;
      matchReasons.push('राशन कार्ड धारक मुफ्त 5kg/सदस्य मासिक खाद्यान्न');
    }
    if (scheme.id === 'kushal-yuva-program' && (profile.occupation === 'unemployed' || profile.occupation === 'student' || /कंप्यूटर|काम सीखने|ट्रेनिंग|kyp/i.test(lower))) {
      score += 45;
      matchReasons.push('निःशुल्क कंप्यूटर व संवाद कौशल प्रशिक्षण');
    }
    if (scheme.id === 'udyami-yojana' && (profile.occupation === 'unemployed' || profile.occupation === 'shopkeeper' || /रोजगार|उद्यमी|उद्योग|कारोबार/i.test(lower))) {
      score += 40;
      matchReasons.push('₹10 लाख मुख्यमंत्री उद्यमी स्वरोजगार वित्तीय सहायता');
    }
    if (scheme.id === 'pm-kaushal-vikas' && (profile.occupation === 'unemployed' || /काम सीखने|ट्रेनिंग|स्किल/i.test(lower))) {
      score += 40;
      matchReasons.push('प्रधानमंत्री कौशल विकास योजना मुफ्त ट्रेनिंग व सर्टिफिकेट');
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
        reasons: matchReasons.length > 0 ? matchReasons : [scheme.whoQualifies]
      });
    }
  }

  matched.sort((a, b) => b.matchScore - a.matchScore);

  return {
    profile,
    matchedSchemes: matched,
    totalMatched: matched.length
  };
}
