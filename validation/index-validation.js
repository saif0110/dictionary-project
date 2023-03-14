const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const btn = document.getElementById("search-btn");
const result = document.getElementById("result");
const sound = document.getElementById("sound");

if(localStorage.dictionary == undefined){
    var dictionary = [];
    localStorage.setItem('dictionary',JSON.stringify(dictionary));
}

btn.addEventListener("click", () => {
    let inputWord = document.getElementById("input-search").value;
    if(inputWord == '')
        return 0;
    fetch(`${url}${inputWord}`)
        .then((response) => response.json())
        .then((data) => {
            result.innerHTML = `
            <div class="word">
                <h3 id="found-word">${inputWord}</h3>
                <button id="audio-btn" onclick="playSound()">
                <i class='bx bxs-volume-full'></i>
                </button>
            </div>
            <div class="details">
                <p class="details-para">${data[0].meanings[0].partOfSpeech}</p>
                <p class="details-para">${data[0].phonetic}</p>
            </div>
            <div class="meaning-example">
                <p class="word-meaning" id="found-meaning">
                    ${data[0].meanings[0].definitions[0].definition}
                </p>
                <p class="word-example">
                ${data[0].meanings[0].definitions[0].example || ""}
                </p>
            </div>`;
            let urlmp3 = "";
            for(let i=0; i<data[0].phonetics.length;i++){
                if(data[0].phonetics[i].audio != ''){
                    urlmp3 = data[0].phonetics[i].audio;
                    break;
                }
            }
            sound.setAttribute('src',urlmp3);
            inputWord = inputWord.toLowerCase();
            let obj = {
                "word" : inputWord,
                "meaning" : data[0].meanings[0].definitions[0].definition,
                "counter": 1
            }
            let list = localStorage.getItem('dictionary');
            list = JSON.parse(list);
            let flag = false;
            for(let traverse=0; traverse<list.length; traverse++){
                let localWord = list[traverse].word;
                localWord = localWord.toLowerCase();
                if(localWord == inputWord){
                    flag = true;
                    list[traverse].counter += 1;
                    localStorage.setItem('dictionary', JSON.stringify(list));
                    break;
                }
            }
            list.unshift(obj);
            if(!flag)
                localStorage.setItem('dictionary', JSON.stringify(list));
        })
        .catch(() =>{
            result.innerHTML = `<h2 style="text-align:left">Couldn't find the word</h2>`;
        });
});

function playSound(){
    if(sound != '')
        sound.play();
}