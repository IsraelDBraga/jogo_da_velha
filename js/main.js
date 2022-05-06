const statusDisplay = document.querySelector('.game--status');

let gameActive = true;
let jogadorAtual = "X";
let gameState = ["", "", "", "", "", "", "", "", ""];

const mensagemVitoria = () => `Jogador ${jogadorAtual} venceu!`;
const mensagemEmpate = () => `Deu velha!`;
const jogadorAtualVez = () => `É a vez do jogador ${jogadorAtual}`;

statusDisplay.innerHTML = jogadorAtualVez();

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleCellPlayed(clickedCell, clickedCellIndex) {
    gameState[clickedCellIndex] = jogadorAtual;
    clickedCell.innerHTML = jogadorAtual;
}

function handlePlayerChange() {
    jogadorAtual = jogadorAtual === "X" ? "O" : "X";
    statusDisplay.innerHTML = jogadorAtualVez();
}

function handleResultValidation() {
    let venceuRodada = false;
    for (let i = 0; i <= 7; i++) {
        const winCondition = winningConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            venceuRodada = true;
            break
        }
    }

    if (venceuRodada) {
        statusDisplay.innerHTML = mensagemVitoria();
        gameActive = false;
        return;
    }

    let empateRodada = !gameState.includes("");
    if (empateRodada) {
        statusDisplay.innerHTML = mensagemEmpate();
        gameActive = false;
        return;
    }

    handlePlayerChange();
}

function handleCellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));

    if (gameState[clickedCellIndex] !== "" || !gameActive) {
        return;
    }

    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation();
}

function handleRestartGame() {
    gameActive = true;
    jogadorAtual = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.innerHTML = jogadorAtualVez();
    document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "");
}

document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));
document.querySelector('.game--restart').addEventListener('click', handleRestartGame);