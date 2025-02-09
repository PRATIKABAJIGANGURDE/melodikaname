import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("AIzaSyBtpueEcgRoRaTKjBpDy8KLZh9RB8v0480");

async function generateSongLyrics(params) {
  const prompt = `Write a song with the following requirements:
- Dedicated to: ${params.dedicationName}
- Genre: ${params.genre}
- Vocal Style: ${params.vocalStyle}
- Mood: ${params.mood}
- Language: ${params.language}

Please format the song with clear verse and chorus sections.`;

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const lyrics = response.text();
    const title = `${params.mood} ${params.genre} Song for ${params.dedicationName}`;

    return {
      lyrics,
      title,
      ...params,
      duration: "3:30", // Placeholder duration
    };
  } catch (error) {
    console.error("Error generating lyrics:", error);
    throw new Error(error?.message || "Failed to generate lyrics");
  }
}

export { generateSongLyrics };
