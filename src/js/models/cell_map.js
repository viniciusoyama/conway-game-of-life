import Position from '../value_objects/position';

import Cell from './cell';

export default class CellMap {

  constructor(rows, columns) {
    this.rows = rows;
    this.columns = columns;

    this._buildInnerStruct();
  }

  _buildInnerStruct() {
    this._cells = [];
    for (let j = 0; j < this.rows; j++) {
      for (let i = 0; i < this.columns; i++) {
        this._cells.push(new Cell(new Position(i, j)));
      }
    }
  }

  updateAllCells() {
    this._scheduleAllCells();
    this._updateAllCellState();
  }

  _scheduleAllCells() {
    for (let j = 0; j < this.rows; j++) {
      for (let i = 0; i < this.columns; i++) {
        this._scheduleCellStateOnPosition(new Position(i, j));
      }
    }
  }

  _scheduleCellStateOnPosition(position) {
    let cell = this.getCellOnPosition(position);
    let numberOfLiveNeighbours =
      this._getNumberOfLiveNeighboursOfPosition(position);

    if (numberOfLiveNeighbours < 2) {
      cell.scheduleDeadState();
    } else if (numberOfLiveNeighbours > 3) {
      cell.scheduleDeadState();
    } else if (numberOfLiveNeighbours === 3) {
      cell.scheduleLiveState();
    } else {
      cell.unscheduleStateChange();
    }
  }

  _getNumberOfLiveNeighboursOfPosition(position) {
    let neighboursPositions = this._getValidNeighboursPositions(position);

    return neighboursPositions.reduce((sum, neighbourPosition) => {
      this.getCellOnPosition(neighbourPosition).isLive() ? sum++ : null;
      return sum;
    }, 0);
  }

  getCellOnPosition(position) {
    return this._cells[position.y * this.columns + position.x];
  }

  _getValidNeighboursPositions(position) {
    return this._buildNeighboursPositions(position).filter(neighbourPosition => {
      return neighbourPosition.x >= 0 && neighbourPosition.x < this.columns &&
              neighbourPosition.y >= 0 && neighbourPosition.y < this.rows;
    });
  }

  _buildNeighboursPositions(position) {
    return [
      new Position(position.x - 1,  position.y - 1),
      new Position(position.x - 1,  position.y    ),
      new Position(position.x - 1,  position.y + 1),
      new Position(position.x,      position.y - 1),
      new Position(position.x,      position.y + 1),
      new Position(position.x + 1,  position.y - 1),
      new Position(position.x + 1,  position.y    ),
      new Position(position.x + 1,  position.y + 1),
    ];
  }

  resetAllCells() {
    this.forEachCell(cell => { cell.setDead(); });
  }

  _updateAllCellState() {
    this.forEachCell(cell => { cell.updateState(); });
  }

  forEachCell(callback) {
    this._cells.forEach(callback);
  }

}
