import { Suspense } from "react";
import { useRoutes, Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/home";
import LandingPage from "./components/LandingPage";
import routes from "tempo-routes";
import { Toaster } from "./components/ui/toaster";
import { AuthProvider } from "./contexts/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Suspense fallback={<p>Loading...</p>}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/app" element={<Home />} />
          <Route path="/login" element={<Navigate to="/app" />} />
          {import.meta.env.VITE_TEMPO === "true" && (
            <Route path="/tempobook/*" element={null} />
          )}
        </Routes>
        {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
        <Toaster />
      </Suspense>
    </AuthProvider>
  );
}

export default App;
