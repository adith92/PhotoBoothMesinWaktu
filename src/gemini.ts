import { GoogleGenAI, Modality } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function generateBackground(era: string): Promise<string> {
  try {
    const prompt = `A highly detailed, beautiful background scenery depicting ${era}. Empty space in the center, perfect for a portrait background. High aesthetic, 4k.`;
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          { text: prompt },
        ],
      },
      config: {
        // @ts-ignore - SDK types might not have imageConfig fully exposed without casting, but we follow the docs
        imageConfig: {
          aspectRatio: "3:4",
        }
      }
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        const base64EncodeString = part.inlineData.data;
        return `data:image/png;base64,${base64EncodeString}`;
      }
    }
    throw new Error("No image data returned");
  } catch (err) {
    console.error("Error generating background:", err);
    throw err;
  }
}

export async function generateCaricaturePortrait(faceDataUrl: string, era: string): Promise<string> {
  try {
    const base64Data = faceDataUrl.split(',')[1];
    const prompt = `Transform this person into a smooth, highly detailed caricature portrait. Set the background to be an authentic ${era} scene. The person's skin should be extremely smooth and flawless. Make it colorful, vibrant, and artistic. Do not include any borders or frames.`;
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            inlineData: {
              data: base64Data,
              mimeType: "image/png"
            }
          },
          { text: prompt },
        ],
      },
      config: {
        // @ts-ignore
        imageConfig: {
          aspectRatio: "3:4",
        }
      }
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    throw new Error("No image data returned");
  } catch (err) {
    console.error("Error generating caricature:", err);
    throw err;
  }
}

export async function generateMoodMusic(mood: string): Promise<string> {
  try {
    const prompt = `Generate a 30-second cinematic and emotional track that captures a ${mood} mood perfectly.`;
    const response = await ai.models.generateContentStream({
      model: "lyria-3-clip-preview",
      contents: prompt,
    });

    let audioBase64 = "";
    let mimeType = "audio/wav";

    for await (const chunk of response) {
      const parts = chunk.candidates?.[0]?.content?.parts;
      if (!parts) continue;
      for (const part of parts) {
        if (part.inlineData?.data) {
          if (!audioBase64 && part.inlineData.mimeType) {
            mimeType = part.inlineData.mimeType;
          }
          audioBase64 += part.inlineData.data;
        }
      }
    }
    
    if (!audioBase64) throw new Error("No audio generated");

    const binary = atob(audioBase64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
        bytes[i] = binary.charCodeAt(i);
    }
    const blob = new Blob([bytes], { type: mimeType });
    return URL.createObjectURL(blob);
  } catch (err) {
    console.error("Error generating music:", err);
    throw err;
  }
}
