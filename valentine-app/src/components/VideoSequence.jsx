import { useEffect, useRef, useState } from "react";

const videos = [
  { src: "/videos/v1.mp4", text: "Some moments stay…" },
  { src: "/videos/v2.mp4", text: "Even when time moves on." },
  { src: "/videos/v3.mp4", text: "We smiled without realizing it." },
  { src: "/videos/v4.mp4", text: "And somehow… you stayed with me." },
  {
    src: "/videos/v5.mp4",
    text: "Before I ask you anything… I just want you to know — \n this comes from a very honest place.",
    final: "Will you be my\n Valentine?",
  },
];

export default function VideoSequence({ onFinish }) {
  const videoRef = useRef(null);
  const musicRef = useRef(null);

  const [index, setIndex] = useState(0);
  const [visibleWords, setVisibleWords] = useState(0);
  const [showBackground, setShowBackground] = useState(false);
  const [showFinalQuestion, setShowFinalQuestion] = useState(false); // ⭐ NEW

  const isLast = index === videos.length - 1;
  const currentText = showFinalQuestion
    ? videos[index].final
    : videos[index].text;

  const words = currentText.split(" ");

  /* 🎵 background music */
  useEffect(() => {
    const music = musicRef.current;
    if (!music) return;

    music.volume = 0.12;
    music.play().catch(() => {});
  }, []);

  /* 🎬 video handling */
  useEffect(() => {
    if (showBackground) return;

    const video = videoRef.current;
    if (!video) return;

    video.muted = !isLast; // unmute last video
    video.load();
    video.play();

    const handleEnd = () => {
      if (!isLast) {
        setIndex((prev) => prev + 1);
        setVisibleWords(0);
      } else {
        // ⭐ last video finished → show romantic line first
        setShowBackground(true);

        // after pause → show the question
        setTimeout(() => {
          setVisibleWords(0);
          setShowFinalQuestion(true);
        }, 2200);
      }
    };

    video.addEventListener("ended", handleEnd);
    return () => video.removeEventListener("ended", handleEnd);
  }, [index, isLast, showBackground]);

  /* ✨ word-by-word reveal */
  useEffect(() => {
    setVisibleWords(0);
    const interval = setInterval(() => {
      setVisibleWords((prev) => {
        if (prev < words.length) return prev + 1;
        clearInterval(interval);
        return prev;
      });
    }, 320);

    return () => clearInterval(interval);
  }, [currentText]);

  /* ⏭️ skip */
  const handleSkip = () => {
    setIndex(videos.length - 1);
    setShowBackground(true);
    setShowFinalQuestion(true);
  };

  return (
    <div className={`video-screen ${showBackground ? "show-bg" : ""}`}>

      {!showBackground && (
        <button className="skip-btn" onClick={handleSkip}>
          Skip
        </button>
      )}

      {/* 🎥 VIDEO */}
      {!showBackground && (
        <video
          ref={videoRef}
          src={videos[index].src}
          autoPlay
          playsInline
          className="memory-video"
        />
      )}

      {/* 🩷 TEXT */}
      <div className="video-text">
        <h1>
          {words.slice(0, visibleWords).map((word, i) => (
            <span key={i} className="word">
              {word}&nbsp;
            </span>
          ))}
        </h1>

        {/* 💖 Buttons only with final question */}
        {showFinalQuestion && (
          <div className="buttons">
            <button onClick={() => onFinish("yes")}>Yes 💗</button>
            <button onClick={() => onFinish("talk")}>Let’s talk 🤍</button>
          </div>
        )}
      </div>
    </div>
  );
}
