
import type { Profile } from '@/types/database.types';

interface HeroProps {
  profile?: Profile;
}

export default function Hero({ profile }: HeroProps) {
  return (
    <section id="hero" className="container mx-auto px-6 py-20 lg:py-32 flex flex-col-reverse lg:flex-row items-center gap-16 lg:gap-8">
      <div className="flex-1 space-y-6 z-10 relative">
        <h3 className="text-2xl font-semibold text-gray-800">Hi I am</h3>
        <h2 className="text-[#FD6F00] text-4xl font-bold tracking-tight">Sean Hao</h2>
        <h1 className="text-[5rem] lg:text-[7rem] font-bold leading-[1.1] tracking-tighter text-[#1A1A1A]">
          Full Stack 
          <br />
          <span className="pl-16 lg:pl-32 block">Developer</span>
        </h1>
        <p className="text-gray-600 text-lg leading-relaxed max-w-xl">
          {profile?.hero_intro || "10+年计算机专业工作经验，其中7年前端 + 1年前后端一体 + 3年测试/测开背景的全栈工程师，擅长从0到1交付业务系统与工程化架构，兼顾性能、质量与上线效率。"}
        </p>
        <div className="pt-4">
          <a
            href={profile?.phone ? `tel:${profile.phone}` : '#contact'}
            className="inline-flex items-center justify-center bg-[#FD6F00] text-white px-10 py-4 rounded-lg hover:bg-[#e06200] transition-colors font-semibold text-lg shadow-md hover:shadow-lg cursor-pointer"
            aria-label={profile?.phone ? `Call ${profile.phone}` : 'Contact me'}
          >
            Hire Me
          </a>
        </div>
      </div>
      <div className="flex-1 flex flex-col items-center lg:items-end justify-center relative w-full">
        <div className="relative w-[320px] h-[320px] sm:w-[400px] sm:h-[400px] lg:w-[480px] lg:h-[480px]">
          <div className="absolute inset-0 bg-[#FD6F00] rounded-full translate-x-4 -translate-y-4 lg:translate-x-8 lg:-translate-y-8 opacity-95"></div>
          <div className="absolute inset-0 rounded-full overflow-hidden border-8 border-white z-10 shadow-sm bg-gray-100">
            <img
              src="/assets/avatar.png"
              alt="Sean Hao"
              className="w-full h-full object-cover scale-110 translate-y-4"
            />
          </div>
        </div>
        <div className="flex gap-6 mt-12 lg:mr-16 z-10 relative">
          <a href="#" className="text-[#333333] hover:text-[#FD6F00] transition-colors" aria-label="Facebook">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
            </svg>
          </a>
          <a href="#" className="text-[#333333] hover:text-[#FD6F00] transition-colors" aria-label="Twitter">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53A4.48 4.48 0 0 0 22.43 1a9.09 9.09 0 0 1-2.88 1.1A4.52 4.52 0 0 0 16.11 0c-2.5 0-4.5 2.24-4.5 5a5.09 5.09 0 0 0 .12 1.14A12.94 12.94 0 0 1 1.64 1.15 4.75 4.75 0 0 0 1 3.91a4.48 4.48 0 0 0 2 3.74A4.48 4.48 0 0 1 .88 7v.06A4.5 4.5 0 0 0 4.5 11.5a4.49 4.49 0 0 1-2 .08 4.51 4.51 0 0 0 4.2 3.12A9.05 9.05 0 0 1 1 19.54a12.87 12.87 0 0 0 6.95 2.04c8.35 0 12.91-6.9 12.91-12.89 0-.2 0-.4-.01-.6A9.18 9.18 0 0 0 23 3z" />
            </svg>
          </a>
          <a href="#" className="text-[#333333] hover:text-[#FD6F00] transition-colors" aria-label="Instagram">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <path d="M17.5 6.5h.01" />
            </svg>
          </a>
          <a href="#" className="text-[#333333] hover:text-[#FD6F00] transition-colors" aria-label="LinkedIn">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
              <rect x="2" y="9" width="4" height="12" />
              <circle cx="4" cy="4" r="2" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
