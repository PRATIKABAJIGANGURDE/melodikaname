import React, { useState } from "react";
import LyricsDisplay from "./LyricsDisplay";
import SongSummary from "./SongSummary";
import { Button } from "./ui/button";
import { Save, Loader2 } from "lucide-react";
import { saveSong } from "@/lib/db";
import { useToast } from "./ui/use-toast";

interface ResultsDisplayProps {
  lyrics?: string;
  title?: string;
  genre?: string;
  duration?: string;
  language?: string;
  mood?: string;
  dedicatedTo?: string;
}

const ResultsDisplay = ({
  lyrics = "",
  title = "",
  genre = "",
  duration = "",
  language = "",
  mood = "",
  dedicatedTo = "",
}: ResultsDisplayProps) => {
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  const handleSave = async () => {
    try {
      setIsSaving(true);
      await saveSong({
        title,
        lyrics,
        genre,
        duration,
        language,
        mood,
        dedicated_to: dedicatedTo,
      });
      toast({
        title: "Success",
        description: "Song saved successfully!",
        className: "bg-slate-800 border-slate-700 text-slate-300",
      });
    } catch (error) {
      console.error("Error saving song:", error);
      toast({
        title: "Error",
        description: "Failed to save song. Please try again.",
        variant: "destructive",
        className: "bg-slate-800 border-red-500/50 text-slate-300",
      });
    } finally {
      setIsSaving(false);
    }
  };
  return (
    <div className="w-full min-h-[600px] bg-slate-800/30 p-8 rounded-xl border border-slate-700">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">
          Generated Song
        </h1>
        <Button
          onClick={handleSave}
          className="bg-purple-500/20 text-purple-400 hover:bg-purple-500/30 border border-purple-500/50"
          variant="outline"
          disabled={isSaving}
        >
          {isSaving ? (
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          ) : (
            <Save className="w-4 h-4 mr-2" />
          )}
          {isSaving ? "Saving..." : "Save Song"}
        </Button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 items-start justify-center">
        <LyricsDisplay lyrics={lyrics} title={title} />
        <div className="flex flex-col gap-4">
          <SongSummary
            genre={genre}
            duration={duration}
            language={language}
            mood={mood}
            dedicatedTo={dedicatedTo}
          />
        </div>
      </div>
    </div>
  );
};

export default ResultsDisplay;
