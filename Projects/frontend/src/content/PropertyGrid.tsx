import type { Property } from "../types/property";
import PropertyCard from "./PropertyCard";

interface Props {
  properties: Property[];
  title: string;
}

export default function PropertyGrid({ properties, title }: Props) {
  return (
    <section className="my-12">
      <h2 className="text-2xl font-bold mb-6">{title}</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((p) => (
          <PropertyCard key={p.id} property={p} />
        ))}
      </div>
    </section>
  );
}
