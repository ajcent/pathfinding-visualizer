export const dir = {
  TOP: 1,
  RIGHT: 2,
  BOTTOM: 3,
  LEFT: 4,
};

export const eDir = {
  ...dir,
  TOP_RIGHT: 5,
  TOP_LEFT: 6,
  BOTTOM_RIGHT: 7,
  BOTTOM_LEFT: 8,
};

export const vector = Object.keys(dir);
export const eVector = Object.keys(eDir);

export default class Grid {
  constructor(density, cell) {
    const { count, col, row } = density;
    const { initial, terminal } = cell;
    this.length = count - 1;
    this.col = col;
    this.row = row;
    this.prev = Array.from(Array(count)).fill(-1);
    this.initial = initial;
    this.terminal = terminal;
  }

  getDir(current, vector) {
    const { col } = this;

    switch (vector) {
      case eDir.TOP:
        return current - col;
      case eDir.RIGHT:
        return current + 1;
      case eDir.BOTTOM:
        return current + col;
      case eDir.LEFT:
        return current - 1;
      case eDir.TOP_RIGHT:
        return current - col + 1;
      case eDir.BOTTOM_RIGHT:
        return current + col + 1;
      case eDir.BOTTOM_LEFT:
        return current + col - 1;
      case eDir.TOP_LEFT:
        return current - col - 1;
      default:
        break;
    }
  }

  getNeighbour(current) {
    const neighbour = [];
    vector.forEach((each) => {
      const next = this.getDir(current, dir[each]);
      this.authNeighbour(current, next) && neighbour.push(next);
    });
    return neighbour;
  }
}
