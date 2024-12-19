let currentPlayer = 'circle';

function init() {
  renderTable();
}

function renderTable() {
    const tableHTML = `
        <table>
            <tr>
                ${fields.slice(0, 3).map((_, index) => `<td id="cell-${index}" onclick="handleClick(${index})"></td>`).join('')}
            </tr>
            <tr>
                ${fields.slice(3, 6).map((_, index) => `<td id="cell-${index + 3}" onclick="handleClick(${index + 3})"></td>`).join('')}
            </tr>
            <tr>
                ${fields.slice(6, 9).map((_, index) => `<td id="cell-${index + 6}" onclick="handleClick(${index + 6})"></td>`).join('')}
            </tr>
        </table>
    `;
    document.getElementById('content').innerHTML = tableHTML;
    updateCurrentPlayerDisplay();
}

function handleClick(index) {
    if (fields[index] !== null || checkWinner()) return;

    const currentSymbol = currentPlayer === 'circle' ? 'circle' : 'cross';
    fields[index] = currentSymbol;

    const cell = document.querySelector(`#cell-${index}`);
    if (currentSymbol === 'circle') {
        cell.innerHTML = generateAnimatedCircle();
    } else if (currentSymbol === 'cross') {
        cell.innerHTML = generateAnimatedCross();
    }

    if (checkWinner()) {
        return;
    }

    currentPlayer = currentPlayer === 'circle' ? 'cross' : 'circle';
    updateCurrentPlayerDisplay();
}

function updateCurrentPlayerDisplay() {
    const playerDisplay = document.getElementById('player-display');
    playerDisplay.innerHTML = getUpdatePlayerHTMLTemplate ();
}

function checkWinner() {
    for (const combination of winningCombinations) {
        const [a, b, c] = combination;

        if (fields[a] !== null && fields[a] === fields[b] && fields[a] === fields[c]) {
            drawWinningLine(combination);
            return true;
        }
    }
    return false;
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

    const x1 = rectA.left - contentRect.left + rectA.width / 2;
    const y1 = rectA.top - contentRect.top + rectA.height / 2;
    const x2 = rectC.left - contentRect.left + rectC.width / 2;
    const y2 = rectC.top - contentRect.top + rectC.height / 2;

    const lineLength = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    const angle = Math.atan2(y2 - y1, x2 - x1) * (180 / Math.PI);

    line.style.width = lineLength + 'px';
    line.style.transform = `rotate(${angle}deg)`;
    line.style.left = `${x1}px`;
    line.style.top = `${y1}px`;

    content.appendChild(line);
}