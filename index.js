const express = require('express');
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// ======== In-memory data source ========
let users = [
    { id: "1", firstName: "Anshika", lastName: "Agarwal", hobby: "Teaching" },
    { id: "2", firstName: "Bharat", lastName: "Jagoar", hobby: "Coding" }
]; 


// POST validation — requires all fields
function validateNewUser(req, res, next) {
    const { firstName, lastName, hobby } = req.body;
    if (!firstName || !lastName || !hobby) {
        return res.status(400).json({
            error: "Missing required fields: firstName, lastName, hobby"
        });
    }
    next();
}

// PUT validation — allows partial updates
function validateUpdateUser(req, res, next) {
    console.log("windows update ")
    const allowedFields = ["firstName", "lastName", "hobby","id"];
    const bodyKeys = Object.keys(req.body);
    console.log(bodyKeys)
    if (bodyKeys.length === 0) {
        return res.status(400).json({ error: "At least one field is required to update" });
    }

    const invalidFields = bodyKeys.filter(key => !allowedFields.includes(key));
    if (invalidFields.length > 0) {
        return res.status(400).json({
            error: `Invalid field(s): ${invalidFields.join(", ")}`
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


// POST /user – Add a new user (requires all fields)
app.post('/user', validateNewUser, (req, res) => {
    const newUser = {
        id: (users.length + 1).toString(),
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        hobby: req.body.hobby
    };
    users.push(newUser);
    res.status(201).json(newUser);
});

// PUT /user/:id – Partial update allowed
app.put('/user/:id', validateUpdateUser, (req, res) => {
    const index = users.findIndex(u => u.id === req.params.id);
    console.log("fdass")
    if (index === -1) {
        return res.status(404).json({ error: "User not found" });
    }

    users[index] = { ...users[index], ...req.body }; // merge old + new data
    res.status(200).json(users[index]);
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