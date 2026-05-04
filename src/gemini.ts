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

export async function generateCaricaturePortrait(faceDataUrl: string, era: string, style: string = '3D animated movie'): Promise<string> {
  try {
    const base64Data = faceDataUrl.split(',')[1];
    
    let prompt = '';
    if (style === 'Realistic Cinematic Photo') {
      prompt = `Create a highly realistic, cinematic photo-manipulation where this person's exact face is seamlessly face-swapped onto a character in a historically accurate ${era} scene. 
CRITICAL: Perform a realistic face swap with high fidelity. Preserve their exact natural skin tones, facial features, and expressions, but perfectly match the lighting, shadows, and environment of the ${era} scene. Make it look like a real photograph or movie still. Do not include any borders or frames.`;
    } else {
      prompt = `Create a hilarious, highly viral cartoon meme-style image where this person is transformed into a character in a completely random, wildly creative, and diverse ${era} scene. For example, if it's the dinosaur era, draw them as a cartoon caveman running from a T-Rex. Make the scene extremely dynamic and humorous! 

CRITICAL: Do NOT just paste the real face. You MUST redraw the person's face into a stylized ${style} character that perfectly matches the rest of the funny scene. Use the provided image strictly as a reference for their facial features, but fully synthesize and illustrate them into the whimsical ${style} art style. The final result should look like a fully illustrated cartoon meme. No borders or frames.`;
    }
    
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
