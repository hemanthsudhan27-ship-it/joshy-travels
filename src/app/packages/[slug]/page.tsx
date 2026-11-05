import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PackageHero from "@/components/package-detail/PackageHero";
import PackageOverview from "@/components/package-detail/PackageOverview";
import PackageItinerary from "@/components/package-detail/PackageItinerary";
import PackageAccommodations from "@/components/package-detail/PackageAccommodations";
import PackageInclusions from "@/components/package-detail/PackageInclusions";
import PackageBookingWidget from "@/components/package-detail/PackageBookingWidget";
import SimilarPackages from "@/components/package-detail/SimilarPackages";
import { getPackageBySlug, getAllPackageSlugs } from "@/data/packagesData";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const slugs = getAllPackageSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const pkg = getPackageBySlug(slug);

  if (!pkg) {
    return {
      title: "Package Not Found | Joshy Travels",
    };
  }

  return {
    title: `${pkg.title} (${pkg.duration}) | Joshy Travels Luxury Packages`,
    description: pkg.overview,
    openGraph: {
      title: `${pkg.title} | Joshy Travels`,
      description: pkg.overview,
      images: [{ url: pkg.heroImage }],
    },
  };
}

export default async function PackageDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const pkg = getPackageBySlug(slug);

  if (!pkg) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col selection:bg-gold selection:text-black">
      {/* Navigation */}
      <Navbar />

      <main className="flex-1">
        {/* Full-bleed Hero */}
        <PackageHero pkg={pkg} />

        {/* Main Content Area: Left Details + Right Sticky Booking Widget */}
        <section className="py-12 sm:py-16 bg-black">
          <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
              {/* Left Column: Narrative, Itinerary, Accommodations & Inclusions (8 cols) */}
              <div className="lg:col-span-8 space-y-12">
                <PackageOverview pkg={pkg} />
                <PackageItinerary itinerary={pkg.itinerary} />
                <PackageAccommodations accommodations={pkg.accommodations} />
                <PackageInclusions
                  inclusions={pkg.inclusions}
                  exclusions={pkg.exclusions}
                />
              </div>

              {/* Right Column: Sticky Booking & Concierge Widget (4 cols) */}
              <div className="lg:col-span-4">
                <PackageBookingWidget pkg={pkg} />
              </div>
            </div>
          </div>
        </section>

        {/* Similar Curated Journeys */}
        <SimilarPackages currentSlug={pkg.slug} />
      </main>

      {/* Editorial Footer */}
      <Footer variant="editorial" />
    </div>
  );
}

