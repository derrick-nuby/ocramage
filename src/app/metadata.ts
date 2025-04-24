import type { Metadata, Viewport } from "next";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export async function generateMetadata(): Promise<Metadata> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://talent-vortex-fe.vercel.app";

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: "Talent Vortex - Build Work Experience through Skills Challenges",
      template: "%s | Talent Vortex",
    },
    description:
      "Enhance your employability and accelerate your career growth by working on hands-on projects and hackathons with Talent Vortex. Join Africa's largest workforce of digital professionals.",
    keywords: [
      "skills challenges",
      "hackathons",
      "career growth",
      "work experience",
      "digital professionals",
      "Talent Vortex",
    ],
    authors: [{ name: "Talent Vortex Team" }],
    creator: "Talent Vortex",
    publisher: "Talent Vortex Inc.",
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      url: siteUrl,
      siteName: "Talent Vortex",
      title: "Talent Vortex - Build Work Experience through Skills Challenges",
      description:
        "Enhance your employability and accelerate your career growth by working on hands-on projects and hackathons with Talent Vortex. Join Africa's largest workforce of digital professionals.",
      images: [
        {
          url: `${siteUrl}/images/site-main.png`,
          width: 1200,
          height: 630,
          alt: "Talent Vortex - Build Work Experience through Skills Challenges",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Talent Vortex - Build Work Experience through Skills Challenges",
      description:
        "Enhance your employability and accelerate your career growth by working on hands-on projects and hackathons with Talent Vortex. Join Africa's largest workforce of digital professionals.",
      images: [`${siteUrl}/images/site-main.png`],
      creator: "@TalentVortex",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    icons: {
      icon: [
        { url: "/images/favicons/favicon-32x32.png", sizes: "32x32", type: "image/png" },
        { url: "/images/favicons/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      ],
      apple: [{ url: "/images/favicons/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
      other: [{ rel: "mask-icon", url: "/images/favicons/safari-pinned-tab.svg", color: "#5bbad5" }],
    },
    manifest: "/images/favicons/site.webmanifest",
  };
}

