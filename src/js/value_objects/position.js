export default class Position {

  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  isEqual(otherPosition) {
    return this.x === otherPosition.x && this.y === otherPosition.y;
  }

}
