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

export default function VideoSequence({ onFinish, onRestart }) {
  const videoRef = useRef(null);

  const [index, setIndex] = useState(0);
  const [visibleWords, setVisibleWords] = useState(0);
  const [showBackground, setShowBackground] = useState(false);
  const [showFinalQuestion, setShowFinalQuestion] = useState(false);
  const [questionComplete, setQuestionComplete] = useState(false);
  const [showOptions, setShowOptions] = useState(false); // ✅ NEW
  const [showExplanation, setShowExplanation] = useState(false);
  const [showBye, setShowBye] = useState(false);

  const isLast = index === videos.length - 1;

  const explanationText =
    "Matlab bas itna hi… I never knew how to say this without my voice shaking. " +
    "So I chose silence, screens, and a little courage. " +
    "No expectations. No pressure. " +
    "Just something I needed you to know. " +
    "These are all the special moments and memories I’ve carried with me.";

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
    setVisibleWords(0);
    setQuestionComplete(false);
    setShowOptions(false); // ✅ reset options

    const interval = setInterval(() => {
      setVisibleWords((prev) => {
        if (prev < words.length) return prev + 1;
        clearInterval(interval);
        setQuestionComplete(true);
        return prev;
      });
    }, 320);

    return () => clearInterval(interval);
  }, [currentText]);

  /* ⏳ Delay options AFTER question completes */
  useEffect(() => {
    if (showFinalQuestion && questionComplete && !showExplanation) {
      const timer = setTimeout(() => {
        setShowOptions(true);
      }, 2000); // ✅ 2 sec delay

      return () => clearTimeout(timer);
    }
  }, [showFinalQuestion, questionComplete, showExplanation]);

  /* ⏭️ Skip button */
  const handleSkip = () => {
    setIndex(videos.length - 1);
    setShowBackground(true);
    setShowFinalQuestion(true);
    setShowExplanation(false);
  };

  /* 💌 Option click */
  const handleOptionClick = (option) => {
    onFinish(option, false);
    setShowBye(true);
  };

  /* 💬 Explanation click */
  const handleExplanationClick = () => {
    setShowExplanation(true);
    onFinish(null, true);
  };

  return (
    <div className={`video-screen ${showBackground ? "show-bg" : ""}`}>
      {!showBackground && (
        <button className="skip-btn" onClick={handleSkip}>
          Skip
        </button>
      )}

      {!showBackground && (
        <video
          ref={videoRef}
          src={videos[index].src}
          autoPlay
          playsInline
          className="memory-video"
        />
      )}

      <div className="video-text">
        {/* Video text */}
        {!showExplanation && !showFinalQuestion && (
          <h1 className="final-question">
            {words.slice(0, visibleWords).map((word, i) => (
              <span key={i} className="word" style={{ animationDelay: `${i * 0.1}s` }}>
                {word}&nbsp;
              </span>
            ))}
          </h1>
        )}

        {/* Final Question */}
        {!showExplanation && showFinalQuestion && (
          <h1 className="final-question">
            {words.slice(0, visibleWords).map((word, i) => (
              <span
                key={i}
                className={`word ${word.toLowerCase().includes("valentine") ? "valentine-word" : ""}`}
                style={{ animationDelay: i * 0.1 + "s" }}
              >
                {word}&nbsp;
              </span>
            ))}
          </h1>
        )}

        {/* ❤️ Options AFTER delay */}
        {showOptions && !showExplanation && (
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
            <button className="explain-btn" onClick={handleExplanationClick}>
              Kya matlab iss sab ka sameer?
            </button>
          </div>
        )}

        {/* Explanation */}
        {showExplanation && (
          <div className="after-text reveal">
            <h1>
              {explanationText.split(". ").map((line, i) => (
                <span key={i}>
                  {line.trim()}
                  {i < explanationText.split(". ").length - 1 ? ". " : ""}
                  <br />
                </span>
              ))}
            </h1>

            <button className="exit-btn" onClick={onRestart}>
              Exit & Restart
            </button>
          </div>
        )}

        {/* Bye */}
        {showBye && <div className="bye-text">Bye 💌</div>}
      </div>
    </div>
  );
}
