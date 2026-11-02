import packagesJson from "./packages.json";

export interface ItineraryDay {
  day: number;
  title: string;
  location: string;
  description: string;
  morning?: string;
  afternoon?: string;
  evening?: string;
  stay?: string;
  meals?: string;
}

export interface AccommodationFeature {
  name: string;
  type: string;
  rating: string;
  location: string;
  image: string;
  description: string;
  amenities: string[];
}

export interface PackageDetail {
  id: string;
  slug: string;
  title: string;
  destination: string;
  duration: string;
  category: "europe" | "tropical" | "middle-east" | "honeymoon";
  categoryLabel: string;
  price: string;
  priceDetail: string;
  heroImage: string;
  galleryImages: string[];
  overview: string;
  atmosphereQuote: string;
  bestTimeToVisit: string;
  groupStyle: string;
  accommodationType: string;
  transferType: string;
  highlights: string[];
  itinerary: ItineraryDay[];
  inclusions: string[];
  exclusions: string[];
  accommodations: AccommodationFeature[];
}

export const packagesData: PackageDetail[] = packagesJson as PackageDetail[];

export function getPackageBySlug(slug: string): PackageDetail | undefined {
  return packagesData.find((p) => p.slug === slug);
}

export function getAllPackageSlugs(): string[] {
  return packagesData.map((p) => p.slug);
}
