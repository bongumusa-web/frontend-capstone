import { useEffect, useState } from "react";
import ServiceCard from "../components/ServiceCard";

export function NailService() {

  const [services, setServices] = useState([]);

  useEffect(() => {

    fetch("https://698a420ac04d974bc6a1cc6d.mockapi.io/services")
      .then((response) => response.json())
      .then((data) => {

        // only haircut services
        const NailServices = data.filter(
          (service) => service.category === "Nail Services"
        );

        setServices(NailServices);
      });

  }, [])

  return (
    <div className="p-6">

      <h2 className="text-3xl font-bold text-center mb-6">
        Nail Services
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {services.map((service) => (

          <ServiceCard
            key={service.id}
            image={service.imageUrl}
            name={service.name}
            price={`R${service.price}`}
            time={service.estimatedTime}
            description={service.description}
            service={service.category}
          />

        ))}

      </div>

    </div>
  );
}


export default NailService;
