import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Services from '@/components/Services';
import Projects from '@/components/Projects';
import Testimonials from '@/components/Testimonials';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import type { Project, Profile, Service, Testimonial } from '@/types/database.types';

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL ?? '';

async function fetchApi<T>(endpoint: string) {
  try {
    const res = await fetch(`${BASE_URL}${endpoint}`, { cache: 'no-store' });
    const json = await res.json();
    if (!res.ok || !json.success) {
      return { data: null as T | null, error: json.error?.message || 'Failed to fetch data' };
    }
    return { data: json.data as T, error: '' };
  } catch (error) {
    return { data: null as T | null, error: 'Network error' };
  }
}

export default async function Home() {
  const tabList = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Me' },
    { id: 'services', label: 'Services' },
    { id: 'projects', label: 'Projects' },
    { id: 'testimonials', label: 'Testimonials' },
    { id: 'contact', label: 'Contact' },
  ];

  const profileResult = await fetchApi<Profile>('/api/profile');
  const profile = profileResult.data ?? {
    id: '',
    user_id: null,
    name: '',
    profession: null,
    wechat: null,
    email: null,
    bio: null,
    skills: null,
    hero_intro: null,
  } as Profile;

  const profileIdQuery = profileResult.data?.id ? `?profileId=${encodeURIComponent(profileResult.data.id)}` : '';

  const [servicesResult, projectsResult, testimonialsResult] = await Promise.all([
    fetchApi<{ services: Service[] }>(`/api/services${profileIdQuery}`),
    fetchApi<{ projects: Project[] }>(`/api/projects${profileIdQuery}`),
    fetchApi<{ testimonials: Testimonial[] }>(`/api/testimonials${profileIdQuery}`),
  ]);

  const services = servicesResult.data?.services ?? [];
  const projects = projectsResult.data?.projects ?? [];
  const testimonials = testimonialsResult.data?.testimonials ?? [];
  console.log(profile, services, projects, testimonials);
  return (
    <main className="min-h-screen bg-white text-black font-sans selection:bg-[#FD6F00] selection:text-white">
      <Navbar tabList={tabList} />
      <Hero profile={profile}  />
      <About profile={profile} />
      <Services services={services} errorMessage={servicesResult.error} />
      <Projects projects={projects} errorMessage={projectsResult.error} />
      <Testimonials testimonials={testimonials} errorMessage={testimonialsResult.error} />
      <Contact profile={profile} buttonLabel="Contact Me" />
      <Footer tabList={tabList} />
    </main>
  );
}