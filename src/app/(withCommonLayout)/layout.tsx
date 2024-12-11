import Footer from "@/components/Shared/Navbars/Footer";
import Navbar from "@/components/Shared/Navbars/Navbar";

const CommonLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};

export default CommonLayout;
