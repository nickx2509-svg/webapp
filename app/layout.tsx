import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "Zepto 8 Min",
  description: "8 min delivery",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="w-full h-screen bg-linear-to-b from-purple-100 to-white"
        
      >
        {children}
      </body>
    </html>
  );
}
