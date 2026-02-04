# TaskFlow – Full Stack Task Management Application

TaskFlow is a modern full-stack task management web application that allows users to securely manage tasks with authentication, CRUD operations, and a clean SaaS-style user interface.  
The project is built to demonstrate real-world frontend–backend integration, authentication, and scalable architecture.

---

## 🚀 Tech Stack

### Frontend
- React.js (Vite)
- Tailwind CSS
- React Router DOM
- Axios
- Lucide Icons

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- bcrypt.js
- dotenv

---

## 📁 Project Structure
    TaskFlow/
    ├── frontend/
    │ ├── src/
    │ ├── package.json
    │ └── vite.config.js
    ├── backend/
    │ ├── controllers/
    │ ├── routes/
    │ ├── middleware/
    │ ├── models/
    │ ├── server.js
    │ └── package.json
    ├── README.md
    └── .gitignore


---

## ⚙️ Setup Instructions

### 1️⃣ Clone the Repository

    git clone https://github.com/Pavani-Choppa/TaskFlow.git
    cd TaskFlow

2️⃣ Backend Setup

    cd backend
    npm install
    
    Create .env file inside backend/
    PORT=5000
    MONGO_URI=mongodb://127.0.0.1:27017/taskflow
    JWT_SECRET=your_jwt_secret
    
    Start Backend Server
    npm run dev


Backend runs at:

    http://localhost:5000

3️⃣ Frontend Setup

    cd ../frontend
    npm install
    npm run dev


Frontend runs at:

    http://localhost:5173

🔐 Authentication Flow

    User registers or logs in
    
    Backend returns a JWT token
    
    Token is stored in localStorage
    
    Protected routes use token for authorization
    
    User-specific tasks are fetched securely

📮 API Endpoints (v1)

  Base URL:   
  
    http://localhost:5000/api/v1
  
  | Method | Endpoint     | Description                |
  | ------ | ------------ | -------------------------- |
  | GET    | /            | Health check               |
  | POST   | /auth/signup | Register user              |
  | POST   | /auth/login  | Login user                 |
  | GET    | /me          | Get logged-in user profile |
  | PUT    | /me          | Update profile             |
  | POST   | /tasks       | Create task                |
  | GET    | /tasks       | Fetch all tasks            |
  | PUT    | /tasks/:id   | Update task                |
  | DELETE | /tasks/:id   | Delete task                |


Authorization Header

    Authorization: Bearer <JWT_TOKEN>

👤 Demo Credentials (Optional)
  
    Email: test@example.com
    Password: Test@123
      
    (You can also create a new user via the Signup page.)

📦 Postman Collection

    A Postman collection is included to test all APIs:
    
    Import the JSON file into Postman
    
    Set JWT token in Postman Environment
    
    Test all secured endpoints easily

🧠 How Would You Scale This for Production?

    Deploy frontend on Vercel / Netlify
    
    Deploy backend on AWS / Render
    
    Use HTTPS with secure cookies
    
    Strict CORS policy
    
    Environment variables managed via secret manager
    
    MongoDB indexing for faster queries
    
    Redis caching for frequent reads
    
    Rate limiting and request validation
    
    Centralized logging and monitoring

👨‍💻 Author

    Pavani Choppa
    
    B.Tech CSE – Full Stack Developer
    
    GitHub: https://github.com/Pavani-Choppa/
    
🔧 How would you scale this for production?

    To scale TaskFlow for production, I would deploy the frontend on Vercel or Netlify and the backend on AWS or Render with HTTPS enabled. Environment variables would be managed using a secure secrets manager instead of .env files. I would enforce strict CORS policies to allow only trusted frontend origins. MongoDB indexes would be added on frequently queried fields like userId and status to improve performance. Redis would be introduced for caching user sessions and frequently accessed task data. Rate limiting and request validation would be added to protect APIs. Finally, centralized logging and monitoring would be set up to track errors and performance in real time.

⭐ If you like this project, consider giving it a star!




