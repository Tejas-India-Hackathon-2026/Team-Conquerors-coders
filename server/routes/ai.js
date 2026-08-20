import express from 'express';
import schemesData from '../data/schemes.json' assert { type: 'json' };

const router = express.Router();

// Helper to extract citizen profile from text with regional dialects
function extractProfile(text = '') {
  const lower = text.toLowerCase().trim();
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

  if (!lower) return profile;

  // Age extraction
  const ageMatch = lower.match(/(\d{1,2})\s*(?:saal|sal|varsh|years|umar|age)/i);
  if (ageMatch && ageMatch[1]) {
    profile.age = parseInt(ageMatch[1], 10);
    profile.tags.push(`उम्र: ${profile.age} वर्ष`);
  } else if (/bujurg|buddhe|buddha|budhiya|vridha|senior|dada|dadi|baba|sasur|60 ke/i.test(lower)) {
    profile.age = 65;
    profile.tags.push('उम्र: 60+ (वरिष्ठ नागरिक)');
  }

  // Gender
  if (/ladki|beti|mahila|aurat|female|girl|kanya|guriya|bachi/i.test(lower)) {
    profile.gender = 'female';
    profile.tags.push('महिला / छात्रा');
  }

  // Occupation (Bhojpuri/Maithili terms included)
  if (/kisan|farmer|kheti|zameen|jameen|bigha|katha|acre|fasal|khet|krishi|krishak|bataidar|batai|jotna|hal|beej/i.test(lower)) {
    profile.occupation = 'farmer';
    profile.tags.push('पेशा: किसान / खेती');
  } else if (/student|padhai|padhe|college|school|chhatra|inter|12th|10th|matric|dasvi|barahvi|graduation|degree|btech|polytechnic|fees/i.test(lower)) {
    profile.occupation = 'student';
    profile.isStudent = true;
    profile.tags.push('पेशा: विद्यार्थी');
  } else if (/dukan|dukani|business|startup|rojgar|karobar|factory|karkhana|entrepreneur|dukaan|workshop|welding|dhandha/i.test(lower)) {
    profile.occupation = 'business';
    profile.businessIntent = true;
    profile.tags.push('इरादा: नया व्यापार / दुकान');
  } else if (/mazdoor|majdoor|daily wage|dihadi|kuli|rickshaw|thela|shramik|kamgar|beldari/i.test(lower)) {
    profile.occupation = 'daily-wager';
    profile.tags.push('पेशा: दिहाड़ी मजदूर');
  } else if (profile.age >= 60 || /pension|bujurg|vridha|buddha/i.test(lower)) {
    profile.occupation = 'elderly';
    profile.tags.push('वर्ग: वरिष्ठ नागरिक (60+)');
  }

  // Land
  if (/zameen|jameen|land|bigha|katha|acre|dismil|khet/i.test(lower)) {
    profile.hasLand = true;
    profile.tags.push('जमीन: कृषि भूमि उपलब्ध');
  }

  // Crop damage
  if (/sukha|baadh|barish|nuksan|barbaad|keeda|loss|bima|pani me dub/i.test(lower)) {
    profile.cropDamage = true;
    profile.tags.push('फसल क्षति / मुआवजा');
  }

  // Housing
  if (/kaccha|kacha|jhopdi|jhopra|ghar nahi|chhat nahi|pucca|tirpal/i.test(lower)) {
    profile.housingType = 'kutcha';
    profile.tags.push('आवास: कच्चा मकान');
  }

  // Health
  if (/ilaaj|ilaj|hospital|aspatal|operation|bimari|bemar|dawa|doctor|daktar|swasthya/i.test(lower)) {
    profile.healthNeed = true;
    profile.tags.push('जरूरत: अस्पताल / इलाज');
  }

  // Ration
  if (/ration|bpl|secc|garib|gareeb/i.test(lower)) {
    profile.hasRationCard = true;
    profile.tags.push('राशन कार्ड: उपलब्ध (BPL)');
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
      let score = 0;
      const reasons = [];

      if (scheme.id === 'pm-kisan' && (profile.occupation === 'farmer' || profile.hasLand || /kisan|farmer|kheti|zameen|jameen|bigha|katha|krishi/i.test(lower))) {
        score = 95;
        reasons.push('आप एक भूमिधारक किसान हैं');
      } else if (scheme.id === 'ayushman-bharat' && (profile.healthNeed || profile.hasRationCard || /hospital|aspatal|ilaaj|ilaj|bimari|dawa|ration|garib|daktar/i.test(lower))) {
        score = 92;
        reasons.push('राशन कार्ड धारक व अस्पताल में ₹5 लाख तक मुफ्त इलाज');
      } else if (scheme.id === 'kanya-utthan' && (profile.gender === 'female' || /ladki|beti|12th|inter|graduation|guriya|bachi/i.test(lower))) {
        score = 95;
        reasons.push('बिहार की छात्रा (इंटर / स्नातक प्रोत्साहन)');
      } else if (scheme.id === 'udyami-yojana' && (profile.businessIntent || /business|dukan|dukani|startup|rojgar|karobar|karkhana/i.test(lower))) {
        score = 90;
        reasons.push('बिहार में नया उद्योग/दुकान शुरू करने हेतु ₹10 लाख सहायता (50% सब्सिडी)');
      } else if (scheme.id === 'pm-awas-gramin' && (profile.housingType === 'kutcha' || /kaccha|kacha|ghar|makan|chhat|jhopdi|jhopra/i.test(lower))) {
        score = 95;
        reasons.push('पक्का मकान नहीं है (ग्रामीण आवास सहायता)');
      } else if (scheme.id === 'vridhavastha-pension' && (profile.age >= 60 || /pension|bujurg|vridha|60 saal|64 saal|dada|dadi|baba|buddha/i.test(lower))) {
        score = 98;
        reasons.push('उम्र 60 वर्ष या अधिक है (आजीवन मासिक वृद्धावस्था पेंशन)');
      } else if (scheme.id === 'nsp-scholarship' && (profile.isStudent || /student|padhai|scholarship|chhatravritti|college|school/i.test(lower))) {
        score = 88;
        reasons.push('अध्ययनरत विद्यार्थी (राष्ट्रीय छात्रवृत्ति)');
      } else if (scheme.id === 'pm-fasal-bima' && (profile.cropDamage || /fasal|nuksan|baadh|sukha|pani me dub/i.test(lower))) {
        score = 92;
        reasons.push('फसल बर्बादी पर सरकारी सहायता व मुआवजा');
      } else if (scheme.id === 'student-credit-card' && /12th|college|btech|loan|polytechnic/i.test(lower)) {
        score = 85;
        reasons.push('उच्च शिक्षा हेतु ₹4 लाख तक शिक्षा ऋण');
      } else if (scheme.id === 'kushal-yuva-program' && /computer|skill|english|kyp|seekhna/i.test(lower)) {
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

    // Smart Fallback if no specific keyword triggered
    if (matches.length === 0) {
      const topDefaults = ['pm-kisan', 'ayushman-bharat', 'pm-awas-gramin', 'kanya-utthan'];
      for (const id of topDefaults) {
        const found = schemesData.find(s => s.id === id);
        if (found) {
          matches.push({
            ...found,
            matchScore: 80,
            reasons: ['बिहार के नागरिकों के लिए सर्वाधिक लाभकारी योजना']
          });
        }
      }
      if (profile.tags.length === 0) {
        profile.tags.push('नागरिक सहायता (General Assistance)');
      }
    }

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
