import React from "react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Music, Clock, Globe, Heart } from "lucide-react";

interface SongSummaryProps {
  genre?: string;
  duration?: string;
  language?: string;
  mood?: string;
  dedicatedTo?: string;
}

const SongSummary = ({
  genre = "Pop",
  duration = "3:30",
  language = "English",
  mood = "Happy",
  dedicatedTo = "Someone Special",
}: SongSummaryProps) => {
  return (
    <Card className="w-[280px] p-6 bg-white shadow-lg">
      <h3 className="text-xl font-semibold mb-4">Song Summary</h3>

      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Music className="w-4 h-4 text-primary" />
          <span className="text-sm text-gray-600">Genre:</span>
          <Badge variant="secondary">{genre}</Badge>
        </div>

        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-primary" />
          <span className="text-sm text-gray-600">Duration:</span>
          <Badge variant="secondary">{duration}</Badge>
        </div>

        <div className="flex items-center gap-2">
          <Globe className="w-4 h-4 text-primary" />
          <span className="text-sm text-gray-600">Language:</span>
          <Badge variant="secondary">{language}</Badge>
        </div>

        <div className="flex items-center gap-2">
          <Heart className="w-4 h-4 text-primary" />
          <span className="text-sm text-gray-600">Mood:</span>
          <Badge variant="secondary">{mood}</Badge>
        </div>

        <div className="mt-6 pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-600">Dedicated to:</p>
          <p className="text-base font-medium">{dedicatedTo}</p>
        </div>
      </div>
    </Card>
  );
};

export default SongSummary;
