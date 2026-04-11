'use client';
import { motion } from 'framer-motion';
import { Project } from '@/types/database.types';
import Image from 'next/image';

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4 }}
      className="relative group rounded-2xl overflow-hidden bg-zinc-900 mb-6 cursor-pointer"
    >
      <div className="relative w-full pb-[120%]">
        <Image
          src={project.image_url}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileHover={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <span className="text-xs font-medium text-white/70 mb-2 block tracking-wider uppercase">
            {project.category}
          </span>
          <h3 className="text-2xl font-semibold text-white mb-2">{project.title}</h3>
          <p className="text-sm text-white/80 line-clamp-2">{project.description}</p>
        </motion.div>
      </div>
    </motion.div>
  );
}