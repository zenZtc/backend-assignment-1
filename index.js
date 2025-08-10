const express = require('express');
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});