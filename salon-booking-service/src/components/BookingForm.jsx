import { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { userUserStore } from "../Store/userStore";

function BookingForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser, updateBookings } = userUserStore();

  // Service coming from service card
  const selectedService = location.state?.service;

  const [services] = useState(selectedService ? [selectedService] : []);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [holidays, setHolidays] = useState([]);
  const [message, setMessage] = useState("");

  const currentYear = new Date().getFullYear();

  // Fetch South African holidays dynamically
  useEffect(() => {
    fetch(`https://date.nager.at/api/v3/PublicHolidays/${currentYear}/ZA`)
      .then((res) => res.json())
      .then((data) => setHolidays(data))
      .catch((err) => console.log(err));
  }, [currentYear]);

  const checkPastDate = (selectedDate) => {
    const today = new Date().toISOString().split("T")[0];
    if (selectedDate < today) {
      setMessage("You cannot book a past date.");
      return false;
    }
    return true;
  };

  const checkHoliday = (selectedDate) => {
    const holiday = holidays.find((h) => h.date === selectedDate);
    if (holiday) {
      setMessage(`${holiday.localName} - We are closed on holidays.`);
      return true;
    }
    return false;
  };

  const checkWorkingHours = (selectedDate, selectedTime) => {
    const day = new Date(selectedDate).getDay();
    const hour = parseInt(selectedTime.split(":")[0]);
    if (day === 0 || day === 6) {
      if (hour < 9 || hour >= 17) {
        setMessage("Weekend hours are 09:00 - 17:00");
        return false;
      }
    } else {
      if (hour < 9 || hour >= 20) {
        setMessage("Weekday hours are 09:00 - 20:00");
        return false;
      }
    }
    return true;
  };

  const checkExistingBooking = async (services, date, time) => {
    try {
      const response = await fetch(
        "https://698a420ac04d974bc6a1cc6d.mockapi.io/user_booking"
      );
      const users = await response.json();
      for (let user of users) {
        for (let booking of user.bookings) {
          const sameService = booking.services.some((s) =>
            services.map((srv) => srv.name).includes(s.name || s)
          );
          if (sameService && booking.date === date && booking.time === time) {
            setMessage("This service is already booked for that date and time.");
            return true;
          }
        }
      }
      return false;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!currentUser) {
      alert("Please login first");
      navigate("/login");
      return;
    }

    if (!date || !time) {
      setMessage("Please select date and time.");
      return;
    }

    if (!checkPastDate(date)) return;
    if (checkHoliday(date)) return;
    if (!checkWorkingHours(date, time)) return;

    const alreadyBooked = await checkExistingBooking(services, date, time);
    if (alreadyBooked) return;

    const booking = { services, date, time };
    const updatedBookings = [...currentUser.bookings, booking];

    try {
      const response = await fetch(
        `https://698a420ac04d974bc6a1cc6d.mockapi.io/user_booking/${currentUser.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...currentUser, bookings: updatedBookings }),
        }
      );

      if (response.ok) {
        updateBookings(updatedBookings);

        // Alert and then redirect
        alert("Booking successful!");
        setTimeout(() => navigate("/history"), 1000); // wait 1s then redirect
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addService = () => navigate("/"); // redirect to services page

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Book a Service</h2>

      {!currentUser && (
        <div className="mb-4 text-red-500">
          <p>You must login to submit a booking.</p>
          <Link to="/login" className="hover:text-gray-400">Login</Link>
          <Link
            to="/register"
            className="block text-sm text-gray-600 hover:text-gray-800"
          >
            Don't have an account? Register here
          </Link>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="font-semibold">Selected Service</label>
          {services.map((service, index) => (
            <div key={index} className="border p-2 mt-2 rounded">
              <p className="font-bold">{service.name} — R{service.price}</p>
              <p className="text-sm">{service.description}</p>
              <p className="text-gray-600">Estimated Time: {service.estimatedTime} mins</p>
              <img src={service.imageUrl} alt={service.name} className="w-full h-40 object-cover mt-2 rounded" />
            </div>
          ))}
          <button type="button" onClick={addService} className="mt-2 text-blue-500">
            + Add another service
          </button>
        </div>

        <div className="mb-4">
          <label className="block font-semibold">Select Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => { setDate(e.target.value); setMessage(""); }}
            className="border p-2 w-full rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block font-semibold">Select Time</label>
          <input
            type="time"
            value={time}
            onChange={(e) => { setTime(e.target.value); setMessage(""); }}
            className="border p-2 w-full rounded"
          />
        </div>

        {message && <p className="text-red-500 mb-4">{message}</p>}

        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"
        >
          Confirm Booking
        </button>
      </form>
    </div>
  );
}

export default BookingForm;