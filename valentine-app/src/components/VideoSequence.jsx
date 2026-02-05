import { useEffect, useRef, useState } from "react";

const videos = [
  { src: "/videos/v1.mp4", text: "Some moments stay…" },
  { src: "/videos/v2.mp4", text: "Even when time moves on." },
  { src: "/videos/v3.mp4", text: "We smiled without realizing it." },
  { src: "/videos/v4.mp4", text: "And somehow… you stayed with me." },
  {
    src: "/videos/v5.mp4",
    text:
      "Before I ask you anything… I just want you to know —\nthis comes from a very honest place.",
    final: "Will you be my \nValentine?",
  },
];

export default function VideoSequence({ onFinish }) {
  const videoRef = useRef(null);
  const musicRef = useRef(null);

  const [index, setIndex] = useState(0);
  const [visibleWords, setVisibleWords] = useState(0);
  const [showBackground, setShowBackground] = useState(false);
  const [showFinalQuestion, setShowFinalQuestion] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [showBye, setShowBye] = useState(false);

  const isLast = index === videos.length - 1;

  const explanationText =
    "Matlab bas itna hi… I never knew how to say this without my voice shaking. So I chose silence, screens, and a little courage. No expectations. No pressure. Just something I needed you to know.";

  const currentText = showExplanation
    ? explanationText
    : showFinalQuestion
    ? videos[index].final
    : videos[index].text;

  const words = currentText.split(" ");

  /* 🎬 Video handling */
  useEffect(() => {
    if (showBackground) return;

    const video = videoRef.current;
    if (!video) return;

    video.muted = !isLast;
    video.load();
    video.play();

    const handleEnd = () => {
      if (!isLast) {
        setIndex((prev) => prev + 1);
        setVisibleWords(0);
      } else {
        setShowBackground(true);
        // Delay before showing final question
        setTimeout(() => {
          setVisibleWords(0);
          setShowFinalQuestion(true);
        }, 2200);
      }
    };

    video.addEventListener("ended", handleEnd);
    return () => video.removeEventListener("ended", handleEnd);
  }, [index, isLast, showBackground]);

  /* ✨ Word-by-word reveal */
  useEffect(() => {
    if (showExplanation) return;

    setVisibleWords(0);
    const interval = setInterval(() => {
      setVisibleWords((prev) => {
        if (prev < words.length) return prev + 1;
        clearInterval(interval);
        return prev;
      });
    }, 320);

    return () => clearInterval(interval);
  }, [currentText, showExplanation]);

  /* ⏭️ Skip button */
  const handleSkip = () => {
    setIndex(videos.length - 1);
    setShowBackground(true);
    setShowFinalQuestion(true);
    setShowExplanation(false);
  };

  /* 💌 Button click wrapper to show Bye after option */
  const handleOptionClick = (option) => {
    onFinish(option);
    setShowBye(true);
  };

  return (
    <div className={`video-screen ${showBackground ? "show-bg" : ""}`}>
      <audio ref={musicRef} src="/music/soft.mp3" loop />

      {/* Skip button */}
      {!showBackground && (
        <button className="skip-btn" onClick={handleSkip}>
          Skip
        </button>
      )}

      {/* 🎥 Video */}
      {!showBackground && (
        <video
          ref={videoRef}
          src={videos[index].src}
          autoPlay
          playsInline
          className="memory-video"
        />
      )}

      {/* 🩷 Text content */}
      <div className="video-text">
        {/* ❓ Final question text */}
        {!showExplanation && (
          <h1 className="final-question">
            {words.slice(0, visibleWords).map((word, i) => {
              const isValentine = word.toLowerCase().includes("valentine");
              return (
                <span
                  key={i}
                  className={`word ${isValentine ? "valentine-word" : ""}`}
                  style={{ animationDelay: isValentine ? "0.6s" : "0s" }}
                >
                  {word}&nbsp;
                </span>
              );
            })}
          </h1>
        )}

        {/* 🔘 Options */}
        {showFinalQuestion && !showExplanation && (
          <div className="buttons">
            <button onClick={() => handleOptionClick("probably")}>
              Probably yes 💗
            </button>
            <button onClick={() => handleOptionClick("think")}>
              Let me think about it 🤍
            </button>
            <button onClick={() => handleOptionClick("no")}>
              I think it’s better we don’t.
            </button>
            <button
              className="explain-btn"
              onClick={() => setShowExplanation(true)}
            >
              Kya matlab iss sab ka sameer?
            </button>
          </div>
        )}

        {/* ❤️ Explanation text */}
        {showExplanation && (
          <h1 className="final-line">
            {explanationText.split("\n").map((line, i) => (
              <span key={i}>
                {line}
                <br />
              </span>
            ))}
          </h1>
        )}

        {/* 💌 Bye text */}
        {showBye && (
          <div className="bye-text">
            Bye 💌
          </div>
        )}
      </div>
    </div>
  );
}
