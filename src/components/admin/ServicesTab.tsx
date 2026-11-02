"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Plus, Pencil, Trash2, X, Save, Loader2, Upload, CheckCircle2, AlertCircle } from "lucide-react";

interface ServiceItem {
  id: string;
  number: string;
  title: string;
  category: string;
  description: string;
  image: string;
  slug: string;
}

interface ServicesData {
  hero: {
    overline: string;
    titlePrefix: string;
    titleAccent: string;
    description: string;
  };
  services: ServiceItem[];
  coreValues: Array<{
    number: string;
    title: string;
    description: string;
  }>;
}

export default function ServicesTab() {
  const [data, setData] = useState<ServicesData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingIdx, setUploadingIdx] = useState<number | null>(null);
  const [editingServiceIdx, setEditingServiceIdx] = useState<number | null>(null);
  const [status, setStatus] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/services");
      const json = await res.json();
      if (json.data) setData(json.data);
    } catch {
      setStatus({ type: "error", text: "Failed to load services data" });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!data) return;
    setSaving(true);
    setStatus(null);

    try {
      const res = await fetch("/api/admin/services", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Failed to save services");
      setStatus({ type: "success", text: "Services and core values saved & committed to GitHub!" });
    } catch (err) {
      setStatus({ type: "error", text: err instanceof Error ? err.message : "Error saving services" });
    } finally {
      setSaving(false);
    }
  };

  const handleImageUpload = async (file: File, serviceIndex: number) => {
    if (!data) return;
    setUploadingIdx(serviceIndex);
    setStatus(null);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", "public/images/services");

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      const json = await res.json();
      if (json.url) {
        const updated = [...data.services];
        updated[serviceIndex].image = json.url;
        setData({ ...data, services: updated });
        setStatus({ type: "success", text: "Service visual updated successfully!" });
      } else {
        throw new Error(json.error || "Upload failed");
      }
    } catch (err) {
      setStatus({ type: "error", text: err instanceof Error ? err.message : "Upload error" });
    } finally {
      setUploadingIdx(null);
    }
  };

  const addService = () => {
    if (!data) return;
    const nextNum = String(data.services.length + 1).padStart(2, "0");
    const newSvc: ServiceItem = {
      id: `svc-${Date.now()}`,
      number: nextNum,
      title: "New Travel Service",
      category: "Bespoke Services",
      description: "Comprehensive assistance tailored to elevate your travel journey.",
      image: "/images/services/flight-hd.jpg",
      slug: `service-${nextNum}`,
    };
    setData({
      ...data,
      services: [...data.services, newSvc],
    });
    setEditingServiceIdx(data.services.length);
  };

  const removeService = (index: number) => {
    if (!data) return;
    if (!window.confirm("Remove this service?")) return;
    const updated = data.services
      .filter((_, idx) => idx !== index)
      .map((s, idx) => ({ ...s, number: String(idx + 1).padStart(2, "0") }));
    setData({ ...data, services: updated });
    setEditingServiceIdx(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-20">
        <Loader2 className="w-8 h-8 animate-spin text-gold" />
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <span className="text-gold text-xs font-semibold tracking-widest uppercase block mb-1">
            Section 04
          </span>
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white">
            Services &amp; Core Values
          </h2>
          <p className="text-xs text-white/60 mt-1">
            Edit the 9 structured services, photo crossfade displays, and the 2 prominent Core Values.
          </p>
        </div>

        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gold text-black font-semibold text-xs sm:text-sm hover:bg-white transition-colors duration-200 disabled:opacity-50 cursor-pointer shadow-lg shadow-gold/20"
        >
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          <span>{saving ? "Committing..." : "Save & Commit Services"}</span>
        </button>
      </div>

      {status && (
        <div
          className={`p-4 rounded-xl flex items-center gap-3 text-xs sm:text-sm ${
            status.type === "success"
              ? "bg-emerald-950/40 border border-emerald-500/30 text-emerald-200"
              : "bg-red-950/40 border border-red-500/30 text-red-200"
          }`}
        >
          {status.type === "success" ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          ) : (
            <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
          )}
          <span>{status.text}</span>
        </div>
      )}

      {/* 1. HERO TEXT */}
      <div className="p-6 sm:p-8 rounded-2xl bg-zinc-950/70 border border-white/10 space-y-4">
        <h3 className="font-heading text-lg font-bold text-white border-b border-white/10 pb-3">
          Services Page Introduction
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-[11px] uppercase tracking-wider text-white/70 mb-1.5 font-medium">
              Overline Eyebrow
            </label>
            <input
              type="text"
              value={data.hero.overline}
              onChange={(e) =>
                setData({
                  ...data,
                  hero: { ...data.hero, overline: e.target.value },
                })
              }
              className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/15 text-white text-sm focus:outline-none focus:border-gold"
            />
          </div>

          <div>
            <label className="block text-[11px] uppercase tracking-wider text-white/70 mb-1.5 font-medium">
              Headline Prefix
            </label>
            <input
              type="text"
              value={data.hero.titlePrefix}
              onChange={(e) =>
                setData({
                  ...data,
                  hero: { ...data.hero, titlePrefix: e.target.value },
                })
              }
              className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/15 text-white text-sm focus:outline-none focus:border-gold"
            />
          </div>

          <div>
            <label className="block text-[11px] uppercase tracking-wider text-white/70 mb-1.5 font-medium">
              Headline Accent (Gold Italic)
            </label>
            <input
              type="text"
              value={data.hero.titleAccent}
              onChange={(e) =>
                setData({
                  ...data,
                  hero: { ...data.hero, titleAccent: e.target.value },
                })
              }
              className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/15 text-gold text-sm focus:outline-none focus:border-gold italic"
            />
          </div>
        </div>

        <div>
          <label className="block text-[11px] uppercase tracking-wider text-white/70 mb-1.5 font-medium">
            Introduction Description
          </label>
          <textarea
            rows={2}
            value={data.hero.description}
            onChange={(e) =>
              setData({
                ...data,
                hero: { ...data.hero, description: e.target.value },
              })
            }
            className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/15 text-white text-sm focus:outline-none focus:border-gold resize-none"
          />
        </div>
      </div>

      {/* 2. SERVICES LIST */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-heading text-lg font-bold text-white">
              The Numbered Services ({data.services.length})
            </h3>
            <p className="text-xs text-white/50">Edit title, category, description, and hover visual.</p>
          </div>

          <button
            type="button"
            onClick={addService}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gold/15 text-gold border border-gold/40 text-xs font-semibold hover:bg-gold hover:text-black transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Service</span>
          </button>
        </div>

        <div className="space-y-4">
          {data.services.map((svc, idx) => (
            <div
              key={svc.id}
              className="p-6 rounded-2xl bg-zinc-950/70 border border-white/10 space-y-4"
            >
              <div className="flex items-center justify-between pb-3 border-b border-white/5">
                <div className="flex items-center gap-3">
                  <span className="font-heading font-bold text-gold text-lg">{svc.number}</span>
                  <span className="text-sm font-semibold text-white">{svc.title}</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      setEditingServiceIdx(editingServiceIdx === idx ? null : idx)
                    }
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-white/15 text-xs text-white/80 hover:text-gold hover:border-gold transition-colors"
                  >
                    <Pencil className="w-3 h-3" />
                    <span>{editingServiceIdx === idx ? "Collapse" : "Edit"}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => removeService(idx)}
                    className="p-1.5 rounded-lg border border-red-500/30 text-red-400 hover:bg-red-950/40 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {editingServiceIdx === idx ? (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-2 animate-fadeIn">
                  <div className="lg:col-span-8 space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] uppercase text-white/60 mb-1">
                          Service Title
                        </label>
                        <input
                          type="text"
                          value={svc.title}
                          onChange={(e) => {
                            const updated = [...data.services];
                            updated[idx].title = e.target.value;
                            setData({ ...data, services: updated });
                          }}
                          className="w-full px-3 py-2 rounded-lg bg-white/[0.04] border border-white/15 text-white text-xs focus:outline-none focus:border-gold"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] uppercase text-white/60 mb-1">
                          Category Label
                        </label>
                        <input
                          type="text"
                          value={svc.category}
                          onChange={(e) => {
                            const updated = [...data.services];
                            updated[idx].category = e.target.value;
                            setData({ ...data, services: updated });
                          }}
                          className="w-full px-3 py-2 rounded-lg bg-white/[0.04] border border-white/15 text-white text-xs focus:outline-none focus:border-gold"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase text-white/60 mb-1">
                        Service Description
                      </label>
                      <textarea
                        rows={3}
                        value={svc.description}
                        onChange={(e) => {
                          const updated = [...data.services];
                          updated[idx].description = e.target.value;
                          setData({ ...data, services: updated });
                        }}
                        className="w-full px-3 py-2 rounded-lg bg-white/[0.04] border border-white/15 text-white text-xs focus:outline-none focus:border-gold resize-none"
                      />
                    </div>
                  </div>

                  {/* Photo Upload */}
                  <div className="lg:col-span-4 space-y-2">
                    <label className="block text-[10px] uppercase text-white/60">
                      Hover Visual Display
                    </label>

                    <div className="relative aspect-[16/10] rounded-xl overflow-hidden border border-white/15 bg-black">
                      <Image src={svc.image} alt={svc.title} fill className="object-cover" />
                      {uploadingIdx === idx && (
                        <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                          <Loader2 className="w-5 h-5 animate-spin text-gold" />
                        </div>
                      )}
                    </div>

                    <label className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg border border-white/20 text-white text-xs font-medium hover:border-gold hover:text-gold transition-colors cursor-pointer">
                      <Upload className="w-3.5 h-3.5" />
                      <span>Upload New Visual</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleImageUpload(file, idx);
                        }}
                      />
                    </label>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between text-xs text-white/70">
                  <p className="line-clamp-1 max-w-2xl">{svc.description}</p>
                  <span className="text-white/40">{svc.category}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 3. CORE VALUES */}
      <div className="p-6 sm:p-8 rounded-2xl bg-zinc-950/70 border border-white/10 space-y-4">
        <h3 className="font-heading text-lg font-bold text-white border-b border-white/10 pb-3">
          Section 04 Core Values (2 Prominent Pillars)
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {data.coreValues.map((val, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-white/[0.02] border border-white/10 space-y-3">
              <span className="font-heading font-bold text-gold text-sm block">
                Pillar {val.number}
              </span>

              <div>
                <label className="block text-[10px] uppercase text-white/60 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  value={val.title}
                  onChange={(e) => {
                    const updated = [...data.coreValues];
                    updated[idx].title = e.target.value;
                    setData({ ...data, coreValues: updated });
                  }}
                  className="w-full px-3 py-2 rounded-lg bg-white/[0.04] border border-white/15 text-white text-xs focus:outline-none focus:border-gold"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase text-white/60 mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={val.description}
                  onChange={(e) => {
                    const updated = [...data.coreValues];
                    updated[idx].description = e.target.value;
                    setData({ ...data, coreValues: updated });
                  }}
                  className="w-full px-3 py-2 rounded-lg bg-white/[0.04] border border-white/15 text-white text-xs focus:outline-none focus:border-gold resize-none"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

