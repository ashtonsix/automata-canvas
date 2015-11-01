import React, {Component, PropTypes} from 'react';

const {floor} = Math;

export default class Base extends Component {
  static propTypes = {
    data: PropTypes.array,
    toColor: PropTypes.func,
    onClick: PropTypes.func,
  }

  static defaultProps = {
    data: [[]],
    toColor: v => v,
    onClick: () => null,
  }

  componentWillUpdate() {
    this.oldColors = this.colors;
  }

  oldColors = [[]]
  colors = [[]]
  width = 0
  height = 0

  cellSize() {
    const {data} = this.props;
    const containerWidth = this.refs.canvas.parentNode.offsetWidth;
    return floor(containerWidth / data[0].length);
  }

  updateCanvas() {
    const {data = [], toColor = v => v} = this.props;
    const canvas = this.refs.canvas;
    const context = canvas.getContext('2d');
    const cellSize = this.cellSize();

    context.setTransform(cellSize, 0, 0, cellSize, 0, 0);

    this.colors = data.map((row, y) => row.map((v, x) => toColor(v, x, y)));

    this.colors.forEach((row, y) => row.forEach((color, x) => {
      if ((this.oldColors[y] || [])[x] !== color) {
        context.fillStyle = color;
        context.fillRect(x, y, 1, 1);
      }
    }));
  }

  render() {
    let dimensions; let cellSize = 1;
    const {data, onClick} = this.props;

    // setTimeout & ref check cover 3 edge cases:
    // parentNode resized
    // data shape changed
    // first render
    if (this.refs.canvas) {
      cellSize = this.cellSize();
      dimensions = {width: data[0].length * cellSize, height: data.length * cellSize};
      setTimeout(::this.updateCanvas);
    } else {
      dimensions = {width: 0, height: 0};
      setTimeout(::this.forceUpdate);
    }

    const onClickWCoords = e => {
      const {top, left} = e.target.getBoundingClientRect();
      return onClick(
        e,
        floor((e.clientX - left) / cellSize),
        floor((e.clientY - top) / cellSize)
      );
    };

    this.width = data[0].length;
    this.height = data.length;
    return (
      <canvas
        ref='canvas'
        {...dimensions}
        onClick={onClickWCoords}
        style={{imageRendering: 'pixelated'}}
      />
    );
  }
}
