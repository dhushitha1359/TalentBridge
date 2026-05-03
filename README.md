# Talent Bridge

Talent Bridge is a full-stack job portal web application that allows users to register, log in, browse job listings, and apply for jobs. It is built using React for the frontend and Django REST Framework for the backend, with PostgreSQL as the database.

---

## Features

- User Registration (React form + API)
- Login & Authentication (Token-based)
- Job Listing API
- Apply Job Endpoint
- Prevent Duplicate Applications
- PostgreSQL Integration
- API Testing with Postman
- Frontend UI with Tailwind CSS and React Router

---

## Tech Stack

| Layer       | Technology                     |
|------------|-------------------------------|
| Frontend   | React (Vite)                  |
| UI         | Tailwind CSS                  |
| Routing    | React Router                  |
| Backend    | Django                        |
| API        | Django REST Framework         |
| Database   | PostgreSQL (Production), SQLite (Development) |
| Testing    | Postman                       |

---

## Project Structure


project-root/
│
├── backend/ # Django backend
├── frontend/ # React frontend
└── README.md


---

## Getting Started

### 1. Clone the repository


git clone https://github.com/your-username/talent-bridge.git

cd talent-bridge


---

## Backend Setup (Django)

### Navigate to backend folder


cd backend


### Create virtual environment


python -m venv venv


### Activate virtual environment

- Windows:

venv\Scripts\activate


- Mac/Linux:

source venv/bin/activate


### Install dependencies


pip install -r requirements.txt


### Run migrations


python manage.py migrate


### Start backend server


python manage.py runserver


Backend will run at:

http://127.0.0.1:8000/


---

## Frontend Setup (React)

### Navigate to frontend folder


cd frontend


### Install dependencies


npm install


### Run development server


npm run dev


Frontend will run at:

http://localhost:5173/


---

## API Endpoints

| Endpoint        | Method | Description              |
|----------------|--------|--------------------------|
| /register/     | POST   | Register new user        |
| /login/        | POST   | Authenticate user        |
| /jobs/         | GET    | Get all jobs             |
| /apply/        | POST   | Apply for a job          |

---

## Notes

- Ensure backend is running before starting frontend.
- Update API URLs in frontend if backend runs on a different port.
- PostgreSQL is used for production; SQLite can be used for development.
- Duplicate job applications are prevented at backend level.

---

## Future Enhancements

- User Profile with Resume Upload
- Employer Job Posting System
- Job Search and Filters
- Saved Jobs Feature
- Application Tracking Dashboard
- Role-based Authentication (Employer / Candidate)

---

## License



