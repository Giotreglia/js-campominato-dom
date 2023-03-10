// CAMPO MINATO

/*
    
    L’utente clicca su un bottone che genererà una griglia di gioco quadrata.
    Ogni cella ha un numero progressivo, da 1 a 100.
    Ci saranno quindi 10 caselle per ognuna delle 10 righe.
    Quando l’utente clicca su ogni cella, la cella cliccata si colora di azzurro 
    ed emetto un messaggio in console con il numero della cella cliccata.

*/

// Elementi DOM
const playButtonDom = document.getElementById("play"); 
const squaresContainerDom = document.querySelector(".squares-container");
const scoreDom = document.getElementById('score');
const mainDom = document.querySelector('main');

 //Livelli
 
const facile = 100
const medio = 81
const difficile = 49  

// Creo la griglia di squares al clic sul bottone play

playButtonDom.addEventListener('click',
    
    function() {

        // Reset quadro
        squaresContainerDom.innerHTML = "";
        scoreDom.innerHTML = "";
        score = 0;
        mainDom.removeAttribute("style");


        // Definizione livello difficoltà

        const levelDom = document.getElementById("level").value;
        let gridCells;

        if (levelDom == "facile") {
            gridCells = facile;
        } else if (levelDom == "medio") {
            gridCells = medio;                                                      
        } else if (levelDom == "difficile") {
            gridCells = difficile;
        }       

        let rowCells = Math.sqrt(gridCells);       


        // Genero lista bombe

        let bombArray = [];
        let blacklist = [];
        let bombsList = [];

        for (let i = 0; i < 16; i++) {

            const numeroRandomUnico = uniqueRandomNumberGenerator(blacklist, 1, gridCells);
            blacklist.push(numeroRandomUnico);
            bombArray.push(numeroRandomUnico);
            
        }

        // Creo griglia compresa di caselle bomba

        for (let i = 1; i <= gridCells; i++) {
            
            const currentSquare = createNewSquare(i, rowCells);
            const isBomb = bombArray.includes(parseInt(currentSquare.innerText));

            // Definisco caselle bomba
            if (isBomb) {
                currentSquare.classList.add('bomb');  
                bombsList.push(currentSquare);
            }
            

            
            // Aggiunta evento al clic
            currentSquare.addEventListener('click',
                function () {
                    this.classList.add('clicked');
                    
                    // Conteggio click punteggio
                    score += 1;
                    currentSquare.style.pointerEvents = 'none';
                    scoreDom.innerHTML = `Il tuo punteggio è: ${score}`;

                            // Definisco numero massimo caselle per vittoria
                    let numeroVittoria = gridCells - 16;
                    console.log(numeroVittoria);
                    
                    if (isBomb) {
                        scoreDom.innerHTML += `, Hai Perso!`;
                        mainDom.style.pointerEvents = 'none';    
                        showBombs(bombsList);

                    } else if (score == numeroVittoria) {
                        scoreDom.innerHTML += `, Complmenti! Hai vinto!`;
                        alert('Complimenti! Hai vinto!')
                        mainDom.style.pointerEvents = 'none';
                        showBombs(bombsList);
                    }

                }               
            )
            squaresContainerDom.append(currentSquare);
        }    
        
    })



// FUNZIONI

// Funzione per creare square
function createNewSquare(content, rowCells) {
    const currentSquare = document.createElement("div");
    currentSquare.classList.add('square');
    currentSquare.style.width = `calc((var(--main-height) - 100px) / ${rowCells})`;
    currentSquare.style.height = `calc((var(--main-height) - 100px) / ${rowCells})`;
    currentSquare.innerHTML = content;

    return currentSquare;
}

// Funzione per creare numero random
function randomNumberGenerator(min, max) {
    number = Math.floor(Math.random() * (max - min + 1)) + min;
    return number;
}

// Funzione per creare numero random unico
function uniqueRandomNumberGenerator(blacklist, min, max) {
    let isValidNumber = false;
    let numeroRandom;

    while (!isValidNumber) {
        numeroRandom = randomNumberGenerator(min, max);
        if (!blacklist.includes(numeroRandom)) {
            isValidNumber = true;
        }
    }
    return numeroRandom;
}

// Funzione mostra bombe
function showBombs(bombsList) {
    for (let i = 0; i < bombsList.length; i++) {
        bombsList[i].classList.remove('clicked');
        bombsList[i].classList.add('lose');
    }   
}













