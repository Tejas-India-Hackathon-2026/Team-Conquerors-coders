export const SCHEMES_DATABASE = [
  {
    id: "pm-kisan",
    name: "PM-Kisan Samman Nidhi",
    hindiName: "प्रधानमंत्री किसान सम्मान निधि योजना",
    tagline: "हर साल ₹6,000 सीधे किसान के बैंक खाते में",
    category: "kisan",
    categoryLabel: "कृषि एवं किसान",
    level: "Central Government",
    badgeColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
    icon: "Wheat",
    benefit: "₹6,000 / वर्ष",
    benefitDetail: "₹2,000 की 3 समान किस्तों में प्रति 4 माह पर सीधे बैंक खाते (DBT) में।",
    whoQualifies: "जमीन धारक किसान (Small & Marginal Farmers)",
    eligibilityCriteria: {
      minAge: 18,
      maxAge: 100,
      occupations: ["kisan", "farmer", "agriculture", "kheti", "krishi", "khetihar"],
      genders: ["all", "male", "female"],
      hasLand: true,
      states: ["Bihar", "All India"],
      keywords: ["kisan", "kheti", "farmer", "zameen", "land", "fasal", "khet", "krishi", "bigha", "acre", "tractor", "beej"]
    },
    audioExplanationHindi: "पीएम किसान सम्मान निधि योजना के तहत बिहार और देश के सभी भूमिधारक किसानों को हर साल छह हजार रुपये की आर्थिक सहायता मिलती है। यह पैसा दो-दो हजार की तीन किस्तों में सीधे आपके बैंक खाते में आता है।",
    whyEligibleTemplate: "आप एक किसान हैं और आपके पास कृषि योग्य भूमि है। आप इस योजना के तहत ₹6,000 प्रति वर्ष पाने के पूर्ण पात्र हैं।",
    documentsRequired: [
      "आधार कार्ड (Aadhaar Card)",
      "जमीन के कागजात (खतियान / दाखिल खारिज / LPC / रसीद)",
      "बैंक पासबुक (Aadhaar DBT से लिंक)",
      "आधार से लिंक मोबाइल नंबर"
    ],
    applySteps: [
      "आधिकारिक पोर्टल pmkisan.gov.in पर जाएं या नजदीकी CSC / वसुधा केंद्र पर जाएं।",
      "'New Farmer Registration' पर क्लिक करें और आधार नंबर दर्ज करें।",
      "अपनी जमीन (खाता, खेसरा, रकबा) और बैंक खाता विवरण भरें।",
      "दस्तावेज अपलोड कर सबमिट करें। ब्लॉक स्तर पर जांच के बाद पैसा आना शुरू हो जाएगा।"
    ],
    officialLink: "https://pmkisan.gov.in",
    cscAssistance: "नजदीकी CSC (कॉमन सर्विस सेंटर) पर ₹15-30 में e-KYC और नया रजिस्ट्रेशन हो जाता है।"
  },
  {
    id: "ayushman-bharat",
    name: "Ayushman Bharat (PM-JAY)",
    hindiName: "आयुष्मान भारत - प्रधानमंत्री जन आरोग्य योजना",
    tagline: "हर परिवार को ₹5 लाख तक का सालाना मुफ्त इलाज",
    category: "health",
    categoryLabel: "स्वास्थ्य एवं परिवार",
    level: "Central / State (Bihar)",
    badgeColor: "bg-rose-500/10 text-rose-400 border-rose-500/30",
    icon: "HeartPulse",
    benefit: "₹5,00,000 / वर्ष",
    benefitDetail: "सूचीबद्ध सरकारी और निजी अस्पतालों में कैशलेस और मुफ्त इलाज की सुविधा।",
    whoQualifies: "SECC सूची / राशन कार्ड धारक / गरीब व असंगठित कामगार",
    eligibilityCriteria: {
      minAge: 0,
      maxAge: 100,
      occupations: ["all", "laborer", "mazdoor", "daily wage", "rickshaw", "small shop", "kisan", "unemployed", "driver", "safai karmi"],
      incomeLimit: 250000,
      genders: ["all", "male", "female"],
      hasRationCard: true,
      keywords: ["ilaaj", "hospital", "bimari", "operation", "ration card", "dawa", "swasthya", "health", "secc", "doctor", "gareeb"]
    },
    audioExplanationHindi: "आयुष्मान भारत योजना के अंतर्गत आपके पूरे परिवार को सालाना पांच लाख रुपये तक का अस्पताल में मुफ्त इलाज मिलता है। बिहार के सरकारी और बड़े प्राइवेट अस्पतालों में यह कार्ड पूरी तरह मान्य है।",
    whyEligibleTemplate: "आपके पास राशन कार्ड है या आप असंगठित/निम्न आय वर्ग में आते हैं। आपका परिवार ₹5 लाख तक के मुफ्त कैशलेस इलाज का हकदार है।",
    documentsRequired: [
      "राशन कार्ड (Ration Card)",
      "परिवार के सभी सदस्यों का आधार कार्ड",
      "आधार से लिंक मोबाइल नंबर"
    ],
    applySteps: [
      "beneficiary.nha.gov.in पोर्टल पर राशन कार्ड या आधार से अपनी पात्रता चेक करें।",
      "नजदीकी सरकारी अस्पताल (Sadar Hospital) या CSC सेंटर पर जाएं।",
      "बायोमेट्रिक फिंगरप्रिंट या OTP से e-KYC करवाएं।",
      "तुरंत आयुष्मान गोल्डन कार्ड डाउनलोड करें और फ्री इलाज पाएं।"
    ],
    officialLink: "https://beneficiary.nha.gov.in",
    cscAssistance: "किसी भी नजदीकी CSC सेंटर या ब्लॉक अस्पताल में जाकर 5 मिनट में फ्री आयुष्मान कार्ड बनवा सकते हैं।"
  },
  {
    id: "kanya-utthan",
    name: "Mukhyamantri Kanya Utthan Yojana",
    hindiName: "मुख्यमंत्री कन्या उत्थान योजना (बिहार)",
    tagline: "लड़की के जन्म से ग्रेजुएशन तक ₹50,000+ की आर्थिक मदद",
    category: "women",
    categoryLabel: "महिला एवं बालिका कल्याण",
    level: "Bihar State Govt",
    badgeColor: "bg-pink-500/10 text-pink-400 border-pink-500/30",
    icon: "GraduationCap",
    benefit: "₹2,000 से ₹50,000",
    benefitDetail: "12वीं पास करने पर ₹25,000 और ग्रेजुएशन (स्नातक) पास करने पर ₹50,000 सीधे छात्रा के खाते में।",
    whoQualifies: "बिहार की अविवाहित/विवाहित छात्राएं (12th एवं Graduation पास)",
    eligibilityCriteria: {
      minAge: 15,
      maxAge: 30,
      gender: "female",
      occupations: ["student", "padhai", "college", "school", "graduate"],
      states: ["Bihar"],
      keywords: ["ladki", "beti", "girl", "female", "12th", "inter", "graduation", "ba", "bsc", "bcom", "bihar", "college", "chhatravritti", "padhai"]
    },
    audioExplanationHindi: "मुख्यमंत्री कन्या उत्थान योजना के तहत बिहार की बेटियों को इंटर पास करने पर पच्चीस हजार और ग्रेजुएशन पास करने पर पचास हजार रुपये की प्रोत्साहन राशि सीधे बैंक खाते में दी जाती है।",
    whyEligibleTemplate: "आप बिहार की छात्रा हैं और उच्च शिक्षा प्राप्त कर रही हैं। आप इस योजना के तहत ₹25,000 से ₹50,000 तक की प्रोत्साहन राशि पाने की पात्र हैं।",
    documentsRequired: [
      "12वीं या ग्रेजुएशन की मार्कशीट एवं एडमिट कार्ड",
      "छात्रा का आधार कार्ड (बिहार का पता)",
      "छात्रा के नाम का बैंक खाता (केवल बिहार की बैंक शाखा)",
      "निवास प्रमाण पत्र (Bihar Domicile)",
      "मोबाइल नंबर एवं पासपोर्ट साइज फोटो"
    ],
    applySteps: [
      "मेधासॉफ्ट पोर्टल medhasoft.bih.nic.in पर जाएं।",
      "Kanya Utthan (Inter / Graduation) लिंक पर क्लिक करें।",
      "अपना रजिस्ट्रेशन नंबर, रोल नंबर और प्राप्तांक दर्ज करें।",
      "बैंक विवरण और आधार सत्यापित कर ऑनलाइन फॉर्म सबमिट करें।"
    ],
    officialLink: "https://medhasoft.bih.nic.in",
    cscAssistance: "कॉलेज या नजदीकी साइबर कैफे / CSC से मेधासॉफ्ट पर ऑनलाइन आवेदन कराया जा सकता है।"
  },
  {
    id: "udyami-yojana",
    name: "Bihar Mukhyamantri Udyami Yojana",
    hindiName: "बिहार मुख्यमंत्री उद्यमी योजना (SC/ST/EBC/महिला/युवा)",
    tagline: "नया व्यापार/उद्योग शुरू करने के लिए ₹10 लाख की सहायता (50% सब्सिडी)",
    category: "business",
    categoryLabel: "रोजगार एवं स्वरोजगार",
    level: "Bihar State Govt",
    badgeColor: "bg-amber-500/10 text-amber-400 border-amber-500/30",
    icon: "Briefcase",
    benefit: "₹10,00,000 (50% सब्सिडी)",
    benefitDetail: "₹5 लाख बिल्कुल मुफ्त अनुदान (सब्सिडी) + ₹5 लाख ब्याज मुक्त या मात्र 1% आसान किस्तों में ऋण।",
    whoQualifies: "बिहार के युवा (18-50 वर्ष), 12th/ITI/डिप्लोमा पास जो नया उद्योग लगाना चाहते हैं",
    eligibilityCriteria: {
      minAge: 18,
      maxAge: 50,
      occupations: ["unemployed", "business", "dukaan", "industry", "factory", "startup", "skill", "job seeker", "entrepreneur"],
      states: ["Bihar"],
      keywords: ["business", "dukan", "startup", "rojgar", "karobar", "factory", "paise", "udyog", "loan", "subsidy", "karkhana", "workshop"]
    },
    audioExplanationHindi: "बिहार मुख्यमंत्री उद्यमी योजना में अपना उद्योग या दुकान शुरू करने के लिए दस लाख रुपये तक मिलते हैं, जिसमें पांच लाख रुपये की सीधी सरकारी छूट यानी सब्सिडी होती है।",
    whyEligibleTemplate: "आपकी उम्र 18 से 50 वर्ष के बीच है और आप बिहार में नया व्यवसाय या उद्योग स्थापित करना चाहते हैं। आप ₹5 लाख सरकारी सब्सिडी के हकदार हैं।",
    documentsRequired: [
      "10+2 / इंटरमीडिएट या ITI / पॉलिटेक्निक मार्कशीट",
      "आधार कार्ड एवं पैन कार्ड (PAN Card)",
      "बिहार का मूल निवास प्रमाण पत्र (Residential)",
      "जाति प्रमाण पत्र (Caste Certificate)",
      "रद्द चेक (Cancelled Cheque) या बैंक स्टेटमेंट",
      "हस्ताक्षर एवं पासपोर्ट साइज फोटो"
    ],
    applySteps: [
      "उद्योग विभाग बिहार के पोर्टल udyami.bihar.gov.in पर जाएं।",
      "नया पंजीकरण करें और अपने आधार एवं OTP से सत्यापन करें।",
      "अपने प्रोजेक्ट/उद्योग का चयन करें (जैसे फूड प्रोसेसिंग, फैब्रिकेशन, वस्त्र आदि)।",
      "दस्तावेज अपलोड करें। चयन लॉटरी व मेरिट द्वारा होता है।"
    ],
    officialLink: "https://udyami.bihar.gov.in",
    cscAssistance: "जिला उद्योग केंद्र (DIC) या CSC से प्रोजेक्ट रिपोर्ट व फॉर्म भरने में मदद मिलती है।"
  },
  {
    id: "pm-awas-gramin",
    name: "PM Awas Yojana (Gramin)",
    hindiName: "प्रधानमंत्री ग्रामीण आवास योजना (PMAY-G)",
    tagline: "पक्का मकान बनाने के लिए ₹1.20 लाख से ₹1.30 लाख की सहायता",
    category: "housing",
    categoryLabel: "आवास एवं बुनियादी जरूरत",
    level: "Central / State (Bihar)",
    badgeColor: "bg-blue-500/10 text-blue-400 border-blue-500/30",
    icon: "Home",
    benefit: "₹1,20,000 + ₹18,000 मजदूरी",
    benefitDetail: "घर बनाने के लिए ₹1.20 लाख नकद 3 किस्तों में + मनरेगा से 90 दिन की मजदूरी (लगभग ₹18,000) + ₹12,000 शौचालय के लिए।",
    whoQualifies: "कच्चा मकान वाले परिवार / बेघर / BPL सूची में शामिल ग्रामीण नागरिक",
    eligibilityCriteria: {
      minAge: 18,
      maxAge: 100,
      occupations: ["all", "laborer", "mazdoor", "kisan", "daily wage"],
      keywords: ["ghar", "house", "chhat", "makan", "awas", "kaccha", "bpl", "jhopdi", "garib", "sadak", "pucca ghar nahi"]
    },
    audioExplanationHindi: "प्रधानमंत्री ग्रामीण आवास योजना के तहत पक्का घर बनाने के लिए एक लाख बीस हजार रुपये बैंक खाते में दिए जाते हैं। साथ ही शौचालय और मजदूरी का पैसा भी अलग से मिलता है।",
    whyEligibleTemplate: "आपके पास पक्का मकान नहीं है और आप ग्रामीण क्षेत्र में रहते हैं। आप अपना पक्का घर बनाने के लिए ₹1.20 लाख से अधिक सहायता के पात्र हैं।",
    documentsRequired: [
      "आधार कार्ड (परिवार के सभी वयस्क सदस्यों का)",
      "जॉब कार्ड (मनरेगा Job Card)",
      "बैंक पासबुक (Aadhaar लिंक)",
      "राशन कार्ड (BPL/SECC)",
      "मौजूदा कच्चे घर का फोटो"
    ],
    applySteps: [
      "अपनी ग्राम पंचायत के मुखिया, आवास सहायक या BDO कार्यालय से संपर्क करें।",
      "Awaas+ पोर्टल पर जिओ-टैगिंग के साथ कच्चे घर का सत्यापन कराएं।",
      "ग्राम सभा द्वारा पात्रता सूची में नाम अनुमोदन कराएं।",
      "स्वीकृति के बाद पहली किस्त सीधे बैंक में आएगी।"
    ],
    officialLink: "https://pmayg.nic.in",
    cscAssistance: "पंचायत भवन या ब्लॉक के ग्रामीण आवास सहायक से निःशुल्क फॉर्म व जिओ टैगिंग कराई जाती है।"
  },
  {
    id: "nsp-scholarship",
    name: "National Scholarship Portal (NSP)",
    hindiName: "राष्ट्रीय छात्रवृत्ति पोर्टल (प्री एवं पोस्ट मैट्रिक)",
    tagline: "SC/ST/OBC एवं अल्पसंख्यक छात्रों को ₹1,000 से ₹20,000 सालाना",
    category: "student",
    categoryLabel: "छात्रवृत्ति एवं शिक्षा",
    level: "Central Government",
    badgeColor: "bg-indigo-500/10 text-indigo-400 border-indigo-500/30",
    icon: "BookOpen",
    benefit: "₹1,000 से ₹20,000 / वर्ष",
    benefitDetail: "स्कूल, कॉलेज और तकनीकी संस्थानों में पढ़ने वाले छात्रों को ट्यूशन फीस व भरण-पोषण भत्ता।",
    whoQualifies: "SC/ST/OBC/EWS/Minority छात्र (कक्षा 1 से उच्च शिक्षा तक, आय ₹2.5 लाख से कम)",
    eligibilityCriteria: {
      minAge: 6,
      maxAge: 35,
      occupations: ["student", "padhai", "school", "college", "coaching"],
      keywords: ["student", "padhai", "scholarship", "chhatravritti", "sc", "st", "obc", "minority", "college", "school", "fees", "fees mafi"]
    },
    audioExplanationHindi: "राष्ट्रीय छात्रवृत्ति पोर्टल पर सभी आरक्षित एवं आर्थिक रूप से कमजोर वर्ग के छात्रों को उनकी पढ़ाई और स्कूल-कॉलेज की फीस के लिए सालाना छात्रवृत्ति दी जाती है।",
    whyEligibleTemplate: "आप एक विद्यार्थी हैं और पढ़ाई कर रहे हैं। आपकी पारिवारिक आय सीमा के अनुसार आप राष्ट्रीय छात्रवृत्ति के पूर्ण पात्र हैं।",
    documentsRequired: [
      "पिछली कक्षा की मार्कशीट (न्यूनतम 50% अंक)",
      "जाति प्रमाण पत्र (Caste Certificate)",
      "पारिवारिक आय प्रमाण पत्र (Income Certificate < 2.5L)",
      "छात्र का आधार कार्ड एवं बैंक पासबुक",
      "स्कूल/कॉलेज का बोनाफाइड सर्टिफिकेट एवं फीस रसीद"
    ],
    applySteps: [
      "scholarships.gov.in पर जाएं और OTR (One Time Registration) करें।",
      "Pre-Matric या Post-Matric स्कीम का चयन कर फॉर्म भरें।",
      "आवश्यक दस्तावेज व फीस रसीद अपलोड करें।",
      "फॉर्म का प्रिंटआउट स्कूल/कॉलेज में नोडल अधिकारी को जमा करें।"
    ],
    officialLink: "https://scholarships.gov.in",
    cscAssistance: "किसी भी साइबर कैफे या CSC से NSP पोर्टल पर OTR और रजिस्ट्रेशन कराया जा सकता है।"
  },
  {
    id: "pm-fasal-bima",
    name: "PM Fasal Bima Yojana (PMFBY)",
    hindiName: "प्रधानमंत्री फसल बीमा योजना / बिहार राज्य फसल सहायता",
    tagline: "बाढ़, सुखाड़ या बेमौसम बारिश से फसल नुकसान पर पूरा मुआवजा",
    category: "kisan",
    categoryLabel: "कृषि एवं फसल सुरक्षा",
    level: "Central / Bihar State",
    badgeColor: "bg-teal-500/10 text-teal-400 border-teal-500/30",
    icon: "ShieldCheck",
    benefit: "फसल नुकसान का 100% तक भरपाई",
    benefitDetail: "प्राकृतिक आपदा, कीट रोग, सूखा या अधिक वर्षा से फसल बर्बादी पर प्रति हेक्टेयर ₹7,500 से ₹10,000+ तक मुआवजा।",
    whoQualifies: "रैयत (जमीन मालिक) एवं गैर-रैयत (बटाईदार) दोनों तरह के किसान",
    eligibilityCriteria: {
      minAge: 18,
      maxAge: 100,
      occupations: ["kisan", "farmer", "agriculture", "kheti", "bataidar"],
      keywords: ["fasal", "sukha", "baadh", "barish", "nuksan", "crop loss", "keeda", "bima", "dhan", "gehun", "makka"]
    },
    audioExplanationHindi: "अगर आपकी फसल बाढ़, सूखे या बारिश से बर्बाद हो जाती है, तो फसल सहायता योजना के तहत सरकार द्वारा प्रति हेक्टेयर उचित मुआवजा सीधे आपके खाते में भेजा जाता है।",
    whyEligibleTemplate: "आप खेती करते हैं और आपकी फसल प्राकृतिक आपदाओं से प्रभावित होने का जोखिम है। आप बिना किसी प्रीमियम या नाममात्र दर पर फसल सहायता के पात्र हैं।",
    documentsRequired: [
      "भू-स्वामित्व प्रमाण पत्र (LPC) या जमीन की रसीद",
      "बटाईदार किसानों के लिए स्व-घोषणा प्रमाण पत्र (वार्ड सदस्य द्वारा सत्यापित)",
      "फसल बुआई प्रमाण पत्र (सक्षम प्राधिकारी द्वारा)",
      "आधार कार्ड एवं बैंक पासबुक"
    ],
    applySteps: [
      "बिहार सहकारिता विभाग (pacsonline.bih.nic.in) या pmfby.gov.in पर जाएं।",
      "रैयत या गैर-रैयत श्रेणी चुनकर बुआई का रकबा भरें।",
      "LPC / स्व-घोषणा पत्र अपलोड कर सबमिट करें।",
      "फसल कटाई प्रयोग के आधार पर नुकसान का पैसा सीधे DBT से आएगा।"
    ],
    officialLink: "https://state.bihar.gov.in/cooperative",
    cscAssistance: "CSC या पैक्स (PACS) अध्यक्ष के माध्यम से ऑनलाइन नि:शुल्क आवेदन किया जा सकता है।"
  },
  {
    id: "vridhavastha-pension",
    name: "Bihar Vridhavastha Pension Yojana",
    hindiName: "मुख्यमंत्री वृद्धजन पेंशन योजना (बिहार)",
    tagline: "60 वर्ष से अधिक उम्र के बुजुर्गों को जीवनभर मासिक पेंशन",
    category: "elderly",
    categoryLabel: "बुजुर्ग एवं सामाजिक सुरक्षा",
    level: "Bihar State Govt",
    badgeColor: "bg-purple-500/10 text-purple-400 border-purple-500/30",
    icon: "Users",
    benefit: "₹400 से ₹500 / महीना",
    benefitDetail: "60 से 79 वर्ष के बुजुर्गों को ₹400/माह तथा 80 वर्ष से अधिक के बुजुर्गों को ₹500/माह आजीवन बैंक खाते में।",
    whoQualifies: "बिहार के 60 वर्ष या अधिक उम्र के सभी वृद्ध (सरकारी पेंशन धारकों को छोड़कर)",
    eligibilityCriteria: {
      minAge: 60,
      maxAge: 120,
      states: ["Bihar"],
      keywords: ["pension", "buddhe", "bujurg", "old age", "vridha", "dada", "dadi", "60 saal", "umar", "sahayata", "sasur"]
    },
    audioExplanationHindi: "बिहार के सभी साठ साल या उससे अधिक उम्र के दादा-दादी और बुजुर्गों को हर महीने पेंशन दी जाती है। इसमें किसी जाति या आय का बंधन नहीं है।",
    whyEligibleTemplate: "आपकी उम्र 60 वर्ष से अधिक है और आप बिहार के निवासी हैं। आप आजीवन मासिक वृद्धावस्था पेंशन पाने के पूर्ण पात्र हैं।",
    documentsRequired: [
      "आधार कार्ड (उम्र और पहचान प्रमाण हेतु)",
      "मतदाता पहचान पत्र (Voter ID Card)",
      "आधार से लिंक बैंक पासबुक",
      "बिहार निवास प्रमाण पत्र या राशन कार्ड",
      "स्व-घोषणा पत्र (कि अन्य कोई सरकारी पेंशन नहीं मिल रही)"
    ],
    applySteps: [
      "RTPS बिहार पोर्टल serviceonline.bihar.gov.in पर जाएं।",
      "'समाज कल्याण विभाग की सेवाएं' में जाकर 'मुख्यमंत्री वृद्धजन पेंशन' चुनें।",
      "आधार विवरण भरें और बायोमेट्रिक या OTP से नाम सत्यापित करें।",
      "ब्लॉक स्तर पर BDO द्वारा सत्यापन के बाद हर महीने पेंशन शुरू हो जाएगी।"
    ],
    officialLink: "https://serviceonline.bihar.gov.in",
    cscAssistance: "प्रखंड (Block) के RTPS काउंटर या CSC पर ₹20-30 में फॉर्म भरा जा सकता है।"
  },
  {
    id: "student-credit-card",
    name: "Bihar Student Credit Card (MNSSBY)",
    hindiName: "बिहार स्टूडेंट क्रेडिट कार्ड योजना",
    tagline: "12वीं के बाद उच्च शिक्षा के लिए ₹4 लाख तक का ब्याज-मुक्त शिक्षा ऋण",
    category: "student",
    categoryLabel: "उच्च शिक्षा एवं करियर",
    level: "Bihar State Govt",
    badgeColor: "bg-cyan-500/10 text-cyan-400 border-cyan-500/30",
    icon: "CreditCard",
    benefit: "₹4,00,000 तक शिक्षा ऋण",
    benefitDetail: "बीटेक, एमबीबीएस, बीएससी, बीए, डिप्लोमा, आईटीआई, एमबीए आदि 40+ कोर्स के लिए। लड़कियों और दिव्यांगों को केवल 1% और लड़कों को 4% सामान्य ब्याज, जो नौकरी लगने के बाद चुकाना होता है।",
    whoQualifies: "बिहार के 12वीं पास छात्र (उम्र 25 वर्ष से कम) जो मान्यता प्राप्त कॉलेज में नामांकित हैं",
    eligibilityCriteria: {
      minAge: 17,
      maxAge: 25,
      occupations: ["student", "padhai", "college", "engineer", "doctor", "btech", "polytechnic"],
      states: ["Bihar"],
      keywords: ["higher education", "loan", "credit card", "college fees", "hostel", "btech", "diploma", "bsc", "bca", "drcc", "bihar student"]
    },
    audioExplanationHindi: "बिहार स्टूडेंट क्रेडिट कार्ड योजना के अंतर्गत गरीब छात्रों को कॉलेज की पढ़ाई और रहने-खाने के लिए सरकार चार लाख रुपये तक का लोन देती है, जिसे नौकरी लगने के बाद चुकाना होता है।",
    whyEligibleTemplate: "आप 12वीं के बाद उच्च शिक्षा प्राप्त करना चाहते हैं। आर्थिक तंगी आपकी पढ़ाई न रोके, इसलिए आप ₹4 लाख तक के स्टूडेंट क्रेडिट कार्ड के पात्र हैं।",
    documentsRequired: [
      "10वीं और 12वीं की मार्कशीट एवं प्रमाण पत्र",
      "संस्थान का एडमिशन लेटर एवं फीस स्ट्रक्चर",
      "आवेदक और सह-आवेदक (माता/पिता) का आधार कार्ड एवं पैन कार्ड",
      "बिहार का मूल निवास प्रमाण पत्र",
      "बैंक पासबुक एवं पासपोर्ट साइज फोटो"
    ],
    applySteps: [
      "7nishchay-yuvaupmission.bihar.gov.in पोर्टल पर पंजीकरण करें।",
      "ऑनलाइन फॉर्म भरकर पावती रसीद प्राप्त करें।",
      "दस्तावेजों के साथ अपने जिले के DRCC (जिला निबंधन एवं परामर्श केंद्र) जाएं।",
      "सत्यापन के बाद बैंक द्वारा कार्ड जारी कर फीस सीधे कॉलेज भेजी जाती है।"
    ],
    officialLink: "https://www.7nishchay-yuvaupmission.bihar.gov.in",
    cscAssistance: "जिले के DRCC केंद्र पर जाकर सभी सहायता निःशुल्क प्राप्त की जा सकती है।"
  },
  {
    id: "kushal-yuva-program",
    name: "Kushal Yuva Program (KYP Bihar)",
    hindiName: "कुशल युवा कार्यक्रम (KYP)",
    tagline: "कंप्यूटर, हिंदी-इंग्लिश बोलना और संवाद कौशल की बिल्कुल मुफ्त ट्रेनिंग",
    category: "business",
    categoryLabel: "कौशल विकास एवं रोजगार",
    level: "Bihar State Govt",
    badgeColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
    icon: "Laptop",
    benefit: "मुफ्त कंप्यूटर व स्किल कोर्स + सर्टिफिकेट",
    benefitDetail: "240 घंटे का निःशुल्क प्रशिक्षण: MS Office, इंटरनेट, ईमेल, अंग्रेजी/हिंदी बोलचाल और पर्सनालिटी डेवलपमेंट।",
    whoQualifies: "बिहार के 10वीं या 12वीं पास युवा (उम्र 15 से 28 वर्ष)",
    eligibilityCriteria: {
      minAge: 15,
      maxAge: 28,
      occupations: ["all", "student", "unemployed", "youth", "job seeker"],
      states: ["Bihar"],
      keywords: ["computer", "english", "training", "skill", "certificate", "seekhna", "kyp", "typing", "personality", "bsdm"]
    },
    audioExplanationHindi: "कुशल युवा कार्यक्रम में बिहार के युवाओं को बेसिक कंप्यूटर, अंग्रेजी और हिंदी में बात करने का तरीका और काम करने का हुनर तीन महीने तक फ्री में सिखाया जाता है।",
    whyEligibleTemplate: "आप 10वीं या 12वीं पास युवा हैं और आधुनिक कंप्यूटर व संवाद कौशल सीखना चाहते हैं। आप पूर्णतः निःशुल्क सरकारी ट्रेनिंग और प्रमाण पत्र के पात्र हैं।",
    documentsRequired: [
      "10वीं या 12वीं का पासिंग सर्टिफिकेट/मार्कशीट",
      "आधार कार्ड",
      "बिहार का निवास प्रमाण पत्र",
      "बैंक पासबुक (सुरक्षा राशि ₹1000 हेतु जो कोर्स पूरा होने पर वापस मिल जाती है)"
    ],
    applySteps: [
      "7nishchay-yuvaupmission.bihar.gov.in पर ऑनलाइन आवेदन करें।",
      "अपने जिले के DRCC केंद्र पर जाकर सत्यापन करवाएं।",
      "अपने ब्लॉक के किसी भी अधिकृत KYP सेंटर पर जाकर बैच चुनें।",
      "सफलतापूर्वक कोर्स पूरा करने पर बिहार सरकार का प्रमाण पत्र प्राप्त करें।"
    ],
    officialLink: "https://skillmissionbihar.org",
    cscAssistance: "हर प्रखंड/ब्लॉक में 2 से 3 KYP केंद्र स्थापित हैं जहां सीधे जाकर एडमिशन लिया जा सकता है।"
  }
];

export const SCHEME_CATEGORIES = [
  { id: "all", label: "सभी योजनाएं (All)", icon: "Sparkles" },
  { id: "kisan", label: "कृषि / किसान (Kisan)", icon: "Wheat" },
  { id: "health", label: "स्वास्थ्य (Health)", icon: "HeartPulse" },
  { id: "women", label: "महिला / बेटी (Women)", icon: "GraduationCap" },
  { id: "student", label: "छात्र / पढ़ाई (Students)", icon: "BookOpen" },
  { id: "business", label: "रोजगार / बिज़नेस (Youth)", icon: "Briefcase" },
  { id: "housing", label: "आवास (Housing)", icon: "Home" },
  { id: "elderly", label: "बुजुर्ग / पेंशन (Elderly)", icon: "Users" },
];
