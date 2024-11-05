// seed/seed.js
import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import Physics from '../models/Physics.js';
import Chemistry from '../models/Chemistry.js';
import Maths from '../models/Maths.js';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../../.env') });
const uri ='mongodb+srv://devashishsoni2004:Soni%402004@cluster0.0f2jp.mongodb.net/user';

const connectDB = async () => {
    try {
        await mongoose.connect(uri);
        console.log('MongoDB Connected for Seeding');
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

const seedData = async () => {
    try {
        // Clear existing data
        await Promise.all([
            Physics.deleteMany(),
            Chemistry.deleteMany(),
            Maths.deleteMany(),
        ]);

        // Read JSON files
        const [physicsData, chemistryData, mathsData] = await Promise.all([
            JSON.parse(fs.readFileSync(path.join(__dirname, 'Physics.json'), 'utf8')),
            JSON.parse(fs.readFileSync(path.join(__dirname, 'Chemistry.json'), 'utf8')),
            JSON.parse(fs.readFileSync(path.join(__dirname, 'Maths.json'), 'utf8')),
        ]);

        // Insert data
        await Promise.all([
            Physics.insertMany(physicsData),
            Chemistry.insertMany(chemistryData),
            Maths.insertMany(mathsData),
        ]);

        console.log('Data Seeded Successfully');
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

connectDB().then(seedData);