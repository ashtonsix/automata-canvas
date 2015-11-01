'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var floor = Math.floor;

var Base = (function (_Component) {
  function Base() {
    _classCallCheck(this, Base);

    if (_Component != null) {
      _Component.apply(this, arguments);
    }

    this.oldColors = [[]];
    this.colors = [[]];
    this.width = 0;
    this.height = 0;
  }

  _inherits(Base, _Component);

  _createClass(Base, [{
    key: 'componentWillUpdate',
    value: function componentWillUpdate() {
      this.oldColors = this.colors;
    }
  }, {
    key: 'cellSize',
    value: function cellSize() {
      var data = this.props.data;

      var containerWidth = this.refs.canvas.parentNode.offsetWidth;
      return floor(containerWidth / data[0].length);
    }
  }, {
    key: 'updateCanvas',
    value: function updateCanvas() {
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

      context.setTransform(cellSize, 0, 0, cellSize, 0, 0);

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
    }
  }, {
    key: 'render',
    value: function render() {
      var dimensions = undefined;var cellSize = 1;
      var _props2 = this.props;
      var data = _props2.data;
      var onClick = _props2.onClick;

      // setTimeout & ref check cover 3 edge cases:
      // parentNode resized
      // data shape changed
      // first render
      if (this.refs.canvas) {
        cellSize = this.cellSize();
        dimensions = { width: data[0].length * cellSize, height: data.length * cellSize };
        setTimeout(this.updateCanvas.bind(this));
      } else {
        dimensions = { width: 0, height: 0 };
        setTimeout(this.forceUpdate.bind(this));
      }

      var onClickWithCoords = function onClickWithCoords(e) {
        var _e$target$getBoundingClientRect = e.target.getBoundingClientRect();

        var top = _e$target$getBoundingClientRect.top;
        var left = _e$target$getBoundingClientRect.left;

        var x = floor((e.clientX - left) / cellSize);
        var y = floor((e.clientY - top) / cellSize);
        console.log(data[y][x], x, y);
        return onClick(e, data[y][x], x, y);
      };

      this.width = data[0].length;
      this.height = data.length;
      return _react2['default'].createElement('canvas', _extends({
        ref: 'canvas'
      }, dimensions, {
        onClick: onClickWithCoords,
        style: { imageRendering: 'pixelated' }
      }));
    }
  }], [{
    key: 'propTypes',
    value: {
      data: _react.PropTypes.array,
      toColor: _react.PropTypes.func,
      onClick: _react.PropTypes.func },
    enumerable: true
  }, {
    key: 'defaultProps',
    value: {
      data: [[]],
      toColor: function toColor(v) {
        return v;
      },
      onClick: function onClick() {
        return null;
      } },
    enumerable: true
  }]);

  return Base;
})(_react.Component);

exports['default'] = Base;
module.exports = exports['default'];