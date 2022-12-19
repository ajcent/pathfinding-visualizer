import Pathfinder from "classes/Pathfinder";

export default class Astar extends Pathfinder {
  constructor(density, cell) {
    const { count, col } = density;
    super(density, cell);

    this.f = Array.from(Array(count)).fill(0);
    this.g = Array.from(Array(count)).fill(0);
    this.h = Array.from(Array(count)).fill(0);
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

  leastCost(openSet) {
    const { f, h } = this;
    const mappedF = openSet.map((pos) => f[pos]);
    const mappedH = openSet.map((pos) => h[pos]);

    let min = 0;
    for (const pos in openSet) {
      if (mappedF[pos] <= mappedF[min]) {
        if (mappedF[pos] === mappedF[min]) {
          min = mappedH[pos] < mappedH[min] ? pos : min;
        } else {
          min = pos;
        }
      }
    }
    return min;
  }

  generate() {
    const { visited, prev, initial, terminal, visitOrder } = this;
    const { g, h, f } = this;
    let openSet = [initial];

    while (openSet.length > 0 && !this.found) {
      const current = openSet.splice(this.leastCost(openSet), 1)[0];

      if (current === terminal) this.found = true;
      visited[current] = true;
      visitOrder.push(current);

      const neighbour = this.getNeighbour(current);
      neighbour.forEach((next) => {
        if (visited[next]) return;
        if (g[next] === 0) prev[next] = current;

        const tempG = g[current] + 1;
        if (g[next] !== 0) {
          if (tempG < g[next]) {
            g[next] = tempG;
            prev[next] = current;
          }
        } else {
          g[next] = tempG;
          openSet.push(next);
        }

        h[next] = this.heuristic(next);
        f[next] = g[next] + h[next];
      });
    }

    this.constructPath();
    return this;
  }
}
