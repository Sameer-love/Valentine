import { useEffect, useState } from "react";

const images = [
  "/pics/1.jpg",
  "/pics/2.jpg",
  "/pics/3.jpg",
  "/pics/4.jpg",
  "/pics/5.jpg",
  "/pics/6.jpg",
  "/pics/7.jpg",
  "/pics/8.jpg",
  "/pics/9.jpg",
  "/pics/10.jpg",
  "/pics/11.jpg",
  "/pics/12.jpg",
];

export default function SlideShow() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3000); // slide every 3 sec

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="slideshow">
      <div
        className="slides"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {images.map((img, i) => (
          <img key={i} src={img} alt="memory" />
        ))}
      </div>
    </div>
  );
}
