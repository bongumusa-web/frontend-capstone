import { userUserStore } from "../Store/userStore";

function BookingHistory() {
  const { currentUser, updateBookings } = userUserStore();

  if (!currentUser) return null;

  // Function to cancel a booking
  async function handleDelete(indexToDelete) {
    // Remove the booking from local state
    const updatedBookings = currentUser.bookings.filter(
      (_, index) => index !== indexToDelete
    );

    // Update the Mock API
    try {
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

      // Update local state
      updateBookings(updatedBookings);
    } catch (err) {
      console.log("Error deleting booking:", err);
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h2 className="text-3xl font-bold mb-8 text-center">
        {currentUser.username}'s Booking History
      </h2>

      {currentUser.bookings.length === 0 ? (
        <p className="text-center text-gray-500">No bookings yet</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {currentUser.bookings.map((booking, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-xl overflow-hidden"
            >
              {/* Service Image */}
              <img
                src={booking.services[0].imageUrl}
                alt={booking.services[0].name}
                className="w-full h-48 object-cover"
              />

              {/* Service Content */}
              <div className="p-4 space-y-2">
                <h3 className="text-xl font-semibold">
                  {booking.services[0].name}
                </h3>

                <p className="text-gray-600 text-sm">
                  {booking.services[0].description}
                </p>

                <p className="text-gray-600">Estimated Time: {booking.services[0].estimatedTime} mins</p>

                <p className="text-gray-800 font-medium">Price: R{booking.services[0].price}</p>

                <p className="text-gray-600">Date: {booking.date}</p>
                <p className="text-gray-600">Time: {booking.time}</p>

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