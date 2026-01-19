let answered = false;

function selectAnswer(selectedBtn) {
  if (answered) return; // अगर पहले ही answer select किया, return
  answered = true;

  const buttons = document.querySelectorAll("button");

  // सभी buttons disable कर दो
  buttons.forEach(btn => btn.disabled = true);

  // correct option
  const correctBtn = Array.from(buttons).find(btn => btn.dataset.correct === "true");

  // अगर सही चुना
  if (selectedBtn.dataset.correct === "true") {
    selectedBtn.classList.add("correct");
  } 
  // अगर गलत चुना
  else {
    selectedBtn.classList.add("wrong");
    correctBtn.classList.add("correct");
  }

  // save state in localStorage
  localStorage.setItem("mcq_answer", selectedBtn.innerText);
}

// Page load par check karo aur previous selection show karo
window.addEventListener("load", () => {
  const saved = localStorage.getItem("mcq_answer");
  if (!saved) return;

  const buttons = document.querySelectorAll("button");
  answered = true;

  buttons.forEach(btn => {
    btn.disabled = true;
    if (btn.innerText === saved) {
      if (btn.dataset.correct === "true") {
        btn.classList.add("correct");
      } else {
        btn.classList.add("wrong");
        // correct answer bhi highlight karo
        const correctBtn = Array.from(buttons).find(b => b.dataset.correct === "true");
        if (correctBtn) correctBtn.classList.add("correct");
      }
    }
  });
});