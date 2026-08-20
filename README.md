# 🎙️ योजना साथी (Yojana Sathi)

> **"बोलो अपनी ज़िंदगी के बारे में, AI बताएगा कौन से सरकारी योजना तुम्हारे लिए हैं — और कैसे अप्लाई करें।"**
>
> _Voice-First AI Assistant connecting every citizen of Bihar and India to government schemes they qualify for._

---

## 🏆 Hackathon Details

- **Project:** Yojana Sathi (योजना साथी)
- **Event:** Tejas India Hackathon 2026 · DPIIT Government of India Initiative
- **Track:** Fintech / Sustainable Development / Open Innovation
- **Team:** **Conqueror Coders**
  - **Saket Shubham (Lead)** — AI Integration & Architecture
  - **Kishan Jee** — Voice Input & Speech Pipeline
  - **Raja Kumar / Suprachi** — Frontend UI & Design
  - **Aditya Prakash / Harshit** — Scheme Database & Documentation
- **Institution:** Government Engineering College, Jamui (Bihar)

---

## 🚀 Key Features

1. **🎙️ Voice-First in Hindi & Hinglish (`hi-IN` / `en-IN`):**
   - Web Speech API integration with zero app install required.
   - Built for citizens who cannot read English or type complex forms.
   - Fallback text input for universal browser compatibility (Chrome, Firefox, Safari).

2. **🧠 Verified AI Scheme Matching:**
   - Real-time entity extraction (`Age`, `Gender`, `Land`, `Income`, `Occupation`, `Housing`, `Location`).
   - Verified against a curated database of Bihar & Central government schemes.

3. **🔊 "सुनिये" Audio Narration (TTS):**
   - Reads out scheme benefits, eligibility reasons, and document requirements in natural Hindi voice.

4. **📋 Interactive Document Checklist & CSC Guide:**
   - Citizens can check off available documents (Aadhaar, Ration card, LPC, Passbook).
   - District-wise CSC and DRCC centers in Bihar with toll-free helplines.

5. **📲 WhatsApp Share, A4 Flyer & Direct Portal Links:**
   - 1-click formatted summary sharing on WhatsApp for families and CSC operators.
   - 1-click A4 village notice flyer generator for Panchayat Bhavans.

6. **🔒 Privacy & Data Protection:**
   - User profile details are strictly processed for scheme matching and kept secure.

---

## 🗺️ Roadmap / Future Scope

- Scheme database ko 10 se badhakar 50+ karna
- Multi-language support (Bhojpuri, Maithili) add karna
- Offline mode for low-bandwidth areas

---

## ⚡ How to Run Locally

```bash
# 1. Install dependencies
npm install

# 2. Start the development server
npm run dev

# 3. Open in your browser:
# http://localhost:5173
```

---

## 🏗️ Tech Stack

- **Frontend:** React 19, Tailwind CSS, Lucide Icons, Canvas-Confetti
- **Build Tool:** Vite 6
- **Voice Engine:** Web Speech API (`SpeechRecognition` / `webkitSpeechRecognition` + `SpeechSynthesis`)
- **Intelligence:** Hybrid Rule Engine + Google Gemini AI Backend Proxy
- **Deployment Ready:** Vercel / Netlify / GitHub Pages
