/**
 * Web Speech API Text-to-Speech (TTS) Service
 * Voices out scheme explanations in Hindi
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
    // Look for Google Hindi, Lekha, or any hi-IN voice
    const hindiVoice = this.voices.find(v => v.lang === 'hi-IN' || v.lang.startsWith('hi'));
    if (hindiVoice) return hindiVoice;

    // Fallback to Indian English
    const indianEngVoice = this.voices.find(v => v.lang === 'en-IN');
    if (indianEngVoice) return indianEngVoice;

    // Fallback to any voice
    return this.voices[0] || null;
  }

  speak(text, { id = null, onStart, onEnd, onError, rate = 0.95, pitch = 1.0 } = {}) {
    if (!this.synth) {
      if (onError) onError('TTS_NOT_SUPPORTED');
      return;
    }

    // Stop any ongoing speech
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

  stop() {
    if (this.synth) {
      this.synth.cancel();
    }
    this.isSpeaking = false;
    this.currentPlayingId = null;
  }

  isPlaying(id) {
    return this.isSpeaking && this.currentPlayingId === id;
  }
}

export const speechSynthesizer = new SpeechSynthesizerService();
