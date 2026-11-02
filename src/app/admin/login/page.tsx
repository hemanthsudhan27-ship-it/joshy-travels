"use client";

import { Suspense, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Lock, ArrowLeft, AlertCircle, Loader2 } from "lucide-react";
import { createClient } from "@/utils/supabase/client";

function LoginForm() {
  const searchParams = useSearchParams();
  const urlError = searchParams.get("error");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(
    urlError ? decodeURIComponent(urlError) : null
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMsg("Please provide both your email address and password.");
      return;
    }

    setLoading(true);
    setErrorMsg(null);

    try {
      const supabase = createClient();
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password.trim(),
      });

      if (error) {
        setErrorMsg(error.message || "Invalid email or password.");
        setLoading(false);
        return;
      }

      if (data?.user) {
        // Authenticated successfully! Redirect to admin dashboard
        window.location.href = "/admin";
      } else {
        setErrorMsg("Unable to start session. Please try again.");
        setLoading(false);
      }
    } catch (err) {
      console.error("Login client error:", err);
      setErrorMsg(
        err instanceof Error ? err.message : "Authentication service unavailable."
      );
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-zinc-950 border border-gold/40 rounded-3xl p-8 sm:p-10 shadow-2xl relative z-10 backdrop-blur-md">
      {/* Brand Header */}
      <div className="flex items-center gap-4 mb-8 pb-6 border-b border-white/10">
        <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0 border border-gold/50">
          <Image
            src="/images/logo.png"
            alt="JJ Travels"
            width={48}
            height={48}
            priority
            className="object-contain"
          />
        </div>
        <div>
          <h1 className="font-heading text-xl font-bold text-white tracking-tight">
            JJ Travels Admin
          </h1>
          <span className="text-[11px] uppercase tracking-wider text-gold font-semibold block">
            Content Management Console
          </span>
        </div>
      </div>

      {/* Lock Kicker */}
      <div className="flex items-center gap-2 mb-2 text-xs uppercase tracking-wider text-white/50 font-medium">
        <Lock className="w-3.5 h-3.5 text-gold" />
        <span>Secure Sign In</span>
      </div>
      <p className="text-xs text-white/60 mb-6 font-light leading-relaxed">
        Authenticate to manage packages, client enquiries, reviews, services, gallery photographs, and live page narratives.
      </p>

      {/* Error Notification */}
      {errorMsg && (
        <div className="mb-6 p-4 rounded-xl bg-red-950/40 border border-red-500/30 flex items-start gap-3 text-red-200 text-xs">
          <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
          <span className="leading-relaxed">{errorMsg}</span>
        </div>
      )}

      {/* Login Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Email */}
        <div>
          <label className="block text-[11px] uppercase tracking-wider text-white/70 mb-2 font-medium">
            Administrator Email
          </label>
          <input
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@oneworldtravels.com"
            className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/15 text-white placeholder-white/30 text-sm focus:outline-none focus:border-gold transition-colors"
            autoFocus
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-[11px] uppercase tracking-wider text-white/70 mb-2 font-medium">
            Password
          </label>
          <input
            type="password"
            required
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••••••"
            className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/15 text-white placeholder-white/30 text-sm focus:outline-none focus:border-gold transition-colors"
          />
        </div>

        {/* Submit CTA */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3.5 px-4 rounded-xl font-semibold text-sm text-black bg-gold hover:bg-white transition-colors duration-200 shadow-lg shadow-gold/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-black" />
              <span>Verifying Credentials...</span>
            </>
          ) : (
            <span>Sign In to Admin Console</span>
          )}
        </button>
      </form>

      {/* Footer info */}
      <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
        <Link
          href="/"
          className="text-xs font-medium text-white/50 hover:text-gold transition-colors flex items-center gap-1.5"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to Website</span>
        </Link>
        <span className="text-[11px] text-white/40 font-mono">JJ Travels</span>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-black flex flex-col justify-center items-center p-6 text-white selection:bg-gold selection:text-black relative overflow-hidden">
      {/* Background ambient gold aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[350px] bg-gold/5 blur-[160px] pointer-events-none rounded-full" />

      <Suspense fallback={<div className="w-full max-w-md h-96 bg-zinc-950/50 rounded-3xl animate-pulse" />}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
