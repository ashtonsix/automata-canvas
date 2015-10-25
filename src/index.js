import React from 'react';

export default React.createClass({
  propTypes: {
    toColor: React.PropTypes.func,
    data: React.PropTypes.array,
  },

  componentWillUpdate() {
    this.oldColors = this.colors;
  },

  oldColors: [[]],
  colors: [[]],
  width: 0,
  height: 0,

  cellSize() {
    const {data} = this.props;
    const containerWidth = this.refs.canvas.parentNode.offsetWidth;
    return Math.floor(containerWidth / data[0].length);
  },

  dimensionsChanged() {
    const {data} = this.props;
    return (
      this.width !== data[0].length ||
      this.height !== data.length
    );
  },

  updateCanvas() {
    const {data = [], toColor = v => v} = this.props;
    const canvas = this.refs.canvas;
    const context = canvas.getContext('2d');
    const cellSize = this.cellSize();
    const dimensionsChanged = this.dimensionsChanged();

    this.colors = data.map(row => row.map(toColor));

    this.colors.forEach((row, y) => row.forEach((color, x) => {
      if (dimensionsChanged || (this.oldColors[y] || [])[x] !== color) {
        context.fillStyle = color;
        context.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
      }
    }));
  },

  render() {
    let dimensions;
    const {data} = this.props;

    // setTimeout & ref check cover 3 edge cases:
    // parentNode resized
    // data shape changed
    // first render
    if (this.refs.canvas) {
      const cellSize = this.cellSize();
      dimensions = {width: data[0].length * cellSize, height: data.length * cellSize};
      setTimeout(this.updateCanvas);
    } else {
      dimensions = {width: 0, height: 0};
      setTimeout(::this.forceUpdate);
    }

    this.width = data[0].length;
    this.height = data.length;
    return <canvas ref='canvas' {...dimensions}/>;
  },
});
