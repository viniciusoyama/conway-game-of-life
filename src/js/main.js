import $ from 'jquery';

import MenuController from './controllers/menu_controller';

import LeftMenu from './views/left_menu';
import GameMap from './views/game_map';

import CellMap from './models/cell_map';

var Fabric = window.fabric;

$(document).ready(function() {

  let leftMenu = new LeftMenu('#left-menu');
  let cellMap = new CellMap(100, 100);
  let gameMap = new GameMap({
    selector: '#game-map',
    rows: cellMap.rows,
    columns: cellMap.columns
  });

  let menuController = new MenuController({
    leftMenu: leftMenu,
    cellMap: cellMap,
    gameMap: gameMap
  });

  gameMap.cellListener = menuController;

  var canvas = new Fabric.Canvas('c');
  canvas.setDimensions({width: 100, height: 100})

  document.getElementById('imgLoader').onchange = function handleImage(e) {
    var reader = new FileReader();
    reader.onload = function (event){
      var imgObj = new Image();

      imgObj.src = event.target.result;
      imgObj.onload = function () {
        var image = new Fabric.Image(imgObj);
        image.set({
          angle: 0,
          padding: 0,
          cornersize:0,
          height: 100,
          width: 100,
        });
        canvas.centerObject(image);
        canvas.add(image);
        canvas.renderAll();
        var imageData = image.canvas.getContext().getImageData(0,0,canvas.width,canvas.height).data;

        var oficialIndex=0;
        for(var i=0; i< imageData.length; i+=4) {
          var r = imageData[i];
          var g = imageData[i+1];
          var b = imageData[i+2];
          var a = imageData[i+3];
          var shouldPaint = (r > 150) || (g > 150) || (b > 150) || (a > 150);
          if (shouldPaint) {
            gameMap._cellList[oficialIndex].setAsLive();
            cellMap._cells[oficialIndex].toogleState();
          }
          oficialIndex +=1;
        }
      }
    }
    reader.readAsDataURL(e.target.files[0]);
  }
});
