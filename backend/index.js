const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// MAIN ROUTE (test)
app.get("/", (req, res) => {
    res.send("Backend Running 🚀");
});

// CONNECT TO AI (Flask)
app.post("/check-url", async (req, res) => {
    const url = req.body.url;

    try {
        const response = await fetch("http://127.0.0.1:5001/analyze-url", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ url })
        });

        const data = await response.json();
        res.json(data);

    } catch (err) {
        console.error(err);
        res.json({ risk: 0 });
    }
});

// START SERVER
app.listen(3000, () => {
    console.log("Backend running on http://127.0.0.1:3000 🚀");
});