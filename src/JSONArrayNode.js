import React, { PropTypes } from 'react';
import JSONNestedNode from './JSONNestedNode';
import { createItemString } from './utils/stringUtils';

// Configures <JSONNestedNode> to render an Array
const JSONArrayNode = ({ data, ...props }) =>
  <JSONNestedNode
    {...props}
    data={data}
    nodeType='Array'
    nodeTypeIndicator='[]'
    createItemString={createItemString}
    expandable
  />;

JSONArrayNode.propTypes = {
  data: PropTypes.array
};

export default JSONArrayNode;
