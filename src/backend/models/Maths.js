// models/Maths.js
import mongoose from 'mongoose';

const mathsSchema = new mongoose.Schema({
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

const Maths = mongoose.model('Maths', mathsSchema);

export default Maths;