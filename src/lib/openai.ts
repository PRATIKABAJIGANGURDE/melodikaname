import OpenAI from "openai";

// For development, use a mock API key if the environment variable is not set
const openai = new OpenAI({
  apiKey:
    "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",
  baseURL: "https://api.tempolabs.ai/proxy",
  dangerouslyAllowBrowser: true,
});

export interface SongGenerationParams {
  dedicationName: string;
  genre: string;
  vocalStyle: string;
  mood: string;
  language: string;
}

export async function generateSongLyrics(params: SongGenerationParams) {
  const prompt = `Write a song with the following requirements:
- Dedicated to: ${params.dedicationName}
- Genre: ${params.genre}
- Vocal Style: ${params.vocalStyle}
- Mood: ${params.mood}
- Language: ${params.language}

Please format the song with clear verse and chorus sections.`;

  try {
    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "gpt-4",
      temperature: 0.7,
      max_tokens: 1000,
    });

    const lyrics = completion.choices[0]?.message?.content || "";
    const title = `${params.mood} ${params.genre} Song for ${params.dedicationName}`;

    return {
      lyrics,
      title,
      ...params,
      duration: "3:30", // Placeholder duration
    };
  } catch (error: any) {
    console.error("Error generating lyrics:", error);
    throw new Error(error?.message || "Failed to generate lyrics");
  }
}
