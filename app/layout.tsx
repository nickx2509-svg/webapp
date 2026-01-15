import type { Metadata } from "next";
import "./globals.css";
import Provider from "@/components/Provider";
import StoreProvider from "@/redux/StoreProvider";
import InitUser from "@/InitUser";
import 'leaflet/dist/leaflet.css'



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
        <Provider>
          <StoreProvider>
            <InitUser />
        {children}
          </StoreProvider>
        </Provider>
      </body>
    </html>
  );
}
