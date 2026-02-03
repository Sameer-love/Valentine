export default function ValentineQuestion({ onAnswer }) {
  return (
    <div className="center">
      <h1>Will you be my Valentine? 💖</h1>
      <div className="buttons">
        <button onClick={() => onAnswer("yes")}>Yes 💗</button>
        <button onClick={() => onAnswer("talk")}>Let’s talk 🤍</button>
      </div>
    </div>
  );
}
