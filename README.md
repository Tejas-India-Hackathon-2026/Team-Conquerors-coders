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

## 🏗️ System Architecture

Yojana Sathi follows a modular architecture designed to provide a simple voice-first experience for discovering and understanding government schemes.

### Architecture Flow

User
↓
Voice / Text Input
↓
Speech Recognition & Input Processing
↓
AI Matching Engine
↓
Government Scheme Data
↓
Eligibility & Recommendation
↓
Scheme Details
↓
Voice / Visual Response

### Core Components

- **Voice Interface** — Captures user queries through speech.
- **Speech Recognition** — Converts spoken input into text.
- **AI Matching Engine** — Processes user information and matches relevant schemes.
- **Scheme Data Layer** — Provides government scheme information.
- **Eligibility Engine** — Evaluates whether schemes match user requirements.
- **Scheme Directory** — Allows users to explore available schemes.
- **Scheme Details** — Displays detailed information about selected schemes.
- **CSC Locator** — Helps users find nearby Common Service Centres.
- **Analytics Module** — Tracks relevant application interactions.
- **Responsive UI** — Provides an accessible experience across devices.

## 👤 User Journey

Yojana Sathi is designed to make government schemes easier to discover and understand.

### 1. Start

The user opens Yojana Sathi and interacts with the voice-first interface.

### 2. Tell Your Need

The user can describe their requirement using voice or available input options.

### 3. Understand the User

The application processes the user's information and identifies relevant requirements.

### 4. Find Relevant Schemes

The AI matching system compares the user's needs with available government schemes.

### 5. Check Eligibility

Relevant eligibility information is presented so the user can understand whether a scheme may apply to them.

### 6. Explore Scheme Details

The user can open a scheme to view its important information and requirements.

### 7. Take the Next Step

The user can use the available information and support features, including the CSC locator where applicable.

### User Flow

User
→ Voice / Text Input
