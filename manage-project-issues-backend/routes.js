import express from "express";
import { addIssues, allData, deleteIssue, getSingleIssue, updateIssue } from "./modules/functions.js";

export const app = express();

app.get("/", (req, res) => {
  try {
    res.status(200).json({
      data: null,
      message: "api working",
      success: true,
    });
  } catch (error) {
    res.status(400).json({
      data: null,
      message: "error",
      success: false,
    });
  }
});

app.post("/api/issue", addIssues);
app.get("/api/allissue", allData);
app.put("/api/updateIssue/:id", updateIssue);
app.delete("/api/issue/:id", deleteIssue);
app.get("api/singleissue/:id", getSingleIssue);