import type { Service } from '@/types/database.types';

interface ServicesProps {
  services: Service[];
  errorMessage?: string;
}

export default function Services({ services, errorMessage }: ServicesProps) {
  return (
    <section id="services" className="container mx-auto px-6 py-20 lg:py-32 text-center">
      <h2 className="text-5xl lg:text-[4rem] font-bold text-[#1A1A1A] tracking-tight mb-6">Services</h2>
      <p className="text-gray-600 text-lg leading-relaxed max-w-3xl mx-auto mb-20">
        从 0 到 1 完整交付：企业官网、管理后台、小程序/H5 等产品的设计开发、部署上线与后期维护。
      </p>
      {errorMessage ? (
        <p className="text-red-600">{errorMessage}</p>
      ) : services.length === 0 ? (
        <p className="text-gray-500">暂无服务内容</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 text-left">
          {services.map((service) => (
            <div key={service.id} className="flex flex-col justify-center items-center bg-[#F8F8F8] p-10 rounded-[20px] hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-transparent hover:border-gray-100 cursor-pointer">
              <div className="text-[#FD6F00] mb-8 bg-white w-16 h-16 rounded-xl flex items-center justify-center shadow-sm">
                {service.icon_url ? (
                  <img src={service.icon_url} alt={service.title} className="w-8 h-8 object-contain" />
                ) : (
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                    <line x1="8" y1="21" x2="16" y2="21" />
                    <line x1="12" y1="17" x2="12" y2="21" />
                  </svg>
                )}
              </div>
              <h3 className="text-[26px] font-bold mb-4 text-[#1A1A1A]">{service.title}</h3>
              <p className="text-gray-600 text-base leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
