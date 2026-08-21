import express from 'express';
import schemesData from '../data/schemes.json' assert { type: 'json' };

const router = express.Router();

// Helper to extract complete multi-field citizen profile from text (Bilingual)
function extractProfile(text = '') {
  const lower = text.toLowerCase().trim();
  const profile = {
    age: null,
    gender: 'unspecified',
    location_type: 'any',
    district: null,
    occupation: 'any',
    income_level: null,
    estimated_income: null,
    social_category: 'any',
    disability_status: false,
    marital_status: 'any',
    education_level: null,
    has_land: false,
    has_ration_card: false,
    has_pucca_house: null,
    needs: [],
    tags: [],
    suggestedFollowUps: []
  };

  if (!lower) return profile;

  // Age extraction
  const ageMatch = lower.match(/(\d{1,2})\s*(?:साल|वर्ष|उम्र|बरस|saal|sal|varsh|years|umar|age)/i);
  if (ageMatch && ageMatch[1]) {
    profile.age = parseInt(ageMatch[1], 10);
    profile.tags.push(`उम्र: ${profile.age} वर्ष`);
  } else if (/बुजुर्ग|बूढ़े|वृद्ध|वरिष्ठ|bujurg|buddhe|vridha|senior/i.test(lower)) {
    profile.age = 65;
    profile.tags.push('उम्र: 60+ (वरिष्ठ नागरिक)');
  }

  // Gender & Marital Status
  if (/विधवा|पति नहीं|widow|vidhwa|patidev guzar gaye/i.test(lower)) {
    profile.gender = 'female';
    profile.marital_status = 'widow';
    profile.tags.push('स्थिति: विधवा महिला (Widow)');
  } else if (/लड़की|महिला|औरत|छात्रा|बेटी|कन्या|ladki|beti|mahila|aurat|female/i.test(lower)) {
    profile.gender = 'female';
    profile.tags.push('लिंग: महिला / छात्रा');
    if (/अविवाहित|कुंवारी|unmarried|avivahit/i.test(lower)) profile.marital_status = 'unmarried';
  } else if (/पुरुष|लड़का|बेटा|आदमी|purush|male|ladka/i.test(lower)) {
    profile.gender = 'male';
    profile.tags.push('लिंग: पुरुष');
  }

  // Disability / Divyangjan / Special Needs
  if (/दिव्यांग|विकलांग|अपाहिज|अंध|बहरा|गूंगा|व्हीलचेयर|ट्राईसाइकिल|यूडीआईडी|कृत्रिम अंग|चलने में असमर्थ|disab|physically|handicap|special need|paralysis|wheelchair|tricycle|udid|blind|deaf/i.test(lower)) {
    profile.disability_status = true;
    profile.needs.push('disability_support');
    profile.tags.push('विशेष श्रेणी: दिव्यांगजन (Physically Challenged / Divyang)');
  }

  // Social Category
  if (/मुस्लिम|ईसाई|सिख|बौद्ध|जैन|अल्पसंख्यक|minority|muslim/i.test(lower)) {
    profile.social_category = 'minority';
    profile.tags.push('वर्ग: अल्पसंख्यक (Minority)');
  } else if (/अनुसूचित जाति|दलित|महादलित|sc|dalit/i.test(lower)) {
    profile.social_category = 'sc';
    profile.tags.push('वर्ग: अनुसूचित जाति (SC)');
  } else if (/अनुसूचित जनजाति|आदिवासी|st|tribal/i.test(lower)) {
    profile.social_category = 'st';
    profile.tags.push('वर्ग: अनुसूचित जनजाति (ST)');
  } else if (/पिछड़ा|ओबीसी|ईबीसी|obc|ebc/i.test(lower)) {
    profile.social_category = 'obc';
    profile.tags.push('वर्ग: पिछड़ा वर्ग (OBC/EBC)');
  }

  // Occupation
  if (/कारीगर|शिल्पकार|बढ़ई|लोहार|दर्जी|कुम्हार|मोची|artisan|karigar|carpenter|blacksmith|mason|tailor/i.test(lower)) {
    profile.occupation = 'artisan';
    profile.tags.push('पेशा: पारंपरिक कारीगर / शिल्पकार');
  } else if (/दुकान|दुकानदार|किराना|व्यापार|कारोबार|ठेला|गुमटी|shop|shopkeeper|kirana|business|vendor/i.test(lower)) {
    profile.occupation = 'shopkeeper';
    profile.tags.push('पेशा: दुकानदार / सूक्ष्म कारोबारी');
  } else if (/विद्यार्थी|छात्र|छात्रा|पढ़ाई|कॉलेज|स्कूल|12वीं|10वीं|ग्रेजुएशन|student|padhai|college|scholarship/i.test(lower)) {
    profile.occupation = 'student';
    profile.tags.push('पेशा: विद्यार्थी / पढ़ाई');
  } else if (/मजदूर|मजदूरी|श्रमिक|दिहाड़ी|कुली|मनरेगा|लेबर|mazdoor|daily wage|laborer|e-shram|mgnrega/i.test(lower)) {
    profile.occupation = 'laborer';
    profile.tags.push('पेशा: असंगठित दिहाड़ी मजदूर');
  } else if (/किसान|खेती|बटाईदार|कृषि|farmer|kisan|kheti/i.test(lower)) {
    profile.occupation = 'farmer';
    profile.tags.push('पेशा: किसान / खेती');
  } else if (/बेरोजगार|रोजगार|काम सीखने|berojgar|unemployed|job seeker/i.test(lower)) {
    profile.occupation = 'unemployed';
    profile.tags.push('पेशा: बेरोजगार युवा');
  } else if (/सीनियर|सिटीजन|वरिष्ठ|बुजुर्ग|वृद्ध|वृद्धा|वृद्धजन|पेंशन|बूढ़े|senior|citizen|elderly|old age|vridha|bujurg/i.test(lower)) {
    profile.occupation = 'elderly';
    if (!profile.age) profile.age = 65;
    profile.tags.push('वर्ग: वरिष्ठ नागरिक (Senior Citizen / 60+)');
  }

  // Education
  if (/स्नातक|ग्रेजुएशन|डिग्री|graduate|degree/i.test(lower)) {
    profile.education_level = 'graduate';
    profile.tags.push('शिक्षा: स्नातक (Graduation)');
  } else if (/12वीं|इंटर|12th|inter/i.test(lower)) {
    profile.education_level = '12th_pass';
    profile.tags.push('शिक्षा: 12वीं पास (Intermediate)');
  } else if (/10वीं|मैट्रिक|10th|matric/i.test(lower)) {
    profile.education_level = '10th_pass';
    profile.tags.push('शिक्षा: 10वीं पास (Matric)');
  }

  // Land
  if (/जमीन|भूमि|बीघा|खेत|zameen|jameen|land|bigha/i.test(lower)) {
    profile.has_land = true;
    profile.tags.push('जमीन: कृषि भूमि उपलब्ध');
  }

  // Housing
  if (/कच्चा|झोपड़ी|घर नहीं|pucca makan nahi|kaccha/i.test(lower)) {
    profile.has_pucca_house = false;
    profile.tags.push('आवास: कच्चा मकान');
  }

  // Health
  if (/इलाज|अस्पताल|दवा|बीमारी|hospital|ilaj|bimari/i.test(lower)) {
    profile.needs.push('health_treatment');
    profile.tags.push('जरूरत: अस्पताल / इलाज');
  }

  // Ration
  if (/राशन|बीपीएल|गरीब|ration|bpl|garib/i.test(lower)) {
    profile.has_ration_card = true;
    profile.tags.push('राशन कार्ड: उपलब्ध (BPL)');
  }

  // Location
  if (/शहर|नगर|shahar|city|urban/i.test(lower)) {
    profile.location_type = 'urban';
    profile.tags.push('क्षेत्र: शहरी (Urban)');
  } else if (/गाँव|गांव|ग्रामीण|देहात|gaon|gramin|rural/i.test(lower)) {
    profile.location_type = 'rural';
    profile.tags.push('क्षेत्र: ग्रामीण (Rural)');
  }

  return profile;
}

// POST /api/ai/match
router.post('/match', (req, res) => {
  try {
    const { transcript } = req.body;
    if (!transcript) {
      return res.status(400).json({ success: false, message: 'Voice transcript is required' });
    }

    const profile = extractProfile(transcript);
    const lower = transcript.toLowerCase();
    const matches = [];

    for (const scheme of schemesData) {
      const crit = scheme.eligibility;
      if (!crit) continue;

      let isDisqualified = false;
      let score = 0;
      const reasons = [];

      // 1. Disability check
      if (crit.disability_required === true) {
        if (profile.disability_status === true || /दिव्यांग|विकलांग|divyang|viklang/i.test(lower)) {
          score += 55;
          reasons.push('दिव्यांगता श्रेणी (Disability Support) के तहत पात्र');
        } else {
          isDisqualified = true;
        }
      }
      if (isDisqualified) continue;

      // 2. Gender check
      if (crit.gender && crit.gender !== 'any') {
        if (profile.gender === crit.gender) {
          score += 35;
          reasons.push('महिला/बालिका विशेष योजना');
        } else if (profile.gender === 'male' && crit.gender === 'female') {
          isDisqualified = true;
        } else if (profile.gender === 'unspecified') {
          if (!/लड़की|महिला|औरत|छात्रा|बेटी|कन्या|ladki|mahila/i.test(lower)) {
            if (scheme.id === 'kanya-utthan' || scheme.id === 'widow-pension-bihar' || scheme.id === 'pmmvy-matru-vandana' || scheme.id === 'begum-hazrat-mahal') {
              isDisqualified = true;
            }
          }
        }
      }
      if (isDisqualified) continue;

      // 3. Marital status check
      if (crit.marital_status && crit.marital_status !== 'any') {
        if (crit.marital_status === 'widow') {
          if (profile.marital_status === 'widow' || /विधवा|vidhwa|widow/i.test(lower)) {
            score += 50;
            reasons.push('विधवा सामाजिक सुरक्षा पेंशन हेतु पूर्ण पात्र');
          } else {
            isDisqualified = true;
          }
        }
      }
      if (isDisqualified) continue;

      // 4. Age check
      if (profile.age !== null) {
        if (crit.min_age !== null && profile.age < crit.min_age) isDisqualified = true;
        if (crit.max_age !== null && profile.age > crit.max_age) isDisqualified = true;
        if (!isDisqualified) {
          if (crit.min_age >= 60) score += 45;
          else score += 15;
        }
      } else {
        if (crit.min_age >= 60 && !/पेंशन|बुजुर्ग|वृद्ध|pension|bujurg|vridha/i.test(lower)) isDisqualified = true;
      }
      if (isDisqualified) continue;

      // 5. Occupation check
      if (crit.occupations && !crit.occupations.includes('any')) {
        const matchesOcc = crit.occupations.some(o => o === profile.occupation || lower.includes(o));
        if (matchesOcc) {
          score += 45;
          reasons.push(`पेशा आधारित पात्रता (${profile.occupation})`);
        } else {
          if (scheme.id === 'pm-kisan' && (profile.occupation === 'student' || profile.occupation === 'shopkeeper' || profile.occupation === 'artisan' || profile.occupation === 'unemployed')) isDisqualified = true;
          if (scheme.id === 'student-credit-card' && (profile.occupation === 'elderly' || profile.occupation === 'farmer')) isDisqualified = true;
        }
      } else {
        score += 15;
      }
      if (isDisqualified) continue;

      // 6. Social Category Check
      if (crit.social_category && !crit.social_category.includes('any')) {
        if (crit.social_category.length === 1 && crit.social_category[0] === 'minority') {
          if (profile.social_category !== 'minority' && !/अल्पसंख्यक|minority|muslim/i.test(lower)) {
            isDisqualified = true;
          }
        }
      }
      if (isDisqualified) continue;

      // 7. Land check
      if (crit.land_required === true && !profile.has_land && !/जमीन|भूमि|land|bigha/i.test(lower)) {
        isDisqualified = true;
      }
      if (isDisqualified) continue;

      // 8. Need specific boosts
      if (scheme.id === 'ayushman-bharat' && (profile.needs.includes('health_treatment') || profile.has_ration_card || /इलाज|hospital/i.test(lower))) score += 40;
      if (scheme.id === 'pm-awas-gramin' && (profile.has_pucca_house === false || /कच्चा|आवास/i.test(lower))) score += 40;
      if (scheme.id === 'pm-mudra-yojana' && (profile.occupation === 'shopkeeper' || /दुकान|लोन/i.test(lower))) score += 40;
      if (scheme.id === 'kanya-utthan' && profile.gender === 'female' && (profile.education_level === '12th_pass' || profile.education_level === 'graduate')) score += 45;
      if (scheme.id === 'eshram-bocw-welfare' && profile.occupation === 'laborer') score += 45;

      const finalScore = Math.min(Math.round(score), 100);
      if (finalScore >= 35) {
        matches.push({
          ...scheme,
          matchScore: finalScore,
          reasons: reasons.length > 0 ? reasons : [scheme.whoQualifies]
        });
      }
    }

    matches.sort((a, b) => b.matchScore - a.matchScore);

    res.json({
      success: true,
      data: {
        transcript,
        profile,
        matchedSchemes: matches,
        totalCount: matches.length
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/ai/copilot-chat — Real-time AI Copilot Q&A
router.post('/copilot-chat', async (req, res) => {
  try {
    const { question, language = 'hi' } = req.body;
    if (!question) {
      return res.status(400).json({ success: false, message: 'Question is required' });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    const lower = question.toLowerCase();

    // Contextual responses if offline or without key
    let answerHindi = "";
    let relatedSchemeId = null;

    if (/आधार|गलत नाम|correction|update/i.test(lower)) {
      answerHindi = "यदि आधार कार्ड में नाम या जन्मतिथि में गलती है, तो नजदीकी आधार सेवा केंद्र या पोस्ट ऑफिस में जाकर अपडेट कराएं। योजना का लाभ लेने हेतु आधार का नाम बैंक खाते से 100% मेल खाना जरूरी है।";
    } else if (/शिकायत|पैसे मांग|दलाल|भ्रष्टाचार|officer/i.test(lower)) {
      answerHindi = "यदि कोई अधिकारी या दलाल पैसे मांगता है, तो तुरंत बिहार सीएम हेल्पलाइन 1076 या विजिलेंस हेल्पलाइन पर शिकायत दर्ज करें। योजना साथी के 'शिकायत एवं हेल्पलाइन' सेक्शन में आपको सीधा नंबर मिल जाएगा।";
    } else if (/जमीन की रसीद|lpc|bataidar|रैयत/i.test(lower)) {
      answerHindi = "यदि आपके पास जमीन की अद्यतन रसीद नहीं है, तो biharbhumi.bihar.gov.in से ऑनलाइन परिमार्जन या लगान रसीद डाउनलोड करें। बटाईदार किसान वार्ड सदस्य से सत्यापित स्व-घोषणा पत्र लगाकर भी फसल सहायता ले सकते हैं।";
    } else if (/रिजेक्ट|अस्वीकृत|कारण/i.test(lower)) {
      answerHindi = "फॉर्म रिजेक्ट होने के 3 मुख्य कारण होते हैं: (1) बैंक खाता DBT से लिंक न होना, (2) आधार में नाम की स्पेलिंग गलत होना, (3) भूमि रिकॉर्ड का पुराना होना। e-KYC कराकर पुनः आवेदन कर सकते हैं।";
    } else {
      answerHindi = "योजना साथी AI के अनुसार आप सरकारी योजनाओं की पात्रता, जरूरी दस्तावेज, आवेदन प्रक्रिया और नजदीकी CSC केंद्र की जानकारी सीधे अपनी आवाज़ में पूछ सकते हैं।";
    }

    // If Gemini API Key exists, use live Generative AI!
    if (apiKey) {
      try {
        const prompt = `You are "Yojana Sathi AI Copilot" (योजना साथी), an expert rural government scheme advisor for citizens of Bihar and India (covering myScheme.gov.in and Bihar state schemes).
User's query: "${question}"

Provide a clear, respectful, highly practical and accurate response in simple spoken Hindi (हिन्दी) or Bhojpuri.
Include:
1. Direct clear answer to the user's doubt.
2. Documents or steps needed.
3. Official portal or helpline where they should go.

Keep the response concise (under 80 words) and voice-friendly.`;

        const geminiRes = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: { maxOutputTokens: 250, temperature: 0.3 }
          })
        });

        if (geminiRes.ok) {
          const geminiData = await geminiRes.json();
          const liveText = geminiData.candidates?.[0]?.content?.parts?.[0]?.text;
          if (liveText) {
            answerHindi = liveText.trim();
          }
        }
      } catch (err) {
        console.warn('Gemini API fetch error, fallback used:', err.message);
      }
    }

    res.json({
      success: true,
      data: {
        question,
        answer: answerHindi,
        relatedSchemeId
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/ai/live-discover — Dynamic New Scheme Discovery
router.post('/live-discover', async (req, res) => {
  try {
    const { query } = req.body;
    if (!query) {
      return res.status(400).json({ success: false, message: 'Query is required' });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    let discoveredScheme = null;

    if (apiKey) {
      const prompt = `You are a real-time government scheme knowledge engine integrating data from myScheme.gov.in and Bihar Government portals.
User searched for an upcoming or unlisted government scheme: "${query}"

Synthesize the real official scheme details into a structured JSON schema:
{
  "scheme_id": "kebab-case-id",
  "name": "English Scheme Name",
  "hindiName": "हिन्दी में योजना का नाम",
  "tagline": "आकर्षक लाभ सारांश",
  "category": "kisan | health | student | women | elderly | disability | business | housing | employment | food",
  "categoryLabel": "हिन्दी श्रेणी",
  "level": "central | state",
  "benefit": "लाभ राशि",
  "benefitDetail": "विस्तृत लाभ",
  "whoQualifies": "कौन आवेदन कर सकता है",
  "documentsRequired": ["दस्तावेज 1", "दस्तावेज 2", "दस्तावेज 3"],
  "applySteps": ["चरण 1", "चरण 2", "चरण 3"],
  "officialLink": "https://myscheme.gov.in",
  "audioExplanationHindi": "आवाज़ में बोलने हेतु 1 लाइन का संक्षिप्त विवरण।"
}

Respond with ONLY valid JSON:`;

      const geminiRes = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { responseMimeType: "application/json" }
        })
      });

      if (geminiRes.ok) {
        const gData = await geminiRes.json();
        const rawJson = gData.candidates?.[0]?.content?.parts?.[0]?.text;
        if (rawJson) {
          discoveredScheme = JSON.parse(rawJson);
        }
      }
    }

    // Deterministic fallback for new 2026 schemes (PM Surya Ghar, Namo Drone Didi, etc.)
    if (!discoveredScheme) {
      const q = query.toLowerCase();
      if (/solar|surya ghar|bijli|rooftop|सौर ऊर्जा/i.test(q)) {
        discoveredScheme = {
          scheme_id: "pm-surya-ghar",
          name: "PM Surya Ghar: Muft Bijli Yojana",
          hindiName: "प्रधानमंत्री सूर्य घर: मुफ्त बिजली योजना",
          tagline: "छत पर सोलर पैनल लगाने पर ₹78,000 तक की सरकारी सब्सिडी + हर महीने 300 यूनिट मुफ्त बिजली",
          category: "housing",
          categoryLabel: "ऊर्जा एवं आवास",
          level: "central",
          benefit: "₹78,000 तक सब्सिडी + 300 यूनिट मुफ्त बिजली",
          benefitDetail: "1 किलोवाट से 3 किलोवाट तक सोलर पैनल लगाने पर सीधे बैंक खाते में सब्सिडी।",
          whoQualifies: "छत वाले सभी आवासीय मकान मालिक जिनके पास वैध बिजली कनेक्शन हो",
          documentsRequired: ["बिजली बिल", "आधार कार्ड", "छत का मालिकाना हक प्रमाण", "बैंक पासबुक"],
          applySteps: ["pmsuryaghar.gov.in पर रजिस्ट्रेशन करें।", "डिस्कॉम से सोलर मीटर अप्रूवल कराएं।"],
          officialLink: "https://pmsuryaghar.gov.in",
          audioExplanationHindi: "पीएम सूर्य घर योजना में घर की छत पर सोलर पैनल लगाने के लिए सरकार अठहत्तर हजार रुपये तक की सब्सिडी देती है।"
        };
      } else if (/drone|ड्रोन दीदी|drone didi/i.test(q)) {
        discoveredScheme = {
          scheme_id: "namo-drone-didi",
          name: "Namo Drone Didi Scheme",
          hindiName: "नमो ड्रोन दीदी योजना",
          tagline: "महिला स्वयं सहायता समूहों को खेती में कीटनाशक छिड़काव हेतु 80% (₹8 लाख तक) ड्रोन सब्सिडी व पायलट ट्रेनिंग",
          category: "women",
          categoryLabel: "महिला सशक्तिकरण",
          level: "central",
          benefit: "80% सब्सिडी (अधिकतम ₹8,00,000) + मुफ्त 15 दिन ड्रोन पायलट ट्रेनिंग",
          benefitDetail: "खेती में आधुनिक ड्रोन तकनीक के इस्तेमाल हेतु SHG महिलाओं को ड्रोन उपकरण व मासिक आय का अवसर।",
          whoQualifies: "जीविका / दीनदयाल अंत्योदय योजना से जुड़ी महिला स्वयं सहायता समूह की दीदियां",
          documentsRequired: ["SHG सदस्यता प्रमाण", "आधार कार्ड", "10वीं पास प्रमाण पत्र", "बैंक पासबुक"],
          applySteps: ["अपने ब्लॉक के जीविका/NRLM कार्यालय में संपर्क करें।", "ड्रोन पायलट ट्रेनिंग हेतु आवेदन दें।"],
          officialLink: "https://agricoop.nic.in",
          audioExplanationHindi: "नमो ड्रोन दीदी योजना में स्वयं सहायता समूह की महिलाओं को मुफ्त ड्रोन पायलट ट्रेनिंग और आठ लाख रुपये तक का अनुदान मिलता है।"
        };
      }
    }

    res.json({
      success: true,
      data: discoveredScheme
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
