import HeroProfile from '@/components/HeroProfile';

const mockProfile = {
  id: '1',
  name: 'Creative Studio',
  wechat: 'studio_wechat',
  email: 'hello@studio.com',
  bio: 'We build digital experiences that matter.',
  skills: ['Next.js', 'React', 'Framer Motion', 'UI/UX']
};

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white selection:bg-white/30">
      <HeroProfile profile={mockProfile} />
    </main>
  );
}
