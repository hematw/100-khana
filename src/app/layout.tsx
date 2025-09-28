import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import ConvexClientProvider from "@/src/components/ConvexClientProvider";
import ReactQueryProvider from "../providers/react-query";
import { ThemeProvider } from "../components/theme/theme-provider";
import localFont from "next/font/local"

const clashDisplay = localFont({
  src: "../assets/fonts/ClashDisplay_Complete/Fonts/TTF/ClashDisplay-Variable.ttf",
  variable: "--font-clash-display",
})

const poppins = Poppins({
  variable: "--font-poppins-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});


export const metadata: Metadata = {
  title: "100 Khana",
  description: "A Platform for buy, rent, and sell Houses",
  icons: {
    icon: "/convex.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${clashDisplay.variable} ${poppins.className} antialiased`}
      >
        <ReactQueryProvider>
          <ConvexClientProvider>
            <ThemeProvider>{children}</ThemeProvider>
          </ConvexClientProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
