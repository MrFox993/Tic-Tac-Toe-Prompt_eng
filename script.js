function init() {
  renderTable();
}

function renderTable() {
  let tableHTML = "<table>";

  for (let i = 0; i < 3; i++) {
    tableHTML += "<tr>";
    for (let j = 0; j < 3; j++) {
      const index = i * 3 + j;
      let content = "";
      if (fields[index] === "circle") {
        content = generateAnimatedCircle();
      } else if (fields[index] === "cross") {
        content = generateAnimatedCross();
      }

      tableHTML += `<td onclick="handleClick(${index})">${content}</td>`;
    }
    tableHTML += "</tr>";
  }

  tableHTML += "</table>";
  document.getElementById("content").innerHTML = tableHTML;
}

function handleClick(index) {
  if (!fields[index]) {
    fields[index] = "circle";
    renderTable();
  }
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