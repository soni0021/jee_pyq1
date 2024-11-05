// controllers/physicsController.js
import Physics from '../models/Physics.js';

// Get all chapters
export const getAllChapters = async (req, res) => {
    try {
        const chapters = await Physics.find().select('chapter -_id');
        res.json(chapters);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get questions by chapter
export const getQuestionsByChapter = async (req, res) => {
    try {
        const chapter = req.params.chapter;
        const data = await Physics.findOne({ chapter });
        if (!data) {
            return res.status(404).json({ message: 'Chapter not found' });
        }
        res.json(data.questions);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};