import type { Metadata, Viewport } from "next";
import "./globals.css";
import { site } from "@/config/site";

const place = [site.locality, site.city].map((v) => v.trim()).filter(Boolean).join(", ");

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: `${site.name} | Unisex Gym${place ? ` in ${place}` : ""}`,
  description: `Strength. Discipline. Transformation. ${site.name} is a unisex fitness centre${place ? ` in ${place}` : ""}. Explore training programs and membership plans.`,
  openGraph: {
    title: `${site.name}`,
    description: `Train harder. Become stronger.${place ? ` Unisex fitness centre in ${place}.` : ""}`,
    type: "website",
    locale: "en_IN",
    images: [{ url: "/brand/og.png", width: 1200, height: 630, alt: site.name }],
  },
  icons: { icon: "/brand/icon.png", apple: "/brand/icon.png" },
};

export const viewport: Viewport = { themeColor: "#080808", width: "device-width", initialScale: 1 };

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "HealthClub",
  name: site.name,
  image: `${site.url}/brand/og.png`,
  ...(place ? { address: { "@type": "PostalAddress", addressLocality: place, addressCountry: "IN", ...(site.address ? { streetAddress: site.address } : {}) } } : {}),
  ...(site.phone ? { telephone: `+${site.phone}` } : {}),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="grain">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        {children}
      </body>
    </html>
  );
}
