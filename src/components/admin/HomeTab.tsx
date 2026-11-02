"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Save, Loader2, Upload, AlertCircle, CheckCircle2 } from "lucide-react";

interface HomeData {
  hero: {
    overline: string;
    titleLine1: string;
    titleLine2: string;
    titleLine3: string;
    buttonText: string;
    buttonHref: string;
  };
  serviceShortcuts: Array<{
    id: string;
    title: string;
    subtitle: string;
    icon: string;
  }>;
  aboutSneak: {
    overline: string;
    title: string;
    paragraph: string;
    buttonText: string;
    buttonHref: string;
    image: string;
  };
}

export default function HomeTab() {
  const [data, setData] = useState<HomeData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    fetchHomeData();
  }, []);

  const fetchHomeData = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/home");
      const json = await res.json();
      if (json.data) setData(json.data);
    } catch {
      setStatus({ type: "error", text: "Failed to load homepage data" });
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
      const res = await fetch("/api/admin/home", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Failed to save homepage data");
      setStatus({ type: "success", text: "Homepage changes saved and committed to GitHub!" });
    } catch (err) {
      setStatus({ type: "error", text: err instanceof Error ? err.message : "Error saving changes" });
    } finally {
      setSaving(false);
    }
  };

  const handleImageUpload = async (file: File) => {
    setUploadingImage(true);
    setStatus(null);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", "public/images/about");

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      const json = await res.json();
      if (json.url && data) {
        setData({
          ...data,
          aboutSneak: {
            ...data.aboutSneak,
            image: json.url,
          },
        });
        setStatus({ type: "success", text: "Photo uploaded successfully!" });
      } else {
        throw new Error(json.error || "Upload failed");
      }
    } catch (err) {
      setStatus({ type: "error", text: err instanceof Error ? err.message : "Photo upload failed" });
    } finally {
      setUploadingImage(false);
    }
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
      {/* Page Title & Status */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <span className="text-gold text-xs font-semibold tracking-widest uppercase block mb-1">
            Section 01
          </span>
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white">
            Homepage Content &amp; Titles
          </h2>
          <p className="text-xs text-white/60 mt-1">
            Edit the small titles, overlines, headlines, and About Us sneak peek card.
          </p>
        </div>

        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gold text-black font-semibold text-xs sm:text-sm hover:bg-white transition-colors duration-200 disabled:opacity-50 cursor-pointer shadow-lg shadow-gold/20"
        >
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          <span>{saving ? "Committing..." : "Save & Commit to GitHub"}</span>
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

      <form onSubmit={handleSave} className="space-y-8">
        {/* 1. HERO SECTION TITLES */}
        <div className="p-6 sm:p-8 rounded-2xl bg-zinc-950/70 border border-white/10 space-y-6">
          <div className="border-b border-white/10 pb-4">
            <h3 className="font-heading text-lg font-bold text-white">Hero Titles &amp; Action</h3>
            <p className="text-xs text-white/50">Manage the display typography rendered above the fold.</p>
          </div>

          <div>
            <label className="block text-[11px] uppercase tracking-wider text-white/70 mb-2 font-medium">
              Overline Eyebrow Kicker
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
              className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/15 text-white text-sm focus:outline-none focus:border-gold"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-white/70 mb-2 font-medium">
                Headline Line 1
              </label>
              <input
                type="text"
                value={data.hero.titleLine1}
                onChange={(e) =>
                  setData({
                    ...data,
                    hero: { ...data.hero, titleLine1: e.target.value },
                  })
                }
                className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/15 text-white text-sm focus:outline-none focus:border-gold font-bold uppercase"
              />
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-wider text-white/70 mb-2 font-medium">
                Headline Line 2
              </label>
              <input
                type="text"
                value={data.hero.titleLine2}
                onChange={(e) =>
                  setData({
                    ...data,
                    hero: { ...data.hero, titleLine2: e.target.value },
                  })
                }
                className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/15 text-white text-sm focus:outline-none focus:border-gold font-bold uppercase"
              />
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-wider text-white/70 mb-2 font-medium">
                Headline Line 3 (Gold Accent)
              </label>
              <input
                type="text"
                value={data.hero.titleLine3}
                onChange={(e) =>
                  setData({
                    ...data,
                    hero: { ...data.hero, titleLine3: e.target.value },
                  })
                }
                className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/15 text-gold text-sm focus:outline-none focus:border-gold font-bold uppercase"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-white/70 mb-2 font-medium">
                Button Text
              </label>
              <input
                type="text"
                value={data.hero.buttonText}
                onChange={(e) =>
                  setData({
                    ...data,
                    hero: { ...data.hero, buttonText: e.target.value },
                  })
                }
                className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/15 text-white text-sm focus:outline-none focus:border-gold"
              />
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-wider text-white/70 mb-2 font-medium">
                Button Link Href
              </label>
              <input
                type="text"
                value={data.hero.buttonHref}
                onChange={(e) =>
                  setData({
                    ...data,
                    hero: { ...data.hero, buttonHref: e.target.value },
                  })
                }
                className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/15 text-white text-sm focus:outline-none focus:border-gold"
              />
            </div>
          </div>
        </div>

        {/* 2. ABOUT PAGE SNEAK PEEK */}
        <div className="p-6 sm:p-8 rounded-2xl bg-zinc-950/70 border border-white/10 space-y-6">
          <div className="border-b border-white/10 pb-4">
            <h3 className="font-heading text-lg font-bold text-white">About Page Sneak Peek Card</h3>
            <p className="text-xs text-white/50">Edit the split section narrative and coastal diagonal image.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-8 space-y-4">
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-white/70 mb-2 font-medium">
                  Overline Eyebrow
                </label>
                <input
                  type="text"
                  value={data.aboutSneak.overline}
                  onChange={(e) =>
                    setData({
                      ...data,
                      aboutSneak: { ...data.aboutSneak, overline: e.target.value },
                    })
                  }
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/15 text-white text-sm focus:outline-none focus:border-gold"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-white/70 mb-2 font-medium">
                  Section Title
                </label>
                <input
                  type="text"
                  value={data.aboutSneak.title}
                  onChange={(e) =>
                    setData({
                      ...data,
                      aboutSneak: { ...data.aboutSneak, title: e.target.value },
                    })
                  }
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/15 text-white text-sm focus:outline-none focus:border-gold"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-white/70 mb-2 font-medium">
                  Narrative Paragraph
                </label>
                <textarea
                  rows={4}
                  value={data.aboutSneak.paragraph}
                  onChange={(e) =>
                    setData({
                      ...data,
                      aboutSneak: { ...data.aboutSneak, paragraph: e.target.value },
                    })
                  }
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/15 text-white text-sm focus:outline-none focus:border-gold resize-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-white/70 mb-2 font-medium">
                    Button Text
                  </label>
                  <input
                    type="text"
                    value={data.aboutSneak.buttonText}
                    onChange={(e) =>
                      setData({
                        ...data,
                        aboutSneak: { ...data.aboutSneak, buttonText: e.target.value },
                      })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/15 text-white text-sm focus:outline-none focus:border-gold"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-white/70 mb-2 font-medium">
                    Button Destination
                  </label>
                  <input
                    type="text"
                    value={data.aboutSneak.buttonHref}
                    onChange={(e) =>
                      setData({
                        ...data,
                        aboutSneak: { ...data.aboutSneak, buttonHref: e.target.value },
                      })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/15 text-white text-sm focus:outline-none focus:border-gold"
                  />
                </div>
              </div>
            </div>

            {/* Image Preview & Upload */}
            <div className="lg:col-span-4 space-y-3">
              <label className="block text-[11px] uppercase tracking-wider text-white/70 font-medium">
                Sneak Peek Image
              </label>

              <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-white/15 bg-black">
                {data.aboutSneak.image && (
                  <Image
                    src={data.aboutSneak.image}
                    alt="About preview"
                    fill
                    className="object-cover"
                  />
                )}
                {uploadingImage && (
                  <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                    <Loader2 className="w-6 h-6 animate-spin text-gold" />
                  </div>
                )}
              </div>

              <label className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-white/20 text-white text-xs font-semibold hover:border-gold hover:text-gold transition-colors cursor-pointer">
                <Upload className="w-3.5 h-3.5" />
                <span>Upload New Photo</span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleImageUpload(file);
                  }}
                />
              </label>
            </div>
          </div>
        </div>

        {/* 3. SERVICE SHORTCUTS */}
        <div className="p-6 sm:p-8 rounded-2xl bg-zinc-950/70 border border-white/10 space-y-6">
          <div className="border-b border-white/10 pb-4">
            <h3 className="font-heading text-lg font-bold text-white">4 Service Shortcuts</h3>
            <p className="text-xs text-white/50">Edit the 4 quick service labels beneath the hero.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {data.serviceShortcuts.map((svc, idx) => (
              <div key={svc.id} className="p-4 rounded-xl bg-white/[0.02] border border-white/10 space-y-3">
                <span className="text-[10px] uppercase tracking-wider text-gold font-semibold block">
                  Shortcut 0{idx + 1}
                </span>

                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-white/60 mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    value={svc.title}
                    onChange={(e) => {
                      const updated = [...data.serviceShortcuts];
                      updated[idx].title = e.target.value;
                      setData({ ...data, serviceShortcuts: updated });
                    }}
                    className="w-full px-3 py-2 rounded-lg bg-white/[0.04] border border-white/15 text-white text-xs focus:outline-none focus:border-gold"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-white/60 mb-1">
                    Subtitle
                  </label>
                  <input
                    type="text"
                    value={svc.subtitle}
                    onChange={(e) => {
                      const updated = [...data.serviceShortcuts];
                      updated[idx].subtitle = e.target.value;
                      setData({ ...data, serviceShortcuts: updated });
                    }}
                    className="w-full px-3 py-2 rounded-lg bg-white/[0.04] border border-white/15 text-white/70 text-xs focus:outline-none focus:border-gold"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </form>
    </div>
  );
}

