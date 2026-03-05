import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

export interface RefineOptions {
  addComments: boolean;
  commentDensity: 'low' | 'medium' | 'high';
  commentStyle: 'professional' | 'casual' | 'technical';
  commentComplexity: 'concise' | 'detailed';
  commentLanguage: 'English' | 'Chinese' | 'Spanish' | 'French' | 'Japanese';
}

export async function refineCode(code: string, options: RefineOptions): Promise<string> {
  const systemInstruction = `
    You are a professional code refiner. 
    Your task is to optimize variable names for readability without changing any algorithms, logic, structure, or definitions.
    
    If commenting is enabled, add comments based on the user's specified density, style, complexity, and language.
    
    Constraints:
    - STRICTLY no algorithm/logic changes.
    - Keep the original structure and definition style.
    - Only rename variables to be more descriptive.
    - Add comments ONLY if requested.
    
    User Options:
    - Add Comments: ${options.addComments}
    - Comment Density: ${options.commentDensity}
    - Comment Style: ${options.commentStyle}
    - Comment Complexity: ${options.commentComplexity}
    - Comment Language: ${options.commentLanguage}
  `;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: code,
    config: {
      systemInstruction,
    },
  });

  return response.text || "Error: Could not refine code.";
}
