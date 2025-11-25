import { useEffect, useState } from "react";
import PropertyCard from "../content/PropertyCard";
import { fetchPopularListings } from "../api/axios";
import type { Property } from "../types/Property";

const LandingPage = () => {
  const [items, setItems] = useState<Property[]>([]);

  useEffect(() => {
    fetchPopularListings().then(setItems);
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>Popular Listings</h2>

      <div style={{
        display: "flex",
        flexWrap: "wrap",
        gap: 20
      }}>
        {items.map((item) => (
          <PropertyCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default LandingPage;
