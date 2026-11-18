/**
 * Central business configuration.
 * Demo contact content for the current preview. Replace it with verified centre
 * details before launch; the package and contact details are sample content.
 */
export const site = {
  name: "Dark Knight Unisex Fitness Centre",
  shortName: "Dark Knight",
  /** Area / neighbourhood, e.g. "Velachery". Leave empty until confirmed. */
  locality: "Sample Fitness District",
  city: "Your City",
  country: "India",

  /** Full postal address. Leave empty until confirmed. */
  address: "12 Example Road",

  /** Digits only with country code, e.g. "919XXXXXXXXX". */
  phone: "910000000000",
  whatsapp: "910000000000",
  email: "hello@example.com",
  /** Full profile URLs. Leave empty to hide. */
  social: { instagram: "https://instagram.com", facebook: "https://facebook.com", youtube: "https://youtube.com" },

  /** Leave empty to show "Call or message for timings". */
  hours: [{ days: "Mon – Sat", time: "6:00 AM – 10:00 PM" }, { days: "Sunday", time: "7:00 AM – 12:00 PM" }] as { days: string; time: string }[],

  /**
   * Override with the exact Google Maps share link once you have it.
   * Until then the site opens a Google Maps search for the studio.
   */
  mapsUrl: "",
  /** Extra text added to the map search. The name plus address/area/city is used automatically. */
  mapsQuery: "",

  /** Public site URL, used for metadata. */
  url: "https://example.com",
};

export const hasPhone = () => site.phone.trim().length > 0;
export const hasWhatsapp = () => site.whatsapp.trim().length > 0;

/** "Address, Area, City" using only what has been filled in. */
export const locationText = () => [site.address, site.locality, site.city].map((v) => v.trim()).filter(Boolean).join(", ");

/** True once there is enough location detail for a meaningful map. */
export const hasLocation = () => locationText().length > 0 || site.mapsUrl.trim().length > 0;

const mapQuery = () => [site.name, site.mapsQuery, locationText()].filter(Boolean).join(", ");

export const mapsLink = () =>
  site.mapsUrl ||
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapQuery())}`;

export const mapsEmbed = () => `https://www.google.com/maps?q=${encodeURIComponent(mapQuery())}&output=embed`;

export const telLink = () => (hasPhone() ? `tel:+${site.phone.replace(/\D/g, "")}` : "");

export const whatsappLink = (message: string) =>
  hasWhatsapp()
    ? `https://wa.me/${site.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`
    : "";
