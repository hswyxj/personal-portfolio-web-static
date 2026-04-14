interface TabItem {
  id: string;
  label: string;
}

interface NavbarProps {
  tabList: TabItem[];
}

export default function Footer({ tabList }: NavbarProps) {
  return (
    <footer id="footer" className="bg-[#F8F8F8] pt-24 mt-12">
      <div className="container mx-auto px-6 flex flex-col items-center">
        <div className="font-bold text-4xl tracking-tighter flex items-center mb-16 cursor-pointer">
          <span className="text-[#333333]">SEAN</span>
          <span className="text-[#888888] text-3xl font-semibold">FULLSTACK</span>
        </div>
        <div className="flex flex-wrap justify-center gap-10 text-lg font-medium mb-16">
          {tabList?.map((tab) => (
            <a
              key={tab.id}
              href={`#${tab.id}`}
              className="text-black hover:text-[#FD6F00] transition-colors"
            >
              {tab.label}
            </a>
          ))}
        </div>
        <div className="flex gap-8 mb-20">
          <a href="#" className="text-[#333333] hover:text-[#FD6F00] transition-colors" aria-label="Facebook">
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
            </svg>
          </a>
          <a href="#" className="text-[#333333] hover:text-[#FD6F00] transition-colors" aria-label="Twitter">
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53A4.48 4.48 0 0 0 22.43 1a9.09 9.09 0 0 1-2.88 1.1A4.52 4.52 0 0 0 16.11 0c-2.5 0-4.5 2.24-4.5 5a5.09 5.09 0 0 0 .12 1.14A12.94 12.94 0 0 1 1.64 1.15 4.75 4.75 0 0 0 1 3.91a4.48 4.48 0 0 0 2 3.74A4.48 4.48 0 0 1 .88 7v.06A4.5 4.5 0 0 0 4.5 11.5a4.49 4.49 0 0 1-2 .08 4.51 4.51 0 0 0 4.2 3.12A9.05 9.05 0 0 1 1 19.54a12.87 12.87 0 0 0 6.95 2.04c8.35 0 12.91-6.9 12.91-12.89 0-.2 0-.4-.01-.6A9.18 9.18 0 0 0 23 3z" />
            </svg>
          </a>
          <a href="#" className="text-[#333333] hover:text-[#FD6F00] transition-colors" aria-label="Instagram">
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <path d="M17.5 6.5h.01" />
            </svg>
          </a>
          <a href="#" className="text-[#333333] hover:text-[#FD6F00] transition-colors" aria-label="LinkedIn">
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
              <rect x="2" y="9" width="4" height="12" />
              <circle cx="4" cy="4" r="2" />
            </svg>
          </a>
        </div>
      </div>
      <div className="bg-[#545454] py-8 text-center text-white text-base font-medium">
        <p>
          © 2023 <span className="text-[#FD6F00] font-bold tracking-wide">SeanFullStack</span> All Rights Reserved , Inc.
        </p>
      </div>
    </footer>
  );
}
