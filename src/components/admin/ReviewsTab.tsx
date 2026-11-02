"use client";

import { useState, useEffect } from "react";
import {
  Star,
  Plus,
  Pencil,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Save,
  X,
  MessageSquare,
} from "lucide-react";
import type { ReviewItem } from "@/app/api/admin/reviews/route";

export default function ReviewsTab() {
  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [status, setStatus] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Form State
  const [editingId, setEditingId] = useState<string | null>(null);
  const [author, setAuthor] = useState("");
  const [journey, setJourney] = useState("");
  const [rating, setRating] = useState(5);
  const [quote, setQuote] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [verified, setVerified] = useState(true);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/reviews");
      const json = await res.json();
      if (json.items) setReviews(json.items);
    } catch {
      setStatus({ type: "error", text: "Failed to load reviews" });
    } finally {
      setLoading(false);
    }
  };

  const startEdit = (review: ReviewItem) => {
    setEditingId(review.id);
    setAuthor(review.author);
    setJourney(review.journey || "");
    setRating(review.rating || 5);
    setQuote(review.quote);
    setLocation(review.location || "");
    setDate(review.date || "");
    setVerified(review.verified !== false);
    setStatus(null);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setAuthor("");
    setJourney("");
    setRating(5);
    setQuote("");
    setLocation("");
    setDate("");
    setVerified(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim() || !quote.trim()) {
      setStatus({ type: "error", text: "Author and Review quote are required." });
      return;
    }

    setSaving(true);
    setStatus(null);

    const payload: ReviewItem = {
      id: editingId || `review-${Date.now()}`,
      author: author.trim(),
      journey: journey.trim() || "Curated Journey",
      rating,
      quote: quote.trim(),
      location: location.trim() || "Verified Client",
      date: date.trim() || new Date().toLocaleString("en-US", { month: "long", year: "numeric" }),
      verified,
    };

    try {
      const method = editingId ? "PUT" : "POST";
      const res = await fetch("/api/admin/reviews", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed to save review");

      if (editingId) {
        setReviews(reviews.map((r) => (r.id === editingId ? payload : r)));
        setStatus({ type: "success", text: `Review by "${author}" updated and committed to GitHub!` });
      } else {
        setReviews([payload, ...reviews]);
        setStatus({ type: "success", text: `New review by "${author}" added and committed to GitHub!` });
      }

      cancelEdit();
    } catch (err) {
      setStatus({ type: "error", text: err instanceof Error ? err.message : "Error saving review" });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string, authorName: string) => {
    if (!window.confirm(`Delete review from "${authorName}"? This will commit the removal to GitHub.`)) {
      return;
    }

    setDeletingId(id);
    setStatus(null);

    try {
      const res = await fetch(`/api/admin/reviews?id=${encodeURIComponent(id)}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete review");
      setReviews((prev) => prev.filter((r) => r.id !== id));
      setStatus({ type: "success", text: `Review by "${authorName}" removed and committed to GitHub!` });
      if (editingId === id) cancelEdit();
    } catch (err) {
      setStatus({ type: "error", text: err instanceof Error ? err.message : "Error deleting review" });
    } finally {
      setDeletingId(null);
    }
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
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <span className="text-gold text-xs font-semibold tracking-widest uppercase block mb-1">
            Section 03
          </span>
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white">
            Client Reviews &amp; Testimonials
          </h2>
          <p className="text-xs text-white/60 mt-1">
            Add, edit, or delete genuine traveler reviews and verified badges.
          </p>
        </div>
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

      {/* 2-Column: Form (left) + Existing Reviews List (right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* REVIEW FORM (5 cols) */}
        <div className="lg:col-span-5 p-6 sm:p-8 rounded-2xl bg-zinc-950/80 border border-white/15 sticky top-28 space-y-5">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <h3 className="font-heading text-lg font-bold text-white">
              {editingId ? "Edit Review" : "Add New Review"}
            </h3>
            {editingId && (
              <button
                type="button"
                onClick={cancelEdit}
                className="text-xs text-white/50 hover:text-white flex items-center gap-1"
              >
                <X className="w-3.5 h-3.5" />
                <span>Cancel</span>
              </button>
            )}
          </div>

          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-white/70 mb-1.5 font-medium">
                Author Name *
              </label>
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="e.g. Ashwin Babu"
                required
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/15 text-white text-sm focus:outline-none focus:border-gold"
              />
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-wider text-white/70 mb-1.5 font-medium">
                Journey / Destination Kicker
              </label>
              <input
                type="text"
                value={journey}
                onChange={(e) => setJourney(e.target.value)}
                placeholder="e.g. Hyderabad Heritage Tour"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/15 text-white text-sm focus:outline-none focus:border-gold"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-white/70 mb-1.5 font-medium">
                  Star Rating
                </label>
                <div className="flex items-center gap-1 p-2 rounded-xl bg-white/[0.04] border border-white/15">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="p-1 text-gold cursor-pointer"
                    >
                      <Star
                        className={`w-4 h-4 ${
                          star <= rating ? "fill-gold text-gold" : "text-white/20"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-white/70 mb-1.5 font-medium">
                  Travel Date
                </label>
                <input
                  type="text"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  placeholder="e.g. October 2026"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/15 text-white text-sm focus:outline-none focus:border-gold"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-wider text-white/70 mb-1.5 font-medium">
                Client Location
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Kerala, India"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/15 text-white text-sm focus:outline-none focus:border-gold"
              />
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-wider text-white/70 mb-1.5 font-medium">
                Testimonial Quote *
              </label>
              <textarea
                rows={5}
                value={quote}
                onChange={(e) => setQuote(e.target.value)}
                placeholder="Paste verbatim client review here..."
                required
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/15 text-white text-sm focus:outline-none focus:border-gold resize-none"
              />
            </div>

            <div className="flex items-center gap-2 pt-1">
              <input
                type="checkbox"
                id="verifiedCheck"
                checked={verified}
                onChange={(e) => setVerified(e.target.checked)}
                className="w-4 h-4 accent-gold rounded cursor-pointer"
              />
              <label htmlFor="verifiedCheck" className="text-xs text-white/80 cursor-pointer">
                Display Verified Client Badge
              </label>
            </div>

            <button
              type="submit"
              disabled={saving}
              className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gold text-black font-semibold text-xs sm:text-sm hover:bg-white transition-colors duration-200 disabled:opacity-50 shadow-lg shadow-gold/20 cursor-pointer"
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              <span>{saving ? "Committing..." : editingId ? "Update & Commit" : "Add Review & Commit"}</span>
            </button>
          </form>
        </div>

        {/* EXISTING REVIEWS (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-white/10">
            <h3 className="font-heading text-lg font-bold text-white">
              Current Reviews ({reviews.length})
            </h3>
            <span className="text-xs text-white/50">Sorted by newest</span>
          </div>

          {reviews.length === 0 ? (
            <div className="p-12 text-center text-white/40 border border-white/10 rounded-2xl">
              <MessageSquare className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <span>No reviews found. Add one above!</span>
            </div>
          ) : (
            reviews.map((rev) => (
              <div
                key={rev.id}
                className="p-6 rounded-2xl bg-zinc-950/70 border border-white/10 hover:border-gold/40 transition-colors space-y-3"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-1 text-gold mb-1">
                      {[...Array(rev.rating || 5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-gold text-gold" />
                      ))}
                    </div>
                    <h4 className="font-heading font-bold text-base text-white">{rev.author}</h4>
                    <span className="text-[11px] text-gold font-semibold uppercase tracking-wider block">
                      {rev.journey}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => startEdit(rev)}
                      className="p-2 rounded-lg border border-white/15 text-white/70 hover:text-gold hover:border-gold transition-colors"
                      aria-label="Edit review"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(rev.id, rev.author)}
                      disabled={deletingId === rev.id}
                      className="p-2 rounded-lg border border-red-500/30 text-red-400 hover:bg-red-950/40 transition-colors"
                      aria-label="Delete review"
                    >
                      {deletingId === rev.id ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      ) : (
                        <Trash2 className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-light">
                  &ldquo;{rev.quote}&rdquo;
                </p>

                <div className="pt-2 flex items-center justify-between text-[11px] text-white/50 border-t border-white/5">
                  <span>{rev.location} · {rev.date}</span>
                  {rev.verified && <span className="text-gold font-medium">✓ Verified</span>}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

