/**
 * Comprehensive Verified Government Schemes Database for Bihar & Central India
 * Schema Version: 2.0.0
 * Every scheme has structured eligibility criteria for deterministic rule filtering.
 */

export const SCHEMES_DATABASE = [
  // ==========================================
  // 1. AGRICULTURE & FARMERS (कृषि एवं किसान)
  // ==========================================
  {
    scheme_id: "pm-kisan",
    id: "pm-kisan",
    name: "PM-Kisan Samman Nidhi",
    hindiName: "प्रधानमंत्री किसान सम्मान निधि योजना",
    tagline: "हर साल ₹6,000 सीधे किसान के बैंक खाते में (3 किस्तों में)",
    category: "kisan",
    categoryLabel: "कृषि एवं किसान",
    level: "central",
    badgeColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
    icon: "Wheat",
    benefit: "₹6,000 / वर्ष",
    benefitDetail: "₹2,000 की 3 समान किस्तों में प्रति 4 माह पर सीधे बैंक खाते (DBT) में।",
    whoQualifies: "कृषि योग्य जमीन रखने वाले सभी छोटे व सीमांत किसान परिवार",
    eligibility: {
      min_age: 18,
      max_age: 100,
      gender: "any",
      occupations: ["farmer", "kisan", "agriculture"],
      income_max: null,
      social_category: ["general", "sc", "st", "obc", "ebc", "minority", "any"],
      land_required: true,
      disability_required: false,
      location: ["rural", "urban", "any"],
      education_level: "any",
      marital_status: "any",
      other_conditions: [" institutional landholders and income tax payees excluded"]
    },
    documentsRequired: [
      "आधार कार्ड (Aadhaar Card)",
      "जमीन के कागजात (खतियान / दाखिल-खारिज / LPC / रसीद)",
      "बैंक पासबुक (Aadhaar DBT से लिंक)",
      "आधार लिंक मोबाइल नंबर"
    ],
    applySteps: [
      "pmkisan.gov.in पोर्टल पर जाएं या नजदीकी CSC / वसुधा केंद्र पर जाएं।",
      "'New Farmer Registration' पर क्लिक करें और आधार नंबर दर्ज करें।",
      "अपनी जमीन (खाता, खेसरा, रकबा) और बैंक विवरण भरें।",
      "e-KYC बायोमेट्रिक या OTP से पूरा करें।"
    ],
    official_source_url: "https://pmkisan.gov.in",
    officialLink: "https://pmkisan.gov.in",
    last_verified: "2026-01-15",
    verified: true,
    audioExplanationHindi: "पीएम किसान सम्मान निधि में भूमिधारक किसानों को हर साल छह हजार रुपये तीन किस्तों में सीधे बैंक खाते में दिए जाते हैं।"
  },
  {
    scheme_id: "pm-fasal-bima",
    id: "pm-fasal-bima",
    name: "PM Fasal Bima Yojana / Bihar Fasal Sahayata",
    hindiName: "प्रधानमंत्री फसल बीमा / बिहार राज्य फसल सहायता योजना",
    tagline: "बाढ़, सुखाड़, कीट या बेमौसम बारिश से फसल नुकसान पर ₹7,500 - ₹10,000/हेक्टेयर मुआवजा",
    category: "kisan",
    categoryLabel: "कृषि एवं फसल सुरक्षा",
    level: "state",
    badgeColor: "bg-teal-500/10 text-teal-400 border-teal-500/30",
    icon: "ShieldCheck",
    benefit: "फसल नुकसान पर ₹7,500 से ₹10,000 प्रति हेक्टेयर",
    benefitDetail: "20% तक नुकसान पर ₹7,500/हेक्टेयर तथा 20% से अधिक नुकसान पर ₹10,000/हेक्टेयर (अधिकतम 2 हेक्टेयर)।",
    whoQualifies: "रैयत (जमीन मालिक) एवं गैर-रैयत (बटाईदार) दोनों तरह के किसान जिनकी फसल आपदा से बर्बाद हुई हो",
    eligibility: {
      min_age: 18,
      max_age: 100,
      gender: "any",
      occupations: ["farmer", "kisan", "bataidar", "agriculture"],
      income_max: null,
      social_category: ["general", "sc", "st", "obc", "ebc", "minority", "any"],
      land_required: false, // Bataidars eligible without land title
      disability_required: false,
      location: ["rural", "any"],
      education_level: "any",
      marital_status: "any",
      other_conditions: ["Crop sowed in notified area, suffered drought/flood/pest loss"]
    },
    documentsRequired: [
      "भू-स्वामित्व प्रमाण पत्र (LPC) या जमीन रसीद (रैयत हेतु)",
      "स्व-घोषणा प्रमाण पत्र (बटाईदार/गैर-रैयत हेतु वार्ड सदस्य सत्यापित)",
      "फसल बुआई प्रमाण पत्र",
      "आधार कार्ड व बैंक पासबुक"
    ],
    applySteps: [
      "सहकारिता विभाग पोर्टल pacsonline.bih.nic.in पर आवेदन करें।",
      "रैयत या गैर-रैयत श्रेणी चुनकर बुआई का रकबा भरें।",
      "दस्तावेज अपलोड करें। फसल कटाई सत्यापन उपरांत DBT से भुगतान होगा।"
    ],
    official_source_url: "https://state.bihar.gov.in/cooperative",
    officialLink: "https://state.bihar.gov.in/cooperative",
    last_verified: "2026-01-15",
    verified: true,
    audioExplanationHindi: "बिहार राज्य फसल सहायता योजना में फसल नुकसान होने पर बिना प्रीमियम के दस हजार रुपये प्रति हेक्टेयर तक का मुआवजा मिलता है।"
  },
  {
    scheme_id: "kisan-credit-card",
    id: "kisan-credit-card",
    name: "Kisan Credit Card (KCC) Scheme",
    hindiName: "किसान क्रेडिट कार्ड (KCC) ऋण योजना",
    tagline: "खेती व पशुपालन हेतु 4% रियायती ब्याज दर पर ₹3 लाख तक का आसान ऋण",
    category: "kisan",
    categoryLabel: "कृषि एवं किसान ऋण",
    level: "central",
    badgeColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
    icon: "CreditCard",
    benefit: "₹3,00,000 तक ऋण (मात्र 4% ब्याज पर)",
    benefitDetail: "समय पर चुकाने पर 3% ब्याज छूट (Subvention), प्रभावी ब्याज दर केवल 4% प्रतिवर्ष।",
    whoQualifies: "किसान, पशुपालक, मत्स्यपालक, बटाईदार एवं स्वयं सहायता समूह (SHG)",
    eligibility: {
      min_age: 18,
      max_age: 75,
      gender: "any",
      occupations: ["farmer", "kisan", "pashupalan", "dairy", "fisheries", "agriculture"],
      income_max: null,
      social_category: ["general", "sc", "st", "obc", "ebc", "minority", "any"],
      land_required: false,
      disability_required: false,
      location: ["rural", "urban", "any"],
      education_level: "any",
      marital_status: "any",
      other_conditions: ["Engaged in agriculture or allied animal husbandry/fishery"]
    },
    documentsRequired: [
      "आवेदन फॉर्म (KCC Form)",
      "आधार कार्ड एवं पैन कार्ड",
      "जमीन के कागजात / पशुपालन विवरण",
      "बैंक खाता विवरण व शपथ पत्र"
    ],
    applySteps: [
      "अपनी नजदीकी बैंक शाखा या CSC केंद्र पर जाएं।",
      "KCC आवेदन फॉर्म भरें और भूमि/पशुपालन रिकॉर्ड संलग्न करें।",
      "बैंक द्वारा 14 दिनों के भीतर KCC कार्ड जारी किया जाता है।"
    ],
    official_source_url: "https://myscheme.gov.in/schemes/kcc",
    officialLink: "https://myscheme.gov.in/schemes/kcc",
    last_verified: "2026-02-01",
    verified: true,
    audioExplanationHindi: "किसान क्रेडिट कार्ड से खेती और पशुपालन के लिए बहुत कम ब्याज दर पर तीन लाख रुपये तक का बैंक लोन मिलता है।"
  },
  {
    scheme_id: "bihar-diesel-subsidy",
    id: "bihar-diesel-subsidy",
    name: "Bihar Diesel Anudan Yojana",
    hindiName: "बिहार डीजल अनुदान योजना",
    tagline: "फसल सिंचाई के लिए ₹75 प्रति लीटर डीजल पर ₹750/एकड़ सब्सिडी",
    category: "kisan",
    categoryLabel: "कृषि सब्सिडी",
    level: "state",
    badgeColor: "bg-green-500/10 text-green-400 border-green-500/30",
    icon: "Wheat",
    benefit: "₹750 प्रति एकड़ प्रति सिंचाई (अधिकतम ₹6,000)",
    benefitDetail: "डीजल पंपसेट से खरीफ व रबी फसलों की सिंचाई पर प्रति एकड़ ₹750 की दर से अनुदान सीधे बैंक खाते में।",
    whoQualifies: "बिहार के सभी रैयत व गैर-रैयत किसान जो डीजल पंप से पटवन करते हैं",
    eligibility: {
      min_age: 18,
      max_age: 100,
      gender: "any",
      occupations: ["farmer", "kisan", "agriculture"],
      income_max: null,
      social_category: ["general", "sc", "st", "obc", "ebc", "minority", "any"],
      land_required: false,
      disability_required: false,
      location: ["rural", "any"],
      education_level: "any",
      marital_status: "any",
      other_conditions: ["Purchased diesel from authorized petrol pump in Bihar with valid receipt"]
    },
    documentsRequired: [
      "किसान पंजीकरण संख्या (DBT Agriculture Bihar)",
      "डीजल खरीद की कंप्यूटराइज्ड रसीद",
      "LPC / जमीन रसीद या गैर-रैयत सत्यापन",
      "आधार कार्ड व बैंक पासबुक"
    ],
    applySteps: [
      "dbtagriculture.bihar.gov.in पर जाएं।",
      "'डीजल अनुदान आवेदन' विकल्प चुनें।",
      "डीजल रसीद संख्या और सिंचाई का विवरण दर्ज कर सबमिट करें।"
    ],
    official_source_url: "https://dbtagriculture.bihar.gov.in",
    officialLink: "https://dbtagriculture.bihar.gov.in",
    last_verified: "2026-01-20",
    verified: true,
    audioExplanationHindi: "बिहार डीजल अनुदान में खेतों की सिंचाई के लिए डीजल पर प्रति एकड़ सात सौ पचास रुपये का सरकारी अनुदान मिलता है।"
  },
  {
    scheme_id: "pm-krishi-sinchayee",
    id: "pm-krishi-sinchayee",
    name: "PM Krishi Sinchayee Yojana (Micro Irrigation)",
    hindiName: "प्रधानमंत्री कृषि सिंचाई योजना (ड्रिप व स्प्रिंकलर सब्सिडी)",
    tagline: "ड्रिप एवं फव्वारा सिंचाई उपकरण लगाने पर 55% से 80% सरकारी सब्सिडी",
    category: "kisan",
    categoryLabel: "कृषि उपकरण",
    level: "central",
    badgeColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
    icon: "Wheat",
    benefit: "उपकरण लागत पर 55% से 80% तक सब्सिडी",
    benefitDetail: "ड्रिप और स्प्रिंकलर सिस्टम पर लघु/सीमांत किसानों को 80% तक अनुदान (बिहार टॉप-अप सहित)।",
    whoQualifies: "कृषि भूमि व निजी जल स्रोत (बोरवेल/तालाब) रखने वाले किसान",
    eligibility: {
      min_age: 18,
      max_age: 100,
      gender: "any",
      occupations: ["farmer", "kisan", "agriculture"],
      income_max: null,
      social_category: ["general", "sc", "st", "obc", "ebc", "minority", "any"],
      land_required: true,
      disability_required: false,
      location: ["rural", "any"],
      education_level: "any",
      marital_status: "any",
      other_conditions: ["Valid water source for irrigation available on farm"]
    },
    documentsRequired: [
      "किसान पंजीकरण रसीद",
      "जमीन की अद्यतन रसीद / LPC",
      "आधार कार्ड व बिजली बिल / जल स्रोत प्रमाण",
      "बैंक पासबुक"
    ],
    applySteps: [
      "horticulture.bihar.gov.in या pmksy.gov.in पर आवेदन करें।",
      "माइक्रो इरीगेशन उपकरण व कंपनी का चयन करें।",
      "सत्यापन के बाद अनुदान राशि काट कर उपकरण स्थापित कराया जाता है।"
    ],
    official_source_url: "https://pmksy.gov.in",
    officialLink: "https://pmksy.gov.in",
    last_verified: "2026-01-10",
    verified: true,
    audioExplanationHindi: "ड्रिप और फव्वारा सिंचाई सिस्टम लगाने के लिए सरकार अस्सी प्रतिशत तक की भारी छूट यानी सब्सिडी देती है।"
  },

  // ==========================================
  // 2. HEALTH & MEDICAL INSURANCE (स्वास्थ्य एवं चिकित्सा)
  // ==========================================
  {
    scheme_id: "ayushman-bharat",
    id: "ayushman-bharat",
    name: "Ayushman Bharat (PM-JAY)",
    hindiName: "आयुष्मान भारत - प्रधानमंत्री जन आरोग्य योजना",
    tagline: "हर पात्र परिवार को ₹5 लाख तक का सालाना मुफ्त एवं कैशलेस इलाज",
    category: "health",
    categoryLabel: "स्वास्थ्य एवं परिवार",
    level: "central",
    badgeColor: "bg-rose-500/10 text-rose-400 border-rose-500/30",
    icon: "HeartPulse",
    benefit: "₹5,00,000 / वर्ष मुफ्त इलाज",
    benefitDetail: "सरकारी और सूचीबद्ध निजी अस्पतालों में भर्ती होने, ऑपरेशन, जांच व दवाओं का 100% कैशलेस खर्च।",
    whoQualifies: "राशन कार्ड धारक (NFSA) / SECC 2011 सूची में शामिल गरीब, ग्रामीण व असंगठित कामगार परिवार",
    eligibility: {
      min_age: 0,
      max_age: 120,
      gender: "any",
      occupations: ["laborer", "daily-wager", "mazdoor", "farmer", "unemployed", "small-business", "any"],
      income_max: 250000,
      social_category: ["general", "sc", "st", "obc", "ebc", "minority", "any"],
      land_required: false,
      disability_required: false,
      location: ["rural", "urban", "any"],
      education_level: "any",
      marital_status: "any",
      other_conditions: ["Must have Ration Card or be listed in SECC database"]
    },
    documentsRequired: [
      "राशन कार्ड (Ration Card)",
      "परिवार के सभी सदस्यों का आधार कार्ड",
      "आधार लिंक मोबाइल नंबर"
    ],
    applySteps: [
      "beneficiary.nha.gov.in पर राशन कार्ड या आधार से अपनी पात्रता चेक करें।",
      "नजदीकी CSC या सरकारी अस्पताल (सदर अस्पताल) में e-KYC कराएं।",
      "आयुष्मान गोल्डन कार्ड डाउनलोड करें और सूचीबद्ध अस्पताल में इलाज पाएं।"
    ],
    official_source_url: "https://beneficiary.nha.gov.in",
    officialLink: "https://beneficiary.nha.gov.in",
    last_verified: "2026-02-01",
    verified: true,
    audioExplanationHindi: "आयुष्मान भारत योजना में पूरे परिवार को हर साल पांच लाख रुपये तक का अस्पताल में मुफ्त इलाज मिलता है।"
  },
  {
    scheme_id: "janani-suraksha",
    id: "janani-suraksha",
    name: "Janani Suraksha Yojana (JSY)",
    hindiName: "जननी सुरक्षा योजना (JSY)",
    tagline: "गर्भवती महिलाओं को सरकारी अस्पताल में प्रसव कराने पर ₹1,400 नकद सहायता",
    category: "health",
    categoryLabel: "मातृ एवं शिशु स्वास्थ्य",
    level: "central",
    badgeColor: "bg-pink-500/10 text-pink-400 border-pink-500/30",
    icon: "HeartPulse",
    benefit: "₹1,400 ग्रामीण / ₹1,000 शहरी नकद सहायता",
    benefitDetail: "सरकारी स्वास्थ्य केंद्र पर संस्थागत प्रसव (Delivery) कराने पर प्रसूति माता को पोषण व देखभाल हेतु आर्थिक मदद।",
    whoQualifies: "19 वर्ष या अधिक आयु की गर्भवती महिलाएं (ग्रामीण व शहरी बिहार)",
    eligibility: {
      min_age: 19,
      max_age: 50,
      gender: "female",
      occupations: ["any"],
      income_max: null,
      social_category: ["sc", "st", "obc", "ebc", "general", "minority", "any"],
      land_required: false,
      disability_required: false,
      location: ["rural", "urban", "any"],
      education_level: "any",
      marital_status: "married",
      other_conditions: ["Pregnant woman opting for institutional delivery at Govt health facility"]
    },
    documentsRequired: [
      "मातृ एवं शिशु सुरक्षा कार्ड (MCP Card / ANC Card)",
      "आधार कार्ड",
      "बैंक पासबुक (महिला के नाम पर)",
      "प्रसव डिस्चार्ज स्लिप"
    ],
    applySteps: [
      "आशा (ASHA) कार्यकर्ता या नजदीकी प्राथमिक स्वास्थ्य केंद्र (PHC) पर पंजीकरण कराएं।",
      "सरकारी अस्पताल में सुरक्षित प्रसव कराएं।",
      "डिस्चार्ज के समय अस्पताल द्वारा सीधे बैंक खाते में भुगतान किया जाता है।"
    ],
    official_source_url: "https://nhm.gov.in",
    officialLink: "https://nhm.gov.in",
    last_verified: "2026-01-15",
    verified: true,
    audioExplanationHindi: "जननी सुरक्षा योजना में सरकारी अस्पताल में बच्चा होने पर माता को चौदह सौ रुपये की नकद सहायता सीधे खाते में मिलती है।"
  },
  {
    scheme_id: "nikshay-poshan",
    id: "nikshay-poshan",
    name: "Nikshay Poshan Yojana (TB Nutritional Support)",
    hindiName: "निक्षय पोषण योजना (टीबी मरीज सहायता)",
    tagline: "टीबी (TB) मरीजों को इलाज के दौरान ₹500 से ₹1,000 प्रति माह पोषण सहायता",
    category: "health",
    categoryLabel: "स्वास्थ्य सहायता",
    level: "central",
    badgeColor: "bg-red-500/10 text-red-400 border-red-500/30",
    icon: "HeartPulse",
    benefit: "₹1,000 / महीना (इलाज चलने तक)",
    benefitDetail: "टीबी से पीड़ित मरीजों को संपूर्ण उपचार अवधि तक पौष्टिक आहार हेतु सीधे बैंक खाते (DBT) में मासिक राशि।",
    whoQualifies: "निक्षय पोर्टल पर पंजीकृत सभी टीबी (Tuberculosis) के मरीज",
    eligibility: {
      min_age: 0,
      max_age: 100,
      gender: "any",
      occupations: ["any"],
      income_max: null,
      social_category: ["any"],
      land_required: false,
      disability_required: false,
      location: ["rural", "urban", "any"],
      education_level: "any",
      marital_status: "any",
      other_conditions: ["Diagnosed TB patient undergoing DOTS or notified private treatment"]
    },
    documentsRequired: [
      "आधार कार्ड",
      "टीबी जांच रिपोर्ट एवं डॉक्टर का पर्चा",
      "बैंक पासबुक विवरण",
      "निक्षय आईडी (स्वास्थ्य केंद्र द्वारा प्रदत्त)"
    ],
    applySteps: [
      "नजदीकी सरकारी अस्पताल या टीबी केंद्र में जांच कराएं।",
      "डॉट्स (DOTS) केंद्र पर अपनी निक्षय आईडी व बैंक खाता पंजीकृत कराएं।",
      "इलाज के दौरान हर महीने पोषण राशि सीधे बैंक में आएगी।"
    ],
    official_source_url: "https://nikshay.in",
    officialLink: "https://nikshay.in",
    last_verified: "2026-01-15",
    verified: true,
    audioExplanationHindi: "निक्षय पोषण योजना में टीबी के मरीजों को पौष्टिक खाने के लिए इलाज चलने तक हर महीने बैंक में सहायता राशि दी जाती है।"
  },
  {
    scheme_id: "niramaya-health",
    id: "niramaya-health",
    name: "Niramaya Health Insurance for Divyangjan",
    hindiName: "निरामय स्वास्थ्य बीमा योजना (दिव्यांगजन)",
    tagline: "ऑटिज्म, सेरेब्रल पाल्सी, मानसिक मंदता एवं बहु-दिव्यांगता हेतु ₹1 लाख स्वास्थ्य बीमा",
    category: "health",
    categoryLabel: "दिव्यांग स्वास्थ्य",
    level: "central",
    badgeColor: "bg-purple-500/10 text-purple-400 border-purple-500/30",
    icon: "HeartPulse",
    benefit: "₹1,00,000 प्रति वर्ष कैशलेस स्वास्थ्य बीमा",
    benefitDetail: "ओपीडी (OPD), अस्पताल में भर्ती, फिजियोथेरेपी, स्पीच थेरेपी, सर्जरी और दवाओं का पूरा खर्च।",
    whoQualifies: "ऑटिज्म, सेरेब्रल पाल्सी, मानसिक मंदता या बहु-दिव्यांगता से ग्रस्त व्यक्ति",
    eligibility: {
      min_age: 0,
      max_age: 100,
      gender: "any",
      occupations: ["any"],
      income_max: null,
      social_category: ["any"],
      land_required: false,
      disability_required: true,
      location: ["rural", "urban", "any"],
      education_level: "any",
      marital_status: "any",
      other_conditions: ["Person with Autism, Cerebral Palsy, Mental Retardation or Multiple Disabilities"]
    },
    documentsRequired: [
      "दिव्यांगता प्रमाण पत्र (Disability Certificate / UDID)",
      "आधार कार्ड (दिव्यांग व अभिभावक का)",
      "बीपीएल कार्ड या आय प्रमाण पत्र (गरीब परिवारों हेतु प्रीमियम निःशुल्क)",
      "बैंक पासबुक व पासपोर्ट फोटो"
    ],
    applySteps: [
      "thenationaltrust.gov.in पोर्टल पर जाएं।",
      "पंजीकृत गैर-सरकारी संस्था (RO) या CSC के माध्यम से आवेदन करें।",
      "निरामय हेल्थ कार्ड प्राप्त कर उपचार हेतु नेटवर्क अस्पतालों में उपयोग करें।"
    ],
    official_source_url: "https://thenationaltrust.gov.in",
    officialLink: "https://thenationaltrust.gov.in",
    last_verified: "2026-02-01",
    verified: true,
    audioExplanationHindi: "निरामय योजना में विशेष दिव्यांगजनों को एक लाख रुपये तक का मुफ्त इलाज और थेरेपी का स्वास्थ्य बीमा मिलता है।"
  },

  // ==========================================
  // 3. EDUCATION, SCHOLARSHIPS & SKILLS (शिक्षा एवं छात्रवृत्ति)
  // ==========================================
  {
    scheme_id: "kanya-utthan",
    id: "kanya-utthan",
    name: "Mukhyamantri Kanya Utthan Yojana",
    hindiName: "मुख्यमंत्री कन्या उत्थान योजना (बिहार)",
    tagline: "इंटर पास करने पर ₹25,000 तथा स्नातक (Graduation) पास करने पर ₹50,000 प्रोत्साहन",
    category: "women",
    categoryLabel: "महिला एवं बालिका कल्याण",
    level: "state",
    badgeColor: "bg-pink-500/10 text-pink-400 border-pink-500/30",
    icon: "GraduationCap",
    benefit: "₹25,000 (12वीं पास) / ₹50,000 (स्नातक पास)",
    benefitDetail: "12वीं पास अविवाहित छात्राओं को ₹25,000 तथा स्नातक पास सभी छात्राओं को ₹50,000 सीधे बैंक खाते में।",
    whoQualifies: "बिहार की छात्राएं जिन्होंने मान्यता प्राप्त बोर्ड/कॉलेज से 12वीं या स्नातक उत्तीर्ण किया हो",
    eligibility: {
      min_age: 16,
      max_age: 32,
      gender: "female",
      occupations: ["student", "unemployed", "any"],
      income_max: null,
      social_category: ["general", "sc", "st", "obc", "ebc", "minority", "any"],
      land_required: false,
      disability_required: false,
      location: ["rural", "urban", "any"],
      education_level: "12th_or_graduate",
      marital_status: "any",
      other_conditions: ["Bihar Domicile resident, bank account in Bihar bank branch"]
    },
    documentsRequired: [
      "12वीं या स्नातक की अंकतालिका (Marksheet) व एडमिट कार्ड",
      "छात्रा का आधार कार्ड (बिहार का पता)",
      "छात्रा के अपने नाम का बैंक खाता (बिहार राज्य में)",
      "बिहार का मूल निवास प्रमाण पत्र (Residential Certificate)"
    ],
    applySteps: [
      "medhasoft.bih.nic.in पोर्टल पर जाएं।",
      "Kanya Utthan लिंक पर अपना रोल नंबर व रजिस्ट्रेशन नंबर दर्ज करें।",
      "आधार व बैंक खाता सत्यापित कर ऑनलाइन आवेदन सबमिट करें।"
    ],
    official_source_url: "https://medhasoft.bih.nic.in",
    officialLink: "https://medhasoft.bih.nic.in",
    last_verified: "2026-02-01",
    verified: true,
    audioExplanationHindi: "कन्या उत्थान योजना में बिहार की बेटियों को बारहवीं पास करने पर पच्चीस हजार और ग्रेजुएशन पास करने पर पचास हजार रुपये की सरकारी मदद मिलती है।"
  },
  {
    scheme_id: "student-credit-card",
    id: "student-credit-card",
    name: "Bihar Student Credit Card Yojana (MNSSBY)",
    hindiName: "बिहार स्टूडेंट क्रेडिट कार्ड योजना",
    tagline: "12वीं के बाद उच्च शिक्षा (B.Tech, MBBS, BCA, B.Sc) हेतु ₹4 लाख तक 0%-1% रियायती शिक्षा ऋण",
    category: "student",
    categoryLabel: "उच्च शिक्षा ऋण",
    level: "state",
    badgeColor: "bg-cyan-500/10 text-cyan-400 border-cyan-500/30",
    icon: "CreditCard",
    benefit: "₹4,00,000 तक शिक्षा ऋण (मात्र 0% से 1% ब्याज)",
    benefitDetail: "लड़कियों, दिव्यांगों व ट्रांसजेंडर्स को मात्र 1% तथा लड़कों को 4% साधारण ब्याज, भुगतान नौकरी लगने के बाद शुरू।",
    whoQualifies: "बिहार के 12वीं पास छात्र (आयु 25 वर्ष से कम) जो मान्यता प्राप्त संस्थान में उच्च शिक्षा प्राप्त कर रहे हैं",
    eligibility: {
      min_age: 17,
      max_age: 25,
      gender: "any",
      occupations: ["student"],
      income_max: null,
      social_category: ["general", "sc", "st", "obc", "ebc", "minority", "any"],
      land_required: false,
      disability_required: false,
      location: ["rural", "urban", "any"],
      education_level: "12th_pass",
      marital_status: "any",
      other_conditions: ["Bihar Domicile, enrolled in recognized degree/diploma course"]
    },
    documentsRequired: [
      "10वीं और 12वीं की मार्कशीट व प्रमाण पत्र",
      "कॉलेज का एडमिशन लेटर एवं फीस स्ट्रक्चर",
      "छात्र व माता/पिता का आधार कार्ड व पैन कार्ड",
      "बिहार निवास प्रमाण पत्र व बैंक पासबुक"
    ],
    applySteps: [
      "7nishchay-yuvaupmission.bihar.gov.in पर ऑनलाइन रजिस्ट्रेशन करें।",
      "आवेदन रसीद लेकर अपने जिले के DRCC (जिला निबंधन परामर्श केंद्र) जाएं।",
      "सत्यापन उपरांत बैंक द्वारा सीधे कॉलेज को फीस का भुगतान किया जाएगा।"
    ],
    official_source_url: "https://www.7nishchay-yuvaupmission.bihar.gov.in",
    officialLink: "https://www.7nishchay-yuvaupmission.bihar.gov.in",
    last_verified: "2026-02-01",
    verified: true,
    audioExplanationHindi: "बिहार स्टूडेंट क्रेडिट कार्ड में बारहवीं के बाद कॉलेज की पढ़ाई और रहने-खाने के लिए सरकार चार लाख रुपये तक का आसान लोन देती है।"
  },
  {
    scheme_id: "nsp-scholarship",
    id: "nsp-scholarship",
    name: "National Scholarship Portal (Post-Matric SC/ST/OBC)",
    hindiName: "राष्ट्रीय छात्रवृत्ति पोर्टल (पोस्ट-मैट्रिक छात्रवृत्ति)",
    tagline: "SC/ST/OBC/EBC छात्रों को ₹2,500 से ₹25,000 सालाना ट्यूशन फीस व रखरखाव भत्ता",
    category: "student",
    categoryLabel: "छात्रवृत्ति एवं शिक्षा",
    level: "central",
    badgeColor: "bg-indigo-500/10 text-indigo-400 border-indigo-500/30",
    icon: "BookOpen",
    benefit: "₹2,500 से ₹25,000 / वर्ष",
    benefitDetail: "11वीं, 12वीं, आईटीआई, पॉलिटेक्निक, कॉलेज व यूनिवर्सिटी में पढ़ने वाले आरक्षित वर्ग के छात्रों को पूर्ण फीस प्रतिपूर्ति।",
    whoQualifies: "SC/ST (पारिवारिक आय ₹2.5 लाख से कम) एवं OBC/EBC (पारिवारिक आय ₹1.5 लाख से कम) छात्र",
    eligibility: {
      min_age: 14,
      max_age: 35,
      gender: "any",
      occupations: ["student"],
      income_max: 250000,
      social_category: ["sc", "st", "obc", "ebc", "minority"],
      land_required: false,
      disability_required: false,
      location: ["rural", "urban", "any"],
      education_level: "10th_pass_or_higher",
      marital_status: "any",
      other_conditions: ["Minimum 50% marks in previous examination, regular student"]
    },
    documentsRequired: [
      "जाति प्रमाण पत्र (Caste Certificate)",
      "पारिवारिक आय प्रमाण पत्र (Income < ₹2.5L)",
      "पिछली कक्षा की मार्कशीट व वर्तमान कॉलेज फीस रसीद",
      "आधार कार्ड व आधार-सीडेड बैंक पासबुक"
    ],
    applySteps: [
      "scholarships.gov.in पर OTR (One Time Registration) करें।",
      "Post-Matric Scholarship फॉर्म भरें व दस्तावेज अपलोड करें।",
      "कॉलेज नोडल अधिकारी से आवेदन सत्यापित कराएं।"
    ],
    official_source_url: "https://scholarships.gov.in",
    officialLink: "https://scholarships.gov.in",
    last_verified: "2026-01-20",
    verified: true,
    audioExplanationHindi: "राष्ट्रीय छात्रवृत्ति पोर्टल पर आरक्षित और कमजोर वर्ग के विद्यार्थियों को उनकी पढ़ाई और कॉलेज की फीस के लिए सरकारी स्कॉलरशिप मिलती है।"
  },
  {
    scheme_id: "begum-hazrat-mahal",
    id: "begum-hazrat-mahal",
    name: "Begum Hazrat Mahal National Scholarship",
    hindiName: "बेगम हजरत महल राष्ट्रीय छात्रवृत्ति",
    tagline: "अल्पसंख्यक (मुस्लिम, ईसाई, सिख, बौद्ध, जैन) छात्राओं को ₹5,000 से ₹6,000 सालाना छात्रवृत्ति",
    category: "student",
    categoryLabel: "अल्पसंख्यक बालिका छात्रवृत्ति",
    level: "central",
    badgeColor: "bg-purple-500/10 text-purple-400 border-purple-500/30",
    icon: "GraduationCap",
    benefit: "₹5,000 (कक्षा 9-10) / ₹6,000 (कक्षा 11-12)",
    benefitDetail: "मेधावी अल्पसंख्यक छात्राओं को उच्च स्कूली शिक्षा जारी रखने हेतु सीधे बैंक खाते में आर्थिक सहायता।",
    whoQualifies: "अल्पसंख्यक समुदाय (मुस्लिम, ईसाई, सिख, बौद्ध, पारसी, जैन) की छात्राएं, पारिवारिक आय ₹2 लाख से कम",
    eligibility: {
      min_age: 13,
      max_age: 20,
      gender: "female",
      occupations: ["student"],
      income_max: 200000,
      social_category: ["minority"],
      land_required: false,
      disability_required: false,
      location: ["rural", "urban", "any"],
      education_level: "school_9_to_12",
      marital_status: "unmarried",
      other_conditions: ["Secured minimum 50% marks in previous aggregate class"]
    },
    documentsRequired: [
      "अल्पसंख्यक स्व-घोषणा प्रमाण पत्र",
      "पारिवारिक आय प्रमाण पत्र (Income < ₹2L)",
      "पिछली कक्षा की मार्कशीट",
      "स्कूल का बोनाफाइड सर्टिफिकेट व आधार कार्ड"
    ],
    applySteps: [
      "scholarships.gov.in (NSP) पर बेगम हजरत महल स्कीम चुनें।",
      "दस्तावेज अपलोड करें और स्कूल प्रिंसिपल से सत्यापित कराएं।"
    ],
    official_source_url: "https://scholarships.gov.in",
    officialLink: "https://scholarships.gov.in",
    last_verified: "2026-01-20",
    verified: true,
    audioExplanationHindi: "बेगम हजरत महल छात्रवृत्ति में अल्पसंख्यक वर्ग की छात्राओं को नौवीं से बारहवीं तक की पढ़ाई के लिए सालाना सरकारी सहायता मिलती है।"
  },
  {
    scheme_id: "kushal-yuva-program",
    id: "kushal-yuva-program",
    name: "Kushal Yuva Program (KYP Bihar)",
    hindiName: "कुशल युवा कार्यक्रम (KYP)",
    tagline: "10वीं/12वीं पास युवाओं को 240 घंटे का मुफ्त कंप्यूटर, हिंदी-अंग्रेजी संवाद व सॉफ्ट स्किल्स प्रशिक्षण",
    category: "student",
    categoryLabel: "कौशल विकास",
    level: "state",
    badgeColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
    icon: "Laptop",
    benefit: "निःशुल्क 3 महीने का कंप्यूटर व भाषा कोर्स + सरकारी प्रमाण पत्र",
    benefitDetail: "BS-CIT (Computer Skills), BS-CLS (Communication Hindi/English), BS-CSS (Soft Skills) की व्यावहारिक ट्रेनिंग।",
    whoQualifies: "बिहार के 10वीं या 12वीं पास युवा (उम्र 15 से 28 वर्ष, SC/ST/दिव्यांग हेतु 33 वर्ष तक)",
    eligibility: {
      min_age: 15,
      max_age: 28,
      gender: "any",
      occupations: ["student", "unemployed", "job-seeker", "any"],
      income_max: null,
      social_category: ["general", "sc", "st", "obc", "ebc", "minority", "any"],
      land_required: false,
      disability_required: false,
      location: ["rural", "urban", "any"],
      education_level: "10th_pass_or_higher",
      marital_status: "any",
      other_conditions: ["Resident of Bihar, age relaxation for SC/ST/OBC/Divyang"]
    },
    documentsRequired: [
      "10वीं या 12वीं की मार्कशीट",
      "आधार कार्ड व निवास प्रमाण पत्र",
      "बैंक पासबुक विवरण (सुरक्षा राशि ₹1,000 हेतु जो कोर्स पूरा होने पर वापस मिल जाती है)"
    ],
    applySteps: [
      "7nishchay-yuvaupmission.bihar.gov.in पर ऑनलाइन फॉर्म भरें।",
      "DRCC केंद्र पर जाकर सत्यापन कराएं।",
      "अपने ब्लॉक के किसी भी KYP केंद्र पर जाकर क्लास शुरू करें।"
    ],
    official_source_url: "https://skillmissionbihar.org",
    officialLink: "https://skillmissionbihar.org",
    last_verified: "2026-02-01",
    verified: true,
    audioExplanationHindi: "कुशल युवा कार्यक्रम में बिहार के युवाओं को बेसिक कंप्यूटर और अंग्रेजी-हिंदी में बातचीत करने का हुनर तीन महीने तक बिल्कुल मुफ्त सिखाया जाता है।"
  },
  {
    scheme_id: "pm-kaushal-vikas",
    id: "pm-kaushal-vikas",
    name: "PM Kaushal Vikas Yojana 4.0 (PMKVY)",
    hindiName: "प्रधानमंत्री कौशल विकास योजना (PMKVY)",
    tagline: "युवाओं को उद्योग-आधारित 40+ ट्रेड्स में मुफ्त कौशल प्रशिक्षण व ₹8,000 तक मानदेय व सर्टिफिकेट",
    category: "student",
    categoryLabel: "रोजगार प्रशिक्षण",
    level: "central",
    badgeColor: "bg-blue-500/10 text-blue-400 border-blue-500/30",
    icon: "Laptop",
    benefit: "मुफ्त ट्रेनिंग, राष्ट्रीय स्किल सर्टिफिकेट एवं प्लेसमेंट सहायता",
    benefitDetail: "इलेक्ट्रिशियन, सोलर, ऑटोमोबाइल, आईटी, हेल्थकेयर, सिलाई, रिटेल आदि क्षेत्रों में व्यावहारिक ट्रेनिंग।",
    whoQualifies: "15 से 45 वर्ष के स्कूल/कॉलेज ड्रॉपआउट्स या बेरोजगार युवा",
    eligibility: {
      min_age: 15,
      max_age: 45,
      gender: "any",
      occupations: ["unemployed", "job-seeker", "laborer", "any"],
      income_max: null,
      social_category: ["general", "sc", "st", "obc", "ebc", "minority", "any"],
      land_required: false,
      disability_required: false,
      location: ["rural", "urban", "any"],
      education_level: "any",
      marital_status: "any",
      other_conditions: ["Indian citizen seeking vocational skill enhancement"]
    },
    documentsRequired: [
      "आधार कार्ड",
      "अंतिम शैक्षणिक योग्यता प्रमाण पत्र",
      "बैंक पासबुक व पासपोर्ट फोटो"
    ],
    applySteps: [
      "pmkvyofficial.org पर जाएं और नजदीकी PMKVY ट्रेनिंग सेंटर खोजें।",
      "पसंदीदा कोर्स चुनकर सेंटर पर एडमिशन लें।",
      "सफलतापूर्वक असेसमेंट पास करने पर स्किल इंडिया सर्टिफिकेट प्राप्त करें।"
    ],
    official_source_url: "https://www.pmkvyofficial.org",
    officialLink: "https://www.pmkvyofficial.org",
    last_verified: "2026-01-15",
    verified: true,
    audioExplanationHindi: "प्रधानमंत्री कौशल विकास योजना में युवाओं को अपनी पसंद के काम की मुफ्त ट्रेनिंग और सरकारी सर्टिफिकेट दिया जाता है।"
  },

  // ==========================================
  // 4. WOMEN & CHILD WELFARE (महिला एवं बाल विकास)
  // ==========================================
  {
    scheme_id: "pmmvy-matru-vandana",
    id: "pmmvy-matru-vandana",
    name: "Pradhan Mantri Matru Vandana Yojana (PMMVY)",
    hindiName: "प्रधानमंत्री मातृ वंदना योजना",
    tagline: "पहले बच्चे के जन्म पर ₹5,000 तथा दूसरी संतान कन्या होने पर ₹6,000 मातृत्व सहायता",
    category: "women",
    categoryLabel: "मातृत्व पोषण सहायता",
    level: "central",
    badgeColor: "bg-pink-500/10 text-pink-400 border-pink-500/30",
    icon: "HeartPulse",
    benefit: "₹5,000 (प्रथम संतान) / ₹6,000 (दूसरी संतान बालिका होने पर)",
    benefitDetail: "गर्भवती व स्तनपान कराने वाली माताओं के पोषण और मजदूरी क्षतिपूर्ति हेतु किस्तों में DBT भुगतान।",
    whoQualifies: "गर्भवती एवं धात्री माताएं (सरकारी नियमित कर्मचारियों को छोड़कर, बीपीएल/ई-श्रम/राशन कार्ड धारक)",
    eligibility: {
      min_age: 19,
      max_age: 50,
      gender: "female",
      occupations: ["any"],
      income_max: null,
      social_category: ["sc", "st", "obc", "ebc", "general", "minority", "any"],
      land_required: false,
      disability_required: false,
      location: ["rural", "urban", "any"],
      education_level: "any",
      marital_status: "married",
      other_conditions: ["First pregnancy, or second delivery if newborn is girl child"]
    },
    documentsRequired: [
      "मातृ एवं शिशु सुरक्षा कार्ड (MCP Card)",
      "माता एवं पिता का आधार कार्ड",
      "महिला के नाम का आधार-लिंक बैंक खाता",
      "शिशु का जन्म प्रमाण पत्र (दूसरी किस्त हेतु)"
    ],
    applySteps: [
      "pmmvy.wcd.gov.in पोर्टल पर ऑनलाइन आवेदन करें या आंगनवाड़ी केंद्र / आशा से संपर्क करें।",
      "गर्भावस्था पंजीकरण व टीकाकरण विवरण दर्ज कराएं।",
      "राशि सीधे महिला के बैंक खाते में ट्रांसफर होगी।"
    ],
    official_source_url: "https://pmmvy.wcd.gov.in",
    officialLink: "https://pmmvy.wcd.gov.in",
    last_verified: "2026-02-01",
    verified: true,
    audioExplanationHindi: "मातृ वंदना योजना में गर्भवती महिलाओं को अच्छे खान-पान के लिए पांच से छह हजार रुपये की आर्थिक सहायता मिलती है।"
  },
  {
    scheme_id: "sukanya-samriddhi",
    id: "sukanya-samriddhi",
    name: "Sukanya Samriddhi Yojana (SSY)",
    hindiName: "सुकन्या समृद्धि योजना (SSY)",
    tagline: "10 वर्ष से कम उम्र की बेटी के नाम पर 8.2% सर्वोच्च ब्याज दर व टैक्स-फ्री बचत खाता",
    category: "women",
    categoryLabel: "बालिका बचत योजना",
    level: "central",
    badgeColor: "bg-pink-500/10 text-pink-400 border-pink-500/30",
    icon: "GraduationCap",
    benefit: "8.2% वार्षिक ब्याज + 21 वर्ष में परिपक्वता पर मोटी रकम + 100% टैक्स फ्री",
    benefitDetail: "न्यूनतम ₹250 सालाना जमा से खाता खुलता है, 18 वर्ष की आयु में उच्च शिक्षा हेतु 50% निकासी की अनुमति।",
    whoQualifies: "10 वर्ष से कम आयु की बालिका के माता-पिता या कानूनी अभिभावक",
    eligibility: {
      min_age: 0,
      max_age: 10,
      gender: "female",
      occupations: ["any"],
      income_max: null,
      social_category: ["any"],
      land_required: false,
      disability_required: false,
      location: ["rural", "urban", "any"],
      education_level: "any",
      marital_status: "unmarried",
      other_conditions: ["Girl child age 10 years or younger at the time of account opening"]
    },
    documentsRequired: [
      "बेटी का जन्म प्रमाण पत्र (Birth Certificate)",
      "अभिभावक का आधार कार्ड व पैन कार्ड",
      "निवास प्रमाण पत्र व पासपोर्ट फोटो",
      "प्रारंभिक जमा राशि (न्यूनतम ₹250)"
    ],
    applySteps: [
      "किसी भी डाकघर (Post Office) या अधिकृत बैंक शाखा में जाएं।",
      "SSY खाता खोलने का फॉर्म भरें और दस्तावेज जमा करें।",
      "पासबुक प्राप्त करें और ऑनलाइन/ऑफलाइन नियमित बचत करें।"
    ],
    official_source_url: "https://www.indiapost.gov.in",
    officialLink: "https://www.indiapost.gov.in",
    last_verified: "2026-01-10",
    verified: true,
    audioExplanationHindi: "सुकन्या समृद्धि योजना में बेटी के जन्म से दस साल की उम्र तक डाकघर में खाता खोलकर सबसे ज्यादा ब्याज के साथ भविष्य सुरक्षित किया जाता है।"
  },
  {
    scheme_id: "pm-ujjwala-yojana",
    id: "pm-ujjwala-yojana",
    name: "PM Ujjwala Yojana 2.0",
    hindiName: "प्रधानमंत्री उज्ज्वला योजना 2.0",
    tagline: "गरीब व बीपीएल परिवारों की महिलाओं को बिल्कुल मुफ्त एलपीजी गैस कनेक्शन + चूल्हा व पहला सिलेंडर",
    category: "women",
    categoryLabel: "स्वच्छ ईंधन",
    level: "central",
    badgeColor: "bg-orange-500/10 text-orange-400 border-orange-500/30",
    icon: "Home",
    benefit: "मुफ्त एलपीजी गैस कनेक्शन + चूल्हा + 1 भरा सिलेंडर + ₹300/सिलेंडर सब्सिडी",
    benefitDetail: "बिना किसी सिक्योरिटी डिपॉजिट के गैस कनेक्शन तथा प्रति 14.2 किलो सिलेंडर पर ₹300 की सीधी बैंक सब्सिडी।",
    whoQualifies: "18 वर्ष या अधिक आयु की वयस्क महिला, जिनके परिवार में पहले से कोई LPG कनेक्शन न हो (SC/ST/BPL/PMAY/Antyodaya)",
    eligibility: {
      min_age: 18,
      max_age: 100,
      gender: "female",
      occupations: ["any"],
      income_max: null,
      social_category: ["sc", "st", "obc", "ebc", "general", "minority", "any"],
      land_required: false,
      disability_required: false,
      location: ["rural", "urban", "any"],
      education_level: "any",
      marital_status: "any",
      other_conditions: ["No existing LPG connection in the applicant's household"]
    },
    documentsRequired: [
      "राशन कार्ड (परिवार के सदस्यों के नाम सहित)",
      "महिला का आधार कार्ड व बैंक पासबुक",
      "निवास प्रमाण पत्र व पासपोर्ट फोटो",
      "14 सूत्रीय स्व-घोषणा पत्र"
    ],
    applySteps: [
      "pmuy.gov.in पर ऑनलाइन आवेदन करें या नजदीकी गैस एजेंसी (Indane/HP/Bharat) जाएं।",
      "उज्ज्वला 2.0 फॉर्म भरकर दस्तावेज जमा करें।",
      "सत्यापन के बाद मुफ्त गैस कनेक्शन व चूल्हा प्राप्त करें।"
    ],
    official_source_url: "https://www.pmuy.gov.in",
    officialLink: "https://www.pmuy.gov.in",
    last_verified: "2026-02-01",
    verified: true,
    audioExplanationHindi: "उज्ज्वला योजना में गरीब परिवारों की महिलाओं को फ्री गैस कनेक्शन, चूल्हा, पहला सिलेंडर और सब्सिडी मिलती है।"
  },
  {
    scheme_id: "lakhpati-didi-jeevika",
    id: "lakhpati-didi-jeevika",
    name: "Lakhpati Didi / Jeevika SHG Mission (Bihar)",
    hindiName: "लखपति दीदी / जीविका स्वयं सहायता समूह (बिहार)",
    tagline: "महिला स्वयं सहायता समूहों को आजीविका, मुर्गीपालन, सिलाई व व्यापार हेतु ₹1 लाख से ₹5 लाख तक ऋण व सब्सिडी",
    category: "women",
    categoryLabel: "महिला स्वरोजगार",
    level: "state",
    badgeColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
    icon: "Briefcase",
    benefit: "₹1,00,000 से ₹5,00,000 तक कम ब्याज पर रिवाल्विंग फंड व बैंक लिंकेज ऋण",
    benefitDetail: "महिला स्वयं सहायता समूहों को कृषि, पशुपालन, सिलाई, किराना और सूक्ष्म उद्योग लगाने हेतु पूंजी व ट्रेनिंग।",
    whoQualifies: "बिहार जीविका (BRLPS) या ग्रामीण स्वयं सहायता समूह (SHG) से जुड़ी महिलाएं",
    eligibility: {
      min_age: 18,
      max_age: 60,
      gender: "female",
      occupations: ["shg-member", "daily-wager", "small-business", "unemployed", "any"],
      income_max: null,
      social_category: ["sc", "st", "obc", "ebc", "general", "minority", "any"],
      land_required: false,
      disability_required: false,
      location: ["rural", "any"],
      education_level: "any",
      marital_status: "any",
      other_conditions: ["Active member of a registered Self Help Group (SHG) in Bihar"]
    },
    documentsRequired: [
      "SHG सदस्यता विवरण व पासबुक",
      "महिला का आधार कार्ड व व्यक्तिगत बैंक खाता",
      "निवास प्रमाण पत्र व फोटो"
    ],
    applySteps: [
      "अपने गांव की जीविका ग्राम संगठन (VO) या ब्लॉक जीविका कार्यालय से संपर्क करें।",
      "आजीविका गतिविधि चुनकर माइक्रो-क्रेडिट प्लान (MCP) भरें।",
      "बैंक लिंकेज से ऋण प्राप्त कर अपना व्यवसाय शुरू करें।"
    ],
    official_source_url: "https://brlps.in",
    officialLink: "https://brlps.in",
    last_verified: "2026-01-20",
    verified: true,
    audioExplanationHindi: "जीविका लखपति दीदी योजना में स्वयं सहायता समूह की महिलाओं को दुकान या स्वरोजगार शुरू करने के लिए कम ब्याज पर पूंजी मिलती है।"
  },

  // ==========================================
  // 5. SENIOR CITIZENS & PENSION (वरिष्ठ नागरिक एवं पेंशन)
  // ==========================================
  {
    scheme_id: "vridhavastha-pension",
    id: "vridhavastha-pension",
    name: "Mukhyamantri Vridhajan Pension Yojana (MVPY Bihar)",
    hindiName: "मुख्यमंत्री वृद्धजन पेंशन योजना (बिहार)",
    tagline: "60 वर्ष से अधिक उम्र के बिहार के सभी बुजुर्गों को ₹400 से ₹500 आजीवन मासिक पेंशन",
    category: "elderly",
    categoryLabel: "बुजुर्ग सामाजिक सुरक्षा",
    level: "state",
    badgeColor: "bg-purple-500/10 text-purple-400 border-purple-500/30",
    icon: "Users",
    benefit: "₹400 / माह (60-79 वर्ष) | ₹500 / माह (80 वर्ष से अधिक)",
    benefitDetail: "आजीवन हर महीने सीधे बैंक खाते (DBT) में पेंशन, किसी जाति या आय सीमा का बंधन नहीं।",
    whoQualifies: "बिहार के 60 वर्ष या अधिक उम्र के सभी नागरिक (सरकारी/EPF पेंशन धारकों को छोड़कर)",
    eligibility: {
      min_age: 60,
      max_age: 120,
      gender: "any",
      occupations: ["elderly", "retired", "unemployed", "any"],
      income_max: null,
      social_category: ["general", "sc", "st", "obc", "ebc", "minority", "any"],
      land_required: false,
      disability_required: false,
      location: ["rural", "urban", "any"],
      education_level: "any",
      marital_status: "any",
      other_conditions: ["Resident of Bihar, not drawing any other government/statutory pension"]
    },
    documentsRequired: [
      "आधार कार्ड (आयु व पहचान सत्यापन हेतु)",
      "मतदाता पहचान पत्र (Voter ID Card)",
      "आधार-लिंक बैंक पासबुक",
      "बिहार निवास प्रमाण पत्र या राशन कार्ड",
      "स्व-घोषणा पत्र (कि अन्य कोई पेंशन नहीं मिल रही)"
    ],
    applySteps: [
      "RTPS बिहार पोर्टल serviceonline.bihar.gov.in पर जाएं या ब्लॉक RTPS काउंटर जाएं।",
      "समाज कल्याण विभाग सेवाएं में 'मुख्यमंत्री वृद्धजन पेंशन' चुनें।",
      "आधार बायोमेट्रिक/OTP से सत्यापन कर फॉर्म जमा करें।"
    ],
    official_source_url: "https://serviceonline.bihar.gov.in",
    officialLink: "https://serviceonline.bihar.gov.in",
    last_verified: "2026-02-01",
    verified: true,
    audioExplanationHindi: "बिहार के साठ साल से ऊपर के सभी बुजुर्ग दादा-दादी को जीवनभर हर महीने सरकारी पेंशन सीधे बैंक खाते में दी जाती है।"
  },
  {
    scheme_id: "widow-pension-bihar",
    id: "widow-pension-bihar",
    name: "Laxmibai Samajik Suraksha Pension / Widow Pension",
    hindiName: "लक्ष्मीबाई सामाजिक सुरक्षा पेंशन / विधवा पेंशन (बिहार)",
    tagline: "18 वर्ष से अधिक उम्र की विधवा महिलाओं को ₹400 प्रति माह आजीवन पेंशन",
    category: "elderly",
    categoryLabel: "महिला सामाजिक सुरक्षा",
    level: "state",
    badgeColor: "bg-pink-500/10 text-pink-400 border-pink-500/30",
    icon: "Users",
    benefit: "₹400 / महीना आजीवन पेंशन",
    benefitDetail: "पति की मृत्यु के उपरांत निराश्रित महिला को आर्थिक संबल प्रदान करने हेतु मासिक पेंशन।",
    whoQualifies: "18 वर्ष या अधिक आयु की विधवा महिलाएं (वार्षिक पारिवारिक आय ₹60,000 से कम या BPL सूची में शामिल)",
    eligibility: {
      min_age: 18,
      max_age: 120,
      gender: "female",
      occupations: ["any"],
      income_max: 60000,
      social_category: ["general", "sc", "st", "obc", "ebc", "minority", "any"],
      land_required: false,
      disability_required: false,
      location: ["rural", "urban", "any"],
      education_level: "any",
      marital_status: "widow",
      other_conditions: ["Widow status with husband's death certificate, Bihar resident"]
    },
    documentsRequired: [
      "पति का मृत्यु प्रमाण पत्र (Death Certificate)",
      "महिला का आधार कार्ड व वोटर कार्ड",
      "आय प्रमाण पत्र (वार्षिक आय < ₹60,000) या BPL सूची",
      "आधार-लिंक बैंक पासबुक व फोटो"
    ],
    applySteps: [
      "serviceonline.bihar.gov.in (RTPS) पर ऑनलाइन आवेदन करें।",
      "दस्तावेज अपलोड करें और ब्लॉक कार्यालय से पावती रसीद प्राप्त करें।",
      "BDO स्वीकृति के बाद हर माह पेंशन सीधे बैंक में आएगी।"
    ],
    official_source_url: "https://sspd.bih.nic.in",
    officialLink: "https://sspd.bih.nic.in",
    last_verified: "2026-01-20",
    verified: true,
    audioExplanationHindi: "लक्ष्मीबाई विधवा पेंशन योजना में पति की मृत्यु के बाद बहनों और माताओं को हर महीने चार सौ रुपये की पेंशन मिलती है।"
  },
  {
    scheme_id: "atal-pension-yojana",
    id: "atal-pension-yojana",
    name: "Atal Pension Yojana (APY)",
    hindiName: "अटल पेंशन योजना (APY)",
    tagline: "18-40 वर्ष के असंगठित कामगारों को 60 वर्ष की आयु के बाद ₹1,000 से ₹5,000 आजीवन गारंटीड पेंशन",
    category: "elderly",
    categoryLabel: "भविष्य पेंशन सुरक्षा",
    level: "central",
    badgeColor: "bg-purple-500/10 text-purple-400 border-purple-500/30",
    icon: "Users",
    benefit: "₹1,000 से ₹5,000 / माह (60 वर्ष के बाद गारंटीड)",
    benefitDetail: "छोटी मासिक बचत (जैसे मात्र ₹42 से ₹210 प्रति माह) से बुढ़ापे में निश्चित मासिक पेंशन, मृत्यु उपरांत पति/पत्नी को आजीवन पेंशन व बच्चों को कॉर्पस फंड।",
    whoQualifies: "18 से 40 वर्ष के सभी भारतीय नागरिक जिनका किसी बैंक/डाकघर में बचत खाता हो",
    eligibility: {
      min_age: 18,
      max_age: 40,
      gender: "any",
      occupations: ["laborer", "daily-wager", "farmer", "small-business", "unemployed", "any"],
      income_max: null,
      social_category: ["any"],
      land_required: false,
      disability_required: false,
      location: ["rural", "urban", "any"],
      education_level: "any",
      marital_status: "any",
      other_conditions: ["Non-income tax payer, saving bank account holder"]
    },
    documentsRequired: [
      "आधार कार्ड",
      "बचत बैंक खाता पासबुक (ऑटो-डेबिट सुविधा हेतु)",
      "मोबाइल नंबर व नॉमिनी का आधार"
    ],
    applySteps: [
      "अपनी बैंक शाखा या डाकघर में जाएं।",
      "APY पंजीकरण फॉर्म भरें और पेंशन राशि (₹1000 - ₹5000) चुनें।",
      "हर महीने खाते से छोटी राशि कटेगी और 60 वर्ष बाद जीवनभर पेंशन मिलेगी।"
    ],
    official_source_url: "https://www.npscra.nsdl.co.in",
    officialLink: "https://www.npscra.nsdl.co.in",
    last_verified: "2026-01-15",
    verified: true,
    audioExplanationHindi: "अटल पेंशन योजना में अभी से थोड़ी बचत करके साठ साल के बाद हर महीने पांच हजार रुपये तक की पक्की पेंशन पाई जा सकती है।"
  },
  {
    scheme_id: "rashtriya-vayoshri",
    id: "rashtriya-vayoshri",
    name: "Rashtriya Vayoshri Yojana (RVY)",
    hindiName: "राष्ट्रीय वयोश्री योजना",
    tagline: "बुजुर्गों को मुफ्त चश्मा, सुनने की मशीन (Hearing Aid), व्हीलचेयर, छड़ी व कृत्रिम दांत",
    category: "elderly",
    categoryLabel: "बुजुर्ग सहायक उपकरण",
    level: "central",
    badgeColor: "bg-purple-500/10 text-purple-400 border-purple-500/30",
    icon: "Users",
    benefit: "मुफ्त व्हीलचेयर, वॉकिंग स्टिक, हियरिंग एड, नजर का चश्मा व डेंचर",
    benefitDetail: "उम्र संबंधी शारीरिक अक्षमता से जूझ रहे गरीब वृद्धजनों को जीवन सुगम बनाने वाले सहायक उपकरण 100% मुफ्त।",
    whoQualifies: "60 वर्ष या अधिक उम्र के वरिष्ठ नागरिक, BPL परिवार या मासिक आय ₹15,000 से कम",
    eligibility: {
      min_age: 60,
      max_age: 120,
      gender: "any",
      occupations: ["elderly", "any"],
      income_max: 180000,
      social_category: ["any"],
      land_required: false,
      disability_required: false,
      location: ["rural", "urban", "any"],
      education_level: "any",
      marital_status: "any",
      other_conditions: ["Senior citizen suffering from age-related infirmities/disabilities"]
    },
    documentsRequired: [
      "आधार कार्ड / आयु प्रमाण",
      "BPL कार्ड या आय प्रमाण पत्र",
      "सरकारी डॉक्टर द्वारा उपकरण आवश्यकता पर्चा"
    ],
    applySteps: [
      "जिले में ALIMCO या सामाजिक सुरक्षा विभाग के कैंप में भाग लें।",
      "स्वास्थ्य जांच कराएं और मौके पर ही आवश्यक सहायक उपकरण मुफ्त प्राप्त करें।"
    ],
    official_source_url: "https://alimco.in",
    officialLink: "https://alimco.in",
    last_verified: "2026-01-10",
    verified: true,
    audioExplanationHindi: "राष्ट्रीय वयोश्री योजना में गरीब बुजुर्गों को चलने की लाठी, चश्मा, कान की मशीन और व्हीलचेयर सरकार द्वारा मुफ्त दी जाती है।"
  },

  // ==========================================
  // 6. DISABILITY (DIVYANGJAN) WELFARE (दिव्यांगजन कल्याण)
  // ==========================================
  {
    scheme_id: "divyang-pension-bihar",
    id: "divyang-pension-bihar",
    name: "Bihar Rajya Divyangjan Pension Yojana",
    hindiName: "बिहार राज्य दिव्यांगजन पेंशन योजना",
    tagline: "40% या अधिक दिव्यांगता वाले सभी व्यक्तियों को ₹500 प्रति माह आजीवन पेंशन",
    category: "disability",
    categoryLabel: "दिव्यांग सामाजिक सुरक्षा",
    level: "state",
    badgeColor: "bg-purple-500/10 text-purple-400 border-purple-500/30",
    icon: "Users",
    benefit: "₹500 / महीना आजीवन पेंशन",
    benefitDetail: "न्यूनतम 40% दिव्यांगता प्रमाण पत्र धारक को प्रति माह सीधे बैंक खाते में भरण-पोषण सहायता।",
    whoQualifies: "बिहार के निवासी, न्यूनतम 40% दिव्यांगता (शारीरिक, दृष्टि, श्रवण, मानसिक आदि)",
    eligibility: {
      min_age: 0,
      max_age: 100,
      gender: "any",
      occupations: ["any"],
      income_max: null,
      social_category: ["any"],
      land_required: false,
      disability_required: true,
      location: ["rural", "urban", "any"],
      education_level: "any",
      marital_status: "any",
      other_conditions: ["Minimum 40% benchmark disability certified by competent medical authority, Bihar resident"]
    },
    documentsRequired: [
      "दिव्यांगता प्रमाण पत्र (Disability Certificate / UDID Card)",
      "आधार कार्ड",
      "आधार-लिंक बैंक पासबुक",
      "बिहार निवास प्रमाण पत्र व पासपोर्ट फोटो"
    ],
    applySteps: [
      "RTPS बिहार पोर्टल serviceonline.bihar.gov.in पर आवेदन करें।",
      "दस्तावेज संलग्न कर प्रखंड कार्यालय या CSC से पावती लें।",
      "स्वीकृति के बाद हर महीने पेंशन बैंक खाते में भेजी जाएगी।"
    ],
    official_source_url: "https://sspd.bih.nic.in",
    officialLink: "https://sspd.bih.nic.in",
    last_verified: "2026-02-01",
    verified: true,
    audioExplanationHindi: "बिहार में चालीस प्रतिशत या उससे अधिक दिव्यांगता वाले भाइयों-बहनों को हर महीने पांच सौ रुपये की पेंशन दी जाती है।"
  },
  {
    scheme_id: "adip-divyang-appliances",
    id: "adip-divyang-appliances",
    name: "ADIP Scheme (Aids and Appliances for Divyangjan)",
    hindiName: "एडीआईपी (ADIP) दिव्यांग सहायक उपकरण योजना",
    tagline: "दिव्यांगजनों को मोटराइज्ड ट्राइसाइकिल, कृत्रिम अंग, कैलिपर्स व स्मार्ट केन बिल्कुल मुफ्त",
    category: "disability",
    categoryLabel: "दिव्यांग उपकरण",
    level: "central",
    badgeColor: "bg-purple-500/10 text-purple-400 border-purple-500/30",
    icon: "Users",
    benefit: "मुफ्त मोटराइज्ड ट्राइसाइकिल, व्हीलचेयर, हियरिंग एड, कृत्रिम अंग",
    benefitDetail: "गंभीर दिव्यांगजनों को ₹42,000 तक की बैटरी चालित मोटराइज्ड ट्राइसाइकिल तथा कृत्रिम हाथ/पैर 100% निःशुल्क।",
    whoQualifies: "न्यूनतम 40% दिव्यांगता वाले नागरिक, पारिवारिक मासिक आय ₹22,500 से कम (₹15,000 से कम पर 100% मुफ्त)",
    eligibility: {
      min_age: 5,
      max_age: 100,
      gender: "any",
      occupations: ["any"],
      income_max: 270000,
      social_category: ["any"],
      land_required: false,
      disability_required: true,
      location: ["rural", "urban", "any"],
      education_level: "any",
      marital_status: "any",
      other_conditions: ["Holding 40%+ disability certificate / UDID Card, not received same aid in last 3 years"]
    },
    documentsRequired: [
      "UDID कार्ड या दिव्यांगता प्रमाण पत्र",
      "आय प्रमाण पत्र (Income < ₹22,500/माह)",
      "आधार कार्ड व निवास प्रमाण पत्र",
      "दिव्यांगता दर्शाती फुल साइज फोटो"
    ],
    applySteps: [
      "adip.depwd.gov.in पर पंजीकरण करें या जिले के ALIMCO कैम्प में जाएं।",
      "नाप और असेसमेंट कराकर मोटराइज्ड ट्राइसाइकिल या कृत्रिम अंग प्राप्त करें।"
    ],
    official_source_url: "https://adip.depwd.gov.in",
    officialLink: "https://adip.depwd.gov.in",
    last_verified: "2026-01-20",
    verified: true,
    audioExplanationHindi: "एडीआईपी योजना में दिव्यांगजनों को चलने-फिरने के लिए बैटरी वाली मोटराइज्ड ट्राइसाइकिल और कृत्रिम अंग बिल्कुल मुफ्त दिए जाते हैं।"
  },
  {
    scheme_id: "divyang-vivah-protsahan",
    id: "divyang-vivah-protsahan",
    name: "Bihar Mukhyamantri Divyangjan Vivah Protsahan",
    hindiName: "मुख्यमंत्री निःशक्तता विवाह प्रोत्साहन योजना (बिहार)",
    tagline: "दिव्यांग व्यक्ति से विवाह करने पर ₹1,00,000 की प्रोत्साहन आर्थिक सहायता",
    category: "disability",
    categoryLabel: "दिव्यांग विवाह सहायता",
    level: "state",
    badgeColor: "bg-pink-500/10 text-pink-400 border-pink-500/30",
    icon: "Users",
    benefit: "₹1,00,000 फिक्स्ड डिपॉजिट / नकद प्रोत्साहन",
    benefitDetail: "दिव्यांग (40%+ अक्षम) पुरुष या महिला से विवाह करने वाले दंपती को गृहस्थी बसाने हेतु ₹1 लाख का अनुदान।",
    whoQualifies: "विवाह करने वाले दंपती में से कम से कम एक साथी 40% या अधिक दिव्यांग हो (बिहार निवासी)",
    eligibility: {
      min_age: 18,
      max_age: 50,
      gender: "any",
      occupations: ["any"],
      income_max: null,
      social_category: ["any"],
      land_required: false,
      disability_required: true,
      location: ["rural", "urban", "any"],
      education_level: "any",
      marital_status: "married",
      other_conditions: ["Marriage registered within last 1 year, at least one spouse is 40%+ disabled, Bihar Domicile"]
    },
    documentsRequired: [
      "विवाह निबंधन प्रमाण पत्र (Marriage Certificate)",
      "पति व पत्नी का आधार कार्ड",
      "दिव्यांगता प्रमाण पत्र (40%+)",
      "संयुक्त बैंक खाता पासबुक व शादी की फोटो"
    ],
    applySteps: [
      "जिला सामाजिक सुरक्षा कोषांग (कलेक्ट्रेट) में आवेदन फॉर्म जमा करें।",
      "दस्तावेजों की जांच उपरांत ₹1 लाख की राशि संयुक्त खाते में जारी की जाती है।"
    ],
    official_source_url: "https://sspd.bih.nic.in",
    officialLink: "https://sspd.bih.nic.in",
    last_verified: "2026-01-15",
    verified: true,
    audioExplanationHindi: "दिव्यांग व्यक्ति से शादी करने पर बिहार सरकार एक लाख रुपये की प्रोत्साहन राशि देती है।"
  },

  // ==========================================
  // 7. BUSINESS, STARTUP & MSME SUBSIDIES (व्यापार, स्टार्टअप व स्वरोजगार)
  // ==========================================
  {
    scheme_id: "udyami-yojana",
    id: "udyami-yojana",
    name: "Bihar Mukhyamantri Udyami Yojana (SC/ST/EBC/Mahila/Yuva)",
    hindiName: "बिहार मुख्यमंत्री उद्यमी योजना",
    tagline: "नया उद्योग या व्यवसाय शुरू करने हेतु ₹10 लाख की वित्तीय सहायता (₹5 लाख 100% सब्सिडी)",
    category: "business",
    categoryLabel: "स्वरोजगार एवं उद्योग",
    level: "state",
    badgeColor: "bg-amber-500/10 text-amber-400 border-amber-500/30",
    icon: "Briefcase",
    benefit: "₹10,00,000 (₹5 लाख मुफ्त सब्सिडी + ₹5 लाख ब्याज-मुक्त ऋण)",
    benefitDetail: "₹5 लाख सरकारी अनुदान (माफ) + ₹5 लाख बिना ब्याज (महिलाओं/SC/ST हेतु 0% व युवाओं हेतु मात्र 1%) 84 किस्तों में वापसी।",
    whoQualifies: "बिहार के 18-50 वर्ष के युवा (12वीं/ITI/डिप्लोमा/ग्रेजुएट) जो 50+ चिन्हित उद्योगों में से कोई नया काम शुरू करना चाहते हैं",
    eligibility: {
      min_age: 18,
      max_age: 50,
      gender: "any",
      occupations: ["unemployed", "business", "daily-wager", "job-seeker", "any"],
      income_max: null,
      social_category: ["general", "sc", "st", "obc", "ebc", "minority", "any"],
      land_required: false,
      disability_required: false,
      location: ["rural", "urban", "any"],
      education_level: "12th_or_iti_pass",
      marital_status: "any",
      other_conditions: ["Bihar resident, minimum 10+2/Intermediate/ITI/Polytechnic Diploma, current bank account"]
    },
    documentsRequired: [
      "10+2 / इंटरमीडिएट या ITI / पॉलिटेक्निक मार्कशीट",
      "आधार कार्ड व पैन कार्ड (PAN Card)",
      "बिहार का मूल निवास प्रमाण पत्र",
      "जाति प्रमाण पत्र (SC/ST/EBC श्रेणी हेतु)",
      "करंट बैंक अकाउंट चेक (Cancelled Cheque) व प्रोजेक्ट रिपोर्ट"
    ],
    applySteps: [
      "udyami.bihar.gov.in पोर्टल पर ऑनलाइन पंजीकरण करें।",
      "प्रोजेक्ट का चयन करें (जैसे फूड प्रोसेसिंग, फैब्रिकेशन, गारमेंट्स, पैकेजिंग आदि)।",
      "चयन उपरांत सरकार ₹10 लाख 3 किस्तों में जारी करती है और ट्रेनिंग देती है।"
    ],
    official_source_url: "https://udyami.bihar.gov.in",
    officialLink: "https://udyami.bihar.gov.in",
    last_verified: "2026-02-01",
    verified: true,
    audioExplanationHindi: "मुख्यमंत्री उद्यमी योजना में अपनी दुकान या फैक्ट्री लगाने के लिए दस लाख रुपये मिलते हैं, जिसमें पांच लाख रुपये की सीधी सरकारी छूट होती है।"
  },
  {
    scheme_id: "pmegp-loan-subsidy",
    id: "pmegp-loan-subsidy",
    name: "Prime Minister Employment Generation Programme (PMEGP)",
    hindiName: "प्रधानमंत्री रोजगार सृजन कार्यक्रम (PMEGP)",
    tagline: "विनिर्माण (₹50 लाख) व सेवा क्षेत्र (₹20 लाख) उद्योग हेतु 15% से 35% तक सरकारी सब्सिडी",
    category: "business",
    categoryLabel: "उद्योग सब्सिडी",
    level: "central",
    badgeColor: "bg-amber-500/10 text-amber-400 border-amber-500/30",
    icon: "Briefcase",
    benefit: "₹50,00,000 तक बैंक लोन + 35% तक सब्सिडी",
    benefitDetail: "ग्रामीण क्षेत्र में विशेष वर्ग (SC/ST/OBC/महिला/दिव्यांग/अल्पसंख्यक) को 35% तथा सामान्य वर्ग को 25% सरकारी सब्सिडी।",
    whoQualifies: "18 वर्ष या अधिक उम्र का कोई भी नागरिक (नया उद्योग या सर्विस सेंटर लगाने हेतु)",
    eligibility: {
      min_age: 18,
      max_age: 65,
      gender: "any",
      occupations: ["business", "unemployed", "entrepreneur", "any"],
      income_max: null,
      social_category: ["general", "sc", "st", "obc", "ebc", "minority", "any"],
      land_required: false,
      disability_required: false,
      location: ["rural", "urban", "any"],
      education_level: "8th_pass_for_above_10L",
      marital_status: "any",
      other_conditions: ["Only new projects eligible, minimum 8th pass for project above ₹10L manufacturing or ₹5L service"]
    },
    documentsRequired: [
      "विस्तृत प्रोजेक्ट रिपोर्ट (DPR)",
      "आधार कार्ड व पैन कार्ड",
      "जाति व निवास प्रमाण पत्र (सब्सिडी क्लेम हेतु)",
      "शैक्षणिक योग्यता प्रमाण पत्र व EDP ट्रेनिंग सर्टिफिकेट"
    ],
    applySteps: [
      "kviconline.gov.in पर PMEGP ई-पोर्टल में ऑनलाइन आवेदन करें।",
      "DIC (जिला उद्योग केंद्र) या KVIC द्वारा अप्रूवल के बाद बैंक द्वारा लोन स्वीकृत होगा।"
    ],
    official_source_url: "https://www.kviconline.gov.in",
    officialLink: "https://www.kviconline.gov.in",
    last_verified: "2026-01-20",
    verified: true,
    audioExplanationHindi: "पीएमईजीपी में नया काम-धंधा या कारखाना शुरू करने के लिए पचास लाख तक का लोन और पैंतीस प्रतिशत तक की सरकारी सब्सिडी मिलती है।"
  },
  {
    scheme_id: "pm-mudra-yojana",
    id: "pm-mudra-yojana",
    name: "Pradhan Mantri MUDRA Yojana (PMMY)",
    hindiName: "प्रधानमंत्री मुद्रा योजना (MUDRA Loan)",
    tagline: "छोटे दुकानदारों व कारोबारियों को बिना किसी गारंटी के ₹50,000 से ₹10 लाख तक का बिजनेस लोन",
    category: "business",
    categoryLabel: "माइक्रो बिजनेस ऋण",
    level: "central",
    badgeColor: "bg-blue-500/10 text-blue-400 border-blue-500/30",
    icon: "CreditCard",
    benefit: "शिशु: ₹50,000 | किशोर: ₹5 लाख | तरुण: ₹10 लाख (बिना गारंटी)",
    benefitDetail: "किराना दुकान, टेलरिंग, सैलून, वर्कशॉप, टैक्सी, रिपेयरिंग व छोटे उद्यमों को बैंक से कोलैटरल-फ्री ऋण।",
    whoQualifies: "गैर-कॉर्पोरेट, गैर-कृषि लघु एवं सूक्ष्म व्यवसाय चलाने वाले उद्यमी",
    eligibility: {
      min_age: 18,
      max_age: 65,
      gender: "any",
      occupations: ["small-business", "shopkeeper", "entrepreneur", "self-employed", "any"],
      income_max: null,
      social_category: ["any"],
      land_required: false,
      disability_required: false,
      location: ["rural", "urban", "any"],
      education_level: "any",
      marital_status: "any",
      other_conditions: ["Non-defaulter credit track record, business proposal in non-farm sector"]
    },
    documentsRequired: [
      "पहचान प्रमाण (आधार कार्ड / वोटर कार्ड / पैन)",
      "निवास प्रमाण पत्र",
      "दुकान / व्यवसाय का प्रमाण व कोटेशन",
      "पिछले 6 महीने का बैंक स्टेटमेंट"
    ],
    applySteps: [
      "udyamimitra.in पर ऑनलाइन अप्लाई करें या किसी भी बैंक/NBFC शाखा में जाएं।",
      "मुद्रा लोन फॉर्म भरें और बिना किसी संपत्ति बंधक रखे लोन प्राप्त करें।"
    ],
    official_source_url: "https://www.mudra.org.in",
    officialLink: "https://www.mudra.org.in",
    last_verified: "2026-02-01",
    verified: true,
    audioExplanationHindi: "मुद्रा योजना में छोटी दुकान या व्यापार बढ़ाने के लिए बिना किसी जमीन या मकान की गारंटी के दस लाख रुपये तक का लोन मिलता है।"
  },
  {
    scheme_id: "pm-svanidhi-street-vendor",
    id: "pm-svanidhi-street-vendor",
    name: "PM SVANidhi (Street Vendor Loan)",
    hindiName: "पीएम स्वनिधि योजना (रेहड़ी-पटरी व ठेला विक्रेता लोन)",
    tagline: "ठेले, रेहड़ी व फुटपाथ दुकानदारों को ₹10,000 से ₹50,000 तक का आसान कार्यशील पूंजी ऋण (7% ब्याज सब्सिडी)",
    category: "business",
    categoryLabel: "स्ट्रीट वेंडर ऋण",
    level: "central",
    badgeColor: "bg-teal-500/10 text-teal-400 border-teal-500/30",
    icon: "Briefcase",
    benefit: "₹10,000 (1st किस्त), ₹20,000 (2nd किस्त), ₹50,000 (3rd किस्त) + 7% ब्याज सब्सिडी",
    benefitDetail: "समय पर लोन चुकाने पर 7% वार्षिक ब्याज सब्सिडी + डिजिटल लेनदेन पर ₹1,200 सालाना कैशबैक।",
    whoQualifies: "शहरी एवं अर्ध-शहरी क्षेत्रों में ठेला, गुमटी, रेहड़ी, फल-सब्जी, चाय-नाश्ता बेचने वाले फुटपाथ विक्रेता",
    eligibility: {
      min_age: 18,
      max_age: 70,
      gender: "any",
      occupations: ["street-vendor", "vendor", "thela", "small-shop", "daily-wager"],
      income_max: null,
      social_category: ["any"],
      land_required: false,
      disability_required: false,
      location: ["urban", "semi-urban", "any"],
      education_level: "any",
      marital_status: "any",
      other_conditions: ["Engaged in street vending in urban/peri-urban area, possessing Vending ID or LoR"]
    },
    documentsRequired: [
      "शहरी निकाय (नगर निगम/नगर परिषद) का वेंडिंग सर्टिफिकेट या सिफ़ारिश पत्र (LoR)",
      "आधार कार्ड",
      "बैंक पासबुक विवरण व मोबाइल नंबर"
    ],
    applySteps: [
      "pmsvanidhi.mohua.gov.in पर ऑनलाइन अप्लाई करें या नजदीकी CSC केंद्र जाएं।",
      "बैंक द्वारा बिना किसी जमानत के खाते में ₹10,000 का पहला ऋण दिया जाता है।"
    ],
    official_source_url: "https://pmsvanidhi.mohua.gov.in",
    officialLink: "https://pmsvanidhi.mohua.gov.in",
    last_verified: "2026-01-20",
    verified: true,
    audioExplanationHindi: "पीएम स्वनिधि में ठेला और रेहड़ी-पटरी पर दुकान लगाने वालों को अपना काम बढ़ाने के लिए दस हजार से पचास हजार रुपये तक का आसान लोन मिलता है।"
  },
  {
    scheme_id: "bihar-alpsankhyak-rozgar",
    id: "bihar-alpsankhyak-rozgar",
    name: "Bihar Mukhyamantri Alpsankhyak Rozgar Rin",
    hindiName: "बिहार मुख्यमंत्री अल्पसंख्यक रोजगार ऋण योजना",
    tagline: "अल्पसंख्यक युवाओं को स्वरोजगार हेतु मात्र 5% साधारण ब्याज पर ₹5 लाख तक का ऋण",
    category: "business",
    categoryLabel: "अल्पसंख्यक स्वरोजगार",
    level: "state",
    badgeColor: "bg-indigo-500/10 text-indigo-400 border-indigo-500/30",
    icon: "Briefcase",
    benefit: "₹5,00,000 तक ऋण (मात्र 5% साधारण ब्याज दर)",
    benefitDetail: "दुकान, वर्कशॉप, सर्विस सेंटर, पशुपालन आदि हेतु आसान 20 त्रैमासिक किस्तों में पुनर्भुगतान।",
    whoQualifies: "बिहार के अल्पसंख्यक समुदाय (मुस्लिम, ईसाई, सिख, बौद्ध, जैन, पारसी) के 18-50 वर्ष के नागरिक, पारिवारिक आय ₹4.5 लाख से कम",
    eligibility: {
      min_age: 18,
      max_age: 50,
      gender: "any",
      occupations: ["unemployed", "business", "small-business", "any"],
      income_max: 450000,
      social_category: ["minority"],
      land_required: false,
      disability_required: false,
      location: ["rural", "urban", "any"],
      education_level: "any",
      marital_status: "any",
      other_conditions: ["Resident of Bihar, belonging to notified minority community"]
    },
    documentsRequired: [
      "अल्पसंख्यक समुदाय प्रमाण पत्र",
      "आय प्रमाण पत्र (Annual Income < ₹4.5L)",
      "बिहार का मूल निवास प्रमाण पत्र व आधार कार्ड",
      "बैंक पासबुक व प्रोजेक्ट प्रस्ताव"
    ],
    applySteps: [
      "bsmfc.bihar.gov.in (बिहार राज्य अल्पसंख्यक वित्तीय निगम) पर आवेदन करें।",
      "जिला अल्पसंख्यक कल्याण पदाधिकारी कार्यालय में फॉर्म जमा करें।"
    ],
    official_source_url: "https://bsmfc.bihar.gov.in",
    officialLink: "https://bsmfc.bihar.gov.in",
    last_verified: "2026-01-15",
    verified: true,
    audioExplanationHindi: "अल्पसंख्यक रोजगार ऋण योजना में अल्पसंख्यक वर्ग के युवाओं को अपना व्यवसाय शुरू करने के लिए पांच लाख रुपये तक का कम ब्याज वाला लोन मिलता है।"
  },

  // ==========================================
  // 8. HOUSING & URBAN/RURAL WELFARE (आवास एवं बुनियादी जरूरत)
  // ==========================================
  {
    scheme_id: "pm-awas-gramin",
    id: "pm-awas-gramin",
    name: "Pradhan Mantri Awas Yojana - Gramin (PMAY-G)",
    hindiName: "प्रधानमंत्री ग्रामीण आवास योजना (PMAY-G)",
    tagline: "कच्चा मकान व झोपड़ी में रहने वाले परिवारों को पक्का घर बनाने हेतु ₹1.20 लाख से ₹1.30 लाख नकद सहायता",
    category: "housing",
    categoryLabel: "ग्रामीण आवास",
    level: "central",
    badgeColor: "bg-blue-500/10 text-blue-400 border-blue-500/30",
    icon: "Home",
    benefit: "₹1,20,000 नकद + ₹18,000 मनरेगा मजदूरी + ₹12,000 शौचालय सहायता",
    benefitDetail: "घर निर्माण हेतु कुल ₹1,50,000 का प्रत्यक्ष लाभ 3 किस्तों में जिओ-टैगिंग के आधार पर सीधे बैंक खाते में।",
    whoQualifies: "कच्चे मकान / झोपड़ी में रहने वाले ग्रामीण बेघर परिवार या SECC 2011 / आवास प्लस सूची में शामिल परिवार",
    eligibility: {
      min_age: 18,
      max_age: 100,
      gender: "any",
      occupations: ["laborer", "mazdoor", "daily-wager", "farmer", "any"],
      income_max: 120000,
      social_category: ["general", "sc", "st", "obc", "ebc", "minority", "any"],
      land_required: false,
      disability_required: false,
      location: ["rural"],
      education_level: "any",
      marital_status: "any",
      other_conditions: ["No pucca house anywhere in India in the name of any family member"]
    },
    documentsRequired: [
      "आधार कार्ड (परिवार के सभी वयस्क सदस्यों का)",
      "मनरेगा जॉब कार्ड (Job Card)",
      "आधार-लिंक बैंक पासबुक",
      "मौजूदा कच्चे घर का फोटो"
    ],
    applySteps: [
      "ग्राम पंचायत के आवास सहायक या BDO कार्यालय से संपर्क करें।",
      "Awaas+ पोर्टल पर कच्चे घर का जिओ-टैगिंग सत्यापन कराएं।",
      "स्वीकृति के बाद पहली किस्त ₹40,000 सीधे बैंक में आएगी।"
    ],
    official_source_url: "https://pmayg.nic.in",
    officialLink: "https://pmayg.nic.in",
    last_verified: "2026-02-01",
    verified: true,
    audioExplanationHindi: "प्रधानमंत्री ग्रामीण आवास योजना में कच्चा मकान या झोपड़ी में रहने वाले परिवारों को पक्का घर बनाने के लिए सवा लाख रुपये से ज्यादा की मदद मिलती है।"
  },
  {
    scheme_id: "pm-awas-urban",
    id: "pm-awas-urban",
    name: "Pradhan Mantri Awas Yojana - Urban (PMAY-U)",
    hindiName: "प्रधानमंत्री शहरी आवास योजना",
    tagline: "शहरी क्षेत्र में पक्का मकान बनाने या खरीदने हेतु ₹2.50 लाख की सरकारी सब्सिडी",
    category: "housing",
    categoryLabel: "शहरी आवास",
    level: "central",
    badgeColor: "bg-blue-500/10 text-blue-400 border-blue-500/30",
    icon: "Home",
    benefit: "₹2,50,000 तक सरकारी सब्सिडी (BLC / CLSS)",
    benefitDetail: "अपनी जमीन पर घर बनाने हेतु ₹1.50 लाख केंद्र + ₹1 लाख राज्य सरकार द्वारा सीधे बैंक खाते में।",
    whoQualifies: "शहरी क्षेत्र में रहने वाले EWS/LIG परिवार (वार्षिक आय ₹3 लाख से कम) जिनके पास पक्का मकान न हो",
    eligibility: {
      min_age: 18,
      max_age: 100,
      gender: "any",
      occupations: ["any"],
      income_max: 300000,
      social_category: ["any"],
      land_required: false,
      disability_required: false,
      location: ["urban"],
      education_level: "any",
      marital_status: "any",
      other_conditions: ["Urban resident possessing land or kutcha house in municipality area, no other pucca house"]
    },
    documentsRequired: [
      "शहरी नगर निकाय का वार्ड निवास प्रमाण",
      "आधार कार्ड व आय प्रमाण पत्र",
      "जमीन के कागजात / म्यूटेशन रसीद",
      "बैंक पासबुक व नक्शा"
    ],
    applySteps: [
      "pmaymis.gov.in पर ऑनलाइन अप्लाई करें या नगर निगम / नगर परिषद कार्यालय जाएं।",
      "BLC (Beneficiary-led Construction) घटक चुनकर फॉर्म जमा करें।"
    ],
    official_source_url: "https://pmaymis.gov.in",
    officialLink: "https://pmaymis.gov.in",
    last_verified: "2026-01-15",
    verified: true,
    audioExplanationHindi: "प्रधानमंत्री शहरी आवास योजना में शहर या कस्बे में पक्का मकान बनाने के लिए ढाई लाख रुपये की सरकारी सब्सिडी मिलती है।"
  },
  {
    scheme_id: "bihar-vaas-sthal",
    id: "bihar-vaas-sthal",
    name: "Bihar Mukhyamantri Vaas Sthal Kraya Yojana",
    hindiName: "बिहार मुख्यमंत्री वास स्थल क्रय योजना",
    tagline: "भूमिहीन और बेघर गरीब परिवारों को घर बनाने हेतु 3 डिसमिल जमीन खरीदने के लिए ₹60,000 की नकद सहायता",
    category: "housing",
    categoryLabel: "भूमिहीन वास सहायता",
    level: "state",
    badgeColor: "bg-blue-500/10 text-blue-400 border-blue-500/30",
    icon: "Home",
    benefit: "₹60,000 (जमीन खरीदने हेतु एकमुश्त अनुदान)",
    benefitDetail: "जिन गरीब परिवारों के पास घर बनाने के लिए अपनी 1 इंच जमीन भी नहीं है, उन्हें 3 डिसमिल जमीन खरीदने हेतु सीधी सरकारी मदद।",
    whoQualifies: "बिहार के पूरी तरह भूमिहीन व आवासहीन गरीब परिवार (विशेषतः महादलित, SC/ST, EBC परिवार)",
    eligibility: {
      min_age: 18,
      max_age: 100,
      gender: "any",
      occupations: ["laborer", "mazdoor", "daily-wager", "any"],
      income_max: 100000,
      social_category: ["sc", "st", "ebc", "obc", "general", "minority", "any"],
      land_required: false,
      disability_required: false,
      location: ["rural", "any"],
      education_level: "any",
      marital_status: "any",
      other_conditions: ["Completely landless family without any homestead land in Bihar"]
    },
    documentsRequired: [
      "भूमिहीन प्रमाण पत्र (अंचलाधिकारी / CO द्वारा जारी)",
      "आधार कार्ड व राशन कार्ड",
      "बैंक पासबुक व निवास प्रमाण पत्र"
    ],
    applySteps: [
      "अपने अंचल कार्यालय (Circle Office / CO) में वास-भूमि आवंटन हेतु आवेदन दें।",
      "जांच उपरांत जमीन खरीद हेतु ₹60,000 की राशि खाते में भेजी जाती है।"
    ],
    official_source_url: "https://state.bihar.gov.in/revenue",
    officialLink: "https://state.bihar.gov.in/revenue",
    last_verified: "2026-01-15",
    verified: true,
    audioExplanationHindi: "जिन गरीब परिवारों के पास घर बनाने के लिए जमीन नहीं है, उन्हें जमीन खरीदने के लिए बिहार सरकार साठ हजार रुपये देती है।"
  },

  // ==========================================
  // 9. EMPLOYMENT, LABOR & ARTISAN SCHEMES (रोजगार, श्रमिक व कारीगर)
  // ==========================================
  {
    scheme_id: "pm-vishwakarma",
    id: "pm-vishwakarma",
    name: "PM Vishwakarma Scheme",
    hindiName: "प्रधानमंत्री विश्वकर्मा योजना (पारंपरिक कारीगर व शिल्पकार)",
    tagline: "18 पारंपरिक व्यवसायों (बढ़ई, लोहार, कुम्हार, राजमिस्त्री, दर्जी आदि) को ₹15,000 टूलकिट अनुदान + ₹3 लाख तक 5% ब्याज पर आसान लोन",
    category: "employment",
    categoryLabel: "कारीगर व शिल्पकार",
    level: "central",
    badgeColor: "bg-amber-500/10 text-amber-400 border-amber-500/30",
    icon: "Briefcase",
    benefit: "₹15,000 मुफ्त टूलकिट वाउचर + ₹3,00,000 तक कोलैटरल-फ्री ऋण + ₹500/दिन ट्रेनिंग भत्ता",
    benefitDetail: "5-7 दिन की बेसिक ट्रेनिंग, आधुनिक औजार खरीदने हेतु ₹15,000 ई-वाउचर, तथा पहली बार ₹1 लाख व दूसरी बार ₹2 लाख का 5% रियायती ऋण।",
    whoQualifies: "18 पारंपरिक ट्रेड (बढ़ई, नाव बनाने वाले, लोहार, ताला बनाने वाले, सुनार, कुम्हार, मूर्तिकार, मोची, राजमिस्त्री, टोकरी/चटाई बुनकर, नाई, धोबी, दर्जी आदि)",
    eligibility: {
      min_age: 18,
      max_age: 70,
      gender: "any",
      occupations: ["artisan", "carpenter", "blacksmith", "mason", "tailor", "barber", "cobbler", "potter", "laborer", "craftsman"],
      income_max: null,
      social_category: ["general", "sc", "st", "obc", "ebc", "minority", "any"],
      land_required: false,
      disability_required: false,
      location: ["rural", "urban", "any"],
      education_level: "any",
      marital_status: "any",
      other_conditions: ["Engaged in one of the 18 notified traditional trades using hands and tools"]
    },
    documentsRequired: [
      "आधार कार्ड व मोबाइल नंबर",
      "बैंक पासबुक विवरण",
      "व्यवसाय का विवरण व स्व-घोषणा"
    ],
    applySteps: [
      "नजदीकी CSC केंद्र पर जाकर बायोमेट्रिक e-KYC के साथ pmvishwakarma.gov.in पर पंजीकरण कराएं।",
      "ग्राम पंचायत / नगर निकाय सत्यापन के बाद ट्रेनिंग और ₹15,000 टूलकिट प्राप्त करें।"
    ],
    official_source_url: "https://pmvishwakarma.gov.in",
    officialLink: "https://pmvishwakarma.gov.in",
    last_verified: "2026-02-01",
    verified: true,
    audioExplanationHindi: "विश्वकर्मा योजना में पारंपरिक कारीगरों जैसे बढ़ई, लोहार, दर्जी, राजमिस्त्री और मोची को मुफ्त औजार के लिए पंद्रह हजार रुपये और तीन लाख तक का सस्ता लोन मिलता है।"
  },
  {
    scheme_id: "eshram-bocw-welfare",
    id: "eshram-bocw-welfare",
    name: "e-Shram / Bihar BOCW Labor Welfare Board",
    hindiName: "ई-श्रम कार्ड / बिहार भवन निर्माण श्रमिक कल्याण बोर्ड",
    tagline: "असंगठित कामगारों व निर्माण मजदूरों को ₹2 लाख दुर्घटना बीमा + औजार व साइकिल अनुदान",
    category: "employment",
    categoryLabel: "श्रमिक कल्याण",
    level: "state",
    badgeColor: "bg-blue-500/10 text-blue-400 border-blue-500/30",
    icon: "Briefcase",
    benefit: "₹2,00,000 दुर्घटना बीमा + ₹15,000 औजार/साइकिल/चिकित्सा अनुदान + बच्चों को छात्रवृत्ति",
    benefitDetail: "पंजीकृत निर्माण श्रमिकों को वार्षिक वस्त्र अनुदान, बच्चों की पढ़ाई हेतु छात्रवृत्ति तथा दुर्घटना में मृत्यु पर ₹2 लाख की सहायता।",
    whoQualifies: "18 से 59 वर्ष के निर्माण मजदूर, राजमिस्त्री, बेलदार, प्लंबर, इलेक्ट्रीशियन, पेंटर, बढ़ई, दिहाड़ी श्रमिक",
    eligibility: {
      min_age: 18,
      max_age: 59,
      gender: "any",
      occupations: ["laborer", "mazdoor", "daily-wager", "construction-worker", "plumber", "electrician", "painter"],
      income_max: null,
      social_category: ["any"],
      land_required: false,
      disability_required: false,
      location: ["rural", "urban", "any"],
      education_level: "any",
      marital_status: "any",
      other_conditions: ["Worked at least 90 days as construction worker in last 12 months, non-EPF/ESIC member"]
    },
    documentsRequired: [
      "आधार कार्ड",
      "90 दिन कार्य का नियोजन प्रमाण पत्र (ठेकेदार / मुखिया द्वारा सत्यापित)",
      "बैंक पासबुक व 2 पासपोर्ट फोटो",
      "नॉमिनी का विवरण"
    ],
    applySteps: [
      "bocw.bihar.gov.in पर ऑनलाइन श्रमिक निबंधन करें या श्रम अधीक्षक कार्यालय जाएं।",
      "लेबर कार्ड प्राप्त कर बोर्ड की 16 कल्याणकारी योजनाओं का लाभ उठाएं।"
    ],
    official_source_url: "https://bocw.bihar.gov.in",
    officialLink: "https://bocw.bihar.gov.in",
    last_verified: "2026-01-20",
    verified: true,
    audioExplanationHindi: "लेबर कार्ड धारक मजदूरों को दुर्घटना बीमा, बच्चों की पढ़ाई का पैसा और औजार खरीदने के लिए सरकारी सहायता मिलती है।"
  },
  {
    scheme_id: "mgnrega-employment",
    id: "mgnrega-employment",
    name: "MGNREGA (100 Days Guaranteed Wage Employment)",
    hindiName: "महात्मा गांधी राष्ट्रीय ग्रामीण रोजगार गारंटी (मनरेगा)",
    tagline: "ग्रामीण परिवारों को हर वित्तीय वर्ष 100 दिन का पक्का मजदूरी रोजगार (₹245/दिन)",
    category: "employment",
    categoryLabel: "गारंटीड रोजगार",
    level: "central",
    badgeColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
    icon: "Briefcase",
    benefit: "100 दिनों का अकुशल शारीरिक रोजगार (दैनिक मजदूरी सीधे बैंक खाते में)",
    benefitDetail: "आवेदन करने के 15 दिनों के भीतर ग्राम पंचायत द्वारा रोजगार उपलब्ध कराना अनिवार्य, अन्यथा बेरोजगारी भत्ता देय।",
    whoQualifies: "ग्रामीण क्षेत्र के 18 वर्ष से अधिक आयु के वयस्क नागरिक जो अकुशल शारीरिक श्रम करने को तैयार हैं",
    eligibility: {
      min_age: 18,
      max_age: 70,
      gender: "any",
      occupations: ["laborer", "mazdoor", "daily-wager", "unemployed", "farmer", "any"],
      income_max: null,
      social_category: ["any"],
      land_required: false,
      disability_required: false,
      location: ["rural"],
      education_level: "any",
      marital_status: "any",
      other_conditions: ["Rural household holding valid Job Card, willing to do manual labor"]
    },
    documentsRequired: [
      "परिवार के सभी वयस्क सदस्यों का आधार कार्ड",
      "निवास प्रमाण / राशन कार्ड",
      "बैंक / डाकघर पासबुक व पासपोर्ट फोटो"
    ],
    applySteps: [
      "अपनी ग्राम पंचायत के मुखिया या पंचायत रोजगार सेवक (PRS) से मिलें।",
      "निशुल्क मनरेगा जॉब कार्ड बनवाएं और काम की मांग करें।"
    ],
    official_source_url: "https://nrega.nic.in",
    officialLink: "https://nrega.nic.in",
    last_verified: "2026-02-01",
    verified: true,
    audioExplanationHindi: "मनरेगा में गांव के सभी मजदूरों को साल में सौ दिन की सरकारी मजदूरी का कानूनी अधिकार मिलता है।"
  },
  {
    scheme_id: "pm-shram-yogi-maandhan",
    id: "pm-shram-yogi-maandhan",
    name: "PM Shram Yogi Maandhan (PM-SYM)",
    hindiName: "प्रधानमंत्री श्रम योगी मानधन योजना (मजदूर पेंशन)",
    tagline: "असंगठित क्षेत्र के कामगारों (रेहड़ी, रिक्शा, घरेलू कामगार) को 60 वर्ष बाद ₹3,000 मासिक पेंशन",
    category: "employment",
    categoryLabel: "श्रमिक पेंशन",
    level: "central",
    badgeColor: "bg-blue-500/10 text-blue-400 border-blue-500/30",
    icon: "Users",
    benefit: "₹3,000 / महीना आजीवन पेंशन (60 वर्ष के बाद)",
    benefitDetail: "जितना अंशदान मजदूर देगा (₹55 से ₹200 प्रति माह), उतना ही 50% अंशदान केंद्र सरकार भी जमा करेगी।",
    whoQualifies: "18 से 40 वर्ष के असंगठित कामगार (मासिक आय ₹15,000 से कम, गैर-ईपीएफ/ईएसआई/आयकरदाता)",
    eligibility: {
      min_age: 18,
      max_age: 40,
      gender: "any",
      occupations: ["laborer", "mazdoor", "daily-wager", "driver", "rickshaw", "maid", "street-vendor", "carpenter", "tailor"],
      income_max: 180000,
      social_category: ["any"],
      land_required: false,
      disability_required: false,
      location: ["rural", "urban", "any"],
      education_level: "any",
      marital_status: "any",
      other_conditions: ["Monthly income below ₹15,000, not an income tax payer or EPFO/ESIC member"]
    },
    documentsRequired: [
      "आधार कार्ड",
      "बचत बैंक खाता पासबुक (IFSC सहित)",
      "आधार लिंक मोबाइल नंबर"
    ],
    applySteps: [
      "नजदीकी CSC केंद्र पर जाएं।",
      "बायोमेट्रिक से e-KYC कराएं और पहला मासिक अंशदान जमा करें।",
      "तुरंत PM-SYM पेंशन कार्ड प्राप्त करें।"
    ],
    official_source_url: "https://maandhan.in",
    officialLink: "https://maandhan.in",
    last_verified: "2026-01-15",
    verified: true,
    audioExplanationHindi: "श्रम योगी मानधन योजना में असंगठित मजदूरों को साठ साल की उम्र के बाद हर महीने तीन हजार रुपये की पक्की पेंशन मिलती है।"
  },

  // ==========================================
  // 10. FOOD SECURITY & RATION (खाद्य सुरक्षा एवं पोषण)
  // ==========================================
  {
    scheme_id: "pm-garib-kalyan-anna",
    id: "pm-garib-kalyan-anna",
    name: "PM Garib Kalyan Anna Yojana (PMGKAY)",
    hindiName: "प्रधानमंत्री गरीब कल्याण अन्न योजना (मुफ्त राशन)",
    tagline: "राशन कार्ड धारक परिवारों को प्रति सदस्य 5 किलो मुफ्त अनाज (चावल/गेहूं) हर महीने",
    category: "food",
    categoryLabel: "खाद्य सुरक्षा",
    level: "central",
    badgeColor: "bg-amber-500/10 text-amber-400 border-amber-500/30",
    icon: "Wheat",
    benefit: "प्रति सदस्य 5 किलो अनाज (चावल/गेहूं) बिल्कुल मुफ्त",
    benefitDetail: "राष्ट्रीय खाद्य सुरक्षा अधिनियम (NFSA) के तहत 2028 तक सभी राशन कार्ड धारक परिवारों को 100% मुफ्त खाद्यान्न।",
    whoQualifies: "प्राथमिकता प्राप्त गृहस्थी (PHH) एवं अंत्योदय (AAY) राशन कार्ड धारक परिवार",
    eligibility: {
      min_age: 0,
      max_age: 120,
      gender: "any",
      occupations: ["any"],
      income_max: 180000,
      social_category: ["any"],
      land_required: false,
      disability_required: false,
      location: ["rural", "urban", "any"],
      education_level: "any",
      marital_status: "any",
      other_conditions: ["Possessing valid Bihar/National Ration Card under NFSA"]
    },
    documentsRequired: [
      "राशन कार्ड",
      "आधार कार्ड (परिवार के सभी सदस्यों का बायोमेट्रिक सीडेड)"
    ],
    applySteps: [
      "अपने नजदीकी जन वितरण प्रणाली (PDS / कोटेदार) की दुकान पर जाएं।",
      "e-PoS मशीन पर अंगूठा लगाकर अपना मुफ्त राशन प्राप्त करें।"
    ],
    official_source_url: "https://epds.bihar.gov.in",
    officialLink: "https://epds.bihar.gov.in",
    last_verified: "2026-02-01",
    verified: true,
    audioExplanationHindi: "गरीब कल्याण अन्न योजना में राशन कार्ड पर परिवार के हर सदस्य को पांच किलो गेहूं-चावल हर महीने बिल्कुल मुफ्त मिलता है।"
  },
  {
    scheme_id: "antyodaya-anna-yojana",
    id: "antyodaya-anna-yojana",
    name: "Antyodaya Anna Yojana (AAY - Yellow Ration Card)",
    hindiName: "अंत्योदय अन्न योजना (पीला राशन कार्ड)",
    tagline: "अति-गरीब परिवारों को प्रति परिवार 35 किलो खाद्यान्न (मुफ्त या ₹2-₹3/किलो)",
    category: "food",
    categoryLabel: "खाद्य सुरक्षा",
    level: "central",
    badgeColor: "bg-amber-500/10 text-amber-400 border-amber-500/30",
    icon: "Wheat",
    benefit: "प्रति परिवार 35 किलो अनाज प्रति माह",
    benefitDetail: "21 किलो चावल + 14 किलो गेहूं हर महीने सबसे निर्धन परिवारों को जीवन-यापन हेतु।",
    whoQualifies: "भूमिहीन मजदूर, सीमांत किसान, विधवा, असाध्य रोगी, विकलांग मुखिया वाले अति-निर्धन परिवार",
    eligibility: {
      min_age: 18,
      max_age: 120,
      gender: "any",
      occupations: ["laborer", "mazdoor", "daily-wager", "unemployed", "any"],
      income_max: 50000,
      social_category: ["any"],
      land_required: false,
      disability_required: false,
      location: ["rural", "urban", "any"],
      education_level: "any",
      marital_status: "any",
      other_conditions: ["Poorest of the poor families without regular source of income"]
    },
    documentsRequired: [
      "बीपीएल / अंत्योदय सूची में नाम प्रमाण",
      "परिवार के सभी सदस्यों का आधार कार्ड",
      "आय व निवास प्रमाण पत्र"
    ],
    applySteps: [
      "प्रखंड आपूर्ति पदाधिकारी (BSO / SDO) कार्यालय में अंत्योदय कार्ड हेतु आवेदन दें।",
      "कार्ड जारी होने पर पीडीएस डीलर से 35 किलो अनाज प्राप्त करें।"
    ],
    official_source_url: "https://epds.bihar.gov.in",
    officialLink: "https://epds.bihar.gov.in",
    last_verified: "2026-01-15",
    verified: true,
    audioExplanationHindi: "अंत्योदय योजना में सबसे गरीब परिवारों को हर महीने पैंतीस किलो अनाज दिया जाता है।"
  }
];

export const SCHEME_CATEGORIES = [
  { id: "all", label: "सभी योजनाएं (All 25+)", icon: "Sparkles" },
  { id: "kisan", label: "कृषि / किसान (Agriculture)", icon: "Wheat" },
  { id: "health", label: "स्वास्थ्य (Health & Insurance)", icon: "HeartPulse" },
  { id: "student", label: "शिक्षा / छात्रवृत्ति (Education & Skills)", icon: "BookOpen" },
  { id: "women", label: "महिला / मातृत्व (Women & Child)", icon: "GraduationCap" },
  { id: "elderly", label: "बुजुर्ग / पेंशन (Senior Citizen Pension)", icon: "Users" },
  { id: "disability", label: "दिव्यांगजन (Disability Welfare)", icon: "Users" },
  { id: "business", label: "व्यापार / स्वरोजगार (Business & Startups)", icon: "Briefcase" },
  { id: "housing", label: "आवास (Housing Schemes)", icon: "Home" },
  { id: "employment", label: "श्रमिक / रोजगार (Labor & Artisans)", icon: "Briefcase" },
  { id: "food", label: "राशन / खाद्य (Food Security)", icon: "Wheat" }
];
