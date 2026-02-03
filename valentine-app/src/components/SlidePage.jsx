import SlideShow from "./SlideShow";

export default function SlidePage({ onNext }) {
  return (
    <div className="slide-page">
      <div className="slide-left">
        <h2>Some moments stay… 🌙</h2>
        <p>
          I don’t know when it happened,
          but these little memories started meaning more.
        </p>

        <button onClick={onNext}>Continue</button>
      </div>

      <div className="slide-right">
        <SlideShow />
      </div>
    </div>
  );
}
