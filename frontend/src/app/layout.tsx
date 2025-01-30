import "./globals.css";

import type { Metadata } from "next";
import { JetBrains_Mono, Montserrat } from "next/font/google";

import { ThemeProvider } from "@/components/providers";

const montserrat = Montserrat({
  weight: "600",
  variable: "--font-montserrat",
  subsets: ["cyrillic"],
});
const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["cyrillic"],
});

export const metadata: Metadata = {
  title: "СветоСобытия",
  description: "Календарь мероприятий Светогорского МО",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      suppressHydrationWarning
      className={`${montserrat.variable} ${jetbrains.variable} antialiased`}
    >
      <head />
      <body>
        <ThemeProvider
          attribute="class"
          enableSystem
          defaultTheme="dark"
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
