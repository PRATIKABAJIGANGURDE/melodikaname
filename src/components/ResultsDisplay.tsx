import React from "react";
import LyricsDisplay from "./LyricsDisplay";
import SongSummary from "./SongSummary";
import { Button } from "./ui/button";
import { Save } from "lucide-react";

interface ResultsDisplayProps {
  lyrics?: string;
  title?: string;
  genre?: string;
  duration?: string;
  language?: string;
  mood?: string;
  dedicatedTo?: string;
  onSave?: () => void;
}

const ResultsDisplay = ({
  lyrics,
  title,
  genre,
  duration,
  language,
  mood,
  dedicatedTo,
  onSave = () => console.log("Save clicked"),
}: ResultsDisplayProps) => {
  return (
    <div className="w-full min-h-[600px] bg-gray-50 p-8 flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Generated Song</h1>
        <Button
          onClick={onSave}
          className="flex items-center gap-2"
          variant="outline"
        >
          <Save className="w-4 h-4" />
          Save Song
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
