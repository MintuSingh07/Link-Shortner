const express = require("express");
const mongoose = require("mongoose");
const URL = require("./url"); // Importing URL model
const PORT = 8001;
const app = express();

app.use(express.json());

mongoose.connect("mongodb://localhost:27017/short_url")
    .then(() => console.log("DB connected"))
    .catch((err) => console.log(`Error is: ${err}`));

function generateRandomString() {
    let result = '';
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
    const length = 8;

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters[randomIndex];
    }

    return result;
}

app.post("/url", async (req, res) => {
    const body = req.body.url;
    const shortId = generateRandomString();
    try {
        await URL.create({
            shortId,
            originalUrl: body
        });
        res.status(200).json({ message: "Success", shortId, originalUrl: body });
    } catch (error) {
        res.status(400).json({ error: `Error is ${error}` });
    }
});

app.get("/", async (req, res) => {
    const shortId = req.query.shortId;

    try {
        const entry = await URL.findOne({ shortId });
        if (!entry) {
            return res.status(404).json({ error: "Short URL not found" });
        }
        return res.redirect(entry.originalUrl);
    } catch (error) {
        res.status(500).json({ error: `Error is ${error}` });
    }
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));