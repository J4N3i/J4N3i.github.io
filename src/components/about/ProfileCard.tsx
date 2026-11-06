import type { RefObject } from 'react';
import { Handshake } from 'phosphor-react';
import { profile } from '@/data';

interface ProfileCardProps {
  imageRef: RefObject<HTMLDivElement>;
}

export const ProfileCard = ({ imageRef }: ProfileCardProps) => {
  return (
    <div
      ref={imageRef}
      className="relative flex justify-center lg:justify-start order-2 lg:order-1"
    >
      <div className="relative w-72 h-72 lg:w-96 lg:h-96 group">
        {/* Ambient Glow (Static & Subtle) */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary/20 to-accent-violet/20 blur-[60px] opacity-40" />

        {/* Image Container - Premium Double Ring */}
        <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white/5 ring-1 ring-white/10 shadow-2xl shadow-black/50 transition-all duration-500 group-hover:border-primary/20 group-hover:ring-primary/20">
          <img
            src="/lovable-uploads/30872b2d-0d86-4a0b-846f-852771a82f6e.png"
            alt={`${profile.name} — CS undergraduate at SLIIT, Full-Stack Developer and DevOps Engineer`}
            width="384"
            height="384"
            loading="lazy"
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-[1.02]"
          />

          {/* Subtle Inner Shadow/Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-40 group-hover:opacity-20 transition-opacity duration-500" />
        </div>

        {/* Floating Badge - Interactive */}
        <a
          href="#contact"
          className="absolute -bottom-4 -right-4 glass-card px-6 py-3 rounded-full border border-white/10 shadow-xl animate-float-slow hidden md:block group-hover:scale-110 transition-transform duration-300 cursor-pointer overflow-hidden"
        >
          {/* Default State: Available for Projects */}
          <div className="flex items-center gap-3 transition-transform duration-300 group-hover:-translate-y-10">
            <div className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </div>
            <span className="text-sm font-medium text-foreground">Available for Projects</span>
          </div>

          {/* Hover State: Let's Collaborate */}
          <div className="absolute inset-0 flex items-center justify-center gap-2 transition-transform duration-300 translate-y-10 group-hover:translate-y-0 bg-surface-elevated/90 backdrop-blur-md">
            <Handshake size={20} weight="fill" className="text-primary" />
            <span className="text-sm font-bold text-primary">Let's Collaborate</span>
          </div>
        </a>
      </div>
    </div>
  );
};
