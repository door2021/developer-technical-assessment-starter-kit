import { Link } from "react-router-dom";
import type { Property } from "../types/property";

interface Props {
  property: Property;
}

export default function PropertyCard({ property }: Props) {
  return (
    <Link
      to={`/property/${property.id}`}
      className="bg-white rounded-lg shadow hover:shadow-lg transition block"
    >
      <img
        src={property.image_urls[0]}
        className="h-48 w-full object-cover rounded-t-lg"
        alt={property.name}
      />

      <div className="p-4">
        <h3 className="text-lg font-semibold">{property.name}</h3>
        <p className="text-gray-600 text-sm">{property.location}</p>

        <p className="mt-2 font-bold text-primary">${property.price.toLocaleString()}</p>
      </div>
    </Link>
  );
}
