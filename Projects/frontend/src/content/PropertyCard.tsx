import { Link } from "react-router-dom";
import type { Property } from "../types/Property";

export default function PropertyCard({ item }: { item: Property }) {
  return (
    <Link to={`/property/${item.id}`}>
      <div style={{
        padding: 16,
        border: "1px solid #eee",
        borderRadius: 8,
        marginBottom: 20,
        cursor: "pointer",
        width: 300
      }}>
        <img 
          src={item.image_urls[0]} 
          alt={item.name} 
          style={{ width: "100%", borderRadius: 8 }} 
        />
        <h3>{item.name}</h3>
        <p>{item.location}</p>
        <strong>${item.price.toLocaleString()}</strong>
      </div>
    </Link>
  );
}
