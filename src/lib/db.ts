import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://okhldbdqlxecqpqglfpy.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9raGxkYmRxbHhlY3FwcWdsZnB5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzkxNzk5MDMsImV4cCI6MjA1NDc1NTkwM30.oV7eawaTRFeWJ_L82die5KimVQzhbKHCajxTuIAjO48";

export const supabase = createClient(supabaseUrl, supabaseKey);

export interface SavedSong {
  id?: string;
  user_id: string;
  title: string;
  lyrics: string;
  genre: string;
  duration: string;
  language: string;
  mood: string;
  dedicated_to: string;
  created_at?: string;
}

export async function saveSong(
  song: Omit<SavedSong, "id" | "user_id" | "created_at">,
) {
  try {
    const { data: user } = await supabase.auth.getUser();
    if (!user.user) throw new Error("User not authenticated");

    const { data, error } = await supabase
      .from("songs")
      .insert([
        {
          user_id: user.user.id,
          title: song.title,
          lyrics: song.lyrics,
          genre: song.genre,
          duration: song.duration,
          language: song.language,
          mood: song.mood,
          dedicated_to: song.dedicated_to,
        },
      ])
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error saving song:", error);
    throw error;
  }
}

export async function getSavedSongs() {
  try {
    const { data: user } = await supabase.auth.getUser();
    if (!user.user) throw new Error("User not authenticated");

    const { data, error } = await supabase
      .from("songs")
      .select("*")
      .eq("user_id", user.user.id)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error fetching songs:", error);
    throw error;
  }
}
