import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { CommandMenu } from "@/components/command-menu";
import QueryProvider from "@/providers/query-provider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://calosbicho.pt");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Carlos Bicho - Portfolio",
  description: "Portfolio pessoal de Carlos Bicho, desenvolvedor Full-Stack",
  keywords: [
    "Carlos Bicho",
    "Portfolio",
    "Developer",
    "Full-Stack",
    "React",
    "Next.js",
  ],
  authors: [{ name: "Carlos Bicho" }],
  creator: "Carlos Bicho",
  openGraph: {
    type: "website",
    locale: "pt_PT",
    url: siteUrl,
    title: "Carlos Bicho - Portfolio",
    description: "Portfolio pessoal de Carlos Bicho, desenvolvedor Full-Stack",
    siteName: "Carlos Bicho Portfolio",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Carlos Bicho - Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Carlos Bicho - Portfolio",
    description: "Portfolio pessoal de Carlos Bicho, desenvolvedor Full-Stack",
    images: ["/og-image.jpg"],
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
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased min-h-screen bg-background font-sans`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <QueryProvider>
            <div className="relative flex min-h-screen flex-col">
              <Navbar />
              <main className="flex-1">{children}</main>
              <Footer />

              {/* Command Menu - Global */}
              <CommandMenu />

              {/* Command Menu Indicator */}
              <div className="fixed bottom-4 right-4 z-40">
                <div className="hidden md:flex items-center gap-2 px-3 py-2 rounded-full glass border text-xs text-muted-foreground">
                  <kbd className="px-1.5 py-0.5 rounded border bg-background/50">
                    ⌘
                  </kbd>
                  <kbd className="px-1.5 py-0.5 rounded border bg-background/50">
                    K
                  </kbd>
                  <span>para comandos</span>
                </div>
              </div>
            </div>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
