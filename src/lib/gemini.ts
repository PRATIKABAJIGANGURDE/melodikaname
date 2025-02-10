import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("AIzaSyBtpueEcgRoRaTKjBpDy8KLZh9RB8v0480");

async function generateSongLyrics(params) {
  const prompt = `Your task is to compose a complete, original, and emotionally engaging song using the details provided. Please follow these instructions:

1. **Dedication:** Craft the song as a personal dedication to ${params.dedicationName}. The lyrics should reflect warmth and a unique personal touch.
2. **Genre:** Ensure the song embodies the musical characteristics and style of ${params.genre}. Use imagery, language, and themes that are consistent with this genre.
3. **Vocal Style:** Tailor the lyric phrasing and structure for ${params.vocalStyle} vocals, taking into account the nuances and tonal qualities of this style.
4. **Mood:** Capture and sustain an overall mood of ${params.mood} throughout the song. The emotions should be clear and consistent.
5. **Language:** Write the lyrics in  ${params.language}.
6. **Structure:** Organize the song into clear sections that include well-defined verses and a memorable, catchy chorus. Optionally, include a bridge if it fits naturally with the progression of the song.
7. **Content:** The final lyrics should tell a compelling story or convey deep emotions. They must be poetic, accessible, original, and free from any explicit content.
Format the song with clear sections labeled "Verse 1:", "Chorus:", etc.`;

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 2000,
      },
      safetySettings: [
        {
          category: "HARM_CATEGORY_HARASSMENT",
          threshold: "BLOCK_MEDIUM_AND_ABOVE",
        },
        {
          category: "HARM_CATEGORY_HATE_SPEECH",
          threshold: "BLOCK_MEDIUM_AND_ABOVE",
        },
        {
          category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
          threshold: "BLOCK_MEDIUM_AND_ABOVE",
        },
        {
          category: "HARM_CATEGORY_DANGEROUS_CONTENT",
          threshold: "BLOCK_MEDIUM_AND_ABOVE",
        },
      ],
    });

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
