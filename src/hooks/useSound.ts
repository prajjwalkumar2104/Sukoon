import { useEffect, useRef } from 'react';
import { Howl } from 'howler';

export default function useSound(
  src: string, 
  volume: number, 
  isPlaying: boolean, 
  effectiveVolume: number = 100 // Fallback in case this isn't passed
) {
  const soundRef = useRef<Howl | null>(null);

  // 1. Initialize the Howler instance
  useEffect(() => {
    soundRef.current = new Howl({
      src: [src],
      loop: true,
      // Calculate initial volume (Howler uses 0.0 to 1.0)
      volume: (volume / 100) * (effectiveVolume / 100),
      // html5: false forces the Web Audio API. 
      // This is the MAGIC trick that fixes the 200kb bug and the iOS volume lock!
      html5: false, 
    });

    // Cleanup when component unmounts
    return () => {
      soundRef.current?.unload();
    };
  }, [src]); // Only re-run if the audio file source changes

  // 2. Handle Play / Pause State
  useEffect(() => {
    if (!soundRef.current) return;

    if (isPlaying) {
      if (!soundRef.current.playing()) {
        soundRef.current.play();
      }
    } else {
      soundRef.current.pause();
    }
  }, [isPlaying]);

  // 3. Handle Volume Changes (Works on Mobile!)
  useEffect(() => {
    if (!soundRef.current) return;
    
    // Combine the local slider volume with the master global volume
    const finalVolume = (volume / 100) * (effectiveVolume / 100);
    soundRef.current.volume(finalVolume);
    
  }, [volume, effectiveVolume]);
}