"use client";

import Image from "next/image";
import Link from "next/link";
import { LogOut, ExternalLink, Home, Package, Star, Briefcase, Image as ImageIcon, Info } from "lucide-react";
import { logout } from "@/app/admin/login/actions";

export type AdminTab = "home" | "packages" | "reviews" | "services" | "gallery" | "about";

interface AdminHeaderProps {
  activeTab: AdminTab;
  onTabChange: (tab: AdminTab) => void;
}

const TABS: Array<{ id: AdminTab; label: string; icon: React.ElementType }> = [
  { id: "home", label: "Home Page", icon: Home },
  { id: "packages", label: "Tour Packages", icon: Package },
  { id: "reviews", label: "Client Reviews", icon: Star },
  { id: "services", label: "Services", icon: Briefcase },
  { id: "gallery", label: "Visual Gallery", icon: ImageIcon },
  { id: "about", label: "About Page", icon: Info },
];

export default function AdminHeader({ activeTab, onTabChange }: AdminHeaderProps) {
  return (
    <header className="bg-zinc-950 border-b border-white/10 sticky top-0 z-40">
      <div className="max-w-[1500px] mx-auto px-4 sm:px-8 py-4">
        {/* Top Bar: Brand, Preview & Signout */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/5">
          <div className="flex items-center gap-4">
            <Link href="/" className="relative w-11 h-11 rounded-full overflow-hidden shrink-0 border border-gold/50">
              <Image
                src="/images/logo.png"
                alt="JJ Travels"
                width={44}
                height={44}
                priority
                className="object-contain"
              />
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-heading font-bold text-lg text-white">JJ Travels</h1>
                <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-gold/15 text-gold font-semibold border border-gold/30">
                  CMS Console
                </span>
              </div>
              <p className="text-[11px] text-white/50">Serverless Git-Backed Content Management</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/[0.04] border border-white/15 text-white/80 hover:text-gold hover:border-gold/40 text-xs font-medium transition-colors"
            >
              <span>Live Website</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>

            <form action={logout}>
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-red-950/30 border border-red-500/30 text-red-200 hover:bg-red-900/40 hover:text-white text-xs font-medium transition-colors cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            </form>
          </div>
        </div>

        {/* Tab Navigation Navigation Strip */}
        <div className="flex items-center gap-2 overflow-x-auto pt-3 scrollbar-none">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => onTabChange(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-gold text-black shadow-lg shadow-gold/20"
                    : "text-white/70 hover:text-white hover:bg-white/5"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-black" : "text-gold"}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
}

