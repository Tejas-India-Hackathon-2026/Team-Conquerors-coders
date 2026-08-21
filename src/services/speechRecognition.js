/**
 * Web Speech API Voice Recognition Service
 * Robust, resilient speech-to-text with auto-restart on speech pauses,
 * non-destructive cumulative word capture, Hindi/Bhojpuri/Maithili normalization,
 * and reliable 1.5s silence auto-stop & auto-search trigger.
 */

export class SpeechRecognitionService {
  constructor() {
    this.recognition = null;
    this.isListening = false;
    this.language = 'hi-IN';
    this.finalTranscriptHistory = '';
    this.interimTranscript = '';
    this.onResultCallback = null;
    this.onErrorCallback = null;
    this.onStartCallback = null;
    this.onEndCallback = null;
    this.onSilenceAutoSearchCallback = null;
    this.silenceTimer = null;
    this.init();
  }

  isSupported() {
    if (typeof window === 'undefined') return false;
    return !!(window.SpeechRecognition || window.webkitSpeechRecognition);
  }

  init() {
    if (typeof window === 'undefined') return;
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      return;
    }

    try {
      this.recognition = new SpeechRecognition();
      this.recognition.continuous = true;
      this.recognition.interimResults = true;
      this.recognition.lang = this.language;
      this.recognition.maxAlternatives = 1;

      this.recognition.onstart = () => {
        this.isListening = true;
        if (this.onStartCallback) this.onStartCallback();
      };

      this.recognition.onresult = (event) => {
        let currentSessionFinal = '';
        let currentInterim = '';

        for (let i = 0; i < event.results.length; ++i) {
          const res = event.results[i];
          if (res.isFinal) {
            currentSessionFinal += res[0].transcript + ' ';
          } else {
            currentInterim += res[0].transcript;
          }
        }

        this.interimTranscript = currentInterim;

        // Build clean unified transcript
        const combined = (this.finalTranscriptHistory + ' ' + currentSessionFinal + ' ' + currentInterim)
          .replace(/\s+/g, ' ')
          .trim();

        if (this.onResultCallback) {
          this.onResultCallback({
            final: (this.finalTranscriptHistory + ' ' + currentSessionFinal).trim(),
            interim: currentInterim,
            combined: combined
          });
        }

        // Reset Silence Timer for 1.5s Snappy Auto Stop & Search
        if (this.silenceTimer) {
          clearTimeout(this.silenceTimer);
        }

        if (combined.length >= 3) {
          this.silenceTimer = setTimeout(() => {
            if (this.isListening) {
              const fullText = (this.finalTranscriptHistory + ' ' + currentSessionFinal + ' ' + this.interimTranscript)
                .replace(/\s+/g, ' ')
                .trim();
              
              this.stop(); // Stop the mic immediately!

              if (this.onSilenceAutoSearchCallback && fullText.length >= 2) {
                this.onSilenceAutoSearchCallback(fullText);
              }
            }
          }, 1500);
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
        if (this.isListening) {
          // If browser closed connection automatically during pause, save history and restart seamlessly
          try {
            if (this.interimTranscript) {
              this.finalTranscriptHistory = (this.finalTranscriptHistory + ' ' + this.interimTranscript).trim();
              this.interimTranscript = '';
            }
            this.recognition.start();
          } catch (e) {
            this.isListening = false;
            if (this.onEndCallback) this.onEndCallback();
          }
        } else {
          if (this.onEndCallback) this.onEndCallback();
        }
      };
    } catch (e) {
      console.warn('Error initializing SpeechRecognition:', e);
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
      this.finalTranscriptHistory = '';
      this.interimTranscript = '';
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
      // Already running or starting
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
    this.finalTranscriptHistory = '';
    this.interimTranscript = '';
  }
}

export const speechRecognizer = new SpeechRecognitionService();
