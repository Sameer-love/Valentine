export default function SlidePage({ onNext }) {
  const images = [
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
    "/pics/13.jpg"
  ];

  return (
    <div className="slide-page">
      {/* LEFT TEXT */}
      <div className="slide-left">
        <h2>Like memories scrolling softly…</h2>
        <p>
          Some moments don’t fade.  
          They quietly move through us, again and again.
        </p>
        <button onClick={onNext}>Continue</button>
      </div>

      {/* RIGHT VERTICAL FILM STRIP */}
      <div className="slide-right">
        <div className="film-strip-vertical">
          <div className="film-track-vertical">
            {[...images, ...images].map((src, i) => (
              <div className="film-frame-vertical" key={i}>
                <img src={src} alt="" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
