import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Helmet } from "react-helmet-async";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { CustomCursor } from "@/components/CustomCursor";
import { LoadingScreen } from "@/components/LoadingScreen";
import { VideoLoadingScreen } from "@/components/VideoLoadingScreen";
import Footer from "@/components/Footer";
import { loadingConfig } from "@/config/loading.config";
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import ClientFeedback from "./pages/ClientFeedback";
import Contact from "./pages/Contact";
import Auth from "./pages/Auth";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  // Trigger event for prerender plugin
  useEffect(() => {
    document.dispatchEvent(new Event("render-complete"));
  }, []);

  if (isLoading) {
    switch (loadingConfig.type) {
      case "video":
        return (
          <VideoLoadingScreen
            onComplete={handleLoadingComplete}
            videoSrc={loadingConfig.video?.src}
            poster={loadingConfig.video?.poster}
          />
        );
      case "default":
      default:
        return <LoadingScreen onComplete={handleLoadingComplete} />;
    }
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
        <Helmet>
        <title>DevDuo — Modern Web & App Development</title>
        <meta
        name="description"
        content="DevDuo builds high-performance web and mobile applications for startups and enterprises."
        />
        <meta
        name="keywords"
        content="DevDuo, web development, mobile apps, Vite, React, software agency"
        />

        {/* Open Graph / Facebook */}
        <meta property="og:title" content="DevDuo — Modern Web & App Development" />
        <meta
        property="og:description"
        content="DevDuo builds high-performance web and mobile applications for startups and enterprises."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.devduo.dev/" />
        <meta property="og:image" content="https://www.devduo.dev/og-image.png" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="DevDuo — Modern Web & App Development" />
        <meta
        name="twitter:description"
        content="DevDuo builds high-performance web and mobile applications for startups and enterprises."
        />
        <meta name="twitter:image" content="https://www.devduo.dev/og-image.png" />
        </Helmet>


          <div className="min-h-screen flex flex-col">
            <CustomCursor />
            <Navigation />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/feedback" element={<ClientFeedback />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;