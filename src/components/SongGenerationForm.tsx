import React from "react";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Button } from "./ui/button";
import { Music, Mic, Heart, Globe } from "lucide-react";

interface SongGenerationFormProps {
  onSubmit?: (data: SongFormData) => void;
  isLoading?: boolean;
  error?: string;
}

interface SongFormData {
  dedicationName: string;
  genre: string;
  vocalStyle: string;
  mood: string;
  language: string;
}

const SongGenerationForm = ({
  onSubmit = () => {},
  isLoading = false,
  error = "",
}: SongGenerationFormProps) => {
  const genres = [
    "Pop",
    "Rock",
    "Country",
    "Hip Hop",
    "Jazz",
    "Classical",
    "R&B",
  ];
  const vocalStyles = ["Powerful", "Soft", "Raspy", "Smooth", "Energetic"];
  const moods = ["Happy", "Sad", "Romantic", "Energetic", "Calm", "Nostalgic"];
  const languages = [
    "Hindi",
    "Bengali",
    "Telugu",
    "Marathi",
    "Tamil",
    "Urdu",
    "Gujarati",
    "Kannada",
    "Malayalam",
    "Punjabi",
    "English",
    "Spanish",
    "French",
    "German",
    "Italian",
    "Japanese",
    "Korean",
    "Mandarin",
    "Arabic",
    "Portuguese",
  ];

  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    setIsSubmitting(true);
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data = {
      dedicationName: formData.get("dedicationName") as string,
      genre: formData.get("genre") as string,
      vocalStyle: formData.get("vocalStyle") as string,
      mood: formData.get("mood") as string,
      language: formData.get("language") as string,
    };
    try {
      await onSubmit(data);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-[600px] p-8 bg-slate-800/50 border-slate-700 backdrop-blur-sm">
      <h2 className="text-2xl font-semibold mb-6 text-center bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">
        Create Your Song
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="dedicationName" className="text-slate-300">
            Dedication Name
          </Label>
          <Input
            id="dedicationName"
            name="dedicationName"
            placeholder="Enter the name of the person this song is for"
            defaultValue="Someone Special"
            className="bg-slate-900/50 border-slate-700 text-slate-300 placeholder:text-slate-500"
          />
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="genre"
            className="flex items-center gap-2 text-slate-300"
          >
            <Music className="w-4 h-4 text-purple-400" /> Genre
          </Label>
          <Select name="genre" defaultValue={genres[0]}>
            <SelectTrigger className="bg-slate-900/50 border-slate-700 text-slate-300">
              <SelectValue placeholder="Select genre" />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-700">
              {genres.map((genre) => (
                <SelectItem
                  key={genre}
                  value={genre}
                  className="text-slate-300 focus:bg-purple-500/20 focus:text-purple-400"
                >
                  {genre}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="vocalStyle"
            className="flex items-center gap-2 text-slate-300"
          >
            <Mic className="w-4 h-4 text-purple-400" /> Vocal Style
          </Label>
          <Select name="vocalStyle" defaultValue={vocalStyles[0]}>
            <SelectTrigger className="bg-slate-900/50 border-slate-700 text-slate-300">
              <SelectValue placeholder="Select vocal style" />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-700">
              {vocalStyles.map((style) => (
                <SelectItem
                  key={style}
                  value={style}
                  className="text-slate-300 focus:bg-purple-500/20 focus:text-purple-400"
                >
                  {style}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="mood"
            className="flex items-center gap-2 text-slate-300"
          >
            <Heart className="w-4 h-4 text-purple-400" /> Mood
          </Label>
          <Select name="mood" defaultValue={moods[0]}>
            <SelectTrigger className="bg-slate-900/50 border-slate-700 text-slate-300">
              <SelectValue placeholder="Select mood" />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-700">
              {moods.map((mood) => (
                <SelectItem
                  key={mood}
                  value={mood}
                  className="text-slate-300 focus:bg-purple-500/20 focus:text-purple-400"
                >
                  {mood}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="language"
            className="flex items-center gap-2 text-slate-300"
          >
            <Globe className="w-4 h-4 text-purple-400" /> Language
          </Label>
          <Select name="language" defaultValue={languages[0]}>
            <SelectTrigger className="bg-slate-900/50 border-slate-700 text-slate-300">
              <SelectValue placeholder="Select language" />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-700">
              {languages.map((language) => (
                <SelectItem
                  key={language}
                  value={language}
                  className="text-slate-300 focus:bg-purple-500/20 focus:text-purple-400"
                >
                  {language}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button
          type="submit"
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
          disabled={isLoading || isSubmitting}
        >
          {isLoading || isSubmitting ? "Generating Song..." : "Generate Song"}
        </Button>
      </form>
    </Card>
  );
};

export default SongGenerationForm;
