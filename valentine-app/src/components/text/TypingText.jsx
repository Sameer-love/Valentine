import { useEffect, useState } from "react";

const text = "Hey…\nI didn’t know how else to say this.\nSo I made this instead.";

export default function TypingText({ onNext }) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed(text.slice(0, i));
      i++;
      if (i > text.length) clearInterval(interval);
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="center">
      <pre className="typing">{displayed}</pre>
      {displayed.length === text.length && (
        <button onClick={onNext}>Continue</button>
      )}
    </div>
  );
}
