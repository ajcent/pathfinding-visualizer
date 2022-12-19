export default class Cell {
  constructor(dimension) {
    const { count, row, col } = dimension;
    this.initial = col * Math.floor(row / 2) + Math.trunc(col * 0.25) + 1;
    this.terminal = col * Math.floor(row / 2) + Math.trunc(col * 0.75) - 1;
    this.walls = Array.from(Array(count)).fill(false);
    this.visited = Array.from(Array(count)).fill(false);
    this.path = Array.from(Array(count)).fill(false);
  }
}
