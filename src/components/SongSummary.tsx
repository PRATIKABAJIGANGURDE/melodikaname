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
    <Card className="w-[280px] p-6 bg-slate-800/50 border-slate-700 shadow-lg">
      <h3 className="text-xl font-semibold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">
        Song Summary
      </h3>

      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Music className="w-4 h-4 text-purple-400" />
          <span className="text-sm text-slate-400">Genre:</span>
          <Badge
            variant="secondary"
            className="bg-purple-500/20 text-purple-400 hover:bg-purple-500/30"
          >
            {genre}
          </Badge>
        </div>

        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-purple-400" />
          <span className="text-sm text-slate-400">Duration:</span>
          <Badge
            variant="secondary"
            className="bg-purple-500/20 text-purple-400 hover:bg-purple-500/30"
          >
            {duration}
          </Badge>
        </div>

        <div className="flex items-center gap-2">
          <Globe className="w-4 h-4 text-purple-400" />
          <span className="text-sm text-slate-400">Language:</span>
          <Badge
            variant="secondary"
            className="bg-purple-500/20 text-purple-400 hover:bg-purple-500/30"
          >
            {language}
          </Badge>
        </div>

        <div className="flex items-center gap-2">
          <Heart className="w-4 h-4 text-purple-400" />
          <span className="text-sm text-slate-400">Mood:</span>
          <Badge
            variant="secondary"
            className="bg-purple-500/20 text-purple-400 hover:bg-purple-500/30"
          >
            {mood}
          </Badge>
        </div>

        <div className="mt-6 pt-4 border-t border-slate-700">
          <p className="text-sm text-slate-400">Dedicated to:</p>
          <p className="text-base font-medium text-slate-300">{dedicatedTo}</p>
        </div>
      </div>
    </Card>
  );
};

export default SongSummary;
