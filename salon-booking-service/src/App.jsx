
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';
import { userUserStore } from "./Store/userStore";

import BookingHistory from './components/BookingHistory';
import './App.css';

function App() {
  const { currentUser, logout } = userUserStore();

  



  return (
    <div>
      <h1>Salon Booking App</h1>
      

      {currentUser ? (
        <>
          <p>Logged in as: {currentUser.username}</p>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <p>No user logged in</p>
      )}

      {!currentUser && <RegisterForm />}
      {!currentUser && <LoginForm />}
      {currentUser && <BookingHistory />}
    </div>
  );
}

export default App;
