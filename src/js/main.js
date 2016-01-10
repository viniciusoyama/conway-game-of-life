import $ from 'jquery';

import LeftMenu from './views/left_menu';
import GameMap from './views/game_map';

import CellMap from './models/cell_map';
import Position from './value_objects/position';

$(document).ready(function() {
  let leftMenu = new LeftMenu('#left-menu');

  let cellMap = new CellMap(80, 100);

  let gameMap = new GameMap({
    selector: '#game-map',
    rows: cellMap.rows,
    columns: cellMap.columns
  });

  let cellListener = {
    onCellClicked: cell => {
      let position = cell.position;

      let cellSelected = cellMap.getCellOnPosition(position);
      cellSelected.toogleState();
      if (cellSelected.isLive()) {
        gameMap.setPositionAsLive(cellSelected.position);
      } else {
        gameMap.setPositionAsDead(cellSelected.position);
      }
    }
  };

  gameMap.cellListener = cellListener;

  leftMenu.nextButton.click(updateGame);
  leftMenu.runButton.click(() => {
    setInterval(updateGame, 100);
  });

  function updateGame() {
    cellMap.updateAllCells();
    cellMap.forEachCell(cell => {
      if (cell.isLive()) {
        gameMap.setPositionAsLive(cell.position);
      } else {
        gameMap.setPositionAsDead(cell.position);
      }
    });
  }

});
