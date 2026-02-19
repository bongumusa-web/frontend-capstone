import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Back2 from "../assets/back2.jpg";
import malecut1 from "../assets/malescut1.jpg";
import naiil1 from "../assets/nail1.jpg";
import hairservice2 from "../assets/hairservice2.jpg";

import mbali from "../assets/mbali1.jpg";
import Maxwell from "../assets/Maxwell.jpg";
import Monica from "../assets/Monica.jpg";
import Musa from "../assets/Musa.jpg";
import zama from "../assets/zama.jpg";

function Home() {

  // ===== Testimonials Data =====
  const testimonials = [
    {
      name: "Mbali",
      image: mbali,
      rating: "★★★★★",
      message: "The booking system saved me so much time. Excellent service!",
    },
    {
      name: "Maxwell",
      image: Maxwell,
      rating: "★★★★☆",
      message: "Great haircut and no waiting in long queues!",
    },
    {
      name: "Monica",
      image: Monica,
      rating: "★★★☆☆",
      message: "Loved the nail service. Very professional staff.",
    },
    {
      name: "Musa",
      image: Musa,
      rating: "★★★★★",
      message: "Best salon experience. Quick and stress-free.",
    },
    {
      name: "Zama",
      image: zama,
      rating: "★★★★☆",
      message: "Hair treatment was amazing. Highly recommend!",
    },
  ];

  const [current, setCurrent] = useState(0);

  // ===== Auto Slide =====
  useEffect(() => {
    const interval = setInterval(() => {
      if (current === testimonials.length - 1) {
        setCurrent(0);
      } else {
        setCurrent(current + 1);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [current]);

  return (
    <div>

      {/* ================= HERO SECTION ================= */}
      <section
        className="h-[60vh] md:h-[90vh] bg-cover bg-center flex  flex-col items-center justify-center"
        style={{ backgroundImage: `url(${Back2})` }}
      >
        <div className="bg-black/20 p-8 rounded-xl text-center text-white max-w-2xl">
          <h1 className="text-3xl md:text-5xl py-8 mb-4">
            Your Time Matters. We Are Ready When You Are.
          </h1>

          <p className="mb-4">
            Book ahead and avoid long waiting times.
          </p>
          <h2 className="text-lg font-semibold mb-4 text-pink-400">Operating Hours</h2>
          <p>Weekdays: 9:00 AM - 8:00 PM, Weekend: 10:00 AM - 6:00 PM</p>
          <p className="mb-4">Public Holidays: 10:00 AM - 4:00 PM</p>

          <Link
            to="/haircut"
            className="inline-block bg-pink-500 text-white px-6 py-3 rounded-lg hover:bg-pink-600 transition"
          >
            Book Now
          </Link>
        </div>

        
      </section>

      {/* ================= SERVICES SECTION ================= */}
      <section className="bg-gray-100 py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-pink-500">
            Our Services
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            {/* Haircut */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <img
                src={malecut1}
                alt="Haircut"
                className="w-full h-64 object-cover"
              />
              <div className="p-6 text-center">
                <h3 className="text-xl font-semibold mb-4">Haircut</h3>
                <Link
                  to="/haircut"
                  className="block w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition"
                >
                  View Services
                </Link>
              </div>
            </div>

            {/* Nail Service */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <img
                src={naiil1}
                alt="Nail Service"
                className="w-full h-64 object-cover"
              />
              <div className="p-6 text-center">
                <h3 className="text-xl font-semibold mb-4">Nail Service</h3>
                <Link
                  to="/nail"
                  className="block w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition"
                >
                  View Services
                </Link>
              </div>
            </div>

            {/* Hair Treatment */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <img
                src={hairservice2}
                alt="Hair Treatment"
                className="w-full h-64 object-cover"
              />
              <div className="p-6 text-center">
                <h3 className="text-xl font-semibold mb-4">Hair Treatment</h3>
                <Link
                  to="/treatment"
                  className="block w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition"
                >
                  View Services
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ================= TESTIMONIAL SECTION ================= */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-12 text-pink-500">
            What Our Clients Say
          </h2>

          <div className="bg-white p-8 rounded-xl shadow-lg">

            <img
              src={testimonials[current].image}
              alt={testimonials[current].name}
              className="w-24 h-24 mx-auto rounded-full object-cover mb-4 border-4 border-pink-400"
            />

            <h3 className="text-xl font-semibold">
              {testimonials[current].name}
            </h3>

            <p className="text-yellow-500 text-lg my-2">
              {testimonials[current].rating}
            </p>

            <p className="text-gray-600 italic">
              "{testimonials[current].message}"
            </p>

          </div>
        </div>
      </section>

      {/* ================= CALL TO ACTION ================= */}
      <section className="py-16 bg-pink-500 text-white text-center">
        <h2 className="text-3xl font-bold mb-4">
          Ready to Book Your Appointment?
        </h2>
        <p className="mb-6">
          Avoid long queues and secure your spot today.
        </p>

        <Link
          to="/haircut"
          className="bg-white text-pink-500 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition"
        >
          Book Now
        </Link>
      </section>

    </div>
  );
}

export default Home;
