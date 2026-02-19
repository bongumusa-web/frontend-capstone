import { Link } from "react-router-dom";

function AboutUs() {
  return (
    <div>

      {/* ================= HERO SECTION ================= */}
      <section className="bg-[url('https://plus.unsplash.com/premium_photo-1669675935112-18b060d6d059?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover h-80 p-20 bg-center text-white px-6 text-center">
        <div className="bg-black/60  w-full  p-8 rounded-lg mx-auto max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-bold">
          About Our Salon
        </h1>

        <p className="max-w-2xl mx-auto mt-4 text-lg">
          We provide professional haircuts, nail services and hair treatments.
          Open Mon–Fri 9AM–8PM, Sat–Sun 10AM–6PM.
        </p>
        </div>
      </section>


      {/* MAIN SECTION  */}
      <section className="max-w-6xl mx-auto px-6 py-16">

        <div className="flex flex-col md:flex-row gap-10">

          {/*  LEFT SIDE  */}
          <div className="md:w-1/2">
            <h2 className="text-3xl font-semibold mb-4">
              Who We Are
            </h2>

            <p className="mb-4 text-gray-700">
              We are a salon that truly cares about people and understands how
              valuable time is in today’s busy world.
            </p>

            <p className="mb-4 text-gray-700">
              That’s why we created this booking application — to solve the
              problem of long waiting times, overbooking, and uncertainty.
            </p>

            <p className="mb-6 text-gray-700">
              Our goal is to respect your time by offering an efficient,
              well-organised, and dependable salon experience.
            </p>

            <h3 className="text-xl font-semibold mb-3">
              Our Services
            </h3>

            <ul className="list-disc ml-5 text-gray-700 mb-6">
              <li>Professional Haircuts</li>
              <li>Nail Services</li>
              <li>Hair Treatments</li>
            </ul>

            <Link
              to="/services"
              className="inline-block bg-pink-500 text-white px-6 py-3 rounded-lg hover:bg-pink-600 transition duration-300 "
            >
              Book Now
            </Link>
          </div>


          {/*  MAP */}
          <div className="md:w-1/2">
            <h2 className="text-3xl font-semibold mb-4">
              Find Us Here
            </h2>

            <iframe
              src="https://www.google.com/maps/embed?pb=!1m26!1m12!1m3!1d4253.403648104246!2d28.182140026160692!3d-26.009158356060247!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m11!3e0!4m3!3m2!1d-26.0112451!2d28.1876049!4m5!1s0x1e956db78b1ea947%3A0x41dfc5be604ab4c6!2sIvory%202%20Taxi%20Rank%2C%20Ivory%20Park%2C%20Midrand%2C%201693!3m2!1d-26.007256299999998!2d28.1821679!5e1!3m2!1sen!2sza!4v1771532944854!5m2!1sen!2sza"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Salon Location"

              className="h-94 w-full  sm:h-96 rounded-lg shadow-md border-2 border-gray-300 "
            ></iframe>
          </div>

        </div>
      </section>

    </div>
  );
}

export default AboutUs;
