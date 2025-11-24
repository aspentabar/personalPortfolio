import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { LoadingScreen } from "./components/LoadingScreen";
import { Navbar } from "./components/Navbar";
import { MobileMenu } from "./components/MobileMenu";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Projects } from "./pages/Projects";
import { ColorQuandary } from "./pages/projects/ColorQuandary";
import { Contact } from "./pages/Contact";
import "./index.css";
import TuneLink from "./pages/projects/TuneLink";
import { Filosophia } from "./pages/projects/FiloSofia";
import  OmNom   from "./pages/projects/OmNom";

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {!isLoaded && <LoadingScreen onComplete={() => setIsLoaded(true)} />}
      <Router>
        <div
          className={`min-h-screen transition-opacity duration-700 ${
            isLoaded ? "opacity-100" : "opacity-0"
          } bg-white text-purple-700`}
        >
          <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
          <MobileMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/ColorQuandary" element={<ColorQuandary />} />
            <Route path="/projects/TuneLink" element={<TuneLink />} />
            <Route path="/projects/Filosophia" element={<Filosophia />} />
            <Route path="/projects/OmNom" element={<OmNom />} />
            {/* <Route path="/contact" element={<Contact />} /> */}
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;