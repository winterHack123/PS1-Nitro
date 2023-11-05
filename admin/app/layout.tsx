import "server-only";
import "./globals.css";
import "react-confirm-alert/src/react-confirm-alert.css";

export const metadata = {
  title: "IMS | NITGoa",
  description: "IMS | NITGoa",
};

import SupabaseAuthProvider from "@/components/providers/supabase-auth-provider";
import SupabaseProvider from "@/components/providers/supabase-provider";
import { createClient } from "@/utils/supabase-server";
import { Poppins } from "next/font/google";
import ReduxProvider from "@/components/providers/redux-provider";
import Layout from "@/components/ui/layout";
import { Toaster } from "react-hot-toast";

const inter = Poppins({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <html lang="en">
      <body className={inter.className}>
        <SupabaseProvider>
          <SupabaseAuthProvider serverSession={session}>
            <ReduxProvider>
              <Toaster position="top-right" reverseOrder={false} />
              <Layout>{children}</Layout>
            </ReduxProvider>
          </SupabaseAuthProvider>
        </SupabaseProvider>
      </body>
    </html>
  );
}
