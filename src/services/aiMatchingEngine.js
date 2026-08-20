import { SCHEMES_DATABASE } from '../data/schemes';

/**
 * Intelligent Profile Extractor & Scheme Match Engine
 * Dual-Mode:
 * 1. Semantic Deterministic Extraction & Scoring (Offline, 100% Reliable & Fast)
 * 2. Optional Gemini LLM API Enhancement
 */

export function extractProfileFromText(text = '') {
  const lower = text.toLowerCase();
  const profile = {
    rawTranscript: text,
    age: null,
    gender: 'unspecified', // male, female, other
    occupation: null,      // farmer, student, daily-wager, business, elderly, unemployed
    hasLand: false,
    landSize: null,
    hasRationCard: false,
    isStudent: false,
    educationLevel: null,  // 10th, 12th, graduation, college
    housingType: null,     // kutcha, homeless, none
    healthNeed: false,
    businessIntent: false,
    cropDamage: false,
    location: {
      state: 'Bihar',
      district: null
    },
    extractedTags: []
  };

  // 1. Extract Age
  const ageMatch = lower.match(/(\d{1,2})\s*(?:saal|sal|varsh|years|umar|age|ki umar)/i) ||
                   lower.match(/(?:umar|age)\s*(?:hai)?\s*(\d{1,2})/i);
  if (ageMatch && ageMatch[1]) {
    profile.age = parseInt(ageMatch[1], 10);
    profile.extractedTags.push(`उम्र: ${profile.age} वर्ष`);
  } else if (/bujurg|buddhe|vridha|senior|dada|dadi|baba/i.test(lower)) {
    profile.age = 65;
    profile.extractedTags.push(`उम्र: 60+ (वरिष्ठ नागरिक)`);
  }

  // 2. Extract Gender
  if (/ladki|beti|mahila|aurat|female|girl|kanya|nari|bahu/i.test(lower)) {
    profile.gender = 'female';
    profile.extractedTags.push('महिला / छात्रा');
  } else if (/purush|male|ladka|beta|kisan bhai|aadmi/i.test(lower)) {
    profile.gender = 'male';
  }

  // 3. Extract Occupation / Persona
  if (/kisan|farmer|kheti|zameen|bigha|acre|fasal|khet|krishi|krishak/i.test(lower)) {
    profile.occupation = 'farmer';
    profile.extractedTags.push('पेशा: किसान');
  } else if (/student|padhai|college|school|chhatra|inter|12th|10th|matric|graduation|degree|btech|polytechnic/i.test(lower)) {
    profile.occupation = 'student';
    profile.isStudent = true;
    profile.extractedTags.push('पेशा: विद्यार्थी / पढ़ाई');
  } else if (/dukan|business|startup|rojgar|karobar|factory|karkhana|entrepreneur|dukaan|workshop/i.test(lower)) {
    profile.occupation = 'business';
    profile.businessIntent = true;
    profile.extractedTags.push('इरादा: नया व्यापार / उद्यम');
  } else if (/mazdoor|majdoor|daily wage|dihadi|kuli|rickshaw|thela|shramik/i.test(lower)) {
    profile.occupation = 'daily-wager';
    profile.extractedTags.push('पेशा: दिहाड़ी मजदूर / श्रमिक');
  } else if (profile.age >= 60 || /pension|bujurg|vridha/i.test(lower)) {
    profile.occupation = 'elderly';
    profile.extractedTags.push('वर्ग: वरिष्ठ नागरिक (60+)');
  }

  // 4. Land Details
  if (/zameen|land|bigha|katha|acre|dismil|khet/i.test(lower)) {
    profile.hasLand = true;
    const landMatch = lower.match(/(\d+(?:\.\d+)?)\s*(?:bigha|katha|acre|dismil|bighae)/i);
    if (landMatch) {
      profile.landSize = landMatch[0];
      profile.extractedTags.push(`जमीन: ${profile.landSize}`);
    } else {
      profile.extractedTags.push('जमीन: भूमिधारक');
    }
  }

  // 5. Crop Damage / Fasal Nuksan
  if (/sukha|baadh|barish|nuksan|barbaad|keeda|loss|bima/i.test(lower)) {
    profile.cropDamage = true;
    profile.extractedTags.push('फसल क्षति / मुआवजा');
  }

  // 6. Education
  if (/12th|inter|intermediate|barahvi|12 pass|barhvin/i.test(lower)) {
    profile.educationLevel = '12th';
    profile.extractedTags.push('शिक्षा: 12वीं (इंटर)');
  } else if (/10th|matric|dasvi/i.test(lower)) {
    profile.educationLevel = '10th';
    profile.extractedTags.push('शिक्षा: 10वीं (मैट्रिक)');
  } else if (/graduation|graduate|degree|ba|bsc|bcom|btech/i.test(lower)) {
    profile.educationLevel = 'graduation';
    profile.extractedTags.push('शिक्षा: स्नातक (Graduation)');
  }

  // 7. Housing condition
  if (/kaccha|jhopdi|ghar nahi|chhat nahi|pucca makan nahi|awas|tirpal/i.test(lower)) {
    profile.housingType = 'kutcha';
    profile.extractedTags.push('आवास: कच्चा मकान / झोपड़ी');
  }

  // 8. Health & Hospital
  if (/ilaaj|hospital|operation|bimari|dawa|doctor|swasthya/i.test(lower)) {
    profile.healthNeed = true;
    profile.extractedTags.push('जरूरत: इलाज / अस्पताल');
  }

  // 9. Ration Card / BPL
  if (/ration card|bpl|secc|garib|gareeb/i.test(lower)) {
    profile.hasRationCard = true;
    profile.extractedTags.push('राशन कार्ड: उपलब्ध (BPL)');
  }

  // 10. District Detection in Bihar
  const biharDistricts = [
    'jamui', 'patna', 'gaya', 'muzaffarpur', 'bhagalpur', 'darbhanga', 'purnia',
    'rohtas', 'begusarai', 'nalanda', 'saran', 'samastipur', 'vaishali', 'siwan',
    'katihar', 'munger', 'bhojpur', 'buxar', 'aurangabad', 'banka', 'sitamarhi',
    'motihari', 'bettiah', 'nawada', 'madhubani', 'saharsa', 'khagaria', 'gopalganj'
  ];

  for (const dist of biharDistricts) {
    if (lower.includes(dist)) {
      profile.location.district = dist.charAt(0).toUpperCase() + dist.slice(1);
      profile.extractedTags.push(`जिला: ${profile.location.district} (बिहार)`);
      break;
    }
  }

  return profile;
}

/**
 * Match schemes against extracted profile
 */
export function matchSchemes(profile, rawTranscript = '') {
  const lower = (rawTranscript + ' ' + (profile.rawTranscript || '')).toLowerCase();
  const matched = [];

  for (const scheme of SCHEMES_DATABASE) {
    let score = 0;
    const reasons = [];
    const crit = scheme.eligibilityCriteria;

    // 1. Occupation Match
    if (profile.occupation && crit.occupations) {
      if (crit.occupations.includes('all')) {
        score += 20;
      } else if (crit.occupations.includes(profile.occupation)) {
        score += 45;
        if (profile.occupation === 'farmer') reasons.push('आप किसान हैं और खेती से जुड़े हैं');
        if (profile.occupation === 'student') reasons.push('आप एक विद्यार्थी हैं');
        if (profile.occupation === 'business') reasons.push('आप नया उद्यम/व्यापार शुरू करना चाहते हैं');
        if (profile.occupation === 'daily-wager') reasons.push('आप असंगठित/श्रमिक वर्ग में आते हैं');
      }
    }

    // 2. Land Match (PM-Kisan)
    if (scheme.id === 'pm-kisan') {
      if (profile.hasLand || /kisan|farmer|kheti|zameen/i.test(lower)) {
        score += 40;
        reasons.push('आपके पास कृषि योग्य जमीन का विवरण है');
      }
    }

    // 3. Health Need / Ration Card (Ayushman Bharat)
    if (scheme.id === 'ayushman-bharat') {
      if (profile.healthNeed || profile.hasRationCard || /hospital|ilaaj|bimari|ration card|garib/i.test(lower)) {
        score += 45;
        reasons.push('आपके पास राशन कार्ड या इलाज की आवश्यकता है');
      }
      if (profile.occupation === 'daily-wager' || /majdoor|mazdoor/i.test(lower)) {
        score += 25;
      }
    }

    // 4. Girl Education (Kanya Utthan)
    if (scheme.id === 'kanya-utthan') {
      if (profile.gender === 'female' && (profile.isStudent || profile.educationLevel || /12th|inter|beti|ladki|graduation/i.test(lower))) {
        score += 55;
        reasons.push('आप बिहार की छात्रा हैं (इंटर / स्नातक स्तर)');
      } else if (/beti|ladki|kanya|girl/i.test(lower)) {
        score += 35;
        reasons.push('बालिका शिक्षा प्रोत्साहन योजना के तहत पात्र');
      }
    }

    // 5. Business / Udyami Yojana
    if (scheme.id === 'udyami-yojana') {
      if (profile.businessIntent || /business|dukan|startup|rojgar|karobar/i.test(lower)) {
        score += 50;
        reasons.push('आप बिहार में नया उद्योग या दुकान स्थापित करना चाहते हैं');
      }
      if (profile.age && profile.age >= 18 && profile.age <= 50) {
        score += 20;
        reasons.push(`आपकी उम्र ${profile.age} वर्ष (18-50 वर्ष के पात्रता दायरे में) है`);
      }
    }

    // 6. Housing (PM Awas)
    if (scheme.id === 'pm-awas-gramin') {
      if (profile.housingType === 'kutcha' || /kaccha|ghar|makan|chhat|jhopdi/i.test(lower)) {
        score += 55;
        reasons.push('आपके पास पक्का मकान नहीं है (कच्ची छत/झोपड़ी)');
      }
      if (profile.hasRationCard || profile.occupation === 'daily-wager') {
        score += 20;
        reasons.push('बीपीएल/श्रमिक परिवार की प्राथमिकता सूची में शामिल');
      }
    }

    // 7. NSP Scholarship
    if (scheme.id === 'nsp-scholarship') {
      if (profile.isStudent || /student|padhai|scholarship|chhatravritti|college|school/i.test(lower)) {
        score += 45;
        reasons.push('आप वर्तमान में अध्ययनरत छात्र हैं');
      }
    }

    // 8. Fasal Bima / Fasal Sahayata
    if (scheme.id === 'pm-fasal-bima') {
      if ((profile.occupation === 'farmer' || profile.hasLand) && (profile.cropDamage || /nuksan|barish|sukha|baadh|fasal/i.test(lower))) {
        score += 55;
        reasons.push('आपकी फसल प्राकृतिक आपदा / वर्षा से प्रभावित है');
      }
    }

    // 9. Vridhavastha Pension
    if (scheme.id === 'vridhavastha-pension') {
      if ((profile.age && profile.age >= 60) || /pension|bujurg|vridha|60 saal|64 saal|dada/i.test(lower)) {
        score += 65;
        reasons.push('आपकी उम्र 60 वर्ष या अधिक है');
      }
    }

    // 10. Student Credit Card
    if (scheme.id === 'student-credit-card') {
      if (profile.educationLevel === '12th' || /higher education|btech|college|loan|fees/i.test(lower)) {
        score += 45;
        reasons.push('12वीं के बाद उच्च शिक्षा / बीटेक / कॉलेज हेतु ₹4 लाख तक लोन');
      }
    }

    // 11. Kushal Yuva Program (KYP)
    if (scheme.id === 'kushal-yuva-program') {
      if (/computer|kyp|skill|training|english|seekhna/i.test(lower) || (profile.age && profile.age >= 15 && profile.age <= 28 && profile.isStudent)) {
        score += 40;
        reasons.push('15 से 28 वर्ष के युवाओं के लिए मुफ्त कंप्यूटर व संवाद कौशल प्रशिक्षण');
      }
    }

    // Keyword relevance matching
    if (crit.keywords) {
      let keywordHits = 0;
      for (const kw of crit.keywords) {
        if (lower.includes(kw)) {
          keywordHits++;
        }
      }
      score += Math.min(keywordHits * 8, 25);
    }

    // Cap score at 100
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
        reasons: reasons.length > 0 ? reasons : [scheme.whyEligibleTemplate]
      });
    }
  }

  // Sort matched schemes by score descending
  matched.sort((a, b) => b.matchScore - a.matchScore);

  return {
    profile,
    matchedSchemes: matched,
    totalMatched: matched.length
  };
}

/**
 * Optional Gemini LLM API Call (if API key provided)
 */
export async function matchWithGeminiAPI(apiKey, transcript, profile) {
  if (!apiKey) {
    return matchSchemes(profile, transcript);
  }

  try {
    const prompt = `You are the AI engine for Yojana Sathi (योजना साथी), a government welfare scheme recommendation assistant for citizens in Bihar and India.
Citizen's spoken transcript: "${transcript}"

Schemes Available:
${JSON.stringify(SCHEMES_DATABASE.map(s => ({ id: s.id, name: s.name, hindiName: s.hindiName, benefit: s.benefit, whoQualifies: s.whoQualifies })))}

Task:
Analyze the citizen transcript and return a JSON object with:
1. "extractedProfile": { age, gender, occupation, location, keyNeeds }
2. "matchedSchemeIds": array of { id, matchScore (0-100), personalizedReasonHindi }

Respond with ONLY valid JSON:`;

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { responseMimeType: "application/json" }
      })
    });

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.statusText}`);
    }

    const data = await response.json();
    const resultText = data.candidates?.[0]?.content?.parts?.[0]?.text;
    const parsed = JSON.parse(resultText);

    // Merge with DB
    const baseResult = matchSchemes(profile, transcript);
    if (parsed.matchedSchemeIds && Array.isArray(parsed.matchedSchemeIds)) {
      for (const item of parsed.matchedSchemeIds) {
        const found = baseResult.matchedSchemes.find(s => s.id === item.id);
        if (found) {
          found.matchScore = Math.max(found.matchScore, item.matchScore || 80);
          if (item.personalizedReasonHindi) {
            found.reasons = [item.personalizedReasonHindi];
          }
        }
      }
    }

    return baseResult;
  } catch (err) {
    console.warn('Gemini API call failed, using deterministic engine fallback:', err);
    return matchSchemes(profile, transcript);
  }
}
