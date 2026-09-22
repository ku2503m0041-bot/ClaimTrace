import React, { useState, useRef } from 'react';
import { Volume2, VolumeX, Sparkles } from 'lucide-react';

export const AudioAtmosphere: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  const toggleAudio = () => {
    if (isPlaying) {
      if (gainNodeRef.current && audioCtxRef.current) {
        gainNodeRef.current.gain.linearRampToValueAtTime(0.001, audioCtxRef.current.currentTime + 1);
        setTimeout(() => {
          audioCtxRef.current?.suspend();
          setIsPlaying(false);
        }, 1000);
      }
    } else {
      try {
        const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        if (!audioCtxRef.current) {
          const ctx = new AudioContextClass();
          audioCtxRef.current = ctx;

          // Create a warm, calming ambient drone using harmonic sines (low frequency, very soft)
          const masterGain = ctx.createGain();
          masterGain.gain.setValueAtTime(0.001, ctx.currentTime);
          masterGain.gain.linearRampToValueAtTime(0.03, ctx.currentTime + 2);
          masterGain.connect(ctx.destination);
          gainNodeRef.current = masterGain;

          // Low C drone (65.4 Hz) & G (98.0 Hz)
          const freqs = [65.41, 98.0, 130.81, 196.0];
          freqs.forEach((freq, idx) => {
            const osc = ctx.createOscillator();
            const filter = ctx.createBiquadFilter();
            filter.type = 'lowpass';
            filter.frequency.setValueAtTime(320, ctx.currentTime);

            const oscGain = ctx.createGain();
            oscGain.gain.value = idx === 0 ? 0.4 : 0.2;

            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, ctx.currentTime);
            
            // Gentle subtle slow vibrato (LFO)
            const lfo = ctx.createOscillator();
            const lfoGain = ctx.createGain();
            lfo.frequency.value = 0.1 + idx * 0.05;
            lfoGain.gain.value = 0.8;
            lfo.connect(lfoGain);
            lfoGain.connect(osc.frequency);
            lfo.start();

            osc.connect(filter);
            filter.connect(oscGain);
            oscGain.connect(masterGain);
            osc.start();
          });
        } else {
          audioCtxRef.current.resume();
          if (gainNodeRef.current) {
            gainNodeRef.current.gain.linearRampToValueAtTime(0.03, audioCtxRef.current.currentTime + 1.5);
          }
        }
        setIsPlaying(true);
      } catch (err) {
        console.warn('Web Audio could not start:', err);
      }
    }
  };

  return (
    <button
      id="btn-audio-atmosphere"
      onClick={toggleAudio}
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all border ${
        isPlaying
          ? 'bg-amber-50 text-amber-900 border-amber-300 shadow-sm'
          : 'bg-white/80 text-stone-600 border-stone-200 hover:border-stone-300 hover:text-stone-900'
      }`}
      title="Toggle editorial ambient atmosphere"
    >
      {isPlaying ? (
        <>
          <Volume2 className="w-3.5 h-3.5 text-amber-600 animate-pulse" />
          <span>Atmosphere: Active</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
        </>
      ) : (
        <>
          <VolumeX className="w-3.5 h-3.5 text-stone-400" />
          <span>Play Atmosphere</span>
          <Sparkles className="w-3 h-3 text-amber-500/70" />
        </>
      )}
    </button>
  );
};
