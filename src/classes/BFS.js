import Pathfinder from "classes/Pathfinder";

export default class BFS extends Pathfinder {
  generate() {
    const { visited, prev, initial, terminal, visitOrder } = this;
    const queue = [initial];
    visitOrder.push(initial);
    visited[initial] = true;

    while (queue.length > 0 && !this.found) {
      const current = queue.shift();

      const neighbour = this.getNeighbour(current);
      for (const next of neighbour) {
        if (!visited[next] && !this.found) {
          this.found = terminal === next ? true : this.found;
          visited[next] = true;
          prev[next] = current;
          queue.push(next);
          visitOrder.push(next);
        }
      }
    }

    this.constructPath();
    return this;
  }
}
