import HeroProfile from '@/components/HeroProfile';
import ProjectGallery from '@/components/ProjectGallery';
import { createClient } from '@/lib/supabase/server';

const mockProfile = {
  id: '1',
  name: 'Creative Studio',
  wechat: 'studio_wechat',
  email: 'hello@studio.com',
  bio: 'We build digital experiences that matter.',
  skills: ['Next.js', 'React', 'Framer Motion', 'UI/UX']
};

const mockProjects = [
  { id: '1', title: 'Corporate Site', description: 'Modern corporate website with elegant design and smooth animations.', category: '网站', image_url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80', featured: false, created_at: '', project_url: null },
  { id: '2', title: 'Data Dash', description: 'Comprehensive data analytics dashboard for enterprise users.', category: '大屏可视化', image_url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80', featured: true, created_at: '', project_url: null },
  { id: '3', title: 'E-commerce App', description: 'Mobile shopping experience with AR features.', category: 'APP', image_url: 'https://images.unsplash.com/photo-1512428559087-560fa5ceab42?w=800&q=80', featured: false, created_at: '', project_url: null },
  { id: '4', title: 'Admin Pro', description: 'Backend management system with complex permissions.', category: '管理后台', image_url: 'https://images.unsplash.com/photo-1555421689-d68471e189f2?w=800&q=80', featured: false, created_at: '', project_url: null },
  { id: '5', title: 'Coffee Shop Mini Program', description: 'Order and pickup coffee easily.', category: '小程序', image_url: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=800&q=80', featured: false, created_at: '', project_url: null },
];

export default async function Home() {
  const supabase = await createClient();

  const { data: profileData, error: profileError } = await supabase
    .from('profiles')
    .select('*')
    .limit(1)
    .single();

  const { data: projectsData, error: projectsError } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false });

  const profile = profileData || mockProfile;
  const projects = projectsData || mockProjects;

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white selection:bg-white/30 pt-10">
      <HeroProfile profile={profile} />
      <ProjectGallery projects={projects} />
    </main>
  );
}
