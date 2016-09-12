import React, { PropTypes } from 'react';
import JSONArrow from './JSONArrow';
import getCollectionEntries from './getCollectionEntries';
import JSONNode from './JSONNode';
import ItemRange from './ItemRange';
import shouldPureComponentUpdate from 'react-pure-render/function';
import { createItemString } from './utils/stringUtils';

/**
 * Renders nested values (eg. objects, arrays, lists, etc.)
 */

function renderChildNodes(props, from, to) {
  const {
    nodeType,
    data,
    collectionLimit,
    circularCache,
    keyPath,
    postprocessValue,
    sortObjectKeys
  } = props;
  const childNodes = [];

  getCollectionEntries(nodeType, data, sortObjectKeys, collectionLimit, from, to).forEach(entry => {
    if (entry.to) {
      childNodes.push(
        <ItemRange
          {...props}
          key={`ItemRange--${entry.from}-${entry.to}`}
          from={entry.from}
          to={entry.to}
          renderChildNodes={renderChildNodes}
        />
      );
    } else {
      const { key, value } = entry;
      const isCircular = circularCache.indexOf(value) !== -1;

      const node = (
        <JSONNode
          {...props}
          {...{ postprocessValue, collectionLimit }}
          key={`Node--${key}`}
          keyPath={[key, ...keyPath]}
          value={postprocessValue(value)}
          circularCache={[...circularCache, value]}
          isCircular={isCircular}
          hideRoot={false}
        />
      );

      if (node !== false) {
        childNodes.push(node);
      }
    }
  });

  return childNodes;
}

export default class JSONNestedNode extends React.Component {
  static propTypes = {
    getItemString: PropTypes.func.isRequired,
    nodeTypeIndicator: PropTypes.any,
    nodeType: PropTypes.string.isRequired,
    data: PropTypes.any,
    hideRoot: PropTypes.bool.isRequired,
    styling: PropTypes.func.isRequired,
    collectionLimit: PropTypes.number,
    keyPath: PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    ).isRequired,
    labelRenderer: PropTypes.func.isRequired,
    shouldExpandNode: PropTypes.func,
    level: PropTypes.number.isRequired,
    sortObjectKeys: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
    isCircular: PropTypes.bool,
    expandable: PropTypes.bool,
    onNodeClick: PropTypes.func,
    shouldToggleExpand: PropTypes.func
  };

  static defaultProps = {
    data: [],
    circularCache: [],
    level: 0,
    expandable: true,
    shouldToggleExpand: () => true
  };

  constructor(props) {
    super(props);

    // calculate individual node expansion if necessary
    const expanded = props.shouldExpandNode && !props.isCircular ?
        props.shouldExpandNode(props.keyPath, props.data, props.level) : false;

    this.handleNodeClick = this.handleNodeClick.bind(this);
    this.handleExpandClick = this.handleExpandClick.bind(this);
    this.handleMouseOver = this.handleMouseOver.bind(this);
    this.handleMouseOut = this.handleMouseOut.bind(this);

    this.state = {
      expanded,
      createdChildNodes: false,
      hover: false
    };
  }

  shouldComponentUpdate = shouldPureComponentUpdate;

  render() {
    const {
      getItemString,
      nodeTypeIndicator,
      nodeType,
      data,
      hideRoot,
      styling,
      keyPath,
      labelRenderer,
      expandable
    } = this.props;
    const { expanded, hover } = this.state;
    const renderedChildren = expanded ?
      renderChildNodes({ ...this.props, level: this.props.level + 1 }) : null;

    const itemType = (
      <span {...styling('nestedNodeItemType', expanded)}>
        {nodeTypeIndicator}
      </span>
    );
    const renderedItemString = getItemString(
      nodeType,
      data,
      itemType,
      createItemString(data, expanded)
    );
    const stylingArgs = [keyPath, nodeType, expanded, expandable, hover];
    const isArray = data instanceof Array;
    const expandedClosedObjIcon = isArray ? ']' : '}';

    const treeNode = hideRoot ? (
      <li {...styling('rootNode', ...stylingArgs)} onClick={this.handleNodeClick}>
        <ul {...styling('rootNodeChildren', ...stylingArgs)}>
          {renderedChildren}
        </ul>
      </li>
    ) : (
      <li
        {...styling('nestedNode', ...stylingArgs)}
        onClick={this.handleNodeClick}
        onMouseOver={this.handleMouseOver}
        onMouseOut={this.handleMouseOut}
      >
        <label
          {...styling(['label', 'nestedNodeLabel'], ...stylingArgs)}
          onClick={expandable && this.handleExpandClick}
        >
          {labelRenderer(...stylingArgs)}
        </label>
        <span
          {...styling('nestedNodeItemString', ...stylingArgs)}
          onClick={expandable && this.handleExpandClick}
        >
          {renderedItemString}
        </span>
        <ul {...styling('nestedNodeChildren', ...stylingArgs)}>
          {renderedChildren}
        </ul>
        {expanded ? expandedClosedObjIcon : ''}
      </li>
    );
    return (
      <div style={{ display: 'flex', alignItems: 'flex-start' }}>
        {expandable && !hideRoot &&
          <JSONArrow
            styling={styling}
            nodeType={nodeType}
            expanded={expanded}
            onClick={this.handleExpandClick}
          />
        }
        {treeNode}
      </div>
    );
  }

  handleNodeClick(e) {
    const { onNodeClick, keyPath, nodeType } = this.props;
    e.stopPropagation();
    if (onNodeClick) {
      onNodeClick(e, keyPath, nodeType);
    }
  }

  handleExpandClick(e) {
    if (this.props.shouldToggleExpand(e)) {
      this.setState({ expanded: !this.state.expanded });
    }
  }

  handleMouseOver(e) {
    e.stopPropagation();
    this.setState({ hover: true });
  }

  handleMouseOut() {
    this.setState({ hover: false });
  }
}
