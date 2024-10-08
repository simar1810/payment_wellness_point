import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import RootProvider from "@/components/core/providers/RootProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "The Wellness Point",
  description: "Transform your Health with Wellnessz",
  icons: {
    icon: '/logo.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <link rel="icon" href="/logo.png" sizes="any" />
      <body className={inter.className}>
        <RootProvider>
          {children}
        </RootProvider>
      </body>
    </html>
  );
}
