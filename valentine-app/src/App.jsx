import { useEffect, useState } from "react";
import "./style.css";

export default function App() {
  const text = `This isn’t pressure.
This isn’t expectation.
Just one honest question from my heart.`;

  const [typedText, setTypedText] = useState("");
  const [screen, setScreen] = useState("main");

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setTypedText((prev) => prev + text.charAt(i));
      i++;
      if (i >= text.length) clearInterval(interval);
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="emoji-background">
        {Array.from({ length: 30 }).map((_, i) => (
          <span key={i} className="emoji">💖</span>
        ))}
      </div>

      {screen === "main" && (
        <div className="container">
          <h1>Hey…</h1>
          <p className="message">
            {typedText.split("\n").map((line, i) => (
              <span key={i}>{line}<br /></span>
            ))}
          </p>

          <p className="question">Will you be my Valentine?</p>

          <div className="buttons">
            <button className="yes" onClick={() => setScreen("yes")}>
              Yes 💖
            </button>
            <button className="no" onClick={() => setScreen("no")}>
              No 🤍
            </button>
          </div>
        </div>
      )}

      {screen === "yes" && (
        <div className="container">
          <h1>💖</h1>
          <p className="response">
            Thank you for choosing us again.  
            I promise respect, patience, and honesty—always.
          </p>
        </div>
      )}

      {screen === "no" && (
        <div className="container">
          <h1>🤍</h1>
          <p className="response">
            Thank you for being honest.  
            I truly wish you peace and happiness.
          </p>
        </div>
      )}
    </>
  );
}
