let currentPlayer = 'circle';
let gameEnded = false;

function init() {
  renderTable();
}

function renderTable() {
    const content = document.getElementById('content');
    content.innerHTML = `
        <div id="player-display">
            <div class="player ${currentPlayer === 'circle' ? 'active' : ''}">${generateCircleSVG()}</div>
            <div class="player ${currentPlayer === 'cross' ? 'active' : ''}">${generateCrossSVG()}</div>
        </div>
    `;
    const table = document.createElement('table');
    table.innerHTML = `
        ${[0, 1, 2].map(row => `
            <tr>
                ${[0, 1, 2].map(col => `
                    <td id="cell-${row * 3 + col}" onclick="handleClick(${row * 3 + col})">
                        ${fields[row * 3 + col] === 'circle' ? generateCircleSVG() : ''}
                        ${fields[row * 3 + col] === 'cross' ? generateCrossSVG() : ''}
                    </td>
                `).join('')}
            </tr>
        `).join('')}
    `;
    content.appendChild(table);
}

function handleClick(index) {
    if (fields[index] || gameEnded) return;
    fields[index] = currentPlayer;
    updateCell(index);
    checkGameOver();
    currentPlayer = currentPlayer === 'circle' ? 'cross' : 'circle';
    updatePlayerDisplay();
}

function updateCell(index) {
    const cell = document.getElementById(`cell-${index}`);
    if (fields[index] === 'circle') {
        cell.innerHTML = generateCircleSVG();
    } else if (fields[index] === 'cross') {
        cell.innerHTML = generateCrossSVG();
    }
}

function updatePlayerDisplay() {
    const playerDisplay = document.getElementById('player-display');
    playerDisplay.innerHTML = `
        <div class="player ${currentPlayer === 'circle' ? 'active' : ''}">${generateCircleSVG()}</div>
        <div class="player ${currentPlayer === 'cross' ? 'active' : ''}">${generateCrossSVG()}</div>
    `;
}

function updateCurrentPlayerDisplay() {
    const playerDisplay = document.getElementById('player-display');
    playerDisplay.innerHTML = getUpdatePlayerHTMLTemplate ();
}

function checkWinner() {
    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (fields[a] && fields[a] === fields[b] && fields[a] === fields[c]) {
            return {
                player: fields[a],
                combination: combination
            };
        }
    }
    return null;
}

function drawWinningLine(combination) {
    const content = document.getElementById('content');
    const line = document.createElement('div');
    line.classList.add('winning-line');

    const cellA = document.querySelector(`#cell-${combination[0]}`);
    const cellC = document.querySelector(`#cell-${combination[2]}`);

    const rectA = cellA.getBoundingClientRect();
    const rectC = cellC.getBoundingClientRect();
    const contentRect = content.getBoundingClientRect();

    let startX = rectA.left - contentRect.left;
    let startY = rectA.top - contentRect.top;
    let endX = rectC.left - contentRect.left + rectC.width;
    let endY = rectC.top - contentRect.top + rectC.height;

    const isHorizontal = startY === endY - rectC.height;
    const isVertical = startX === endX - rectC.width;

    if (isHorizontal) {
        startX += 16;
        endX -= 16;
        line.style.width = `${Math.abs(endX - startX)}px`;
        line.style.height = '5px';
        line.style.left = `${startX}px`;
        line.style.top = `${startY + rectA.height / 2}px`;
        line.style.transform = 'rotate(0deg)';
    } else if (isVertical) {
        startY += 16;
        endY -= 16;
        line.style.width = '5px';
        line.style.height = `${Math.abs(endY - startY)}px`;
        line.style.left = `${startX + rectA.width / 2}px`;
        line.style.top = `${startY}px`;
        line.style.transform = 'rotate(0deg)';
    } else {
        const totalLength = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2));
        const angle = Math.atan2(endY - startY, endX - startX);

        const shortenedLength = totalLength - 32;
        const offsetX = 16 * Math.cos(angle);
        const offsetY = 16 * Math.sin(angle);

        startX += offsetX;
        startY += offsetY;
        endX -= offsetX;
        endY -= offsetY;

        line.style.width = `${shortenedLength}px`;
        line.style.height = '5px';
        line.style.left = `${startX}px`;
        line.style.top = `${startY}px`;
        line.style.transform = `rotate(${angle * (180 / Math.PI)}deg)`;
    }

    content.appendChild(line);
}

function checkGameOver() {
    const winner = checkWinner();
    const isDraw = fields.every(field => field !== null);
    if (winner) {
        gameEnded = true;
        drawWinningLine(winner.combination);
        displayRestartButton(`${winner.player === 'circle' ? 'Circle' : 'Cross'} Wins! Restart Game`);
    } else if (isDraw) {
        gameEnded = true;
        displayRestartButton("It's a Draw! Restart Game");
    }
}

function displayRestartButton(message) {
    const content = document.getElementById('content');
    const restartContainer = document.createElement('div');
    restartContainer.id = 'restart-container';
    restartContainer.style.marginTop = '20px';
    restartContainer.style.textAlign = 'center';
    restartContainer.innerHTML = `
        <p>${message}</p>
        <button id="restart-button" onclick="restartGame()">Restart Game</button>
    `;
    content.appendChild(restartContainer);
}

function restartGame() {
    fields = Array(9).fill(null);
    currentPlayer = 'circle';
    gameEnded = false;
    const content = document.getElementById('content');
    const restartContainer = document.getElementById('restart-container');
    if (restartContainer) {
        content.removeChild(restartContainer);
    }
    renderTable();
}