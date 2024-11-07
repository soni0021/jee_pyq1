// src/backend/models/Chemistry.js
import mongoose from 'mongoose';

const chemistrySchema = new mongoose.Schema({
  chapter: {
    type: String,
    required: true,
  },
  questions: [
    {
      question: { type: String, required: true },
      options: [String],
      correct_answer: { type: String, required: true },
    },
  ],
});

const Chemistry = mongoose.model('Chemistry', chemistrySchema);

export default Chemistry;