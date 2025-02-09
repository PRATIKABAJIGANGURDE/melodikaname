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
    // Indian Languages
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
    // International Languages
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
    <Card className="w-[600px] p-8 bg-white">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        Create Your Song
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="dedicationName">Dedication Name</Label>
          <Input
            id="dedicationName"
            name="dedicationName"
            placeholder="Enter the name of the person this song is for"
            defaultValue="Someone Special"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="genre" className="flex items-center gap-2">
            <Music className="w-4 h-4" /> Genre
          </Label>
          <Select name="genre" defaultValue={genres[0]}>
            <SelectTrigger>
              <SelectValue placeholder="Select genre" />
            </SelectTrigger>
            <SelectContent>
              {genres.map((genre) => (
                <SelectItem key={genre} value={genre}>
                  {genre}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="vocalStyle" className="flex items-center gap-2">
            <Mic className="w-4 h-4" /> Vocal Style
          </Label>
          <Select name="vocalStyle" defaultValue={vocalStyles[0]}>
            <SelectTrigger>
              <SelectValue placeholder="Select vocal style" />
            </SelectTrigger>
            <SelectContent>
              {vocalStyles.map((style) => (
                <SelectItem key={style} value={style}>
                  {style}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="mood" className="flex items-center gap-2">
            <Heart className="w-4 h-4" /> Mood
          </Label>
          <Select name="mood" defaultValue={moods[0]}>
            <SelectTrigger>
              <SelectValue placeholder="Select mood" />
            </SelectTrigger>
            <SelectContent>
              {moods.map((mood) => (
                <SelectItem key={mood} value={mood}>
                  {mood}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="language" className="flex items-center gap-2">
            <Globe className="w-4 h-4" /> Language
          </Label>
          <Select name="language" defaultValue={languages[0]}>
            <SelectTrigger>
              <SelectValue placeholder="Select language" />
            </SelectTrigger>
            <SelectContent>
              {languages.map((language) => (
                <SelectItem key={language} value={language}>
                  {language}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button
          type="submit"
          className="w-full"
          disabled={isLoading || isSubmitting}
        >
          {isLoading || isSubmitting ? "Generating Song..." : "Generate Song"}
        </Button>
      </form>
    </Card>
  );
};

export default SongGenerationForm;
