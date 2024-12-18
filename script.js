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
}

function handleClick(index) {
    if (fields[index] !== null) return;

    const currentSymbol = currentPlayer === 'circle' ? 'circle' : 'cross';
    fields[index] = currentSymbol;

    const cell = document.querySelector(`#cell-${index}`);
    if (currentSymbol === 'circle') {
        cell.innerHTML = `
            <svg width="70" height="70" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <circle cx="50" cy="50" r="40" stroke="#00B0EF" fill="none" stroke-width="5">
                    <animate attributeName="stroke-dasharray" from="0" to="251.2" dur="0.5s" fill="freeze" />
                </circle>
            </svg>
        `;
    } else if (currentSymbol === 'cross') {
        cell.innerHTML = `
            <svg width="70" height="70" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <line x1="20" y1="20" x2="80" y2="80" stroke="#FFC000" stroke-width="5"
                      stroke-dasharray="84.85" stroke-dashoffset="84.85">
                    <animate attributeName="stroke-dashoffset" from="84.85" to="0" dur="0.5s" fill="freeze" />
                </line>
                <line x1="80" y1="20" x2="20" y2="80" stroke="#FFC000" stroke-width="5"
                      stroke-dasharray="84.85" stroke-dashoffset="84.85">
                    <animate attributeName="stroke-dashoffset" from="84.85" to="0" dur="0.5s" fill="freeze" />
                </line>
            </svg>
        `;
    }

    currentPlayer = currentPlayer === 'circle' ? 'cross' : 'circle';
}

function generateAnimatedCircle() {
    return `
        <svg width="70" height="70" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <circle
                cx="50"
                cy="50"
                r="40"
                stroke="#00B0EF"
                fill="none"
                stroke-width="5"
                stroke-dasharray="251.2"
                stroke-dashoffset="251.2"
            >
                <animate
                    attributeName="stroke-dashoffset"
                    from="251.2"
                    to="0"
                    dur="0.25s"
                    fill="freeze"
                />
            </circle>
        </svg>
    `;
}

function generateAnimatedCross() {
    return `
        <svg width="70" height="70" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <!-- Linie von links oben nach rechts unten -->
            <line 
                x1="20" 
                y1="20" 
                x2="80" 
                y2="80" 
                stroke="#FFC000" 
                stroke-width="5" 
                stroke-dasharray="84.85" 
                stroke-dashoffset="84.85">
                <animate
                    attributeName="stroke-dashoffset"
                    from="84.85"
                    to="0"
                    dur="0.25s"
                    fill="freeze"
                />
            </line>
            <!-- Linie von rechts oben nach links unten -->
            <line 
                x1="80" 
                y1="20" 
                x2="20" 
                y2="80" 
                stroke="#FFC000" 
                stroke-width="5" 
                stroke-dasharray="84.85" 
                stroke-dashoffset="84.85">
                <animate
                    attributeName="stroke-dashoffset"
                    from="84.85"
                    to="0"
                    dur="0.25s"
                    begin="0s"
                    fill="freeze"
                />
            </line>
        </svg>
    `;
}