import galleryJson from "./gallery.json";

export interface GalleryItem {
  id: string;
  title: string;
  location: string;
  category: "all" | "europe" | "oceans" | "middle-east" | "stays";
  categoryLabel: string;
  image: string;
  aspect: "standard" | "tall" | "wide";
  description: string;
  packageSlug?: string;
}

export const galleryData: GalleryItem[] = galleryJson as GalleryItem[];
