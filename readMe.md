# 📝 To-Do List Web Application

A simple and interactive To-Do List application built using HTML, CSS, JavaScript (frontend), and Express.js with MongoDB (backend). This project allows users to create, read, update, and delete (CRUD) tasks. The app is structured into two pages: a main task management page and an individual task editing page.

---

## 📑 Table of Contents

-   [Features](#features)
-   [Project Structure](#project-structure)
-   [Technologies Used](#technologies-used)
-   [Getting Started](#getting-started)
-   [Usage](#usage)
-   [API Endpoints](#api-endpoints)
-   [Contributing](#contributing)
-   [License](#license)

---

## ✨ Features

-   **Add Task**: Create new tasks with a name and completion status.
-   **Delete Task**: Remove tasks from the list.
-   **Edit Task**: Modify existing task details and toggle their completion status.
-   **View Tasks**: See all tasks with their current status.

---

## 📁 Project Structure

/public /styles - main.css # Basic styling for the to-do list UI

index.html # Frontend HTML for task management
task.html # Frontend HTML for task editing /src
app.js # Express server configuration
controllers
tasks.js # Task API controller
models
Task.js # Task model schema (MongoDB)
routes
tasks.js # Task routes (CRUD endpoints) /config
db.js # MongoDB connection configuration .gitignore README.md
yaml
Copy code

---

## 🛠 Technologies Used

-   **Frontend**: HTML, CSS, JavaScript
-   **Backend**: Node.js, Express.js
-   **Database**: MongoDB
-   **API Client**: Axios for HTTP requests

---

## 🚀 Getting Started

### 1. Clone the repository:

```bash
git clone https://github.com/yourusername/todo-app.git
cd todo-app
2. Install dependencies:
bash
Copy code
npm install
3. Set up environment variables:
Create a .env file in the root directory with the following:

PORT=5000
4. Run the app:
npm start
The app will run on http://localhost:5000.

🔧 Usage
Adding a Task:
Navigate to the main page (index.html) and input a new task in the form.
Editing a Task:
Click the edit icon on any task to go to the task edit page (task.html).
Deleting a Task:
Click the trash icon next to a task to remove it.
📬 API Endpoints
GET /api/v1/task - Get all tasks
GET /api/v1/task/:id - Get a single task by ID
POST /api/v1/task - Add a new task
PATCH /api/v1/task/:id - Update a task by ID
DELETE /api/v1/task/:id - Delete a task by ID
🤝 Contributing
Contributions are welcome! Feel free to submit a pull request.

📄 License
This project is licensed under the MIT License.

yaml
Copy code

---

This `README.md` file should now look great in a black screen environment, such as VSCode with a dark theme.
```
