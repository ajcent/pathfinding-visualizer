import Pathfinder from "classes/Pathfinder";

export default class Greedy extends Pathfinder {
  constructor(density, cell) {
    const { count, col } = density;
    super(density, cell);

    this.f = Array.from(Array(count)).fill(0);
    this.g = Array.from(Array(count)).fill(0);
    this.col = col;
  }

  heuristic(pos) {
    const { terminal, col } = this;
    const currentY = parseInt(pos / col),
      currentX = parseInt(pos % col),
      goalY = parseInt(terminal / col),
      goalX = parseInt(terminal % col);

    return Math.abs(currentX - goalX) + Math.abs(currentY - goalY);
  }

  leastF(openSet) {
    const { f } = this;
    const mappedF = openSet.map((pos) => f[pos]);
    const leastFIndex = mappedF.indexOf(Math.min(...mappedF));
    return leastFIndex;
  }

  generate() {
    const { visited, prev, initial, terminal, visitOrder } = this;
    const { g, f } = this;
    let openSet = [initial];

    while (openSet.length > 0 && !this.found) {
      const current = openSet.splice(this.leastF(openSet), 1)[0];

      if (current === terminal) this.found = true;
      visited[current] = true;
      visitOrder.push(current);

      const neighbour = this.getNeighbour(current);
      neighbour.forEach((next) => {
        prev[next] = current;
        if (visited[next]) return;
        if (g[next] === 0) prev[next] = current;

        const tempG = g[current] + 1;
        if (g[next] !== 0) {
          if (tempG < g[next]) {
            g[next] = tempG;
          }
        } else {
          g[next] = tempG;
          openSet.push(next);
        }
        f[next] = this.heuristic(next);
      });
    }

    this.constructPath();
    return this;
  }
}
