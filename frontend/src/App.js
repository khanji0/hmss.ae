import "@/App.css";
import { useState } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import IntroScreen from "./components/IntroScreen";
import { Toaster } from "./components/ui/sonner";

function App() {
  const [showIntro, setShowIntro] = useState(true);

  const handleIntroComplete = () => {
    setShowIntro(false);
  };

  return (
    <div className="App">
      <HashRouter>
        {showIntro && <IntroScreen onComplete={handleIntroComplete} />}
        <Routes>
          <Route path="/" element={<Landing />} />
        </Routes>
      </HashRouter>
      <Toaster />
    </div>
  );
}

export default App;
