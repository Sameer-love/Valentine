import { useState, useEffect } from "react";

export default function HeartBubble({ onNext }) {
  const [popped, setPopped] = useState(false);
  const [displayText, setDisplayText] = useState("");

  const fullText =
    "You’ve slowly become my crush these days… not my ex anymore, just someone who makes my heart smile.";

  useEffect(() => {
    if (popped) return; // stop typing when heart clicked

    let index = 0;

    const interval = setInterval(() => {
      setDisplayText(fullText.slice(0, index + 1));
      index++;
      if (index > fullText.length) {
        index = 0; // restart from beginning
      }
    }, 90); // typing speed

    return () => clearInterval(interval);
  }, [popped]);

  const handleClick = () => {
    setPopped(true);
    setDisplayText(fullText); // show full text when clicked
    setTimeout(onNext, 500);
  };

  return (
    <div className="heart-container">
      {/* Heart bubble */}
      <div
        className={`heart-3d ${popped ? "pop" : ""}`}
        onClick={handleClick}
      >
        <span>Tap Gently</span>
      </div>

      {/* Typing text on the right */}
      {!popped && <p className="right-text">{displayText}</p>}
    </div>
  );
}
