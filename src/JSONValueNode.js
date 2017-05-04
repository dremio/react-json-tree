import React, { PropTypes } from 'react';
/**
 * Renders simple values (eg. strings, numbers, booleans, etc)
 */

export default class JSONValueNode extends React.Component {
  static propTypes = {
    nodeType: PropTypes.string.isRequired,
    styling: PropTypes.func.isRequired,
    labelRenderer: PropTypes.func.isRequired,
    keyPath: PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    ).isRequired,
    valueRenderer: PropTypes.func.isRequired,
    value: PropTypes.any,
    maxClickableNodeDepth: PropTypes.number,
    valueGetter: PropTypes.func,
    onNodeClick: PropTypes.func,
    onMouseOver: PropTypes.func
  };

  static defaultProps = {
    valueGetter: value => value
  };

  state = { hover: false };

  render() {
    const {
      nodeType, styling, labelRenderer, keyPath, valueRenderer,
      value, valueGetter, maxClickableNodeDepth
    } = this.props;
    const hover = maxClickableNodeDepth && keyPath.length > maxClickableNodeDepth
      ? false
      : this.state.hover;
    return (
      <li
        {...styling('value', nodeType, keyPath, hover)}
        onClick={this.handleNodeClick}
        onMouseOver={this.handleMouseOver}
        onMouseOut={this.handleMouseOut}
      >
        <label {...styling(['label', 'valueLabel'], nodeType, keyPath)}>
          {labelRenderer(keyPath, nodeType, false, false)}
        </label>
        <span {...styling('valueText', nodeType, keyPath)}>
          {valueRenderer(valueGetter(value), value, ...keyPath)}
        </span>
      </li>
    );
  }

  handleNodeClick = (e) => {
    const { onNodeClick, keyPath, nodeType, maxClickableNodeDepth } = this.props;
    if (maxClickableNodeDepth && keyPath.length > maxClickableNodeDepth) {
      return;
    }

    e.stopPropagation();
    if (onNodeClick) {
      onNodeClick(e, keyPath, nodeType);
    }
  };

  handleMouseOver = (e) => {
    const { onMouseOver, keyPath, nodeType, maxClickableNodeDepth } = this.props;
    if (maxClickableNodeDepth && keyPath.length > maxClickableNodeDepth) {
      return;
    }

    e.stopPropagation();
    this.setState({ hover: true });
    if (onMouseOver) {
      onMouseOver(e, keyPath, nodeType);
    }
  };

  handleMouseOut = () => this.setState({ hover: false });
}
