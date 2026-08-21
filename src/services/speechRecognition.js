/**
 * Web Speech API Voice Recognition Service
 * Industry-grade speech-to-text with dual-layer silence detection:
 * 1. Native onspeechend detection (fires instant pause event in Web Speech API)
 * 2. 1.2s inactivity timer reset per syllable/word
 * 3. Automatic mic shutdown and instant search dispatch on user silence.
 */

export class SpeechRecognitionService {
  constructor() {
    this.recognition = null;
    this.isListening = false;
    this.language = 'hi-IN';
    this.currentTranscript = '';
    this.onResultCallback = null;
    this.onErrorCallback = null;
    this.onStartCallback = null;
    this.onEndCallback = null;
    this.onSilenceAutoSearchCallback = null;
    this.silenceTimer = null;
    this.hasSpoken = false;
    this.init();
  }

  isSupported() {
    if (typeof window === 'undefined') return false;
    return !!(window.SpeechRecognition || window.webkitSpeechRecognition);
  }

  init() {
    if (typeof window === 'undefined') return;
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    try {
      this.recognition = new SpeechRecognition();
      this.recognition.continuous = true;
      this.recognition.interimResults = true;
      this.recognition.lang = this.language;
      this.recognition.maxAlternatives = 1;

      this.recognition.onstart = () => {
        this.isListening = true;
        this.hasSpoken = false;
        if (this.onStartCallback) this.onStartCallback();
      };

      this.recognition.onresult = (event) => {
        let fullTranscript = '';

        for (let i = 0; i < event.results.length; ++i) {
          fullTranscript += event.results[i][0].transcript + ' ';
        }

        const combined = fullTranscript.replace(/\s+/g, ' ').trim();
        this.currentTranscript = combined;

        if (combined.length >= 2) {
          this.hasSpoken = true;
        }

        if (this.onResultCallback) {
          this.onResultCallback({
            final: combined,
            interim: '',
            combined: combined
          });
        }

        // Layer 2: 1.3-second Silence Inactivity Timer
        if (this.silenceTimer) {
          clearTimeout(this.silenceTimer);
        }

        if (combined.length >= 3) {
          this.silenceTimer = setTimeout(() => {
            if (this.isListening) {
              const textToSearch = this.currentTranscript;
              this.stop(); // Turn off mic UI immediately

              if (this.onSilenceAutoSearchCallback && textToSearch.length >= 2) {
                this.onSilenceAutoSearchCallback(textToSearch);
              }
            }
          }, 1300);
        }
      };

      // Layer 1: Native onspeechend (Fires immediately when human voice stops)
      this.recognition.onspeechend = () => {
        if (this.silenceTimer) {
          clearTimeout(this.silenceTimer);
        }

        if (this.isListening && this.hasSpoken && this.currentTranscript.length >= 3) {
          // Wait 600ms to allow final chunk resolution, then auto search
          this.silenceTimer = setTimeout(() => {
            if (this.isListening) {
              const textToSearch = this.currentTranscript;
              this.stop();
              if (this.onSilenceAutoSearchCallback && textToSearch.length >= 2) {
                this.onSilenceAutoSearchCallback(textToSearch);
              }
            }
          }, 600);
        }
      };

      this.recognition.onerror = (event) => {
        if (event?.error === 'no-speech') return;
        if (event?.error === 'not-allowed' || event?.error === 'service-not-allowed') {
          this.isListening = false;
          if (this.onErrorCallback) this.onErrorCallback('MIC_PERMISSION_DENIED');
        } else {
          if (this.onErrorCallback) this.onErrorCallback(event?.error || 'SPEECH_ERROR');
        }
      };

      this.recognition.onend = () => {
        this.isListening = false;
        if (this.silenceTimer) {
          clearTimeout(this.silenceTimer);
        }
        if (this.onEndCallback) this.onEndCallback();
      };
    } catch (e) {
      console.warn('SpeechRecognition initialization error:', e);
      this.recognition = null;
    }
  }

  setLanguage(langCode) {
    this.language = langCode;
    if (this.recognition) {
      try {
        this.recognition.lang = langCode;
      } catch (e) {}
    }
  }

  start({ lang, onResult, onStart, onEnd, onError, onSilenceAutoSearch, resetFresh = true } = {}) {
    if (!this.isSupported()) {
      if (onError) onError('SPEECH_API_NOT_SUPPORTED');
      return;
    }

    if (!this.recognition) {
      this.init();
    }

    if (!this.recognition) {
      if (onError) onError('SPEECH_API_NOT_SUPPORTED');
      return;
    }

    if (lang) {
      this.setLanguage(lang);
    }

    if (resetFresh) {
      this.currentTranscript = '';
      this.hasSpoken = false;
    }

    if (this.silenceTimer) {
      clearTimeout(this.silenceTimer);
    }

    this.onResultCallback = onResult || null;
    this.onStartCallback = onStart || null;
    this.onEndCallback = onEnd || null;
    this.onErrorCallback = onError || null;
    this.onSilenceAutoSearchCallback = onSilenceAutoSearch || null;

    try {
      this.isListening = true;
      this.recognition.start();
    } catch (e) {
      // Already active or restarting
    }
  }

  stop() {
    this.isListening = false;
    if (this.silenceTimer) {
      clearTimeout(this.silenceTimer);
    }
    if (this.recognition) {
      try {
        this.recognition.stop();
      } catch (e) {}
    }
  }

  reset() {
    this.stop();
    this.currentTranscript = '';
    this.hasSpoken = false;
  }
}

export const speechRecognizer = new SpeechRecognitionService();
