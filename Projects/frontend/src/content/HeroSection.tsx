import Searchbar from "./Searchbar";

export default function HeroSection() {
  return (
    <section className="w-full bg-muted mt-16 py-20">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Find your dream property
        </h1>

        <p className="text-gray-600 text-lg mb-8">
          Browse properties, lands, and projects across the country.
        </p>

        <Searchbar />
      </div>
    </section>
  );
}
