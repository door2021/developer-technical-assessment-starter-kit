import { useState } from "react";

interface Props {
  images: string[];
}

export default function ImageCarousel({ images }: Props) {
  const [index, setIndex] = useState(0);

  const next = () => setIndex((i) => (i + 1) % images.length);
  const prev = () =>
    setIndex((i) => (i - 1 + images.length) % images.length);

  return (
    <div className="relative w-full h-72 md:h-96">
      <img
        src={images[index]}
        className="w-full h-full object-cover rounded-lg"
      />

      <button
        onClick={prev}
        className="absolute top-1/2 left-4 bg-white p-2 rounded-full shadow"
      >
        ◀
      </button>
      <button
        onClick={next}
        className="absolute top-1/2 right-4 bg-white p-2 rounded-full shadow"
      >
        ▶
      </button>
    </div>
  );
}
