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
        content = '<div class="circle">O</div>';
      } else if (fields[index] === "cross") {
        content = '<div class="cross">X</div>';
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
