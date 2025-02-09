import React, { useState } from "react";
import AuthForm from "./AuthForm";
import SongGenerationForm from "./SongGenerationForm";
import ResultsDisplay from "./ResultsDisplay";
import { Card } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { generateSongLyrics } from "@/lib/gemini";

interface HomeProps {
  isAuthenticated?: boolean;
}

const Home = ({ isAuthenticated: propIsAuthenticated = false }: HomeProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(propIsAuthenticated);

  const handleLogin = (values: { email: string; password: string }) => {
    // Test user credentials
    if (
      values.email === "test@example.com" &&
      values.password === "password123"
    ) {
      setIsAuthenticated(true);
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
      // Show a fallback if API fails
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
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="space-y-4">
          <AuthForm onSubmit={handleLogin} />
          <div className="text-center text-sm text-gray-600">
            <p>Test User Credentials:</p>
            <p>Email: test@example.com</p>
            <p>Password: password123</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <Card className="bg-white p-6">
          <h1 className="text-3xl font-bold text-center mb-2">
            AI Song Generator
          </h1>
          <p className="text-gray-600 text-center mb-6">
            Create personalized songs with our AI-powered lyric generator
          </p>

          <Tabs
            defaultValue={showResults ? "results" : "generate"}
            className="w-full"
          >
            <TabsList className="grid w-full max-w-[400px] grid-cols-2 mx-auto mb-8">
              <TabsTrigger value="generate">Generate</TabsTrigger>
              <TabsTrigger value="results" disabled={!showResults}>
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
