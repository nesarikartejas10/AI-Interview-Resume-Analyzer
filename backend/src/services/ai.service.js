import { GoogleGenAI } from "@google/genai";
import { config } from "../config/envConfig.js";

import { zodToJsonSchema } from "zod-to-json-schema";
import { interviewReportSchema } from "../schemas/interviewReport.schema.js";

const ai = new GoogleGenAI({
  apiKey: config.googleGenAiApiKey,
});

export const generateInterviewReport = async ({
  resume,
  jobDescription,
  selfDescription,
}) => {
  const prompt = `Generate an interview report for a candidate with the following details:
                        Resume: ${resume}
                        Self Description: ${selfDescription}
                        Job Description: ${jobDescription}
`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: zodToJsonSchema(interviewReportSchema),
    },
  });

  return JSON.parse(response.text);
};
