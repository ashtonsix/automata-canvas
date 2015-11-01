'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Base = require('./Base');

var _Base2 = _interopRequireDefault(_Base);

var compare = function compare(o1, o2, keys) {
  return keys.some(function (k) {
    return o1[k] !== o2[k];
  });
};

var Runner = (function (_Component) {
  function Runner(props) {
    _classCallCheck(this, Runner);

    _get(Object.getPrototypeOf(Runner.prototype), 'constructor', this).call(this, props);
    var data = props.initialData;

    this.state = { data: data };
  }

  _inherits(Runner, _Component);

  _createClass(Runner, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(np) {
      var _this = this;

      var p = this.props;
      if (np.running !== p.running) {
        setTimeout(function () {
          return _this[np.running ? 'run' : 'stop']();
        });
      } else if (compare(np, p, ['refreshRate', 'tick']) && p.running) {
        setTimeout(function () {
          return (_this.stop(), _this.run());
        });
      }
      return true;
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.stop();
    }
  }, {
    key: 'run',
    value: function run() {
      var _this2 = this;

      var refreshRate = this.props.refreshRate;

      var f = function f() {
        var _props = _this2.props;
        var onChange = _props.onChange;
        var tick = _props.tick;
        var _state = _this2.state;
        var data = _state.data;
        var meta = _state.meta;

        data = tick(data, meta);
        if (data.data) {
          ;
          var _temp = data;
          data = _temp.data;
          meta = _temp.meta;
          _temp;
        }_this2.setState({ data: data, meta: meta });
        onChange(data, meta);
      };
      f();
      this.interval = setInterval(f, refreshRate);
    }
  }, {
    key: 'stop',
    value: function stop() {
      clearInterval(this.interval);
    }
  }, {
    key: 'data',
    value: function data() {
      return this.state.data;
    }
  }, {
    key: 'render',
    value: function render() {
      var data = this.state.data;

      return _react2['default'].createElement(_Base2['default'], _extends({}, this.props, { data: data }));
    }
  }], [{
    key: 'propTypes',
    value: {
      initialData: _react.PropTypes.array,
      toColor: _react.PropTypes.func,
      onClick: _react.PropTypes.func,
      onChange: _react.PropTypes.func,
      tick: _react.PropTypes.func,
      refreshRate: _react.PropTypes.number,
      running: _react.PropTypes.bool },
    enumerable: true
  }, {
    key: 'defaultProps',
    value: {
      initialData: [[]],
      toColor: function toColor(v) {
        return v;
      },
      onClick: function onClick() {
        return null;
      },
      onChange: function onChange() {
        return null;
      },
      tick: function tick(v) {
        return v;
      },
      refreshRate: 1000,
      running: false },
    enumerable: true
  }]);

  return Runner;
})(_react.Component);

exports['default'] = Runner;
module.exports = exports['default'];