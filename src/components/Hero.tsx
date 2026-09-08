import React from 'react';
import { GoldenTotoLogo } from './GoldenTotoLogo';
import { ArrowRight, CalendarDays } from 'lucide-react';

interface HeroProps { onExploreModels: () => void; onBookTestRide: () => void; }

export const Hero: React.FC<HeroProps> = ({ onExploreModels, onBookTestRide }) => (
  <section id="hero-section" className="relative overflow-hidden bg-[#f6e2e1] pt-[76px]">
    <div className="relative min-h-[470px] sm:min-h-[540px] lg:min-h-[590px]">
      <img src="/assets/shanta-hero.jpg" alt="Dusty rose Golden Toto electric scooter in a floral studio" className="absolute inset-0 h-full w-full object-cover object-[63%_center]" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#f8e9e6]/95 via-[#f8e9e6]/75 to-transparent lg:via-[#f8e9e6]/50" />
      <div className="absolute right-0 top-0 hidden h-full w-[24%] bg-gradient-to-l from-[#6f1e37]/75 to-transparent lg:block" />
      <div className="relative z-10 mx-auto flex min-h-[470px] max-w-[1440px] items-center px-6 py-14 sm:min-h-[540px] sm:px-12 lg:min-h-[590px] lg:px-20 xl:px-28">
        <div className="max-w-[510px]">
          <span className="mb-3 block text-[10px] font-bold tracking-[.18em] text-[#8d2946] sm:text-xs">CLEANER ROADS&nbsp; • &nbsp;BRIGHTER TOMORROW</span>
          <h1 className="text-5xl font-normal leading-[.98] text-[#71253e] sm:text-6xl lg:text-7xl">Ride a<br /><span className="text-[#8d2946]">Greener Future</span></h1>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-[#725a61] sm:text-base">Golden Toto&apos;s electric scooters are built for a smarter, cleaner and better tomorrow.</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <button onClick={onExploreModels} className="inline-flex items-center gap-2 rounded-full bg-[#8d2946] px-6 py-3 text-xs font-bold text-white shadow-lg shadow-[#8d2946]/20 transition hover:bg-[#6f1e37] active:scale-95">Explore Models <ArrowRight className="h-4 w-4" /></button>
            <button onClick={onBookTestRide} className="inline-flex items-center gap-2 rounded-full border border-[#8d2946] bg-white/65 px-6 py-3 text-xs font-bold text-[#8d2946] transition hover:bg-white active:scale-95"><CalendarDays className="h-4 w-4" /> Book a Test Ride</button>
          </div>
          <div className="mt-9 flex gap-5 border-t border-[#b98391]/40 pt-5 sm:gap-9">
            {[['100%', 'Electric'], ['Low', 'Running Cost'], ['Zero', 'Emissions']].map(([big, small], index) => <React.Fragment key={small}><div><strong className="block font-serif text-2xl font-semibold text-[#632139] sm:text-3xl">{big}</strong><span className="text-[11px] text-[#765b62] sm:text-xs">{small}</span></div>{index < 2 && <span className="h-10 w-px bg-[#b98391]/50" />}</React.Fragment>)}
          </div>
        </div>
        <div className="absolute right-5 top-8 hidden text-center text-white drop-shadow-md sm:block lg:right-12 xl:right-20">
          <GoldenTotoLogo className="h-24" variant="white" />
          <span className="font-script mt-2 block text-3xl opacity-90">Move with Purpose</span>
        </div>
      </div>
    </div>
  </section>
);
