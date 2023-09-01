import fs, { writeFile } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = "./database.txt";
const encoding = "utf8";
let obj = {
  id: Number,
  projectName: String,
  projectTitle: String,
  projectDesc: String,
  priority: Number,
  lastUpdated: String,
  added: String,
};

export const addIssues = (request, response) => {
  try {
    let i = 0;
    let data;
    data = txtReadFile(filePath, encoding);
    i = data.length;
    i += 1;
    obj.id = i;
    (obj.projectName = request.body.projectName),
      (obj.projectTitle = request.body.projectTitle),
      (obj.projectDesc = request.body.projectDesc),
      (obj.priority = request.body.priority),
      obj.lastUpdated = new Date().toLocaleString("en-us", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      }),
      (obj.added = new Date().toLocaleString("en-us", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      }));
    data = [...data, obj];
    writeTxtFile(filePath, data);
    response.status(200).json({
      data: null,
      message: "issue added",
      success: true,
    });
  } catch (error) {
    response.status(400).json({
      data: null,
      message: "issue cannot aaded",
      success: false,
    });
    console.log(error);
  }
};

export const allData = (req, res) => {
  try {
    const data = txtReadFile(filePath, encoding);
    res.status(200).json({
      data: data,
      message: "all issue",
      success: true,
    });
  } catch (error) {
    res.status(400).json({
      data: null,
      message: "error in getting issues",
      success: false,
    });
    console.log(error);
  }
};

export const updateIssue = (req, res) => {
    try {
      const { id } = req.params;
      const updateIssue = req.body
        let data = txtReadFile(filePath, encoding);
        let issue = data.find((item) => item.id.toString() === id);
        if (issue) {
          for(let item of Object.keys(updateIssue)){
            issue[item] = updateIssue[item];
          }
          issue = {...issue, lastUpdated: new Date().toLocaleString("en-us", {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          })}
          data.map((item) => item.id === issue.id ? {...item, issue} : {...item});
          writeTxtFile(filePath, data);
        }
        res.status(200).json({
          data: null,
          message: "updated successfully",
          success: true,
        });
    } catch (error) {
      res.status(400).json({
        data: null,
        message: "cannot update",
        success: false,
      });
    }
}

export const deleteIssue = (req, res) => {
  try {
    const { id } = req.params;
    let data = txtReadFile(filePath, encoding);
    let index = data.findIndex((item) => item.id.toString() === id);
    if (index > -1) {
      data.splice(index, 1);
      writeTxtFile(filePath, data);
    }
    res.status(200).json({
        data: data,
        message: "issue deleted",
        success: true,
      });
  } catch (error) {
    res.status(400).json({
        data: null,
        message: "cannot find issue",
        success: false,
      });
  }
};

export const getSingleIssue = (req, res) => {
  try {
    const { id } = req.params;
    let data = txtReadFile(filePath, encoding);
    let issue = data.find((item) => item.id.toString() === id);
    if (issue) {
      res.status(200).json({
        data: null,
        message: "Single Issue",
        success: true,
      });
    }
  } catch (error) {
    res.status(400).json({
      data: null,
      message: "cannot fetch the issue",
      success: false,
    });
  }
}

const txtReadFile = (filePath, encoding) => {
  try {
    const data = fs.readFileSync(path.resolve(__dirname, filePath), encoding);
    const obj = JSON.parse(data);
    return obj;
  } catch (error) {
    console.log(error);
  }
};

const writeTxtFile = (filePath, data) => {
  fs.writeFileSync(
    path.resolve(__dirname, filePath),
    JSON.stringify(data),
    (err) => {
      if (err) {
        console.error(err);
      }
    }
  );
};
