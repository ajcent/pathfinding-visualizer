import Grid from "classes/Grid";

export default class Pathfinder extends Grid {
  constructor(density, cell) {
    const { count } = density;
    const { walls } = cell;
    super(density, cell);

    this.visitOrder = [];
    this.pathOrder = [];
    this.walls = [...walls];
    this.path = Array.from(Array(count)).fill(false);
    this.visited = Array.from(Array(count)).fill(false);
    this.found = false;
  }

  authNeighbour(current, next) {
    const { walls, visited, col, terminal } = this;
    if (current - next === 1 && current % col === 0) return false;
    if (next - current === 1 && current % col === col - 1) return false;
    if (!(0 <= next && next <= this.length)) return false;
    if (next === terminal) return true;
    if (walls[next]) return false;
    if (visited[next]) return false;
    return true;
  }

  constructPath() {
    this.pathOrder = [];
    const { initial, terminal, prev, pathOrder, path, found } = this;

    pathOrder.push(terminal);
    let current = terminal;
    while (prev[current] !== -1) {
      pathOrder.push(prev[current]);
      path[current] = true;
      current = prev[current];
    }
    path[current] = true;
    pathOrder.reverse();

    if (!found) {
      pathOrder.push(initial);
      path[initial] = true;
    }
  }
}
