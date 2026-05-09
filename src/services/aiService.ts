import { GoogleGenAI, Type } from "@google/genai";

let ai: GoogleGenAI | null = null;
function getAi() {
  if (!ai) {
    if (!process.env.GEMINI_API_KEY) {
      console.warn("No GEMINI_API_KEY found, using mock responses.");
      return null;
    }
    ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  }
  return ai;
}

export async function analyzeBodyImage(base64Image: string) {
  const genai = getAi();
  if (!genai) {
    // Return mock data after 2 seconds
    return new Promise((resolve) =>
      setTimeout(
        () =>
          resolve({
            height: 165,
            weight: 58,
            body_type: "Rectangle",
            skin_tone: "Medium Warm",
            analysis_text:
              "Bentuk tubuh kamu termasuk Rectangle dengan proporsi bahu ke pinggul yang seimbang. Kaki tampak jenjang yang cocok dengan celana berpotongan lurus.",
            measurements: {
              chest: 90,
              waist: 76,
              shoulder: 42,
              leg_length: 95,
            },
          }),
        2000,
      ),
    );
  }

  try {
    const response = await genai.models.generateContent({
      model: "gemini-3.1-pro-preview",
      contents: {
        parts: [
          {
            text: "Kamu adalah AI Fashion Stylist profesional. Analisis foto full body user ini. Tentukan: estimasi tinggi, berat badan, body_type (contoh: Athletic, Pear, Rectangle, dsb), skin_tone (contoh: Medium Warm, Cool tone, dsb), teksh analysis_text yang menjelaskan dengan bahasa Indonesia yang ramah ala Gen-Z, dan measurements (estimasi lingkar dada 'chest' (cm), pinggang 'waist' (cm), lebar bahu 'shoulder' (cm), dan panjang celana 'leg_length' (cm)).",
          },
          {
            inlineData: {
              data: base64Image.split(",")[1],
              mimeType: "image/jpeg",
            },
          },
        ],
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            height: {
              type: Type.INTEGER,
              description: "Estimasi tinggi badan dalam cm",
            },
            weight: {
              type: Type.INTEGER,
              description: "Estimasi berat badan dalam kg",
            },
            body_type: { type: Type.STRING, description: "Bentuk tubuh" },
            skin_tone: { type: Type.STRING, description: "Warna kulit" },
            analysis_text: {
              type: Type.STRING,
              description: "Penjelasan panduan fashion berdasarkan foto ini.",
            },
            measurements: {
              type: Type.OBJECT,
              properties: {
                chest: { type: Type.INTEGER },
                waist: { type: Type.INTEGER },
                shoulder: { type: Type.INTEGER },
                leg_length: { type: Type.INTEGER },
              },
            },
          },
          required: [
            "height",
            "weight",
            "body_type",
            "skin_tone",
            "analysis_text",
            "measurements",
          ],
        },
      },
    });

    const text = response.text || "{}";
    return JSON.parse(text);
  } catch (error) {
    console.error("AI Error:", error);
    throw error;
  }
}

export async function recommendOutfitSelection(
  bodyProfile: any,
  eventContext: string,
  stylePref: string,
) {
  const genai = getAi();
  if (!genai) {
    return (
      "Berdasarkan analisis proporsi tubuh dan acara " +
      eventContext +
      ", gaya " +
      stylePref +
      " sangat cocok untukmu! Pilih outfit yang tidak terlalu ketat namun mempertegas siluet bahu."
    );
  }

  try {
    const response = await genai.models.generateContent({
      model: "gemini-3.1-pro-preview",
      contents: `Kamu adalah Fashion Stylist AI. Berdasarkan body type: ${bodyProfile.body_type}, skin tone: ${bodyProfile.skin_tone}, dan event: ${eventContext} serta style kesukaan: ${stylePref}. Berikan insight fashion singkat (maks 2 kalimat) kenapa outfit tertentu akan cocok untuk pengguna ini. Gunakan bahasa Indonesia kasual yang ramah Gen-Z.`,
    });
    return response.text;
  } catch (e) {
    console.error(e);
    return "Outfit ini sangat cocok dengan skin tone kamu untuk menonjolkan aura yang cerah dan modern!";
  }
}
