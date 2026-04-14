'use client'

import { Fragment, useEffect, useMemo, useState } from 'react'
import LoadingIndicator from '@/components/LoadingIndicator'
import { Project } from '@/types/database.types'

const PAGE_SIZE = 6

const initialNewProject = {
  title: '',
  description: '',
  category: '',
  image_url: '',
  project_url: '',
  featured: false,
}

export default function AdminProjects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [searchInput, setSearchInput] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [page, setPage] = useState(1)
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [savingId, setSavingId] = useState<string | null>(null)
  const [message, setMessage] = useState('')
  const [newProject, setNewProject] = useState(initialNewProject)

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const res = await fetch('/api/projects', { cache: 'no-store' })
        const json = await res.json()
        if (json.success) {
          setProjects(json.data.projects || [])
        } else {
          setMessage(json.error?.message || 'Failed to load projects')
        }
      } catch {
        setMessage('Failed to load projects')
      } finally {
        setLoading(false)
      }
    }

    loadProjects()
  }, [])

  const filteredProjects = useMemo(() => {
    const term = searchTerm.trim().toLowerCase()
    if (!term) return projects

    return projects.filter((project) => {
      return [project.title, project.category, project.description, project.project_url ?? '']
        .some((field) => field?.toLowerCase().includes(term))
    })
  }, [projects, searchTerm])

  const totalPages = Math.max(1, Math.ceil(filteredProjects.length / PAGE_SIZE))

  useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages)
    }
  }, [page, totalPages])

  const currentPageItems = useMemo(() => {
    const startIndex = (page - 1) * PAGE_SIZE
    return filteredProjects.slice(startIndex, startIndex + PAGE_SIZE)
  }, [filteredProjects, page])

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSearchTerm(searchInput)
    setPage(1)
  }

  const startEditing = (project: Project) => {
    setEditingId(project.id)
    setEditingProject(project)
    setMessage('')
  }

  const cancelEditing = () => {
    setEditingId(null)
    setEditingProject(null)
  }

  const handleEditChange = (field: keyof Project, value: string | boolean) => {
    setEditingProject((current) =>
      current ? { ...current, [field]: value } : current
    )
  }

  const saveProject = async () => {
    if (!editingProject) return

    setSavingId(editingProject.id)
    setMessage('')

    try {
      const res = await fetch(`/api/projects/${editingProject.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: editingProject.title,
          description: editingProject.description,
          category: editingProject.category,
          image_url: editingProject.image_url,
          project_url: editingProject.project_url,
          featured: editingProject.featured,
        }),
      })
      const json = await res.json()
      if (!json.success) {
        setMessage(json.error?.message || 'Update failed')
      } else {
        setProjects((current) =>
          current.map((project) =>
            project.id === editingProject.id ? editingProject : project
          )
        )
        setMessage('Project updated successfully')
        cancelEditing()
      }
    } catch {
      setMessage('Update failed')
    } finally {
      setSavingId(null)
    }
  }

  const deleteProject = async (projectId: string) => {
    if (!confirm('Delete this project?')) return

    setSavingId(projectId)
    setMessage('')

    try {
      const res = await fetch(`/api/projects/${projectId}`, {
        method: 'DELETE',
      })
      const json = await res.json()
      if (!json.success) {
        setMessage(json.error?.message || 'Delete failed')
      } else {
        setProjects((current) => current.filter((project) => project.id !== projectId))
        setMessage('Project deleted')
      }
    } catch {
      setMessage('Delete failed')
    } finally {
      setSavingId(null)
    }
  }

  const createProject = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSavingId('new')
    setMessage('')

    if (!newProject.title || !newProject.category || !newProject.image_url) {
      setMessage('Title, category, and image URL are required')
      setSavingId(null)
      return
    }

    try {
      const res = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: newProject.title,
          description: newProject.description,
          category: newProject.category,
          image_url: newProject.image_url,
          project_url: newProject.project_url || null,
          featured: newProject.featured,
        }),
      })
      const json = await res.json()
      if (!json.success) {
        setMessage(json.error?.message || 'Create failed')
      } else {
        setProjects((current) => [json.data, ...current])
        setNewProject(initialNewProject)
        setMessage('Project created successfully')
        setIsCreateOpen(false)
      }
    } catch {
      setMessage('Create failed')
    } finally {
      setSavingId(null)
    }
  }

  return (
    <div className="max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Projects</h1>
        <p className="text-gray-400">Search, paginate, edit, and delete projects from the admin panel.</p>
      </div>

      <div className="rounded-3xl border border-white/10 bg-zinc-950 p-6 shadow-sm shadow-black/20">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
          <form className="flex flex-1 gap-3" onSubmit={handleSearch}>
            <input
              type="text"
              value={searchInput}
              onChange={(event) => setSearchInput(event.target.value)}
              placeholder="Search by title, category, description, URL"
              className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-white/20"
            />
            <button
              type="submit"
              className="cursor-pointer rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-gray-200"
            >
              Search
            </button>
          </form>

          <button
            type="button"
            className="cursor-pointer rounded-2xl border border-white/10 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            onClick={() => setIsCreateOpen((prev) => !prev)}
          >
            {isCreateOpen ? 'Close Add Form' : '新增项目'}
          </button>
        </div>

        {message && <p className="mb-4 text-sm text-emerald-400">{message}</p>}

        {isCreateOpen && (
          <div className="mb-6 rounded-3xl border border-white/10 bg-zinc-900 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">新增项目</h2>
              <span className="text-sm text-gray-400">必填：标题、分类、封面链接</span>
            </div>
            <form className="space-y-4" onSubmit={createProject}>
              <div className="grid gap-4 lg:grid-cols-2">
                <label className="block text-sm text-gray-300">
                  <span className="mb-2 block">标题</span>
                  <input
                    type="text"
                    value={newProject.title}
                    onChange={(event) => setNewProject((prev) => ({ ...prev, title: event.target.value }))}
                    className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-white/20"
                    required
                  />
                </label>
                <label className="block text-sm text-gray-300">
                  <span className="mb-2 block">分类</span>
                  <input
                    type="text"
                    value={newProject.category}
                    onChange={(event) => setNewProject((prev) => ({ ...prev, category: event.target.value }))}
                    className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-white/20"
                    required
                  />
                </label>
              </div>

              <div className="grid gap-4 lg:grid-cols-2">
                <label className="block text-sm text-gray-300">
                  <span className="mb-2 block">封面图片 URL</span>
                  <input
                    type="url"
                    value={newProject.image_url}
                    onChange={(event) => setNewProject((prev) => ({ ...prev, image_url: event.target.value }))}
                    className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-white/20"
                    required
                  />
                </label>
                <label className="block text-sm text-gray-300">
                  <span className="mb-2 block">项目链接</span>
                  <input
                    type="url"
                    value={newProject.project_url}
                    onChange={(event) => setNewProject((prev) => ({ ...prev, project_url: event.target.value }))}
                    className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-white/20"
                  />
                </label>
              </div>

              <label className="block text-sm text-gray-300">
                <span className="mb-2 block">描述</span>
                <textarea
                  value={newProject.description}
                  onChange={(event) => setNewProject((prev) => ({ ...prev, description: event.target.value }))}
                  className="w-full min-h-[120px] rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-white/20"
                />
              </label>

              <div className="flex flex-wrap items-center gap-3">
                <label className="flex items-center gap-2 text-sm text-gray-300">
                  <input
                    type="checkbox"
                    checked={newProject.featured}
                    onChange={(event) => setNewProject((prev) => ({ ...prev, featured: event.target.checked }))}
                    className="h-4 w-4 rounded border-white/10 bg-black/40 text-white"
                  />
                  设为精选
                </label>
                <button
                  type="submit"
                  className="cursor-pointer rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-60"
                  disabled={savingId === 'new'}
                >
                  {savingId === 'new' ? '保存中…' : '创建项目'}
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="overflow-x-auto rounded-3xl border border-white/10 bg-zinc-950">
          <table className="min-w-full border-collapse text-left text-sm text-white">
            <thead className="bg-zinc-900 text-gray-300">
              <tr>
                <th className="px-4 py-4">标题</th>
                <th className="px-4 py-4">分类</th>
                <th className="px-4 py-4">封面</th>
                <th className="px-4 py-4">状态</th>
                <th className="px-4 py-4">创建时间</th>
                <th className="px-4 py-4">操作</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-4 py-6 text-center">
                    <LoadingIndicator label="Loading projects…" />
                  </td>
                </tr>
              ) : currentPageItems.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-6 text-center text-gray-500">
                    No results found.
                  </td>
                </tr>
              ) : (
                currentPageItems.map((project) => {
                  const isEditing = editingId === project.id
                  return (
                    <Fragment key={project.id}>
                      <tr className="border-t border-white/10">
                        <td className="px-4 py-4">{project.title}</td>
                        <td className="px-4 py-4">{project.category}</td>
                        <td className="px-4 py-4 max-w-[220px] truncate text-ellipsis">{project.image_url}</td>
                        <td className="px-4 py-4">{project.featured ? 'Featured' : 'Normal'}</td>
                        <td className="px-4 py-4">{project.created_at ? new Date(project.created_at).toLocaleDateString() : '-'}</td>
                        <td className="px-4 py-4 space-x-2">
                          <button
                            type="button"
                            className="cursor-pointer rounded-2xl border border-white/10 bg-white/10 px-4 py-2 text-sm text-white transition hover:bg-white/10"
                            onClick={() => (isEditing ? cancelEditing() : startEditing(project))}
                          >
                            {isEditing ? '取消' : '编辑'}
                          </button>
                          <button
                            type="button"
                            className="cursor-pointer rounded-2xl border border-red-500 px-4 py-2 text-sm text-red-300 transition hover:bg-red-500/10"
                            onClick={() => deleteProject(project.id)}
                            disabled={savingId === project.id}
                          >
                            删除
                          </button>
                        </td>
                      </tr>
                      {isEditing && editingProject && (
                        <tr className="bg-zinc-900">
                          <td colSpan={6} className="p-4">
                            <div className="grid gap-4 lg:grid-cols-3">
                              <label className="block text-sm text-gray-300">
                                <span className="mb-2 block">标题</span>
                                <input
                                  type="text"
                                  value={editingProject.title}
                                  onChange={(event) => handleEditChange('title', event.target.value)}
                                  className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-white/20"
                                />
                              </label>
                              <label className="block text-sm text-gray-300">
                                <span className="mb-2 block">分类</span>
                                <input
                                  type="text"
                                  value={editingProject.category}
                                  onChange={(event) => handleEditChange('category', event.target.value)}
                                  className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-white/20"
                                />
                              </label>
                              <label className="block text-sm text-gray-300">
                                <span className="mb-2 block">封面链接</span>
                                <input
                                  type="url"
                                  value={editingProject.image_url}
                                  onChange={(event) => handleEditChange('image_url', event.target.value)}
                                  className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-white/20"
                                />
                              </label>
                            </div>

                            <div className="mt-4 grid gap-4 lg:grid-cols-2">
                              <label className="block text-sm text-gray-300">
                                <span className="mb-2 block">项目链接</span>
                                <input
                                  type="url"
                                  value={editingProject.project_url ?? ''}
                                  onChange={(event) => handleEditChange('project_url', event.target.value)}
                                  className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-white/20"
                                />
                              </label>
                              <label className="flex items-center gap-3 text-sm text-gray-300">
                                <input
                                  type="checkbox"
                                  checked={editingProject.featured}
                                  onChange={(event) => handleEditChange('featured', event.target.checked)}
                                  className="h-4 w-4 rounded border-white/10 bg-black/40 text-white"
                                />
                                设为精选
                              </label>
                            </div>

                            <label className="block text-sm text-gray-300 mt-4">
                              <span className="mb-2 block">描述</span>
                              <textarea
                                value={editingProject.description}
                                onChange={(event) => handleEditChange('description', event.target.value)}
                                className="w-full min-h-[100px] rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-white/20"
                              />
                            </label>

                            <div className="mt-4 flex flex-wrap gap-3">
                              <button
                                type="button"
                                onClick={saveProject}
                                className="cursor-pointer rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-60"
                                disabled={savingId === editingProject.id}
                              >
                                {savingId === editingProject.id ? '保存中…' : '保存修改'}
                              </button>
                              <button
                                type="button"
                                onClick={cancelEditing}
                                className="cursor-pointer rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm text-white transition hover:bg-white/10"
                              >
                                取消
                              </button>
                            </div>
                          </td>
                        </tr>
                      )}
                    </Fragment>
                  )
                })
              )}
            </tbody>
          </table>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 text-sm text-gray-300">
          <p>
            Showing {currentPageItems.length} of {filteredProjects.length} project(s)
          </p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="cursor-pointer rounded-2xl border border-white/10 bg-white/5 px-4 py-2 transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50"
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
            >
              Previous
            </button>
            <span>
              Page {page} / {totalPages}
            </span>
            <button
              type="button"
              className="cursor-pointer rounded-2xl border border-white/10 bg-white/5 px-4 py-2 transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50"
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={page === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
