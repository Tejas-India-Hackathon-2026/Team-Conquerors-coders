import express from 'express';
import schemesData from '../data/schemes.json' assert { type: 'json' };

const router = express.Router();

// Helper to extract citizen profile from text
function extractProfile(text = '') {
  const lower = text.toLowerCase();
  const profile = {
    age: null,
    gender: 'unspecified',
    occupation: null,
    hasLand: false,
    landSize: null,
    hasRationCard: false,
    isStudent: false,
    educationLevel: null,
    housingType: null,
    healthNeed: false,
    businessIntent: false,
    cropDamage: false,
    location: { state: 'Bihar', district: null },
    tags: []
  };

  // Age extraction
  const ageMatch = lower.match(/(\d{1,2})\s*(?:saal|sal|varsh|years|umar|age)/i);
  if (ageMatch && ageMatch[1]) {
    profile.age = parseInt(ageMatch[1], 10);
    profile.tags.push(`उम्र: ${profile.age} वर्ष`);
  } else if (/bujurg|buddhe|vridha|senior/i.test(lower)) {
    profile.age = 65;
    profile.tags.push('उम्र: 60+ (वरिष्ठ नागरिक)');
  }

  // Gender
  if (/ladki|beti|mahila|aurat|female|girl|kanya/i.test(lower)) {
    profile.gender = 'female';
    profile.tags.push('महिला / छात्रा');
  }

  // Occupation
  if (/kisan|farmer|kheti|zameen|bigha|acre|fasal|khet/i.test(lower)) {
    profile.occupation = 'farmer';
    profile.tags.push('पेशा: किसान');
  } else if (/student|padhai|college|school|chhatra|inter|12th|10th|graduation/i.test(lower)) {
    profile.occupation = 'student';
    profile.isStudent = true;
    profile.tags.push('पेशा: विद्यार्थी');
  } else if (/dukan|business|startup|rojgar|karobar|factory/i.test(lower)) {
    profile.occupation = 'business';
    profile.businessIntent = true;
    profile.tags.push('इरादा: नया व्यापार / उद्यम');
  } else if (/mazdoor|majdoor|daily wage|dihadi/i.test(lower)) {
    profile.occupation = 'daily-wager';
    profile.tags.push('पेशा: दिहाड़ी मजदूर');
  }

  // Land
  if (/zameen|land|bigha|acre/i.test(lower)) {
    profile.hasLand = true;
    profile.tags.push('जमीन: भूमिधारक');
  }

  // Crop damage
  if (/sukha|baadh|barish|nuksan|barbaad/i.test(lower)) {
    profile.cropDamage = true;
    profile.tags.push('फसल क्षति / मुआवजा');
  }

  // Housing
  if (/kaccha|jhopdi|ghar nahi|chhat nahi|pucca/i.test(lower)) {
    profile.housingType = 'kutcha';
    profile.tags.push('आवास: कच्चा मकान');
  }

  // Health
  if (/ilaaj|hospital|operation|bimari/i.test(lower)) {
    profile.healthNeed = true;
    profile.tags.push('जरूरत: अस्पताल / इलाज');
  }

  // District
  const biharDistricts = ['jamui', 'patna', 'gaya', 'muzaffarpur', 'bhagalpur', 'darbhanga', 'purnia', 'rohtas', 'begusarai'];
  for (const dist of biharDistricts) {
    if (lower.includes(dist)) {
      profile.location.district = dist.charAt(0).toUpperCase() + dist.slice(1);
      profile.tags.push(`जिला: ${profile.location.district} (बिहार)`);
      break;
    }
  }

  return profile;
}

// POST /api/ai/match
router.post('/match', async (req, res) => {
  try {
    const { transcript, apiKey } = req.body;
    if (!transcript) {
      return res.status(400).json({ success: false, message: 'Voice transcript is required' });
    }

    const profile = extractProfile(transcript);
    const lower = transcript.toLowerCase();
    const matches = [];

    for (const scheme of schemesData) {
      let score = 30; // base relevance
      const reasons = [];

      if (scheme.id === 'pm-kisan' && (profile.occupation === 'farmer' || profile.hasLand || /kisan|kheti/i.test(lower))) {
        score = 95;
        reasons.push('आप एक भूमिधारक किसान हैं');
      } else if (scheme.id === 'ayushman-bharat' && (profile.healthNeed || /hospital|ilaaj|ration|garib/i.test(lower))) {
        score = 92;
        reasons.push('राशन कार्ड धारक व अस्पताल इलाज की आवश्यकता');
      } else if (scheme.id === 'kanya-utthan' && (profile.gender === 'female' || /ladki|beti|12th|graduation/i.test(lower))) {
        score = 95;
        reasons.push('बिहार की छात्रा (इंटर / स्नातक प्रोत्साहन)');
      } else if (scheme.id === 'udyami-yojana' && (profile.businessIntent || /business|dukan|startup|rojgar/i.test(lower))) {
        score = 90;
        reasons.push('बिहार में नया उद्यम/उद्योग स्थापित करने हेतु ₹5 लाख सब्सिडी');
      } else if (scheme.id === 'pm-awas-gramin' && (profile.housingType === 'kutcha' || /kaccha|ghar|makan|chhat/i.test(lower))) {
        score = 95;
        reasons.push('पक्का मकान नहीं है (ग्रामीण आवास सहायता)');
      } else if (scheme.id === 'vridhavastha-pension' && (profile.age >= 60 || /pension|bujurg|60 saal/i.test(lower))) {
        score = 98;
        reasons.push('उम्र 60 वर्ष या अधिक है (मासिक वृद्धावस्था पेंशन)');
      } else if (scheme.id === 'nsp-scholarship' && (profile.isStudent || /student|padhai|scholarship/i.test(lower))) {
        score = 88;
        reasons.push('वर्तमान में अध्ययनरत विद्यार्थी');
      } else if (scheme.id === 'pm-fasal-bima' && (profile.cropDamage || /fasal|nuksan|baadh|sukha/i.test(lower))) {
        score = 92;
        reasons.push('फसल बर्बादी पर सरकारी सहायता व मुआवजा');
      } else if (scheme.id === 'student-credit-card' && /12th|college|btech|loan/i.test(lower)) {
        score = 85;
        reasons.push('उच्च शिक्षा हेतु ₹4 लाख तक शिक्षा ऋण');
      } else if (scheme.id === 'kushal-yuva-program' && /computer|skill|english|kyp/i.test(lower)) {
        score = 82;
        reasons.push('मुफ्त 240 घंटे कंप्यूटर व संवाद प्रशिक्षण');
      }

      if (score >= 60) {
        matches.push({
          ...scheme,
          matchScore: score,
          reasons: reasons.length > 0 ? reasons : ['आप इस योजना के बुनियादी मापदंड पूरे करते हैं']
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
