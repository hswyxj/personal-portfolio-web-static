import { useEffect, useRef, useState } from 'react';

interface TabItem {
  id: string;
  label: string;
}

interface NavbarProps {
  tabList: TabItem[];
}

export default function Navbar({ tabList }: NavbarProps) {
  const [isSticky, setIsSticky] = useState(false);
  const lastScrollYRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsSticky(currentScrollY > 24);
      lastScrollYRef.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      id="navbar"
      className={`sticky top-0 z-50 w-full relative transition-all duration-300 ${
        isSticky
          ? 'bg-white/95 backdrop-blur-xl shadow-xl py-4'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between transition-all duration-300">
        <div className="flex items-center gap-1 cursor-pointer">
          <div className="font-bold text-3xl tracking-tighter flex items-center">
            <span className="text-[#333333]">SEAN</span>
            <span className="text-[#888888] text-2xl font-semibold">FULLSTACK</span>
          </div>
        </div>
        <div className="hidden lg:flex items-center gap-10 text-base font-medium">
        {tabList?.map((tab) => (
          <a
            key={tab.id}
            href={`#${tab.id}`}
            className="text-black hover:text-[#FD6F00] transition-colors"
          >
            {tab.label}
          </a>
        ))}
        <a
          href={`${process.env.NEXT_PUBLIC_IMAGES_URL}/CV/SeanHao-远程前端开发.pdf`}
          download
          className="bg-[#FD6F00] text-white px-8 py-3 rounded-lg hover:bg-[#e06200] transition-colors shadow-sm ml-2 cursor-pointer inline-flex items-center justify-center"
        >
          Download CV
        </a>
      </div>
      </div>

      <div
        className={`absolute inset-x-0 bottom-0 h-4 origin-top transition-all duration-300 ${
          isSticky ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0'
        }`}
        style={{ transformOrigin: 'top' }}
      >
      </div>
    </nav>
  );
}
