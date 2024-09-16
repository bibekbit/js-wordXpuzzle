import { wordList } from "./wordList.js";

const wordDisplay = document.querySelector(".word");
const hintDisplay = document.querySelector("#hint");
const skipbtn = document.querySelector(".skip");
const checkbtn = document.querySelector(".check");
const inputWord = document.querySelector("input");
const countDown = document.querySelector("#color-time");
const scoreBoard = document.querySelector("#score-color");
let correctWord, timer, score=0;

const timerFunc = (maxTime) => {
    clearInterval(timer);
    timer = setInterval(()=>{
        if(maxTime>0){
            maxTime--;
            return countDown.innerText = maxTime;
        }
        
        alert(`Times off! ${correctWord.toUpperCase()} is a correct word`);
        startGame();
    }, 1000);
    
    
}

const startGame = () =>{
    timerFunc(30);
    let randomObj = wordList[Math.trunc(Math.random() * wordList.length)];
    let splitWord =randomObj.word.split("");
    hintDisplay.innerText = randomObj.hint;
    
    for(let i=splitWord.length-1; i>0; i--){
        let j= Math.trunc(Math.random() * (i+1)); // getting random word
        [splitWord[i], splitWord[j]] = [splitWord[j], splitWord[i]];  // swapping word randomly
    }
    wordDisplay.innerText = splitWord.join("");
    correctWord = randomObj.word.toLowerCase();
    inputWord.value = "";
    inputWord.setAttribute("maxlength", correctWord.length);
}
startGame();

const checkFunc = () => {
    let enterWord = inputWord.value.toLowerCase(); // getting user word
    if(!enterWord) return alert("Please enter word first..");
    if(enterWord !== correctWord) return alert(`Oops! ${enterWord} is not a correct word`);
    alert(`Congrats! ${enterWord.toUpperCase()} is a correct word`);
    if(enterWord === correctWord){
        score++;
    }
    scoreBoard.innerText = score;
    startGame();
    
}

skipbtn.addEventListener("click", startGame);
checkbtn.addEventListener("click", checkFunc);

