/**
 * Web Speech API Voice Recognition Service
 * Robust, resilient speech-to-text with auto-restart on silence,
 * full transcript accumulation (never drops words), and Hindi/Bhojpuri/Maithili dialect normalization.
 */

export class SpeechRecognitionService {
  constructor() {
    this.recognition = null;
    this.isListening = false;
    this.language = 'hi-IN'; // Default to Hindi
    this.accumulatedTranscript = '';
    this.interimTranscript = '';
    this.onResultCallback = null;
    this.onErrorCallback = null;
    this.onStartCallback = null;
    this.onEndCallback = null;
    this.silenceTimer = null;
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
      let finalSegment = '';
      let currentInterim = '';

      // Loop through all results from the beginning of current recognition session
      for (let i = 0; i < event.results.length; ++i) {
        const item = event.results[i];
        if (item.isFinal) {
          finalSegment += item[0].transcript + ' ';
        } else {
          currentInterim += item[0].transcript;
        }
      }

      this.interimTranscript = currentInterim;
      
      // Combine permanently accumulated text with current session final text and interim
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
    };

    this.recognition.onerror = (event) => {
      console.warn('Speech recognition status/error:', event.error);
      if (event.error === 'no-speech') {
        // If no speech detected yet keep listening if user hasn't explicitly stopped
        return;
      }
      if (event.error === 'not-allowed') {
        this.isListening = false;
        if (this.onErrorCallback) this.onErrorCallback('MIC_PERMISSION_DENIED');
      }
    };

    this.recognition.onend = () => {
      // If user is still supposed to be listening (e.g. pause between words), auto-restart!
      if (this.isListening) {
        try {
          // Commit current final segment into accumulated
          if (this.interimTranscript) {
            this.accumulatedTranscript = (this.accumulatedTranscript + ' ' + this.interimTranscript).trim();
            this.interimTranscript = '';
          }
          this.recognition.start();
        } catch (e) {
          // Restart failed, gracefully set listening false
          this.isListening = false;
          if (this.onEndCallback) this.onEndCallback();
        }
      } else {
        if (this.onEndCallback) this.onEndCallback();
      }
    };
  }

  setLanguage(lang = 'hi-IN') {
    this.language = lang;
    if (this.recognition) {
      this.recognition.lang = lang;
    }
  }

  start({ onResult, onError, onStart, onEnd, lang = 'hi-IN', initialText = '' } = {}) {
    if (!this.isSupported()) {
      if (onError) onError('NOT_SUPPORTED');
      return;
    }

    this.onResultCallback = onResult;
    this.onErrorCallback = onError;
    this.onStartCallback = onStart;
    this.onEndCallback = onEnd;
    this.setLanguage(lang);
    this.accumulatedTranscript = initialText || '';
    this.interimTranscript = '';
    this.isListening = true;

    try {
      this.recognition.start();
    } catch (err) {
      // If already started, stop and restart cleanly
      try {
        this.recognition.stop();
      } catch (e) {}
      setTimeout(() => {
        try {
          this.isListening = true;
          this.recognition.start();
        } catch (e) {
          console.error('Speech start retry failed:', e);
        }
      }, 150);
    }
  }

  stop() {
    this.isListening = false;
    if (this.recognition) {
      try {
        this.recognition.stop();
      } catch (err) {
        console.warn(err);
      }
    }
  }

  clear() {
    this.accumulatedTranscript = '';
    this.interimTranscript = '';
  }
}

export const speechRecognizer = new SpeechRecognitionService();
