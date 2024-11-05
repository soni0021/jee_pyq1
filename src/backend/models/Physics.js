// models/Physics.js
import mongoose from 'mongoose';

const physicsSchema = new mongoose.Schema({
    chapter: {
        type: String,
        required: true
    },
    questions: [
        {
            question: { type: String, required: true },
            options: [String],
            correct_answer: { type: String, required: true }
        }
    ]
});

const Physics = mongoose.model('Physics', physicsSchema);

export default Physics;