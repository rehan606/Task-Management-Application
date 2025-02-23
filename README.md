# Quick Task

## Overview
Quick Task is a full-stack Task Management application designed to help users efficiently organize and manage their tasks. The application features a drag-and-drop task management system, task ordering functionality, and real-time updates using Firebase.

## Features
- **Drag & Drop Tasks** – Easily rearrange tasks with a drag-and-drop interface.
- **Task Ordering** – Prioritize tasks by reordering them.
- **User Authentication** – Secure login and signup using Firebase Authentication.
- **Real-time Updates** – Synchronize tasks across devices with Firebase.
- **Task Categories** – Organize tasks into different categories.
- **Responsive Design** – Fully optimized for desktop and mobile.

## Tech Stack
### Frontend:
- React.js
- TailwindCSS
- Firebase Authentication

### Backend:
- Node.js
- Express.js
- MongoDB (Mongoose)

## Installation
Follow these steps to set up the project locally:

### Prerequisites:
Ensure you have the following installed:
- Node.js
- MongoDB (locally or a cloud instance like MongoDB Atlas)
- Firebase account for authentication setup

### Steps:
#### 1. Clone the repository:
```sh
git clone https://github.com/your-username/quick-task.git
cd quick-task
```

#### 2. Install dependencies:
##### Install frontend dependencies:
```sh
cd client
npm install
```
##### Install backend dependencies:
```sh
cd ../server
npm install
```

#### 3. Set up environment variables:
Create a `.env` file in the `server` directory and configure:
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
FIREBASE_API_KEY=your_firebase_api_key
FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
```

#### 4. Start the application:
##### Start the backend server:
```sh
cd server
npm run dev
```
##### Start the frontend application:
```sh
cd client
npm start
```

## Dependencies
### Frontend:
- `react`
- `react-dom`
- `react-dnd`
- `react-dnd-html5-backend`
- `tailwindcss`
- `firebase`

### Backend:
- `express`
- `mongoose`
- `cors`
- `dotenv`
- `jsonwebtoken`
- `bcryptjs`
- `nodemon` (for development)

## Contribution
Feel free to contribute! Fork the repo, make your changes, and submit a pull request.

## License
This project is licensed under the MIT License.

