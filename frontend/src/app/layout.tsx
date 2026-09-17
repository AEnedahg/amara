import { Poppins } from "next/font/google";
import "./globals.css";
import type { Metadata } from "next";
import Providers from "@/components/providers/Providers";

const poppins = Poppins({
    subsets: ['latin'],
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
    variable: '--font-poppins'
})


export const metadata: Metadata = {
  title: {
    default: "Amara Resume Builder",
    template: "%s | Amara Resume Builder",
  },
  description:
    "Create a professional resume in minutes with Amara Resume Builder. Build, customize, and download a resume that showcases your skills and experience.",
  keywords: [
    "resume builder",
    "CV builder",
    "professional resume",
    "resume maker",
    "CV maker",
    "online resume builder",
  ],
  authors: [{ name: "Amara Resume Builder" }],
  creator: "Amara Resume Builder",
  applicationName: "Amara Resume Builder",

  openGraph: {
    title: "Amara Resume Builder — Build a Resume That Stands Out",
    description:
      "Create, customize, and download a professional resume in minutes.",
    type: "website",
    siteName: "Amara Resume Builder",
  },

  twitter: {
    card: "summary_large_image",
    title: "Amara Resume Builder — Build a Resume That Stands Out",
    description:
      "Create, customize, and download a professional resume in minutes.",
  },

  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/logo.svg'
  }
};


export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
      <html lang="en" className={`${poppins.variable}  h-full antialiased`}>
          <body className="min-h-full flex flex-col">
              <Providers>{children}</Providers>
          </body>
      </html>
  );
}
