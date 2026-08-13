import { useEffect, useRef } from 'react';
import { Howl } from 'howler';

export function useSound(src: string, isActive: boolean, volume: number) {
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

    if (isActive && sound && !sound.playing()) {
      sound.play();
      sound.fade(0, volume / 100, 1000);
    } else if (!isActive && sound && sound.playing()) {
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
  }, [src, isActive, volume]); // Added dependencies to satisfy ESLint

  useEffect(() => {
    if (soundRef.current) {
      soundRef.current.volume(volume / 100);
    }
  }, [volume]);

  return soundRef;
}