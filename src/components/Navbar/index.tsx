interface TabItem {
  id: string;
  label: string;
}

interface NavbarProps {
  tabList: TabItem[];
}

export default function Navbar({ tabList }: NavbarProps) {

  return (
    <nav id="navbar" className="container mx-auto px-6 py-6 flex items-center justify-between">
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
          href="/CV/SeanHao-远程前端开发.docx"
          download
          className="bg-[#FD6F00] text-white px-8 py-3 rounded-lg hover:bg-[#e06200] transition-colors shadow-sm ml-2 cursor-pointer inline-flex items-center justify-center"
        >
          Download CV
        </a>
      </div>
    </nav>
  );
}
