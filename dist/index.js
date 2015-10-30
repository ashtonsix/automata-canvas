'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

exports['default'] = _react2['default'].createClass({
  displayName: 'index',

  propTypes: {
    toColor: _react2['default'].PropTypes.func,
    data: _react2['default'].PropTypes.array },

  componentWillUpdate: function componentWillUpdate() {
    this.oldColors = this.colors;
  },

  oldColors: [[]],
  colors: [[]],
  width: 0,
  height: 0,

  cellSize: function cellSize() {
    var data = this.props.data;

    var containerWidth = this.refs.canvas.parentNode.offsetWidth;
    return Math.floor(containerWidth / data[0].length);
  },

  dimensionsChanged: function dimensionsChanged() {
    var data = this.props.data;

    return this.width !== data[0].length || this.height !== data.length;
  },

  updateCanvas: function updateCanvas() {
    var _this = this;

    var _props = this.props;
    var _props$data = _props.data;
    var data = _props$data === undefined ? [] : _props$data;
    var _props$toColor = _props.toColor;
    var toColor = _props$toColor === undefined ? function (v) {
      return v;
    } : _props$toColor;

    var canvas = this.refs.canvas;
    var context = canvas.getContext('2d');
    var cellSize = this.cellSize();
    var dimensionsChanged = this.dimensionsChanged();

    if (dimensionsChanged) {
      context.scale(cellSize, cellSize);
      context.setTransform(1, 0, 0, 1, 0, 0);
    }

    this.colors = data.map(function (row, y) {
      return row.map(function (v, x) {
        return toColor(v, x, y);
      });
    });

    this.colors.forEach(function (row, y) {
      return row.forEach(function (color, x) {
        if ((_this.oldColors[y] || [])[x] !== color) {
          context.fillStyle = color;
          context.fillRect(x, y, 1, 1);
        }
      });
    });
  },

  render: function render() {
    var dimensions = undefined;
    var data = this.props.data;

    // setTimeout & ref check cover 3 edge cases:
    // parentNode resized
    // data shape changed
    // first render
    if (this.refs.canvas) {
      var cellSize = this.cellSize();
      dimensions = { width: data[0].length * cellSize, height: data.length * cellSize };
      setTimeout(this.updateCanvas);
    } else {
      dimensions = { width: 0, height: 0 };
      setTimeout(this.forceUpdate.bind(this));
    }

    this.width = data[0].length;
    this.height = data.length;
    return _react2['default'].createElement('canvas', _extends({ ref: 'canvas' }, dimensions));
  } });
module.exports = exports['default'];