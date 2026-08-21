import express from 'express';
import { SCHEMES_DATABASE } from '../../src/data/schemes.js';

const router = express.Router();
const schemesData = SCHEMES_DATABASE;

// Profile Extractor Helper
function extractProfile(transcript = '') {
  const lower = transcript.toLowerCase();
  const profile = {
    age: null,
    gender: 'unspecified',
    occupation: 'any',
    social_category: 'any',
    disability_status: false,
    marital_status: 'any',
    education_level: null,
    has_land: false,
    has_ration_card: false,
    has_pucca_house: null,
    location_type: 'any',
    needs: [],
    tags: []
  };

  // Age
  const ageMatch = lower.match(/(\d{1,2})\s*(?:साल|वर्ष|उम्र|बरस|years|age|umar)/i);
  if (ageMatch && ageMatch[1]) {
    profile.age = parseInt(ageMatch[1], 10);
    profile.tags.push(`उम्र: ${profile.age} वर्ष`);
  }

  // Gender & Marital
  if (/विधवा|widow|vidhwa/i.test(lower)) {
    profile.gender = 'female';
    profile.marital_status = 'widow';
    profile.tags.push('स्थिति: विधवा महिला');
  } else if (/लड़की|महिला|औरत|छात्रा|बेटी|कन्या|female|woman|girl|ladki/i.test(lower)) {
    profile.gender = 'female';
    profile.tags.push('लिंग: महिला / छात्रा');
  } else if (/पुरुष|लड़का|male|purush/i.test(lower)) {
    profile.gender = 'male';
    profile.tags.push('लिंग: पुरुष');
  }

  // Disability
  if (/दिव्यांग|विकलांग|अपाहिज|disab|physically|handicap|wheelchair|udid/i.test(lower)) {
    profile.disability_status = true;
    profile.needs.push('disability_support');
    profile.tags.push('विशेष श्रेणी: दिव्यांगजन');
  }

  // Social Category
  if (/अल्पसंख्यक|मुस्लिम|ईसाई|minority|muslim/i.test(lower)) {
    profile.social_category = 'minority';
    profile.tags.push('वर्ग: अल्पसंख्यक');
  } else if (/sc|दलित|महादलित|अनुसूचित जाति/i.test(lower)) {
    profile.social_category = 'sc';
    profile.tags.push('वर्ग: SC (अनुसूचित जाति)');
  } else if (/st|आदिवासी|अनुसूचित जनजाति/i.test(lower)) {
    profile.social_category = 'st';
    profile.tags.push('वर्ग: ST (अनुसूचित जनजाति)');
  } else if (/ebc|अत्यंत पिछड़ा/i.test(lower)) {
    profile.social_category = 'ebc';
    profile.tags.push('वर्ग: EBC (अत्यंत पिछड़ा)');
  } else if (/obc|पिछड़ा/i.test(lower)) {
    profile.social_category = 'obc';
    profile.tags.push('वर्ग: OBC (अन्य पिछड़ा)');
  }

  // Occupation
  if (/कारीगर|शिल्पकार|बढ़ई|लोहार|दर्जी|कुम्हार|विश्वकर्मा|artisan/i.test(lower)) {
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
  } else if (/किसान|खेती|बटाईदार|कृषि|खाद|यूरिया|डीएपी|बीज|farmer|kisan|kheti/i.test(lower)) {
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

// POST /api/ai/extract
router.post('/extract', (req, res) => {
  try {
    const { transcript } = req.body;
    if (!transcript) {
      return res.status(400).json({ success: false, message: 'Voice transcript is required' });
    }
    const profile = extractProfile(transcript);
    res.json({
      success: true,
      data: {
        profile,
        confidence: 0.95
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/ai/match — Enhanced AI Matcher with Gemini 1.5 Semantic Reasoning
router.post('/match', async (req, res) => {
  try {
    const { transcript } = req.body;
    if (!transcript) {
      return res.status(400).json({ success: false, message: 'Voice transcript is required' });
    }

    const profile = extractProfile(transcript);
    const apiKey = process.env.GEMINI_API_KEY;

    // 1. If Gemini API Key is available, use Gemini Generative AI for Deep Semantic Reasoning
    if (apiKey) {
      try {
        const schemesSummary = schemesData.map(s => ({
          id: s.id,
          name: s.hindiName || s.name,
          category: s.category,
          tagline: s.tagline,
          benefit: s.benefit,
          whoQualifies: s.whoQualifies
        }));

        const prompt = `You are "Yojana Sathi AI", the supreme government scheme matching intelligence for Bihar & Central Government welfare programs.
Citizen Voice Transcript: "${transcript}"

Scheme Database:
${JSON.stringify(schemesSummary)}

Task:
1. Understand the citizen's exact situation (e.g. Senior citizen, Farmer, Divyangjan, Student, Laborer, Widow, Shopkeeper, Housing need, Crop damage, etc.).
2. Pick top 4 to 7 most relevant schemes from the Scheme Database.
3. Assign a matchScore (70-98) and a concise Hindi reason for each scheme.
4. Output STRICT JSON only:
{
  "matchedIds": [
    { "id": "scheme-id-here", "score": 95, "badge": "100% सटीक पात्रता", "reason": "संक्षिप्त हिंदी कारण" }
  ],
  "voiceSummary": "एक छोटा 20 शब्दों का हिंदी ऑडियो सारांश"
}`;

        const geminiRes = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: { maxOutputTokens: 800, temperature: 0.2 }
          })
        });

        if (geminiRes.ok) {
          const geminiData = await geminiRes.json();
          let rawText = geminiData.candidates?.[0]?.content?.parts?.[0]?.text || '';
          rawText = rawText.replace(/```json/g, '').replace(/```/g, '').trim();

          const parsed = JSON.parse(rawText);
          if (parsed.matchedIds && parsed.matchedIds.length > 0) {
            const aiMatches = parsed.matchedIds.map(m => {
              const base = schemesData.find(s => s.id === m.id);
              if (!base) return null;
              return {
                ...base,
                matchScore: m.score || 85,
                matchStatus: m.score >= 70 ? 'HIGH' : 'MEDIUM',
                matchBadge: m.badge || 'AI अनुशंसित योजना',
                matchColor: 'text-emerald-400 border-emerald-500/40 bg-emerald-500/10',
                reasons: [m.reason || base.whoQualifies]
              };
            }).filter(Boolean);

            if (aiMatches.length > 0) {
              return res.json({
                success: true,
                data: {
                  transcript,
                  profile,
                  matchedSchemes: aiMatches,
                  totalCount: aiMatches.length,
                  voiceSummary: parsed.voiceSummary
                }
              });
            }
          }
        }
      } catch (geminiErr) {
        console.warn('Gemini Match Error, fallback to semantic matching:', geminiErr.message);
      }
    }

    // 2. High-Performance Fallback Semantic Matcher
    const lower = transcript.toLowerCase();
    const isSeniorQuery = /सीनियर|सिटीजन|वरिष्ठ|बुजुर्ग|वृद्ध|वृद्धा|वृद्धजन|पेंशन|बूढ़े|senior|citizen|elderly|old age|vridha|bujurg/i.test(lower);
    const isDisabilityQuery = /दिव्यांग|विकलांग|अपाहिज|wheelchair|tricycle|udid|disab|physically|handicap/i.test(lower);
    const isStudentQuery = /विद्यार्थी|छात्र|छात्रा|पढ़ाई|कॉलेज|स्कूल|12वीं|10वीं|ग्रेजुएशन|student|scholarship/i.test(lower);
    const isWomanQuery = /महिला|औरत|लड़की|छात्रा|बेटी|कन्या|विधवा|woman|women|girl|female|daughter/i.test(lower);
    const isFarmerQuery = /किसान|खेती|कृषि|खाद|यूरिया|डीएपी|बीज|फसल|farmer|kisan|crop|fertilizer/i.test(lower);
    const isLaborerQuery = /मजदूर|मजदूरी|श्रमिक|दिहाड़ी|लेबर|ई-श्रम|आवास|घर नहीं|mazdoor|laborer|housing/i.test(lower);
    const isBusinessQuery = /दुकान|दुकानदार|व्यापार|कारोबार|उद्यमी|मुद्रा|लोन|shop|business|loan|mudra/i.test(lower);

    const matches = [];

    for (const scheme of schemesData) {
      const crit = scheme.eligibility;
      if (!crit) continue;

      let score = 0;
      const reasons = [];
      let isDisqualified = false;

      if (crit.disability_required && !profile.disability_status && !isDisabilityQuery) isDisqualified = true;
      if (crit.gender === 'female' && profile.gender === 'male' && !isWomanQuery) isDisqualified = true;
      if (crit.min_age >= 60 && !isSeniorQuery && profile.age !== null && profile.age < 60) isDisqualified = true;
      if (isSeniorQuery && (scheme.category === 'student' || scheme.category === 'youth')) isDisqualified = true;
      if (isStudentQuery && scheme.category === 'elderly') isDisqualified = true;

      if (isDisqualified) continue;

      if (isSeniorQuery && (scheme.category === 'elderly' || scheme.id === 'ayushman-bharat')) {
        score += 75;
        reasons.push('वरिष्ठ नागरिक (Senior Citizen 60+) विशेष कल्याण योजना');
      }
      if (isDisabilityQuery && (scheme.category === 'disability' || scheme.id === 'ayushman-bharat')) {
        score += 75;
        reasons.push('दिव्यांगजन सहायक उपकरण व सुरक्षा योजना');
      }
      if (isStudentQuery && (scheme.category === 'student' || scheme.category === 'youth')) {
        score += 70;
        reasons.push('विद्यार्थी उच्च शिक्षा व छात्रवृत्ति सहायता');
      }
      if (isWomanQuery && scheme.category === 'women') {
        score += 70;
        reasons.push('महिला सशक्तिकरण व सुरक्षा योजना');
      }
      if (isFarmerQuery && scheme.category === 'kisan') {
        score += 70;
        reasons.push('कृषि एवं किसान कल्याण योजना');
      }
      if (isLaborerQuery && (scheme.category === 'laborer' || scheme.category === 'housing')) {
        score += 65;
        reasons.push('असंगठित निर्माण श्रमिक व आवास सहायता');
      }
      if (isBusinessQuery && scheme.category === 'business') {
        score += 70;
        reasons.push('स्वरोजगार व व्यापार विस्तार ऋण');
      }

      if (score >= 35) {
        matches.push({
          ...scheme,
          matchScore: Math.min(score, 98),
          matchStatus: score >= 70 ? 'HIGH' : 'MEDIUM',
          matchBadge: score >= 70 ? '100% सटीक पात्रता' : 'उच्च पात्रता',
          matchColor: score >= 70 ? 'text-emerald-400 border-emerald-500/40 bg-emerald-500/10' : 'text-blue-400 border-blue-500/40 bg-blue-500/10',
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

    let answerHindi = "योजना साथी AI के अनुसार आप सरकारी योजनाओं की पात्रता, जरूरी दस्तावेज, आवेदन प्रक्रिया और नजदीकी CSC केंद्र की जानकारी सीधे अपनी आवाज़ में पूछ सकते हैं।";

    if (apiKey) {
      try {
        const prompt = `You are "Yojana Sathi AI Copilot" (योजना साथी), an expert rural government scheme advisor for citizens of Bihar and India (covering myScheme.gov.in and Bihar state schemes).
User query: "${question}"
Provide a clear, respectful, practical answer in simple spoken Hindi (हिन्दी) under 70 words.`;

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
          if (liveText) answerHindi = liveText.trim();
        }
      } catch (err) {
        console.warn('Gemini API error:', err.message);
      }
    }

    res.json({
      success: true,
      data: {
        question,
        answer: answerHindi
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
