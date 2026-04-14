'use client'

import { useEffect, useState } from 'react';
import { fetchApi } from '@/lib/api-client';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Services from '@/components/Services';
import Projects from '@/components/Projects';
import Testimonials from '@/components/Testimonials';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import type { Project, Profile, Service, Testimonial } from '@/types/database.types';

const emptyProfile = {
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

export default function Home() {
  const tabList = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Me' },
    { id: 'services', label: 'Services' },
    { id: 'projects', label: 'Projects' },
    { id: 'testimonials', label: 'Testimonials' },
    { id: 'contact', label: 'Contact' },
  ];

  const [profile, setProfile] = useState<Profile>(emptyProfile);
  const [services, setServices] = useState<Service[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const loadData = async () => {
      setErrorMessage('');

      const profileResult = await fetchApi<Profile>('/api/profile');
      const loadedProfile = profileResult.data ?? emptyProfile;
      setProfile(loadedProfile);

      const profileIdQuery = profileResult.data?.id ? `?profileId=${encodeURIComponent(profileResult.data.id)}` : '';

      const [servicesResult, projectsResult, testimonialsResult] = await Promise.all([
        fetchApi<{ services: Service[] }>(`/api/services${profileIdQuery}`),
        fetchApi<{ projects: Project[] }>(`/api/projects${profileIdQuery}`),
        fetchApi<{ testimonials: Testimonial[] }>(`/api/testimonials${profileIdQuery}`),
      ]);

      setServices(servicesResult.data?.services ?? []);
      setProjects(projectsResult.data?.projects ?? []);
      setTestimonials(testimonialsResult.data?.testimonials ?? []);

      const firstError = profileResult.error || servicesResult.error || projectsResult.error || testimonialsResult.error;
      setErrorMessage(firstError);
    };

    loadData();
  }, []);

  return (
    <main className="min-h-screen bg-white text-black font-sans selection:bg-[#FD6F00] selection:text-white">
      <Navbar tabList={tabList} />
      <Hero profile={profile} />
      <About profile={profile} />
      <Services services={services} errorMessage={errorMessage} />
      <Projects projects={projects} errorMessage={errorMessage} />
      <Testimonials testimonials={testimonials} errorMessage={errorMessage} />
      <Contact profile={profile} buttonLabel="Contact Me" />
      <Footer tabList={tabList} />
    </main>
  );
}