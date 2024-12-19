function generateCrossSVG() {
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

function generateCircleSVG() {
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

function getUpdatePlayerHTMLTemplate () {
    return `
    <div class="player ${currentPlayer === 'circle' ? 'active' : 'inactive'}">
        <svg width="50" height="50" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="40" stroke="#00B0EF" fill="none" stroke-width="5" />
        </svg>
    </div>
    <div class="player ${currentPlayer === 'cross' ? 'active' : 'inactive'}">
        <svg width="50" height="50" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <line x1="20" y1="20" x2="80" y2="80" stroke="#FFC000" stroke-width="5" />
            <line x1="80" y1="20" x2="20" y2="80" stroke="#FFC000" stroke-width="5" />
        </svg>
    </div>
`;
}