const keyboard = document.getElementById("keyboard");
const wordspace = document.getElementById("wordspace");
const popup = document.getElementById("myPopup");
const result = document.getElementById("result");
const close = document.getElementById("close");
const cat = document.getElementById("category");
const hangman = document.getElementById("hangman");

const word_btn = wordspace.getElementsByTagName("button");
const keyb_btn = keyboard.getElementsByTagName("button");
const hang_btn = hangman.getElementsByTagName("button");

let alpha = "QWERTYUIOPASDFGHJKLZXCVBNM";
let word;
let length;
let count = 0; 
let wrong = 0;
// after declaring word;
let word_id = document.getElementById(word);
const category = {
    TRANSPORT: ["BUS","CAR","TRAIN","PLANE","SHIP","BOAT","BICYCLE","BIKE"],
    FRUITS: ['APPLE','BANANA','ORANGE','MANGO','STRAWBERRY','PINEAPPLE','WATERMELON','KIWI'],
    COUNTRY: ['CANADA','AUSTRALIA','FRANCE','GERMANY','BRAZIL','INDIA','MEXICO','EGYPT'],
    ANIMAL: ['ELEPHANT', 'TIGER', 'GIRAFFE', 'WOLF', 'PENGUIN', 'KANGAROO', 'GORILLA','CROCODILE'],
    GAMES: ['CHESS','SUDOKU', 'FOOTBALL', 'BASKETBALL', 'TENNIS','VOLLEYBALL','CARROM','CRICKET']
};

function get_word(){
    const keys = Object.keys(category);
    const key = keys[Math.floor(Math.random() * keys.length)];
    // console.log(key);
    const values = category[key];
    const value = values[Math.floor(Math.random() * values.length)];
    return [key, value];

    // return { key:value};
}

function create_keys(){
    for(let i = 0; i<26; i++){
        let btn = document.createElement("button");
        btn.innerText = alpha[i];
        if (alpha[i]==="A"){
            btn.classList.add("containsA");
        }
        keyboard.appendChild(btn);
    }

}

function create_dash(){
    // console.log(length);

    let new_word_id = document.createElement("div");
    wordspace.appendChild(new_word_id);
    new_word_id.id = word;
    for(let i = 0; i< length; i++){
        let btn = document.createElement("button");
        // btn.innerText = word[i];// to see the word
        new_word_id.appendChild(btn);
    }
    // console.log(new_word_id.id);

}



function put_key(e) {
    const key = e.target.innerText;

    if (word.includes(key)){
        for(let i = 0; i< length; i++){
            if(word[i] === key){
                word_btn[i].innerText = key;
                count++;
            }
        }
    }
    else if(alpha.includes(key)){
        hang_btn[wrong].disabled = true;
        wrong++;

    }
    e.target.disabled = true;
    if (wrong === 7){
        get_correct();
        result.innerText = "YOU LOST";
        popup.classList.add("show");
        // after this closeEvent will do
        
    }
    if (count === length){
        result.innerText = "YOU WON";
        popup.classList.add("show");

        // restart();
    }
}
function closeEvent() {

    popup.classList.remove("show");
    restart();
}
function restart(){
    const obj = get_word();
    word_type = obj[0];
    word = obj[1];

    length = word.length;

    count = 0;
    wrong = 0;
    // remove old word
    word_id.remove();
    // create new word dash
    cat.innerText = word_type;
    create_dash(word);
    word_id = document.getElementById(word);
    active_keys();
}

function start(){
    const obj = get_word();
    word_type = obj[0];
    word = obj[1];
    // console.log(obj);
    
    length = word.length;

    cat.innerText = word_type;
    create_dash(word);
    word_id = document.getElementById(word);

}

function active_keys(){
    for(let i = 0; i<26; i++){
        keyb_btn[i].disabled = false;
    }
    for(let i = 0; i<7; i++){
        hang_btn[i].disabled = false;
    }
}

function get_correct(){
    let btn = wordspace.getElementsByTagName("button");

    for(let i = 0; i< length; i++){
        let str = btn[i].innerText;
        if (str === ""){
            btn[i].innerText = word[i];
            btn[i].style.color = "red";
        }
    }
}
//  word = "DOG";
create_keys();
start();

keyboard.addEventListener("click",put_key);
close.addEventListener("click", closeEvent);
