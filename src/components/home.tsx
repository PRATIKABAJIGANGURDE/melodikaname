import React, { useState } from "react";
import AuthForm from "./AuthForm";
import { useAuth } from "@/contexts/AuthContext";
import SongGenerationForm from "./SongGenerationForm";
import ResultsDisplay from "./ResultsDisplay";
import { Card } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { generateSongLyrics } from "@/lib/gemini";
import { Music2 } from "lucide-react";

interface HomeProps {
  isAuthenticated?: boolean;
}

const Home = ({ isAuthenticated: propIsAuthenticated = false }: HomeProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(propIsAuthenticated);

  const { user, signIn } = useAuth();

  const handleLogin = async (values: {
    email: string;
    password: string;
    rememberMe: boolean;
  }) => {
    try {
      await signIn(values.email, values.password, values.rememberMe);
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Login error:", error);
      // Optional: Show an error message to the user
    }
  };

  const [showResults, setShowResults] = useState(false);
  const [generatedSong, setGeneratedSong] = useState({
    lyrics: "",
    title: "",
    genre: "",
    duration: "",
    language: "",
    mood: "",
    dedicatedTo: "",
  });

  const handleSongGeneration = async (formData: any) => {
    try {
      const songData = await generateSongLyrics(formData);
      setGeneratedSong(songData);
      setShowResults(true);
    } catch (error) {
      console.error("Error:", error);
      setGeneratedSong({
        lyrics: "Error generating lyrics. Please try again.",
        title: "Error",
        genre: formData.genre,
        duration: "0:00",
        language: formData.language,
        mood: formData.mood,
        dedicatedTo: formData.dedicationName,
      });
      setShowResults(true);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 flex items-center justify-center p-4">
        <div className="space-y-4">
          <AuthForm onSubmit={handleLogin} />
          <div className="text-center text-sm text-slate-400 bg-slate-800/50 p-4 rounded-lg border border-slate-700">
            <p>Test User Credentials:</p>
            <p>Email: test@example.com</p>
            <p>Password: password123</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <Card className="bg-slate-800/50 border-slate-700 p-6">
          <div className="flex items-center justify-center space-x-2 mb-6">
            <Music2 className="h-8 w-8 text-purple-400" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">
              AI Song Generator
            </h1>
          </div>
          <p className="text-slate-300 text-center mb-6">
            Create personalized songs with our AI-powered lyric generator
          </p>

          <Tabs
            defaultValue={showResults ? "results" : "generate"}
            className="w-full"
          >
            <TabsList className="grid w-full max-w-[400px] grid-cols-2 mx-auto mb-8 bg-slate-900/50">
              <TabsTrigger
                value="generate"
                className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-400"
              >
                Generate
              </TabsTrigger>
              <TabsTrigger
                value="results"
                disabled={!showResults}
                className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-400"
              >
                Results
              </TabsTrigger>
            </TabsList>

            <TabsContent value="generate" className="flex justify-center">
              <SongGenerationForm
                onSubmit={handleSongGeneration}
                isLoading={false}
              />
            </TabsContent>

            <TabsContent value="results">
              {showResults && (
                <ResultsDisplay
                  lyrics={generatedSong.lyrics}
                  title={generatedSong.title}
                  genre={generatedSong.genre}
                  duration={generatedSong.duration}
                  language={generatedSong.language}
                  mood={generatedSong.mood}
                  dedicatedTo={generatedSong.dedicatedTo}
                />
              )}
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
};

export default Home;
