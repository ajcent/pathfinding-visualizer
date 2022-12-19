import Grid, { eDir } from "classes/Grid";
import shuffle from "util/Shuffle";

export default class Maze extends Grid {
  constructor(density, cell) {
    const { count, col } = density;
    super(density, cell);

    this.walls = Array.from(Array(count)).fill(true);
    this.start = col + 1;
    this.turn = this.start % 2 === 0 ? 0 : 1;
    this.carveOrder = [];
  }

  authNode(current) {
    const { prev: prevList, col, walls } = this;
    const prev = prevList[current];

    const tr = this.getDir(current, eDir.TOP_RIGHT),
      br = this.getDir(current, eDir.BOTTOM_RIGHT),
      bl = this.getDir(current, eDir.BOTTOM_LEFT),
      tl = this.getDir(current, eDir.TOP_LEFT);

    if (prev - current === col) return walls[tr] && walls[tl];
    if (current - prev === 1) return walls[tr] && walls[br];
    if (current - prev === col) return walls[br] && walls[bl];
    if (prev - current === 1) return walls[bl] && walls[tl];
    return true;
  }

  authNeighbour(current, next) {
    const { col, row, prev, turn } = this;
    if (next < col) return false;
    if (next % col === 0) return false;
    if (next % col === col - 1) return false;
    if (next >= col * (row - 1)) return false;

    const currentDir = Math.abs(current - prev[current]);
    const nextDir = Math.abs(next - current);
    return !(current % 2 !== turn && currentDir !== nextDir);
  }

  generate() {
    const { walls, prev, start, carveOrder } = this;
    const queue = [start];

    while (queue.length > 0) {
      const current = queue.pop();
      if (walls[current] && this.authNode(current)) {
        carveOrder.push(current);
        walls[current] = false;
        const neighbour = shuffle(this.getNeighbour(current));

        for (const next of neighbour) {
          prev[next] = current;
          queue.push(next);
        }
      }
    }

    return this;
  }
}
