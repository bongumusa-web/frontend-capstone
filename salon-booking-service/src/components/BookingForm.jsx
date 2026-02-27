import { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { userUserStore } from "../Store/userStore";

function BookingForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser, updateBookings } = userUserStore();

  const selectedService = location.state?.service;
  const [services, setServices] = useState(selectedService ? [selectedService] : []);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const addService = () => navigate("/"); // you can redirect to service page

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!currentUser) {
      alert("Please login first");
      navigate("/login");
      return;
    }

    if (!date || !time) {
      alert("Select date and time");
      return;
    }

    const booking = { services, date, time };
    updateBookings([...currentUser.bookings, booking]);

    try {
      const response = await fetch(
        `https://698a420ac04d974bc6a1cc6d.mockapi.io/user_booking/${currentUser.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...currentUser, bookings: [...currentUser.bookings, booking] }),
        }
      );

      if (response.ok) {
        alert("Booking successful!");
        navigate("/");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Book a Service</h2>

      {!currentUser && (
        <div className="mb-4 text-red-500">
          <p>You must login to submit a booking.</p>
          <Link to="/login" className="hover:text-gray-400">Login</Link>
          <Link to="/register" className="block text-sm text-gray-600 hover:text-gray-800">
            Don't have an account? Register here
          </Link>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="font-semibold">Selected Services</label>
          {services.map((service, index) => (
            <div key={index} className="border p-2 mt-2 rounded">
              {service.name} — R{service.price}
            </div>
          ))}
          <button type="button" onClick={addService} className="mt-2 text-blue-500">
            + Add another service
          </button>
        </div>

        <div className="mb-4">
          <label className="block font-semibold">Select Date</label>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="border p-2 w-full rounded" />
        </div>

        <div className="mb-4">
          <label className="block font-semibold">Select Time</label>
          <input type="time" value={time} onChange={(e) => setTime(e.target.value)} className="border p-2 w-full rounded" />
        </div>

        <button type="submit" className="w-full bg-black text-white py-2 rounded hover:bg-gray-800">
          Confirm Booking
        </button>
      </form>
    </div>
  );
}

export default BookingForm;