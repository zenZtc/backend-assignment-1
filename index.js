const express = require('express');
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// ======== In-memory data source ========
let users = [
    { id: "1", firstName: "Anshika", lastName: "Agarwal", hobby: "Teaching" },
    { id: "2", firstName: "Bharat", lastName: "Jagoar", hobby: "Coding" }
]; 

// GET /users – Fetch all users
app.get('/users', (req, res) => {
    res.status(200).json(users);
});


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});