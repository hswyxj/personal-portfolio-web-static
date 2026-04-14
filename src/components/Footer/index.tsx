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
          <a href="https://github.com/hswyxj" className="text-[#333333] hover:text-[#FD6F00] transition-colors" aria-label="GitHub">
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77 5.44 5.44 0 0 0 3.5 8.09c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 19.13V23" />
            </svg>
          </a>
          <a href="https://gitee.com/hswyxj" className="text-[#333333] hover:text-[#FD6F00] transition-colors" aria-label="Gitee">
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 7l8-5 8 5v10l-8 5-8-5V7z" />
              <path d="M9.5 10.5h4a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-3" />
              <path d="M9.5 12.5v-2" />
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
