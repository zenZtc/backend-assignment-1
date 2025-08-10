const express = require('express');
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// ======== In-memory data source ========
let users = [
    { id: "1", firstName: "Anshika", lastName: "Agarwal", hobby: "Teaching" },
    { id: "2", firstName: "Bharat", lastName: "Jagoar", hobby: "Coding" }
]; 


// ======== Middleware: Request Logger ========
app.use((req, res, next) => {
    const start = Date.now();
    res.on('finish', () => {
        const elapsed = Date.now() - start;
        console.log(`${req.method} ${req.originalUrl} -> ${res.statusCode} (${elapsed}ms)`);
    });
    next();
});

// ======== Middleware: Validation for POST & PUT ========
function validateUser(req, res, next) {
    const { firstName, lastName, hobby } = req.body;
    if (!firstName || !lastName || !hobby) {
        return res.status(400).json({
            error: "Missing required fields: firstName, lastName, hobby"
        });
    }
    next();
}



// GET /users – Fetch all users
app.get('/users', (req, res) => {
    res.status(200).json(users);
});


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});