import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar/Navbar";
import CilentOnly from "./components/ClientOnly";
import RegisterModal from "./components/modals/RegisterModal";
import LoginModal from "./components/modals/LoginModal";
import ToasterProvider from "./providers/ToasterProvider";
import getCurrentUser from "./actions/getCurrentUser";
import RentModal from "./components/modals/RentModal";
import SearchModal from "./components/modals/SearchModal";

export const metadata = {
  title: "Nomad Hive",
  description: "An online marketplace app ",
};
const font = Space_Grotesk({ subsets: ["latin"] });

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();
  return (
    <html lang="en">
      <body className={`${font.className}  bg-light`}>
        <CilentOnly>
          <ToasterProvider />
          <LoginModal />
          <RegisterModal />
          <RentModal />
          <SearchModal />
          <Navbar currentUser={currentUser} />
        </CilentOnly>
        <div className="pb-20 pt-28">{children}</div>
      </body>
    </html>
  );
}
