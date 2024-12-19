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

    let startX = rectA.left - contentRect.left;
    let startY = rectA.top - contentRect.top;
    let endX = rectC.left - contentRect.left + rectC.width;
    let endY = rectC.top - contentRect.top + rectC.height;

    const isHorizontal = startY === endY - rectC.height;
    const isVertical = startX === endX - rectC.width;

    if (isHorizontal) {
        startX += 16; // Kürze am Anfang
        endX -= 16;   // Kürze am Ende
        line.style.width = `${Math.abs(endX - startX)}px`;
        line.style.height = '5px';
        line.style.left = `${startX}px`;
        line.style.top = `${startY + rectA.height / 2}px`;
        line.style.transform = 'rotate(0deg)';
    } else if (isVertical) {
        startY += 16; // Kürze am Anfang
        endY -= 16;   // Kürze am Ende
        line.style.width = '5px';
        line.style.height = `${Math.abs(endY - startY)}px`;
        line.style.left = `${startX + rectA.width / 2}px`;
        line.style.top = `${startY}px`;
        line.style.transform = 'rotate(0deg)';
    } else {
        const totalLength = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2));
        const angle = Math.atan2(endY - startY, endX - startX);

        // Kürze die Linie um 16px an beiden Enden
        const shortenedLength = totalLength - 32; // Kürzen um 16px * 2
        const offsetX = 16 * Math.cos(angle); // X-Offset für Verkürzung
        const offsetY = 16 * Math.sin(angle); // Y-Offset für Verkürzung

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