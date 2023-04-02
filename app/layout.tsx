import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar/Navbar";
import CilentOnly from "./components/CilentOnly";
import Modal from "./components/modals/Modal";

export const metadata = {
  title: "Nomad Hive",
  description: "An online marketplace app ",
};
const font = Space_Grotesk({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <CilentOnly>
          <Modal isOpen title="hello world" actionLabel="Submit" />
          <Navbar />
        </CilentOnly>
        {children}
      </body>
    </html>
  );
}
