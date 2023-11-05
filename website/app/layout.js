import { Inter } from "next/font/google";
import "./globals.css";
import Layout from "@/components/Layout";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Training & Placement Cell | NIT Goa",
  description: "Training & Placement Cell | NIT Goa",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="">
      <body className={inter.className}>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
