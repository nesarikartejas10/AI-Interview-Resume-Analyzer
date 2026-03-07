import { createRequire } from "module";
const require = createRequire(import.meta.url);
const pdfParse = require("pdf-parse");

import { asyncHandler } from "../utils/asyncHandler.js";
import { generateInterviewReport } from "../services/ai.service.js";
import { InterviewReport } from "../models/interviewReport.model.js";
import createHttpError from "http-errors";

export const generateInterviewReportController = asyncHandler(
  async (req, res, next) => {
    if (!req.file) {
      return next(createHttpError(400, "Resume file is required"));
    }

    const resumeContent = await new pdfParse.PDFParse(
      Uint8Array.from(req.file.buffer),
    ).getText();

    const { selfDescription, jobDescription } = req.body;

    const interviewReportByAi = await generateInterviewReport({
      resume: resumeContent.text,
      jobDescription,
      selfDescription,
    });

    const interviewReport = await InterviewReport.create({
      user: req.user.id,
      resume: resumeContent.text,
      jobDescription,
      selfDescription,
      ...interviewReportByAi,
    });

    return res.status(201).json({
      success: true,
      message: "Interview report generated successfully",
      interviewReport,
    });
  },
);
