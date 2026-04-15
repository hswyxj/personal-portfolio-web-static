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
  const [menuOpen, setMenuOpen] = useState(false);
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

  const handleLinkClick = () => {
    setMenuOpen(false);
  };

  return (
    <nav
      id="navbar"
      className={`navbar sticky top-0 z-50 w-full relative transition-all duration-300 ${
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

        <button
          type="button"
          onClick={() => setMenuOpen((prev) => !prev)}
          className="lg:hidden inline-flex items-center justify-center rounded-md border border-gray-300 bg-white p-2 text-gray-700 shadow-sm transition hover:bg-gray-100"
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
        >
          <span className="sr-only">Toggle menu</span>
          <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            {menuOpen ? (
              <path d="M6 18L18 6M6 6l12 12" />
            ) : (
              <>
                <path d="M4 6h16" />
                <path d="M4 12h16" />
                <path d="M4 18h16" />
              </>
            )}
          </svg>
        </button>
      </div>

      {menuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200 shadow-lg">
          <div className="container mx-auto px-6 py-6 space-y-4">
            {tabList?.map((tab) => (
              <a
                key={tab.id}
                href={`#${tab.id}`}
                onClick={handleLinkClick}
                className="block text-left text-base font-medium text-black hover:text-[#FD6F00]"
              >
                {tab.label}
              </a>
            ))}
            <a
              href={`${process.env.NEXT_PUBLIC_IMAGES_URL}/CV/SeanHao-远程前端开发.pdf`}
              download
              onClick={handleLinkClick}
              className="inline-flex w-full items-center justify-center rounded-lg bg-[#FD6F00] px-6 py-3 text-white transition hover:bg-[#e06200]"
            >
              Download CV
            </a>
          </div>
        </div>
      )}

      <div
        className={`absolute inset-x-0 bottom-0 h-4 origin-top transition-all duration-300 ${
          isSticky ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0'
        }`}
        style={{ transformOrigin: 'top' }}
      />
    </nav>
  );
}
