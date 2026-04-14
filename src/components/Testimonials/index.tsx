"use client";

import { useState } from 'react';
import type { Testimonial } from '@/types/database.types';

interface TestimonialsProps {
  testimonials: Testimonial[];
  errorMessage?: string;
}

export default function Testimonials({ testimonials, errorMessage }: TestimonialsProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeTestimonial = testimonials[activeIndex] || testimonials[0];
  const sideTestimonials = testimonials.filter((_, index) => index !== activeIndex).slice(0, 2);

  return (
    <section id="testimonials" className="container mx-auto px-6 py-20 lg:py-32 text-center overflow-hidden">
      <h2 className="text-5xl lg:text-[4rem] font-bold text-[#1A1A1A] tracking-tight mb-6">Testimonials</h2>
      <p className="text-gray-600 text-lg leading-relaxed max-w-3xl mx-auto mb-24">
        以可落地的产品为目标：这里汇总了部分客户对交付质量与业务结果的反馈。
      </p>

      {errorMessage ? (
        <p className="text-red-600">{errorMessage}</p>
      ) : testimonials.length === 0 ? (
        <p className="text-gray-500">暂无客户评价</p>
      ) : (
        <div className="relative max-w-6xl mx-auto flex items-center justify-center">
          {sideTestimonials.map((item, index) => (
            <div
              key={item.id}
              className={`hidden lg:flex w-1/4 opacity-30 pointer-events-none scale-75 blur-[2px] transition-all absolute z-0 ${
                index === 0 ? 'left-0 -translate-x-1/2' : 'right-0 translate-x-1/2'
              }`}
            >
              <div className="bg-[#F8F8F8] rounded-[32px] p-12 w-full flex flex-col items-center">
                <img src={item.avatar_url} alt={item.name} className="w-32 h-32 rounded-full object-cover mb-6 shadow-md" />
              </div>
            </div>
          ))}

          <div className="w-full lg:w-3/5 bg-[#F8F8F8] rounded-[32px] p-12 md:p-16 flex flex-col md:flex-row items-center gap-12 shadow-sm z-10 relative">
            <div className="shrink-0 relative">
              <div className="w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden border-[6px] border-white shadow-lg relative z-10">
                <img src={activeTestimonial.avatar_url} alt={activeTestimonial.name} className="w-full h-full object-cover" />
              </div>
            </div>
            <div className="text-left relative flex-1">
              <span className="text-[#FD6F00] text-7xl absolute -top-8 -left-6 font-serif leading-none opacity-80">"</span>
              <span className="text-[#FD6F00] text-7xl absolute bottom-0 right-0 font-serif leading-none translate-y-8 opacity-80">"</span>
              <p className="text-gray-600 text-lg md:text-xl mb-8 relative z-10 leading-relaxed font-medium">
                {activeTestimonial.quote}
              </p>
              <div>
                <h4 className="font-bold text-2xl text-[#1A1A1A]">{activeTestimonial.name}</h4>
                <p className="text-gray-500 text-base mt-1">{activeTestimonial.role}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {!errorMessage && testimonials.length > 0 && (
        <div className="flex justify-center gap-4 mt-16">
          {testimonials.map((item, index) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={`rounded-full transition-all focus:outline-none cursor-pointer ${
                index === activeIndex
                  ? 'w-16 h-3 bg-[#FD6F00] shadow-sm'
                  : 'w-12 h-3 bg-[#E2E2E2] hover:bg-gray-300'
              }`}
              aria-label={`Show testimonial from ${item.name}`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
