// app/layout.tsx
import { getServerSession } from "next-auth";
import type { Metadata } from "next";
import {
  Hachi_Maru_Pop,
  Geist,
  Geist_Mono,
  Klee_One,
  Noto_Serif_JP,
} from "next/font/google";
import "./globals.css";
import PdfJsInitializer from "../components/PdfJsInitializer";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import AuthSessionProvider from "@/components/auth/SessionProvider";
import ThemeProviderWrapper from "@/components/theme/ThemeProviderWrapper";
import AutoGuestSession from "@/components/auth/AutoGuestSession";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const hachiMaruPop = Hachi_Maru_Pop({
  variable: "--font-hachi-maru-pop",
  subsets: ["latin"],
  weight: "400",
});

const kleeOne = Klee_One({
  variable: "--font-klee-one",
  subsets: ["latin"],
  weight: "400",
});

const notoSerifJP = Noto_Serif_JP({
  variable: "--font-noto-serif-jp",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Manabiko",
  description: "A book progress tracker",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${hachiMaruPop} ${geistMono.variable} ${kleeOne.variable} ${notoSerifJP.variable} antialiased relative`}
      >
        <AuthSessionProvider session={session}>
          <ThemeProviderWrapper>
            <PdfJsInitializer />
            <AutoGuestSession />
            {children}
            <Toaster
              position="bottom-right"
              toastOptions={{ duration: 1000 }}
            />
          </ThemeProviderWrapper>
        </AuthSessionProvider>
      </body>
    </html>
  );
}
