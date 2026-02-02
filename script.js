function showYes() {
    document.getElementById("main").classList.add("hidden");
    document.getElementById("yesScreen").classList.remove("hidden");
  }
  
  function showNo() {
    document.getElementById("main").classList.add("hidden");
    document.getElementById("noScreen").classList.remove("hidden");
  }
  
  /* EMOJI BACKGROUND EFFECT */
  
  const emojis = ["💖", "🌸", "✨", "🤍", "💫"];
  const emojiContainer = document.getElementById("emojiBackground");
  
  function createEmoji() {
    const emoji = document.createElement("div");
    emoji.classList.add("emoji");
    emoji.innerText = emojis[Math.floor(Math.random() * emojis.length)];
  
    emoji.style.left = Math.random() * 100 + "vw";
    emoji.style.fontSize = Math.random() * 20 + 20 + "px";
    emoji.style.animationDuration = Math.random() * 10 + 8 + "s";
  
    emojiContainer.appendChild(emoji);
  
    setTimeout(() => {
      emoji.remove();
    }, 18000);
  }
  
  setInterval(createEmoji, 600);
  