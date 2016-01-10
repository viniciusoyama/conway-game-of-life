import $ from 'jquery';

export default class LeftMenu {

  constructor(elementSelector) {
    this._jQueryElement = $(elementSelector);

    this._bindHtmlElements();
  }

  _bindHtmlElements() {
    this.runButton = this._jQueryElement.find('#run-button');
    this.nextButton = this._jQueryElement.find('#next-button');
  }

}
