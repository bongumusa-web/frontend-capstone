import { Routes, Route } from 'react-router-dom';

//components 
import Navbar from './components/Navbar';

import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';
import { userUserStore } from "./Store/userStore";

import BookingHistory from './components/BookingHistory';
import Footer from './components/Footer';


//pages 
import Home from './pages/Home';
import HairCut from './pages/HairCut';  
import NailService from './pages/NailService';
import HairTreatment from './pages/HairTreatment';
import AboutUs from './pages/About';

//styles:
import './index.css'





function App() {
  //const { currentUser, logout } = userUserStore();
  return (
    <div>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/haircut" element={<HairCut />} />
        <Route path="/nail" element={<NailService />} />
        <Route path="/treatment" element={<HairTreatment />} />
        <Route path="/about" element={<AboutUs />} />

        <Route
          path="/login"
          element={
            <>
              <RegisterForm />
              <LoginForm />
            </>
          }
        />

        <Route path="/history" element={<BookingHistory />} />
      </Routes>

      <Footer />
    </div>
  );

  



  
}

export default App;
