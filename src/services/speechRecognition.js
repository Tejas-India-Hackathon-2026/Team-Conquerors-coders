/**
 * Web Speech API Voice Recognition Service
 * Supports Hindi (hi-IN) and Indian English (en-IN)
 */

export class SpeechRecognitionService {
  constructor() {
    this.recognition = null;
    this.isListening = false;
    this.language = 'hi-IN'; // Default to Hindi
    this.onResultCallback = null;
    this.onErrorCallback = null;
    this.onStartCallback = null;
    this.onEndCallback = null;
    this.init();
  }

  isSupported() {
    return !!(window.SpeechRecognition || window.webkitSpeechRecognition);
  }

  init() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      console.warn('Web Speech API is not supported in this browser.');
      return;
    }

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
      let interimTranscript = '';
      let finalTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        } else {
          interimTranscript += event.results[i][0].transcript;
        }
      }

      if (this.onResultCallback) {
        this.onResultCallback({
          final: finalTranscript,
          interim: interimTranscript,
          combined: finalTranscript || interimTranscript
        });
      }
    };

    this.recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      this.isListening = false;
      if (this.onErrorCallback) this.onErrorCallback(event.error);
    };

    this.recognition.onend = () => {
      this.isListening = false;
      if (this.onEndCallback) this.onEndCallback();
    };
  }

  setLanguage(lang = 'hi-IN') {
    this.language = lang;
    if (this.recognition) {
      this.recognition.lang = lang;
    }
  }

  start({ onResult, onError, onStart, onEnd, lang = 'hi-IN' } = {}) {
    if (!this.isSupported()) {
      if (onError) onError('NOT_SUPPORTED');
      return;
    }

    this.onResultCallback = onResult;
    this.onErrorCallback = onError;
    this.onStartCallback = onStart;
    this.onEndCallback = onEnd;
    this.setLanguage(lang);

    try {
      this.recognition.start();
    } catch (err) {
      console.warn('Recognition already started or error:', err);
      // Restart cleanly
      this.recognition.stop();
      setTimeout(() => {
        try {
          this.recognition.start();
        } catch (e) {
          console.error(e);
        }
      }, 200);
    }
  }

  stop() {
    if (this.recognition && this.isListening) {
      try {
        this.recognition.stop();
      } catch (err) {
        console.error(err);
      }
    }
    this.isListening = false;
  }
}

export const speechRecognizer = new SpeechRecognitionService();
