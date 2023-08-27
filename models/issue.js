const mongoose = require('mongoose');

const issueSchema = new mongoose.Schema({
  projectId: mongoose.Schema.Types.ObjectId,
  title: String,
  description: String,
  labels: [String],
  author: String,
});

module.exports = mongoose.model('Issue', issueSchema);
