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


// GET /users/:id – Fetch a specific user
app.get('/users/:id', (req, res) => {
    const user = users.find(u => u.id === req.params.id);
    if (!user) {
        return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
});


// POST /user – Add a new user
app.post('/user', validateUser, (req, res) => {
    const newUser = {
        id: (users.length + 1).toString(),
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        hobby: req.body.hobby
    };
    users.push(newUser);
    res.status(201).json(newUser);
});



// PUT /user/:id – Update an existing user
app.put('/user/:id', validateUser, (req, res) => {
    const userIndex = users.findIndex(u => u.id === req.params.id);
    if (userIndex === -1) {
        return res.status(404).json({ error: "User not found" });
    }
    users[userIndex] = { id: req.params.id, ...req.body };
    res.status(200).json(users[userIndex]);
});



// DELETE /user/:id – Delete a user
app.delete('/user/:id', (req, res) => {
    const userIndex = users.findIndex(u => u.id === req.params.id);
    if (userIndex === -1) {
        return res.status(404).json({ error: "User not found" });
    }
    const deletedUser = users.splice(userIndex, 1);
    res.status(200).json({ message: "User deleted successfully", deletedUser });
});



// ======== Start Server ========

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});