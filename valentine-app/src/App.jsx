import { useState, useRef, useEffect } from "react";

import BubbleLayer from "./components/effects/BubbleLayer";
import HeartBubble from "./components/effects/HeartBubble";
import SlidePage from "./components/slideshow/SlidePage";
import VideoSequence from "./components/VideoSequence";
import LoadingScreen from "./components/LoadingScreen";

import "./app.css";

export default function App() {
  const [step, setStep] = useState(1);
  const [answer, setAnswer] = useState(null);
  const [showVideoExplanation, setShowVideoExplanation] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false); // ✅ LOADING STATE

  const musicRef = useRef(null);

  /* =======================
     📦 ASSETS TO PRELOAD
     ======================= */
  const videoAssets = [
    "/videos/v1.mp4",
    "/videos/v2.mp4",
    "/videos/v3.mp4",
    "/videos/v4.mp4",
    "/videos/v5.mp4",
  ];

  const imageAssets = [
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
    "/pics/13.jpg",
  ];

  const audioAssets = ["/music/soft.mp3"];

  /* =======================
     🚀 PRELOAD EVERYTHING
     ======================= */
  useEffect(() => {
    let loadedCount = 0;
    const totalAssets =
      videoAssets.length + imageAssets.length + audioAssets.length;

    const checkDone = () => {
      loadedCount++;
      if (loadedCount === totalAssets) {
        setIsLoaded(true);
      }
    };

    // preload videos
    videoAssets.forEach((src) => {
      const video = document.createElement("video");
      video.src = src;
      video.preload = "auto";
      video.oncanplaythrough = checkDone;
      video.onerror = checkDone;
    });

    // preload images
    imageAssets.forEach((src) => {
      const img = new Image();
      img.src = src;
      img.onload = checkDone;
      img.onerror = checkDone;
    });

    // preload audio
    audioAssets.forEach((src) => {
      const audio = new Audio();
      audio.src = src;
      audio.oncanplaythrough = checkDone;
      audio.onerror = checkDone;
    });
  }, []);

  /* =======================
     ⛔ BLOCK APP UNTIL READY
     ======================= */
  if (!isLoaded) {
    return <LoadingScreen />;
  }

  /* =======================
     🎵 MUSIC CONTROL
     ======================= */
  const startMusic = () => {
    if (musicRef.current) {
      musicRef.current.volume = 0.12;
      musicRef.current.play().catch(() => {});
    }
  };

  const handleHeartNext = () => {
    startMusic();
    setStep(2);
  };

  /* =======================
     🔁 RESTART APP
     ======================= */
  const restartApp = () => {
    if (musicRef.current) {
      musicRef.current.pause();
      musicRef.current.currentTime = 0;
    }

    setAnswer(null);
    setShowVideoExplanation(false);
    setStep(1);
  };

  return (
    <div
      className={`app ${
        step === 1 ? "bg-before" : step === 2 ? "bg-after" : "bg-final"
      }`}
    >
      {/* 🎵 background music */}
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
            key={step}
            onFinish={(res, isExplanation) => {
              if (isExplanation) {
                setShowVideoExplanation(true);
              } else {
                setAnswer(res);
                setStep(4);
                setShowVideoExplanation(false);
              }
            }}
            onRestart={restartApp}
          />
        )}

        {/* ✨ STEP 4 */}
        {step === 4 && !showVideoExplanation && (
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

            <button className="exit-btn" onClick={restartApp}>
              Exit & Restart
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
