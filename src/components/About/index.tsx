import type { Profile } from '@/types/database.types';

const skills = [
  { label: "Vue2/3", progress: "96%" },
  { label: "React", progress: "88%" },
  { label: "uniapp", progress: "95%" },
  { label: "Next.js", progress: "90%" },
  { label: "Node.js", progress: "85%" },
];

interface AboutProps {
  profile: Profile;
}

export default function About({ profile }: AboutProps) {
  const defBio = "我长期深耕“可交付”的工程实践：既能把产品需求快速落地为体验稳定的业务系统，也能从架构与工程化角度提升团队效率与系统质量。职业经历覆盖测试/测开、前端与后端链路（ 3年测试/测开 + 7年前端 + 1年前后端），让我在设计方案时天然兼顾可测性、可维护性与线上稳定性；同时具备2年以上管理经验，能够推进跨角色协作与项目按期上线。技术栈覆盖 Vue2/3、React、Next.js、Python、uniapp、小程序、Qiankun 微前端、GIS与可视化等；熟悉 Git、MySQL、Supabase 等工具与服务，并有架构治理、性能优化、部署与运维优化的实战经验。我希望加入重视工程质量与业务价值的团队，持续用技术把复杂问题做简单、把交付做可靠。"
  return (
    <section id="about" className="container mx-auto px-6 py-20 lg:py-32 flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
      <div className="flex-1 flex justify-center lg:justify-start w-full relative">
        <div className="relative w-[320px] h-[320px] sm:w-[400px] sm:h-[400px] lg:w-[480px] lg:h-[480px]">
          <div className="absolute inset-0 bg-[#FD6F00] rounded-full -translate-x-4 -translate-y-4 lg:-translate-x-8 lg:-translate-y-8 opacity-95"></div>
          <div className="absolute inset-0 rounded-full overflow-hidden border-8 border-white z-10 shadow-sm bg-gray-100">
            <img
              src={`${process.env.NEXT_PUBLIC_IMAGES_URL}/assets/avatar (2).png`}
              alt="Sean Hao Surprised"
              className="w-full h-full object-cover scale-110 translate-y-4"
            />
          </div>
        </div>
      </div>
      <div className="flex-1 space-y-8 w-full">
        <h2 className="text-5xl lg:text-[4rem] font-bold text-[#1A1A1A] tracking-tight">About Me</h2>
        <p className="text-gray-600 text-lg leading-relaxed">
          {profile.bio || defBio}
        </p>
        <div className="space-y-8 pt-4">
          {skills?.map((item) => (
            <div key={item.label} className="space-y-3">
              <span className="font-bold text-xl block text-[#1A1A1A]">{item.label}</span>
              <div className="w-full bg-[#EDECEC] rounded-full h-3 relative">
                <div className="bg-[#FD6F00] h-3 rounded-full relative" style={{ width: item.progress }}>
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-6 h-6 bg-[#FD6F00] rounded-full border-4 border-white shadow-sm translate-x-1/2 z-10" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
