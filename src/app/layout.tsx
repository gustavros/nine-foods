import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/_context/cart";
import { ThemeProvider } from "@/_components/theme-provider/theme-provider";
import AuthProvider from "@/_providers/auth";
import { Toaster } from "@/_components/ui/sonner";
import { TableProvider } from "@/_context/table";

const grotesk = Space_Grotesk({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "nine foods.",
  description: "The best food delivery service in the city.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head />
      <body className={grotesk.className}>
        <AuthProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <TableProvider>
              <CartProvider>{children}</CartProvider>
            </TableProvider>
            <Toaster />
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
