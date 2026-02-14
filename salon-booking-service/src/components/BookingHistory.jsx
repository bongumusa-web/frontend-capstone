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
    <div>
      <h2>{currentUser.username}'s Booking History</h2>

      {currentUser.bookings.length === 0 ? (
        <p>No bookings yet</p>
      ) : (
        <ul>
          {currentUser.bookings.map((booking, index) => (
            <li key={index}>
              <p>Date: {booking.date}</p>
              <p>Time: {booking.time}</p>
              <p>Total Price: R{booking.totalPrice}</p>

              <button onClick={() => handleDelete(index)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default BookingHistory;
