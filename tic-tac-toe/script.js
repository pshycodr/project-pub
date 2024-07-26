const cells = document.querySelectorAll(".cell");
const resetButton = document.querySelector(".reset-button");
const scoreBoard = document.querySelector(".scoreBoard-container");

let winner = null;
let currentPlayer = "X";

function checkWinner() {
    const winningPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [2, 4, 6],
        [0, 4, 8]
    ];
    for (const pattern of winningPatterns) {
        const [a, b, c] = pattern;
        if ((cells[a].textContent) && (cells[a].textContent === cells[b].textContent) && (cells[a].textContent === cells[c].textContent)) {
            cells[a].style.backgroundColor = cells[b].style.backgroundColor = cells[c].style.backgroundColor = "#4CAF50";
            winner = currentPlayer;
            return true;
        }
    }
    return false;
}

function handelCellClick(event) {
    const cell = event.target;
    if (cell.textContent || winner) return;

    cell.textContent = currentPlayer;

    if (checkWinner()) {
        setTimeout(() => {
            scoreBoard.innerHTML = `
                <div class="score-board">
                    <h3>Result</h3>
                    <p><b>${currentPlayer}</b> Wins the game🎉🎉🎉</p>
                    <button class="scoreBoard-reset-button reset-button">Restart</button>
                </div>
            `;
            scoreBoard.style.zIndex = "1";
            scoreBoard.style.backgroundColor = "#ffffff68";

            // Now add event listener to the newly created reset button
            const scoreBoardResetButton = document.querySelector(".scoreBoard-reset-button");
            scoreBoardResetButton.addEventListener('click', handelResetButton);
        }, 500);
        return;
    }

    if ([...cells].every(cell => cell.textContent)) {
            setTimeout(() => {
            scoreBoard.innerHTML = `
                <div class="score-board">
                    <h3>Result</h3>
                    <p><b>It's a tie!!!</b></p>
                    <button class="scoreBoard-reset-button reset-button">Restart</button>
                </div>
            `;
            scoreBoard.style.zIndex = "1";
            scoreBoard.style.backgroundColor = "#ffffff68";

            // Now add event listener to the newly created reset button
            const scoreBoardResetButton = document.querySelector(".scoreBoard-reset-button");
            scoreBoardResetButton.addEventListener('click', handelResetButton);
        })
        return;
    }

    currentPlayer = (currentPlayer === 'X') ? 'O' : 'X';
}

function handelResetButton() {
    cells.forEach(cell => {
        cell.textContent = '';
        cell.style.backgroundColor = '#444';
    });

    winner = null;
    currentPlayer = 'X';
    scoreBoard.innerHTML = null
    scoreBoard.style.zIndex = "-1";
    scoreBoard.style.backgroundColor = "#1e1e1e";
}

cells.forEach(cell => cell.addEventListener('click', handelCellClick));
resetButton.addEventListener('click', handelResetButton);
