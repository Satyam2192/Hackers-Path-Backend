const mongoose = require("mongoose");

const taskInfoSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  hint: String,
  questionNo: {
    type: Number,
    required: true,
  },
  correct: Boolean,
  extraPoints: {
    type: Number,
    default: 0,
  },
  attempts: {
    type: Number,
    default: 0,
  },
  submission: String,
  noAnswer: Boolean,
  answerDesc: String,
  correctAnswer: {
    type: String,
    default: "ok",
  },
});

const questionSchema = new mongoose.Schema({
  questionNo: {
    type: Number,
    required: true,
  },
  question: {
    type: String,
    required: true,
  },
  hint: String,
});

const taskSchema = new mongoose.Schema({
  taskTitle: {
    type: String,
    required: true,
  },
  taskDesc: String,
  taskType: {
    type: String,
    enum: ["none", "vm"],
  },
  taskNo: {
    type: Number,
    required: true,
  },
  taskCreated: {
    type: Date,
    default: Date.now,
  },
  taskDeadline: Date,
  tasksInfo: [taskInfoSchema],
  uploadId: String,
  questions: [questionSchema],
});

const moduleSchema = new mongoose.Schema({
  success: Boolean,
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  data: [taskSchema],
  totalTasks: {
    type: Number,
    default: 0,
  },
  image: {
    type: String,
    required: true,
  },
  containsStaticSites: Boolean,
});

module.exports = mongoose.model("Module", moduleSchema);