"use client";

import { FormEvent, useState } from "react";
import type { Profile } from '@/types/database.types';

interface ContactProps {
  profile: Profile;
  buttonLabel?: string;
}

export default function Contact({
  profile,
  buttonLabel = "Contact Me",
}: ContactProps) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const validateEmail = (value: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage("");
    setError("");

    if (!email) {
      setError("请输入邮箱地址。");
      return;
    }

    if (!validateEmail(email)) {
      setError("请输入有效的邮箱地址。");
      return;
    }

    const subject = encodeURIComponent("Portfolio Contact Request");
    const body = encodeURIComponent(
      `您好，我希望联系您，邮箱：${email}\n\n请尽快回复，谢谢。`
    );
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
    setMessage("邮箱格式验证通过，已打开默认邮箱客户端以发送邮件。");
  };

  return (
    <section id="contact" className="container mx-auto px-6 py-20 lg:py-32 text-center">
      <h2 className="text-5xl lg:text-[4rem] font-bold text-[#1A1A1A] tracking-tight mb-6">Lets Developer Together</h2>
      <p className="text-gray-600 text-lg leading-relaxed max-w-3xl mx-auto mb-16">
        有项目想法或开发需求？我提供从前端到后端、部署上线的一站式全栈交付，欢迎联系。
      </p>
      <form onSubmit={handleSubmit} className="max-w-3xl mx-auto flex flex-col sm:flex-row gap-4 px-4">
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Enter Your Email"
          className="flex-1 bg-[#F8F8F8] border border-gray-200 rounded-[14px] px-8 py-5 focus:outline-none focus:border-[#FD6F00] focus:ring-2 focus:ring-[#FD6F00]/20 text-lg transition-all"
        />
        <button
          type="submit"
          className="bg-[#FD6F00] text-white px-12 py-5 rounded-[14px] hover:bg-[#e06200] transition-colors font-bold whitespace-nowrap text-lg shadow-md hover:shadow-lg cursor-pointer"
        >
          {buttonLabel}
        </button>
      </form>
      {error ? <p className="max-w-3xl mx-auto flex flex-col sm:flex-row gap-4 px-4 mt-4 text-sm text-red-600">{error}</p> : null}
      {message ? <p className="max-w-3xl mx-auto flex flex-col sm:flex-row gap-4 px-4 mt-4 text-sm text-green-600">{message}</p> : null}
      {profile.phone ? (
        <p className="max-w-3xl mx-auto px-4 mt-4 text-sm text-gray-600">
          直接电话联系：
          <a href={`tel:${profile.phone}`} className="ml-2 text-[#FD6F00] hover:underline">
            {profile.phone}
          </a>
        </p>
      ) : null}
    </section>
  );
}
