import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: "Lumi: The Little Star-Weaver | Baby's First Portfolio",
  description: "An award-winning 3D interactive portfolio website for Lumi, an original starling baby character crafted for the haX.baby 48-hour hackathon.",
  keywords: ["Baby's First Website", "haX.baby", "Track 2", "Three.js", "Web Audio API", "Portfolio", "Lumi"],
  authors: [{ name: "Lumi Starlight Studio" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen relative antialiased selection:bg-[#a34063] selection:text-[#fff8f1]">
        {children}
      </body>
    </html>
  );
}
