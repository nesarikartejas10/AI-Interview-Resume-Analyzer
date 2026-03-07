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

  const schema = zodToJsonSchema(interviewReportSchema, {
    target: "openApi3",
    $refStrategy: "none",
  });

  delete schema.$schema;

  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash-lite",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: schema,
    },
  });

  return JSON.parse(response.text);
};
