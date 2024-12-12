import type { Metadata } from "next";
import "./globals.css";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { Toaster } from "sonner";
import Providers from "@/lib/Providers/Providers";
import { default_meta_info } from "@/constants/values";

export const metadata: Metadata = {
  title: default_meta_info?.meta_title,
  description: default_meta_info?.meta_description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Providers>
      <html lang="en">
        <body className={""}>
          <AppRouterCacheProvider>
            <Toaster richColors position="bottom-right" />

            {children}
          </AppRouterCacheProvider>
        </body>
      </html>
    </Providers>
  );
}
