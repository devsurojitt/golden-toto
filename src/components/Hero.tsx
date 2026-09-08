import React from 'react';
import { GoldenTotoLogo } from './GoldenTotoLogo';
import { ScooterVisual } from './ScooterVisual';
import { ArrowRight, CalendarDays } from 'lucide-react';

interface HeroProps { onExploreModels: () => void; onBookTestRide: () => void; }

export const Hero: React.FC<HeroProps> = ({ onExploreModels, onBookTestRide }) => (
  <section id="hero-section" className="floral-wash pt-[76px] bg-[#f7e9e7]">
    <div className="relative min-h-[490px] lg:min-h-[530px] overflow-hidden bg-gradient-to-r from-[#f8ebe9] via-[#f4dddd] to-[#ecd0d2]">
      <div className="absolute inset-0 opacity-30 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 54% 20%, #b66c7e 0 2px, transparent 3px), radial-gradient(circle at 59% 15%, #d794a2 0 14px, transparent 15px), radial-gradient(circle at 63% 23%, #c77a8d 0 18px, transparent 19px), radial-gradient(circle at 67% 12%, #e1a7b2 0 12px, transparent 13px)', backgroundSize: '120px 100px' }} />
      <div className="mx-auto grid max-w-[1440px] grid-cols-1 lg:grid-cols-2 min-h-[490px] lg:min-h-[530px]">
        <div className="relative z-10 flex flex-col justify-center px-6 py-14 sm:px-12 lg:px-20 xl:px-28">
          <span className="mb-3 text-[10px] font-bold tracking-[.18em] text-[#8d2946] sm:text-xs">CLEANER ROADS&nbsp; • &nbsp;BRIGHTER TOMORROW</span>
          <h1 className="max-w-xl text-5xl font-normal leading-[.98] text-[#71253e] sm:text-6xl lg:text-7xl">Ride a<br /><span className="text-[#8d2946]">Greener Future</span></h1>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-[#725a61] sm:text-base">Golden Toto&apos;s electric scooters are built for a smarter, cleaner and better tomorrow.</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <button onClick={onExploreModels} className="inline-flex items-center gap-2 rounded-full bg-[#8d2946] px-6 py-3 text-xs font-bold text-white shadow-lg shadow-[#8d2946]/20 transition hover:bg-[#6f1e37] active:scale-95">Explore Models <ArrowRight className="h-4 w-4" /></button>
            <button onClick={onBookTestRide} className="inline-flex items-center gap-2 rounded-full border border-[#8d2946] bg-white/60 px-6 py-3 text-xs font-bold text-[#8d2946] transition hover:bg-white active:scale-95"><CalendarDays className="h-4 w-4" /> Book a Test Ride</button>
          </div>
          <div className="mt-9 flex gap-5 border-t border-[#b98391]/40 pt-5 sm:gap-9">
            {[['100%', 'Electric'], ['Low', 'Running Cost'], ['Zero', 'Emissions']].map(([big, small], index) => <React.Fragment key={small}><div><strong className="block font-serif text-2xl font-semibold text-[#632139] sm:text-3xl">{big}</strong><span className="text-[11px] text-[#765b62] sm:text-xs">{small}</span></div>{index < 2 && <span className="h-10 w-px bg-[#b98391]/50" />}</React.Fragment>)}
          </div>
        </div>
        <div className="relative hidden min-h-[440px] lg:block">
          <div className="absolute inset-y-0 right-0 w-[68%] rounded-l-[190px] bg-gradient-to-br from-[#8e3855] via-[#812b49] to-[#5b1834] shadow-[-24px_0_60px_rgba(111,30,55,.12)]" />
          <div className="absolute right-8 top-8 z-10 text-center text-white xl:right-20"><GoldenTotoLogo className="h-24" variant="white" /><span className="font-script mt-3 block text-3xl opacity-90">Move with Purpose</span></div>
          <div className="absolute bottom-2 left-[12%] z-20 w-[76%] max-w-[600px] transition-transform duration-500 hover:scale-[1.03]"><ScooterVisual colorway="dusty-rose" className="h-full w-full" /></div>
          <div className="absolute bottom-0 left-[10%] right-[5%] h-12 rounded-[50%] bg-[#f6dce0]/50 blur-md" />
        </div>
      </div>
    </div>
  </section>
);
