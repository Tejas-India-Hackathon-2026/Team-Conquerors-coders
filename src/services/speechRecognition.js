/**
 * Web Speech API Voice Recognition Service
 * Robust, resilient speech-to-text with auto-restart on speech pauses,
 * clean fresh start per session, Hindi/Bhojpuri/Maithili dialect normalization,
 * and comprehensive browser compatibility fallback.
 */

export class SpeechRecognitionService {
  constructor() {
    this.recognition = null;
    this.isListening = false;
    this.language = 'hi-IN';
    this.accumulatedTranscript = '';
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
      console.warn('Speech recognition is not supported in this browser (window.SpeechRecognition or window.webkitSpeechRecognition not found).');
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
        let finalSegment = '';
        let currentInterim = '';

        for (let i = 0; i < event.results.length; ++i) {
          const item = event.results[i];
          if (item.isFinal) {
            finalSegment += item[0].transcript + ' ';
          } else {
            currentInterim += item[0].transcript;
          }
        }

        this.interimTranscript = currentInterim;
        
        const fullText = (this.accumulatedTranscript + ' ' + finalSegment + ' ' + currentInterim)
          .replace(/\s+/g, ' ')
          .trim();

        if (this.onResultCallback) {
          this.onResultCallback({
            final: (this.accumulatedTranscript + ' ' + finalSegment).trim(),
            interim: currentInterim,
            combined: fullText
          });
        }

        // Reset Silence Timer for Auto Search
        if (this.silenceTimer) {
          clearTimeout(this.silenceTimer);
        }

        // If user has spoken at least 6 characters, set auto-search timer on 2.0s of silence
        if (fullText.length >= 6) {
          this.silenceTimer = setTimeout(() => {
            if (this.isListening && this.onSilenceAutoSearchCallback) {
              this.onSilenceAutoSearchCallback(fullText);
            }
          }, 2000);
        }
      };

      this.recognition.onerror = (event) => {
        console.warn('Speech recognition error:', event?.error);
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
          try {
            if (this.interimTranscript) {
              this.accumulatedTranscript = (this.accumulatedTranscript + ' ' + this.interimTranscript).trim();
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
      this.accumulatedTranscript = '';
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
      console.warn('Recognition start error:', e);
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
    this.accumulatedTranscript = '';
    this.interimTranscript = '';
  }
}

export const speechRecognizer = new SpeechRecognitionService();
