import { useState } from "react";
import BubbleLayer from "./components/BubbleLayer";
import HeartBubble from "./components/HeartBubble";
import SlidePage from "./components/SlidePage";
import ValentineQuestion from "./components/ValentineQuestion";
import "./App.css";

export default function App() {
  const [step, setStep] = useState(1);
  const [answer, setAnswer] = useState(null);

  return (
    <div className={`app ${step >= 2 ? "bg-after" : "bg-before"}`}>
      <BubbleLayer />

      <div className="center-content">
        {step === 1 && <HeartBubble onNext={() => setStep(2)} />}

        {step === 2 && <SlidePage onNext={() => setStep(3)} />}

        {step === 3 && (
          <ValentineQuestion
            onAnswer={(res) => {
              setAnswer(res);
              setStep(4);
            }}
          />
        )}

        {step === 4 && (
          <div className="after-text">
            {answer === "yes" ? (
              <h1>You made my heart smile 💖</h1>
            ) : (
              <h1>It’s okay… Thank you for being honest 🤍</h1>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
