

# zipPay - A basic version of Payment app like Paytm

zipPay is a full-stack application that mimics the functionality of PayTM, allowing users to send money to each other. This project demonstrates the implementation of a basic digital wallet system with user authentication and fund transfer capabilities.

## Features

- User authentication (signup and signin)
- View account balance
- Send money to other users
- Search for users on the platform

## Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication

### Frontend
- React
- React Router for navigation
- Tailwind CSS for styling

## Project Structure

The project is divided into two main parts:

1. Backend (API)
2. Frontend (React application)

### Backend Endpoints

- POST `/api/v1/user/signup`: Create a new user account
- POST `/api/v1/user/signin`: Authenticate a user
- PUT `/api/v1/user`: Update user information
- GET `/api/v1/user/bulk`: Search for users
- GET `/api/v1/account/balance`: Get user's account balance
- POST `/api/v1/account/transfer`: Transfer money to another user

### Frontend Pages

- `/signup`: User registration page
- `/signin`: User login page
- `/dashboard`: Main dashboard showing balance and other users
- `/send`: Page to send money to other users

## Setup and Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/zipPay.git
   cd zipPay
   ```

2. Install dependencies for both backend and frontend:
   ```bash
   # Install backend dependencies
   cd backend
   npm install

   # Install frontend dependencies
   cd ../frontend
   npm install
   ```

3. Set up a MongoDB database:
   - Install MongoDB if you haven't already

4. Run the backend server:
   ```bash
   # In the backend directory
   node index.js
   ```

5. Run the frontend development server:
   ```bash
   # In a new terminal, navigate to the frontend directory
   cd ../frontend
   npm run dev
   ```

The application should now be running. Access the frontend at `http://localhost:5173/` and the backend API at `http://localhost:3000` (or whichever port you've configured).

## Usage

1. Sign up for a new account at `http://localhost:5173/signup`
2. Log in with your credentials at `http://localhost:5173/signin`
3. View your balance on the dashboard
4. Search for other users
5. Send money to other users using the transfer feature

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch:
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. Commit your changes:
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```
4. Push to the branch:
   ```bash
   git push origin feature/AmazingFeature
   ```
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).
