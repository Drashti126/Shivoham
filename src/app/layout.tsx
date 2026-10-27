import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SHIVOHAM | Sarees, Dresses & Indian Ethnic Wear",
  description:
    "Elegance Woven in Every Thread. Discover 78 handcrafted Sarees, Dresses, and Kurtis at SHIVOHAM.",
  keywords: [
    "SHIVOHAM",
    "Indian ethnic wear",
    "Sarees",
    "Dresses",
    "Kurtis",
    "Banarasi Silk",
    "Lucknowi Chikankari",
    "Luxury ethnic fashion",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full scroll-smooth antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#FAF7F0] text-[#242424] font-sans">
        {children}
      </body>
    </html>
  );
}
