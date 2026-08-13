import { useEffect, useRef } from 'react';
import { Howl } from 'howler';

export function useSound(src: string, isActive: boolean, volume: number, isGlobalPlay: boolean) {
  const soundRef = useRef<Howl | null>(null);

  useEffect(() => {
    if (!soundRef.current && src) {
      soundRef.current = new Howl({
        src: [src],
        loop: true,
        volume: volume / 100,
        html5: true, 
      });
    }

    const sound = soundRef.current;
    
    // The sound should only play if it's individually active AND the global player is playing
    const shouldPlay = isActive && isGlobalPlay;

    if (shouldPlay && sound && !sound.playing()) {
      sound.play();
      sound.fade(0, volume / 100, 1000); // 1-second fade in
    } else if (!shouldPlay && sound && sound.playing()) {
      sound.fade(sound.volume(), 0, 1000); // 1-second fade out
      sound.once('fade', () => {
        sound.pause();
      });
    }

    return () => {
      if (sound) {
        sound.unload();
      }
    };
  }, [src, isActive, isGlobalPlay]); // Dependency added for global play

  useEffect(() => {
    if (soundRef.current) {
      soundRef.current.volume(volume / 100);
    }
  }, [volume]);

  return soundRef;
}