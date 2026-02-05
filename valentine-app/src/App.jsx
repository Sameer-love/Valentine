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

  // 🎵 start music on first interaction (HeartBubble click)
  const startMusic = () => {
    if (musicRef.current) {
      musicRef.current.volume = 0.12;
      musicRef.current.play().catch(() => {});
    }
  };

  // 💗 handle HeartBubble next
  const handleHeartNext = () => {
    startMusic(); // start music here
    setStep(2);
  };

  return (
    <div
      className={`app ${
        step === 1 ? "bg-before" : step === 2 ? "bg-after" : "bg-final"
      }`}
    >
      {/* 🎵 music plays continuously from step 2 */}
      <audio ref={musicRef} src="/music/soft.mp3" loop />

      {/* 🫧 bubbles only before video */}
      {step < 3 && <BubbleLayer />}

      <div className="center-content">
        {/* 💗 STEP 1 */}
        {step === 1 && <HeartBubble onNext={handleHeartNext} />}

        {/* 📸 STEP 2 */}
        {step === 2 && <SlidePage onNext={() => setStep(3)} />}

        {/* 🎥 STEP 3 */}
        {step === 3 && (
          <VideoSequence
            onFinish={(res) => {
              setAnswer(res);
              setStep(4);
            }}
          />
        )}

        {/* ✨ STEP 4 – FINAL TEXT (animated + glowing) */}
        {step === 4 && (
          <div className="after-text reveal">
            {answer === "probably" && (
              <h1>
                Call me NOW !!! I can’t wait to hear your voice 💖
                <br />
                This already means more than you know.
                <br />
                But I knew you would never choose this option.
                <br />
                Why did I even put this option…
              </h1>
            )}

            {answer === "think" && (
              <h1>
                Take your time…
                <br />
                I already know you well enough.
                <br />
                You’re someone who always makes the right decisions 🤍
              </h1>
            )}

            {answer === "no" && (
              <h1>
                I truly wish you happiness.
                <br />
                I may not have been the obvious choice,
                <br />
                but I would have been the one who chose you every day.
              </h1>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
