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

2. **🧠 Zero-Hallucination AI Scheme Matching:**
   - Real-time entity extraction (`Age`, `Gender`, `Land`, `Income`, `Occupation`, `Housing`, `Location`).
   - Verified against a curated database of 10+ Bihar & Central government schemes.

3. **🔊 "सुनिये" Audio Narration (TTS):**
   - Reads out scheme benefits, eligibility reasons, and document requirements in natural Hindi voice.

4. **📋 Interactive Document Checklist & CSC Guide:**
   - Citizens can check off available documents (Aadhaar, Ration card, LPC, Passbook).
   - District-wise CSC and DRCC centers in Bihar with toll-free helplines.

5. **📲 WhatsApp Share & Direct Portal Links:**
   - 1-click formatted summary sharing on WhatsApp for families and CSC operators.

---

## ⚡ How to Run Locally

```bash
# 1. Navigate to project directory
cd /Users/theghost/Desktop/Yojna-sathi

# 2. Start the development server
npm run dev

# 3. Open in your browser:
# http://localhost:5173
```

---

## 🏗️ Tech Stack

- **Frontend:** React 19, Tailwind CSS, Lucide Icons, Canvas-Confetti
- **Build Tool:** Vite 6
- **Voice Engine:** Web Speech API (`webkitSpeechRecognition` + `SpeechSynthesis`)
- **Intelligence:** Hybrid Rule Engine + Google Gemini AI integration
- **Deployment Ready:** Vercel / Netlify / GitHub Pages
