const dictionaryInp = document.querySelector(".dic-input");
const dictionaryBtn = document.querySelector("#dic-btn");
const dictionaryForm = document.querySelector("#dic-form");
const elDictionaries = document.querySelector(".dictionaries");
const elAudioBtn = document.querySelector(".audiobtn");

dictionaryForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const dictionaryInp = document.querySelector(".dic-input").value;

  (async () => {
    try {
      if (dictionaryInp != "") {
        let response = await fetch(
          `https://api.dictionaryapi.dev/api/v2/entries/en/${dictionaryInp}`
        );
        if (response.status != 200) {
          throw new Error("nimadir neto !");
        }
        let data = await response.json();
        render(data);
      }
    } catch (error) {
      console.error(error);
    }
  })();
});

elDictionaries.addEventListener("click", (e) => {
  let audiolink = e.target.dataset.audioUrl;
  let sound = new Audio(audiolink);
  sound.play();
});

function render(data) {
  elDictionaries.innerHTML = null;
  data.forEach((element) => {
    let div = document.createElement("div");
    let word = document.createElement("h2");

    div.classList.add("box");

    element.phonetic
      ? (word.textContent = element.word + " - " + element.phonetic)
      : (word.textContent = element.word);
    word.classList.add("word");

    div.appendChild(word);

    element.meanings?.forEach((def) => {
      def.definitions?.forEach((e) => {
        let definitionText = document.createElement("p");
        let examp = document.createElement("p");

        definitionText.textContent = e.definition;
        e.example
          ? (examp.textContent = "Example: " + e.example)
          : (examp.textContent = "");
        examp.classList.add("example");
        definitionText.classList.add("def");
        div.appendChild(definitionText);
        div.appendChild(examp);
      });
    });

    element.phonetics.forEach((sound) => {
      if (sound.audio != "") {
        let audiobtn = document.createElement("button");
        audiobtn.classList.add("audiobtn");
        let arr1 = sound.audio.split(".");
        let arr2 = arr1[arr1.length - 2].split("-");
        audiobtn.textContent = arr2[arr2.length - 1].toUpperCase() + "🎵";
        audiobtn.classList.add("btn");
        audiobtn.dataset.audioUrl = sound.audio;
        div.appendChild(audiobtn);
      }
    });

    elDictionaries.appendChild(div);
  });
}
