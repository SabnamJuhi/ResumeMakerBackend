const mongoose = require("mongoose");
const User = require("./authModal");

const projectSchema = new mongoose.Schema({
  projectDescription: String,
  projectName: String,
  projectTechnology: String,
  responsibilities: [String],
});

const workExperienceSchema = new mongoose.Schema({
  company: String,
  designation: String,
  startDates: String,
  endDates: String,
  projects: [projectSchema],
});
const skillSetSchema = new mongoose.Schema({
  technology: String,
  language: String,
  tools: String,
  databaseName: String,
  operatingSys: String,
  ideUsed: String,
  webServer: String,
  skills: [
    {
      value1: String,
      value2: String,
    },
  ],
});

const educationDetailsSchema = new mongoose.Schema({
  hQualification: String,
  university: String,
  passingYear: String, // Assuming this is a year string like 'YYYY'
});

const userSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  name: String,
  email: String,
  title: String,
  linkedln: String,
  mNumber: String,
  address: String,
  gender: String,
  mStatus: String,
  professionalSummary: [String],
  skillSet: skillSetSchema,
  educationDetails: educationDetailsSchema,
  workExp: [workExperienceSchema],
});

const userModel = mongoose.model("userdata", userSchema);

module.exports = userModel;
