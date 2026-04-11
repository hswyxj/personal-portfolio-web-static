'use client';
import { motion } from 'framer-motion';
import { Mail, MessageCircle } from 'lucide-react';
import { Profile } from '@/types/database.types';

export default function HeroProfile({ profile }: { profile: Profile }) {
  if (!profile) return null;

  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="py-20 px-6 max-w-5xl mx-auto text-center"
    >
      <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6">
        {profile.name}
      </h1>
      <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto leading-relaxed">
        {profile.bio}
      </p>
      <div className="flex flex-wrap justify-center gap-3 mb-10">
        {profile.skills.map((skill, index) => (
          <span key={index} className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm font-medium text-gray-300">
            {skill}
          </span>
        ))}
      </div>
      <div className="flex justify-center gap-6">
        <a href={`mailto:${profile.email}`} className="flex items-center gap-2 hover:text-white text-gray-400 transition-colors">
          <Mail size={20} />
          <span>Email Me</span>
        </a>
        <div className="group relative flex items-center gap-2 cursor-pointer text-gray-400 hover:text-white transition-colors">
          <MessageCircle size={20} />
          <span>WeChat</span>
          <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-zinc-800 text-white text-xs py-1 px-2 rounded pointer-events-none whitespace-nowrap">
            {profile.wechat}
          </div>
        </div>
      </div>
    </motion.section>
  );
}
