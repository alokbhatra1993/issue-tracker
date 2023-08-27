const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mongoose = require("mongoose");
const port = process.env.PORT || 3000; // Use the PORT environment variable if set, or default to 3000

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

// Sample data to simulate projects (you can use a database in a real application)
let projects = [];
let issues = [];

// Home Page - Show a list of projects
app.get("/", (req, res) => {
  res.render("home", { projects });
});

// Create Project Page - Accept project details
app.get("/create-project", (req, res) => {
  res.render("create-project");
});

app.get("/create-issue", (req, res) => {
  const projectId = req.query.projectId;

  res.render("create-issue", { projectId });
});

app.get("/projectDetail", (req, res) => {
  const projectId = req.query.projectId;
  console.log({ projectId });
  console.log("PROJECT DETAILS",{issues , projects , projectId});
  res.render("projectDetail", {
    issues: issues.filter((issue) => {return  issue.projectId===projectId}),
    // issues,
    projects,
    projectId,
  });
});

app.post("/create-issue", (req, res) => {
  const id = issues.length;
  const title = req.body.title;
  const description = req.body.description;
  const labels = req.body.labels;
  const author = req.body.author;
  const projectId = req.body.projectId;
  issues.push({
    id,
    title,
    description,
    labels,
    author,
    projectId,
  });
  console.log({issues , projects});
  res.redirect(`/projectDetail?projectId=${projectId}`);

});

app.post("/create-project", (req, res) => {
  const { name, description, author } = req.body;
  const projectLength = projects.length;
  console.log({ projectLength });
  const newProject = { _id: projectLength, name, description, author };
  projects.push(newProject);
  res.redirect("/");
});

function connectToDb() {
  mongoose
    .connect(
      "mongodb+srv://alok1993:Linux1998@cluster0.kzdim.mongodb.net/issue-tracker",
      { useNewUrlParser: true, useUnifiedTopology: true }
    )
    .then(() => {
      console.log("Connected to MongoDB");
      // Start the server
      app.listen(port, () => {
        console.log(`Server running on port ${port}`);
      });
    })
    .catch((err) => console.error(err));
}

connectToDb();
