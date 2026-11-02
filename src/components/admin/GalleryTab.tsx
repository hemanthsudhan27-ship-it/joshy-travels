'use client'

import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import type { GalleryItem } from '@/data/galleryData'

const CATEGORY_OPTIONS: { value: GalleryItem['category']; label: string }[] = [
  { value: 'europe', label: 'Alps & Europe' },
  { value: 'oceans', label: 'Oceans & Coastal' },
  { value: 'middle-east', label: 'Middle East & Wonders' },
  { value: 'stays', label: 'Luxury Stays' },
]

const ASPECT_OPTIONS = [
  { value: 'standard', label: 'Standard (4:3)' },
  { value: 'tall', label: 'Tall Portrait (3:4)' },
  { value: 'wide', label: 'Wide Cinematic (16:9)' },
]

export default function GalleryTab() {
  const [items, setItems] = useState<GalleryItem[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null)
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')

  // Modal / Editor state
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null)
  const [uploadingImage, setUploadingImage] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Form state
  const [formData, setFormData] = useState<GalleryItem>({
    id: '',
    title: '',
    location: '',
    category: 'europe',
    categoryLabel: 'Alps & Europe',
    image: '',
    aspect: 'standard',
    description: '',
    packageSlug: '',
  })

  useEffect(() => {
    fetchGallery()
  }, [])

  const fetchGallery = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/gallery')
      const data = await res.json()
      if (res.ok && data.items) {
        setItems(data.items)
      } else {
        setMessage({ text: data.error || 'Failed to fetch gallery items', type: 'error' })
      }
    } catch {
      setMessage({ text: 'Error connecting to gallery API', type: 'error' })
    } finally {
      setLoading(false)
    }
  }

  const handleOpenAdd = () => {
    setEditingItem(null)
    setFormData({
      id: `gallery-${Date.now()}`,
      title: '',
      location: '',
      category: 'europe',
      categoryLabel: 'Alps & Europe',
      image: '',
      aspect: 'standard',
      description: '',
      packageSlug: '',
    })
    setIsModalOpen(true)
  }

  const handleOpenEdit = (item: GalleryItem) => {
    setEditingItem(item)
    setFormData({ ...item })
    setIsModalOpen(true)
  }

  const handleCategoryChange = (cat: GalleryItem['category']) => {
    const match = CATEGORY_OPTIONS.find((c) => c.value === cat)
    setFormData((prev) => ({
      ...prev,
      category: cat,
      categoryLabel: match ? match.label : prev.categoryLabel,
    }))
  }

  const handleImageFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploadingImage(true)
    try {
      const uploadData = new FormData()
      uploadData.append('file', file)
      uploadData.append('subfolder', 'gallery')

      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: uploadData,
      })
      const result = await res.json()

      if (res.ok && result.publicUrl) {
        setFormData((prev) => ({ ...prev, image: result.publicUrl }))
        setMessage({ text: 'Image uploaded and committed to GitHub', type: 'success' })
      } else {
        setMessage({ text: result.error || 'Image upload failed', type: 'error' })
      }
    } catch {
      setMessage({ text: 'Upload failed: network error', type: 'error' })
    } finally {
      setUploadingImage(false)
    }
  }

  const handleSaveItem = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.title || !formData.image) {
      setMessage({ text: 'Title and Photograph Image are required', type: 'error' })
      return
    }

    setSaving(true)
    setMessage(null)

    try {
      const isEdit = !!editingItem
      const res = await fetch('/api/admin/gallery', {
        method: isEdit ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      const result = await res.json()

      if (res.ok) {
        setMessage({
          text: isEdit ? 'Photograph updated & committed to GitHub!' : 'New photograph added & committed to GitHub!',
          type: 'success',
        })
        setIsModalOpen(false)
        await fetchGallery()
      } else {
        setMessage({ text: result.error || 'Failed to save photograph', type: 'error' })
      }
    } catch {
      setMessage({ text: 'Network error saving photograph', type: 'error' })
    } finally {
      setSaving(false)
    }
  }

  const handleDeleteItem = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to permanently delete "${title}" from the gallery?`)) {
      return
    }

    setSaving(true)
    try {
      const res = await fetch(`/api/admin/gallery?id=${encodeURIComponent(id)}`, {
        method: 'DELETE',
      })
      const result = await res.json()

      if (res.ok) {
        setMessage({ text: `Photograph "${title}" deleted & committed to GitHub`, type: 'success' })
        await fetchGallery()
      } else {
        setMessage({ text: result.error || 'Failed to delete photograph', type: 'error' })
      }
    } catch {
      setMessage({ text: 'Network error deleting photograph', type: 'error' })
    } finally {
      setSaving(false)
    }
  }

  const filteredItems = items.filter((item) => {
    const matchesCategory = activeCategoryFilter === 'all' || item.category === activeCategoryFilter
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="w-8 h-8 border-2 border-[#FFD700] border-t-transparent rounded-full animate-spin" />
        <span className="ml-3 text-[#A3A3A3] font-sans text-sm tracking-widest uppercase">Loading Gallery Visuals...</span>
      </div>
    )
  }

  return (
    <div className="space-y-8 font-sans">
      {/* Tab Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#FFD700]">Visual Archive</span>
          <h2 className="text-2xl lg:text-3xl font-extrabold text-white tracking-tight uppercase font-syne mt-1">
            Visual Curations <span className="text-[#FFD700]">({items.length})</span>
          </h2>
          <p className="text-xs text-[#A3A3A3] mt-1">
            Curate high-resolution imagery, destination tags, aspect ratios, and links to packages.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#FFD700] text-black text-xs font-bold uppercase tracking-wider hover:bg-white transition-all shadow-[0_0_20px_rgba(255,215,0,0.2)]"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
          </svg>
          Add Photograph
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

      {/* Filter / Search Bar */}
      <div className="flex flex-col lg:flex-row gap-4 items-center justify-between bg-[#0A0A0A] p-4 rounded-2xl border border-white/5">
        <div className="flex flex-wrap gap-2 w-full lg:w-auto">
          <button
            onClick={() => setActiveCategoryFilter('all')}
            className={`px-3 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider transition-all ${
              activeCategoryFilter === 'all'
                ? 'bg-[#FFD700] text-black shadow-[0_0_15px_rgba(255,215,0,0.25)]'
                : 'bg-white/5 text-[#A3A3A3] hover:text-white border border-white/5'
            }`}
          >
            All Categories ({items.length})
          </button>
          {CATEGORY_OPTIONS.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setActiveCategoryFilter(cat.value)}
              className={`px-3 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider transition-all ${
                activeCategoryFilter === cat.value
                  ? 'bg-[#FFD700] text-black shadow-[0_0_15px_rgba(255,215,0,0.25)]'
                  : 'bg-white/5 text-[#A3A3A3] hover:text-white border border-white/5'
              }`}
            >
              {cat.label} ({items.filter((i) => i.category === cat.value).length})
            </button>
          ))}
        </div>

        <div className="relative w-full lg:w-72">
          <input
            type="text"
            placeholder="Search photograph or location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#111] text-xs text-white placeholder-[#737373] px-4 py-2.5 rounded-xl border border-white/10 focus:border-[#FFD700] focus:outline-none"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-2.5 text-xs text-[#737373] hover:text-white"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Photographs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="group relative bg-[#0D0D0D] border border-white/10 rounded-2xl overflow-hidden hover:border-[#FFD700]/50 transition-all flex flex-col"
          >
            {/* Visual Thumbnail */}
            <div className="relative h-56 w-full bg-[#111] overflow-hidden">
              {item.image ? (
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  unoptimized
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-[#737373] text-xs">
                  No Image Preview
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

              {/* Badges */}
              <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                <span className="px-2.5 py-1 rounded-full bg-black/80 backdrop-blur-md border border-[#FFD700]/40 text-[#FFD700] text-[9px] font-bold uppercase tracking-widest">
                  {item.categoryLabel}
                </span>
                <span className="px-2 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/20 text-white text-[9px] font-mono uppercase">
                  {item.aspect}
                </span>
              </div>
            </div>

            {/* Content Details */}
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <p className="text-[10px] text-[#A3A3A3] font-bold uppercase tracking-wider mb-1">
                  📍 {item.location}
                </p>
                <h3 className="text-base font-bold text-white group-hover:text-[#FFD700] transition-colors line-clamp-1">
                  {item.title}
                </h3>
                <p className="text-xs text-[#888] mt-2 line-clamp-2 italic leading-relaxed">
                  &ldquo;{item.description}&rdquo;
                </p>
                {item.packageSlug && (
                  <p className="text-[10px] text-[#FFD700] font-mono mt-3 uppercase tracking-wider">
                    🔗 Linked: /{item.packageSlug}
                  </p>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 pt-4 mt-4 border-t border-white/5">
                <button
                  onClick={() => handleOpenEdit(item)}
                  className="flex-1 py-2 rounded-lg bg-white/5 hover:bg-[#FFD700] hover:text-black text-xs font-semibold uppercase tracking-wider text-white transition-all text-center"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteItem(item.id, item.title)}
                  disabled={saving}
                  className="px-3 py-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs font-semibold uppercase tracking-wider transition-colors"
                  title="Delete Photograph"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}

        {filteredItems.length === 0 && (
          <div className="col-span-full py-16 text-center text-[#737373] bg-[#0A0A0A] rounded-2xl border border-white/5">
            <p className="text-sm">No photographs found matching your filter.</p>
          </div>
        )}
      </div>

      {/* Create / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-[#0D0D0D] border border-white/20 rounded-2xl p-6 lg:p-8 my-8 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <h3 className="text-lg font-bold text-white uppercase tracking-wider font-syne">
                {editingItem ? 'Edit Photograph' : 'Add New Photograph'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-[#737373] hover:text-white text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveItem} className="mt-6 space-y-5">
              {/* Image Preview & Upload */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#FFD700] mb-2">
                  Photograph Visual (Upload or URL)
                </label>
                <div className="flex flex-col sm:flex-row gap-4 items-start">
                  <div className="relative w-full sm:w-48 h-32 bg-[#111] rounded-xl overflow-hidden border border-white/10 shrink-0">
                    {formData.image ? (
                      <Image
                        src={formData.image}
                        alt="Preview"
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[11px] text-[#737373]">
                        No Image Selected
                      </div>
                    )}
                  </div>
                  <div className="flex-1 space-y-2 w-full">
                    <input
                      type="text"
                      placeholder="e.g. /images/gallery/matterhorn.jpg or https://..."
                      value={formData.image}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                      className="w-full bg-[#111] text-xs text-white px-3 py-2 rounded-lg border border-white/10 focus:border-[#FFD700] focus:outline-none"
                    />
                    <div className="flex items-center gap-2">
                      <input
                        type="file"
                        ref={fileInputRef}
                        accept="image/*"
                        onChange={handleImageFileUpload}
                        className="hidden"
                      />
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={uploadingImage}
                        className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-[11px] font-semibold uppercase tracking-wider transition-all disabled:opacity-50"
                      >
                        {uploadingImage ? 'Uploading & Committing...' : 'Upload Image File'}
                      </button>
                      <span className="text-[10px] text-[#737373]">
                        Directly commits to GitHub /public/images/gallery
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Title & Location */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#A3A3A3] mb-1">
                    Photograph Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Matterhorn Reflections at Dawn"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full bg-[#111] text-xs text-white px-3 py-2 rounded-lg border border-white/10 focus:border-[#FFD700] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#A3A3A3] mb-1">
                    Location Label *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Zermatt, Swiss Alps"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full bg-[#111] text-xs text-white px-3 py-2 rounded-lg border border-white/10 focus:border-[#FFD700] focus:outline-none"
                  />
                </div>
              </div>

              {/* Category & Aspect Ratio */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#A3A3A3] mb-1">
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => handleCategoryChange(e.target.value as any)}
                    className="w-full bg-[#111] text-xs text-white px-3 py-2 rounded-lg border border-white/10 focus:border-[#FFD700] focus:outline-none"
                  >
                    {CATEGORY_OPTIONS.map((c) => (
                      <option key={c.value} value={c.value} className="bg-black">
                        {c.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#A3A3A3] mb-1">
                    Aspect Ratio *
                  </label>
                  <select
                    value={formData.aspect}
                    onChange={(e) => setFormData({ ...formData, aspect: e.target.value as any })}
                    className="w-full bg-[#111] text-xs text-white px-3 py-2 rounded-lg border border-white/10 focus:border-[#FFD700] focus:outline-none"
                  >
                    {ASPECT_OPTIONS.map((a) => (
                      <option key={a.value} value={a.value} className="bg-black">
                        {a.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#A3A3A3] mb-1">
                    Linked Package Slug (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. switzerland-explorer"
                    value={formData.packageSlug || ''}
                    onChange={(e) => setFormData({ ...formData, packageSlug: e.target.value })}
                    className="w-full bg-[#111] text-xs text-white px-3 py-2 rounded-lg border border-white/10 focus:border-[#FFD700] focus:outline-none"
                  />
                </div>
              </div>

              {/* Description / Caption */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#A3A3A3] mb-1">
                  Description / Story Caption
                </label>
                <textarea
                  rows={3}
                  placeholder="Golden dawn rays igniting the pyramid peak of the Matterhorn above the quiet village..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full bg-[#111] text-xs text-white px-3 py-2 rounded-lg border border-white/10 focus:border-[#FFD700] focus:outline-none"
                />
              </div>

              {/* Form Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-semibold uppercase tracking-wider text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving || uploadingImage}
                  className="px-6 py-2 rounded-lg bg-[#FFD700] hover:bg-white text-black text-xs font-bold uppercase tracking-wider transition-all disabled:opacity-50 shadow-[0_0_15px_rgba(255,215,0,0.2)]"
                >
                  {saving ? 'Saving & Committing...' : editingItem ? 'Save Changes' : 'Create Photograph'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
