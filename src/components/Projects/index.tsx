"use client";

import { useMemo, useState } from 'react';
import type { Project } from '@/types/database.types';

interface ProjectsProps {
  projects: Project[];
  errorMessage?: string;
}

export default function Projects({ projects, errorMessage }: ProjectsProps) {
  const [activeCategory, setActiveCategory] = useState('全部');

  const categories = useMemo(() => {
    const unique = Array.from(new Set(projects.map((project) => project.category)));
    return ['全部', ...unique];
  }, [projects]);

  const filteredProjects = useMemo(
    () => (activeCategory === '全部' ? projects : projects.filter((project) => project.category === activeCategory)),
    [activeCategory, projects]
  );

  return (
    <section id="projects" className="container mx-auto px-6 py-20 lg:py-32 text-center">
      <h2 className="text-5xl lg:text-[4rem] font-bold text-[#1A1A1A] tracking-tight mb-6">My Projects</h2>
      <p className="text-gray-600 text-lg leading-relaxed max-w-3xl mx-auto mb-16">
        从需求分析到上线部署，我负责全流程交付；以下是部分可公开的项目案例。
      </p>

      {errorMessage ? (
        <p className="text-red-600">{errorMessage}</p>
      ) : projects.length === 0 ? (
        <p className="text-gray-500">暂无项目展示</p>
      ) : (
        <>
          <div className="flex flex-wrap justify-center gap-4 mb-20">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`px-8 py-3 rounded-lg border text-[#1A1A1A] font-medium transition-colors text-lg cursor-pointer ${
                  category === activeCategory ? 'bg-[#FD6F00] text-white border-[#FD6F00]' : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 text-left">
            {filteredProjects.map((project) => (
              <div key={project.id} className="group cursor-pointer">
                <div className="bg-[#FFEBDB] rounded-[24px] mb-8 px-8 overflow-hidden relative transition-transform duration-500 group-hover:-translate-y-2">
                  <div className="relative w-full h-[429px]">
                    <img
                      src={project.image_url}
                      alt={project.title}
                      className="pl-[30%] w-full h-auto object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    />
                    {project.project_url && (
                      <img
                        src={project.project_url}
                        alt={project.title}
                        className="absolute top-[16%] left-[5%] w-[74%] h-auto object-cover object-top transition-transform duration-700 group-hover:scale-105 z-10"
                      />
                    )}
                  </div>
                </div>
                <p className="text-[#FD6F00] text-base mb-3 font-semibold tracking-wide">{project.category}</p>
                <h3 className="text-2xl font-bold text-[#1A1A1A] group-hover:text-[#FD6F00] transition-colors">{project.title}</h3>
              </div>
            ))}
          </div>
        </>
      )}
    </section>
  );
}
