import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { Property } from "../types/Property";
import { contactAgent, fetchPropertyDetails } from "../api/axios";

export default function PropertyDetails() {
  const { id } = useParams<{ id: string }>();
  const [property, setProperty] = useState<Property | null>(null);

  useEffect(() => {
    if (id) {
      fetchPropertyDetails(id).then(setProperty);
    }
  }, [id]);

  const handleContact = async () => {
    const token = localStorage.getItem("token");
    if (!token) return alert("Please login to contact agent");

    await contactAgent(token, Number(id));
    alert("Agent contacted successfully!");
  };

  if (!property) return <p>Loading...</p>;

  return (
    <div style={{ padding: 20 }}>
      <h2>{property.name}</h2>
      <img src={property.image_urls[0]} style={{ width: 400 }} />

      <p>{property.details}</p>
      <p><strong>Location:</strong> {property.location}</p>
      <p><strong>Price:</strong> ${property.price.toLocaleString()}</p>

      <button onClick={handleContact} style={{ marginTop: 20 }}>
        Contact Agent
      </button>
    </div>
  );
}
