import express from 'express';
import schemesData from '../data/schemes.json' assert { type: 'json' };

const router = express.Router();

// Helper to extract complete multi-field citizen profile from text
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
  const ageMatch = lower.match(/(\d{1,2})\s*(?:saal|sal|varsh|years|umar|age)/i);
  if (ageMatch && ageMatch[1]) {
    profile.age = parseInt(ageMatch[1], 10);
    profile.tags.push(`उम्र: ${profile.age} वर्ष`);
  } else if (/bujurg|buddhe|vridha|senior citizen|dada|dadi|baba|sasur|60 ke/i.test(lower)) {
    profile.age = 65;
    profile.tags.push('उम्र: 60+ (वरिष्ठ नागरिक)');
  }

  // Gender & Marital Status
  if (/widow|vidhwa|patidev guzar gaye|pati nahi rahe/i.test(lower)) {
    profile.gender = 'female';
    profile.marital_status = 'widow';
    profile.tags.push('स्थिति: विधवा महिला (Widow)');
  } else if (/ladki|beti|mahila|aurat|female|girl|kanya|guriya/i.test(lower)) {
    profile.gender = 'female';
    profile.tags.push('लिंग: महिला / छात्रा');
    if (/unmarried|avivahit|kunwari/i.test(lower)) profile.marital_status = 'unmarried';
  } else if (/purush|male|ladka|beta|kisan bhai|aadmi/i.test(lower)) {
    profile.gender = 'male';
    profile.tags.push('लिंग: पुरुष');
  }

  // Disability
  if (/divyang|viklang|handicapped|disability|udid|tricycle|wheelchair/i.test(lower)) {
    profile.disability_status = true;
    profile.needs.push('disability_support');
    profile.tags.push('विशेष श्रेणी: दिव्यांगजन (Divyangjan)');
  }

  // Social Category
  if (/muslim|christian|sikh|buddhist|jain|minority|alpsankhyak/i.test(lower)) {
    profile.social_category = 'minority';
    profile.tags.push('वर्ग: अल्पसंख्यक (Minority)');
  } else if (/sc|dalit|mahadalit|anusuchit jati/i.test(lower)) {
    profile.social_category = 'sc';
    profile.tags.push('वर्ग: अनुसूचित जाति (SC)');
  } else if (/st|tribal|adivasi/i.test(lower)) {
    profile.social_category = 'st';
    profile.tags.push('वर्ग: अनुसूचित जनजाति (ST)');
  } else if (/obc|ebc|pichhda/i.test(lower)) {
    profile.social_category = 'obc';
    profile.tags.push('वर्ग: पिछड़ा वर्ग (OBC/EBC)');
  }

  // Occupation
  if (/artisan|karigar|badhai|carpenter|lohar|blacksmith|mistri|mason|darji|tailor|nai|barber|dhobi|kumhar|mochi/i.test(lower)) {
    profile.occupation = 'artisan';
    profile.tags.push('पेशा: पारंपरिक कारीगर / शिल्पकार');
  } else if (/dukan|shop|shopkeeper|kirana|retail|business|startup|thela|vendor|footpath/i.test(lower)) {
    profile.occupation = 'shopkeeper';
    profile.tags.push('पेशा: दुकानदार / सूक्ष्म कारोबारी');
  } else if (/student|padhai|college|school|chhatra|inter|12th|10th|matric|graduation|degree|btech|fees|scholarship/i.test(lower)) {
    profile.occupation = 'student';
    profile.tags.push('पेशा: विद्यार्थी / पढ़ाई');
  } else if (/mazdoor|majdoor|daily wage|dihadi|kuli|rickshaw|shramik|e-shram|mgnrega/i.test(lower)) {
    profile.occupation = 'laborer';
    profile.tags.push('पेशा: असंगठित दिहाड़ी मजदूर');
  } else if (/farmer|kisan|kheti|bataidar|krishi/i.test(lower)) {
    profile.occupation = 'farmer';
    profile.tags.push('पेशा: किसान / खेती');
  } else if (/berojgar|unemployed|job seeker|naukri/i.test(lower)) {
    profile.occupation = 'unemployed';
    profile.tags.push('पेशा: बेरोजगार युवा');
  }

  // Education
  if (/graduation|graduate|degree|ba|bsc|bcom|btech/i.test(lower)) {
    profile.education_level = 'graduate';
    profile.tags.push('शिक्षा: स्नातक (Graduation)');
  } else if (/12th|inter|intermediate|barahvi|12 pass/i.test(lower)) {
    profile.education_level = '12th_pass';
    profile.tags.push('शिक्षा: 12वीं पास (Intermediate)');
  } else if (/10th|matric|dasvi/i.test(lower)) {
    profile.education_level = '10th_pass';
    profile.tags.push('शिक्षा: 10वीं पास (Matric)');
  }

  // Land
  if (/zameen|jameen|land|bigha|katha|acre/i.test(lower)) {
    profile.has_land = true;
    profile.tags.push('जमीन: कृषि भूमि उपलब्ध');
  }

  // Housing
  if (/kaccha|jhopdi|ghar nahi|chhat nahi|pucca/i.test(lower)) {
    profile.has_pucca_house = false;
    profile.tags.push('आवास: कच्चा मकान');
  }

  // Health
  if (/ilaaj|ilaj|hospital|aspatal|operation|bimari|dawa|doctor/i.test(lower)) {
    profile.needs.push('health_treatment');
    profile.tags.push('जरूरत: अस्पताल / इलाज');
  }

  // Ration
  if (/ration|bpl|secc|garib/i.test(lower)) {
    profile.has_ration_card = true;
    profile.tags.push('राशन कार्ड: उपलब्ध (BPL)');
  }

  // Location
  if (/shahar|city|urban/i.test(lower)) {
    profile.location_type = 'urban';
    profile.tags.push('क्षेत्र: शहरी (Urban)');
  } else if (/gaon|gramin|rural/i.test(lower)) {
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
        if (profile.disability_status === true || /divyang|viklang/i.test(lower)) {
          score += 50;
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
        }
      }
      if (isDisqualified) continue;

      // 3. Marital status check
      if (crit.marital_status && crit.marital_status !== 'any') {
        if (crit.marital_status === 'widow') {
          if (profile.marital_status === 'widow' || /vidhwa|widow/i.test(lower)) {
            score += 45;
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
        if (crit.min_age >= 60 && !/pension|bujurg|vridha|buddha/i.test(lower)) isDisqualified = true;
      }
      if (isDisqualified) continue;

      // 5. Occupation check
      if (crit.occupations && !crit.occupations.includes('any')) {
        const matchesOcc = crit.occupations.some(o => o === profile.occupation || lower.includes(o));
        if (matchesOcc) {
          score += 40;
          reasons.push(`पेशा आधारित पात्रता (${profile.occupation})`);
        } else {
          if (scheme.id === 'pm-kisan' && (profile.occupation === 'student' || profile.occupation === 'shopkeeper')) isDisqualified = true;
          if (scheme.id === 'student-credit-card' && (profile.occupation === 'elderly' || profile.occupation === 'farmer')) isDisqualified = true;
        }
      } else {
        score += 15;
      }
      if (isDisqualified) continue;

      // 6. Land check
      if (crit.land_required === true && !profile.has_land && !/zameen|land|bigha/i.test(lower)) {
        isDisqualified = true;
      }
      if (isDisqualified) continue;

      // 7. Need specific boosts
      if (scheme.id === 'ayushman-bharat' && (profile.needs.includes('health_treatment') || profile.has_ration_card)) score += 35;
      if (scheme.id === 'pm-awas-gramin' && profile.has_pucca_house === false) score += 40;
      if (scheme.id === 'pm-mudra-yojana' && profile.occupation === 'shopkeeper') score += 40;
      if (scheme.id === 'kanya-utthan' && profile.gender === 'female' && (profile.education_level === '12th_pass' || profile.education_level === 'graduate')) score += 45;

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

export default router;
