import './globals.css';
import Live2DWidget from '@/components/Live2DWidget';

export const metadata = {
  title: 'Sean - Fullstack Developer',
  description: 'Sean 的个人作品集，展示了在前端、后端和全栈开发方面的专业技能和项目经验。通过这个网站，您可以了解 Sean 的技术能力、服务内容以及成功案例，并与他联系以实现您的项目需求。',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {children}
        <Live2DWidget />
      </body>
    </html>
  )
}
