# Task Manager - Frontend Client

## Project Description
A responsive React-based interface for the Task Manager application. 
This client communicates with a cloud-hosted Node.js API to provide 
secure user registration, login, and real-time task management.

## Author
- **Name:** Bokao Junior Matende
- **Student ID:** 24019723
- **Institution:** Botswana International University of Science and Technology (BIUST)

## Tech Stack
- **Library:** React.js (Vite)
- **Routing:** React Router DOM
- **API Communication:** Axios / Fetch API
- **State Management:** React Hooks (useState, useEffect)
- **Deployment:** Render (Static Site)

## Setup Instructions

1. Clone the repository:
   git clone https://github.com/juniorbokao2006/react-midterm-project.git

2. Install dependencies:
   npm install

3. Update the API URL:
   Ensure `src/services/api.js` points to:
   `https://midterm-backend-iif7.onrender.com/api`

4. Run the application:
   npm run dev

## Key Features
- **Stateless Auth:** Securely stores JWT in `localStorage`.
- **Protected Routes:** Prevents unauthorized access to the dashboard.
- **Mobile Responsive:** Optimized for both desktop and mobile viewing.
- **Error Handling:** Dynamic alerts for failed logins or server timeouts.

## Live URL
**Frontend App:** https://react-midterm-project-82tv.onrender.com

## Technical Presentation Notes
- **Decoupled Architecture:** The frontend is entirely independent of the backend, communicating only through a RESTful API.
- **Performance:** Used Vite for fast bundling and optimized build sizes.
- **UX Design:** Implemented loading states to manage user expectations during backend "cold starts."