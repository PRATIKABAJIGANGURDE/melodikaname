export interface SongGenerationParams {
  dedicationName: string;
  genre: string;
  vocalStyle: string;
  mood: string;
  language: string;
}

export interface GeneratedSong extends SongGenerationParams {
  lyrics: string;
  title: string;
  duration: string;
}
