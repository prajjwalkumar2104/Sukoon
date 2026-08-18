import { useEffect, useRef } from 'react';
import { Howl } from 'howler';

export function useSound(src: string, isActive: boolean, volume: number, isGlobalPlay: boolean, globalVolume: number) {
  const soundRef = useRef<Howl | null>(null);

  // Math: 80% local volume * 50% global volume = 40% actual volume
  const effectiveVolume = (volume / 100) * (globalVolume / 100);

  useEffect(() => {
    if (!soundRef.current && src) {
      soundRef.current = new Howl({
        src: [src],
        loop: true,
        volume: effectiveVolume,
        html5: true, 
      });
    }

    const sound = soundRef.current;
    const shouldPlay = isActive && isGlobalPlay;

    if (shouldPlay && sound && !sound.playing()) {
      sound.play();
      sound.fade(0, effectiveVolume, 1000); 
    } else if (!shouldPlay && sound && sound.playing()) {
      sound.fade(sound.volume(), 0, 1000);
      sound.once('fade', () => {
        sound.pause();
      });
    }

    return () => {
      if (sound) {
        sound.unload();
      }
    };
  }, [src, isActive, isGlobalPlay, effectiveVolume]); 

  // Watch for ANY volume changes and update the audio instance immediately
  useEffect(() => {
    if (soundRef.current) {
      soundRef.current.volume(effectiveVolume);
    }
  }, [effectiveVolume]);

  return soundRef;
}