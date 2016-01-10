import $ from 'jquery';

import LeftMenu from './views/left_menu';

$(document).ready(function() {
  let leftMenu = new LeftMenu('#left-menu');

  leftMenu.runButton.click(function() {
    console.log('clicked');
  });
});
