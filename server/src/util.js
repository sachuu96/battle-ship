export function validateShipCells(cells) {
  if (cells.length < 2) return true; // 1 cell is always valid

  // Check if all cells share same x (vertical) or same y (horizontal)
  const allSameX = cells.every((cell) => cell.x === cells[0].x);
  const allSameY = cells.every((cell) => cell.y === cells[0].y);

  // Diagonal placement is not valid
  if (!allSameX && !allSameY) {
    return false;
  }

  const sortedCells = [...cells].sort((a, b) =>
    allSameX ? a.y - b.y : a.x - b.x
  );

  // cells should be adjacent therefore difference between them should be 1
  for (let i = 0; i < sortedCells.length - 1; i++) {
    const diff = allSameX
      ? sortedCells[i + 1].y - sortedCells[i].y
      : sortedCells[i + 1].x - sortedCells[i].x;

    if (diff !== 1) {
      return false;
    }
  }

  return true;
}
