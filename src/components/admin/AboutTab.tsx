'use client'

import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'

interface AboutData {
  hero: {
    overline: string
    titlePrefix: string
    titleAccent: string
    description: string
    image: string
  }
  story: {
    overline: string
    titlePrefix: string
    titleAccent: string
    paragraph1: string
    paragraph2: string
    image: string
  }
  journeyMilestones: Array<{
    year: string
    title: string
    description: string
  }>
  coreValues: Array<{
    number: string
    title: string
    subtitle: string
    description: string
  }>
  promise: {
    overline: string
    titlePrefix: string
    titleAccent: string
    description: string
    buttonText: string
    buttonHref: string
    image: string
  }
}

export default function AboutTab() {
  const [data, setData] = useState<AboutData | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null)

  // Sub-sections accordion or tabs for intuitive editing
  const [activeSection, setActiveSection] = useState<'hero' | 'story' | 'milestones' | 'values' | 'promise'>('hero')

  // Uploading state
  const [uploadingKey, setUploadingKey] = useState<string | null>(null)
  const heroFileRef = useRef<HTMLInputElement>(null)
  const storyFileRef = useRef<HTMLInputElement>(null)
  const promiseFileRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    fetchAbout()
  }, [])

  const fetchAbout = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/about')
      const json = await res.json()
      if (res.ok && json.data) {
        setData(json.data)
      } else {
        setMessage({ text: json.error || 'Failed to load about data', type: 'error' })
      }
    } catch {
      setMessage({ text: 'Error connecting to about API', type: 'error' })
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!data) return

    setSaving(true)
    setMessage(null)

    try {
      const res = await fetch('/api/admin/about', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      const result = await res.json()

      if (res.ok) {
        setMessage({ text: 'About page content updated & committed to GitHub!', type: 'success' })
      } else {
        setMessage({ text: result.error || 'Failed to save about data', type: 'error' })
      }
    } catch {
      setMessage({ text: 'Network error saving about data', type: 'error' })
    } finally {
      setSaving(false)
    }
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, targetField: 'hero' | 'story' | 'promise') => {
    const file = e.target.files?.[0]
    if (!file || !data) return

    // 1. Instant client preview
    const reader = new FileReader()
    reader.onload = async (event) => {
      const base64 = event.target?.result as string
      if (base64) {
        setData((prev) =>
          prev
            ? {
                ...prev,
                [targetField]: {
                  ...prev[targetField],
                  image: base64,
                },
              }
            : null
        )
        setMessage({ text: `Photo selected and preview ready for ${targetField}!`, type: 'success' })
      }

      // 2. Background upload
      setUploadingKey(targetField)
      try {
        const form = new FormData()
        form.append('file', file)
        form.append('folder', 'public/images/about')

        const res = await fetch('/api/admin/upload', {
          method: 'POST',
          body: form,
        })
        const result = await res.json()

        if (res.ok && result.publicUrl) {
          setData((prev) =>
            prev
              ? {
                  ...prev,
                  [targetField]: {
                    ...prev[targetField],
                    image: result.publicUrl,
                  },
                }
              : null
          )
          setMessage({ text: `Image updated & committed for ${targetField} section`, type: 'success' })
        }
      } catch (err) {
        console.warn('Background upload notice:', err)
      } finally {
        setUploadingKey(null)
      }
    }
    reader.readAsDataURL(file)
  }

  // Milestone helpers
  const handleMilestoneChange = (index: number, field: string, val: string) => {
    if (!data) return
    const updated = [...data.journeyMilestones]
    updated[index] = { ...updated[index], [field]: val }
    setData({ ...data, journeyMilestones: updated })
  }

  const handleAddMilestone = () => {
    if (!data) return
    setData({
      ...data,
      journeyMilestones: [
        ...data.journeyMilestones,
        { year: '2027', title: 'New Frontier', description: 'Brief description of milestone achievement.' },
      ],
    })
  }

  const handleRemoveMilestone = (index: number) => {
    if (!data) return
    const updated = data.journeyMilestones.filter((_, i) => i !== index)
    setData({ ...data, journeyMilestones: updated })
  }

  // Core values helpers
  const handleValueChange = (index: number, field: string, val: string) => {
    if (!data) return
    const updated = [...data.coreValues]
    updated[index] = { ...updated[index], [field]: val }
    setData({ ...data, coreValues: updated })
  }

  if (loading || !data) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="w-8 h-8 border-2 border-[#FFD700] border-t-transparent rounded-full animate-spin" />
        <span className="ml-3 text-[#A3A3A3] font-sans text-sm tracking-widest uppercase">Loading About Page Data...</span>
      </div>
    )
  }

  return (
    <div className="space-y-8 font-sans">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#FFD700]">Brand Philosophy</span>
          <h2 className="text-2xl lg:text-3xl font-extrabold text-white tracking-tight uppercase font-syne mt-1">
            About JJ Travels CMS
          </h2>
          <p className="text-xs text-[#A3A3A3] mt-1">
            Manage your narrative, photography, journey milestones timeline, core principles, and closing promise.
          </p>
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#FFD700] text-black text-xs font-bold uppercase tracking-wider hover:bg-white transition-all shadow-[0_0_20px_rgba(255,215,0,0.2)] disabled:opacity-50"
        >
          {saving ? 'Committing...' : 'Commit All Changes'}
        </button>
      </div>

      {/* Alert Banner */}
      {message && (
        <div
          className={`p-4 rounded-xl border flex items-center justify-between text-xs tracking-wider uppercase font-semibold ${
            message.type === 'success'
              ? 'bg-[#FFD700]/10 border-[#FFD700]/30 text-[#FFD700]'
              : 'bg-red-500/10 border-red-500/30 text-red-400'
          }`}
        >
          <span>{message.text}</span>
          <button onClick={() => setMessage(null)} className="text-current hover:opacity-70">
            ✕
          </button>
        </div>
      )}

      {/* Section Sub-Navigation Tabs */}
      <div className="flex flex-wrap gap-2 p-1.5 bg-[#0A0A0A] rounded-2xl border border-white/5">
        {[
          { key: 'hero', label: '1. Hero Statement' },
          { key: 'story', label: '2. Our Story' },
          { key: 'milestones', label: '3. Milestones Timeline' },
          { key: 'values', label: '4. Core Principles' },
          { key: 'promise', label: '5. Our Promise Banner' },
        ].map((sec) => (
          <button
            key={sec.key}
            onClick={() => setActiveSection(sec.key as any)}
            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
              activeSection === sec.key
                ? 'bg-[#FFD700] text-black shadow-[0_0_15px_rgba(255,215,0,0.2)]'
                : 'text-[#A3A3A3] hover:text-white hover:bg-white/5'
            }`}
          >
            {sec.label}
          </button>
        ))}
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* SECTION 1: HERO */}
        {activeSection === 'hero' && (
          <div className="p-6 bg-[#0D0D0D] border border-white/10 rounded-2xl space-y-6">
            <h3 className="text-sm font-bold uppercase tracking-widest text-[#FFD700]">
              Section 1: Hero Banner
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-1 space-y-3">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#A3A3A3]">
                  Hero Photograph
                </label>
                <div className="relative h-48 w-full bg-[#111] rounded-xl overflow-hidden border border-white/10">
                  {data.hero.image ? (
                    <Image
                      src={data.hero.image}
                      alt="About Hero"
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-xs text-[#737373]">
                      No Image
                    </div>
                  )}
                </div>
                <input
                  type="text"
                  value={data.hero.image}
                  onChange={(e) =>
                    setData({ ...data, hero: { ...data.hero, image: e.target.value } })
                  }
                  className="w-full bg-[#111] text-xs text-white px-3 py-2 rounded-lg border border-white/10"
                  placeholder="/images/about/..."
                />
                <input
                  type="file"
                  ref={heroFileRef}
                  accept="image/*"
                  onChange={(e) => handleFileUpload(e, 'hero')}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => heroFileRef.current?.click()}
                  disabled={uploadingKey === 'hero'}
                  className="w-full py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg text-xs font-semibold uppercase tracking-wider border border-white/10"
                >
                  {uploadingKey === 'hero' ? 'Uploading...' : 'Upload Replacement Photo'}
                </button>
              </div>

              <div className="md:col-span-2 space-y-4">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#A3A3A3] mb-1">
                    Overline Badge
                  </label>
                  <input
                    type="text"
                    value={data.hero.overline}
                    onChange={(e) =>
                      setData({ ...data, hero: { ...data.hero, overline: e.target.value } })
                    }
                    className="w-full bg-[#111] text-xs text-white px-3 py-2 rounded-lg border border-white/10 focus:border-[#FFD700] focus:outline-none"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-[#A3A3A3] mb-1">
                      Title Prefix
                    </label>
                    <input
                      type="text"
                      value={data.hero.titlePrefix}
                      onChange={(e) =>
                        setData({ ...data, hero: { ...data.hero, titlePrefix: e.target.value } })
                      }
                      className="w-full bg-[#111] text-xs text-white px-3 py-2 rounded-lg border border-white/10 focus:border-[#FFD700] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-[#FFD700] mb-1">
                      Title Gold Accent
                    </label>
                    <input
                      type="text"
                      value={data.hero.titleAccent}
                      onChange={(e) =>
                        setData({ ...data, hero: { ...data.hero, titleAccent: e.target.value } })
                      }
                      className="w-full bg-[#111] text-xs text-[#FFD700] font-semibold px-3 py-2 rounded-lg border border-white/10 focus:border-[#FFD700] focus:outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#A3A3A3] mb-1">
                    Hero Description Paragraph
                  </label>
                  <textarea
                    rows={4}
                    value={data.hero.description}
                    onChange={(e) =>
                      setData({ ...data, hero: { ...data.hero, description: e.target.value } })
                    }
                    className="w-full bg-[#111] text-xs text-white px-3 py-2 rounded-lg border border-white/10 focus:border-[#FFD700] focus:outline-none leading-relaxed"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SECTION 2: STORY */}
        {activeSection === 'story' && (
          <div className="p-6 bg-[#0D0D0D] border border-white/10 rounded-2xl space-y-6">
            <h3 className="text-sm font-bold uppercase tracking-widest text-[#FFD700]">
              Section 2: Our Story & Origins
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-1 space-y-3">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#A3A3A3]">
                  Story Visual Photograph
                </label>
                <div className="relative h-48 w-full bg-[#111] rounded-xl overflow-hidden border border-white/10">
                  {data.story.image ? (
                    <Image
                      src={data.story.image}
                      alt="Our Story"
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-xs text-[#737373]">
                      No Image
                    </div>
                  )}
                </div>
                <input
                  type="text"
                  value={data.story.image}
                  onChange={(e) =>
                    setData({ ...data, story: { ...data.story, image: e.target.value } })
                  }
                  className="w-full bg-[#111] text-xs text-white px-3 py-2 rounded-lg border border-white/10"
                  placeholder="/images/about/..."
                />
                <input
                  type="file"
                  ref={storyFileRef}
                  accept="image/*"
                  onChange={(e) => handleFileUpload(e, 'story')}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => storyFileRef.current?.click()}
                  disabled={uploadingKey === 'story'}
                  className="w-full py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg text-xs font-semibold uppercase tracking-wider border border-white/10"
                >
                  {uploadingKey === 'story' ? 'Uploading...' : 'Upload Replacement Photo'}
                </button>
              </div>

              <div className="md:col-span-2 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-[#A3A3A3] mb-1">
                      Overline
                    </label>
                    <input
                      type="text"
                      value={data.story.overline}
                      onChange={(e) =>
                        setData({ ...data, story: { ...data.story, overline: e.target.value } })
                      }
                      className="w-full bg-[#111] text-xs text-white px-3 py-2 rounded-lg border border-white/10"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-[#A3A3A3] mb-1">
                      Title Prefix
                    </label>
                    <input
                      type="text"
                      value={data.story.titlePrefix}
                      onChange={(e) =>
                        setData({ ...data, story: { ...data.story, titlePrefix: e.target.value } })
                      }
                      className="w-full bg-[#111] text-xs text-white px-3 py-2 rounded-lg border border-white/10"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-[#FFD700] mb-1">
                      Title Gold Accent
                    </label>
                    <input
                      type="text"
                      value={data.story.titleAccent}
                      onChange={(e) =>
                        setData({ ...data, story: { ...data.story, titleAccent: e.target.value } })
                      }
                      className="w-full bg-[#111] text-xs text-[#FFD700] font-semibold px-3 py-2 rounded-lg border border-white/10"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#A3A3A3] mb-1">
                    First Narrative Paragraph
                  </label>
                  <textarea
                    rows={3}
                    value={data.story.paragraph1}
                    onChange={(e) =>
                      setData({ ...data, story: { ...data.story, paragraph1: e.target.value } })
                    }
                    className="w-full bg-[#111] text-xs text-white px-3 py-2 rounded-lg border border-white/10 leading-relaxed"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#A3A3A3] mb-1">
                    Second Narrative Paragraph (Luxury Definition)
                  </label>
                  <textarea
                    rows={3}
                    value={data.story.paragraph2}
                    onChange={(e) =>
                      setData({ ...data, story: { ...data.story, paragraph2: e.target.value } })
                    }
                    className="w-full bg-[#111] text-xs text-white px-3 py-2 rounded-lg border border-white/10 leading-relaxed"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SECTION 3: MILESTONES */}
        {activeSection === 'milestones' && (
          <div className="p-6 bg-[#0D0D0D] border border-white/10 rounded-2xl space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold uppercase tracking-widest text-[#FFD700]">
                  Section 3: Journey Milestones Timeline
                </h3>
                <p className="text-xs text-[#A3A3A3] mt-0.5">
                  Chronological key markers displayed on the interactive timeline.
                </p>
              </div>
              <button
                type="button"
                onClick={handleAddMilestone}
                className="px-4 py-2 bg-[#FFD700] text-black text-xs font-bold uppercase tracking-wider rounded-lg hover:bg-white transition-all"
              >
                + Add Milestone
              </button>
            </div>

            <div className="space-y-4">
              {data.journeyMilestones.map((m, idx) => (
                <div
                  key={idx}
                  className="p-4 bg-[#111] border border-white/10 rounded-xl space-y-3 relative group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-[#FFD700] uppercase tracking-widest">
                      Milestone #{idx + 1}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleRemoveMilestone(idx)}
                      className="text-red-400 hover:text-red-300 text-xs uppercase font-semibold"
                    >
                      Delete
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-[#A3A3A3] mb-1">
                        Year
                      </label>
                      <input
                        type="text"
                        value={m.year}
                        onChange={(e) => handleMilestoneChange(idx, 'year', e.target.value)}
                        className="w-full bg-black text-xs text-[#FFD700] font-mono px-3 py-2 rounded-lg border border-white/10"
                      />
                    </div>
                    <div className="sm:col-span-3">
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-[#A3A3A3] mb-1">
                        Title / Achievement
                      </label>
                      <input
                        type="text"
                        value={m.title}
                        onChange={(e) => handleMilestoneChange(idx, 'title', e.target.value)}
                        className="w-full bg-black text-xs text-white px-3 py-2 rounded-lg border border-white/10"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-[#A3A3A3] mb-1">
                      Narrative Paragraph
                    </label>
                    <textarea
                      rows={2}
                      value={m.description}
                      onChange={(e) => handleMilestoneChange(idx, 'description', e.target.value)}
                      className="w-full bg-black text-xs text-white px-3 py-2 rounded-lg border border-white/10 leading-relaxed"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SECTION 4: CORE VALUES */}
        {activeSection === 'values' && (
          <div className="p-6 bg-[#0D0D0D] border border-white/10 rounded-2xl space-y-6">
            <div>
              <h3 className="text-sm font-bold uppercase tracking-widest text-[#FFD700]">
                Section 4: Core Principles (Integrity, Transparency, Individuality, Dedication)
              </h3>
              <p className="text-xs text-[#A3A3A3] mt-0.5">
                The four brand pillars showcased on the About page.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {data.coreValues.map((val, idx) => (
                <div
                  key={idx}
                  className="p-5 bg-[#111] border border-white/10 rounded-xl space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-[#FFD700]">
                      {val.number}
                    </span>
                    <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 bg-[#FFD700]/10 text-[#FFD700] rounded">
                      Pillar {idx + 1}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-[#A3A3A3] mb-1">
                        Title
                      </label>
                      <input
                        type="text"
                        value={val.title}
                        onChange={(e) => handleValueChange(idx, 'title', e.target.value)}
                        className="w-full bg-black text-xs text-white px-3 py-2 rounded-lg border border-white/10"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-[#FFD700] mb-1">
                        Subtitle (e.g. Integrity)
                      </label>
                      <input
                        type="text"
                        value={val.subtitle}
                        onChange={(e) => handleValueChange(idx, 'subtitle', e.target.value)}
                        className="w-full bg-black text-xs text-[#FFD700] font-semibold px-3 py-2 rounded-lg border border-white/10"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-[#A3A3A3] mb-1">
                      Pillar Description
                    </label>
                    <textarea
                      rows={3}
                      value={val.description}
                      onChange={(e) => handleValueChange(idx, 'description', e.target.value)}
                      className="w-full bg-black text-xs text-white px-3 py-2 rounded-lg border border-white/10 leading-relaxed"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SECTION 5: PROMISE BANNER */}
        {activeSection === 'promise' && (
          <div className="p-6 bg-[#0D0D0D] border border-white/10 rounded-2xl space-y-6">
            <h3 className="text-sm font-bold uppercase tracking-widest text-[#FFD700]">
              Section 5: Our Promise Viaduct Banner
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-1 space-y-3">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#A3A3A3]">
                  Viaduct Background Photograph
                </label>
                <div className="relative h-48 w-full bg-[#111] rounded-xl overflow-hidden border border-white/10">
                  {data.promise.image ? (
                    <Image
                      src={data.promise.image}
                      alt="Promise Banner"
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-xs text-[#737373]">
                      No Image
                    </div>
                  )}
                </div>
                <input
                  type="text"
                  value={data.promise.image}
                  onChange={(e) =>
                    setData({ ...data, promise: { ...data.promise, image: e.target.value } })
                  }
                  className="w-full bg-[#111] text-xs text-white px-3 py-2 rounded-lg border border-white/10"
                  placeholder="/images/about/..."
                />
                <input
                  type="file"
                  ref={promiseFileRef}
                  accept="image/*"
                  onChange={(e) => handleFileUpload(e, 'promise')}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => promiseFileRef.current?.click()}
                  disabled={uploadingKey === 'promise'}
                  className="w-full py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg text-xs font-semibold uppercase tracking-wider border border-white/10"
                >
                  {uploadingKey === 'promise' ? 'Uploading...' : 'Upload Replacement Photo'}
                </button>
              </div>

              <div className="md:col-span-2 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-[#A3A3A3] mb-1">
                      Overline
                    </label>
                    <input
                      type="text"
                      value={data.promise.overline}
                      onChange={(e) =>
                        setData({ ...data, promise: { ...data.promise, overline: e.target.value } })
                      }
                      className="w-full bg-[#111] text-xs text-white px-3 py-2 rounded-lg border border-white/10"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-[#A3A3A3] mb-1">
                      Title Prefix
                    </label>
                    <input
                      type="text"
                      value={data.promise.titlePrefix}
                      onChange={(e) =>
                        setData({
                          ...data,
                          promise: { ...data.promise, titlePrefix: e.target.value },
                        })
                      }
                      className="w-full bg-[#111] text-xs text-white px-3 py-2 rounded-lg border border-white/10"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-[#FFD700] mb-1">
                      Title Gold Accent
                    </label>
                    <input
                      type="text"
                      value={data.promise.titleAccent}
                      onChange={(e) =>
                        setData({
                          ...data,
                          promise: { ...data.promise, titleAccent: e.target.value },
                        })
                      }
                      className="w-full bg-[#111] text-xs text-[#FFD700] font-semibold px-3 py-2 rounded-lg border border-white/10"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#A3A3A3] mb-1">
                    Promise Statement Description
                  </label>
                  <textarea
                    rows={3}
                    value={data.promise.description}
                    onChange={(e) =>
                      setData({
                        ...data,
                        promise: { ...data.promise, description: e.target.value },
                      })
                    }
                    className="w-full bg-[#111] text-xs text-white px-3 py-2 rounded-lg border border-white/10 leading-relaxed"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-[#A3A3A3] mb-1">
                      Button CTA Label
                    </label>
                    <input
                      type="text"
                      value={data.promise.buttonText}
                      onChange={(e) =>
                        setData({
                          ...data,
                          promise: { ...data.promise, buttonText: e.target.value },
                        })
                      }
                      className="w-full bg-[#111] text-xs text-white px-3 py-2 rounded-lg border border-white/10"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-[#A3A3A3] mb-1">
                      Button Target Link
                    </label>
                    <input
                      type="text"
                      value={data.promise.buttonHref}
                      onChange={(e) =>
                        setData({
                          ...data,
                          promise: { ...data.promise, buttonHref: e.target.value },
                        })
                      }
                      className="w-full bg-[#111] text-xs text-white px-3 py-2 rounded-lg border border-white/10"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Global Save Button at bottom of form */}
        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={saving}
            className="px-8 py-3 rounded-full bg-[#FFD700] text-black text-xs font-bold uppercase tracking-wider hover:bg-white transition-all shadow-[0_0_20px_rgba(255,215,0,0.2)] disabled:opacity-50"
          >
            {saving ? 'Committing Changes...' : 'Save & Commit About Changes'}
          </button>
        </div>
      </form>
    </div>
  )
}

