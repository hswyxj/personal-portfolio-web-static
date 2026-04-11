'use client';
import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Masonry from 'react-masonry-css';
import { Project } from '@/types/database.types';
import ProjectCard from './ProjectCard';

const categories = ['全部', '网站', '大屏可视化', '管理后台', '小程序', 'APP', 'H5'];

export default function ProjectGallery({ projects }: { projects: Project[] }) {
  const [activeCategory, setActiveCategory] = useState('全部');

  const filteredProjects = activeCategory === '全部' 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

  const breakpointColumnsObj = {
    default: 3,
    1100: 2,
    700: 1
  };

  return (
    <div className="max-w-7xl mx-auto px-6 pb-24">
      <div className="flex flex-wrap justify-center gap-2 mb-12">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              activeCategory === cat 
                ? 'bg-white text-black' 
                : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="flex -ml-6 w-auto"
        columnClassName="pl-6 bg-clip-padding"
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </AnimatePresence>
      </Masonry>
    </div>
  );
}