import { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useUserStore } from "../Store/userStore";

function BookingForm() {

  const navigate = useNavigate();
  const location = useLocation();

  // selected service coming from services page
  const selectedService = location.state?.service;

  const { currentUser } = useUserStore();

  const [services, setServices] = useState(
    selectedService ? [selectedService] : []
  );

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [holidays, setHolidays] = useState([]);
  const [message, setMessage] = useState("");

  // Fetch South African holidays
  useEffect(() => {
    fetch("https://date.nager.at/api/v3/PublicHolidays/2026/ZA")
      .then((res) => res.json())
      .then((data) => setHolidays(data))
      .catch((err) => console.log(err));
  }, []);

  // Generate time slots
  const generateTimeSlots = (selectedDate) => {
    if (!selectedDate) return [];

    const day = new Date(selectedDate).getDay();

    let closingHour = 20; // weekday

    if (day === 0 || day === 6) {
      closingHour = 17; // weekend
    }

    const slots = [];

    for (let hour = 9; hour < closingHour; hour++) {
      slots.push(`${hour}:00`);
      slots.push(`${hour}:30`);
    }

    return slots;
  };

  const timeSlots = generateTimeSlots(date);

  // Check holiday
  const checkHoliday = (selectedDate) => {

    const holiday = holidays.find(
      (h) => h.date === selectedDate
    );

    if (holiday) {
      setMessage(`${holiday.localName} — We are closed on holidays.`);
      return true;
    }

    setMessage("");
    return false;
  };

  // Handle date change
  const handleDateChange = (e) => {

    const selectedDate = e.target.value;

    setDate(selectedDate);

    checkHoliday(selectedDate);
  };

  // Add another service
  const addService = () => {
    navigate("/services");
  };

  // Submit booking
  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!currentUser) {
      alert("Please login before booking.");
      navigate("/login");
      return;
    }

    if (!date || !time) {
      alert("Please select date and time");
      return;
    }

    if (checkHoliday(date)) return;

    const booking = {
      services: services.map((s) => s.name),
      date,
      time
    };

    try {

      const response = await fetch(
        `https://698a420ac04d974bc6a1cc6d.mockapi.io/user_booking/${currentUser.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            ...currentUser,
            bookings: [...currentUser.bookings, booking]
          })
        }
      );

      if (response.ok) {
        alert("Booking successful!");
        navigate("/");
      }

    } catch (error) {
      console.log(error);
    }
  };

  return (

    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow rounded">

      <h2 className="text-2xl font-bold mb-4">
        Book a Service
      </h2>

      {!currentUser && (
        <div className="mb-4 text-red-500">

          <p>You must login to submit a booking.</p>

          <Link to="/login" className="hover:text-gray-400">
            Login
          </Link>

          <Link
            to="/register"
            className="block text-sm text-gray-600 hover:text-gray-800"
          >
            Don't have an account? Register here
          </Link>

        </div>
      )}

      <form onSubmit={handleSubmit}>

        {/* Selected Services */}

        <div className="mb-4">

          <label className="font-semibold">
            Selected Services
          </label>

          {services.map((service, index) => (
            <div key={index} className="border p-2 mt-2 rounded">

              {service.name} — R{service.price}

            </div>
          ))}

          <button
            type="button"
            onClick={addService}
            className="mt-2 text-blue-500"
          >
            + Add another service
          </button>

        </div>

        {/* Date */}

        <div className="mb-4">

          <label className="block font-semibold">
            Select Date
          </label>

          <input
            type="date"
            value={date}
            onChange={handleDateChange}
            className="border p-2 w-full rounded"
          />

        </div>

        {/* Time */}

        <div className="mb-4">

          <label className="block font-semibold">
            Select Time
          </label>

          <select
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="border p-2 w-full rounded"
          >

            <option value="">Choose time</option>

            {timeSlots.map((slot, index) => (
              <option key={index} value={slot}>
                {slot}
              </option>
            ))}

          </select>

        </div>

        {message && (
          <p className="text-red-500 mb-4">
            {message}
          </p>
        )}

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