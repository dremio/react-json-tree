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
    isRootTypeOfNodeIsArray: PropTypes.bool,
    isNotAllowExtractNestedItemOfList: PropTypes.bool,
    valueGetter: PropTypes.func,
    onNodeClick: PropTypes.func,
    onMouseOver: PropTypes.func
  };

  static defaultProps = {
    valueGetter: value => value
  };

  state = { hover: false };

  isShouldExtract = () => {
    const { isRootTypeOfNodeIsArray, isNotAllowExtractNestedItemOfList, keyPath } = this.props;
    const isNestedListChildren = isRootTypeOfNodeIsArray && isNotAllowExtractNestedItemOfList &&
                                 keyPath.length > 1;
    if (isNestedListChildren) {
      return false;
    }
    return this.state.hover;
  }

  render() {
    const {
      nodeType, styling, labelRenderer, keyPath, valueRenderer, value, valueGetter
    } = this.props;
    return (
      <li
        {...styling('value', nodeType, keyPath, this.isShouldExtract())}
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
    const { onNodeClick, keyPath, nodeType } = this.props;

    e.stopPropagation();
    if (onNodeClick && this.isShouldExtract()) {
      onNodeClick(e, keyPath, nodeType);
    }
  };

  handleMouseOver = (e) => {
    e.stopPropagation();
    const { onMouseOver, keyPath, nodeType } = this.props;
    this.setState({ hover: true });
    if (onMouseOver) {
      onMouseOver(e, keyPath, nodeType);
    }
  };

  handleMouseOut = () => this.setState({ hover: false });
}
