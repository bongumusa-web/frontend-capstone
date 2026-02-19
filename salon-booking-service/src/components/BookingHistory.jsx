import { userUserStore } from "../Store/userStore";

function BookingHistory() {
  const { currentUser, updateBookings } = userUserStore();

  if (!currentUser) return null;

  async function handleDelete(indexToDelete) {
    const updatedBookings = currentUser.bookings.filter(
      (_, index) => index !== indexToDelete
    );

    await fetch(
      `https://698a420ac04d974bc6a1cc6d.mockapi.io/user_booking/${currentUser.id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...currentUser,
          bookings: updatedBookings,
        }),
      }
    );

    updateBookings(updatedBookings);
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">

      <h2 className="text-3xl font-bold mb-8 text-center">
        {currentUser.username}'s Booking History
      </h2>

      {currentUser.bookings.length === 0 ? (
        <p className="text-center text-gray-500">
          No bookings yet
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {currentUser.bookings.map((booking, index) => (
            
            <div
              key={index}
              className="bg-white shadow-lg rounded-xl overflow-hidden"
            >

              {/* ===== IMAGE ===== */}
              <img
                src={booking.image}
                alt={booking.serviceName}
                className="w-full h-48 object-cover"
              />

              {/* ===== CONTENT ===== */}
              <div className="p-4">

                <h3 className="text-xl font-semibold mb-2">
                  {booking.serviceName}
                </h3>

                <p className="text-gray-600 mb-1">
                  Date: {booking.date}
                </p>

                <p className="text-gray-600 mb-1">
                  Time: {booking.time}
                </p>

                <p className="text-gray-800 font-medium mb-4">
                  Price: R{booking.price}
                </p>

                <button
                  onClick={() => handleDelete(index)}
                  className="w-full bg-pink-500 text-white py-2 rounded-lg hover:bg-pink-600 transition duration-300"
                >
                  Cancel Booking
                </button>

              </div>
            </div>

          ))}
        </div>
      )}

    </div>
  );
}

export default BookingHistory;
