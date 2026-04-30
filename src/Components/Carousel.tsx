import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const images = [
  "https://images-eu.ssl-images-amazon.com/images/G/31/rabhinak/pc/gw/GW-HERO-PC-Bestseller-store-Unrec._CB786180913_.jpg",
  "https://images-eu.ssl-images-amazon.com/images/G/31/2025/GW/UNREC/PC/78269._CB785061629_.jpg",
  "https://images-eu.ssl-images-amazon.com/images/G/31/2025/GW/UNREC/PC/78270._CB785061629_.jpg",
  "https://images-eu.ssl-images-amazon.com/images/G/31/Img26/Sports/February/GW/BAU/Legacy/Unrec/5298_Sports_-_BAU_PC_creatives_3000X1200_02._CB787728092_.jpg",
];

const Carousel = () => {
  const [current, setCurrent] = useState(0);

  // 🔁 Auto slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // ⬅️ Prev
  const prevSlide = () => {
    setCurrent((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  // ➡️ Next
  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % images.length);
  };

  return (
    <div className="relative w-full overflow-hidden rounded-lg">
      
      {/* Slides */}
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt="banner"
            className="w-full h-[200px] md:h-[400px] object-cover flex-shrink-0"
          />
        ))}
      </div>

      {/* ⬅️ Left Arrow */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-2 -translate-y-1/2 bg-white/70 p-2 rounded-full shadow cursor-pointer"
      >
        <ChevronLeft size={20} className="text-fuchsia-500" />
      </button>

      {/* ➡️ Right Arrow */}
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-2 -translate-y-1/2 bg-white/70 p-2 rounded-full shadow cursor-pointer"
      >
        <ChevronRight size={20} className="text-fuchsia-500" />
      </button>

      {/* 🔘 Dots */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-2.5 h-2.5 rounded-full cursor-pointer ${
              current === index ? "bg-black" : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;