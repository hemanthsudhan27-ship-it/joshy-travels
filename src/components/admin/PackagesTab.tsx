"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  Plus,
  Pencil,
  Trash2,
  X,
  Save,
  Loader2,
  Upload,
  CheckCircle2,
  AlertCircle,
  Clock,
  MapPin,
  Calendar,
} from "lucide-react";
import type { PackageDetail, ItineraryDay } from "@/data/packagesData";

export default function PackagesTab() {
  const [packages, setPackages] = useState<PackageDetail[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingPkg, setEditingPkg] = useState<PackageDetail | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Temporary inputs for dynamic arrays
  const [newHighlight, setNewHighlight] = useState("");
  const [newInclusion, setNewInclusion] = useState("");
  const [newExclusion, setNewExclusion] = useState("");

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/packages");
      const json = await res.json();
      if (json.items) setPackages(json.items);
    } catch {
      setStatus({ type: "error", text: "Failed to load packages" });
    } finally {
      setLoading(false);
    }
  };

  const handleStartCreate = () => {
    setIsNew(true);
    setEditingPkg({
      id: `pkg-${Date.now()}`,
      slug: "",
      title: "",
      destination: "",
      duration: "5 Days / 4 Nights",
      category: "europe",
      categoryLabel: "Europe & Alps",
      price: "$2,500",
      priceDetail: "Starting per person based on twin sharing",
      heroImage: "/images/packages/switzerland-hd.jpg",
      galleryImages: ["/images/packages/switzerland-hd.jpg"],
      overview: "",
      atmosphereQuote: "",
      bestTimeToVisit: "Year-Round",
      groupStyle: "Private & Tailored",
      accommodationType: "5-Star Luxury Resorts",
      transferType: "Private Chauffeur",
      highlights: ["Luxury Private Transfers", "5★ Accommodations"],
      itinerary: [
        {
          day: 1,
          title: "Arrival & VIP Reception",
          location: "Airport to Hotel",
          description: "VIP reception upon arrival and private chauffeur transfer to your luxury accommodation.",
          morning: "Airport reception",
          afternoon: "Check in and relax",
          evening: "Welcome dinner",
          stay: "5-Star Partner Hotel",
          meals: "Welcome Dinner",
        },
      ],
      inclusions: [
        "Luxury 5★ accommodation",
        "Daily gourmet breakfasts",
        "Private chauffeur transfers",
        "24/7 dedicated JJ Travels concierge",
      ],
      exclusions: [
        "International airfare",
        "Discretionary personal expenses",
      ],
      accommodations: [
        {
          name: "Grand Luxury Hotel",
          type: "5-Star Luxury Resort",
          rating: "5.0 ★ Leading Hotels",
          location: "City Center",
          image: "/images/about/villa-hd.jpg",
          description: "Exceptional luxury accommodations with fine dining and personalized concierge care.",
          amenities: ["Spa & Wellness", "Heated Pool", "Fine Dining", "Balcony Views"],
        },
      ],
    });
    setStatus(null);
  };

  const handleStartEdit = (pkg: PackageDetail) => {
    setIsNew(false);
    // Deep clone to prevent direct state mutations before save
    setEditingPkg(JSON.parse(JSON.stringify(pkg)));
    setStatus(null);
  };

  const handleDelete = async (id: string, title: string) => {
    if (!window.confirm(`Are you sure you want to delete "${title}"? This will commit the removal to GitHub.`)) {
      return;
    }

    setDeletingId(id);
    setStatus(null);

    try {
      const res = await fetch(`/api/admin/packages?id=${encodeURIComponent(id)}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete package");
      setPackages((prev) => prev.filter((p) => p.id !== id));
      setStatus({ type: "success", text: `Package "${title}" deleted and committed to GitHub!` });
    } catch (err) {
      setStatus({ type: "error", text: err instanceof Error ? err.message : "Error deleting package" });
    } finally {
      setDeletingId(null);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPkg) return;

    if (!editingPkg.title.trim() || !editingPkg.slug.trim()) {
      setStatus({ type: "error", text: "Please provide a Title and Slug for the package." });
      return;
    }

    setSaving(true);
    setStatus(null);

    try {
      const method = isNew ? "POST" : "PUT";
      const res = await fetch("/api/admin/packages", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingPkg),
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed to save package");

      if (isNew) {
        setPackages([editingPkg, ...packages]);
      } else {
        setPackages(packages.map((p) => (p.id === editingPkg.id ? editingPkg : p)));
      }

      setStatus({
        type: "success",
        text: `Package "${editingPkg.title}" saved and committed to GitHub main branch!`,
      });
      setEditingPkg(null);
    } catch (err) {
      setStatus({ type: "error", text: err instanceof Error ? err.message : "Error saving package" });
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
      formData.append("folder", "public/images/packages");

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      const json = await res.json();
      if (json.url && editingPkg) {
        setEditingPkg({
          ...editingPkg,
          heroImage: json.url,
        });
        setStatus({ type: "success", text: "Photo uploaded & committed to repository!" });
      } else {
        throw new Error(json.error || "Upload failed");
      }
    } catch (err) {
      setStatus({ type: "error", text: err instanceof Error ? err.message : "Upload error" });
    } finally {
      setUploadingImage(false);
    }
  };

  // Itinerary Day Helpers
  const addItineraryDay = () => {
    if (!editingPkg) return;
    const nextDayNum = editingPkg.itinerary.length + 1;
    const newDay: ItineraryDay = {
      day: nextDayNum,
      title: `Day ${nextDayNum} Excursion`,
      location: editingPkg.destination,
      description: "Day activities and scenic excursions tailored for your journey.",
      morning: "Breakfast and morning departure",
      afternoon: "Guided tour and excursions",
      evening: "Dinner and relaxation",
      stay: "5-Star Partner Stay",
      meals: "Breakfast Included",
    };
    setEditingPkg({
      ...editingPkg,
      itinerary: [...editingPkg.itinerary, newDay],
    });
  };

  const removeItineraryDay = (dayIndex: number) => {
    if (!editingPkg) return;
    const updated = editingPkg.itinerary
      .filter((_, idx) => idx !== dayIndex)
      .map((item, idx) => ({ ...item, day: idx + 1 }));
    setEditingPkg({ ...editingPkg, itinerary: updated });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-20">
        <Loader2 className="w-8 h-8 animate-spin text-gold" />
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Page Title & Add Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <span className="text-gold text-xs font-semibold tracking-widest uppercase block mb-1">
            Section 02
          </span>
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white">
            Tour Packages Catalog &amp; Itineraries
          </h2>
          <p className="text-xs text-white/60 mt-1">
            Add, edit, or delete packages, day &amp; night counts, detailed itineraries, highlights, and inclusions.
          </p>
        </div>

        {!editingPkg && (
          <button
            type="button"
            onClick={handleStartCreate}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gold text-black font-semibold text-xs sm:text-sm hover:bg-white transition-colors duration-200 cursor-pointer shadow-lg shadow-gold/20"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Package</span>
          </button>
        )}
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

      {/* PACKAGES LIST / CARDS */}
      {!editingPkg ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className="p-5 rounded-2xl bg-zinc-950/80 border border-white/10 hover:border-gold/50 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-[16/10] rounded-xl overflow-hidden mb-4 border border-white/10 bg-black">
                  <Image
                    src={pkg.heroImage}
                    alt={pkg.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-2 left-2 px-2.5 py-1 rounded-md bg-black/70 backdrop-blur-md text-[10px] font-semibold text-gold border border-white/10">
                    {pkg.categoryLabel}
                  </div>
                  <div className="absolute bottom-2 left-2 px-2.5 py-1 rounded-md bg-black/70 backdrop-blur-md text-[10px] text-white/90 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-gold" />
                    <span>{pkg.duration}</span>
                  </div>
                </div>

                <h3 className="font-heading text-lg font-bold text-white mb-1">
                  {pkg.title}
                </h3>
                <div className="flex items-center gap-1 text-xs text-white/50 mb-3">
                  <MapPin className="w-3 h-3 text-gold shrink-0" />
                  <span className="truncate">{pkg.destination}</span>
                </div>
                <p className="text-xs text-white/60 line-clamp-2 font-light mb-4">
                  {pkg.overview}
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase text-white/40 block">From</span>
                  <span className="font-heading font-bold text-base text-gold">{pkg.price}</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleStartEdit(pkg)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-white/20 text-white text-xs hover:border-gold hover:text-gold transition-colors"
                  >
                    <Pencil className="w-3 h-3" />
                    <span>Edit</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(pkg.id, pkg.title)}
                    disabled={deletingId === pkg.id}
                    className="p-1.5 rounded-lg border border-red-500/30 text-red-400 hover:bg-red-950/40 transition-colors"
                    aria-label="Delete package"
                  >
                    {deletingId === pkg.id ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Trash2 className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* PACKAGE EDITOR MODAL / FORM */
        <div className="p-6 sm:p-10 rounded-3xl bg-zinc-950 border border-gold/40 shadow-2xl space-y-8 animate-fadeIn">
          <div className="flex items-center justify-between pb-6 border-b border-white/10">
            <div>
              <span className="text-gold text-xs font-semibold tracking-widest uppercase block mb-1">
                {isNew ? "Create Package" : "Edit Package"}
              </span>
              <h3 className="font-heading text-2xl sm:text-3xl font-bold text-white">
                {editingPkg.title || "Untitled Luxury Package"}
              </h3>
            </div>

            <button
              type="button"
              onClick={() => setEditingPkg(null)}
              className="w-10 h-10 rounded-full bg-white/5 border border-white/15 flex items-center justify-center text-white/70 hover:text-white hover:border-gold transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSave} className="space-y-8">
            {/* 1. BASIC DETAILS */}
            <div className="space-y-4">
              <h4 className="text-sm uppercase tracking-wider text-gold font-semibold">
                1. Core Specifications &amp; Day/Night Count
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-white/70 mb-1.5 font-medium">
                    Package Title *
                  </label>
                  <input
                    type="text"
                    value={editingPkg.title}
                    onChange={(e) => {
                      const title = e.target.value;
                      const slug = isNew
                        ? title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")
                        : editingPkg.slug;
                      setEditingPkg({ ...editingPkg, title, slug });
                    }}
                    required
                    className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/15 text-white text-sm focus:outline-none focus:border-gold"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-white/70 mb-1.5 font-medium">
                    URL Slug *
                  </label>
                  <input
                    type="text"
                    value={editingPkg.slug}
                    onChange={(e) => setEditingPkg({ ...editingPkg, slug: e.target.value })}
                    required
                    className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/15 text-white text-sm focus:outline-none focus:border-gold font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-white/70 mb-1.5 font-medium">
                    Destination *
                  </label>
                  <input
                    type="text"
                    value={editingPkg.destination}
                    onChange={(e) => setEditingPkg({ ...editingPkg, destination: e.target.value })}
                    placeholder="e.g. Zermatt & Swiss Alps"
                    required
                    className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/15 text-white text-sm focus:outline-none focus:border-gold"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-white/70 mb-1.5 font-medium">
                    Day &amp; Night Count *
                  </label>
                  <input
                    type="text"
                    value={editingPkg.duration}
                    onChange={(e) => setEditingPkg({ ...editingPkg, duration: e.target.value })}
                    placeholder="e.g. 7 Days / 6 Nights"
                    required
                    className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/15 text-white text-sm focus:outline-none focus:border-gold"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-white/70 mb-1.5 font-medium">
                    Starting Price *
                  </label>
                  <input
                    type="text"
                    value={editingPkg.price}
                    onChange={(e) => setEditingPkg({ ...editingPkg, price: e.target.value })}
                    placeholder="e.g. $3,450"
                    required
                    className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/15 text-white text-sm focus:outline-none focus:border-gold text-gold font-bold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-white/70 mb-1.5 font-medium">
                    Category Filter
                  </label>
                  <select
                    value={editingPkg.category}
                    onChange={(e) => {
                      const cat = e.target.value as any;
                      const labels: Record<string, string> = {
                        europe: "Europe & Alps",
                        tropical: "Tropical & Islands",
                        "middle-east": "Middle East & Wonders",
                        honeymoon: "Romantic & Honeymoon",
                      };
                      setEditingPkg({
                        ...editingPkg,
                        category: cat,
                        categoryLabel: labels[cat] || "Curated Escapes",
                      });
                    }}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#0c0c0c] border border-white/15 text-white text-sm focus:outline-none focus:border-gold"
                  >
                    <option value="europe">Europe &amp; Alps</option>
                    <option value="tropical">Tropical &amp; Islands</option>
                    <option value="middle-east">Middle East &amp; Wonders</option>
                    <option value="honeymoon">Romantic &amp; Honeymoon</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-white/70 mb-1.5 font-medium">
                    Price Terms / Subtitle
                  </label>
                  <input
                    type="text"
                    value={editingPkg.priceDetail}
                    onChange={(e) => setEditingPkg({ ...editingPkg, priceDetail: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/15 text-white text-sm focus:outline-none focus:border-gold"
                  />
                </div>
              </div>
            </div>

            {/* 2. PHOTO & EDITORIAL NARRATIVE */}
            <div className="space-y-4 pt-6 border-t border-white/10">
              <h4 className="text-sm uppercase tracking-wider text-gold font-semibold">
                2. Photography &amp; Editorial Narrative
              </h4>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                <div className="lg:col-span-8 space-y-4">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-white/70 mb-1.5 font-medium">
                      Atmosphere Quote (Italic Callout)
                    </label>
                    <input
                      type="text"
                      value={editingPkg.atmosphereQuote}
                      onChange={(e) => setEditingPkg({ ...editingPkg, atmosphereQuote: e.target.value })}
                      placeholder="e.g. Where glacier breezes meet five-star alpine hospitality..."
                      className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/15 text-white text-sm focus:outline-none focus:border-gold italic"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-white/70 mb-1.5 font-medium">
                      Journey Overview / Story
                    </label>
                    <textarea
                      rows={4}
                      value={editingPkg.overview}
                      onChange={(e) => setEditingPkg({ ...editingPkg, overview: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/15 text-white text-sm focus:outline-none focus:border-gold resize-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-white/70 mb-1.5 font-medium">
                        Best Time To Visit
                      </label>
                      <input
                        type="text"
                        value={editingPkg.bestTimeToVisit}
                        onChange={(e) => setEditingPkg({ ...editingPkg, bestTimeToVisit: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/15 text-white text-sm focus:outline-none focus:border-gold"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-white/70 mb-1.5 font-medium">
                        Private Transfer Type
                      </label>
                      <input
                        type="text"
                        value={editingPkg.transferType}
                        onChange={(e) => setEditingPkg({ ...editingPkg, transferType: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/15 text-white text-sm focus:outline-none focus:border-gold"
                      />
                    </div>
                  </div>
                </div>

                {/* Photo Upload Box */}
                <div className="lg:col-span-4 space-y-3">
                  <label className="block text-[11px] uppercase tracking-wider text-white/70 font-medium">
                    Package Photo
                  </label>

                  <div className="relative aspect-[16/10] rounded-xl overflow-hidden border border-white/15 bg-black">
                    <Image
                      src={editingPkg.heroImage}
                      alt={editingPkg.title}
                      fill
                      className="object-cover"
                    />
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

            {/* 3. SIGNATURE HIGHLIGHTS */}
            <div className="space-y-4 pt-6 border-t border-white/10">
              <h4 className="text-sm uppercase tracking-wider text-gold font-semibold">
                3. Signature Highlights
              </h4>

              <div className="space-y-2">
                {editingPkg.highlights.map((h, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={h}
                      onChange={(e) => {
                        const updated = [...editingPkg.highlights];
                        updated[idx] = e.target.value;
                        setEditingPkg({ ...editingPkg, highlights: updated });
                      }}
                      className="flex-1 px-3 py-2 rounded-lg bg-white/[0.04] border border-white/15 text-white text-xs focus:outline-none focus:border-gold"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setEditingPkg({
                          ...editingPkg,
                          highlights: editingPkg.highlights.filter((_, i) => i !== idx),
                        })
                      }
                      className="p-2 text-white/40 hover:text-red-400"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}

                <div className="flex items-center gap-2 pt-2">
                  <input
                    type="text"
                    value={newHighlight}
                    onChange={(e) => setNewHighlight(e.target.value)}
                    placeholder="Add a new highlight (e.g. Private Yacht Charter)..."
                    className="flex-1 px-3 py-2 rounded-lg bg-white/[0.02] border border-white/10 text-white text-xs focus:outline-none focus:border-gold placeholder:text-white/30"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (newHighlight.trim()) {
                        setEditingPkg({
                          ...editingPkg,
                          highlights: [...editingPkg.highlights, newHighlight.trim()],
                        });
                        setNewHighlight("");
                      }
                    }}
                    className="px-4 py-2 rounded-lg bg-white/10 text-white text-xs font-semibold hover:bg-gold hover:text-black transition-colors"
                  >
                    + Add
                  </button>
                </div>
              </div>
            </div>

            {/* 4. DAY-BY-DAY ITINERARY BUILDER */}
            <div className="space-y-4 pt-6 border-t border-white/10">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm uppercase tracking-wider text-gold font-semibold">
                    4. Day-by-Day Itinerary ({editingPkg.itinerary.length} Days)
                  </h4>
                  <p className="text-xs text-white/50">Edit detailed daily events, morning/afternoon/evening, stay and meals.</p>
                </div>

                <button
                  type="button"
                  onClick={addItineraryDay}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gold/15 text-gold border border-gold/40 text-xs font-semibold hover:bg-gold hover:text-black transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Next Day</span>
                </button>
              </div>

              <div className="space-y-4">
                {editingPkg.itinerary.map((dayItem, dIdx) => (
                  <div
                    key={dIdx}
                    className="p-5 rounded-xl bg-white/[0.02] border border-white/10 space-y-3"
                  >
                    <div className="flex items-center justify-between pb-2 border-b border-white/5">
                      <span className="font-heading font-bold text-gold text-sm">
                        Day {dayItem.day}
                      </span>
                      {editingPkg.itinerary.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeItineraryDay(dIdx)}
                          className="text-white/40 hover:text-red-400 text-xs"
                        >
                          Remove Day
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] uppercase text-white/60 mb-1">
                          Day Title
                        </label>
                        <input
                          type="text"
                          value={dayItem.title}
                          onChange={(e) => {
                            const updated = [...editingPkg.itinerary];
                            updated[dIdx].title = e.target.value;
                            setEditingPkg({ ...editingPkg, itinerary: updated });
                          }}
                          className="w-full px-3 py-2 rounded-lg bg-white/[0.04] border border-white/15 text-white text-xs focus:outline-none focus:border-gold"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] uppercase text-white/60 mb-1">
                          Location
                        </label>
                        <input
                          type="text"
                          value={dayItem.location}
                          onChange={(e) => {
                            const updated = [...editingPkg.itinerary];
                            updated[dIdx].location = e.target.value;
                            setEditingPkg({ ...editingPkg, itinerary: updated });
                          }}
                          className="w-full px-3 py-2 rounded-lg bg-white/[0.04] border border-white/15 text-white text-xs focus:outline-none focus:border-gold"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase text-white/60 mb-1">
                        Narrative Description
                      </label>
                      <textarea
                        rows={2}
                        value={dayItem.description}
                        onChange={(e) => {
                          const updated = [...editingPkg.itinerary];
                          updated[dIdx].description = e.target.value;
                          setEditingPkg({ ...editingPkg, itinerary: updated });
                        }}
                        className="w-full px-3 py-2 rounded-lg bg-white/[0.04] border border-white/15 text-white text-xs focus:outline-none focus:border-gold resize-none"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-[10px] uppercase text-white/60 mb-1">Morning</label>
                        <input
                          type="text"
                          value={dayItem.morning || ""}
                          onChange={(e) => {
                            const updated = [...editingPkg.itinerary];
                            updated[dIdx].morning = e.target.value;
                            setEditingPkg({ ...editingPkg, itinerary: updated });
                          }}
                          className="w-full px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/10 text-white text-xs focus:outline-none focus:border-gold"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase text-white/60 mb-1">Afternoon</label>
                        <input
                          type="text"
                          value={dayItem.afternoon || ""}
                          onChange={(e) => {
                            const updated = [...editingPkg.itinerary];
                            updated[dIdx].afternoon = e.target.value;
                            setEditingPkg({ ...editingPkg, itinerary: updated });
                          }}
                          className="w-full px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/10 text-white text-xs focus:outline-none focus:border-gold"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase text-white/60 mb-1">Evening</label>
                        <input
                          type="text"
                          value={dayItem.evening || ""}
                          onChange={(e) => {
                            const updated = [...editingPkg.itinerary];
                            updated[dIdx].evening = e.target.value;
                            setEditingPkg({ ...editingPkg, itinerary: updated });
                          }}
                          className="w-full px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/10 text-white text-xs focus:outline-none focus:border-gold"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                      <div>
                        <label className="block text-[10px] uppercase text-white/60 mb-1">Stay</label>
                        <input
                          type="text"
                          value={dayItem.stay || ""}
                          onChange={(e) => {
                            const updated = [...editingPkg.itinerary];
                            updated[dIdx].stay = e.target.value;
                            setEditingPkg({ ...editingPkg, itinerary: updated });
                          }}
                          className="w-full px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/10 text-white text-xs focus:outline-none focus:border-gold"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase text-white/60 mb-1">Meals</label>
                        <input
                          type="text"
                          value={dayItem.meals || ""}
                          onChange={(e) => {
                            const updated = [...editingPkg.itinerary];
                            updated[dIdx].meals = e.target.value;
                            setEditingPkg({ ...editingPkg, itinerary: updated });
                          }}
                          className="w-full px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/10 text-white text-xs focus:outline-none focus:border-gold"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 5. INCLUSIONS & EXCLUSIONS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-white/10">
              {/* Inclusions */}
              <div className="space-y-3">
                <h4 className="text-sm uppercase tracking-wider text-gold font-semibold">
                  5. Inclusions
                </h4>
                {editingPkg.inclusions.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={item}
                      onChange={(e) => {
                        const updated = [...editingPkg.inclusions];
                        updated[idx] = e.target.value;
                        setEditingPkg({ ...editingPkg, inclusions: updated });
                      }}
                      className="flex-1 px-3 py-2 rounded-lg bg-white/[0.04] border border-white/15 text-white text-xs focus:outline-none focus:border-gold"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setEditingPkg({
                          ...editingPkg,
                          inclusions: editingPkg.inclusions.filter((_, i) => i !== idx),
                        })
                      }
                      className="p-1.5 text-white/40 hover:text-red-400"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}

                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="text"
                    value={newInclusion}
                    onChange={(e) => setNewInclusion(e.target.value)}
                    placeholder="New inclusion..."
                    className="flex-1 px-3 py-2 rounded-lg bg-white/[0.02] border border-white/10 text-white text-xs focus:outline-none focus:border-gold placeholder:text-white/30"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (newInclusion.trim()) {
                        setEditingPkg({
                          ...editingPkg,
                          inclusions: [...editingPkg.inclusions, newInclusion.trim()],
                        });
                        setNewInclusion("");
                      }
                    }}
                    className="px-3.5 py-2 rounded-lg bg-white/10 text-white text-xs font-semibold hover:bg-gold hover:text-black"
                  >
                    + Add
                  </button>
                </div>
              </div>

              {/* Exclusions */}
              <div className="space-y-3">
                <h4 className="text-sm uppercase tracking-wider text-white/70 font-semibold">
                  6. Exclusions
                </h4>
                {editingPkg.exclusions.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={item}
                      onChange={(e) => {
                        const updated = [...editingPkg.exclusions];
                        updated[idx] = e.target.value;
                        setEditingPkg({ ...editingPkg, exclusions: updated });
                      }}
                      className="flex-1 px-3 py-2 rounded-lg bg-white/[0.04] border border-white/15 text-white text-xs focus:outline-none focus:border-gold"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setEditingPkg({
                          ...editingPkg,
                          exclusions: editingPkg.exclusions.filter((_, i) => i !== idx),
                        })
                      }
                      className="p-1.5 text-white/40 hover:text-red-400"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}

                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="text"
                    value={newExclusion}
                    onChange={(e) => setNewExclusion(e.target.value)}
                    placeholder="New exclusion..."
                    className="flex-1 px-3 py-2 rounded-lg bg-white/[0.02] border border-white/10 text-white text-xs focus:outline-none focus:border-gold placeholder:text-white/30"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (newExclusion.trim()) {
                        setEditingPkg({
                          ...editingPkg,
                          exclusions: [...editingPkg.exclusions, newExclusion.trim()],
                        });
                        setNewExclusion("");
                      }
                    }}
                    className="px-3.5 py-2 rounded-lg bg-white/10 text-white text-xs font-semibold hover:bg-gold hover:text-black"
                  >
                    + Add
                  </button>
                </div>
              </div>
            </div>

            {/* SAVE BUTTONS */}
            <div className="pt-6 border-t border-white/10 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setEditingPkg(null)}
                className="px-6 py-3 rounded-xl border border-white/20 text-white text-xs sm:text-sm hover:border-white transition-colors"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={saving}
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-gold text-black font-semibold text-xs sm:text-sm hover:bg-white transition-colors disabled:opacity-50 shadow-lg shadow-gold/20"
              >
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                <span>{saving ? "Committing to GitHub..." : "Save & Commit Package"}</span>
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
