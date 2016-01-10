export default class Cell {
  constructor(position) {
    this.position = position;
    this.setDead();
  }

  updateState() {
    this._isLive = this._willChangeToLive;
  }

  isLive() {
    return this._isLive;
  }

  toogleState() {
    this._isLive = !this._isLive;
  }

  isDead() {
    return !this.isLive();
  }

  setDead() {
    this._isLive = false;
  }

  scheduleLiveState() {
    this._willChangeToLive = true;
  }

  scheduleDeadState() {
    this._willChangeToLive = false;
  }

  unscheduleStateChange() {
    this._willChangeToLive = this._isLive;
  }

}
