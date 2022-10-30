import { Outlet } from "react-router-dom";

// sito components
import SitoContainer from "sito-container";

// own components
import Footer from "../components/Footer/Footer";
import Navbar from "../components/Navbar/Navbar";

const Main = () => {
  return (
    <SitoContainer
      sx={{ width: "100vw", height: "100vh", flexDirection: "column" }}
    >
      <Navbar />
      <Outlet />
      <Footer />
    </SitoContainer>
  );
};

export default Main;
