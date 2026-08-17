'use client';

import React, { useState, useEffect } from 'react';
import { 
  Wind, CloudRain, Tent, Bird, Waves, Droplet, 
  Play, Pause, Timer, Volume2, Umbrella, 
  Trees, Building, Fish, Sofa, Flame, Guitar, 
  Ship, Car, Siren, Users, Train, HardHat, 
  Anchor, Radar, Fan, Tv, Coffee, LucideIcon, 
  X, PawPrint, Bug, Bell, Disc, Activity, Clock, Keyboard, Map, Brain
} from 'lucide-react';
import { useSound } from '../hooks/useSound';

// --- TypeScript Interfaces ---
interface SoundState { active: boolean; volume: number; }
type ActiveSounds = Record<string, SoundState>;
interface SoundConfig { id: string; name: string; icon: LucideIcon; file: string; }
interface CategoryConfig { id: string; name: string; bgImage: string; themeColor: string; themeHex: string; navIcon: LucideIcon; sounds: SoundConfig[]; }
interface SoundItemProps { sound: SoundConfig; activeState?: SoundState; onToggle: (id: string) => void;
   onVolumeChange: (id: string, volume: string) => void; themeHex: string; isGlobalPlay: boolean; globalVolume: number; }

// --- Centralized Category Data ---
const CATEGORIES: CategoryConfig[] = [
  {
    id: 'beach',
    name: 'Beach',
    bgImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2073&auto=format&fit=crop',
    themeColor: 'bg-[#0f766e]/40', // Added /85 for transparency
    themeHex: '#0f766e',
    navIcon: Umbrella,
    sounds: [
      { id: 'beach_bonfire', name: 'Bonfire', icon: Flame, file: '/sounds/Beach/beach_bonfire.ogg' },
      { id: 'beach_guitar', name: 'Guitar', icon: Guitar, file: '/sounds/Beach/beach_guitar.ogg' },
      { id: 'beach_storm', name: 'Storm', icon: CloudRain, file: '/sounds/Beach/beach_storm.ogg' },
      { id: 'beach_boat', name: 'Boat', icon: Ship, file: '/sounds/Beach/boat.ogg' },
      { id: 'beach_melody', name: 'Melody', icon: Activity, file: '/sounds/Beach/guitar_melody.ogg' },
      { id: 'beach_waves', name: 'Ocean Waves', icon: Waves, file: '/sounds/Beach/ocean_waves.ogg' },
      { id: 'beach_rain', name: 'Rain', icon: CloudRain, file: '/sounds/Beach/rain_on_the_beach.ogg' },
      { id: 'beach_rowboat', name: 'Rowboat', icon: Anchor, file: '/sounds/Beach/rowboat.ogg' },
      { id: 'beach_seagull', name: 'Seagulls', icon: Bird, file: '/sounds/Beach/seagull.ogg' },
    ]
  },
  {
    id: 'forest',
    name: 'Forest',
    bgImage: 'https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=2070&auto=format&fit=crop',
    themeColor: 'bg-[#1b4332]/40', // Added /85 for transparency
    themeHex: '#1b4332', 
    navIcon: Trees,
    sounds: [
      { id: 'forest_tent', name: 'Tent Rain', icon: Tent, file: '/sounds/Forest/foresr_rain_on_the_t.ogg' }, 
      { id: 'forest_birds', name: 'Birds', icon: Bird, file: '/sounds/Forest/forest_birds.ogg' },
      { id: 'forest_bonfire', name: 'Bonfire', icon: Flame, file: '/sounds/Forest/forest_bonfire.ogg' },
      { id: 'forest_cricket', name: 'Cricket', icon: Bug, file: '/sounds/Forest/forest_cricket.ogg' },
      { id: 'forest_frogs', name: 'Frogs', icon: Bug, file: '/sounds/Forest/forest_frogs.ogg' },
      { id: 'forest_owl1', name: 'Owl 1', icon: Bird, file: '/sounds/Forest/forest_owl1.ogg' },
      { id: 'forest_owl2', name: 'Owl 2', icon: Bird, file: '/sounds/Forest/forest_owl2.ogg' },
      { id: 'forest_rain', name: 'Rain', icon: CloudRain, file: '/sounds/Forest/forest_rain.ogg' },
      { id: 'forest_river', name: 'River', icon: Waves, file: '/sounds/Forest/forest_river.ogg' },
      { id: 'forest_storm', name: 'Storm', icon: CloudRain, file: '/sounds/Forest/forest_storm.ogg' },
      { id: 'forest_waterfall', name: 'Waterfall', icon: Droplet, file: '/sounds/Forest/forest_waterfall.ogg' },
      { id: 'forest_wind', name: 'Wind', icon: Wind, file: '/sounds/Forest/forest_wind.ogg' },
      { id: 'forest_wolf', name: 'Wolf', icon: PawPrint, file: '/sounds/Forest/forest_wolf.ogg' },
      { id: 'forest_woodpecker', name: 'Woodpecker', icon: Bird, file: '/sounds/Forest/forest_woodpecker.ogg' },
    ]
  },
  {
    id: 'home',
    name: 'Home',
    bgImage: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=2069&auto=format&fit=crop',
    themeColor: 'bg-[#453c38]/40',
    themeHex: '#453c38',
    navIcon: Sofa,
    sounds: [
      { id: 'home_brown', name: 'Brown Noise', icon: Tv, file: '/sounds/Home/brown_noise.ogg' },
      { id: 'home_cat', name: 'Cat', icon: PawPrint, file: '/sounds/Home/cat.ogg' },
      { id: 'home_catmeow', name: 'Cat Meowing', icon: PawPrint, file: '/sounds/Home/cat_meowing.ogg' },
      { id: 'home_coffee', name: 'Coffee Maker', icon: Coffee, file: '/sounds/Home/coffee_maker.ogg' },
      { id: 'home_fan', name: 'Fan', icon: Fan, file: '/sounds/Home/fan.ogg' },
      { id: 'home_fire', name: 'Fireplace', icon: Flame, file: '/sounds/Home/fireplace.ogg' },
      { id: 'home_hairdryer', name: 'Hair Dryer', icon: Wind, file: '/sounds/Home/hair_dryer.ogg' },
      { id: 'home_heart', name: 'Heartbeats', icon: Activity, file: '/sounds/Home/heartbeats.ogg' },
      { id: 'home_keyboard', name: 'Keyboard', icon: Keyboard, file: '/sounds/Home/keyboard_typing.ogg' },
      { id: 'home_pink', name: 'Pink Noise', icon: Tv, file: '/sounds/Home/pink_noise.ogg' },
      { id: 'home_shower', name: 'Shower', icon: Droplet, file: '/sounds/Home/shower.ogg' },
      { id: 'home_clock', name: 'Clock', icon: Clock, file: '/sounds/Home/ticking_clock.ogg' },
      { id: 'home_vaccum', name: 'Vacuum', icon: Wind, file: '/sounds/Home/vaccum_cleaner.ogg' },
      { id: 'home_washing', name: 'Washing Machine', icon: Activity, file: '/sounds/Home/washing_machine.ogg' },
      { id: 'home_drops', name: 'Water Drops', icon: Droplet, file: '/sounds/Home/water_drops.ogg' },
      { id: 'home_white', name: 'White Noise', icon: Tv, file: '/sounds/Home/white_noise.ogg' },
      { id: 'home_windout', name: 'Wind Outside', icon: Wind, file: '/sounds/Home/wind_outside_the_h.ogg' },
    ]
  },
  {
    id: 'underwater',
    name: 'Underwater',
    bgImage: 'https://images.unsplash.com/photo-1551244072-5d12893278ab?q=80&w=2070&auto=format&fit=crop',
    themeColor: 'bg-[#1e3a8a]/40',
    themeHex: '#1e3a8a',
    navIcon: Fish,
    sounds: [
      { id: 'under_bubbles', name: 'Bubbles', icon: Droplet, file: '/sounds/Underwater/bubbles.ogg' },
      { id: 'under_whale', name: 'Whales', icon: Waves, file: '/sounds/Underwater/little_whales.ogg' },
      { id: 'under_sonar', name: 'Sonar', icon: Radar, file: '/sounds/Underwater/submarine_sonar.ogg' },
      { id: 'under_sea', name: 'Under the Sea', icon: Anchor, file: '/sounds/Underwater/under_the_sea.ogg' },
      { id: 'under_ambient', name: 'Ambient', icon: Waves, file: '/sounds/Underwater/underwater_ambient.ogg' },
    ]
  },
  {
    id: 'park',
    name: 'Park',
    bgImage: 'https://images.unsplash.com/photo-1519331379826-f10be5486c6f?q=80&w=2070&auto=format&fit=crop',
    themeColor: 'bg-[#4d7c0f]/40',
    themeHex: '#4d7c0f',
    navIcon: Trees,
    sounds: [
      { id: 'park_kids', name: 'Children Playing', icon: Users, file: '/sounds/Park/children_playing.ogg' },
      { id: 'park_dog', name: 'Dog', icon: PawPrint, file: '/sounds/Park/dog_in_the_park.ogg' },
      { id: 'park_ducks', name: 'Ducks', icon: Bird, file: '/sounds/Park/ducks.ogg' },
      { id: 'park_lake', name: 'Lake Waves', icon: Waves, file: '/sounds/Park/lake_waves.ogg' },
      { id: 'park_birds', name: 'Birds', icon: Bird, file: '/sounds/Park/park_birds.ogg' },
      { id: 'park_fountain', name: 'Fountain', icon: Droplet, file: '/sounds/Park/park_fountain.ogg' },
    ]
  },
  {
    id: 'urban',
    name: 'Urban',
    bgImage: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?q=80&w=2070&auto=format&fit=crop',
    themeColor: 'bg-[#1e293b]/40',
    themeHex: '#1e293b',
    navIcon: Building,
    sounds: [
      { id: 'urban_airport', name: 'Airport', icon: Building, file: '/sounds/Urban and Ciry/airport_noise.ogg' },
      { id: 'urban_rain', name: 'City Rain', icon: CloudRain, file: '/sounds/Urban and Ciry/city_rain.ogg' },
      { id: 'urban_rain_hit', name: 'Rain Hitting', icon: Droplet, file: '/sounds/Urban and Ciry/city_rain_hitting_a_.ogg' },
      { id: 'urban_wind', name: 'City Wind', icon: Wind, file: '/sounds/Urban and Ciry/city_wind.ogg' },
      { id: 'urban_construction', name: 'Construction', icon: HardHat, file: '/sounds/Urban and Ciry/construction_work.ogg' },
      { id: 'urban_crowd', name: 'Crowd', icon: Users, file: '/sounds/Urban and Ciry/crowd_noise.ogg' },
      { id: 'urban_train_in', name: 'Inside Train', icon: Train, file: '/sounds/Urban and Ciry/inside_a_train.ogg' },
      { id: 'urban_pigeons', name: 'Pigeons', icon: Bird, file: '/sounds/Urban and Ciry/pigeons.ogg' },
      { id: 'urban_police', name: 'Police Siren', icon: Siren, file: '/sounds/Urban and Ciry/police_siren.ogg' },
      { id: 'urban_traffic', name: 'Traffic', icon: Car, file: '/sounds/Urban and Ciry/traffic.ogg' },
      { id: 'urban_train_pass', name: 'Train Passing', icon: Train, file: '/sounds/Urban and Ciry/train_passing.ogg' },
      { id: 'urban_truck', name: 'Truck Engine', icon: Car, file: '/sounds/Urban and Ciry/truck_engine.ogg' },
    ]
  },
  {
    id: 'countryside',
    name: 'Countryside',
    bgImage: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2032&auto=format&fit=crop',
    themeColor: 'bg-[#65a30d]/40',
    themeHex: '#65a30d',
    navIcon: Map,
    sounds: [
      { id: 'country_cow', name: 'Cow', icon: PawPrint, file: '/sounds/Canp Field Countryside/cow.ogg' },
      { id: 'country_dog', name: 'Dog', icon: PawPrint, file: '/sounds/Canp Field Countryside/dog.ogg' },
      { id: 'country_birds', name: 'Field Birds', icon: Bird, file: '/sounds/Canp Field Countryside/field_birds.ogg' },
      { id: 'country_hens', name: 'Hens', icon: Bird, file: '/sounds/Canp Field Countryside/hens.ogg' },
      { id: 'country_horse', name: 'Horse', icon: PawPrint, file: '/sounds/Canp Field Countryside/horse.ogg' },
      { id: 'country_pigs', name: 'Pigs', icon: PawPrint, file: '/sounds/Canp Field Countryside/pigs.ogg' },
      { id: 'country_rain', name: 'Rain', icon: CloudRain, file: '/sounds/Canp Field Countryside/rain_in_the_field.ogg' },
      { id: 'country_rooster', name: 'Rooster', icon: Bird, file: '/sounds/Canp Field Countryside/rooster.ogg' },
      { id: 'country_sheep', name: 'Sheep', icon: PawPrint, file: '/sounds/Canp Field Countryside/sheep.ogg' },
      { id: 'country_storm', name: 'Storm', icon: CloudRain, file: '/sounds/Canp Field Countryside/storm_in_the_field.ogg' },
      { id: 'country_stream', name: 'Stream', icon: Waves, file: '/sounds/Canp Field Countryside/stream.ogg' },
      { id: 'country_wind', name: 'Wind', icon: Wind, file: '/sounds/Canp Field Countryside/wind_in_the_field.ogg' },
    ]
  },
  {
    id: 'eastasia',
    name: 'East Asia',
    bgImage: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=2070&auto=format&fit=crop',
    themeColor: 'bg-[#991b1b]/40',
    themeHex: '#991b1b',
    navIcon: Activity,
    sounds: [
      { id: 'asia_bamboo', name: 'Bamboo Wind', icon: Wind, file: '/sounds/East Asia/bamboo_wind.ogg' },
      { id: 'asia_flute', name: 'Chinese Flute', icon: Activity, file: '/sounds/East Asia/chinese_flute.ogg' },
      { id: 'asia_duduk', name: 'Duduk', icon: Activity, file: '/sounds/East Asia/duduk.ogg' },
      { id: 'asia_cicada', name: 'Cicada', icon: Bug, file: '/sounds/East Asia/japanese_cicada.ogg' },
      { id: 'asia_om', name: 'Om', icon: Activity, file: '/sounds/East Asia/om.ogg' },
      { id: 'asia_ritual', name: 'Ritual', icon: Flame, file: '/sounds/East Asia/ritual.ogg' },
      { id: 'asia_singing', name: 'Singing Bowl', icon: Disc, file: '/sounds/East Asia/singing_bowl.ogg' },
      { id: 'asia_taiko', name: 'Taiko', icon: Activity, file: '/sounds/East Asia/taiko.ogg' },
      { id: 'asia_tibetan', name: 'Tibetan Bowl', icon: Disc, file: '/sounds/East Asia/tibetan_bowl.ogg' },
      { id: 'asia_silver', name: 'Tibetan Silver', icon: Bell, file: '/sounds/East Asia/tibetan_silver.ogg' },
      { id: 'asia_chimes', name: 'Wind Chimes', icon: Bell, file: '/sounds/East Asia/wind_chimes.ogg' },
    ]
  },
  {
    id: 'instrumental',
    name: 'Instrumental',
    bgImage: 'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?q=80&w=2070&auto=format&fit=crop',
    themeColor: 'bg-[#312e81]/40',
    themeHex: '#312e81',
    navIcon: Guitar,
    sounds: [
      { id: 'inst_andantino', name: 'Andantino', icon: Activity, file: '/sounds/Instrumental/musical_andantino.ogg' },
      { id: 'inst_relax', name: 'Deep Relax', icon: Activity, file: '/sounds/Instrumental/musical_deeprelax.ogg' },
      { id: 'inst_gymnopedie', name: 'Gymnopedie', icon: Activity, file: '/sounds/Instrumental/musical_gymnopedie.ogg' },
      { id: 'inst_harp', name: 'Harp', icon: Activity, file: '/sounds/Instrumental/musical_harp.ogg' },
      { id: 'inst_kalimba', name: 'Kalimba', icon: Activity, file: '/sounds/Instrumental/musical_kalimba.ogg' },
      { id: 'inst_meditation', name: 'Meditation', icon: Activity, file: '/sounds/Instrumental/musical_meditation.ogg' },
      { id: 'inst_nana', name: 'Nana', icon: Activity, file: '/sounds/Instrumental/musical_nana.ogg' },
      { id: 'inst_neptune', name: 'Neptune', icon: Activity, file: '/sounds/Instrumental/musical_neptune.ogg' },
      { id: 'inst_shappire', name: 'Sapphire', icon: Activity, file: '/sounds/Instrumental/musical_shappire.ogg' },
      { id: 'inst_violin', name: 'Violin', icon: Activity, file: '/sounds/Instrumental/musical_violin.ogg' },
    ]
  },
  {
    id: 'isochronic',
    name: 'Isochronic',
    bgImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2064&auto=format&fit=crop',
    themeColor: 'bg-[#4c1d95]/40',
    themeHex: '#4c1d95',
    navIcon: Brain,
    sounds: [
      { id: 'iso_acupunt', name: 'Acupuncture', icon: Activity, file: '/sounds/Isochronic/isocronico_acupunt.ogg' }, 
      { id: 'iso_circulaci', name: 'Circulation', icon: Activity, file: '/sounds/Isochronic/isocronico_circulaci.ogg' },
      { id: 'iso_depresion', name: 'Depression', icon: Activity, file: '/sounds/Isochronic/isocronico_depresion.ogg' },
      { id: 'iso_intelige', name: 'Intelligence', icon: Brain, file: '/sounds/Isochronic/isocronico_intelige.ogg' },
      { id: 'iso_jaqueca', name: 'Headache', icon: Activity, file: '/sounds/Isochronic/isocronico_jaqueca.ogg' },
      { id: 'iso_regener', name: 'Regeneration', icon: Activity, file: '/sounds/Isochronic/isocronico_regener.ogg' },
    ]
  }
];

const SoundItem: React.FC<SoundItemProps> = ({ sound, activeState, onToggle, onVolumeChange, themeHex, isGlobalPlay ,globalVolume}) => {
  const Icon = sound.icon;
  const isActive = activeState?.active || false;
  const volume = activeState?.volume || 50;

  useSound(sound.file, isActive, volume, isGlobalPlay, globalVolume);

  return (
    <div className="flex flex-col items-center select-none group">
      <button 
        onClick={() => onToggle(sound.id)}
        className={`w-20 h-20 md:w-24 md:h-24 rounded-full border-[1.5px] flex items-center justify-center transition-all duration-300 ${
          isActive ? 'bg-white border-white' : 'bg-transparent border-white hover:bg-white/10'
        }`}
      >
        <Icon 
          size={32} 
          style={{ color: isActive ? themeHex : '#ffffff' }}
          className="transition-colors duration-300" 
          strokeWidth={1.5}
        />
      </button>
      
      <div className="mt-3 text-center h-12 w-full px-2">
        {isActive ? (
          <input 
            type="range" 
            min="0" max="100" value={volume}
            onChange={(e) => onVolumeChange(sound.id, e.target.value)}
            className="w-full h-1 bg-white/30 rounded-lg appearance-none cursor-pointer accent-white"
          />
        ) : (
          <span className="text-sm font-light tracking-wide text-white/90 line-clamp-2 leading-tight">{sound.name}</span>
        )}
      </div>
    </div>
  );
};

export default function Home() {
  const [activeSounds, setActiveSounds] = useState<ActiveSounds>({});
  const [activeCategoryId, setActiveCategoryId] = useState<string>(CATEGORIES[0].id);
  const [isGlobalPlay, setIsGlobalPlay] = useState<boolean>(true);
  const [showTimerMenu, setShowTimerMenu] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number | null>(null); 
  
  // NEW: Global Volume State
  const [globalVolume, setGlobalVolume] = useState<number>(100);

  const activeCategory = CATEGORIES.find(c => c.id === activeCategoryId) || CATEGORIES[0];

  // Timer Countdown Logic
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timeLeft !== null && timeLeft > 0 && isGlobalPlay) {
      interval = setInterval(() => {
        setTimeLeft(prev => (prev ? prev - 1 : 0));
      }, 1000);
    } else if (timeLeft === 0) {
      setIsGlobalPlay(false);
      setTimeLeft(null);
    }
    return () => clearInterval(interval);
  }, [timeLeft, isGlobalPlay]);

  const setTimer = (minutes: number) => {
    setTimeLeft(minutes * 60);
    setIsGlobalPlay(true);
    setShowTimerMenu(false);
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const toggleSound = (id: string) => {
    setActiveSounds(prev => ({
      ...prev,
      [id]: { active: !prev[id]?.active, volume: prev[id]?.volume || 50 }
    }));
  };

  const changeVolume = (id: string, newVolume: string) => {
    setActiveSounds(prev => ({
      ...prev,
      [id]: { ...prev[id], volume: Number(newVolume) }
    }));
  };

  return (
    <main className="relative h-screen w-full overflow-hidden bg-gray-900 text-white font-sans flex flex-col transition-colors duration-500">
      
      {/* Background Image Layer */}
      <div 
        key={activeCategory.id} 
        className="absolute inset-0 z-0 bg-cover bg-center transition-all duration-700 ease-in-out" 
        style={{ backgroundImage: `url("${activeCategory.bgImage}")` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/70"></div>
      </div>

      <div className="relative z-10 flex-1 flex flex-col pt-12 px-6 overflow-y-auto pb-40">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-wide drop-shadow-lg transition-all duration-300">
          {activeCategory.name}
        </h1>
        
        {/* FIX 3: Render ALL categories but hide the inactive ones. This prevents React from destroying the audio players! */}
        {CATEGORIES.map((category) => (
          <div 
            key={category.id}
            // FIX 1: Added backdrop-blur-md for frosted glass effect and opacity via the modified themeColor array
            className={`${category.themeColor} backdrop-blur-md rounded-2xl p-6 md:p-8 max-w-2xl mx-auto w-full shadow-2xl transition-all duration-500 ${
              category.id === activeCategoryId ? 'block' : 'hidden'
            }`}
          >
            <div className="grid grid-cols-3 gap-y-8 gap-x-4">
              {category.sounds.map((sound) => (
                <SoundItem 
                  key={sound.id}
                  sound={sound}
                  activeState={activeSounds[sound.id]}
                  onToggle={toggleSound}
                  onVolumeChange={changeVolume}
                  themeHex={category.themeHex}
                  isGlobalPlay={isGlobalPlay}
                  globalVolume={globalVolume}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Timer Overlay Menu */}
      {showTimerMenu && (
        <div className="absolute inset-0 z-30 bg-black/80 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-[#1b2533] p-8 rounded-2xl flex flex-col items-center gap-4 max-w-xs w-full shadow-2xl relative">
            <button onClick={() => setShowTimerMenu(false)} className="absolute top-4 right-4 text-white/50 hover:text-white"><X size={24} /></button>
            <h3 className="text-xl font-bold mb-4">Sleep Timer</h3>
            {[15, 30, 60, 120].map(mins => (
              <button key={mins} onClick={() => setTimer(mins)} className="w-full py-3 rounded-lg border border-white/20 hover:bg-white hover:text-black transition-colors">{mins} Minutes</button>
            ))}
            {timeLeft !== null && <button onClick={() => setTimeLeft(null)} className="w-full py-3 mt-2 rounded-lg text-red-400 hover:bg-red-400/10 transition-colors">Cancel Active Timer</button>}
          </div>
        </div>
      )}

      {/* Bottom Navigation Containers */}
      <div className="absolute z-20 bottom-0 left-0 w-full flex flex-col backdrop-blur-md">
        
        <div className="bg-black/60 py-4 px-8 flex justify-between items-center w-full border-b border-white/5 h-20">
          {/* Timer Button */}
          <button onClick={() => setShowTimerMenu(true)} className="flex flex-col items-center min-w-[80px] items-start text-white/80 hover:text-white transition-colors">
            <Timer size={26} strokeWidth={1.5} className={timeLeft ? 'text-green-400' : ''}/>
            {timeLeft !== null && <span className="text-xs mt-1 text-green-400 font-mono">{formatTime(timeLeft)}</span>}
          </button>
          
          {/* Play/Pause Button */}
          <button onClick={() => setIsGlobalPlay(!isGlobalPlay)} className="text-white hover:scale-110 transition-transform bg-white/10 p-4 rounded-full">
            {isGlobalPlay ? <Pause size={28} fill="currentColor" /> : <Play size={28} fill="currentColor" />}
          </button>
          
          {/* FIX 2: Global Volume Slider Implementation */}
          <div className="flex items-center gap-3 min-w-[80px] justify-end group">
            <Volume2 size={26} strokeWidth={1.5} className="text-white/80" />
            <input 
              type="range" 
              min="0" max="100" 
              value={globalVolume}
              onChange={(e) => setGlobalVolume(Number(e.target.value))}
              className="w-16 md:w-24 h-1 bg-white/30 rounded-lg appearance-none cursor-pointer accent-white"
            />
          </div>
        </div>

        <div className="bg-black/80 py-4 px-6 flex items-center w-full overflow-x-auto gap-8 no-scrollbar">
          {CATEGORIES.map((category) => {
            const NavIcon = category.navIcon;
            const isNavActive = activeCategoryId === category.id;
            
            return (
              <button 
                key={category.id}
                onClick={() => setActiveCategoryId(category.id)}
                className={`flex flex-col items-center gap-1 transition-all duration-300 min-w-[60px] ${
                  isNavActive ? 'text-white scale-110' : 'text-white/50 hover:text-white/80'
                }`}
              >
                <NavIcon size={24} strokeWidth={1.5}/>
                {isNavActive && (
                  <div className="w-4 h-[2px] bg-white rounded-full mt-1"></div>
                )}
              </button>
            )
          })}
        </div>
      </div>
    </main>
  );
}