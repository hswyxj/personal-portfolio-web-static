'use client'

import { useEffect, useState } from 'react'
import LoadingIndicator from '@/components/LoadingIndicator'
import { Profile } from '@/types/database.types'

const emptyProfile = {
  id: '',
  name: '',
  profession: '',
  wechat: '',
  email: '',
  bio: '',
  skills: [],
  hero_intro: '',
} as Profile

export default function AdminProfile() {
  const [profile, setProfile] = useState<Profile>(emptyProfile)
  const [skillsText, setSkillsText] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const res = await fetch('/api/profile', { cache: 'no-store' })
        const json = await res.json()

        if (json.success) {
          const data = json.data as Profile
          setProfile(data)
          setSkillsText(data.skills?.join(', ') ?? '')
        } else {
          setMessage(json.error?.message || 'Unable to load profile')
        }
      } catch (error) {
        setMessage('Unable to load profile')
      } finally {
        setLoading(false)
      }
    }

    loadProfile()
  }, [])

  const handleSave = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSaving(true)
    setMessage('')

    try {
      const res = await fetch('/api/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: profile.name,
          profession: profile.profession,
          wechat: profile.wechat,
          email: profile.email,
          bio: profile.bio,
          hero_intro: profile.hero_intro ?? '',
          skills: skillsText
            .split(',')
            .map((item) => item.trim())
            .filter(Boolean),
        }),
      })
      const json = await res.json()
      if (!json.success) {
        setMessage(json.error?.message || 'Save failed')
      } else {
        setProfile(json.data as Profile)
        setSkillsText((json.data as Profile).skills.join(', '))
        setMessage('Profile updated successfully')
      }
    } catch (error) {
      setMessage('Save failed')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="max-w-3xl">
      <h1 className="text-3xl font-bold mb-8">Edit Profile</h1>

      <div className="bg-zinc-900 border border-white/10 rounded-xl p-6">
        {loading ? (
          <LoadingIndicator label="Loading profile…" />
        ) : (
          <form className="space-y-6" onSubmit={handleSave}>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block text-sm text-gray-300">
                <span className="mb-2 block">Name</span>
                <input
                  type="text"
                  value={profile.name}
                  onChange={(event) => setProfile((current) => ({ ...current, name: event.target.value }))}
                  className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-white/20"
                  required
                />
              </label>
              <label className="block text-sm text-gray-300">
                <span className="mb-2 block">Profession</span>
                <input
                  type="text"
                  value={profile.profession}
                  onChange={(event) => setProfile((current) => ({ ...current, profession: event.target.value }))}
                  className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-white/20"
                />
              </label>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block text-sm text-gray-300">
                <span className="mb-2 block">Wechat</span>
                <input
                  type="text"
                  value={profile.wechat}
                  onChange={(event) => setProfile((current) => ({ ...current, wechat: event.target.value }))}
                  className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-white/20"
                />
              </label>
            </div>

            <label className="block text-sm text-gray-300">
              <span className="mb-2 block">Email</span>
              <input
                type="email"
                value={profile.email}
                onChange={(event) => setProfile((current) => ({ ...current, email: event.target.value }))}
                className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-white/20"
                required
              />
            </label>

            <label className="block text-sm text-gray-300">
              <span className="mb-2 block">Bio</span>
              <textarea
                value={profile.bio}
                onChange={(event) => setProfile((current) => ({ ...current, bio: event.target.value }))}
                className="w-full min-h-[120px] rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-white/20"
              />
            </label>

            <label className="block text-sm text-gray-300">
              <span className="mb-2 block">Hero Intro</span>
              <textarea
                value={profile.hero_intro ?? ''}
                onChange={(event) => setProfile((current) => ({ ...current, hero_intro: event.target.value }))}
                placeholder="Enter the hero introduction text shown on the homepage"
                className="w-full min-h-[120px] rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-white/20"
              />
            </label>

            <label className="block text-sm text-gray-300">
              <span className="mb-2 block">Skills</span>
              <input
                type="text"
                value={skillsText}
                onChange={(event) => setSkillsText(event.target.value)}
                placeholder="Next.js, React, Framer Motion"
                className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-white/20"
              />
              <p className="mt-2 text-xs text-gray-500">Separate skills with commas.</p>
            </label>

            {message && <p className="text-sm text-emerald-400">{message}</p>}

            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-xl bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
              disabled={saving}
            >
              {saving ? 'Saving…' : 'Save Changes'}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
