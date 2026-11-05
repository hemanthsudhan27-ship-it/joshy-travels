'use client'

import React, { Suspense, useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import AdminHeader, { AdminTab } from '@/components/admin/AdminHeader'
import HomeTab from '@/components/admin/HomeTab'
import PackagesTab from '@/components/admin/PackagesTab'
import ReviewsTab from '@/components/admin/ReviewsTab'
import ServicesTab from '@/components/admin/ServicesTab'
import GalleryTab from '@/components/admin/GalleryTab'
import AboutTab from '@/components/admin/AboutTab'
import EnquiriesTab from '@/components/admin/EnquiriesTab'

function AdminDashboardContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const tabParam = searchParams.get('tab') as AdminTab | null

  const validTabs: AdminTab[] = ['enquiries', 'home', 'packages', 'reviews', 'services', 'gallery', 'about']
  const initialTab: AdminTab = tabParam && validTabs.includes(tabParam) ? tabParam : 'enquiries'

  const [activeTab, setActiveTab] = useState<AdminTab>(initialTab)

  useEffect(() => {
    if (tabParam && validTabs.includes(tabParam) && tabParam !== activeTab) {
      setActiveTab(tabParam)
    }
  }, [tabParam])

  const handleTabChange = (tab: AdminTab) => {
    setActiveTab(tab)
    router.replace(`/admin?tab=${tab}`, { scroll: false })
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col font-sans">
      <AdminHeader activeTab={activeTab} onTabChange={handleTabChange} />

      <main className="flex-1 max-w-[1500px] w-full mx-auto px-4 sm:px-8 py-8 lg:py-10">
        {activeTab === 'enquiries' && <EnquiriesTab />}
        {activeTab === 'home' && <HomeTab />}
        {activeTab === 'packages' && <PackagesTab />}
        {activeTab === 'reviews' && <ReviewsTab />}
        {activeTab === 'services' && <ServicesTab />}
        {activeTab === 'gallery' && <GalleryTab />}
        {activeTab === 'about' && <AboutTab />}
      </main>

      {/* Footer Status Bar */}
      <footer className="border-t border-white/5 py-4 px-6 text-center text-[11px] text-[#737373] uppercase tracking-widest bg-zinc-950">
        Joshy Travels Console • Serverless Git-Backed CMS • Connected via GitHub REST API
      </footer>
    </div>
  )
}

export default function AdminPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-black flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-[#FFD700] border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <AdminDashboardContent />
    </Suspense>
  )
}

