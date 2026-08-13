'use client';

import React, { useState } from 'react';
import { 
  Wind, CloudRain, Tent, Bird, Waves, Droplet, 
  Play, Timer, Volume2, Heart, Umbrella, 
  Trees, Building, Fish, Sofa, Flame, Guitar, 
  Ship, Car, Siren, Users, Train, HardHat, 
  Anchor, Radar, Fan, Tv, Coffee, LucideIcon
} from 'lucide-react';

// --- TypeScript Interfaces ---
interface SoundState {
  active: boolean;
  volume: number;
}

type ActiveSounds = Record<string, SoundState>;

interface SoundConfig {
  id: string;
  name: string;
  icon: LucideIcon;
  file: string;
}

interface CategoryConfig {
  id: string;
  name: string;
  bgImage: string;
  themeColor: string;
  navIcon: LucideIcon;
  sounds: SoundConfig[];
}

interface SoundItemProps {
  sound: SoundConfig;
  activeState?: SoundState;
  onToggle: (id: string) => void;
  onVolumeChange: (id: string, volume: string) => void;
}
// -----------------------------

// --- Centralized Category Data ---
const CATEGORIES: CategoryConfig[] = [
  {
    id: 'forest',
    name: 'Forest',
    bgImage: 'https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=2070&auto=format&fit=crop',
    themeColor: 'bg-[#1b4332]', // Dark Green
    navIcon: Trees,
    sounds: [
      { id: 'forest_wind', name: 'Wind', icon: Wind, file: '/sounds/forest_wind.mp3' },
      { id: 'forest_rain', name: 'Rain', icon: CloudRain, file: '/sounds/forest_rain.mp3' },
      { id: 'forest_tent', name: 'Rain on a tent', icon: Tent, file: '/sounds/tent.mp3' },
      { id: 'forest_birds', name: 'Birds', icon: Bird, file: '/sounds/birds.mp3' },
      { id: 'forest_river', name: 'River', icon: Waves, file: '/sounds/river.mp3' },
      { id: 'forest_drops', name: 'Drops', icon: Droplet, file: '/sounds/drops.mp3' },
    ]
  },
  {
    id: 'beach',
    name: 'Beach',
    bgImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2073&auto=format&fit=crop',
    themeColor: 'bg-[#0f766e]', // Teal
    navIcon: Umbrella,
    sounds: [
      { id: 'beach_waves', name: 'Waves', icon: Waves, file: '/sounds/waves.mp3' },
      { id: 'beach_seagulls', name: 'Seagulls', icon: Bird, file: '/sounds/seagulls.mp3' },
      { id: 'beach_campfire', name: 'Campfire', icon: Flame, file: '/sounds/campfire.mp3' },
      { id: 'beach_rain', name: 'Rain', icon: CloudRain, file: '/sounds/beach_rain.mp3' },
      { id: 'beach_guitar', name: 'Guitar', icon: Guitar, file: '/sounds/guitar.mp3' },
      { id: 'beach_boat', name: 'Boat', icon: Ship, file: '/sounds/boat.mp3' },
    ]
  },
  {
    id: 'urban',
    name: 'Urban',
    bgImage: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?q=80&w=2070&auto=format&fit=crop',
    themeColor: 'bg-[#1e293b]', // Slate
    navIcon: Building,
    sounds: [
      { id: 'urban_traffic', name: 'Traffic', icon: Car, file: '/sounds/traffic.mp3' },
      { id: 'urban_police', name: 'Police', icon: Siren, file: '/sounds/police.mp3' },
      { id: 'urban_people', name: 'People', icon: Users, file: '/sounds/people.mp3' },
      { id: 'urban_train', name: 'Train', icon: Train, file: '/sounds/train.mp3' },
      { id: 'urban_works', name: 'Works', icon: HardHat, file: '/sounds/works.mp3' },
      { id: 'urban_wind', name: 'Wind', icon: Wind, file: '/sounds/urban_wind.mp3' },
    ]
  },
  {
    id: 'underwater',
    name: 'Underwater',
    bgImage: 'https://images.unsplash.com/photo-1682687982501-1e58ea8134d4?q=80&w=2070&auto=format&fit=crop',
    themeColor: 'bg-[#1e3a8a]', // Dark Blue
    navIcon: Fish,
    sounds: [
      { id: 'under_bubbles', name: 'Air bubbles', icon: Droplet, file: '/sounds/bubbles.mp3' },
      { id: 'under_whale', name: 'Whale', icon: Waves, file: '/sounds/whale.mp3' },
      { id: 'under_sea', name: 'Under the sea', icon: Anchor, file: '/sounds/undersea.mp3' },
      { id: 'under_sonar', name: 'Sonar', icon: Radar, file: '/sounds/sonar.mp3' },
    ]
  },
  {
    id: 'home',
    name: 'Home',
    bgImage: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=2069&auto=format&fit=crop',
    themeColor: 'bg-[#453c38]', // Warm Dark Brown/Grey
    navIcon: Sofa,
    sounds: [
      { id: 'home_fan', name: 'Fan', icon: Fan, file: '/sounds/fan.mp3' },
      { id: 'home_rain_window', name: 'Rain on window', icon: CloudRain, file: '/sounds/window_rain.mp3' },
      { id: 'home_tv', name: 'White noise', icon: Tv, file: '/sounds/whitenoise.mp3' },
      { id: 'home_cafe', name: 'Coffee', icon: Coffee, file: '/sounds/coffee.mp3' },
    ]
  }
];

const SoundItem: React.FC<SoundItemProps & { themeColorText: string }> = ({ sound, activeState, onToggle, onVolumeChange, themeColorText }) => {
  const Icon = sound.icon;
  const isActive = activeState?.active || false;
  const volume = activeState?.volume || 50;

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
          // Inject dynamic text color for the active icon to match the category's card background
          className={`transition-colors duration-300 ${isActive ? themeColorText : 'text-white'}`} 
          strokeWidth={1.5}
        />
      </button>
      
      <div className="mt-3 text-center h-12 w-full px-2">
        {isActive ? (
          <input 
            type="range" 
            min="0" 
            max="100" 
            value={volume}
            onChange={(e) => onVolumeChange(sound.id, e.target.value)}
            className="w-full h-1 bg-white/30 rounded-lg appearance-none cursor-pointer accent-white"
          />
        ) : (
          <span className="text-sm font-light tracking-wide text-white/90 line-clamp-2 leading-tight">
            {sound.name}
          </span>
        )}
      </div>
    </div>
  );
};

export default function Home() {
  const [activeSounds, setActiveSounds] = useState<ActiveSounds>({});
  
  // State to track which environment tab is currently open
  const [activeCategoryId, setActiveCategoryId] = useState<string>(CATEGORIES[0].id);

  // Derive the active category object based on state
  const activeCategory = CATEGORIES.find(c => c.id === activeCategoryId) || CATEGORIES[0];

  const toggleSound = (id: string) => {
    setActiveSounds(prev => ({
      ...prev,
      [id]: {
        active: !prev[id]?.active,
        volume: prev[id]?.volume || 50
      }
    }));
  };

  const changeVolume = (id: string, newVolume: string) => {
    setActiveSounds(prev => ({
      ...prev,
      [id]: { ...prev[id], volume: Number(newVolume) }
    }));
  };

  // Helper to convert Tailwind bg class to text class for active icons
  const getTextColorFromBg = (bgClass: string) => {
    return bgClass.replace('bg-', 'text-');
  };

  return (
    <main className="relative h-screen w-full overflow-hidden bg-gray-900 text-white font-sans flex flex-col transition-colors duration-500">
      
      {/* Background Image Layer (Dynamically updates with smooth fade) */}
      <div 
        key={activeCategory.id} // Forces re-render for smooth CSS transitions if added later
        className="absolute inset-0 z-0 bg-cover bg-center transition-all duration-700 ease-in-out" 
        style={{ backgroundImage: `url("${activeCategory.bgImage}")` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/70"></div>
      </div>

      <div className="relative z-10 flex-1 flex flex-col pt-12 px-6 overflow-y-auto pb-40">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-wide drop-shadow-lg transition-all duration-300">
          {activeCategory.name}
        </h1>
        
        {/* Dynamic Card Color */}
        <div className={`${activeCategory.themeColor} rounded-2xl p-6 md:p-8 max-w-2xl mx-auto w-full shadow-2xl transition-colors duration-500`}>
          <div className="grid grid-cols-3 gap-y-8 gap-x-4">
            {activeCategory.sounds.map((sound) => (
              <SoundItem 
                key={sound.id}
                sound={sound}
                activeState={activeSounds[sound.id]}
                onToggle={toggleSound}
                onVolumeChange={changeVolume}
                themeColorText={getTextColorFromBg(activeCategory.themeColor)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Navigation Containers */}
      <div className="absolute z-20 bottom-0 left-0 w-full flex flex-col backdrop-blur-md">
        
        {/* Playback Controls */}
        <div className="bg-black/60 py-4 px-8 flex justify-between items-center w-full border-b border-white/5">
          <button className="text-white/80 hover:text-white transition-colors"><Timer size={26} strokeWidth={1.5}/></button>
          <button className="text-white hover:scale-110 transition-transform"><Play size={32} strokeWidth={1.5} fill="currentColor" /></button>
          <button className="text-white/80 hover:text-white transition-colors"><Volume2 size={26} strokeWidth={1.5}/></button>
        </div>

        {/* Dynamic Environment Navigation Bar */}
        <div className="bg-black/80 py-4 px-6 flex justify-around items-center w-full">
          {CATEGORIES.map((category) => {
            const NavIcon = category.navIcon;
            const isNavActive = activeCategoryId === category.id;
            
            return (
              <button 
                key={category.id}
                onClick={() => setActiveCategoryId(category.id)}
                className={`flex flex-col items-center gap-1 transition-all duration-300 ${
                  isNavActive ? 'text-white scale-110' : 'text-white/50 hover:text-white/80'
                }`}
              >
                <NavIcon size={24} strokeWidth={1.5}/>
                {/* Active Indicator Line */}
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