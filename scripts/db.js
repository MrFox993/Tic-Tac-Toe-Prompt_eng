let fields = [
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
];

const winningCombinations = [
    [0, 1, 2], // Horizontal oben
    [3, 4, 5], // Horizontal mitte
    [6, 7, 8], // Horizontal unten
    [0, 3, 6], // Vertikal links
    [1, 4, 7], // Vertikal mitte
    [2, 5, 8], // Vertikal rechts
    [0, 4, 8], // Diagonal von links oben nach rechts unten
    [2, 4, 6]  // Diagonal von rechts oben nach links unten
];