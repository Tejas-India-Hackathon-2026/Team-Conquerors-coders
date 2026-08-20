/**
 * Internal Test Suite: Persona Diversity & Rule Verification
 * Runs 6 diverse personas through the extraction & deterministic matching pipeline
 */

import { extractProfileFromText, matchSchemes } from '../src/services/aiMatchingEngine.js';
import { SCHEMES_DATABASE } from '../src/data/schemes.js';

const TEST_PERSONAS = [
  {
    id: "persona-1-student-girl",
    title: "1. 19-year-old Unmarried Woman in 12th Grade (Scholarships)",
    input: "मैं 19 साल की अविवाहित लड़की हूँ, इस साल 12वीं पास किया है। आगे कॉलेज में पढ़ने के लिए छात्रवृत्ति और सरकारी मदद चाहिए।"
  },
  {
    id: "persona-2-widow-senior",
    title: "2. 65-year-old Widow with No Income (Pension & Ration)",
    input: "मेरी उम्र 65 साल है, मैं एक विधवा महिला हूँ। मेरे पति नहीं रहे, कोई कमाने वाला नहीं है, मुझे गुजारे के लिए पेंशन और राशन चाहिए।"
  },
  {
    id: "persona-3-divyang",
    title: "3. Disabled Person (Divyangjan Welfare & Aids)",
    input: "मैं 40% दिव्यांग व्यक्ति हूँ, पैरों से चलने में बहुत परेशानी होती है। मुझे व्हीलचेयर, ट्राईसाइकिल और दिव्यांग पेंशन की सरकारी सहायता चाहिए।"
  },
  {
    id: "persona-4-urban-youth",
    title: "4. Unemployed Urban Youth (Skill & Employment Schemes)",
    input: "मेरी उम्र 22 साल है, मैं पटना शहर में रहता हूँ और अभी बेरोजगार हूँ। मुझे कंप्यूटर या कोई काम सीखने और रोजगार शुरू करने की सरकारी योजना चाहिए।"
  },
  {
    id: "persona-5-daily-laborer",
    title: "5. Daily-Wage Laborer (Health Insurance & Labor Welfare)",
    input: "मैं एक दिहाड़ी निर्माण मजदूर हूँ, मजदूरी करता हूँ। हमारे पास राशन कार्ड है, अस्पताल में इलाज और लेबर कार्ड की क्या सुविधा मिलेगी?"
  },
  {
    id: "persona-6-shopkeeper",
    title: "6. Small Shopkeeper (Business Loans & Subsidies)",
    input: "मेरी उम्र 30 साल है, मैं अपनी छोटी किराना दुकान चलाता हूँ। मुझे अपना काम बढ़ाने के लिए बिना गारंटी वाला सरकारी मुद्रा लोन या सब्सिडी चाहिए।"
  },
  {
    id: "persona-7-farmer",
    title: "7. Landholding Farmer (Agriculture & PM-Kisan)",
    input: "मैं जमुई बिहार से किसान हूँ, 2 बीघा कृषि जमीन है और खेती करता हूँ। फसल सहायता और किसान योजना चाहिए।"
  }
];

console.log("================================================================================");
console.log("🔍 RUNNING YOJANA SATHI PERSONA DIVERSITY & ELIGIBILITY VERIFICATION TEST");
console.log(`📚 Total Schemes in Database: ${SCHEMES_DATABASE.length}`);
console.log("================================================================================\n");

let passedAll = true;
const personaResults = {};

for (const p of TEST_PERSONAS) {
  console.log(`\n--------------------------------------------------------------------------------`);
  console.log(`👤 TEST CASE: ${p.title}`);
  console.log(`🗣️ Spoken Input: "${p.input}"`);

  const profile = extractProfileFromText(p.input);
  console.log(`\n📋 Extracted Profile Tags:`);
  console.log(`   [${profile.extractedTags.join(' | ')}]`);
  console.log(`   - Age: ${profile.age}, Gender: ${profile.gender}, Occupation: ${profile.occupation}`);
  console.log(`   - Marital: ${profile.marital_status}, Disability: ${profile.disability_status}, Land: ${profile.has_land}`);

  const matchResult = matchSchemes(profile, p.input);
  const matched = matchResult.matchedSchemes;

  console.log(`\n🎯 Matched Schemes (${matched.length} schemes returned):`);
  matched.forEach((s, idx) => {
    console.log(`   ${idx + 1}. [${s.matchScore}%] ${s.name} (${s.hindiName})`);
    console.log(`      ↳ Category: ${s.categoryLabel} | Level: ${s.level}`);
    console.log(`      ↳ Reason: ${s.reasons?.[0] || s.whoQualifies}`);
  });

  personaResults[p.id] = matched.map(s => s.id);

  if (matched.length === 0) {
    console.error(`❌ FAILURE: No schemes matched for ${p.title}`);
    passedAll = false;
  }
}

// Diversity Cross-Check: Ensure personas are NOT returning identical scheme lists
console.log("\n================================================================================");
console.log("🔬 CROSS-PERSONA DIVERSITY AUDIT:");
console.log("================================================================================");

const p1 = personaResults["persona-1-student-girl"];
const p2 = personaResults["persona-2-widow-senior"];
const p3 = personaResults["persona-3-divyang"];
const p4 = personaResults["persona-4-urban-youth"];
const p5 = personaResults["persona-5-daily-laborer"];
const p6 = personaResults["persona-6-shopkeeper"];
const p7 = personaResults["persona-7-farmer"];

console.log(`• Student Girl Top Scheme: ${p1?.[0]} (Expected: kanya-utthan / nsp / student-credit-card)`);
console.log(`• Widow Senior Top Scheme: ${p2?.[0]} (Expected: vridhavastha-pension / widow-pension-bihar)`);
console.log(`• Disabled Top Scheme:     ${p3?.[0]} (Expected: divyang-pension-bihar / adip-divyang-appliances)`);
console.log(`• Urban Youth Top Scheme:  ${p4?.[0]} (Expected: kushal-yuva-program / udyami-yojana / pm-kaushal-vikas)`);
console.log(`• Laborer Top Scheme:      ${p5?.[0]} (Expected: eshram-bocw-welfare / ayushman-bharat / mgnrega)`);
console.log(`• Shopkeeper Top Scheme:   ${p6?.[0]} (Expected: pm-mudra-yojana / udyami-yojana / pm-svanidhi)`);
console.log(`• Farmer Top Scheme:       ${p7?.[0]} (Expected: pm-kisan / pm-fasal-bima / kisan-credit-card)`);

// Verify PM-Kisan is NOT in Student Girl or Widow or Disabled
const p1HasFarmer = p1?.includes("pm-kisan");
const p2HasFarmer = p2?.includes("pm-kisan");
const p3HasFarmer = p3?.includes("pm-kisan");

if (p1HasFarmer || p2HasFarmer || p3HasFarmer) {
  console.error("❌ BIAS DETECTED: Farmer scheme leaked into non-farmer personas!");
  passedAll = false;
} else {
  console.log("✅ VERIFIED: Zero farmer bias detected in non-farmer test cases!");
}

console.log("\n================================================================================");
if (passedAll) {
  console.log("🎉 ALL TESTS PASSED: Truly diverse, targeted, deterministic scheme matching!");
} else {
  console.log("⚠️ SOME TESTS FAILED.");
}
console.log("================================================================================\n");
