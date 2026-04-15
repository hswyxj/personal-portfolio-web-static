
import { useEffect, useState } from 'react';
import type { Profile } from '@/types/database.types';

interface HeroProps {
  profile?: Profile;
}

export default function Hero({ profile }: HeroProps) {
  const [loaded, setLoaded] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setLoaded(true), 60);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <section
      id="hero"
      className={`container mx-auto px-6 py-20 lg:py-32 flex flex-col-reverse lg:flex-row items-center gap-16 lg:gap-8 transition-all duration-1000 ease-out ${
        loaded ? 'hero-loaded' : 'hero-initial'
      }`}
    >
      <div className="flex-1 space-y-6 z-10 relative">
        <h3 className="text-2xl font-semibold text-gray-800">Hi I am</h3>
        <h2 className="text-[#FD6F00] text-4xl font-bold tracking-tight">Sean Hao</h2>
        <h1 className="text-parallax text-[3.8rem] lg:text-[7rem] font-bold leading-[1.1] tracking-tighter">
          Full Stack 
          <br />
          <span className="pl-16 lg:pl-32 block">Developer</span>
        </h1>
        <p className="text-gray-600 text-lg leading-relaxed max-w-xl">
          {profile?.hero_intro || "10+年计算机专业工作经验，其中7年前端 + 1年前后端一体 + 3年测试/测开背景的全栈工程师，擅长从0到1交付业务系统与工程化架构，兼顾性能、质量与上线效率。"}
        </p>
        <div className="pt-4">
          <svg className="hidden" aria-hidden="true">
            <defs>
              <filter id="noise" colorInterpolationFilters="linearRGB" filterUnits="objectBoundingBox" primitiveUnits="userSpaceOnUse">
                <feTurbulence type="turbulence" baseFrequency="0.001 0.005" numOctaves="2" seed="2" stitchTiles="stitch" x="0%" y="0%" width="100%" height="100%" result="turbulence"/>
                <feDisplacementMap in="SourceGraphic" in2="turbulence" scale="30" xChannelSelector="R" yChannelSelector="B" x="0%" y="0%" width="100%" height="100%" result="displacementMap"/>
              </filter>
            </defs>
          </svg>
          <div
            className="group relative inline-flex rounded-lg overflow-hidden"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
              filter: hovered ? 'url(#noise) brightness(1.08) contrast(1.12)' : 'none',
            }}
          >
            <a
              href={profile?.phone ? `tel:${profile.phone}` : '#contact'}
              className="relative z-10 inline-flex items-center justify-center bg-[#FD6F00] text-white px-10 py-4 rounded-lg transition-all duration-200 ease-out font-semibold text-lg shadow-md hover:shadow-lg cursor-pointer"
              aria-label={profile?.phone ? `Call ${profile.phone}` : 'Contact me'}
            >
              Hire Me
            </a>
          </div>
        </div>
      </div>
      <div className="flex-1 flex flex-col items-center lg:items-end justify-center relative w-full">
        <div className="relative w-[320px] h-[320px] sm:w-[400px] sm:h-[400px] lg:w-[480px] lg:h-[480px]">
          <div className="absolute inset-0 bg-[#FD6F00] rounded-full translate-x-4 -translate-y-4 lg:translate-x-8 lg:-translate-y-8 opacity-95"></div>
          <div className="absolute inset-0 rounded-full overflow-hidden border-8 border-white z-10 shadow-sm bg-gray-100">
            <img
              src={`${process.env.NEXT_PUBLIC_IMAGES_URL}/assets/avatar.png`}
              alt="Sean Hao"
              className="w-full h-full object-cover scale-110 translate-y-4"
            />
          </div>
        </div>
        <div className="flex gap-6 mt-12 lg:mr-16 z-10 relative">
          <a href="https://github.com/hswyxj" className="text-[#333333] hover:text-[#FD6F00] transition-colors" aria-label="GitHub">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77 5.44 5.44 0 0 0 3.5 8.09c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 19.13V23" />
            </svg>
          </a>
          <a href="https://gitee.com/hswyxj" className="text-[#333333] hover:text-[#FD6F00] transition-colors" aria-label="Gitee">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 7l8-5 8 5v10l-8 5-8-5V7z" />
              <path d="M9.5 10.5h4a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-3" />
              <path d="M9.5 12.5v-2" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
