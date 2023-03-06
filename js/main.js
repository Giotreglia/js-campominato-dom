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

 //Livelli
 
const facile = 100
const medio = 81
const difficile = 49  

// Creo la griglia di squares al clic sul bottone play

playButtonDom.addEventListener('click',
    
    function() {

        // Reset quadro
        squaresContainerDom.innerHTML = "";

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
        
        // Creo griglia

        for (let i = 1; i <= gridCells; i++) {
            
            const currentSquare = createNewSquare(i);

            if (gridCells == facile) {
                currentSquare.classList.add('easy');
            } else if (gridCells == medio) {
                currentSquare.classList.add('medium');
            } else if (gridCells == difficile) {
                currentSquare.classList.add('hard');
            }
            
            currentSquare.addEventListener('click',
                function() {
                    this.classList.toggle('clicked');
                    console.log(i);
                }
            )

            squaresContainerDom.append(currentSquare);
            
        } 
        
    })



// FUNZIONI

function createNewSquare(content) {
    const currentSquare = document.createElement("div");
    currentSquare.classList.add('square');
    //currentSquare.style.width = `calc((var(--main-height) - 100px) / ${rowCells})`
    currentSquare.innerHTML = content;
    return currentSquare;
}







