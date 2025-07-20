
const express = require('express');
const dotenv = require('dotenv');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const path = require('path');

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

const genAI = new GoogleGenerativeAI("AIzaSyCLFa8MYfkEQp7QFdRzf0m6qYrRTsexQ5M");
const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/chat', async (req, res) => {
    const prompt = req.body.prompt;
    try {
        const result = await model.generateContent(prompt);
        const responseText = await result.response.text();
        res.json({ response: responseText });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ response: 'An error occurred while fetching the response.' });
    }
});

app.listen(port, () => console.log(`Server running at http://localhost:${port}`));
