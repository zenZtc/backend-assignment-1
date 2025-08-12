# RESTful API with Node.js and Express

This project is a simple RESTful API built using **Node.js** and **Express** for managing a list of users.  
It supports basic CRUD operations with middleware for request logging, validation, and error handling.  
The data is stored in-memory (array) for simplicity.

---

## Requirements
- Node.js v14+ installed
- npm (comes with Node.js)
- Postman or Thunder Client (for testing)

---
git git
## Installation

1. Clone this repository or download the ZIP:
   ```bash
   git clone https://github.com/zenZtc/backend-assignment-1.git
   ```
   Or extract the ZIP to a folder.

2. Navigate into the project folder:
   ```bash
   cd emails
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

---

## Running the Server

1. Start the server with:
   ```bash
   npm start
   ```
   This will run the server using `nodemon` for auto-reload on changes.

2. The API will be available at:
   ```
   http://localhost:3000
   ```

---

## API Endpoints

### Get all users
```
GET /users
```

### Get user by ID
```
GET /users/:id
```

### Create a new user
```
POST /user
Body (JSON):
{
  "firstName": "John",
  "lastName": "Doe",
  "hobby": "Reading"
}
```

### Update a user (partial update allowed)
```
PUT /user/:id
Body (JSON):
{
  "hobby": "Gaming"
}
```

### Delete a user
```
DELETE /user/:id
```

---

## Notes
- **POST** requires all fields (`firstName`, `lastName`, `hobby`).
- **PUT** allows updating one or more fields.
- Data is reset each time the server restarts.

---
