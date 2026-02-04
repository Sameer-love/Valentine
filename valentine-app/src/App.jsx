import { useState, useRef } from "react";

import BubbleLayer from "./components/effects/BubbleLayer";
import HeartBubble from "./components/effects/HeartBubble";
import SlidePage from "./components/slideshow/SlidePage";
import VideoSequence from "./components/VideoSequence";

import "./App.css";

export default function App() {
  const [step, setStep] = useState(1);
  const [answer, setAnswer] = useState(null);

  const musicRef = useRef(null);

  // function to start music on first click
  const startMusic = () => {
    if (musicRef.current) {
      musicRef.current.volume = 0.12;
      musicRef.current.play().catch(() => {});
    }
  };

  return (
    <div
      className={`app ${
        step === 1 ? "bg-before" : step === 2 ? "bg-after" : "bg-final"
      }`}
    >
      <audio ref={musicRef} src="/music/soft.mp3" loop />

      {step < 3 && <BubbleLayer />}

      <div className="center-content">
        {step === 1 && (
          <HeartBubble
            onNext={() => {
              setStep(2);
            }}
            onFirstClick={startMusic} // ⭐ pass the music starter
          />
        )}

        {step === 2 && <SlidePage onNext={() => setStep(3)} />}

        {step === 3 && (
          <VideoSequence
            onFinish={(res) => {
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
