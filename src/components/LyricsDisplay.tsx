import React from "react";
import { ScrollArea } from "./ui/scroll-area";
import { Card } from "./ui/card";

interface LyricsDisplayProps {
  lyrics?: string;
  title?: string;
}

const LyricsDisplay = ({
  lyrics = "Verse 1:\nIn the moonlight's gentle glow\nWhispers of a story untold\nMelodies that softly flow\nLike tales of love from days of old\n\nChorus:\nTime stands still when you're with me\nLike a song that never ends\nIn this perfect harmony\nWhere broken hearts begin to mend\n\nVerse 2:\nThrough the rhythm of the night\nWe dance beneath the stars above\nEvery note feels just right\nIn this symphony of love",
  title = "Moonlight Melody",
}: LyricsDisplayProps) => {
  return (
    <Card className="w-[500px] h-[600px] bg-white p-6 flex flex-col gap-4">
      <h2 className="text-2xl font-semibold text-center text-gray-900">
        {title}
      </h2>
      <ScrollArea className="flex-1 rounded-md border p-4">
        <div className="whitespace-pre-line text-gray-700">{lyrics}</div>
      </ScrollArea>
    </Card>
  );
};

export default LyricsDisplay;
