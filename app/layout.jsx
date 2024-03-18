import "@/assets/styles/global.css";
// components
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
// provider
import AuthProvider from "@/components/AuthProvider";
// toastify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const metadata = {
  title: "PropertyPulse",
  description: "Find your dream rental property",
  key: "rental,find rentals,find properties",
};

const MainLayout = ({ children }) => {
  return (
    <AuthProvider>
      <html lang="en">
        <body>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <ToastContainer />
        </body>
      </html>
    </AuthProvider>
  );
};

export default MainLayout;
