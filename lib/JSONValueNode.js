'use strict';

exports.__esModule = true;
exports['default'] = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _class, _temp2;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/**
 * Renders simple values (eg. strings, numbers, booleans, etc)
 */

var JSONValueNode = (_temp2 = _class = function (_React$Component) {
  (0, _inherits3['default'])(JSONValueNode, _React$Component);

  function JSONValueNode() {
    var _temp, _this, _ret;

    (0, _classCallCheck3['default'])(this, JSONValueNode);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3['default'])(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.state = { hover: false }, _this.handleNodeClick = function (e) {
      var _this$props = _this.props,
          onNodeClick = _this$props.onNodeClick,
          keyPath = _this$props.keyPath,
          nodeType = _this$props.nodeType,
          maxClickableNodeDepth = _this$props.maxClickableNodeDepth;

      if (maxClickableNodeDepth && keyPath.length > maxClickableNodeDepth) {
        return;
      }

      e.stopPropagation();
      if (onNodeClick) {
        onNodeClick(e, keyPath, nodeType);
      }
    }, _this.handleMouseOver = function (e) {
      var _this$props2 = _this.props,
          onMouseOver = _this$props2.onMouseOver,
          keyPath = _this$props2.keyPath,
          nodeType = _this$props2.nodeType,
          maxClickableNodeDepth = _this$props2.maxClickableNodeDepth;

      if (maxClickableNodeDepth && keyPath.length > maxClickableNodeDepth) {
        return;
      }

      e.stopPropagation();
      _this.setState({ hover: true });
      if (onMouseOver) {
        onMouseOver(e, keyPath, nodeType);
      }
    }, _this.handleMouseOut = function () {
      return _this.setState({ hover: false });
    }, _temp), (0, _possibleConstructorReturn3['default'])(_this, _ret);
  }

  JSONValueNode.prototype.render = function render() {
    var hover = this.state.hover;
    var _props = this.props,
        nodeType = _props.nodeType,
        styling = _props.styling,
        labelRenderer = _props.labelRenderer,
        keyPath = _props.keyPath,
        valueRenderer = _props.valueRenderer,
        value = _props.value,
        valueGetter = _props.valueGetter;


    return _react2['default'].createElement(
      'li',
      (0, _extends3['default'])({}, styling('value', nodeType, keyPath, hover), {
        onClick: this.handleNodeClick,
        onMouseOver: this.handleMouseOver,
        onMouseOut: this.handleMouseOut
      }),
      _react2['default'].createElement(
        'label',
        styling(['label', 'valueLabel'], nodeType, keyPath),
        labelRenderer(keyPath, nodeType, false, false)
      ),
      _react2['default'].createElement(
        'span',
        styling('valueText', nodeType, keyPath),
        valueRenderer.apply(undefined, [valueGetter(value), value].concat(keyPath))
      )
    );
  };

  return JSONValueNode;
}(_react2['default'].Component), _class.propTypes = {
  nodeType: _react.PropTypes.string.isRequired,
  styling: _react.PropTypes.func.isRequired,
  labelRenderer: _react.PropTypes.func.isRequired,
  keyPath: _react.PropTypes.arrayOf(_react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.number])).isRequired,
  valueRenderer: _react.PropTypes.func.isRequired,
  value: _react.PropTypes.any,
  maxClickableNodeDepth: _react.PropTypes.number,
  valueGetter: _react.PropTypes.func,
  onNodeClick: _react.PropTypes.func,
  onMouseOver: _react.PropTypes.func
}, _class.defaultProps = {
  valueGetter: function valueGetter(value) {
    return value;
  }
}, _temp2);
exports['default'] = JSONValueNode;