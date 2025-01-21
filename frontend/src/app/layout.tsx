import "./globals.css";

import type { Metadata } from "next";
import { Geologica, JetBrains_Mono } from "next/font/google";

import { ThemeProvider } from "@/components/providers";

const geologica = Geologica({
  variable: "--font-geologica",
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
    <html lang="ru" suppressHydrationWarning>
      <body className={`${geologica.className} ${jetbrains.className} antialiased`}>
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
