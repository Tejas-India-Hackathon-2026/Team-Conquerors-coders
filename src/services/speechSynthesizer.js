/**
 * Web Speech API Text-to-Speech (TTS) Service
 * Voices out scheme explanations in natural Hindi with emotion-aware contextual tone
 */

export class SpeechSynthesizerService {
  constructor() {
    this.synth = typeof window !== 'undefined' ? window.speechSynthesis : null;
    this.currentUtterance = null;
    this.voices = [];
    this.isSpeaking = false;
    this.currentPlayingId = null;

    if (this.synth) {
      this.loadVoices();
      if (speechSynthesis.onvoiceschanged !== undefined) {
        speechSynthesis.onvoiceschanged = () => this.loadVoices();
      }
    }
  }

  loadVoices() {
    if (!this.synth) return;
    this.voices = this.synth.getVoices();
  }

  getHindiVoice() {
    const hindiVoice = this.voices.find(v => v.lang === 'hi-IN' || v.lang.startsWith('hi'));
    if (hindiVoice) return hindiVoice;

    const indianEngVoice = this.voices.find(v => v.lang === 'en-IN');
    if (indianEngVoice) return indianEngVoice;

    return this.voices[0] || null;
  }

  speak(text, { id = null, onStart, onEnd, onError, rate = 0.92, pitch = 1.0 } = {}) {
    if (!this.synth) {
      if (onError) onError('TTS_NOT_SUPPORTED');
      return;
    }

    this.stop();

    const utterance = new SpeechSynthesisUtterance(text);
    const voice = this.getHindiVoice();
    if (voice) {
      utterance.voice = voice;
      utterance.lang = voice.lang || 'hi-IN';
    } else {
      utterance.lang = 'hi-IN';
    }

    utterance.rate = rate;
    utterance.pitch = pitch;

    utterance.onstart = () => {
      this.isSpeaking = true;
      this.currentPlayingId = id;
      if (onStart) onStart(id);
    };

    utterance.onend = () => {
      this.isSpeaking = false;
      this.currentPlayingId = null;
      if (onEnd) onEnd(id);
    };

    utterance.onerror = (e) => {
      console.warn('TTS error:', e);
      this.isSpeaking = false;
      this.currentPlayingId = null;
      if (onError) onError(e);
    };

    this.currentUtterance = utterance;
    this.synth.speak(utterance);
  }

  speakWelcome({ onStart, onEnd } = {}) {
    const welcomeMsg = "नमस्ते! मैं योजना साथी हूँ। नीचे बने बड़े माइक बटन को दबाइये और अपनी बात बोलिये — आपको किस सरकारी योजना या सहायता की जरूरत है?";
    this.speak(welcomeMsg, { id: 'welcome-guide', onStart, onEnd, rate: 0.90 });
  }

  /**
   * Emotion-Aware Contextual Result Narration
   * Never inappropriately says 'बधाई हो' for distress, illness, disability or grief!
   */
  speakResultsSummary(matchedSchemes = [], { rawTranscript = '', profile = null, onStart, onEnd } = {}) {
    if (!matchedSchemes || matchedSchemes.length === 0) {
      const noMatchMsg = "आपकी बात सुनी गई। अधिक सटीक योजना खोजने के लिए कृपया अपनी उम्र या काम के बारे में थोड़ा और बताएं।";
      this.speak(noMatchMsg, { id: 'results-summary', onStart, onEnd, rate: 0.90 });
      return;
    }

    const lower = (rawTranscript + ' ' + (profile?.rawTranscript || '')).toLowerCase();
    const topScheme = matchedSchemes[0];
    const secondScheme = matchedSchemes[1];

    // Detect distress/grief/illness/disability/widowhood context
    const isDistressContext = 
      profile?.marital_status === 'widow' ||
      profile?.disability_status === true ||
      profile?.has_pucca_house === false ||
      /विधवा|पति नहीं|बीमारी|इलाज|अस्पताल|विकलांग|दिव्यांग|नुकसान|बर्बाद|गरीबी|कच्चा मकान|लाचार|बेसहारा|vidhwa|widow|bimari|hospital|divyang/i.test(lower);

    let prefix = "";
    if (isDistressContext) {
      prefix = `आपकी जरूरत और परिस्थिति के अनुसार ${matchedSchemes.length} सरकारी सहायता योजनाएं उपलब्ध हैं।`;
    } else {
      prefix = `आपकी जानकारी के अनुसार आपके लिए ${matchedSchemes.length} सरकारी योजनाएं पहचानी गई हैं।`;
    }

    let summaryText = `${prefix} सबसे मुख्य योजना है: ${topScheme.hindiName}, जिसमें आपको ${topScheme.benefit} का लाभ मिल सकता है।`;

    if (secondScheme) {
      summaryText += ` इसके अलावा ${secondScheme.hindiName} भी आपके लिए उपयोगी है।`;
    }

    this.speak(summaryText, { id: 'results-summary', onStart, onEnd, rate: 0.90 });
  }

  stop() {
    if (this.synth) {
      this.synth.cancel();
    }
    this.isSpeaking = false;
    this.currentPlayingId = null;
  }

  isPlaying(id) {
    return this.isSpeaking && (id ? this.currentPlayingId === id : true);
  }
}

export const speechSynthesizer = new SpeechSynthesizerService();
