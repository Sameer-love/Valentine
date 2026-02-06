import { useEffect, useState } from "react";

export default function LoadingScreen() {
  const messages = [
    "Fetching resources…",
    "Downloading memories…",
    "Organizing things for you…",
    "Almost ready ✨"
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % messages.length);
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="loading-screen">
      <h1>{messages[index]}</h1>
    </div>
  );
}