import { Link } from "react-router-dom";

function ServiceCard({ image, name, price, time, description, service }) {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">

      {/* Service Image */}
      <img
        src={image}
        alt={name}
        className="w-full h-80 object-cover"
      />

      {/* Content */}
      <div className="p-4 space-y-2">

        {/* Service Name */}
        <h3 className="text-xl font-semibold">{name}</h3>

        {/* Price */}
        <p className="text-gray-700">Price: {price}</p>

        {/* Estimated Time */}
        <p className="text-gray-700">Estimated Time: {time}</p>

        {/* Description */}
        <p className="text-gray-600 text-sm">{description}</p>

        {/* Book Button */}
        <Link
          to={`/booking/${service}`}
          className="block bg-black text-white text-center py-2 mt-3 rounded hover:bg-gray-800"
        >
          Book Now
        </Link>

      </div>
    </div>
  );
}

export default ServiceCard;