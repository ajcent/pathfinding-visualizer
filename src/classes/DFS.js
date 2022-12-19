import Pathfinder from "classes/Pathfinder";

export default class DFS extends Pathfinder {
  generate() {
    const { initial, terminal, visited, prev, visitOrder } = this;
    const stack = [initial];

    while (stack.length > 0 && !this.found) {
      const current = stack.pop();
      if (current === terminal) this.found = true;
      if (!visited[current]) {
        visitOrder.push(current);
        visited[current] = true;
      }

      const neighbour = this.getNeighbour(current);
      for (const next of neighbour) {
        if (!visited[next] && !this.found) {
          prev[next] = current;
          stack.push(next);
        }
      }
    }

    this.constructPath();
    return this;
  }
}
