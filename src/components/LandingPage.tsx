import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Music2, Sparkles, Brain, Heart, ArrowRight } from "lucide-react";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white">
      {/* Navigation */}
      <nav className="fixed w-full top-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-700">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Music2 className="h-6 w-6 text-purple-400" />
            <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">
              SongAI
            </span>
          </div>
          <Button
            variant="ghost"
            onClick={() => navigate("/login")}
            className="hover:bg-white/10 text-white"
          >
            Login
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1511379938547-c1f69419868d')] bg-cover bg-center opacity-10" />
        <div className="container mx-auto text-center relative z-10">
          <div className="inline-flex items-center bg-purple-500/10 rounded-full px-4 py-2 mb-6">
            <Sparkles className="h-4 w-4 text-purple-400 mr-2" />
            <span className="text-sm text-purple-400">
              AI-Powered Song Generation
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 text-transparent bg-clip-text">
            Create Personal Songs
            <br />
            with AI Magic
          </h1>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Transform your emotions into beautiful, personalized songs using our
            advanced AI technology. Perfect for special occasions, dedications,
            and creative expression.
          </p>
          <Button
            size="lg"
            onClick={() => navigate("/login")}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 px-8 py-6 text-lg rounded-full"
          >
            Start Creating
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-slate-800/50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="p-6 bg-slate-800/50 rounded-xl border border-slate-700 backdrop-blur-sm hover:border-purple-500/50 transition-all">
              <Brain className="h-12 w-12 text-purple-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">
                AI-Powered Creation
              </h3>
              <p className="text-slate-300">
                Advanced AI algorithms that understand emotions and create
                meaningful lyrics.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-6 bg-slate-800/50 rounded-xl border border-slate-700 backdrop-blur-sm hover:border-purple-500/50 transition-all">
              <Heart className="h-12 w-12 text-purple-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Personal Touch</h3>
              <p className="text-slate-300">
                Customize every aspect of your song, from genre to mood and
                dedication.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-6 bg-slate-800/50 rounded-xl border border-slate-700 backdrop-blur-sm hover:border-purple-500/50 transition-all">
              <Music2 className="h-12 w-12 text-purple-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Multiple Styles</h3>
              <p className="text-slate-300">
                Choose from various genres and vocal styles to match your
                vision.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">
            Create Songs in Minutes
          </h2>
          <div className="grid md:grid-cols-4 gap-4 text-center max-w-4xl mx-auto">
            {[
              { step: "1", text: "Choose your genre and style" },
              { step: "2", text: "Add personal details and mood" },
              { step: "3", text: "Let AI generate your lyrics" },
              { step: "4", text: "Get your unique song" },
            ].map((item) => (
              <div
                key={item.step}
                className="p-6 bg-slate-800/50 rounded-xl border border-slate-700"
              >
                <div className="w-10 h-10 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center mx-auto mb-4">
                  {item.step}
                </div>
                <p className="text-slate-300">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-700 py-12">
        <div className="container mx-auto px-4 text-center text-slate-400">
          <p>© 2024 SongAI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
