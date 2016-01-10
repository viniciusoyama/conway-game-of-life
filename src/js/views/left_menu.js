import $ from 'jquery';

export default class LeftMenu {

  constructor(elementSelector) {
    this._jQueryElement = $(elementSelector);

    this._bindHtmlElements();
  }

  _bindHtmlElements() {
    this.runButton = this._findElementById('run-button');
    this.nextButton = this._findElementById('next-button');
    this.stopButton = this._findElementById('stop-button');
    this.resetButton = this._findElementById('reset-button');
  }

  _findElementById(id) {
    return this._jQueryElement.find('#' + id);
  }

}
