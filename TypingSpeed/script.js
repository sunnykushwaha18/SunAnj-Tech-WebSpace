const startButton = document.getElementById("startButton");
const inputArea = document.getElementById("input");
const quoteDisplay = document.getElementById("quote");
const timerDisplay = document.getElementById("timer");
const timeLeftDisplay = document.getElementById("timeLeft");
const wpmDisplay = document.getElementById("wpm");
const cpmDisplay = document.getElementById("cpm");
const accuracyDisplay = document.getElementById("accuracy");

let startTime, endTime, timeInterval, timer, timeLeft;
let quote = "";

const quotes = [
    // Add your quotes here
    "Once on a time there was a Little Old Woman who lived in a Shoe. This shoe stood near a great forest, and was so large that it served as a house for the Old Lady and all her children, of which she had so many that she did not know what to do with them.",
    "But the Little Old Woman was very fond of her children, and they only thought of the best way to please her. Strong-arm, the eldest, cut down trees for firewood. Peter made baskets of wicker-work. Mark was chief gardener. Lizzie milked the cow, and Jenny taught the younger children to read.",
    "Now this Little Old Woman had not always lived in a Shoe. She and her family had once dwelt in a nice house covered with ivy, and her husband was a wood-cutter, like Strong-arm. But there lived in a huge castle beyond the forest, a fierce giant, who one day came and laid their house in ruins with his club;",
    "after which he carried off the poor wood-cutter to his castle beyond the forest. When the Little Old Woman came home, her house was in ruins and her husband was no where to be seen.",
    "Night came on, and as the father did not return, the Old Lady and her family went to search for him. When they came to that part of the wood where the Giant had met their father, they saw an immense shoe. They spent a long time weeping and calling out for their father, but met with no reply. Then the Old Lady thought that they had better take shelter in the shoe until they could build a new house. ",
    "So Peter and Strong-arm put a roof to it, and cut a door, and turned it into a dwelling. Here they all lived happily for many years, but the Little Old Lady never forgot her husband and his sad fate. Strong-arm, who saw how wretched his mother often was about it, proposed to the next eleven brothers that they should go with him and set their father free from the Giant. ",
    "Their mother knew the Giant's strength, and would not hear of the attempt, as she feared they would be killed. But Strong-arm was not afraid. He bought a dozen sharp swords, and Peter made as many strong shields and helmets, as well as cross-bows and iron-headed arrows.",
    "They were now quite ready; Strong-arm gave the order to march, and they started for the forest. The next day they came in sight of the Giant's Castle. Strong-arm, leaving his brothers in a wood close by, strode boldly up to the entrance, and seized the knocker. The door was opened by a funny little boy with a large head, who kept grinning and laughing.",
    "Strong-arm then walked boldly across the court-yard, and presently met a page, who took off his hat and asked him what he wanted. Strong-arm said he had come to liberate his father, who was kept a prisoner by the Giant; on this the little man said he was sorry for him, because the part of the castle in which his father was kept was guarded by a large dragon. "
];

function getRandomQuote() {
    return quotes[Math.floor(Math.random() * quotes.length)];
}

function updateResults() {
    const userText = inputArea.value;
    const wordCount = userText.trim().split(/\s+/).length;
    const charCount = userText.length;
    const totalTime = 60 - timeLeft;
    const typingSpeedWPM = Math.round((wordCount / totalTime) * 60);
    const typingSpeedCPM = Math.round((charCount / totalTime) * 60);
    const accuracy = calculateAccuracy(quote, userText);

    wpmDisplay.textContent = typingSpeedWPM;
    cpmDisplay.textContent = typingSpeedCPM;
    accuracyDisplay.textContent = accuracy;
}

function calculateAccuracy(original, input) {
    const originalWords = original.trim().split(/\s+/);
    const inputWords = input.trim().split(/\s+/);
    let correctCount = 0;

    originalWords.forEach((word, index) => {
        if (inputWords[index] === word) {
            correctCount++;
        }
    });

    return Math.round((correctCount / originalWords.length) * 100);
}


function startTest() {
  startButton.disabled = true;
  inputArea.disabled = false;
  inputArea.value = "";
  inputArea.focus();
  quote = getRandomQuote();
  quoteDisplay.textContent = quote;
  startTime = new Date().getTime();
  timeLeft = 60;
  timerDisplay.textContent = timeLeft;

  timeInterval = setInterval(() => {
      timeLeft--;
      if (timeLeft <= 0) {
          clearInterval(timeInterval);
          endTest();
      } else {
          timerDisplay.textContent = timeLeft;
          updateResults();
      }
  }, 1000);
}

function endTest() {
  endTime = new Date().getTime();
  const totalTime = (endTime - startTime) / 1000;
  const userText = inputArea.value;
  const wordCount = userText.trim().split(/\s+/).length;
  const typingSpeedWPM = Math.round((wordCount / totalTime) * 60);
  const accuracy = calculateAccuracy(quote, userText);

  clearInterval(timeInterval);
  wpmDisplay.textContent = typingSpeedWPM;
  accuracyDisplay.textContent = accuracy;

  // Disable input and clear textarea
  inputArea.disabled = true;
  inputArea.value = "";

  startButton.disabled = false;
}

startButton.addEventListener("click", startTest);
inputArea.addEventListener("input", updateResults);
