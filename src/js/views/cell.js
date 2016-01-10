import $ from 'jquery';

export default class Cell {

  static getHeightInPixels() { return 10; }
  static getWidthInPixels() { return 10; }

  static getHtmlTemplate() { return '<div class="cell cell-dead"></div>'; }

  constructor(position) {
    this._buildjQueryElement();
  }

  get position() { return this._position; }

  set position(position) {
    this._position = position;
    this._updatePosition();
  }

  _updatePosition() {
    this._jQueryElement.css({
      top: this.position.y * this.constructor.getHeightInPixels(),
      left: this.position.x * this.constructor.getWidthInPixels()
    });
  }

  _buildjQueryElement() {
    this._jQueryElement = $(this.constructor.getHtmlTemplate());
    this._setjQueryElementSize();
  }

  _setjQueryElementSize() {
    this._jQueryElement.css('height', this.constructor.getHeightInPixels());
    this._jQueryElement.css('width', this.constructor.getWidthInPixels());
  }

  getContent() {
    return this._jQueryElement;
  }

  setAsLive() {
    this._jQueryElement
      .removeClass('cell-dead')
      .addClass('cell-live');
  }

  setAsDead() {
    this._jQueryElement
      .removeClass('cell-live')
      .addClass('cell-dead');
  }

  onClick(callback) {
    this._jQueryElement.click(() => {
      callback(this);
    });
  }

}
